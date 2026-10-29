from typing import Optional
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class MedicamentoBase(BaseModel):
    nombre_producto: str = Field(
        min_length=2,
        max_length=100,
        description="Nombre comercial del medicamento"
    )
    laboratorio: str = Field(
        min_length=2,
        max_length=100,
        description="Laboratorio fabricante"
    )
    precio: float = Field(
        gt=0,
        description="Precio del medicamento, debe ser mayor que cero"
    )
    requiere_receta: bool = Field(
        description="Indica si el medicamento requiere fórmula médica"
    )


class MedicamentoCrear(MedicamentoBase):
    pass


class MedicamentoActualizar(BaseModel):
    nombre_producto: Optional[str] = Field(
        default=None, min_length=2, max_length=100
    )
    laboratorio: Optional[str] = Field(
        default=None, min_length=2, max_length=100
    )
    precio: Optional[float] = Field(default=None, gt=0)
    requiere_receta: Optional[bool] = None


class MedicamentoRespuesta(MedicamentoBase):
    id: UUID = Field(default_factory=uuid4, description="Identificador UUIDv4")
