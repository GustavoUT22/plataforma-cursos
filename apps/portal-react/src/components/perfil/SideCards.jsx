import { useState } from "react";

export function ActivitySummaryCard({ cursos, completados, horas, certificados }) {
  const items = [
    { value: cursos, label: "Cursos inscritos", bg: "var(--primary-50)", color: "var(--primary-600)" },
    { value: completados, label: "Completados", bg: "var(--success-100)", color: "var(--success-600)" },
    { value: horas, label: "Horas totales", bg: "var(--accent-100)", color: "var(--accent-600)" },
    { value: certificados, label: "Certificados", bg: "var(--warning-100)", color: "var(--warning-600)" },
  ];
  return (
    <div className="card" style={{ textAlign: "center" }}>
      <h3 className="card-title" style={{ marginBottom: "var(--space-5)" }}>Mi actividad</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)", marginBottom: "var(--space-5)" }}>
        {items.map((it) => (
          <div key={it.label} style={{ padding: "var(--space-4)", background: it.bg, borderRadius: "var(--border-radius)" }}>
            <div style={{ fontSize: "var(--text-2xl)", fontWeight: 900, color: it.color }}>{it.value}</div>
            <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{it.label}</div>
          </div>
        ))}
      </div>
      <a href="/mis-inscripciones" className="btn btn-ghost w-full btn-sm">Ver mis cursos →</a>
    </div>
  );
}

export function CertificateCard({ curso, fecha }) {
  return (
    <div className="card">
      <h3 className="card-title" style={{ marginBottom: "var(--space-5)" }}>Certificados obtenidos</h3>
      <div style={{ padding: "var(--space-4)", border: "2px solid var(--success-600)", borderRadius: "var(--border-radius-lg)", background: "var(--success-100)", marginBottom: "var(--space-4)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          <span style={{ fontSize: "2rem" }} aria-hidden="true">🏆</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: "var(--text-sm)", color: "var(--gray-900)" }}>{curso}</div>
            <div style={{ fontSize: "var(--text-xs)", color: "var(--success-600)", fontWeight: 600 }}>Completado · {fecha}</div>
          </div>
        </div>
      </div>
      <button className="btn btn-ghost w-full btn-sm" aria-label="Ver todos los certificados">Ver todos →</button>
    </div>
  );
}

export function SkillBadges({ skills }) {
  return (
    <div className="card">
      <h3 className="card-title" style={{ marginBottom: "var(--space-5)" }}>Tecnologías aprendidas</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
        {skills.map((s) => (
          <span key={s.label} className={`badge ${s.className} no-dot`}>{s.label}</span>
        ))}
      </div>
    </div>
  );
}

export function NotificationSettings() {
  const [prefs, setPrefs] = useState({ email: true, evaluaciones: true, nuevos: false });
  const toggle = (key) => setPrefs({ ...prefs, [key]: !prefs[key] });

  const rows = [
    { key: "email", label: "Email de clases" },
    { key: "evaluaciones", label: "Recordatorios de evaluaciones" },
    { key: "nuevos", label: "Nuevos cursos disponibles" },
  ];

  return (
    <div className="card">
      <h3 className="card-title" style={{ marginBottom: "var(--space-5)" }}>Notificaciones</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        {rows.map((r) => (
          <div key={r.key} className="checkbox-group" style={{ justifyContent: "space-between" }}>
            <label htmlFor={`notif-${r.key}`}>{r.label}</label>
            <input type="checkbox" id={`notif-${r.key}`} checked={prefs[r.key]} onChange={() => toggle(r.key)} style={{ width: 16, height: 16 }} />
          </div>
        ))}
      </div>
    </div>
  );
}