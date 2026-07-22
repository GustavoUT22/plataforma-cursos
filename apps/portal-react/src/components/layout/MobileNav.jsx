import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard-estudiante", label: "🏠 Mi panel" },
  { to: "/cursos", label: "📚 Explorar cursos" },
  { to: "/mis-inscripciones", label: "📋 Mis inscripciones" },
  { to: "/perfil", label: "👤 Mi perfil" },
  { to: "/login", label: "🚪 Cerrar sesión" },
];

export default function MobileNav({ isOpen }) {
  return (
    <div className={`mobile-nav${isOpen ? " open" : ""}`} id="mobile-nav">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to}>
          {link.label}
        </NavLink>
      ))}
    </div>
  );
}