import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../lib/api";

const mainLinks = [
  { to: "/dashboard-estudiante", icon: "🏠", label: "Inicio" },
  { to: "/mis-inscripciones", icon: "📚", label: "Mis inscripciones", badge: 3 },
  { to: "/cursos", icon: "🔍", label: "Explorar" },
];

export default function Sidebar({ userName, userInitials, userRole }) {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

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
        <NavLink to="/perfil" className={({ isActive }) => (isActive ? "active" : undefined)}>
          <span className="nav-icon" aria-hidden="true">👤</span> Mi perfil
        </NavLink>
        <button type="button" className="sidebar-logout" onClick={handleLogout}>
          <span className="nav-icon" aria-hidden="true">🚪</span> Cerrar sesión
        </button>
      </nav>
    </aside>
  );
}
