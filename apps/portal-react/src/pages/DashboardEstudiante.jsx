import Layout from "../components/layout/Layout";
import Sidebar from "../components/layout/Sidebar";
import PageHeader from "../components/dashboard/PageHeader";
import StatCard from "../components/dashboard/StatCard";
import EnrollmentRow from "../components/dashboard/EnrollmentRow";
import UpcomingClassItem from "../components/dashboard/UpcomingClassItem";
import ProfileSummaryCard from "../components/dashboard/ProfileSummaryCard";
import RecommendedCourseItem from "../components/dashboard/RecommendedCourseItem";

const stats = [
  { icon: "📚", colorClass: "blue", label: "Cursos inscritos", value: 3, change: "↑ +1 este mes" },
  { icon: "✅", colorClass: "green", label: "Completados", value: 1, change: "↑ 33% finalización" },
  { icon: "🕒", colorClass: "yellow", label: "Horas aprendidas", value: 87, change: "↑ +12 esta semana" },
  { icon: "🏆", colorClass: "purple", label: "Certificados", value: 1, change: "↑ +1 este mes" },
];

const enrollments = [
  { iconBg: "linear-gradient(135deg,#1a1a2e,#7c3aed)", icon: "⚡", title: "Desarrollo Frontend con React", teacher: "👩‍🏫 María Torres", hours: 60, modality: "Virtual", progress: 72, status: "active", actionLabel: "Continuar", actionTo: "/detalle-curso" },
  { iconBg: "linear-gradient(135deg,#064e3b,#059669)", icon: "🚀", title: "Backend con Node.js", teacher: "👨‍🏫 Luis Ramírez", hours: 55, modality: "Virtual", progress: 38, status: "active", actionLabel: "Continuar", actionTo: "/detalle-curso" },
  { iconBg: "linear-gradient(135deg,#1e3a5f,#2563eb)", icon: "⚛️", title: "Programación Web II", teacher: "👨‍🏫 Juan Pérez", hours: 40, modality: "Virtual", progress: 100, status: "completed" },
];

const upcomingClasses = [
  { month: "ABR", day: "07", dateBg: "var(--primary-50)", dateColor: "var(--primary-600)", title: "React Avanzado: Performance Optimization", meta: "Desarrollo Frontend con React · 7:00 PM - 9:00 PM", badgeText: "En vivo", badgeClass: "badge-primary" },
  { month: "ABR", day: "09", dateBg: "var(--success-100)", dateColor: "var(--success-600)", title: "Node.js: Autenticación JWT", meta: "Backend con Node.js · 6:00 PM - 8:00 PM", badgeText: "Grabado", badgeClass: "badge-gray" },
  { month: "ABR", day: "12", dateBg: "var(--accent-100)", dateColor: "var(--accent-600)", title: "Evaluación Módulo 3 — React Router", meta: "Desarrollo Frontend con React · Entrega antes de las 11:59 PM", badgeText: "Evaluación", badgeClass: "badge-warning" },
];

const recommended = [
  { iconBg: "linear-gradient(135deg,#431407,#ea580c)", icon: "🔐", title: "Seguridad en Aplicaciones Web", rating: "4.9", price: "S/ 200" },
  { iconBg: "linear-gradient(135deg,#1e1b4b,#4338ca)", icon: "🗃️", title: "Bases de Datos NoSQL", rating: "4.6", price: "Gratuito" },
];

export default function DashboardEstudiante() {
  return (
    <Layout>
      <div className="layout-with-sidebar">
        <Sidebar userName="Carlos García" userInitials="CG" userRole="Estudiante" />

        <main className="main-content">
          <PageHeader
            title="¡Hola, Carlos! 👋"
            subtitle="Aquí tienes un resumen de tu actividad académica de hoy, lunes 06 de abril de 2026."
            actionLabel="+ Explorar cursos"
            actionTo="/cursos"
          />

          <div className="grid grid-4" style={{ marginBottom: "var(--space-8)" }} role="list" aria-label="Estadísticas del estudiante">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "var(--space-6)" }}>
            <div>
              <div className="card" style={{ marginBottom: "var(--space-6)" }}>
                <div className="card-header">
                  <h2 className="card-title">Mis cursos activos</h2>
                  <a href="/mis-inscripciones" className="btn btn-ghost btn-sm">Ver todos →</a>
                </div>
                {enrollments.map((e) => (
                  <EnrollmentRow key={e.title} {...e} />
                ))}
              </div>

              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Próximas clases</h2>
                  <a href="#" className="btn btn-ghost btn-sm">Ver calendario →</a>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                  {upcomingClasses.map((item, i) => (
                    <UpcomingClassItem key={item.title} {...item} isLast={i === upcomingClasses.length - 1} />
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
              <ProfileSummaryCard initials="CG" name="Carlos García" career="Ingeniería de Sistemas" coursesCount={3} hoursCount={87} certificatesCount={1} />

              <div className="card">
                <h3 className="card-title" style={{ marginBottom: "var(--space-5)" }}>Recomendados para ti</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                  {recommended.map((r) => (
                    <RecommendedCourseItem key={r.title} {...r} />
                  ))}
                </div>
                <a href="/cursos" className="btn btn-ghost w-full btn-sm" style={{ marginTop: "var(--space-4)" }}>Ver catálogo →</a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}