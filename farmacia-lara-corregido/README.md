# Farmacia Lara — Actividad 4 ADSO

Proyecto corregido con base en la guía **Actividad 4: Sistema CRUD RESTful Individual con Pydantic y FastAPI en Memoria**.

## Importante
Esta actividad utiliza una lista de Python en memoria. **No usa MongoDB**. Los registros creados durante la ejecución se pierden al reiniciar el backend; los datos iniciales se cargan otra vez desde `backend/database.py`.

## Caso asignado
Droguería / Farmacia — Medicamentos.

Campos:
- `nombre_producto`
- `laboratorio`
- `precio`
- `requiere_receta`

Los modelos usan Pydantic, validaciones `Field`, UUIDv4 y esquemas separados de creación, actualización y respuesta.

## Requisitos
- Python 3.10 o superior.
- Node.js LTS y npm (solo si vas a ejecutar el frontend opcional).
- Git (si vas a publicar en GitHub).

## 1. Iniciar el backend en Windows PowerShell

Abre una terminal en VS Code y ejecuta:

```powershell
cd backend
py -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
uvicorn main:app --reload
```

Si PowerShell no permite activar el entorno virtual, ejecuta sin activarlo:

```powershell
.\venv\Scripts\python.exe -m pip install -r requirements.txt
.\venv\Scripts\python.exe -m uvicorn main:app --reload
```

Direcciones:
- API: http://127.0.0.1:8000
- Swagger UI: http://127.0.0.1:8000/docs

Mantén esta terminal abierta mientras haces las pruebas.

## 2. Probar la API en Swagger UI

Entra en `http://127.0.0.1:8000/docs`.

### GET — listar medicamentos
Abre `GET /api/medicamentos/`, pulsa **Try it out** y después **Execute**. Deben aparecer los datos iniciales.

### GET — consultar por UUID
Copia el UUID de uno de los registros devueltos por el GET anterior y úsalo en `GET /api/medicamentos/{id_medicamento}`.

### POST — crear medicamento
Usa este ejemplo:

```json
{
  "nombre_producto": "Acetaminofén 500 mg",
  "laboratorio": "Genfar",
  "precio": 8500,
  "requiere_receta": false
}
```

Debe responder con `201 Created` y devolver un campo `id` con un UUID.

### POST — probar duplicados
Envía otra vez el mismo nombre de producto. Debe responder `400 Bad Request`.

### Validación 422
Envía un precio negativo o elimina uno de los campos obligatorios del JSON. FastAPI/Pydantic debe responder `422 Unprocessable Entity`.

Ejemplo inválido:

```json
{
  "nombre_producto": "Acetaminofén 500 mg",
  "laboratorio": "Genfar",
  "precio": -5,
  "requiere_receta": false
}
```

### PUT — actualización parcial
Copia un UUID real y envía solo el campo que quieres modificar:

```json
{
  "precio": 9000
}
```

Debe actualizar ese campo y conservar los demás.

### PUT — UUID inexistente
Usa un UUID válido que no aparezca en la lista, por ejemplo:
`00000000-0000-4000-8000-000000000001`

Debe responder `404 Not Found`.

### DELETE — eliminar
Usa el UUID de un registro existente. Debe responder `200 OK`. Después ejecuta GET para verificar que ya no aparece.

## 3. Ejecutar el frontend opcional

Abre una segunda terminal, desde la carpeta raíz del proyecto:

```powershell
cd frontend
npm install
npm run dev
```

Abre la URL que indique Vite, normalmente `http://localhost:5173`.

El frontend fue adaptado para usar los cuatro campos de la guía y consumir la API FastAPI. La evidencia principal solicitada por la Actividad 4 sigue siendo Swagger UI (`/docs`).

## 4. Evidencias requeridas para el PDF

Toma capturas reales de estas seis pruebas:
1. Terminal con el entorno virtual y Uvicorn ejecutándose.
2. GET de listado mostrando los datos iniciales.
3. POST exitoso con código 201 y UUIDv4.
4. Validación Pydantic con error 422.
5. UUID válido pero inexistente que produzca 404.
6. DELETE exitoso con código 200.

La guía de evidencias está en `INFORME_BASE.md`. Completa los datos de ficha ADSO y pega tus capturas reales en el informe antes de exportarlo a PDF.

## 5. GitHub

Desde la carpeta raíz del proyecto:

```powershell
git init
git add .
git status
git commit -m "Actividad 4 - CRUD Farmacia Lara"
git branch -M main
```

Crea un repositorio vacío en https://github.com/new. No agregues README ni `.gitignore` desde GitHub porque ya están en este proyecto. Luego reemplaza la URL de ejemplo por la URL HTTPS real de tu repositorio:

```powershell
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

Antes de subir, confirma que `.gitignore` excluye `venv/`, `.venv/`, `__pycache__/`, `node_modules/` y archivos `.env`.

## Nota
El entorno virtual `venv` se crea en tu computador y no se incluye en el ZIP. No se incluyen capturas falsas; las evidencias deben salir de tus propias pruebas.
