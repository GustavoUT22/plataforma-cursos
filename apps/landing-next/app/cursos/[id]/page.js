import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseById } from "@/lib/api";

export async function generateMetadata({ params }) {
  const { course } = await getCourseById(params.id);
  return { title: course ? `${course.name} | EduTech Academy` : "Curso no encontrado" };
}

export default async function CourseDetailPage({ params }) {
  const { course, error } = await getCourseById(params.id);

  if (error) {
    return (
      <main>
        <section className="page-header">
          <div className="container">
            <h1>No se pudo cargar el curso</h1>
            <p>{error}</p>
          </div>
        </section>
      </main>
    );
  }

  if (!course) {
    notFound();
  }

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <nav className="breadcrumb" aria-label="Ruta de navegación">
            <Link href="/">Inicio</Link> <span className="separator">›</span>{" "}
            <Link href="/cursos">Cursos</Link> <span className="separator">›</span>{" "}
            <span className="current">{course.name}</span>
          </nav>
          <h1>{course.name}</h1>
          {course.category && (
            <span className="badge badge-primary">{course.category}</span>
          )}
        </div>
      </section>

      <section className="section-sm">
        <div className="container" style={{ maxWidth: 720 }}>
          <p style={{ fontSize: "var(--text-lg)", marginBottom: "var(--space-6)" }}>
            {course.description}
          </p>

          {course.teacher?.name && (
            <p style={{ color: "var(--text-secondary)", marginBottom: "var(--space-8)" }}>
              👨‍🏫 Docente: <strong>{course.teacher.name}</strong>
              {course.teacher.email ? ` (${course.teacher.email})` : ""}
            </p>
          )}

          <Link href="/cursos" className="btn btn-ghost">
            ← Volver al catálogo
          </Link>
        </div>
      </section>
    </main>
  );
}
