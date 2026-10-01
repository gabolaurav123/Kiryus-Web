import { ArrowUpRight, Leaf, Users, Zap } from "lucide-react";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { Photo } from "@/components/ui/Photo";
import { getImage } from "@/content/images";
import { Closing } from "@/components/sections/Closing";
import { WorldNetwork } from "@/components/sections/WorldNetwork";
import { LegacyPreview } from "@/components/sections/LegacyPreview";
export const metadata = pageMetadata(
  "Nuestra comunidad",
  "Conoce la historia y los principios de Comunidad Kiryus: aldeas en Argentina y Colombia, legado de España, regeneración, autonomía y colaboración.",
  "/nosotros",
);
export default function AboutPage() {
  return (
    <>
      <section className="page-hero container">
        <p className="eyebrow">Nosotros / Comunidad Kiryus</p>
        <div className="page-hero-grid">
          <h1>
            Una intención
            <br />
            que <em>echa raíces.</em>
          </h1>
          <p>
            Construir formas de vida que cuiden a las personas y al territorio.
            Aprender a hacerlo juntos.
          </p>
        </div>
      </section>
      <div className="container wide-photo">
        <Photo image={getImage("comunidad-grupo")} priority sizes="100vw" />
      </div>
      <section className="section container story-grid">
        <div>
          <p className="eyebrow">El origen</p>
          <h2>
            De encontrarnos
            <br />
            <em>a hacer comunidad.</em>
          </h2>
        </div>
        <div className="prose">
          <p>
            Kiryus se presenta como una iniciativa comunitaria sin fines de
            lucro iniciada en 2020. Nace del deseo de conectar personas
            alrededor del cuidado de la tierra, la autonomía y la colaboración.
          </p>
          <p>
            El proyecto tiene hoy dos aldeas, en Argentina y Colombia. Cada una
            tiene una historia y una etapa propia; las conecta una forma
            compartida de aprender y trabajar. España forma parte del legado de
            Kiryus por sus aportes y aprendizajes a lo largo del camino.
          </p>
          <p>
            La comunidad se construye en la práctica: recuperar un espacio,
            cultivar, compartir conocimientos y acompañar los procesos del
            territorio.
          </p>
          <Link href="/aldeas" className="text-link">
            Explorar los territorios{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <LegacyPreview />
      <section className="section principles-section">
        <div className="container">
          <p className="eyebrow">Lo que nos reúne</p>
          <h2>
            Tierra. Autonomía.
            <br />
            <em>Comunidad.</em>
          </h2>
          <div className="principles-grid">
            {[
              {
                Icon: Leaf,
                title: "Regeneración",
                text: "Trabajar con los ciclos naturales para recuperar suelos, fortalecer la biodiversidad y cuidar el territorio.",
              },
              {
                Icon: Zap,
                title: "Autonomía",
                text: "Desarrollar conocimientos, infraestructura y producción local para habitar con responsabilidad.",
              },
              {
                Icon: Users,
                title: "Colaboración",
                text: "Compartir habilidades y tareas; aprender de otras personas mientras construimos espacios comunes.",
              },
            ].map(({ Icon, title, text }) => (
              <div className="principle" key={title}>
                <Icon size={36} strokeWidth={1.3} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Una red en movimiento</p>
            <h2>
              Cada lugar aporta
              <br />
              <em>su propia historia.</em>
            </h2>
          </div>
          <p>
            El desarrollo de las aldeas es gradual. La disponibilidad de
            visitas, estadías y actividades se conversa directamente con la
            comunidad.
          </p>
        </div>
        <WorldNetwork />
      </section>
      <Closing />
    </>
  );
}
