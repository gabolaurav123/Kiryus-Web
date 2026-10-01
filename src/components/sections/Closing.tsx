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
          viewBox="0 0 250 340"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path
              d="M116 292C47 247 37 166 74 98C90 70 117 43 155 24C193 77 213 133 202 193C193 245 158 280 116 292Z"
              fill="currentColor"
              fillOpacity="0.035"
              strokeWidth="1.8"
            />
            <path
              d="M109 320C117 283 131 229 140 176C149 116 155 66 155 24"
              strokeWidth="2"
            />
            <path
              d="M119 280C101 268 82 247 73 228M127 245C100 230 77 204 65 184M135 205C105 186 85 163 70 139M142 162C118 145 100 124 92 102M148 117C132 105 120 87 115 73M118 284C141 279 163 264 179 243M127 244C157 233 181 212 191 194M135 204C163 191 184 170 196 148M142 162C166 149 181 129 187 111M148 117C165 105 173 89 175 75"
              strokeWidth="1.3"
            />
          </g>
        </svg>
      </div>
    </section>
  );
}
