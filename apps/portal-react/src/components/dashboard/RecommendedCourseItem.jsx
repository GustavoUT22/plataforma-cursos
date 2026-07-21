export default function RecommendedCourseItem({ iconBg, icon, title, rating, price }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
      <div style={{ width: 48, height: 48, background: iconBg, borderRadius: "var(--border-radius)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }} aria-hidden="true">
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: "var(--text-sm)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</div>
        <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>⭐ {rating} · {price}</div>
      </div>
    </div>
  );
}