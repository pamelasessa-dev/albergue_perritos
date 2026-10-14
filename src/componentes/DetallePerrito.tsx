import type { Perrito } from "../datos/perritos";

interface Props {
  perrito: Perrito;
  onVolver: () => void;
}

export function DetallePerrito({ perrito, onVolver }: Props) {
  return (
    <section className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-lg">
      <button
        onClick={onVolver}
        className="mb-5 rounded-lg bg-stone-200 px-4 py-2 hover:bg-stone-300"
      >
        ← Volver a los perritos
      </button>

      <img
        src={perrito.imagen}
        alt={`Foto de ${perrito.nombre}`}
        className="h-80 w-full rounded-xl object-cover"
      />

      <h2 className="mt-5 text-3xl font-bold text-orange-700">
        {perrito.nombre} 
      </h2>

      <p className="mt-3"></p>
      <p>Peso: {perrito.peso} kg</p>


      <h3 className="mt-4 font-bold">Personalidad</h3>

      <ul className="mt-2 flex flex-wrap gap-2">
        {perrito.caracteristicas.map((caracteristica) => (
          <li
            key={caracteristica}
            className="rounded-full bg-orange-100 px-3 py-1 text-orange-800"
          >
            {caracteristica}
          </li>
        ))}
      </ul>

      <p className="mt-4 font-semibold">
        {perrito.esterilizado
          ? "✓ Está esterilizado"
          : "Aún no está esterilizado"}
      </p>
    </section>
  );
}
