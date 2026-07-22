import ReadOnlyField from "../common/ReadOnlyField";

export function PersonalInfoCard({ nombre, apellidos, correo, telefono, pais }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Información personal</h2>
        <button className="btn btn-ghost btn-sm">Editar</button>
      </div>
      <div className="form-row cols-2" style={{ marginBottom: "var(--space-5)" }}>
        <ReadOnlyField label="Nombre" value={nombre} />
        <ReadOnlyField label="Apellidos" value={apellidos} />
      </div>
      <ReadOnlyField label="Correo electrónico" value={correo} badge={{ className: "badge-success", label: "Verificado" }} />
      <div className="form-row cols-2" style={{ marginTop: "var(--space-5)" }}>
        <ReadOnlyField label="Teléfono" value={telefono} />
        <ReadOnlyField label="País" value={pais} />
      </div>
    </div>
  );
}

export function AcademicInfoCard({ programa, ciclo, universidad, objetivos }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Datos académicos</h2>
        <button className="btn btn-ghost btn-sm">Editar</button>
      </div>
      <div className="form-row cols-2" style={{ marginBottom: "var(--space-5)" }}>
        <ReadOnlyField label="Programa académico" value={programa} />
        <ReadOnlyField label="Ciclo / Semestre" value={ciclo} />
      </div>
      <div style={{ marginBottom: "var(--space-5)" }}>
        <ReadOnlyField label="Universidad" value={universidad} />
      </div>
      <ReadOnlyField label="Objetivos de aprendizaje" value={objetivos} />
    </div>
  );
}