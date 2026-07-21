import Layout from "../components/layout/Layout";
import Sidebar from "../components/layout/Sidebar";
import Breadcrumb from "../components/common/Breadcrumb";
import { PersonalInfoCard, AcademicInfoCard } from "../components/perfil/InfoCards";
import PasswordForm from "../components/perfil/PasswordForm";
import { ActivitySummaryCard, CertificateCard, SkillBadges, NotificationSettings } from "../components/perfil/SideCards";

const skills = [
  { label: "HTML5", className: "badge-primary" }, { label: "CSS3", className: "badge-primary" },
  { label: "JavaScript", className: "badge-primary" }, { label: "React", className: "badge-accent" },
  { label: "Node.js", className: "badge-success" }, { label: "Git", className: "badge-gray" },
  { label: "MongoDB", className: "badge-gray" }, { label: "REST APIs", className: "badge-gray" },
];

export default function Perfil() {
  return (
    <Layout>
      <div className="layout-with-sidebar">
        <Sidebar userName="Carlos García" userInitials="CG" userRole="Estudiante" />
        <main className="main-content">
          <Breadcrumb parentLabel="Mi panel" parentTo="/dashboard-estudiante" current="Mi perfil" />

          {/* Hero — queda inline en la página, es contenido único de este perfil */}
          <div style={{ background: "linear-gradient(135deg,var(--gray-900),#1e1b4b)", borderRadius: "var(--border-radius-xl)", padding: "var(--space-10) var(--space-8)", marginBottom: "var(--space-8)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,.2), transparent 70%)" }} aria-hidden="true"></div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "var(--space-6)", position: "relative", zIndex: 1, flexWrap: "wrap" }}>
              <div style={{ position: "relative" }}>
                <div className="avatar xl" aria-label="Foto de perfil de Carlos García">CG</div>
                <button style={{ position: "absolute", bottom: 0, right: 0, width: 28, height: 28, background: "var(--primary-600)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", cursor: "pointer", border: "2px solid var(--white)" }} aria-label="Cambiar foto de perfil">✏️</button>
              </div>
              <div style={{ flex: 1 }}>
                <h1 style={{ color: "var(--white)", fontSize: "var(--text-3xl)", marginBottom: "var(--space-1)" }}>Carlos García López</h1>
                <p style={{ color: "var(--primary-400)", fontWeight: 600, fontSize: "var(--text-base)", marginBottom: "var(--space-3)" }}>Estudiante · Ingeniería de Sistemas</p>
                <p style={{ color: "var(--gray-400)", fontSize: "var(--text-sm)" }}>Lima, Perú · Miembro desde enero 2024</p>
              </div>
              <button className="btn btn-primary btn-sm">✏️ Editar perfil</button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "var(--space-6)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
              <PersonalInfoCard nombre="Carlos" apellidos="García López" correo="cgarcia@edutech.pe" telefono="+51 987 654 321" pais="Perú" />
              <AcademicInfoCard programa="Ingeniería de Sistemas" ciclo="7mo ciclo" universidad="Universidad Nacional de Ingeniería" objetivos="Especializarme en desarrollo full-stack con React y Node.js para trabajar en startups de tecnología y eventualmente emprender un proyecto propio." />
              <PasswordForm />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
              <ActivitySummaryCard cursos={3} completados={1} horas={87} certificados={1} />
              <CertificateCard curso="Programación Web II" fecha="Marzo 2024" />
              <SkillBadges skills={skills} />
              <NotificationSettings />
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}