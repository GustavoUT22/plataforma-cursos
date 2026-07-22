import { useState } from "react";
import Layout from "../components/layout/Layout";
import Sidebar from "../components/layout/Sidebar";
import Breadcrumb from "../components/common/Breadcrumb";
import PageHeader from "../components/dashboard/PageHeader";
import Tabs from "../components/common/Tabs";
import SearchInput from "../components/common/SearchInput";
import CourseCard from "../components/cursos/CourseCard";

const allCourses = [
  { id: 1, iconBg: "linear-gradient(135deg,#1a1a2e,#7c3aed)", icon: "⚡", title: "Desarrollo Frontend con React", teacher: "María Torres", category: "Frontend", categoryBadgeClass: "badge-primary", hours: 60, rating: "4.8", price: "S/ 250", isEnrolled: true, actionTo: "/detalle-curso" },
  { id: 2, iconBg: "linear-gradient(135deg,#064e3b,#059669)", icon: "🚀", title: "Backend con Node.js", teacher: "Luis Ramírez", category: "Backend", categoryBadgeClass: "badge-success", hours: 55, rating: "4.7", price: "S/ 220", isEnrolled: true, actionTo: "/detalle-curso" },
  { id: 3, iconBg: "linear-gradient(135deg,#1e3a5f,#2563eb)", icon: "⚛️", title: "Programación Web II", teacher: "Juan Pérez", category: "Frontend", categoryBadgeClass: "badge-primary", hours: 40, rating: "4.9", price: "S/ 180", isEnrolled: true, actionTo: "/detalle-curso" },
  { id: 4, iconBg: "linear-gradient(135deg,#431407,#ea580c)", icon: "🔐", title: "Seguridad en Aplicaciones Web", teacher: "Ana Flores", category: "Seguridad", categoryBadgeClass: "badge-accent", hours: 45, rating: "4.9", price: "S/ 200", isEnrolled: false, actionTo: "/detalle-curso" },
  { id: 5, iconBg: "linear-gradient(135deg,#1e1b4b,#4338ca)", icon: "🗃️", title: "Bases de Datos NoSQL", teacher: "Pedro Salas", category: "Bases de Datos", categoryBadgeClass: "badge-gray", hours: 35, rating: "4.6", price: "Gratuito", isEnrolled: false, actionTo: "/detalle-curso" },
  { id: 6, iconBg: "linear-gradient(135deg,#422006,#ca8a04)", icon: "🟨", title: "JavaScript Moderno ES6+", teacher: "Rosa Medina", category: "Frontend", categoryBadgeClass: "badge-primary", hours: 30, rating: "4.7", price: "S/ 150", isEnrolled: false, actionTo: "/detalle-curso" },
  { id: 7, iconBg: "linear-gradient(135deg,#0c4a6e,#0284c7)", icon: "🐳", title: "DevOps y CI/CD", teacher: "Diego Vera", category: "Backend", categoryBadgeClass: "badge-success", hours: 50, rating: "4.5", price: "S/ 230", isEnrolled: false, actionTo: "/detalle-curso" },
];

const categories = ["Todos", "Frontend", "Backend", "Seguridad", "Bases de Datos"];

export default function Cursos() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const tabs = categories.map((c) => ({ key: c, label: c }));

  const filtered = allCourses.filter((course) => {
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

          <div className="grid grid-3" style={{ marginTop: "var(--space-6)" }}>
            {filtered.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "var(--space-8)" }}>
              No se encontraron cursos con esos filtros.
            </p>
          )}
        </main>
      </div>
    </Layout>
  );
}