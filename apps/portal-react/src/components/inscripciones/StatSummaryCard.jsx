export default function StatSummaryCard({ value, valueColor, label }) {
  return (
    <div className="card" style={{ textAlign: "center" }}>
      <div style={{ fontSize: "2.5rem", fontWeight: 900, color: valueColor }}>{value}</div>
      <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{label}</div>
    </div>
  );
}