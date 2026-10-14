import { useState } from "react";
import type { FormEvent } from "react";
import type { Perrito } from "./datos/perritos";
import { perritos as perritosIniciales } from "./datos/perritos";

// Lista de razas que aparecen en los selectores de la interfaz.
const RAZAS = [
  "Labrador",
  "Caniche",
  "Pastor alemán",
  "Mestizo",
  "Golden retriever",
  "Bulldog",
  "Beagle",
  "Otro",
];

// Relacionamos el nombre que mostramos en pantalla con el nombre
// que utiliza la API Dog CEO para buscar imágenes de esa raza.
const RAZAS_API: Record<string, string> = {
  Labrador: "labrador",
  Caniche: "poodle/standard",
  "Pastor alemán": "germanshepherd",
  Mestizo: "mix",
  "Golden retriever": "retriever/golden",
  Bulldog: "bulldog/english",
  Beagle: "beagle",
};

// Valores iniciales del formulario, todos vacíos.
const FORM_VACIO = {
  nombre: "",
  raza: "",
  sexo: "",
  edad: "",
  peso: "",
  esterilizado: "",
  imagen: "",
};

export default function App() {
  // Guardamos las mascotas en el estado para actualizar la interfaz.
  const [perritos, setPerritos] =
    useState<Perrito[]>(perritosIniciales);

  // Estado del formulario para agregar o editar mascotas.
  const [formulario, setFormulario] = useState(FORM_VACIO);

  // Mensaje que mostramos cuando hay un error en el formulario.
  const [error, setError] = useState("");

  // ID de la mascota que estamos editando.
  // null significa que estamos agregando una mascota nueva.
  const [editandoId, setEditandoId] = useState<number | null>(null);

  // EJERCICIO 1: filtros combinados por raza, sexo,
  // esterilización, edad y peso.
  const [filtros, setFiltros] = useState({
    raza: "",
    sexo: "",
    esterilizado: "",
    edad: "",
    peso: "",
  });

  // Actualiza el campo del formulario que el usuario modifica.
  function cambiarCampo(
    campo: keyof typeof FORM_VACIO,
    valor: string
  ) {
    setFormulario((actual) => ({
      ...actual,
      [campo]: valor,
    }));
  }

  // Aplicamos todos los filtros seleccionados.
  // Una mascota debe cumplir todas las condiciones activas.
  const perritosFiltrados = perritos.filter(
    (p) =>
      (!filtros.raza || p.raza === filtros.raza) &&
      (!filtros.sexo || p.sexo === filtros.sexo) &&
      (!filtros.esterilizado ||
        String(p.esterilizado) === filtros.esterilizado) &&
      (!filtros.edad ||
        (filtros.edad === "cachorro"
          ? p.edad < 1
          : filtros.edad === "adulto"
            ? p.edad >= 1 && p.edad < 7
            : p.edad >= 7)) &&
      (!filtros.peso ||
        (filtros.peso === "pequeno"
          ? p.peso < 10
          : filtros.peso === "mediano"
            ? p.peso >= 10 && p.peso <= 25
            : p.peso > 25))
  );

  // EJERCICIO 2: valida y guarda una mascota.
  // La misma función sirve para agregar y editar.
  function guardarPerrito(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Comprobamos que ningún campo esté vacío.
    if (
      Object.values(formulario).some((valor) => !valor.trim())
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    // Convertimos edad y peso de texto a números.
    const edad = Number(formulario.edad);
    const peso = Number(formulario.peso);

    // Validamos que los números sean correctos.
    if (
      edad < 0 ||
      peso <= 0 ||
      !Number.isFinite(edad) ||
      !Number.isFinite(peso)
    ) {
      setError("Ingresá una edad válida y un peso mayor que cero.");
      return;
    }

    // Creamos el objeto con los datos del formulario.
    const nuevoPerrito: Perrito = {
      id: editandoId ?? Date.now(),
      nombre: formulario.nombre.trim(),
      raza: formulario.raza,
      sexo: formulario.sexo,
      edad,
      peso,
      esterilizado: formulario.esterilizado === "true",
      imagen: formulario.imagen.trim(),
      caracteristicas: [],
    };

    if (editandoId !== null) {
      // EDITAR: usamos map() para reemplazar solamente
      // la mascota cuyo ID coincide.
      setPerritos((actuales) =>
        actuales.map((p) =>
          p.id === editandoId ? nuevoPerrito : p
        )
      );
    } else {
      // AGREGAR: copiamos las mascotas existentes y
      // agregamos la nueva al final del array.
      setPerritos((actuales) => [...actuales, nuevoPerrito]);
    }

    // Limpiamos el formulario después de guardar.
    setFormulario(FORM_VACIO);
    setEditandoId(null);
    setError("");
  }

  // EJERCICIO 3: cambia la raza y obtiene una imagen nueva
  // de esa raza mediante la API Dog CEO.
  async function cambiarRaza(id: number, raza: string) {
    // Buscamos el nombre de raza que entiende la API.
    const razaApi = RAZAS_API[raza];

    // "Otro" no representa una raza concreta.
    // En ese caso cambiamos solo el texto de la raza.
    if (!razaApi) {
      setPerritos((actuales) =>
        actuales.map((p) =>
          p.id === id ? { ...p, raza } : p
        )
      );
      return;
    }

    try {
      // Solicitamos una imagen aleatoria de la raza seleccionada.
      const respuesta = await fetch(
        `https://dog.ceo/api/breed/${razaApi}/images/random`
      );

      // Si la petición HTTP falla, mostramos el error
      // en la consola y mantenemos los datos anteriores.
      if (!respuesta.ok) {
        throw new Error("No se pudo obtener la imagen");
      }

      // Convertimos la respuesta de la API a un objeto.
      const datos: { message: string; status: string } =
        await respuesta.json();

      if (datos.status !== "success") {
        throw new Error("La API no devolvió una imagen");
      }

      // Actualizamos solo la mascota elegida.
      // El operador ...p conserva sus demás propiedades.
      setPerritos((actuales) =>
        actuales.map((p) =>
          p.id === id
            ? { ...p, raza, imagen: datos.message }
            : p
        )
      );
    } catch (error) {
      // Si ocurre un error, los datos anteriores se conservan.
      console.error("Error al cambiar la raza:", error);
    }
  }

  // Carga en el formulario los datos de la mascota elegida.
  function editarPerrito(p: Perrito) {
    setEditandoId(p.id);

    setFormulario({
      nombre: p.nombre,
      raza: p.raza,
      sexo: p.sexo,
      edad: String(p.edad),
      peso: String(p.peso),
      esterilizado: String(p.esterilizado),
      imagen: p.imagen,
    });

    setError("");
  }

  // ELIMINAR: filter() crea un array sin la mascota indicada.
  function eliminarPerrito(id: number) {
    setPerritos((actuales) =>
      actuales.filter((p) => p.id !== id)
    );

    // Si estábamos editando esa mascota, limpiamos el formulario.
    if (editandoId === id) {
      setFormulario(FORM_VACIO);
      setEditandoId(null);
      setError("");
    }
  }

  // INTERFAZ
  return (
    <main>
      <h1>Albergue de perritos</h1>

      {/* FORMULARIO PARA AGREGAR O EDITAR */}
      <h2>
        {editandoId !== null
          ? "Editar mascota"
          : "Agregar nueva mascota"}
      </h2>

      <form onSubmit={guardarPerrito}>
        <label>
          Nombre:
          <input
            value={formulario.nombre}
            onChange={(e) =>
              cambiarCampo("nombre", e.target.value)
            }
          />
        </label>

        <label>
          Raza:
          <select
            value={formulario.raza}
            onChange={(e) =>
              cambiarCampo("raza", e.target.value)
            }
          >
            <option value="">Seleccionar raza</option>
            {RAZAS.map((raza) => (
              <option key={raza} value={raza}>
                {raza}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sexo:
          <select
            value={formulario.sexo}
            onChange={(e) =>
              cambiarCampo("sexo", e.target.value)
            }
          >
            <option value="">Seleccionar sexo</option>
            <option value="Hembra">Hembra</option>
            <option value="Macho">Macho</option>
          </select>
        </label>

        <label>
          Edad:
          <input
            type="number"
            min="0"
            step="any"
            value={formulario.edad}
            onChange={(e) =>
              cambiarCampo("edad", e.target.value)
            }
          />
        </label>

        <label>
          Peso:
          <input
            type="number"
            min="0.1"
            step="any"
            value={formulario.peso}
            onChange={(e) =>
              cambiarCampo("peso", e.target.value)
            }
          />
        </label>

        <label>
          ¿Esterilizado?
          <select
            value={formulario.esterilizado}
            onChange={(e) =>
              cambiarCampo("esterilizado", e.target.value)
            }
          >
            <option value="">Seleccionar opción</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </label>

        <label>
          URL de imagen:
          <input
            type="url"
            value={formulario.imagen}
            onChange={(e) =>
              cambiarCampo("imagen", e.target.value)
            }
          />
        </label>

        {/* Mostramos los errores de validación. */}
        {error && <p>{error}</p>}

        <button type="submit">
          {editandoId !== null
            ? "Guardar cambios"
            : "Agregar mascota"}
        </button>

        <button
          type="button"
          onClick={() => {
            setFormulario(FORM_VACIO);
            setEditandoId(null);
            setError("");
          }}
        >
          Limpiar
        </button>
      </form>

      {/* FILTROS COMBINADOS */}
      <h2>Filtrar mascotas</h2>

      <label>
        Raza:
        <select
          value={filtros.raza}
          onChange={(e) =>
            setFiltros({ ...filtros, raza: e.target.value })
          }
        >
          <option value="">Todas</option>
          {RAZAS.map((raza) => (
            <option key={raza} value={raza}>
              {raza}
            </option>
          ))}
        </select>
      </label>

      <label>
        Sexo:
        <select
          value={filtros.sexo}
          onChange={(e) =>
            setFiltros({ ...filtros, sexo: e.target.value })
          }
        >
          <option value="">Todos</option>
          <option value="Hembra">Hembra</option>
          <option value="Macho">Macho</option>
        </select>
      </label>

      <label>
        Esterilización:
        <select
          value={filtros.esterilizado}
          onChange={(e) =>
            setFiltros({
              ...filtros,
              esterilizado: e.target.value,
            })
          }
        >
          <option value="">Todos</option>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      </label>

      <label>
        Edad:
        <select
          value={filtros.edad}
          onChange={(e) =>
            setFiltros({ ...filtros, edad: e.target.value })
          }
        >
          <option value="">Todas</option>
          <option value="cachorro">Cachorro</option>
          <option value="adulto">Adulto</option>
          <option value="mayor">Senior</option>
        </select>
      </label>

      <label>
        Peso:
        <select
          value={filtros.peso}
          onChange={(e) =>
            setFiltros({ ...filtros, peso: e.target.value })
          }
        >
          <option value="">Todos</option>
          <option value="pequeno">Pequeño</option>
          <option value="mediano">Mediano</option>
          <option value="grande">Grande</option>
        </select>
      </label>

      {/* Restablece todos los filtros a sus valores iniciales. */}
      <button
        type="button"
        onClick={() =>
          setFiltros({
            raza: "",
            sexo: "",
            esterilizado: "",
            edad: "",
            peso: "",
          })
        }
      >
        Limpiar filtros
      </button>

      {/* LISTADO DE MASCOTAS */}
      <h2>Mascotas ({perritosFiltrados.length})</h2>

      {perritosFiltrados.map((p) => (
        <article key={p.id}>
          <img
            src={p.imagen}
            alt={`Foto de ${p.nombre}`}
            width="150"
          />

          <h3>{p.nombre}</h3>
          <p>Raza: {p.raza}</p>
          <p>Sexo: {p.sexo}</p>
          <p>Edad: {p.edad} años</p>
          <p>Peso: {p.peso} kg</p>

          <p>
            {p.esterilizado
              ? "Esterilizado"
              : "Sin esterilizar"}
          </p>

          {/* Cambia la raza y la imagen de esta mascota. */}
          <label>
            Cambiar raza:
            <select
              value={p.raza}
              onChange={(e) =>
                cambiarRaza(p.id, e.target.value)
              }
            >
              {RAZAS.map((raza) => (
                <option key={raza} value={raza}>
                  {raza}
                </option>
              ))}
            </select>
          </label>

          {/* Botones para editar y eliminar la mascota. */}
          <button
            type="button"
            onClick={() => editarPerrito(p)}
          >
            Editar
          </button>

          <button
            type="button"
            onClick={() => eliminarPerrito(p.id)}
          >
            Eliminar
          </button>
        </article>
      ))}
    </main>
  );
}
