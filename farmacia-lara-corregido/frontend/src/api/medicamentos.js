import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/api/medicamentos`,
  headers: { "Content-Type": "application/json" },
});

export const listarMedicamentos = () => api.get("/");
export const consultarMedicamento = (id) => api.get(`/${id}`);
export const crearMedicamento = (datos) => api.post("/", datos);
export const actualizarMedicamento = (id, datos) => api.put(`/${id}`, datos);
export const eliminarMedicamento = (id) => api.delete(`/${id}`);
