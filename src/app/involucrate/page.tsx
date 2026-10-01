import { pageMetadata } from "@/lib/metadata";
import { ParticipationForm } from "@/components/sections/ParticipationForm";
import { Photo } from "@/components/ui/Photo";
import { getImage } from "@/content/images";
import { Compass, HandHeart, House, Sprout } from "lucide-react";
import { isCrmConfigured } from "@/lib/crm/server";
export const dynamic = "force-dynamic";
export const metadata = pageMetadata(
  "Encuentra tu forma de participar",
  "Consulta visitas, voluntariado, estadías y colaboraciones en Kiryus. Prepara tu mensaje y conversa directamente con la comunidad por WhatsApp.",
  "/involucrate",
);
export default function ParticipatePage() {
  return (
    <>
      <section className="page-hero container">
        <p className="eyebrow">Involúcrate / Empezar una conversación</p>
        <div className="page-hero-grid">
          <h1>
            Tu intención
            <br />
            <em>puede echar raíces.</em>
          </h1>
          <p>
            No hace falta tener todas las respuestas. Cuéntanos qué te interesa
            y a qué territorio te gustaría acercarte.
          </p>
        </div>
      </section>
      <section className="container form-layout">
        <aside className="participation-aside">
          <Photo image={getImage("comunidad-colaboracion")} />
          <h2>Hay un punto de encuentro.</h2>
          <ul>
            <li>
              <Compass size={21} aria-hidden="true" />
              Visitar y conocer
            </li>
            <li>
              <HandHeart size={21} aria-hidden="true" />
              Aportar como voluntario
            </li>
            <li>
              <House size={21} aria-hidden="true" />
              Consultar una estadía
            </li>
            <li>
              <Sprout size={21} aria-hidden="true" />
              Proponer una colaboración
            </li>
          </ul>
          <p>
            Las condiciones, tareas, aportes y disponibilidad se acuerdan con
            cada aldea. Esta consulta no confirma una reserva.
          </p>
        </aside>
        <ParticipationForm crmEnabled={isCrmConfigured()} />
      </section>
    </>
  );
}
