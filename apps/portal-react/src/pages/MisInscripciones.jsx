import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Sidebar from "../components/layout/Sidebar";
import Breadcrumb from "../components/common/Breadcrumb";
import PageHeader from "../components/dashboard/PageHeader";
import EnrollmentTableRow from "../components/inscripciones/EnrollmentTableRow";
import { getMyEnrollments, getToken } from "../lib/api";

const CATEGORY_STYLES = {
  Frontend: { iconBg: "linear-gradient(135deg,#1a1a2e,#7c3aed)", icon: "⚡" },
  Backend: { iconBg: "linear-gradient(135deg,#064e3b,#059669)", icon: "🚀" },
  Seguridad: { iconBg: "linear-gradient(135deg,#431407,#ea580c)", icon: "🔐" },
  "Bases de Datos": { iconBg: "linear-gradient(135deg,#1e1b4b,#4338ca)", icon: "🗃️" },
};
const DEFAULT_STYLE = { iconBg: "linear-gradient(135deg,#1e3a5f,#2563eb)", icon: "📚" };

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" });
}

function toRow(enrollment) {
  const course = enrollment.courseId || {};
  const style = CATEGORY_STYLES[course.category] || DEFAULT_STYLE;
  return {
    iconBg: style.iconBg,
    icon: style.icon,
    title: course.name || "Curso",
    category: course.category || "General",
    hours: course.duration ?? "—",
    teacher: course.teacher?.name || "Docente por asignar",
    date: formatDate(enrollment.enrolledAt),
    modality: "Virtual",
    modalityBadgeClass: "badge-primary",
    progress: 0,
    progressColorClass: "",
    status: "active",
    statusLabel: "Inscrito",
    statusBadgeClass: "badge-primary",
    actionLabel: "Ver curso",
    actionTo: "/cursos",
  };
}

export default function MisInscripciones() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!getToken()) {
      setError("Inicia sesión para ver tus inscripciones.");
      setLoading(false);
      return;
    }
    getMyEnrollments()
      .then((data) => setRows(data.map(toRow)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <div className="layout-with-sidebar">
        <Sidebar userName="Carlos García" userInitials="CG" userRole="Estudiante" />

        <main className="main-content">
          <Breadcrumb parentLabel="Mi panel" parentTo="/dashboard-estudiante" current="Mis inscripciones" />

          <PageHeader
            title="Mis inscripciones"
            subtitle="Gestiona y da seguimiento a todos tus cursos inscritos."
            actionLabel="+ Nuevo curso"
            actionTo="/cursos"
          />

          {loading && (
            <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "var(--space-8)" }}>
              Cargando inscripciones...
            </p>
          )}

          {error && (
            <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "var(--space-8)" }}>
              {error}
            </p>
          )}

          {!loading && !error && (
            <div className="table-wrapper">
              <table className="table" aria-label="Tabla de inscripciones">
                <thead>
                  <tr>
                    <th scope="col">Curso</th>
                    <th scope="col">Docente</th>
                    <th scope="col">Fecha de inscripción</th>
                    <th scope="col">Modalidad</th>
                    <th scope="col">Progreso</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((e, i) => (
                    <EnrollmentTableRow key={i} {...e} />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && !error && rows.length === 0 && (
            <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "var(--space-8)" }}>
              Aún no tienes inscripciones. Explora el catálogo para inscribirte.
            </p>
          )}
        </main>
      </div>
    </Layout>
  );
}
