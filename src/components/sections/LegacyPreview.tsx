import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { spainLegacy } from "@/content/legacy";
import { Photo } from "@/components/ui/Photo";

export function LegacyPreview() {
  return (
    <section className="section legacy-section" aria-labelledby="legacy-heading">
      <div className="container about-grid">
        <div className="about-photo">
          <Photo image={spainLegacy.image} sizes="(max-width: 768px) 100vw, 45vw" />
        </div>
        <div className="about-copy">
          <p className="eyebrow">Nuestro legado / España</p>
          <h2 id="legacy-heading">
            Las raíces también
            <br />
            <em>nos acompañan.</em>
          </h2>
          <p>
            España ha aportado encuentros, prácticas y aprendizajes a la historia
            de Kiryus. Conservamos esa memoria como parte del camino compartido.
          </p>
          <p>
            Hoy las aldeas de Kiryus están en Argentina y Colombia. La experiencia
            de España tiene su propio espacio en nuestro legado.
          </p>
          <Link href="/legado/espana" className="text-link">
            Conoce el legado de España <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
