export default function PageHeader({ title, subtitle, actionLabel, actionTo }) {
  return (
    <div className="page-header">
      <div className="page-header-row">
        <div>
          <h1 className="page-title">{title}</h1>
          <p className="page-subtitle">{subtitle}</p>
        </div>
        {actionLabel && (
          <a href={actionTo} className="btn btn-primary">
            {actionLabel}
          </a>
        )}
      </div>
    </div>
  );
}