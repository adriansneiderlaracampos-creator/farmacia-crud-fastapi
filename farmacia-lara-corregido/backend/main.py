from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.medicamentos import router as medicamentos_router

app = FastAPI(
    title="Farmacia Lara API",
    description=(
        "API REST CRUD para medicamentos. Usa Pydantic, UUIDv4 "
        "y una lista de Python en memoria."
    ),
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(medicamentos_router)


@app.get("/")
def inicio():
    return {
        "mensaje": "API de Farmacia Lara funcionando",
        "documentacion": "/docs",
    }
