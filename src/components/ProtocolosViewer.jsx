import React, { useMemo, useState } from "react";
import protocolosData from "../json/protocolos.json";

function Bullets({ items }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <ul className="small mb-0 ps-3">
      {items.map((p, i) => (
        <li key={i}>{p}</li>
      ))}
    </ul>
  );
}

function MedsTable({ meds }) {
  if (!Array.isArray(meds) || meds.length === 0) return null;
  return (
    <div className="table-responsive">
      <table className="table table-sm align-middle">
        <thead className="table-light">
          <tr>
            <th style={{ width: "24%" }}>Fármaco</th>
            <th style={{ width: "40%" }}>Dosis</th>
            <th>Notas</th>
          </tr>
        </thead>
        <tbody>
          {meds.map((m, i) => (
            <tr key={`${m.f}-${i}`}>
              <td className="fw-semibold">{m.f}</td>
              <td>{m.dosis}</td>
              <td className="text-body-secondary small">{m.notas || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WeightDoseCalc({ schema = [], kgDefault = 70 }) {
  const [kg, setKg] = useState(kgDefault);
  const rows = Array.isArray(schema) ? schema : [];

  const fmt = (total, unidad) => {
    if (unidad === "mcg") {
      const mg = Math.round((total / 1000) * 10) / 10;
      return `${Math.round(total)} ${unidad} (≈ ${mg} mg)`;
    }
    return `${Math.round(total * 10) / 10} ${unidad}`;
  };

  if (rows.length === 0) return null;

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-3">
      <div className="card-body">
        <div className="d-flex flex-wrap align-items-end gap-2 mb-2">
          <div className="w-100" style={{ maxWidth: 260 }}>
            <label className="form-label small mb-1">Calculadora por peso</label>
            <div className="input-group input-group-sm">
              <span className="input-group-text">Peso</span>
              <input
                type="number"
                className="form-control"
                min={1}
                step="0.5"
                value={kg}
                onChange={(e) => setKg(Number(e.target.value || 0))}
              />
              <span className="input-group-text">kg</span>
            </div>
            <small className="text-body-secondary">* Estimación rápida. Ajusta a contexto/pauta local.</small>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-sm align-middle">
            <thead className="table-light">
              <tr>
                <th>Fármaco</th>
                <th>Dosis estimada</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const total = (r?.dosePerKg || 0) * kg;
                return (
                  <tr key={`${r?.f}-${i}`}>
                    <td>{r?.f}</td>
                    <td>
                      <span className="badge text-bg-primary">
                        {fmt(total, r?.unidad || "mg")}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="alert alert-warning small mb-0">
          <strong>Importante:</strong> valida siempre dosis y presentaciones disponibles.
        </div>
      </div>
    </div>
  );
}

export default function ProtocolosViewer() {
  const lista = useMemo(() => protocolosData?.protocolos ?? [], []);
  const [id, setId] = useState(lista[0]?.id || "");
  const activo = lista.find((p) => p.id === id) || null;

  return (
    <div className="container-fluid py-3">
      {/* Header + selector (stack en móviles) */}
      <div className="row g-2 align-items-end mb-2">
        <div className="col-12 col-md">
          <h1 className="h5 m-0">Protocolos</h1>
          <div className="small text-body-secondary">
            Procedimientos, medicamentos y dosis desde JSON.
          </div>
        </div>
        <div className="col-12 col-md-5">
          <div className="input-group">
            <span className="input-group-text">Protocolo</span>
            <select
              className="form-select"
              value={id}
              onChange={(e) => setId(e.target.value)}
            >
              {lista.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.titulo}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {!activo ? (
        <div className="alert alert-secondary">No hay protocolos disponibles.</div>
      ) : (
        <>
          {/* Título del protocolo activo */}
          <div className="card border-0 shadow-sm rounded-4 mb-3">
            <div className="card-body">
              <h2 className="h6 m-0">{activo.titulo}</h2>
              {activo.objetivo && (
                <p className="small text-body-secondary mb-0">{activo.objetivo}</p>
              )}
            </div>
          </div>

          {/* Calculadora por peso (si el JSON la define) */}
          <WeightDoseCalc schema={activo.doseCalcSchema} />

          {/* Fases */}
          <div className="accordion" id="accProto">
            {(activo.fases || []).map((f, idx) => (
              <div
                className="accordion-item rounded-3 overflow-hidden mb-2 border-0 shadow-sm"
                key={f.id || idx}
              >
                <h2 className="accordion-header" id={`h-${activo.id}-${f.id || idx}`}>
                  <button
                    className={`accordion-button ${idx === 0 ? "" : "collapsed"}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#c-${activo.id}-${f.id || idx}`}
                    aria-expanded={idx === 0 ? "true" : "false"}
                    aria-controls={`c-${activo.id}-${f.id || idx}`}
                  >
                    {f.nombre || `Fase ${idx + 1}`}
                  </button>
                </h2>
                <div
                  id={`c-${activo.id}-${f.id || idx}`}
                  className={`accordion-collapse collapse ${idx === 0 ? "show" : ""}`}
                  aria-labelledby={`h-${activo.id}-${f.id || idx}`}
                  data-bs-parent="#accProto"
                >
                  <div className="accordion-body">
                    {Array.isArray(f.puntos) && f.puntos.length > 0 && (
                      <Bullets items={f.puntos} />
                    )}
                    {Array.isArray(f.meds) && f.meds.length > 0 && (
                      <MedsTable meds={f.meds} />
                    )}
                    {f.alerta && (
                      <div className="alert alert-danger small mb-0 mt-2">
                        <strong>Atención:</strong> {f.alerta}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Perlas / Notas finales */}
          {Array.isArray(activo.perlas) && activo.perlas.length > 0 && (
            <div className="alert alert-info mt-3 mb-0">
              <div className="fw-semibold mb-1">Perlas de seguridad</div>
              <Bullets items={activo.perlas} />
            </div>
          )}
        </>
      )}
    </div>
  );
}