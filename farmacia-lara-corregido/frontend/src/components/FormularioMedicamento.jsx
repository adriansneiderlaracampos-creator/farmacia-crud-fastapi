import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";

const vacio = {
  nombre_producto: "",
  laboratorio: "",
  precio: "",
  requiere_receta: "false",
};

export default function FormularioMedicamento({ seleccionado, onGuardar, onCancelar }) {
  const [formulario, setFormulario] = useState(vacio);

  useEffect(() => {
    if (seleccionado) {
      setFormulario({
        nombre_producto: seleccionado.nombre_producto,
        laboratorio: seleccionado.laboratorio,
        precio: String(seleccionado.precio),
        requiere_receta: String(seleccionado.requiere_receta),
      });
    } else {
      setFormulario(vacio);
    }
  }, [seleccionado]);

  function cambiar(evento) {
    setFormulario({ ...formulario, [evento.target.name]: evento.target.value });
  }

  function enviar(evento) {
    evento.preventDefault();
    onGuardar({
      nombre_producto: formulario.nombre_producto.trim(),
      laboratorio: formulario.laboratorio.trim(),
      precio: Number(formulario.precio),
      requiere_receta: formulario.requiere_receta === "true",
    });
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      <h2>{seleccionado ? "Editar medicamento" : "Agregar medicamento"}</h2>
      <label>Nombre del producto
        <input name="nombre_producto" value={formulario.nombre_producto} onChange={cambiar} minLength="2" maxLength="100" required />
      </label>
      <label>Laboratorio
        <input name="laboratorio" value={formulario.laboratorio} onChange={cambiar} minLength="2" maxLength="100" required />
      </label>
      <label>Precio (COP)
        <input name="precio" type="number" min="1" step="100" value={formulario.precio} onChange={cambiar} required />
      </label>
      <label>¿Requiere fórmula médica?
        <select name="requiere_receta" value={formulario.requiere_receta} onChange={cambiar}>
          <option value="false">No</option>
          <option value="true">Sí</option>
        </select>
      </label>
      <div className="acciones-form">
        <button className="boton principal" type="submit"><Save size={17} /> Guardar</button>
        {seleccionado && <button className="boton secundario" type="button" onClick={onCancelar}><X size={17} /> Cancelar</button>}
      </div>
    </form>
  );
}
