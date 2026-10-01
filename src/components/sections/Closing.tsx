import { Action } from "@/components/ui/Action";
export function Closing({ village }: { village?: string }) {
  return (
    <section className="closing">
      <div className="container">
        <p className="eyebrow">
          El siguiente paso empieza con una conversación
        </p>
        <h2>
          Hay muchas formas
          <br />
          de <em>encontrarnos.</em>
        </h2>
        <p>
          Cuéntanos qué te mueve. Exploremos juntos cómo puedes acercarte a la
          comunidad.
        </p>
        <Action
          href={
            village
              ? `/involucrate?aldea=${village}&interes=visita`
              : "/involucrate"
          }
          light
        >
          Conectar con Kiryus
        </Action>
        <svg
          className="closing-leaf"
          viewBox="0 0 250 300"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M115 270C45 210 29 75 201 23c32 130-12 201-86 247zm0 0L201 23M124 230l-68-71m85 24 60-66m-45 10-80-60"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>
    </section>
  );
}
