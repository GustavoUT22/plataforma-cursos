export default function ProfileSummaryCard({ initials, name, career, coursesCount, hoursCount, certificatesCount }) {
  return (
    <div className="card" style={{ textAlign: "center" }}>
      <div className="avatar xl" style={{ margin: "0 auto var(--space-4)" }} aria-label={`Foto de ${name}`}>{initials}</div>
      <h3 style={{ fontSize: "var(--text-lg)" }}>{name}</h3>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--primary-600)", fontWeight: 600, marginBottom: "var(--space-4)" }}>{career}</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-6)", marginBottom: "var(--space-5)" }}>
        {[
          { value: coursesCount, label: "Cursos" },
          { value: `${hoursCount}h`, label: "Aprendidas" },
          { value: certificatesCount, label: "Certificados" },
        ].map((item) => (
          <div key={item.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--text-primary)" }}>{item.value}</div>
            <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{item.label}</div>
          </div>
        ))}
      </div>
      <a href="/perfil" className="btn btn-ghost w-full btn-sm">Editar perfil</a>
    </div>
  );
}