import { pageMetadata } from "@/lib/metadata";
import { VillageCards } from "@/components/sections/VillageCards";
import { LegacyPreview } from "@/components/sections/LegacyPreview";
import { Closing } from "@/components/sections/Closing";
export const metadata = pageMetadata(
  "Nuestras aldeas",
  "Explora las aldeas Kiryus en Argentina y Colombia. Conoce cada territorio, sus prácticas y las posibilidades de acercarte a la comunidad.",
  "/aldeas",
);
export default function VillagesPage() {
  return (
    <>
      <section className="page-hero container">
        <p className="eyebrow">Los territorios / Argentina y Colombia</p>
        <div className="page-hero-grid">
          <h1>
            Lugares para
            <br />
            <em>crecer juntos.</em>
          </h1>
          <p>
            Dos aldeas que se construyen desde las particularidades de cada paisaje,
            con una intención compartida de cuidar y colaborar.
          </p>
        </div>
      </section>
      <section className="container directory-section">
        <VillageCards />
        <div className="directory-note">
          <span className="eyebrow">Antes de acercarte</span>
          <p>
            Cada aldea tiene sus propios procesos y condiciones. Las visitas y
            estadías requieren coordinación previa; una consulta no confirma
            disponibilidad ni una reserva.
          </p>
        </div>
      </section>
      <LegacyPreview />
      <Closing />
    </>
  );
}
