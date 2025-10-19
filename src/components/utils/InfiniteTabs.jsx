// src/components/utils/InfiniteTabs.jsx
import React from "react";

/**
 * Carrusel infinito sin costuras:
 * - Doble lista (A B C A B C) con módulo → sin saltos
 * - Auto-scroll con rAF
 * - Drag del wrapper SOLO si el pointerDown no fue sobre un botón
 * - Selección por onClick del botón (no se ve afectada por el drag)
 * - Pausa/resume auto-scroll al entrar/salir/focus
 */
export default function InfiniteTabs({ items = [], active, onSelect, speed = 40 }) {
  const wrapRef = React.useRef(null);
  const trackRef = React.useRef(null);

  const s = React.useRef({
    x: 0,
    dragging: false,
    startX: 0,
    startPos: 0,
    halfWidth: 0,
    lastTs: 0,
    paused: false,
  });

  const loopItems = React.useMemo(() => [...items, ...items], [items]);

  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    s.current.halfWidth = half;
    s.current.x = -((((-s.current.x) % half) + half) % half);
    el.style.transform = `translateX(${s.current.x}px)`;
  }, [loopItems]);

  // auto-scroll
  React.useEffect(() => {
    let raf;
    const step = (ts) => {
      if (!s.current.lastTs) s.current.lastTs = ts;
      const dt = (ts - s.current.lastTs) / 1000;
      s.current.lastTs = ts;

      if (!s.current.dragging && !s.current.paused) {
        s.current.x -= speed * dt;
        const half = s.current.halfWidth || 1;
        if (s.current.x <= -half) s.current.x += half;
        trackRef.current && (trackRef.current.style.transform = `translateX(${s.current.x}px)`);
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  // NO iniciar drag si se hace down sobre un botón
  const onPointerDown = (e) => {
    if (e.target.closest("button")) return; // <<< clave
    s.current.dragging = true;
    s.current.startX = e.clientX;
    s.current.startPos = s.current.x;
  };

  const onPointerMove = (e) => {
    if (!s.current.dragging) return;
    const dx = e.clientX - s.current.startX;
    const next = s.current.startPos + dx;
    const half = s.current.halfWidth || 1;
    const pos = (((-next) % half) + half) % half; // [0, half)
    s.current.x = -pos;
    trackRef.current && (trackRef.current.style.transform = `translateX(${s.current.x}px)`);
  };

  const endDrag = () => { s.current.dragging = false; };

  // pausa/resume autoscroll para facilitar selección
  const pause = () => { s.current.paused = true; };
  const resume = () => { s.current.paused = false; };

  return (
    <div
      ref={wrapRef}
      className="inf-wrap"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <div ref={trackRef} className="inf-track">
        {loopItems.map((label, i) => (
          <button
            key={`${label}-${i}`}
            className={`btn btn-sm rounded-pill px-3 py-2 me-2 ${
              active === label ? "btn-primary text-light" : "btn-outline-primary"
            }`}
            onClick={() => onSelect?.(label)}  // selección por click => no “atrae” el puntero
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}