import React, { useMemo, useState } from "react";
import data from "../json/medicamentos.json";
import "./css/modern.css";
import InfiniteTabs from "./utils/InfiniteTabs";

const isObject = (v) => Object.prototype.toString.call(v) === "[object Object]";
const isArray = Array.isArray;

/** ---------------- Normalización fármacos ---------------- */
function normalizeItem(item) {
  if (!item || typeof item !== "object") return null;
  return {
    nombre: item.nombre ?? "",
    dosis: item.dosis ?? null,
    maxima: item.maxima ?? null,
    presentaciones: item.presentaciones ?? [],
    contraindicaciones: item.contraindicaciones ?? [],
    notas: item.notas ?? null,

    // estos campos sólo existen en “tratamientos específicos”,
    // los dejamos por compatibilidad aunque los analgésicos no los traen
    manejo_inicial: item.manejo_inicial ?? null,
    farmacologico: item.farmacologico ?? null,
    combinaciones: item.combinaciones ?? null,
  };
}

function matchesQuery(item, q) {
  if (!q) return true;
  const flatFarmaco = isObject(item?.farmacologico)
    ? Object.entries(item.farmacologico)
        .map(([k, v]) =>
          Array.isArray(v) ? `${k} ${v.join(" ")}` : `${k} ${String(v)}`
        )
        .join(" ")
    : "";
  const flatCombos = Array.isArray(item?.combinaciones)
    ? item.combinaciones
        .map((c) => [c?.nombre, ...(c?.esquema || [])].filter(Boolean).join(" "))
        .join(" ")
    : "";
  const txt = [
    item?.nombre,
    item?.dosis,
    item?.maxima,
    ...(item?.presentaciones || []),
    ...(item?.contraindicaciones || []),
    item?.notas,
    flatFarmaco,
    flatCombos,
    ...(item?.manejo_inicial || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return txt.includes(q.toLowerCase());
}

/** ---------------- Cards UI ---------------- */
function Pill({ children, variant = "secondary" }) {
  return <span className={`badge rounded-pill text-bg-${variant} me-1 mb-1`}>{children}</span>;
}

/** Card de combinaciones (para COMBINACIONES_ALIVIO_DOLOR) */
function comboMatchesQuery(combo, q) {
  if (!q) return true;
  const txt = [
    combo?.nombre,
    combo?.indicacion,
    ...(combo?.esquema || []),
    ...(combo?.precauciones || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return txt.includes(q.toLowerCase());
}

function ComboCard({ item }) {
  if (!item) return null;
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex">
      <div className="card shadow-sm border-0 rounded-4 flex-fill hover-card">
        <div className="card-body">
          <h5 className="card-title fw-semibold text-primary mb-2">{item.nombre}</h5>

          {item.indicacion && (
            <p className="small mb-2">
              <Pill variant="light">Indicación</Pill>
              {item.indicacion}
            </p>
          )}

          {item.esquema?.length > 0 && (
            <div className="small mb-2">
              <div className="fw-semibold text-uppercase text-body-secondary mb-1">Esquema</div>
              <ul className="mb-0 ps-3">
                {item.esquema.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          )}

          {item.precauciones?.length > 0 && (
            <div className="small mb-0">
              <div className="fw-semibold text-danger mb-1">Precauciones</div>
              <ul className="text-danger ps-3 mb-0">
                {item.precauciones.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Helpers para “tratamientos específicos” (se conservan por compatibilidad) */
function KeyValList({ obj }) {
  if (!isObject(obj) || Object.keys(obj).length === 0) {
    return <div className="text-body-secondary small">Sin datos farmacológicos.</div>;
  }
  return (
    <ul className="list-unstyled mb-0">
      {Object.entries(obj).map(([drug, dose]) => (
        <li key={drug} className="mb-2">
          <div className="fw-semibold">{drug}</div>
          <div className="small">
            {Array.isArray(dose) ? (
              <ul className="mb-0 ps-3">
                {dose.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            ) : (
              String(dose)
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

function ManejoList({ arr }) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return <div className="text-body-secondary small">Sin manejo inicial definido.</div>;
  }
  return (
    <ul className="mb-0 ps-3 small">
      {arr.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

/** Card de fármacos (AINEs/opiáceos) con tabs opcionales */
function MedCard({ item }) {
  const m = normalizeItem(item);
  const [tab, setTab] = useState("datos"); // "datos" | "manejo" | "farmaco" | "combos"
  if (!m) return null;

  const hasManejo = Array.isArray(m.manejo_inicial) && m.manejo_inicial.length > 0;
  const hasFarmaco = isObject(m.farmacologico) && Object.keys(m.farmacologico).length > 0;
  const hasCombos = Array.isArray(m.combinaciones) && m.combinaciones.length > 0;

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex">
      <div className="card shadow-sm border-0 rounded-4 flex-fill hover-card">
        <div className="card-body">
          <h5 className="card-title fw-semibold text-primary mb-2">{m.nombre}</h5>

          {(hasManejo || hasFarmaco || hasCombos) && (
            <ul className="nav nav-pills nav-justified small mb-3">
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${tab === "datos" ? "active" : ""}`}
                  onClick={() => setTab("datos")}
                >
                Datos
                </button>
              </li>
              {hasManejo && (
                <li className="nav-item">
                  <button
                    type="button"
                    className={`nav-link ${tab === "manejo" ? "active" : ""}`}
                    onClick={() => setTab("manejo")}
                  >
                    Manejo
                  </button>
                </li>
              )}
              {hasFarmaco && (
                <li className="nav-item">
                  <button
                    type="button"
                    className={`nav-link ${tab === "farmaco" ? "active" : ""}`}
                    onClick={() => setTab("farmaco")}
                  >
                    Fármacos
                  </button>
                </li>
              )}
              {hasCombos && (
                <li className="nav-item">
                  <button
                    type="button"
                    className={`nav-link ${tab === "combos" ? "active" : ""}`}
                    onClick={() => setTab("combos")}
                  >
                    Combinaciones
                  </button>
                </li>
              )}
            </ul>
          )}

          {tab === "datos" && (
            <>
              {m.dosis && (
                <p className="small mb-2">
                  <Pill variant="primary">Dosis</Pill>
                  {m.dosis}
                </p>
              )}
              {m.maxima && (
                <p className="small mb-2">
                  <Pill variant="warning">Máxima</Pill>
                  {m.maxima}
                </p>
              )}
              {m.presentaciones?.length > 0 && (
                <div className="small mb-2">
                  <div className="fw-semibold text-uppercase text-body-secondary mb-1">Presentaciones</div>
                  {m.presentaciones.map((p, i) => (
                    <Pill key={i} variant="info">{p}</Pill>
                  ))}
                </div>
              )}
              {m.contraindicaciones?.length > 0 && (
                <div className="small mb-2">
                  <div className="fw-semibold text-danger mb-1">Contraindicaciones</div>
                  <ul className="text-danger ps-3 mb-0">
                    {m.contraindicaciones.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
              {m.notas && (
                <p className="small text-body-secondary m-0">
                  <strong>Notas:</strong> {m.notas}
                </p>
              )}
            </>
          )}

          {tab === "manejo" && <ManejoList arr={m.manejo_inicial} />}
          {tab === "farmaco" && <KeyValList obj={m.farmacologico} />}
          {tab === "combos" && (
            <div className="d-grid gap-2">
              {(m.combinaciones || []).map((c, i) => (
                <div key={i} className="border rounded-3 p-2">
                  <div className="fw-semibold mb-1">{c?.nombre || `Esquema ${i + 1}`}</div>
                  {Array.isArray(c?.esquema) ? (
                    <ul className="mb-0 ps-3 small">
                      {c.esquema.map((line, j) => <li key={j}>{line}</li>)}
                    </ul>
                  ) : <div className="small">—</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** ---------------- Secciones ---------------- */
function SubgroupSection({ name, items, q }) {
  const isCombosSection = /combinaciones/i.test(name);

  const filtered = useMemo(() => {
    if (!isArray(items)) return [];
    if (isCombosSection) {
      return items.filter((it) => comboMatchesQuery(it, q));
    }
    return items.map(normalizeItem).filter(Boolean).filter((it) => matchesQuery(it, q));
  }, [items, q, isCombosSection]);

  if (filtered.length === 0) return null;

  return (
    <section className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="fw-semibold text-uppercase text-body-secondary m-0">{name}</h6>
        <span className="badge text-bg-light">{filtered.length} ítem(s)</span>
      </div>
      <div className="row g-3">
        {filtered.map((it, idx) =>
          isCombosSection ? (
            <ComboCard key={`${name}-${idx}`} item={it} />
          ) : (
            <MedCard key={`${name}-${idx}`} item={it} />
          )
        )}
      </div>
    </section>
  );
}

function CategoryPane({ title, value, q }) {
  let sections = [];
  let notas = null;

  if (isArray(value)) {
    sections.push(<SubgroupSection key="listado" name="Listado" items={value} q={q} />);
  } else if (isObject(value)) {
    Object.entries(value).forEach(([k, v]) => {
      if (k.toLowerCase().includes("nota")) notas = v;
      else if (isArray(v)) sections.push(<SubgroupSection key={k} name={k} items={v} q={q} />);
    });
  }

  if (sections.length === 0 && !notas)
    return <div className="text-body-secondary small">No hay resultados aquí.</div>;

  return (
    <div>
      {notas && (
        <div className="alert alert-secondary py-2 mb-3 rounded-4">
          <strong>Notas de {title}:</strong> {notas}
        </div>
      )}
      {sections}
    </div>
  );
}

/** ---------------- App ---------------- */
export default function MedicamentosModern() {
  const meds = data?.Medicamentos ?? {};
  const categoriesOriginal = Object.keys(meds).map((c) => c.trim());
  const categories = categoriesOriginal.map((c) => c.toUpperCase());
  const keyMap = useMemo(
    () => new Map(categoriesOriginal.map((orig) => [orig.toUpperCase(), orig])),
    [categoriesOriginal]
  );

  const [active, setActive] = useState(categories[0] || "");
  const [q, setQ] = useState("");

  // Contador incluye combinaciones
  const totalCount = useMemo(() => {
    const query = q.trim().toLowerCase();
    let count = 0;
    categoriesOriginal.forEach((catOrig) => {
      const v = meds[catOrig];
      if (isArray(v)) {
        count += v.map(normalizeItem).filter(Boolean).filter((it) => matchesQuery(it, query)).length;
      } else if (isObject(v)) {
        Object.entries(v).forEach(([k, arr]) => {
          if (!isArray(arr)) return;
          if (/combinaciones/i.test(k)) {
            count += arr.filter((it) => comboMatchesQuery(it, query)).length;
          } else {
            count += arr
              .map(normalizeItem)
              .filter(Boolean)
              .filter((it) => matchesQuery(it, query)).length;
          }
        });
      }
    });
    return count;
  }, [meds, categoriesOriginal, q]);

  const activeKey = keyMap.get(active) ?? active;
  const activeValue = meds[activeKey];

  return (
    <div className="container-fluid py-3">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3 gap-2">
        <div>
          <h1 className="h4 m-0">Medicamentos</h1>
        </div>
        <div className="w-100" style={{ maxWidth: 420 }}>
          <div className="input-group">
            <span className="input-group-text">Buscar</span>
            <input
              type="search"
              className="form-control"
              placeholder="Ej: ibuprofeno, ceftriaxona, '1 g EV', 'bolo 80 mg'..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <small className="text-body-secondary">{totalCount} resultados</small>
        </div>
      </div>

      {/* Carrusel infinito sin costuras */}
      <div className="mb-4">
        <InfiniteTabs
          items={categories}
          active={active}
          onSelect={(lbl) => setActive(lbl.trim().toUpperCase())}
          speed={40}
        />
      </div>

      {/* Panel actual */}
      <CategoryPane title={activeKey} value={activeValue} q={q} />
    </div>
  );
}