import { useState } from "react";
import Layout from "../components/layout/Layout";
import Sidebar from "../components/layout/Sidebar";
import Breadcrumb from "../components/common/Breadcrumb";
import Tabs from "../components/common/Tabs";
import PageHeader from "../components/dashboard/PageHeader";
import EnrollmentTableRow from "../components/inscripciones/EnrollmentTableRow";
import StatSummaryCard from "../components/inscripciones/StatSummaryCard";

const allEnrollments = [
  { iconBg: "linear-gradient(135deg,#1a1a2e,#7c3aed)", icon: "⚡", title: "Desarrollo Frontend con React", category: "Full Stack", hours: 60, teacher: "María Torres", date: "15 feb 2024", modality: "Virtual", modalityBadgeClass: "badge-primary", progress: 72, progressColorClass: "", status: "active", statusLabel: "En progreso", statusBadgeClass: "badge-primary", actionLabel: "Continuar", actionTo: "/detalle-curso" },
  { iconBg: "linear-gradient(135deg,#064e3b,#059669)", icon: "🚀", title: "Backend con Node.js", category: "Backend", hours: 55, teacher: "Luis Ramírez", date: "01 mar 2024", modality: "Virtual", modalityBadgeClass: "badge-primary", progress: 38, progressColorClass: "warning", status: "active", statusLabel: "En progreso", statusBadgeClass: "badge-warning", actionLabel: "Continuar", actionTo: "/detalle-curso" },
  { iconBg: "linear-gradient(135deg,#1e3a5f,#2563eb)", icon: "⚛️", title: "Programación Web II", category: "Frontend", hours: 40, teacher: "Juan Pérez", date: "10 ene 2024", modality: "Híbrida", modalityBadgeClass: "badge-accent", progress: 100, progressColorClass: "success", status: "completed", statusLabel: "Completado", statusBadgeClass: "badge-success" },
];

const tabs = [
  { key: "all", label: `Todos (${allEnrollments.length})` },
  { key: "active", label: `En progreso (${allEnrollments.filter(e => e.status === "active").length})` },
  { key: "completed", label: `Completados (${allEnrollments.filter(e => e.status === "completed").length})` },
];

export default function MisInscripciones() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all"
    ? allEnrollments
    : allEnrollments.filter((e) => e.status === activeTab);

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

          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

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
                {filtered.map((e) => (
                  <EnrollmentTableRow key={e.title} {...e} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-3" style={{ marginTop: "var(--space-8)" }}>
            <StatSummaryCard value="S/ 450" valueColor="var(--primary-600)" label="Total invertido" />
            <StatSummaryCard value="87h" valueColor="var(--success-600)" label="Horas completadas" />
            <StatSummaryCard value="70%" valueColor="var(--accent-600)" label="Promedio de avance" />
          </div>
        </main>
      </div>
    </Layout>
  );
}