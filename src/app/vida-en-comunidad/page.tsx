import { BookOpen, HandHeart, Leaf } from "lucide-react";
import { getImage, lifeImages } from "@/content/images";
import { pageMetadata } from "@/lib/metadata";
import { Action } from "@/components/ui/Action";
import { Reveal } from "@/components/motion/Reveal";
import { Gallery } from "@/components/sections/Gallery";
import { EditorialHero } from "@/components/discovery/EditorialHero";
import styles from "@/components/discovery/Discovery.module.css";

export const metadata = pageMetadata(
  "Vida en comunidad",
  "Convivencia, aprendizaje y cuidado del territorio en Kiryus. Mira la vida cotidiana de la comunidad y conoce cómo preparar una consulta de participación.",
  "/vida-en-comunidad",
);

export default function CommunityLifePage() {
  return (
    <div className={styles.page}>
      <EditorialHero
        id="vida-heading"
        label="La vida en Kiryus / Personas + Tierra"
        title={<>Lo cotidiano<br /><span>también transforma.</span></>}
        description="Compartir una tarea. Aprender una habilidad. Encontrarse alrededor de una mesa. La comunidad se construye en esos momentos."
        image={getImage("comunidad-circulo")}
        caption="Kiryus / Aprender a vivir juntos"
      >
        <Action href="#momentos">Mira la vida en comunidad</Action>
      </EditorialHero>
      <section className={styles.section}>
        <div className={styles.practiceGrid}>
          {[
            { Icon: HandHeart, title: "Colaborar.", text: "Aportar a una tarea y compartir lo que sabemos. El trabajo colectivo da forma a los espacios, los proyectos y los vínculos." },
            { Icon: BookOpen, title: "Aprender.", text: "Intercambiar conocimientos, probar y volver a observar. Las prácticas del territorio ofrecen oportunidades para aprender con otras personas." },
            { Icon: Leaf, title: "Cuidar.", text: "Acompañar los ciclos de la tierra y prestar atención a la convivencia. El cuidado conecta el entorno con la vida compartida." },
          ].map(({ Icon, title, text }, index) => <Reveal key={title} className={styles.practice} delay={index * .06}><Icon size={34} strokeWidth={1.4} aria-hidden="true" /><h2>{title}</h2><p>{text}</p></Reveal>)}
        </div>
      </section>
      <section className={styles.section} id="momentos">
        <div className={styles.heading}>
          <div><p className={styles.kicker}>Momentos de la comunidad</p><h2>La vida sucede<br />entre nosotros.</h2></div>
          <p>Fotografías reales compartidas por Kiryus. Amplía cada imagen para mirar con más calma.</p>
        </div>
        <div className={styles.gallery}><Gallery images={lifeImages} /></div>
        <p className={styles.smallNote}>Estas fotografías forman parte del archivo general de la comunidad. No anuncian actividades próximas ni condiciones de alojamiento.</p>
      </section>
      <section className={styles.section} aria-labelledby="approach-heading">
        <div className={styles.heading}>
          <div><p className={styles.kicker}>Para acercarte</p><h2 id="approach-heading">El primer paso<br />es una conversación.</h2></div>
          <p>Las visitas, estadías y posibilidades de voluntariado dependen de la etapa de cada aldea y requieren coordinación previa.</p>
        </div>
        <ol className={styles.steps}>
          <li><span className={styles.stepNumber}>01 / EXPLORA</span><h3>Encuentra tu interés.</h3><p>Conoce Argentina y Colombia. Piensa si te mueve una visita, el voluntariado, una estadía o una colaboración.</p></li>
          <li><span className={styles.stepNumber}>02 / CONVERSA</span><h3>Comparte tu consulta.</h3><p>Indica la aldea, tu motivo y las fechas orientativas si las tienes. Revisa tus datos antes de compartirlos con Kiryus.</p></li>
          <li><span className={styles.stepNumber}>03 / COORDINA</span><h3>Confirma antes de venir.</h3><p>Pregunta por tareas, disponibilidad, acceso, alojamiento, comidas y posibles aportes. Una consulta no confirma una reserva.</p></li>
        </ol>
      </section>
      <section className={styles.section}>
        <div className={styles.callout}><div><h2>Hay un comienzo para cada camino.</h2><p>Cuéntanos qué te gustaría conocer o aportar. La comunidad podrá orientarte según el territorio y su momento actual.</p></div><Action href="/involucrate">Quiero participar</Action></div>
      </section>
    </div>
  );
}
