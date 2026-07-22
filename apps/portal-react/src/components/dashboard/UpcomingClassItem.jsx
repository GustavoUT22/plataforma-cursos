export default function UpcomingClassItem({ month, day, dateBg, dateColor, title, meta, badgeText, badgeClass, isLast }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-4)",
        padding: "var(--space-3) 0",
        borderBottom: isLast ? "none" : "1px solid var(--gray-100)",
      }}
    >
      <div style={{ background: dateBg, borderRadius: "var(--border-radius)", padding: "var(--space-3) var(--space-4)", textAlign: "center", flexShrink: 0 }}>
        <div style={{ fontSize: "var(--text-xs)", color: dateColor, fontWeight: 700, textTransform: "uppercase" }}>{month}</div>
        <div style={{ fontSize: "var(--text-2xl)", fontWeight: 900, color: dateColor, lineHeight: 1 }}>{day}</div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: "var(--text-sm)" }}>{title}</div>
        <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{meta}</div>
      </div>
      <span className={`badge ${badgeClass} no-dot`}>{badgeText}</span>
    </div>
  );
}