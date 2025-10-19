// src/components/EcgSimulator.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import ecgData from "../json/ecgData.json";
import "./css/style_ecg.css";

/* ==== Constantes ==== */
const MM_PER_SMALL = 1;
const PIXELS_PER_MM_BASE = 4;

/* ==== Formas de onda (simplificadas) ==== */
function shapeSinusBeat({ qrsWide = false, pr = 0.16 }) {
  const pStart = 0.1, pEnd = pStart + 0.08;
  const qrsStart = pEnd + (pr - 0.12);
  const qrsDur = qrsWide ? 0.16 : 0.09;
  const qrsEnd = qrsStart + qrsDur;
  const tStart = qrsEnd + 0.12, tEnd = tStart + 0.16;
  return (t) => {
    if (t >= pStart && t < pEnd) {
      const u = (t - pStart) / (pEnd - pStart);
      return 0.15 * Math.sin(Math.PI * u);
    }
    if (t >= qrsStart && t < qrsEnd) {
      const u = (t - qrsStart) / (qrsEnd - qrsStart);
      return u < 0.2 ? -0.6 * u / 0.2 : u < 0.5 ? 1.8 * (u - 0.2) / 0.3 : -1.2 * (u - 0.5) / 0.5;
    }
    if (t >= tStart && t < tEnd) {
      const u = (t - tStart) / (tEnd - tStart);
      return 0.35 * Math.sin(Math.PI * u);
    }
    return 0;
  };
}
const shapeVFib = (time) =>
  (0.55 * Math.sin(2 * Math.PI * 5.5 * time + 0.2) +
    0.35 * Math.sin(2 * Math.PI * 8.0 * time + 1.1) +
    0.25 * Math.sin(2 * Math.PI * 10.5 * time + 2.2)) * 0.9;

/* ==== Hook util ==== */
function useResizeObserver(ref, cb) {
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(cb);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref, cb]);
}

/* =======================================================
   Componente principal
   ======================================================= */
export default function EcgSimulator() {
  // estado UI
  const [selectedId, setSelectedId] = useState("sinus");
  const [sweepMmPerSec, setSweepMmPerSec] = useState(25);
  const [gainMmPerMv, setGainMmPerMv] = useState(10);
  const [paused, setPaused] = useState(false);

  // datos JSON
  const ritmos = ecgData.ritmos || [];
  const selected = useMemo(
    () => ritmos.find((r) => r.id === selectedId) || ritmos[0],
    [ritmos, selectedId]
  );

  // refs canvas
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const reqRef = useRef(0);

  // render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = wrapRef.current;
    if (!canvas || !parent) return;

    const dpr = window.devicePixelRatio || 1;
    const pxPerMm = PIXELS_PER_MM_BASE * dpr;

    const resize = () => {
      const { clientWidth } = parent;
      const height = Math.max(180, Math.floor(clientWidth * 0.35));
      canvas.width = Math.floor(clientWidth * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = clientWidth + "px";
      canvas.style.height = height + "px";
    };
    resize();

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    let lastTs = performance.now();
    let offsetPx = 0;

    const pxPerSec = sweepMmPerSec * pxPerMm;
    const ampPxPerMv = pxPerMm * gainMmPerMv;

    const params = selected.params || {};
    const baseBpm = params.bpm || 75;
    const rrMs = baseBpm > 0 ? 60000 / baseBpm : 1000;

    const beat = shapeSinusBeat({ qrsWide: !!params.wideQrs, pr: (params.prMs || 160) / 1000 });

    const drawGrid = () => {
      const w = canvas.width, h = canvas.height;
      // monitor oscuro
      ctx.fillStyle = "#0a0f12";
      ctx.fillRect(0, 0, w, h);

      const minor = "rgba(255,255,255,.05)";
      const major = "rgba(255,255,255,.12)";
      const step = pxPerMm * MM_PER_SMALL;

      ctx.strokeStyle = minor;
      ctx.beginPath();
      for (let x = 0; x <= w; x += step) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, h); }
      for (let y = 0; y <= h; y += step) { ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5); }
      ctx.stroke();

      ctx.strokeStyle = major;
      ctx.beginPath();
      const big = step * 5;
      for (let x = 0; x <= w; x += big) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, h); }
      for (let y = 0; y <= h; y += big) { ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5); }
      ctx.stroke();
    };

    const draw = (dt, ts) => {
      const w = canvas.width, h = canvas.height;
      // estela suave y rejilla
      ctx.fillStyle = "rgba(10,15,18,0.08)";
      ctx.fillRect(0, 0, w, h);
      drawGrid();

      const baseline = Math.floor(h * 0.6);
      ctx.strokeStyle = selected.color || "#ffcc33";
      ctx.lineWidth = 3;
      ctx.beginPath();

      const samples = w;
      for (let i = 0; i < samples; i++) {
        const x = (i + w - (offsetPx % w)) % w;
        const tGlobal = ts / 1000 + i / (sweepMmPerSec * pxPerMm); // s
        let mv = 0;

        if (params.vfib) mv = shapeVFib(tGlobal);
        else {
          const rr = Math.max(0.25, rrMs / 1000);
          const tBeat = (tGlobal % rr) / rr;
          mv = beat(tBeat);
        }

        const y = baseline - mv * (ampPxPerMv * 0.5);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // cursor vertical (si no está pausado)
      if (!paused) {
        const cursorX = (w - (offsetPx % w)) % w;
        const grad = ctx.createLinearGradient(cursorX - 6, 0, cursorX + 6, 0);
        const color = selected.color || "#ffcc33";
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(0.5, color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(cursorX - 6, 0, 12, h);
      }

      if (!paused) offsetPx = (offsetPx + pxPerSec * (dt / 1000)) % w;

      if (paused) {
        ctx.font = `${Math.floor(h / 10)}px system-ui, sans-serif`;
        ctx.fillStyle = "rgba(255,0,0,0.7)";
        ctx.textAlign = "center";
        ctx.fillText("PAUSADO", w / 2, h / 2);
      }
    };

    const loop = (ts) => {
      const dt = ts - lastTs;
      lastTs = ts;
      draw(dt, ts);
      reqRef.current = requestAnimationFrame(loop);
    };
    reqRef.current = requestAnimationFrame(loop);

    const onResize = () => {
      cancelAnimationFrame(reqRef.current);
      resize();
      lastTs = performance.now();
      reqRef.current = requestAnimationFrame(loop);
    };
    window.addEventListener("resize", onResize);

    // Pausa/Reanuda con click o tap
    const togglePause = () => setPaused((p) => !p);
    canvas.addEventListener("click", togglePause);
    canvas.addEventListener("touchstart", togglePause, { passive: true });

    return () => {
      cancelAnimationFrame(reqRef.current);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("click", togglePause);
      canvas.removeEventListener("touchstart", togglePause);
    };
  }, [selected, sweepMmPerSec, gainMmPerMv, paused]);

  // Recalcular al cambiar tamaño del contenedor
  useResizeObserver(wrapRef, () => window.dispatchEvent(new Event("resize")));

  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-header border-0">
        <h5 className="m-0">Simulador de ECG</h5>
        <small className="text-body-secondary">Clic o toque para Pausar/Reanudar · Lead II simulado</small>
        <div className="mt-2 d-flex flex-wrap gap-2">
          <select
            className="form-select form-select-sm"
            style={{ maxWidth: 260 }}
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            {ecgData.ritmos.map((r) => (
              <option key={r.id} value={r.id}>{r.nombre}</option>
            ))}
          </select>

          <div className="input-group input-group-sm" style={{ maxWidth: 160 }}>
            <span className="input-group-text">Vel</span>
            <select className="form-select" value={sweepMmPerSec} onChange={(e)=>setSweepMmPerSec(Number(e.target.value))}>
              <option value={12.5}>12.5</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="input-group input-group-sm" style={{ maxWidth: 160 }}>
            <span className="input-group-text">Gain</span>
            <select className="form-select" value={gainMmPerMv} onChange={(e)=>setGainMmPerMv(Number(e.target.value))}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <button
            type="button"
            className={`btn btn-sm ${paused ? "btn-outline-danger" : "btn-outline-secondary"}`}
            onClick={() => setPaused((p) => !p)}
          >
            {paused ? "Reanudar" : "Pausar"}
          </button>
        </div>
      </div>

      <div className="card-body p-2">
        {/* Canvas */}
        <div ref={wrapRef} className="w-100">
          <canvas ref={canvasRef} style={{ cursor: "pointer", width: "100%" }} />
        </div>

        {/* Descripción / Intervención */}
        <div className="mt-3">
          <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
            <span className="badge rounded-pill" style={{ background: selected.color || "#0d6efd" }}>
              {selected.nombre}
            </span>
            {selected?.params?.bpm && (
              <span className="badge text-bg-dark">~{selected.params.bpm} lpm</span>
            )}
          </div>

          {selected.descripcion && (
            <p className="small text-body-secondary mb-2">{selected.descripcion}</p>
          )}

          {selected.intervencion && (
            <div className="alert alert-light border small mb-0">
              <strong>Intervención sugerida: </strong>
              {selected.intervencion}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}