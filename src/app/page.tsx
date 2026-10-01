import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Earth,
  Leaf,
  Sprout,
  Users,
  Zap,
} from "lucide-react";
import { Action } from "@/components/ui/Action";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { ImpactCounter } from "@/components/motion/ImpactCounter";
import {
  impactFigures,
  impactContext,
  sustainableGoals,
} from "@/content/impact";
import { VillageCards } from "@/components/sections/VillageCards";
import { LegacyPreview } from "@/components/sections/LegacyPreview";
import { Gallery } from "@/components/sections/Gallery";
import { WorldNetwork } from "@/components/sections/WorldNetwork";
import { ParticipationCards } from "@/components/sections/ParticipationCards";
import { Closing } from "@/components/sections/Closing";
import { pageMetadata } from "@/lib/metadata";
import type { DocumentaryImage } from "@/content/villages";
import { getImage, lifeImages } from "@/content/images";
export const metadata = pageMetadata(
  "Habitar la Tierra. Regenerar el futuro.",
  "Conoce las ecoaldeas Kiryus en Argentina y Colombia y el legado de España. Vida comunitaria, permacultura y oportunidades de participación.",
  "/",
);
const hero: DocumentaryImage = getImage("comunidad-paisaje");
const gallery: DocumentaryImage[] = [
  getImage("colombia-comunidad"),
  getImage("argentina-actividad"),
  getImage("espana-convivencia"),
  hero,
];
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="tiny-leaf">
              <Leaf size={16} strokeWidth={1.5} />
            </span>{" "}
            Una red de ecoaldeas
          </p>
          <h1>
            Habitar <br />
            la Tierra. <br />
            <em>
              Regenerar <br />
              el futuro.
            </em>
          </h1>
          <p className="hero-description">
            Personas y territorios que se encuentran para aprender, colaborar y
            construir formas conscientes de vivir.
          </p>
          <div className="hero-actions">
            <Action href="/aldeas">Conoce nuestras aldeas</Action>
            <Action href="/involucrate" secondary>
              Quiero participar
            </Action>
          </div>
          <div className="hero-bottom">
            <span>
              <Earth size={18} strokeWidth={1.4} aria-hidden="true" /> Argentina
              · Colombia
            </span>
            <a href="#la-comunidad" aria-label="Explorar la comunidad">
              <ArrowDown size={20} />
            </a>
          </div>
        </div>
        <div className="hero-media">
          <Photo image={hero} priority sizes="(max-width: 768px) 100vw, 55vw" />
          <div className="hero-image-caption">
            <span className="eyebrow">Tierra, personas y posibilidades</span>
            <p>
              Una manera de vivir.
              <br />
              Muchas formas de encontrarnos.
            </p>
          </div>
          <span className="hero-photo-label">KIRYUS / TERRITORIOS VIVOS</span>
        </div>
      </section>
      <section id="la-comunidad" className="section about-section">
        <div className="container about-grid">
          <Reveal className="about-photo">
            <Photo image={gallery[0]} />
            <span className="photo-stamp">
              Crecer
              <br />
              <em>juntos.</em>
            </span>
          </Reveal>
          <Reveal className="about-copy">
            <p className="eyebrow">01 / La comunidad</p>
            <h2>
              La vida florece
              <br />
              cuando <em>se comparte.</em>
            </h2>
            <p>
              Somos una comunidad que conecta personas con una intención común:
              cuidar la tierra, aprender de ella y construir vínculos que se
              sostienen en el tiempo.
            </p>
            <p>
              En Kiryus, la permacultura, la autonomía local y el trabajo
              colectivo toman forma en las aldeas de Argentina y Colombia.
              Nuestra historia también guarda los aportes de España.
            </p>
            <Link href="/nosotros" className="text-link">
              Conoce nuestra historia{" "}
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
      <section className="section villages-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / Nuestras aldeas</p>
              <h2>
                Dos aldeas.
                <br />
                <em>Una intención.</em>
              </h2>
            </div>
            <p>
              Cada lugar tiene su paisaje, su historia y su forma de contribuir.
              Descubre dónde está creciendo la comunidad.
            </p>
          </div>
          <VillageCards />
        </div>
      </section>
      <LegacyPreview />
      <section className="section principles-section">
        <div className="container">
          <p className="eyebrow">03 / Cómo trabajamos</p>
          <div className="principles-header">
            <h2>
              De la intención
              <br />
              <em>a las manos.</em>
            </h2>
            <p>
              El cuidado se convierte en práctica cuando participamos en lo que
              nos rodea.
            </p>
          </div>
          <div className="principles-grid">
            {[
              {
                icon: Sprout,
                number: "01",
                title: "Regenerar",
                text: "Cuidar el suelo, recuperar ecosistemas y acompañar los ciclos de la naturaleza.",
                detail: "Permacultura · Reforestación",
              },
              {
                icon: Zap,
                number: "02",
                title: "Crear autonomía",
                text: "Desarrollar capacidades locales para producir, construir y habitar con responsabilidad.",
                detail: "Bioconstrucción · Producción local",
              },
              {
                icon: Users,
                number: "03",
                title: "Hacer comunidad",
                text: "Compartir conocimientos, colaborar y aprender a convivir desde el trabajo colectivo.",
                detail: "Aprendizaje · Colaboración",
              },
            ].map(({ icon: Icon, ...item }) => (
              <Reveal key={item.number} className="principle">
                <div className="principle-top">
                  <Icon size={38} strokeWidth={1.1} aria-hidden="true" />
                  <span>{item.number}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="principle-detail">{item.detail}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section life-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">04 / La vida en Kiryus</p>
              <h2>
                Lo cotidiano
                <br />
                <em>también transforma.</em>
              </h2>
            </div>
            <p>
              Aprender una habilidad. Compartir una tarea. Encontrarse alrededor
              de una mesa. La comunidad se construye en esos momentos.
            </p>
          </div>
          <Gallery images={lifeImages} />
        </div>
      </section>
      <section className="section network-section">
        <div className="container">
          <p className="eyebrow">05 / Una red que conecta</p>
          <h2>
            Distintas latitudes.
            <br />
            <em>El mismo horizonte.</em>
          </h2>
          <WorldNetwork />
        </div>
      </section>
      <section className="impact-section section">
        <div className="container">
          <div className="impact-header">
            <p className="eyebrow">06 / Cuidar lo que nos sostiene</p>
            <h2>
              Pequeñas acciones.
              <br />
              <em>Territorios que cambian.</em>
            </h2>
          </div>
          <div className="impact-numbers">
            {impactFigures.map((figure) => (
              <ImpactCounter key={figure.id} figure={figure} />
            ))}
          </div>
          <p className="impact-note">{impactContext}</p>
          <div className="ods-row">
            <p>
              Prácticas orientadas a los Objetivos de Desarrollo Sostenible.
            </p>
            <div>
              {sustainableGoals.map((goal) => (
                <span key={goal.number} title={goal.name}>
                  <b>{goal.number}</b>
                  {goal.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section participation-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">07 / Tu lugar en esta historia</p>
              <h2>
                Empieza por
                <br />
                <em>lo que te mueve.</em>
              </h2>
            </div>
            <p>
              Una visita, unas manos, unos días o una idea. Las posibilidades se
              conversan y se coordinan con cada aldea.
            </p>
          </div>
          <ParticipationCards />
        </div>
      </section>
      <Closing />
    </>
  );
}
