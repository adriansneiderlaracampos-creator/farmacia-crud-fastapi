from uuid import UUID, uuid4

from fastapi import APIRouter, HTTPException, status

from database import (
    agregar_medicamento,
    buscar_medicamento,
    eliminar_medicamento,
    listar_medicamentos,
    reemplazar_medicamento,
)
from models import (
    MedicamentoActualizar,
    MedicamentoCrear,
    MedicamentoRespuesta,
)

router = APIRouter(prefix="/api/medicamentos", tags=["Medicamentos"])


@router.get("/", response_model=list[MedicamentoRespuesta])
def listar():
    return listar_medicamentos()


@router.get("/{id_medicamento}", response_model=MedicamentoRespuesta)
def consultar(id_medicamento: UUID):
    medicamento = buscar_medicamento(id_medicamento)
    if medicamento is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Medicamento no encontrado",
        )
    return medicamento


@router.post("/", response_model=MedicamentoRespuesta, status_code=status.HTTP_201_CREATED)
def crear(datos: MedicamentoCrear):
    nombre = datos.nombre_producto.strip()

    for medicamento in listar_medicamentos():
        if medicamento["nombre_producto"].casefold() == nombre.casefold():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Ya existe un medicamento con ese nombre",
            )

    nuevo = {
        "id": uuid4(),
        **datos.model_dump(),
        "nombre_producto": nombre,
        "laboratorio": datos.laboratorio.strip(),
    }
    agregar_medicamento(nuevo)
    return nuevo


@router.put("/{id_medicamento}", response_model=MedicamentoRespuesta)
def actualizar(id_medicamento: UUID, datos: MedicamentoActualizar):
    medicamentos = listar_medicamentos()

    for indice, medicamento in enumerate(medicamentos):
        if medicamento["id"] == id_medicamento:
            cambios = datos.model_dump(exclude_unset=True, exclude_none=True)

            if not cambios:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Envía al menos un campo para actualizar",
                )

            actualizado = {**medicamento, **cambios}

            if "nombre_producto" in cambios:
                actualizado["nombre_producto"] = cambios["nombre_producto"].strip()
            if "laboratorio" in cambios:
                actualizado["laboratorio"] = cambios["laboratorio"].strip()

            for otro in medicamentos:
                if (
                    otro["id"] != id_medicamento
                    and otro["nombre_producto"].casefold()
                    == actualizado["nombre_producto"].casefold()
                ):
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Ya existe otro medicamento con ese nombre",
                    )

            reemplazar_medicamento(indice, actualizado)
            return actualizado

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Medicamento no encontrado",
    )


@router.delete("/{id_medicamento}")
def eliminar(id_medicamento: UUID):
    medicamentos = listar_medicamentos()

    for indice, medicamento in enumerate(medicamentos):
        if medicamento["id"] == id_medicamento:
            eliminado = eliminar_medicamento(indice)
            return {
                "mensaje": "Medicamento eliminado correctamente",
                "id": str(eliminado["id"]),
            }

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Medicamento no encontrado",
    )
