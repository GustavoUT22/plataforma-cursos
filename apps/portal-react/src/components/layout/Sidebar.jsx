import { NavLink } from "react-router-dom";

const mainLinks = [
  { to: "/dashboard-estudiante", icon: "🏠", label: "Inicio" },
  { to: "/mis-inscripciones", icon: "📚", label: "Mis inscripciones", badge: 3 },
  { to: "/cursos", icon: "🔍", label: "Explorar" },
];

const accountLinks = [
  { to: "/perfil", icon: "👤", label: "Mi perfil" },
  { to: "/login", icon: "🚪", label: "Cerrar sesión" },
];

export default function Sidebar({ userName, userInitials, userRole }) {
  return (
    <aside className="sidebar" aria-label="Menú lateral del estudiante">
      <div className="sidebar-header">
        <div className="sidebar-user">
          <div className="avatar" aria-label={`Foto de ${userName}`}>{userInitials}</div>
          <div className="user-info">
            <div className="name">{userName}</div>
            <div className="role">{userRole}</div>
          </div>
        </div>
        <div className="sidebar-title">Panel estudiantil</div>
      </div>

      <nav className="sidebar-nav" aria-label="Navegación del panel">
        {mainLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <span className="nav-icon" aria-hidden="true">{link.icon}</span> {link.label}
            {link.badge && <span className="sidebar-badge">{link.badge}</span>}
          </NavLink>
        ))}

        <div className="sidebar-section-label">Cuenta</div>
        {accountLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <span className="nav-icon" aria-hidden="true">{link.icon}</span> {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}