export default function EnrollmentTableRow({ iconBg, icon, title, category, hours, teacher, date, modality, modalityBadgeClass, progress, progressColorClass, status, statusLabel, statusBadgeClass, actionLabel, actionTo }) {
  return (
    <tr>
      <td>
        <div className="user-cell">
          <div style={{ width: 42, height: 42, background: iconBg, borderRadius: "var(--border-radius)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", flexShrink: 0 }} aria-hidden="true">
            {icon}
          </div>
          <div className="user-info">
            <div className="name">{title}</div>
            <div className="sub">{category} · {hours} horas</div>
          </div>
        </div>
      </td>
      <td>{teacher}</td>
      <td>{date}</td>
      <td><span className={`badge ${modalityBadgeClass} no-dot`}>{modality}</span></td>
      <td>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <div className="progress-bar-bg" style={{ width: 100 }} aria-label={`${progress}% completado`}>
            <div className={`progress-bar ${progressColorClass}`} style={{ width: `${progress}%` }}></div>
          </div>
          <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--primary-600)" }}>{progress}%</span>
        </div>
      </td>
      <td><span className={`badge ${statusBadgeClass}`}>{statusLabel}</span></td>
      <td>
        <div className="td-actions">
          {status === "completed" ? (
            <button className="btn btn-success btn-sm">🏆 Certificado</button>
          ) : (
            <a href={actionTo} className="btn btn-primary btn-sm">{actionLabel}</a>
          )}
          <button className="btn btn-ghost btn-icon" title="Ver detalles" aria-label="Ver detalles del curso">ℹ️</button>
        </div>
      </td>
    </tr>
  );
}