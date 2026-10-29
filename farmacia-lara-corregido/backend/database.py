from uuid import uuid4

# Lista global para persistencia temporal en memoria.
# Los datos se reinician cuando se detiene o reinicia el servidor.
medicamentos = [
    {
        "id": uuid4(),
        "nombre_producto": "Acetaminofén 500 mg",
        "laboratorio": "Genfar",
        "precio": 8500.0,
        "requiere_receta": False,
    },
    {
        "id": uuid4(),
        "nombre_producto": "Loratadina 10 mg",
        "laboratorio": "MK",
        "precio": 6200.0,
        "requiere_receta": False,
    },
    {
        "id": uuid4(),
        "nombre_producto": "Amoxicilina 500 mg",
        "laboratorio": "Tecnoquímicas",
        "precio": 14500.0,
        "requiere_receta": True,
    },
]


def listar_medicamentos():
    return medicamentos


def buscar_medicamento(id_medicamento):
    for medicamento in medicamentos:
        if medicamento["id"] == id_medicamento:
            return medicamento
    return None


def agregar_medicamento(medicamento):
    medicamentos.append(medicamento)
    return medicamento


def reemplazar_medicamento(indice, medicamento):
    medicamentos[indice] = medicamento
    return medicamento


def eliminar_medicamento(indice):
    return medicamentos.pop(indice)
