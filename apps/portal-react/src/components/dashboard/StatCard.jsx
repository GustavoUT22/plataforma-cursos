export default function StatCard({ icon, colorClass, label, value, change }) {
  return (
    <div className="stat-card" role="listitem">
      <div className={`stat-icon ${colorClass}`} aria-hidden="true">{icon}</div>
      <div className="stat-content">
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
        <div className="stat-change up">{change}</div>
      </div>
    </div>
  );
}