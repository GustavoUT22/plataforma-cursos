import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar" aria-label="Navegación principal">
      <div className="container">
        <Link href="/" className="navbar-brand" aria-label="EduTech inicio">
          <div className="brand-icon" aria-hidden="true">🎓</div>
          <span>
            Edu<em>Tech</em>
          </span>
        </Link>

        <ul className="navbar-nav" role="list">
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/cursos">Cursos</Link>
          </li>
          <li>
            <Link href="/#beneficios">Beneficios</Link>
          </li>
        </ul>

        <div className="navbar-actions">
          <Link href="/cursos" className="btn btn-ghost btn-sm">
            Ver cursos
          </Link>
        </div>
      </div>
    </nav>
  );
}
