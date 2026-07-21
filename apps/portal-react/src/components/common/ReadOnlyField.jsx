export default function ReadOnlyField({ label, value, badge }) {
  return (
    <div className="form-group" style={{ marginBottom: 0 }}>
      <div className="form-label">{label}</div>
      <div style={{ padding: "var(--space-3) var(--space-4)", background: "var(--gray-50)", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius)", fontSize: "var(--text-sm)", color: "var(--text-primary)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span>{value}</span>
        {badge && <span className={`badge ${badge.className} no-dot`} style={{ fontSize: 10 }}>{badge.label}</span>}
      </div>
    </div>
  );
}