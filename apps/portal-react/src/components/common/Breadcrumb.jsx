import { Link } from "react-router-dom";

export default function Breadcrumb({ parentLabel, parentTo, current }) {
  return (
    <nav className="breadcrumb" aria-label="Ruta de navegación">
      <Link to={parentTo}>{parentLabel}</Link>
      <span className="separator" aria-hidden="true">›</span>
      <span className="current">{current}</span>
    </nav>
  );
}