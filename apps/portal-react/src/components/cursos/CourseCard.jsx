export default function CourseCard({ iconBg, icon, title, teacher, category, categoryBadgeClass, hours, rating, price, isEnrolled, actionTo }) {
  return (
    <div className="card">
      <div style={{ width: "100%", height: 120, background: iconBg, borderRadius: "var(--border-radius)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", marginBottom: "var(--space-4)" }} aria-hidden="true">
        {icon}
      </div>
      <span className={`badge ${categoryBadgeClass} no-dot`} style={{ marginBottom: "var(--space-3)" }}>{category}</span>
      <h3 style={{ fontSize: "var(--text-base)", fontWeight: 700, marginBottom: "var(--space-2)" }}>{title}</h3>
      <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", marginBottom: "var(--space-3)" }}>{teacher} · {hours} horas</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-4)" }}>
        <span style={{ fontSize: "var(--text-sm)" }}>⭐ {rating}</span>
        <span style={{ fontWeight: 700, color: "var(--primary-600)" }}>{price}</span>
      </div>
      <a href={actionTo} className={`btn ${isEnrolled ? "btn-ghost" : "btn-primary"} w-full btn-sm`}>
        {isEnrolled ? "Continuar" : "Inscribirme"}
      </a>
    </div>
  );
}