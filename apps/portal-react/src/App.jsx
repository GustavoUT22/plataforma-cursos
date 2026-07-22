import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardEstudiante from "./pages/DashboardEstudiante";
import MisInscripciones from "./pages/MisInscripciones";
import Perfil from "./pages/MiPerfil";
import Cursos from "./pages/Cursos";
import Login from "./pages/Login";
import { isAuthenticated } from "./lib/api";
import "./index.css";

// Protege las rutas privadas: sin token, redirige al login.
function RequireAuth({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RequireAuth><DashboardEstudiante /></RequireAuth>} />
        <Route path="/dashboard-estudiante" element={<RequireAuth><DashboardEstudiante /></RequireAuth>} />
        <Route path="/mis-inscripciones" element={<RequireAuth><MisInscripciones /></RequireAuth>} />
        <Route path="/perfil" element={<RequireAuth><Perfil /></RequireAuth>} />
        <Route path="/cursos" element={<RequireAuth><Cursos /></RequireAuth>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
