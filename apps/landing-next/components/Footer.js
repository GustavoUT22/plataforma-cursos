export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-brand">
          <div className="brand-icon" aria-hidden="true">🎓</div>
          EduTech
        </div>
        <p className="footer-desc">
          Plataforma académica de gestión de cursos e inscripciones.
          Proyecto integrador full stack — Programación Web II (ISIL).
        </p>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} EduTech Academy</span>
          <span>Landing construida con Next.js</span>
        </div>
      </div>
    </footer>
  );
}
