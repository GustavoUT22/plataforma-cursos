export default function EnrollmentRow({ iconBg, icon, title, teacher, hours, modality, progress, status, actionLabel, actionTo }) {
  const progressColorClass = progress === 100 ? "success" : progress < 40 ? "warning" : "";
  const progressTextColor = progress === 100 ? "var(--success-600)" : progress < 40 ? "var(--warning-600)" : "var(--primary-600)";

  return (
    <div className="enrollment-row">
      <div className="enrollment-icon" style={{ background: iconBg }} aria-hidden="true">{icon}</div>
      <div className="enrollment-info">
        <div className="title">{title}</div>
        <div className="meta">{teacher} · {hours} horas · {modality}</div>
      </div>
      <div className="enrollment-progress" aria-label={`Progreso ${progress}%`}>
        <div className="progress-container">
          <div className="progress-header">
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>Progreso</span>
            <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: progressTextColor }}>{progress}%</span>
          </div>
          <div className="progress-bar-bg">
            <div className={`progress-bar ${progressColorClass}`} style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
      <div className="enrollment-actions">
        {status === "completed" ? (
          <button className="btn btn-success btn-sm">🏆 Certificado</button>
        ) : (
          <a href={actionTo} className="btn btn-primary btn-sm">{actionLabel}</a>
        )}
      </div>
    </div>
  );
}