import { useEffect, useMemo, useState } from "react";
import Layout from "../components/layout/Layout";
import Sidebar from "../components/layout/Sidebar";
import Breadcrumb from "../components/common/Breadcrumb";
import PageHeader from "../components/dashboard/PageHeader";
import Tabs from "../components/common/Tabs";
import SearchInput from "../components/common/SearchInput";
import CourseCard from "../components/cursos/CourseCard";
import { getCourses } from "../lib/api";

// Presentación: gradiente, icono y color de badge según la categoría del curso.
const CATEGORY_STYLES = {
  Frontend: { iconBg: "linear-gradient(135deg,#1a1a2e,#7c3aed)", icon: "⚡", badge: "badge-primary" },
  Backend: { iconBg: "linear-gradient(135deg,#064e3b,#059669)", icon: "🚀", badge: "badge-success" },
  Seguridad: { iconBg: "linear-gradient(135deg,#431407,#ea580c)", icon: "🔐", badge: "badge-accent" },
  "Bases de Datos": { iconBg: "linear-gradient(135deg,#1e1b4b,#4338ca)", icon: "🗃️", badge: "badge-gray" },
};
const DEFAULT_STYLE = { iconBg: "linear-gradient(135deg,#1e3a5f,#2563eb)", icon: "📚", badge: "badge-gray" };

function toCard(course) {
  const style = CATEGORY_STYLES[course.category] || DEFAULT_STYLE;
  return {
    id: course._id,
    iconBg: style.iconBg,
    icon: style.icon,
    title: course.name,
    teacher: course.teacher?.name || "Docente por asignar",
    category: course.category,
    categoryBadgeClass: style.badge,
    hours: course.duration ?? 0,
    rating: "—",
    price: course.price > 0 ? `S/ ${course.price}` : "Gratuito",
    isEnrolled: false,
    actionTo: "/cursos",
  };
}

export default function Cursos() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  useEffect(() => {
    getCourses()
      .then((data) => setCourses(data.map(toCard)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => ["Todos", ...new Set(courses.map((c) => c.category).filter(Boolean))],
    [courses],
  );
  const tabs = categories.map((c) => ({ key: c, label: c }));

  const filtered = courses.filter((course) => {
    const matchesCategory = activeCategory === "Todos" || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <div className="layout-with-sidebar">
        <Sidebar userName="Carlos García" userInitials="CG" userRole="Estudiante" />
        <main className="main-content">
          <Breadcrumb parentLabel="Mi panel" parentTo="/dashboard-estudiante" current="Explorar cursos" />

          <PageHeader
            title="Catálogo de cursos"
            subtitle="Explora todos los cursos disponibles en la plataforma."
          />

          <div style={{ marginBottom: "var(--space-5)", maxWidth: 400 }}>
            <SearchInput value={search} onChange={setSearch} placeholder="Buscar curso..." />
          </div>

          <Tabs tabs={tabs} activeTab={activeCategory} onChange={setActiveCategory} />

          {loading && (
            <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "var(--space-8)" }}>
              Cargando cursos...
            </p>
          )}

          {error && (
            <p style={{ textAlign: "center", color: "var(--accent-600)", marginTop: "var(--space-8)" }}>
              No se pudieron cargar los cursos: {error}
            </p>
          )}

          {!loading && !error && (
            <div className="grid grid-3" style={{ marginTop: "var(--space-6)" }}>
              {filtered.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "var(--space-8)" }}>
              No se encontraron cursos con esos filtros.
            </p>
          )}
        </main>
      </div>
    </Layout>
  );
}
