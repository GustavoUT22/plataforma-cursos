import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../lib/api";

const links = [
  { to: "/dashboard-estudiante", label: "🏠 Mi panel" },
  { to: "/cursos", label: "📚 Explorar cursos" },
  { to: "/mis-inscripciones", label: "📋 Mis inscripciones" },
  { to: "/perfil", label: "👤 Mi perfil" },
];

export default function MobileNav({ isOpen }) {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className={`mobile-nav${isOpen ? " open" : ""}`} id="mobile-nav">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to}>
          {link.label}
        </NavLink>
      ))}
      <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
        🚪 Cerrar sesión
      </a>
    </div>
  );
}
