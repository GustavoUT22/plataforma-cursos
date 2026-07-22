import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardEstudiante from "./pages/DashboardEstudiante";
import MisInscripciones from "./pages/MisInscripciones";
import Perfil from "./pages/MiPerfil";
import Cursos from "./pages/Cursos";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardEstudiante />} />
        <Route path="/dashboard-estudiante" element={<DashboardEstudiante />} />
        <Route path="/mis-inscripciones" element={<MisInscripciones />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/cursos" element={<Cursos />} />
      </Routes>
    </BrowserRouter>
  );
}