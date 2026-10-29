import { useEffect, useMemo, useState } from "react";
import { Activity, Package, Search, Trash2, Pencil, RefreshCw, ClipboardCheck } from "lucide-react";
import FormularioMedicamento from "../components/FormularioMedicamento";
import {
  listarMedicamentos,
  crearMedicamento,
  actualizarMedicamento,
  eliminarMedicamento,
} from "../api/medicamentos";

const pesos = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default function Inicio() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [seleccionado, setSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  async function cargar() {
    setCargando(true);
    setError("");
    try {
      const respuesta = await listarMedicamentos();
      setMedicamentos(respuesta.data);
    } catch {
      setError("No se pudo conectar con la API. Verifica que FastAPI esté ejecutándose en el puerto 8000.");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => { cargar(); }, []);

  const filtrados = useMemo(() => {
    const texto = busqueda.toLowerCase().trim();
    return medicamentos.filter((m) =>
      `${m.nombre_producto} ${m.laboratorio}`.toLowerCase().includes(texto)
    );
  }, [medicamentos, busqueda]);

  async function guardar(datos) {
    setError("");
    setMensaje("");
    try {
      if (seleccionado) {
        await actualizarMedicamento(seleccionado.id, datos);
        setMensaje("Medicamento actualizado correctamente.");
      } else {
        await crearMedicamento(datos);
        setMensaje("Medicamento agregado correctamente.");
      }
      setSeleccionado(null);
      await cargar();
    } catch (e) {
      setError(e.response?.data?.detail || "No se pudo guardar el medicamento.");
    }
  }

  async function eliminar(id, nombre) {
    if (!window.confirm(`¿Seguro que deseas eliminar "${nombre}"?`)) return;
    setError("");
    setMensaje("");
    try {
      await eliminarMedicamento(id);
      if (seleccionado?.id === id) setSeleccionado(null);
      setMensaje("Medicamento eliminado correctamente.");
      await cargar();
    } catch (e) {
      setError(e.response?.data?.detail || "No se pudo eliminar el medicamento.");
    }
  }

  const conReceta = medicamentos.filter((m) => m.requiere_receta).length;
  const valor = medicamentos.reduce((total, m) => total + m.precio, 0);

  return (
    <main className="contenedor">
      <section className="bienvenida">
        <div>
          <span className="etiqueta">PANEL DE ADMINISTRACIÓN</span>
          <h1>Medicamentos de la farmacia</h1>
          <p>Registra, consulta, actualiza y elimina medicamentos.</p>
        </div>
        <div className="icono-grande"><Activity size={35} /></div>
      </section>

      {mensaje && <div className="aviso exito">{mensaje}</div>}
      {error && <div className="aviso error">{error}</div>}

      <section className="estadisticas">
        <article className="tarjeta-estadistica">
          <div className="estadistica-icono verde"><Package /></div>
          <div><span>Productos registrados</span><strong>{medicamentos.length}</strong></div>
        </article>
        <article className="tarjeta-estadistica">
          <div className="estadistica-icono azul"><ClipboardCheck /></div>
          <div><span>Requieren receta</span><strong>{conReceta}</strong></div>
        </article>
        <article className="tarjeta-estadistica">
          <div className="estadistica-icono naranja"><Activity /></div>
          <div><span>Suma de precios unitarios</span><strong>{pesos.format(valor)}</strong></div>
        </article>
      </section>

      <section className="contenido">
        <div className="panel inventario">
          <div className="panel-cabecera">
            <div><h2>Listado de medicamentos</h2><p>Los registros se almacenan temporalmente en memoria.</p></div>
            <button className="boton secundario" onClick={cargar} type="button"><RefreshCw size={16} /> Actualizar</button>
          </div>
          <div className="buscador">
            <Search size={18} />
            <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar por nombre o laboratorio..." />
          </div>
          {cargando ? <p className="estado">Cargando medicamentos...</p> : (
            <div className="tabla-contenedor">
              <table>
                <thead><tr><th>Medicamento</th><th>Laboratorio</th><th>Precio</th><th>Receta</th><th>Acciones</th></tr></thead>
                <tbody>
                  {filtrados.map((m) => (
                    <tr key={m.id}>
                      <td><strong>{m.nombre_producto}</strong><small>ID: {m.id}</small></td>
                      <td><span className="categoria">{m.laboratorio}</span></td>
                      <td>{pesos.format(m.precio)}</td>
                      <td><span className={m.requiere_receta ? "stock bajo" : "stock"}>{m.requiere_receta ? "Sí" : "No"}</span></td>
                      <td><div className="acciones-tabla">
                        <button className="icono-boton editar" title="Editar" onClick={() => setSeleccionado(m)}><Pencil size={16} /></button>
                        <button className="icono-boton borrar" title="Eliminar" onClick={() => eliminar(m.id, m.nombre_producto)}><Trash2 size={16} /></button>
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtrados.length === 0 && <p className="estado">No hay medicamentos para mostrar.</p>}
            </div>
          )}
          <div className="total-inventario"><span>Total de precios unitarios registrados</span><strong>{pesos.format(valor)}</strong></div>
        </div>
        <aside className="panel formulario-panel">
          <FormularioMedicamento
            seleccionado={seleccionado}
            onGuardar={guardar}
            onCancelar={() => setSeleccionado(null)}
          />
        </aside>
      </section>
      <footer>Farmacia Lara · Actividad 4 ADSO · React + FastAPI + Pydantic</footer>
    </main>
  );
}
