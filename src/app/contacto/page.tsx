import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { directWhatsapp, siteConfig } from "@/lib/config";
import { Action } from "@/components/ui/Action";
import { Photo } from "@/components/ui/Photo";
import { getImage } from "@/content/images";
import { SocialIcon } from "@/components/ui/SocialIcon";
export const metadata = pageMetadata(
  "Contacto",
  "Conversa con Comunidad Kiryus por WhatsApp y conoce sus canales oficiales de Instagram y TikTok.",
  "/contacto",
);
export default function ContactPage() {
  return (
    <>
      <section className="page-hero container">
        <p className="eyebrow">Contacto / Estamos cerca</p>
        <div className="page-hero-grid">
          <h1>
            Conversemos
            <br />
            <em>lo que viene.</em>
          </h1>
          <p>
            Para conocer una aldea, consultar una experiencia o compartir una
            idea. El siguiente paso puede ser una conversación.
          </p>
        </div>
      </section>
      <section className="container contact-grid">
        <div className="contact-photo">
          <Photo image={getImage("comunidad-circulo")} priority />
        </div>
        <div className="contact-channels">
          <a href={directWhatsapp} target="_blank" rel="noopener noreferrer">
            <SocialIcon network="whatsapp" size={28} />
            <div>
              <span className="eyebrow">Hablemos directamente</span>
              <h2>WhatsApp</h2>
              <p>{siteConfig.whatsappDisplay}</p>
            </div>
            <ArrowUpRight size={27} aria-hidden="true" />
          </a>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialIcon network="instagram" size={28} />
            <div>
              <span className="eyebrow">La vida de la comunidad</span>
              <h2>Instagram</h2>
              <p>@ecoaldeaskiryus</p>
            </div>
            <ArrowUpRight size={27} aria-hidden="true" />
          </a>
          <a href={siteConfig.tiktok} target="_blank" rel="noopener noreferrer">
            <SocialIcon network="tiktok" size={28} />
            <div>
              <span className="eyebrow">Ideas y momentos compartidos</span>
              <h2>TikTok</h2>
              <p>@ecoaldeaskiryus</p>
            </div>
            <ArrowUpRight size={27} aria-hidden="true" />
          </a>
        </div>
      </section>
      <section className="section container contact-help">
        <p className="eyebrow">¿Todavía no sabes por dónde empezar?</p>
        <h2>
          Cuéntanos
          <br />
          <em>qué te interesa.</em>
        </h2>
        <p>
          Prepara una consulta con la sede y el motivo de tu interés. Podrás
          revisar el mensaje antes de enviarlo por WhatsApp.
        </p>
        <Action href="/involucrate">Preparar mi consulta</Action>
      </section>
    </>
  );
}
