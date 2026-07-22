import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../lib/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard-estudiante", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-4)",
        background: "var(--gray-100)",
      }}
    >
      <div className="card" style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: "var(--space-6)" }}>
          <div style={{ fontSize: "2rem", marginBottom: "var(--space-2)" }} aria-hidden="true">
            🎓
          </div>
          <h1 style={{ fontSize: "var(--text-xl)", fontWeight: 700 }}>Portal del estudiante</h1>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
            Inicia sesión para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Correo
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="estudiante@test.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="form-error" role="alert" style={{ marginBottom: "var(--space-4)" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-lg w-full"
            disabled={loading || !email || !password}
            style={{ width: "100%" }}
          >
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}
