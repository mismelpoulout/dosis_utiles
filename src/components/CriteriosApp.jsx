import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import criteriosData from "../json/Criterios_y_Protocolos.json";
import "./css/style_criterios.css";

/** ---------- Utilidades ---------- */
const isNumericScorable = (critId, fieldKey) => {
  if (critId === "gcs" || critId === "tal") return true;
  if (critId === "psi") return fieldKey === "age";
  return false;
};

/** Evaluadores específicos */
const evaluators = {
  light: (values) => {
    const protPleural = parseFloat(values.protPleural ?? 0);
    const protSuero = parseFloat(values.protSuero ?? 0);
    const ldhPleural = parseFloat(values.ldhPleural ?? 0);
    const ldhSuero = parseFloat(values.ldhSuero ?? 0);
    const ldhULN = parseFloat(values.ldhULN ?? 0);

    const r1 = protSuero > 0 ? protPleural / protSuero > 0.5 : false;
    const r2 = ldhSuero > 0 ? ldhPleural / ldhSuero > 0.6 : false;
    const r3 = ldhULN > 0 ? ldhPleural > (2 / 3) * ldhULN : false;

    const exudado = r1 || r2 || r3;
    return {
      score: exudado ? 1 : 0,
      result: exudado
        ? { label: "Exudado", recomendacion: "Buscar etiología (infecciosa/neoplásica/inflamatoria)." }
        : { label: "Trasudado", recomendacion: "Sugerente de IC, cirrosis, síndrome nefrótico, etc." },
    };
  },

  psi: (values, crit) => {
    const fields = crit?.form?.fields || [];
    let score = 0;
    const age = parseFloat(values.age || 0);
    const male = !!values.male;
    score += male ? age : Math.max(0, age - 10);

    for (const f of fields) {
      if (f.type === "boolean" && f.points && values[f.key]) score += f.points;
    }

    const range = crit?.form?.ranges?.find((r) => score >= r.min && score <= r.max) || null;
    return {
      score,
      result: range
        ? { label: range.label, recomendacion: range.recomendacion, plan: range.plan }
        : { label: "—", recomendacion: "Sin interpretación." },
    };
  },

  hta_crisis: (values, crit) => {
    const pas = parseFloat(values.pas ?? 0);
    const pad = parseFloat(values.pad ?? 0);
    const organDamage =
      !!values.neurologico ||
      !!values.dolorToracico ||
      !!values.edemaPulmon ||
      !!values.diseccion ||
      !!values.renalAguda ||
      !!values.eclampsia ||
      !!values.retinopatia;

    const pick = (expr) => crit?.form?.decision?.find((d) => d.when === expr);

    if (organDamage) {
      const n = pick("neurologico || dolorToracico || edemaPulmon || diseccion || renalAguda || eclampsia || retinopatia");
      return { score: null, result: n ?? { label: "Emergencia hipertensiva", recomendacion: "Manejo IV y monitorización." } };
    }
    if (!organDamage && (pas >= 180 || pad >= 120)) {
      const n = pick("!(neurologico || dolorToracico || edemaPulmon || diseccion || renalAguda || eclampsia || retinopatia) && (pas >= 180 || pad >= 120)");
      return { score: null, result: n ?? { label: "Urgencia hipertensiva", recomendacion: "Ajuste VO y observación corta." } };
    }
    return { score: null, result: { label: "PA elevada sin crisis", recomendacion: "Optimizar tto y seguimiento." } };
  },

  sgarbossa_smith: (values, crit) => {
    const bcri = !!values.bcri;
    const stConcordanteElev = !!values.stConcordanteElev;
    const stConcordanteDepV1V3 = !!values.stConcordanteDepV1V3;
    const ratioDiscordante = parseFloat(values.ratioDiscordante ?? 0);

    const isPositive =
      bcri &&
      (stConcordanteElev ||
        stConcordanteDepV1V3 ||
        (isFinite(ratioDiscordante) && ratioDiscordante <= -0.25));

    const pick = (expr) => crit?.form?.decision?.find((d) => d.when === expr);

    if (!bcri) {
      const n = pick("!bcri");
      return {
        score: null,
        result: n ?? { label: "No aplicable", recomendacion: "ECG sin BCRI." },
      };
    }

    if (isPositive) {
      const n = pick(
        "bcri && (stConcordanteElev || stConcordanteDepV1V3 || (ratioDiscordante <= -0.25))"
      );
      return {
        score: null,
        result: n ?? { label: "IAM probable", recomendacion: "Activar reperfusión." },
      };
    }

    const n = pick(
      "bcri && !(stConcordanteElev || stConcordanteDepV1V3 || (ratioDiscordante <= -0.25))"
    );
    return {
      score: null,
      result:
        n ?? { label: "Indeterminado", recomendacion: "Correlacionar con clínica/troponinas." },
    };
  },

  rehab_post_iam: (values, crit) => {
    const fevi = parseFloat(values.fevi ?? 0);
    const killip = parseInt(values.killip ?? 1, 10);
    const arritmias = !!values.arritmias;
    const isquemiaResidual = !!values.isquemiaResidual;
    const revascularizado = (values.revascularizado || "").toUpperCase();

    let risk = 0;
    if (fevi < 35 || killip >= 3 || arritmias || isquemiaResidual || revascularizado === "NO") risk = 2;
    else if ((fevi >= 35 && fevi < 50) || killip === 2) risk = 1;

    const range = crit?.form?.ranges?.find((r) => r.min === risk && r.max === risk) || null;
    const labels = ["Bajo riesgo funcional", "Riesgo intermedio", "Alto riesgo"];
    return {
      score: risk,
      result: range
        ? { label: range.label, recomendacion: range.recomendacion, plan: range.plan }
        : { label: labels[risk] || "—", recomendacion: "Rehabilitación según riesgo." },
    };
  },
};

/** Genérico */
function evaluateGeneric(crit, values) {
  const fields = crit?.form?.fields ?? [];
  let score = 0;
  for (const f of fields) {
    const v = values[f.key];
    if (f.type === "boolean") {
      if (v && f.points) score += f.points;
      if (v && !f.points) score += 1;
    } else if (f.type === "number" && isNumericScorable(crit.id, f.key)) {
      const num = parseFloat(v || 0);
      score += isFinite(num) ? num : 0;
    } else if (f.type === "select" && f.options) {
      const opt = f.options.find((o) => o.value === v);
      if (opt?.points) score += opt.points;
    }
  }
  const range = crit?.form?.ranges?.find((r) => score >= r.min && score <= r.max) || null;
  return {
    score,
    result: range
      ? { label: range.label, recomendacion: range.recomendacion, plan: range.plan }
      : { label: "—", recomendacion: "Complete los campos para interpretar." },
  };
}

/** ---------- UI ---------- */

function FieldControl({ field, value, onChange }) {
  const id = `fld-${field.key}`;

  if (field.type === "boolean") {
    return (
      <div className="form-check mb-2">
        <input
          id={id}
          className="form-check-input"
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(field.key, e.target.checked)}
        />
        <label className="form-check-label ms-1" htmlFor={id}>
          {field.label}
          {field.points ? <span className="badge text-bg-secondary ms-2">+{field.points} pt</span> : null}
        </label>
      </div>
    );
  }

  if (field.type === "number") {
    return (
      <div className="mb-2">
        <label htmlFor={id} className="form-label small mb-1">
          {field.label}
        </label>
        <input
          id={id}
          type="number"
          className="form-control form-control-sm"
          value={value ?? ""}
          onChange={(e) => onChange(field.key, e.target.value)}
          inputMode="decimal"
          step="any"
        />
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className="mb-2">
        <label htmlFor={id} className="form-label small mb-1">
          {field.label}
        </label>
        <select
          id={id}
          className="form-select form-select-sm"
          value={value ?? ""}
          onChange={(e) => onChange(field.key, e.target.value)}
        >
          <option value="">—</option>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return null;
}

function PlanBlock({ plan }) {
  if (!plan || typeof plan !== "object") return null;
  const entries = Object.entries(plan);
  if (!entries.length) return null;
  return (
    <div className="alert alert-light border mt-3 mb-0">
      <div className="fw-semibold mb-2">Plan sugerido</div>
      <ul className="small mb-0 ps-3">
        {entries.map(([k, v]) => (
          <li key={k}>
            <strong className="text-capitalize">{k.replaceAll("_", " ")}:</strong>{" "}
            {typeof v === "string" ? v : JSON.stringify(v)}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Teaser para protocolos sin `form` (ej. RSI) */
function ProtocolTeaserCard({ crit }) {
  return (
    <div className="card shadow-sm border-0 rounded-4 h-100">
      <div className="card-header border-0 small py-2" style={{ background: crit.color || "#f8f9fa" }}>
        <strong className="d-block">{crit.nombre}</strong>
        <span className="text-body-secondary">{crit.categoria || "Protocolo"}</span>
      </div>
      <div className="card-body p-3 p-sm-3 p-md-4">
        <p className="small text-body-secondary mb-3 descripcion-lista">
          {crit.descripcion || "Protocolo clínico."}
        </p>
        <Link
          to={`/protocolos?r=${encodeURIComponent(crit.id)}`}
          className="btn btn-primary btn-sm"
        >
          Ver protocolo
        </Link>
      </div>
    </div>
  );
}

/** Card con formulario (esta sí usa Hooks) */
function CriteriaCardForm({ crit }) {
  const [values, setValues] = useState({});
  const { score, result } = useMemo(() => {
    const evalFn = evaluators[crit.id];
    return evalFn ? evalFn(values, crit) : evaluateGeneric(crit, values);
  }, [values, crit]);
  const onChange = (key, val) => setValues((s) => ({ ...s, [key]: val }));

  return (
    <div className="card shadow-sm border-0 rounded-4 h-100">
      <div className="card-header border-0 small py-2" style={{ background: crit.color || "#f8f9fa" }}>
        <strong className="d-block">{crit.nombre}</strong>
        <span className="text-body-secondary">{crit.categoria}</span>
      </div>

      <div className="card-body p-3 p-sm-3 p-md-4">
        <p className="small text-body-secondary mb-3">{crit.descripcion}</p>

        {crit.form?.fields?.length ? (
          <form className="mb-2">
            {crit.form.fields.map((f) => (
              <FieldControl key={f.key} field={f} value={values[f.key]} onChange={onChange} />
            ))}
          </form>
        ) : (
          <div className="alert alert-warning py-2">Este criterio no tiene campos definidos.</div>
        )}

        <div className="d-flex flex-wrap align-items-center gap-2 mt-2">
          <span className="badge text-bg-dark">Score: {Number.isFinite(score) ? score : "—"}</span>
          {result?.label && <span className="badge text-bg-primary">{result.label}</span>}
        </div>

        {result?.recomendacion && (
          <p className="small text-body-secondary mt-2 mb-0">
            <strong>Recomendación:</strong> {result.recomendacion}
          </p>
        )}

        <PlanBlock plan={result?.plan} />
      </div>
    </div>
  );
}

/** Filtro por categoría */
function CategoryFilter({ cats, value, onChange }) {
  return (
    <div className="mb-3">
      <label className="form-label small mb-1">Filtrar por categoría</label>
      <select
        className="form-select form-select-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="Todos">Todos</option>
        {cats.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}

/** ---------- App principal ---------- */
export default function CriteriosApp() {
  const lista = criteriosData?.Criterios_y_Protocolos ?? [];

  const categories = useMemo(
    () => Array.from(new Set(lista.map((x) => x.categoria).filter(Boolean))),
    [lista]
  );

  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todos");

  const filtrados = useMemo(() => {
    const query = q.trim().toLowerCase();
    return lista.filter((item) => {
      const byCat = cat === "Todos" || item.categoria === cat;
      if (!byCat) return false;
      if (!query) return true;
      const haystack = [item.nombre, item.descripcion, item.categoria]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [lista, q, cat]);

  return (
    <div className="container-fluid py-3">
      {/* Header responsive */}
      <div className="row g-2 align-items-stretch mb-3">
        <div className="col-12 col-lg-5">
          <h1 className="h5 m-0">Criterios y Protocolos</h1>
          <div className="small text-body-secondary">
            Formularios interactivos y accesos a protocolos.
          </div>
        </div>

        {/* Buscador */}
        <div className="col-12 col-sm-6 col-lg-4">
          
          <small className="text-body-secondary d-block mt-1">
            {filtrados.length} resultado{filtrados.length !== 1 ? "s" : ""}
          </small>
        </div>

        {/* Filtro por categoría (desplegable) */}
        <div className="col-12 col-sm-6 col-lg-3">
          <CategoryFilter cats={categories} value={cat} onChange={setCat} />
        </div>
      </div>

      {/* Grid responsivo de cards */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {filtrados.map((crit) => (
          <div className="col" key={crit.id}>
            {crit.form ? (
              <CriteriaCardForm crit={crit} />
            ) : (
              <ProtocolTeaserCard crit={crit} />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 text-center small text-body-secondary">
        Tip: usa el buscador y el filtro por categoría para acotar la lista.
      </div>
    </div>
  );
}