import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { spainLegacy } from "@/content/legacy";
import { pageMetadata } from "@/lib/metadata";
import { Photo } from "@/components/ui/Photo";
import { Gallery } from "@/components/sections/Gallery";
import { Closing } from "@/components/sections/Closing";

export const metadata = pageMetadata(
  "El legado de España",
  spainLegacy.description,
  "/legado/espana",
);

export default function SpainLegacyPage() {
  return (
    <>
      <section className="village-hero container">
        <div className="village-hero-copy">
          <Link href="/nosotros" className="breadcrumb">Nuestra historia / Legado</Link>
          <p className="eyebrow">La memoria de Kiryus</p>
          <h1>
            España,
            <br />
            <em>parte de nuestras raíces.</em>
          </h1>
          <p>{spainLegacy.introduction}</p>
          <span className="eyebrow">Legado histórico</span>
        </div>
        <div className="village-hero-photo">
          <Photo image={spainLegacy.image} priority />
        </div>
      </section>
      <section className="section container story-grid">
        <div>
          <p className="eyebrow">Reconocer lo compartido</p>
          <h2>
            Lo vivido sigue
            <br />
            <em>formando parte.</em>
          </h2>
        </div>
        <div className="prose">
          <p>{spainLegacy.historicalContext}</p>
          <p>
            Conservamos esta experiencia y sus fotografías para reconocer la
            aportación de las personas y del territorio al recorrido de Kiryus.
            Los aprendizajes compartidos forman parte de su memoria comunitaria.
          </p>
          <p>
            Las aldeas actuales están en Argentina y Colombia. España se recoge
            aquí como legado histórico y no ofrece visitas, estadías ni
            voluntariado a través de esta web.
          </p>
          <Link href="/aldeas" className="text-link">
            Conoce las aldeas actuales <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="section village-practices">
        <div className="container practices-grid">
          <div>
            <p className="eyebrow">Aportaciones a la historia</p>
            <h2>
              Encuentros, tierra
              <br />
              <em>y aprendizajes.</em>
            </h2>
            <p>
              Prácticas y experiencias descritas en la presentación histórica
              de Kiryus en España.
            </p>
          </div>
          <ul>
            {spainLegacy.contributions.map((contribution) => (
              <li key={contribution}>
                <Check size={21} aria-hidden="true" />{contribution}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Archivo de la comunidad</p>
            <h2>
              Miradas desde
              <br />
              <em>España.</em>
            </h2>
          </div>
          <p>
            Fotografías compartidas por Kiryus en su página histórica de España.
            Se conservan como memoria de esta experiencia.
          </p>
        </div>
        <Gallery images={[...spainLegacy.gallery]} compact />
      </section>
      <Closing />
    </>
  );
}
