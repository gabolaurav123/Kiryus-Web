import { Compass } from "lucide-react";
import { Action } from "@/components/ui/Action";
export default function NotFound() {
  return (
    <section className="container empty-state not-found">
      <Compass size={52} strokeWidth={1.2} aria-hidden="true" />
      <p className="eyebrow">404 / Otro camino</p>
      <h1>
        Este sendero
        <br />
        <em>no lleva a una página.</em>
      </h1>
      <p>Puedes volver al inicio o explorar los territorios de la comunidad.</p>
      <div className="hero-actions">
        <Action href="/">Volver al inicio</Action>
        <Action href="/aldeas" secondary>
          Explorar las aldeas
        </Action>
      </div>
    </section>
  );
}
