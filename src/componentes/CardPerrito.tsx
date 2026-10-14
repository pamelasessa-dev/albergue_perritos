
import type { Perrito } from "../datos/perritos";

interface Props {
  perrito: Perrito;
  onVerDetalle: ()=> void;
}

export function CardPerrito({ perrito, onVerDetalle }: Props) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <img
        src={perrito.imagen}
        alt={`Foto de ${perrito.nombre}`}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">
        <h2 className="text-2xl font-bold text-stone-800">
          {perrito.nombre}
        </h2>

        <p className="mt-2 text-stone-600">
          Edad: {perrito.edad} años
        </p>

        <p className="text-stone-600">
          Peso: {perrito.peso} kg
        </p>

        <div className="my-3 flex flex-wrap gap-2">
          {perrito.caracteristicas.map((caracteristica) => (
            <span
              key={caracteristica}
              className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-800"
            >
              {caracteristica}
            </span>
          ))}
        </div>

        <p
          className={
            perrito.esterilizado
              ? "font-semibold text-green-700"
              : "font-semibold text-amber-700"
          }
        >
          {perrito.esterilizado
            ? "✓ Esterilizado"
            : "○ Sin esterilizar"}
        </p>

        <button
          onClick={onVerDetalle}
          className="mt-4 w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Conocer a {perrito.nombre}
        </button>
      </div>
    </article>
  );
}
