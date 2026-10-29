import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import { HeartPulse, LayoutDashboard } from "lucide-react";
import Inicio from "./pages/Inicio";

export default function App() {
  return (
    <div className="aplicacion">
      <header className="barra-superior">
        <NavLink className="marca" to="/">
          <span className="marca-icono"><HeartPulse size={25} /></span>
          <span><strong>Farmacia Lara</strong><small>Gestión de medicamentos</small></span>
        </NavLink>
        <nav><NavLink to="/" className="enlace-nav"><LayoutDashboard size={17} /> Panel principal</NavLink></nav>
      </header>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
