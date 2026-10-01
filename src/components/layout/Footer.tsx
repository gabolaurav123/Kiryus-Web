import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { villages } from "@/content/villages";
import { directWhatsapp, siteConfig } from "@/lib/config";
import styles from "./Navigation.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <Link href="/" aria-label="Comunidad Kiryus · Inicio" className={styles.footerWordmark}>KIRYUS<span aria-hidden="true">↗</span></Link>
            <p>Habitar la Tierra.<br />Regenerar el futuro.</p>
            <Link className={styles.footerCta} href="/involucrate">Sé parte de la comunidad<ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <nav className={styles.footerGroup} aria-label="Explorar la comunidad">
            <h2>Explorar</h2>
            <Link href="/vida-en-comunidad">Vida en comunidad</Link>
            <Link href="/nosotros">Nuestra historia</Link>
            <Link href="/regeneracion">Regeneración</Link>
            <Link href="/red">La red</Link>
            <Link href="/blog">Blog</Link>
          </nav>
          <nav className={styles.footerGroup} aria-label="Aldeas y legado">
            <h2>Nuestras aldeas</h2>
            {villages.map((village) => <Link className={styles.footerVillage} href={`/aldeas/${village.slug}`} key={village.slug}>{village.country}<span>{village.region}</span></Link>)}
            <Link className={styles.footerDirectory} href="/aldeas">Explorar las aldeas<ArrowUpRight size={14} aria-hidden="true" /></Link>
            <div className={styles.footerLegacy}><span>Nuestro legado</span><Link href="/legado/espana">España<ArrowUpRight size={14} aria-hidden="true" /></Link></div>
          </nav>
          <nav className={styles.footerGroup} aria-label="Contacto y redes sociales">
            <h2>Conectar</h2>
            <Link href="/contacto">Hablemos</Link>
            {[{ label: "Instagram", href: siteConfig.instagram }, { label: "TikTok", href: siteConfig.tiktok }, { label: "WhatsApp", href: directWhatsapp }].map((item) => <a href={item.href} key={item.label} target="_blank" rel="noopener noreferrer">{item.label}<ArrowUpRight size={14} aria-hidden="true" /><span className={styles.srOnly}> (se abre en otra pestaña)</span></a>)}
          </nav>
        </div>
        <div className={styles.footerBottom}><p>© {new Date().getFullYear()} Comunidad Kiryus</p><span>Argentina · Colombia</span><div><Link href="/privacidad">Privacidad</Link><Link href="/admin">Acceso al equipo<ArrowUpRight size={12} aria-hidden="true" /></Link></div></div>
      </div>
    </footer>
  );
}
