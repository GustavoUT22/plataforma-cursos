import { getCourses } from "@/lib/api";
import CourseCard from "@/components/CourseCard";

export const metadata = {
  title: "Catálogo de cursos | EduTech Academy",
};

export default async function CursosPage() {
  const { courses, error } = await getCourses();

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <nav className="breadcrumb" aria-label="Ruta de navegación">
            Inicio <span className="separator">›</span>{" "}
            <span className="current">Cursos</span>
          </nav>
          <h1>Catálogo de cursos</h1>
          <p>
            Explora nuestra oferta académica y encuentra el curso ideal para
            tu carrera.
          </p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          {error && (
            <div className="empty-state">
              <h3>No se pudo cargar el catálogo</h3>
              <p>{error}</p>
            </div>
          )}

          {!error && (
            <p style={{ marginBottom: "var(--space-6)", color: "var(--text-secondary)" }}>
              Mostrando <strong>{courses.length}</strong>{" "}
              {courses.length === 1 ? "curso" : "cursos"}
            </p>
          )}

          {!error && courses.length === 0 && (
            <div className="empty-state">
              <h3>Todavía no hay cursos publicados</h3>
              <p>Corre el seed del backend (`npm run seed`) para cargar cursos de ejemplo.</p>
            </div>
          )}

          {!error && courses.length > 0 && (
            <div className="grid grid-3" role="list" aria-label="Listado de cursos">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
