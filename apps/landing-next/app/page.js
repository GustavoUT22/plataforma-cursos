import Link from "next/link";
import { getCourses } from "@/lib/api";
import CourseCard from "@/components/CourseCard";

export default async function HomePage() {
  const { courses, error } = await getCourses();
  const featured = courses.slice(0, 3);

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="container">
          <div className="hero-content">
            <div className="hero-eyebrow">✦ Plataforma académica certificada</div>
            <h1 id="hero-heading" className="hero-title">
              Aprende, crece y
              <br />
              <span className="highlight">lidera el futuro</span>
              <br />
              tecnológico
            </h1>
            <p className="hero-subtitle">
              Formación de calidad universitaria en programación, desarrollo
              web, backend, bases de datos y más. Accede desde cualquier
              dispositivo.
            </p>
            <div className="hero-actions">
              <Link href="/cursos" className="btn btn-primary btn-lg">
                Explorar cursos
              </Link>
              <Link href="/cursos" className="btn btn-secondary btn-lg">
                Ver catálogo completo
              </Link>
            </div>
            <div className="hero-stats" role="list" aria-label="Estadísticas de la plataforma">
              <div className="hero-stat" role="listitem">
                <div className="value">{courses.length}</div>
                <div className="label">Cursos disponibles</div>
              </div>
              <div className="hero-stat" role="listitem">
                <div className="value">100%</div>
                <div className="label">Online</div>
              </div>
              <div className="hero-stat" role="listitem">
                <div className="value">ISIL</div>
                <div className="label">Certificación académica</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CURSOS DESTACADOS ===== */}
      <section className="section bg-gray" id="beneficios" aria-labelledby="featured-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Oferta académica</span>
            <h2 id="featured-heading" className="section-title">
              Cursos destacados
            </h2>
            <p className="section-subtitle">
              Estos son algunos de los cursos disponibles ahora mismo en la
              plataforma.
            </p>
          </div>

          {error && (
            <div className="empty-state">
              <h3>No se pudo cargar el catálogo</h3>
              <p>{error}</p>
            </div>
          )}

          {!error && featured.length === 0 && (
            <div className="empty-state">
              <h3>Todavía no hay cursos publicados</h3>
              <p>Corre el seed del backend para cargar cursos de ejemplo.</p>
            </div>
          )}

          {!error && featured.length > 0 && (
            <div className="grid grid-3" role="list" aria-label="Cursos destacados">
              {featured.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}

          {!error && courses.length > 3 && (
            <div style={{ textAlign: "center", marginTop: "var(--space-10)" }}>
              <Link href="/cursos" className="btn btn-primary">
                Ver los {courses.length} cursos
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
