import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Camera as Instagram, MessageCircle } from "lucide-react";
import { villages } from "@/content/villages";
import { directWhatsapp, siteConfig } from "@/lib/config";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Link href="/" aria-label="Comunidad Kiryus · Inicio">
            <Image
              src="/images/kiryus-logo.webp"
              alt="Kiryus"
              width={210}
              height={101}
            />
          </Link>
          <p>
            Habitar con sentido.
            <br />
            Crecer en comunidad.
          </p>
        </div>
        <div>
          <h2>La comunidad</h2>
          <Link href="/nosotros">Nosotros</Link>
          <Link href="/legado/espana">Legado de España</Link>
          <Link href="/involucrate">Formas de participar</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contacto">Contacto</Link>
        </div>
        <div>
          <h2>Las aldeas actuales</h2>
          {villages.map((village) => (
            <Link key={village.slug} href={`/aldeas/${village.slug}`}>
              {village.country}
              <span>{village.region}</span>
            </Link>
          ))}
        </div>
        <div>
          <h2>Sigamos en contacto</h2>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={17} aria-hidden="true" /> Instagram{" "}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <a href={siteConfig.tiktok} target="_blank" rel="noopener noreferrer">
            TikTok <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <a href={directWhatsapp} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={17} aria-hidden="true" /> WhatsApp{" "}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Comunidad Kiryus</p>
        <span>Dos aldeas. Una intención compartida.</span>
        <Link href="/privacidad">Privacidad</Link>
      </div>
    </footer>
  );
}
