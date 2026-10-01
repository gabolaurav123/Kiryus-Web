import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { villages } from "@/content/villages";
import { spainLegacy } from "@/content/legacy";
import { getImage } from "@/content/images";
import { pageMetadata } from "@/lib/metadata";
import { Photo } from "@/components/ui/Photo";
import { Action } from "@/components/ui/Action";
import { Reveal } from "@/components/motion/Reveal";
import { WorldNetwork } from "@/components/sections/WorldNetwork";
import { EditorialHero } from "@/components/discovery/EditorialHero";
import styles from "@/components/discovery/Discovery.module.css";

export const metadata = pageMetadata(
  "La red Kiryus",
  "Dos aldeas actuales en Argentina y Colombia, y un legado compartido desde España. Conoce los territorios de Comunidad Kiryus.",
  "/red",
);

export default function NetworkPage() {
  return (
    <div className={styles.page}>
      <EditorialHero
        id="red-heading"
        label="La red Kiryus / Argentina + Colombia"
        title={<>Distintas latitudes.<br /><span>El mismo horizonte.</span></>}
        description="Cada territorio tiene su ritmo. Nos conecta el cuidado de la tierra y una forma compartida de aprender, colaborar y habitar."
        image={getImage("comunidad-paisaje")}
        caption="Kiryus / Territorios que nos reúnen"
      >
        <Action href="#aldeas-actuales">Encuentra una aldea</Action>
      </EditorialHero>
      <section className={styles.section} id="aldeas-actuales">
        <div className={styles.heading}>
          <div>
            <p className={styles.kicker}>Las aldeas actuales</p>
            <h2>Dos lugares.<br />Muchas posibilidades.</h2>
          </div>
          <p>
            Argentina y Colombia dan vida a la comunidad hoy. Explora sus
            proyectos y conoce la etapa de cada aldea antes de participar.
          </p>
        </div>
        <div className={styles.villageGrid}>
          {villages.map((village) => (
            <Link key={village.slug} href={`/aldeas/${village.slug}`} className={styles.villageCard}>
              <Photo image={village.image} sizes="(max-width: 700px) 100vw, 50vw" />
              <div className={styles.villageTop}>
                <span className={styles.pill}>{village.status}</span>
                <span className={styles.roundArrow}><ArrowUpRight size={20} aria-hidden="true" /></span>
              </div>
              <div className={styles.villageCopy}>
                <span className={styles.villageLocation}><MapPin size={13} aria-hidden="true" />{village.location}</span>
                <h3>{village.country}</h3>
                <p>{village.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.heading}>
          <div>
            <p className={styles.kicker}>La comunidad en el mapa</p>
            <h2>Un camino conectado.</h2>
          </div>
          <p>Dos aldeas en América del Sur y la memoria de España como parte del recorrido.</p>
        </div>
        <Reveal className={styles.networkPanel}><WorldNetwork /></Reveal>
      </section>
      <section className={styles.section} aria-labelledby="red-legacy-heading">
        <Reveal className={styles.legacy}>
          <div className={styles.legacyImage}><Photo image={spainLegacy.image} sizes="(max-width: 700px) 100vw, 40vw" /></div>
          <div className={styles.legacyCopy}>
            <p className={styles.kicker}>Legado histórico / España</p>
            <h2 id="red-legacy-heading">Las raíces<br />también nos acompañan.</h2>
            <p>
              Encuentros, prácticas y aprendizajes aportaron a la historia de
              Kiryus desde España. Conservamos esa memoria en un espacio propio.
              Las aldeas actuales están en Argentina y Colombia.
            </p>
            <Link href="/legado/espana" className={styles.textLink}>Descubre el legado de España <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </Reveal>
      </section>
      <section className={styles.section}>
        <div className={styles.callout}>
          <div><h2>Acércate desde lo que te mueve.</h2><p>Las visitas, estadías y posibilidades de voluntariado se coordinan con cada aldea. Una consulta inicia la conversación; no confirma una reserva.</p></div>
          <Action href="/involucrate">Quiero participar</Action>
        </div>
      </section>
    </div>
  );
}
