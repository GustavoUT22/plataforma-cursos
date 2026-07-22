import { useState } from "react";

export default function PasswordForm() {
  const [form, setForm] = useState({ actual: "", nueva: "", confirmar: "" });

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: conectar con la API cuando esté lista
    console.log(form);
  };

  return (
    <div className="card">
      <div className="card-header"><h2 className="card-title">Seguridad de la cuenta</h2></div>
      <form aria-label="Formulario de cambio de contraseña" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="pass-actual" className="form-label">Contraseña actual <span className="required" aria-hidden="true">*</span></label>
          <input type="password" id="pass-actual" className="form-control" placeholder="••••••••" autoComplete="current-password" value={form.actual} onChange={handleChange("actual")} />
        </div>
        <div className="form-row cols-2">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="pass-nueva" className="form-label">Nueva contraseña <span className="required" aria-hidden="true">*</span></label>
            <input type="password" id="pass-nueva" className="form-control" placeholder="••••••••" autoComplete="new-password" value={form.nueva} onChange={handleChange("nueva")} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="pass-confirmar" className="form-label">Confirmar contraseña <span className="required" aria-hidden="true">*</span></label>
            <input type="password" id="pass-confirmar" className="form-control" placeholder="••••••••" autoComplete="new-password" value={form.confirmar} onChange={handleChange("confirmar")} />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary btn-sm">Actualizar contraseña</button>
        </div>
      </form>
    </div>
  );
}