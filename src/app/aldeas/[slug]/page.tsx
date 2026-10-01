import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Check, MapPin } from "lucide-react";
import { villages, getVillage } from "@/content/villages";
import { pageMetadata } from "@/lib/metadata";
import { Photo } from "@/components/ui/Photo";
import { Action } from "@/components/ui/Action";
import { Gallery } from "@/components/sections/Gallery";
import { Closing } from "@/components/sections/Closing";
export function generateStaticParams() {
  return villages.map((village) => ({ slug: village.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const village = getVillage(slug);
  return village
    ? pageMetadata(
        `Kiryus ${village.country}`,
        village.description,
        `/aldeas/${village.slug}`,
      )
    : {};
}
export default async function VillagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const village = getVillage(slug);
  if (!village) notFound();
  const mainImage = village.image;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(village.location)}`;
  return (
    <>
      <section className="village-hero container">
        <div className="village-hero-copy">
          <Link href="/aldeas" className="breadcrumb">
            Aldeas / {village.country}
          </Link>
          <p className="eyebrow">
            Kiryus {village.country} / {village.region}
          </p>
          <h1>
            {village.focus.split(" ").slice(0, 2).join(" ")}
            <br />
            <em>{village.focus.split(" ").slice(2).join(" ")}</em>
          </h1>
          <p>{village.description}</p>
          <span className="location">
            <MapPin size={17} aria-hidden="true" />
            {village.location}
          </span>
          <Action href={`/involucrate?interes=visita&aldea=${village.slug}`}>
            Consultar visita
          </Action>
        </div>
        <div className="village-hero-photo">
          <Photo image={mainImage} priority />
          <span className="village-hero-number">{village.number}</span>
        </div>
      </section>
      <section className="section container story-grid">
        <div>
          <p className="eyebrow">El territorio / {village.status}</p>
          <h2>
            Una historia que
            <br />
            <em>sigue creciendo.</em>
          </h2>
        </div>
        <div className="prose">
          <p>{village.introduction}</p>
          <div className="village-timeline">
            {village.story.map((item) => (
              <div key={item.year}>
                <strong>{item.year}</strong>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section village-practices">
        <div className="container practices-grid">
          <div>
            <p className="eyebrow">Lo que hacemos</p>
            <h2>
              Aprender desde
              <br />
              <em>el territorio.</em>
            </h2>
            <p>
              Las líneas de trabajo conectan el cuidado del entorno con el
              aprendizaje compartido.
            </p>
          </div>
          <ul>
            {village.activities.map((activity) => (
              <li key={activity}>
                <Check size={21} aria-hidden="true" />
                {activity}
              </li>
            ))}
          </ul>
        </div>
        <div className="container village-facts">
          {village.details.map((detail) => (
            <div key={detail.label}>
              <span className="eyebrow">{detail.label}</span>
              <strong>{detail.value}</strong>
            </div>
          ))}
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Momentos de la comunidad</p>
            <h2>
              Miradas desde
              <br />
              <em>{village.country}.</em>
            </h2>
          </div>
          <p>
            Fotografías compartidas por Kiryus en la presentación de esta sede.
          </p>
        </div>
        <Gallery images={village.gallery} compact />
      </section>
      <section className="section village-visit">
        <div className="container visit-grid">
          <div>
            <p className="eyebrow">Antes de venir</p>
            <h2>
              Conversemos
              <br />
              <em>tu visita.</em>
            </h2>
            <p>
              Consulta las tareas, condiciones, aportes, alojamiento y
              disponibilidad antes de planificar el viaje. La comunidad te
              orientará según la etapa actual de la aldea.
            </p>
            <Action href={`/involucrate?aldea=${village.slug}`}>
              Preparar una consulta
            </Action>
          </div>
          <div className="faq-list">
            <details>
              <summary>¿Puedo visitar o hacer voluntariado?</summary>
              <p>
                Puedes enviar una consulta a Kiryus indicando tu interés y tus
                fechas orientativas. Las posibilidades se coordinan con la
                comunidad y dependen de cada sede.
              </p>
            </details>
            <details>
              <summary>¿Qué incluye una estadía?</summary>
              <p>
                Las condiciones deben confirmarse directamente con la aldea.
                Pregunta por alojamiento, comidas, actividades, tareas, aportes
                económicos y acceso antes de acordar una estadía.
              </p>
            </details>
            <details>
              <summary>¿Dónde se encuentra la aldea?</summary>
              <p>
                {village.location}. El mapa abre una búsqueda de la localidad;
                solicita las indicaciones de acceso exactas antes de viajar.
              </p>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Ver la localidad en el mapa{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </details>
          </div>
        </div>
      </section>
      <section className="section container other-villages">
        <p className="eyebrow">Sigue explorando la red</p>
        <div>
          {villages
            .filter((other) => other.slug !== village.slug)
            .map((other) => (
              <Link href={`/aldeas/${other.slug}`} key={other.slug}>
                <span>{other.country}</span>
                <span>
                  {other.region} <ArrowUpRight size={22} aria-hidden="true" />
                </span>
              </Link>
            ))}
        </div>
      </section>
      <Closing village={village.slug} />
    </>
  );
}
