import Link from "next/link";
import { ArrowUpRight, Leaf, Users, Zap } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { getImage } from "@/content/images";
import { Action } from "@/components/ui/Action";
import { Reveal } from "@/components/motion/Reveal";
import { EditorialHero } from "@/components/discovery/EditorialHero";
import styles from "@/components/discovery/Discovery.module.css";

export const metadata = pageMetadata(
  "Nuestra comunidad",
  "Conoce la historia y los principios de Comunidad Kiryus: aldeas en Argentina y Colombia, legado de España, regeneración, autonomía y colaboración.",
  "/nosotros",
);

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <EditorialHero
        id="nosotros-heading"
        label="Nosotros / Comunidad Kiryus"
        title={<>Una intención<br /><span>que echa raíces.</span></>}
        description="Personas que se encuentran para cuidar la tierra, construir autonomía y aprender a vivir juntas. La comunidad empieza en lo que compartimos."
        image={getImage("comunidad-colaboracion")}
        caption="Kiryus / Una intención compartida"
      >
        <Action href="/vida-en-comunidad">Conoce la vida en Kiryus</Action>
      </EditorialHero>
      <section className={styles.section}>
        <div className={styles.split}>
          <div><p className={styles.kicker}>El origen / Un camino compartido</p><h2>De encontrarnos<br />a hacer comunidad.</h2></div>
          <div className={styles.body}>
            <p>Kiryus se presenta como una iniciativa comunitaria sin fines de lucro iniciada en 2020. Nace del deseo de conectar personas alrededor del cuidado de la tierra, la autonomía y la colaboración.</p>
            <p>Hoy, ese camino toma forma en dos aldeas: Argentina y Colombia. Cada una tiene su paisaje, su historia y su etapa. Las conecta una forma compartida de aprender y trabajar.</p>
            <p>España también forma parte de nuestra historia. Su aportación, sus encuentros y sus aprendizajes se conservan como legado de Kiryus.</p>
            <Link href="/legado/espana" className={styles.textLink}>Conoce el legado de España <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.heading}>
          <div><p className={styles.kicker}>Lo que nos reúne</p><h2>Tierra. Autonomía.<br />Comunidad.</h2></div>
          <p>Una intención compartida toma forma cuando se convierte en prácticas, capacidades y vínculos cotidianos.</p>
        </div>
        <div className={styles.practiceGrid}>
          {[
            { Icon: Leaf, title: "Regeneración.", text: "Trabajar con los ciclos naturales para cuidar el suelo, acompañar la biodiversidad y aprender del territorio." },
            { Icon: Zap, title: "Autonomía.", text: "Desarrollar conocimientos, infraestructura y producción local para construir formas responsables de habitar." },
            { Icon: Users, title: "Colaboración.", text: "Compartir habilidades y tareas; aprender de otras personas mientras construimos espacios comunes." },
          ].map(({ Icon, title, text }, index) => <Reveal key={title} className={styles.practice} delay={index * .06}><Icon size={34} strokeWidth={1.4} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></Reveal>)}
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.heading}>
          <div><p className={styles.kicker}>Conoce Kiryus a tu ritmo</p><h2>Hay más de una<br />forma de acercarte.</h2></div>
        </div>
        <div className={styles.exploreGrid}>
          {[
            { href: "/red", title: "La red.", text: "Argentina, Colombia y el legado de España. Cada territorio tiene una historia que aportar." },
            { href: "/vida-en-comunidad", title: "La vida compartida.", text: "Los encuentros, las tareas y los aprendizajes que construyen comunidad cada día." },
            { href: "/regeneracion", title: "La regeneración.", text: "Las prácticas con la tierra y el contexto de las cifras comunicadas por Kiryus." },
          ].map((item) => <Link key={item.href} href={item.href} className={styles.exploreCard}><ArrowUpRight size={23} aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p></Link>)}
        </div>
      </section>
    </div>
  );
}
