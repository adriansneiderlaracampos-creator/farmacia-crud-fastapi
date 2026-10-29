# INFORME TÉCNICO DE EVIDENCIAS — ACTIVIDAD 4 ADSO

## Portada
- **Actividad:** Sistema CRUD RESTful individual con Pydantic y FastAPI en memoria
- **Aprendiz:** Adrian Sneider Lara Campos
- **Ficha ADSO:** ______________________________
- **Caso asignado:** Droguería / Farmacia — Medicamentos
- **Centro de formación:** Centro de Biotecnología Agropecuaria (CBA) — Mosquera
- **Fecha:** ______________________________

## 1. Objetivo
Desarrollar una API RESTful para administrar medicamentos utilizando FastAPI y Pydantic, con validación de datos, UUIDv4, almacenamiento temporal en memoria y operaciones CRUD.

## 2. Tecnologías
- Python y entorno virtual `venv`
- FastAPI y Uvicorn
- Pydantic
- UUIDv4
- Lista de Python en memoria
- Swagger UI para probar los endpoints
- React/Vite como interfaz opcional del proyecto

## 3. Modelo de datos
El caso asignado utiliza los campos `nombre_producto`, `laboratorio`, `precio` y `requiere_receta`. El identificador `id` se genera automáticamente como UUIDv4.

## 4. Evidencias de funcionamiento

### Captura 1. Entorno virtual y servidor Uvicorn
**Insertar captura real aquí.** Debe verse la terminal con el entorno virtual activo y el servidor ejecutándose.

### Captura 2. Consulta inicial — GET
**Insertar captura real aquí.** En Swagger UI, ejecutar `GET /api/medicamentos/` y mostrar los datos iniciales.

### Captura 3. Creación exitosa — POST
**Insertar captura real aquí.** Crear un medicamento y mostrar la respuesta `201 Created` y el UUID generado.

### Captura 4. Validación Pydantic — 422
**Insertar captura real aquí.** Enviar un precio negativo o dejar un campo obligatorio por fuera y mostrar `422 Unprocessable Entity`.

### Captura 5. Manejo de excepción — 404
**Insertar captura real aquí.** Consultar un UUID válido pero inexistente y mostrar `404 Not Found`.

### Captura 6. Eliminación — DELETE
**Insertar captura real aquí.** Eliminar un registro existente y mostrar `200 OK`.

## 5. Endpoints
| Método | Ruta | Resultado esperado |
|---|---|---|
| GET | `/api/medicamentos/` | 200 OK |
| GET | `/api/medicamentos/{id_medicamento}` | 200 OK o 404 Not Found |
| POST | `/api/medicamentos/` | 201 Created o 400 Bad Request por duplicado |
| PUT | `/api/medicamentos/{id_medicamento}` | 200 OK o 400/404 |
| DELETE | `/api/medicamentos/{id_medicamento}` | 200 OK o 404 Not Found |

## 6. Conclusión
La API permite listar, consultar, crear, actualizar y eliminar medicamentos. Pydantic valida los datos de entrada y UUIDv4 identifica cada registro. El almacenamiento es en memoria, por lo que los cambios se mantienen mientras el servidor permanece ejecutándose y se reinician al apagarlo.

> Antes de entregar, reemplazar todos los espacios de captura por imágenes reales de las pruebas realizadas y completar la ficha ADSO y la fecha. Exportar este documento a PDF.
