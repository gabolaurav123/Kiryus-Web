import Link from "next/link";
import { ArrowUpRight, Leaf, Sprout, Zap } from "lucide-react";
import { impactFigures, impactContext, sustainableGoals } from "@/content/impact";
import { getImage } from "@/content/images";
import { pageMetadata } from "@/lib/metadata";
import { Action } from "@/components/ui/Action";
import { Reveal } from "@/components/motion/Reveal";
import { ImpactCounter } from "@/components/motion/ImpactCounter";
import { EditorialHero } from "@/components/discovery/EditorialHero";
import styles from "@/components/discovery/Discovery.module.css";

export const metadata = pageMetadata(
  "Regeneración en Kiryus",
  "Permacultura, reforestación, bioconstrucción y autonomía local. Conoce las prácticas de Kiryus y el contexto de sus cifras ambientales.",
  "/regeneracion",
);

const practices = [
  { Icon: Sprout, title: "Cuidar el suelo.", text: "La reforestación y el bosque comestible forman parte del trabajo en Colombia. La permacultura conecta el cuidado del suelo con los ciclos del territorio.", href: "/aldeas/colombia", link: "Conoce Colombia" },
  { Icon: Zap, title: "Crear autonomía.", text: "En Argentina, el trabajo colectivo desarrolla viviendas, infraestructura y sistemas de autonomía energética. Construir también es aprender a cuidar los recursos.", href: "/aldeas/argentina", link: "Conoce Argentina" },
  { Icon: Leaf, title: "Aprender haciendo.", text: "La colaboración, la producción local y el intercambio de conocimientos acompañan los procesos. Cada aldea desarrolla sus prácticas según su etapa y su entorno.", href: "/vida-en-comunidad", link: "Explora la vida en comunidad" },
];

export default function RegenerationPage() {
  return (
    <div className={styles.page}>
      <EditorialHero
        id="regeneracion-heading"
        label="Regeneración / El cuidado se vuelve práctica"
        title={<>Pequeñas acciones.<br /><span>Territorios que cambian.</span></>}
        description="Recuperar el suelo, construir con responsabilidad y compartir lo que aprendemos. El cuidado empieza en lo que hacemos cada día."
        image={getImage("comunidad-amanecer")}
        caption="Kiryus / Cuidar lo que nos sostiene"
      >
        <Action href="#practicas">Explora nuestras prácticas</Action>
      </EditorialHero>
      <section className={styles.section} id="practicas">
        <div className={styles.heading}>
          <div><p className={styles.kicker}>De la intención a las manos</p><h2>Trabajar con la tierra.<br />Aprender de ella.</h2></div>
          <p>Las prácticas parten del territorio y del trabajo colectivo. Estos son algunos de los caminos que desarrolla la comunidad.</p>
        </div>
        <div className={styles.practiceGrid}>
          {practices.map(({ Icon, title, text, href, link }, index) => (
            <Reveal key={title} className={styles.practice} delay={index * .06}>
              <Icon size={34} strokeWidth={1.4} aria-hidden="true" />
              <h3>{title}</h3><p>{text}</p>
              <Link href={href} className={styles.textLink}>{link}<ArrowUpRight size={17} aria-hidden="true" /></Link>
            </Reveal>
          ))}
        </div>
      </section>
      <section className={styles.section} aria-labelledby="figures-heading">
        <div className={styles.darkPanel}>
          <p className={styles.kicker}>El recorrido en cifras</p>
          <h2 id="figures-heading">Un trabajo que<br />se construye en comunidad.</h2>
          <div className={styles.metrics}>{impactFigures.map((figure) => <ImpactCounter key={figure.id} figure={figure} />)}</div>
          <p className={styles.sourceNote}>{impactContext} Fuente de las cifras ambientales: <a href="https://www.comunidadkiryus.org/" target="_blank" rel="noopener noreferrer">información publicada por Kiryus</a>.</p>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.heading}>
          <div><p className={styles.kicker}>Una dirección compartida</p><h2>Prácticas con<br />un horizonte sostenible.</h2></div>
          <p>El cuidado del territorio, la autonomía y la colaboración se relacionan con estos Objetivos de Desarrollo Sostenible.</p>
        </div>
        <div className={styles.goals}>{sustainableGoals.map((goal) => <div className={styles.goal} key={goal.number}><b>{goal.number}</b><span>{goal.name}</span></div>)}</div>
        <p className={styles.smallNote}>Conoce los objetivos y sus metas en los <a href="https://www.undp.org/es/sustainable-development-goals" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>ODS del PNUD</a>.</p>
      </section>
      <section className={styles.section}>
        <div className={styles.callout}><div><h2>El cuidado también se comparte.</h2><p>Conoce las aldeas y conversa con la comunidad sobre cómo aportar tus manos, tus conocimientos o una idea.</p></div><Action href="/involucrate?interes=colaboracion">Quiero colaborar</Action></div>
      </section>
    </div>
  );
}
