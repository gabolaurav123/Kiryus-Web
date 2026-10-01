import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { villages } from "@/content/villages";
export function WorldNetwork() {
  return (
    <div className="network-layout">
      <div className="network-map">
        <svg
          viewBox="0 0 900 390"
          role="img"
          aria-labelledby="map-title map-desc"
        >
          <title id="map-title">Las dos aldeas de Kiryus y el legado de España</title>
          <desc id="map-desc">
            Aldeas actuales en Argentina y Colombia, en América del Sur.
            España, en Europa, se muestra como legado histórico.
            Representación de países, no de entradas a las fincas.
          </desc>
          <defs>
            <pattern
              id="map-dots"
              width="12"
              height="12"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="currentColor" opacity=".25" />
            </pattern>
          </defs>
          <g
            fill="url(#map-dots)"
            stroke="currentColor"
            strokeOpacity=".15"
            strokeWidth="1"
          >
            <path d="M100 70l60-22 80 0 42 16 35 10-6 26-33 7-27 29-40 11-6 36-35-19-30-13-34-29-36-18z" />
            <path d="M252 170l43 7 34 25 5 35-25 27-6 36-26 40-18-13-4-46-19-27-8-36z" />
            <path d="M465 75l33-16 39 5 17 25-30 15-40-7-9 20-18-11z" />
            <path d="M477 123l55-18 43 27 3 44-27 42-18 35-23-17-16-39-28-36z" />
            <path d="M544 73l76-18 100 9 94 21 23 27-48 24-52-8-20 29-48 19-18-20-32-31-57-18z" />
            <path d="M704 255l45-15 48 12 22 25-38 25-61-10z" />
            <path d="M323 30l27 4 9 29-26 11-15-27z" />
          </g>
          <path
            className="network-connection"
            d="M273 288 Q135 76 470 94 Q265 52 264 190"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeDasharray="4 7"
            opacity=".6"
          />
          <g className="map-points">
            <circle cx="273" cy="288" r="17" opacity=".12" />
            <circle cx="273" cy="288" r="5" />
            <circle cx="264" cy="190" r="17" opacity=".12" />
            <circle cx="264" cy="190" r="5" />
            <circle cx="470" cy="94" r="17" opacity=".12" />
            <circle cx="470" cy="94" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
            <text x="292" y="293">
              Argentina
            </text>
            <text x="285" y="194">
              Colombia
            </text>
            <text x="489" y="99">
              España · legado
            </text>
          </g>
        </svg>
        <p>Dos aldeas en América del Sur. Un legado compartido desde España.</p>
      </div>
      <div className="network-countries">
        {villages.map((village) => (
          <Link href={`/aldeas/${village.slug}`} key={village.slug}>
            <span className="eyebrow">
              {village.number} / {village.coordinatesLabel}
            </span>
            <span className="network-country-name">
              {village.country}
              <ArrowUpRight size={23} aria-hidden="true" />
            </span>
            <span>{village.location}</span>
          </Link>
        ))}
        <Link href="/legado/espana">
          <span className="eyebrow">Memoria de la comunidad / Legado histórico</span>
          <span className="network-country-name">
            España <ArrowUpRight size={23} aria-hidden="true" />
          </span>
          <span>Aportaciones y aprendizajes compartidos</span>
        </Link>
      </div>
    </div>
  );
}
