import { NavLink, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/dashboard-estudiante", label: "Mi panel" },
  { to: "/cursos", label: "Explorar cursos" },
  { to: "/mis-inscripciones", label: "Mis inscripciones" },
];

export default function Navbar({ userName, userInitials, mobileNavOpen, onToggleMobileNav }) {
  const { pathname } = useLocation();

  return (
    <nav className="navbar" role="navigation" aria-label="Navegación del panel">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          <div className="brand-icon" aria-hidden="true">🎓</div>
          <span>Edu<em>Tech</em></span>
        </NavLink>

        <ul className="navbar-nav" role="list">
          {navLinks.map((link) => {
            const isActive = pathname === link.to;
            return (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={isActive ? "active" : undefined}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className="navbar-actions">
          <div
            className="navbar-user"
            tabIndex={0}
            role="button"
            aria-label={`Menú de usuario de ${userName}`}
          >
            <div className="avatar" aria-hidden="true">{userInitials}</div>
            <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--gray-700)" }}>
              {userName}
            </span>
            <span aria-hidden="true" style={{ color: "var(--gray-400)" }}>▾</span>
          </div>

          <button
            className="hamburger"
            aria-label="Abrir menú"
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-nav"
            onClick={onToggleMobileNav}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}