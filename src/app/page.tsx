import Link from "next/link";
import { ArrowUpRight, Globe2, Leaf, MapPin, MoveDown, Users } from "lucide-react";
import { Action } from "@/components/ui/Action";
import { Photo } from "@/components/ui/Photo";
import { ResponsiveHeroPhoto } from "@/components/ui/ResponsiveHeroPhoto";
import { Reveal } from "@/components/motion/Reveal";
import { HeroAtmosphere } from "@/components/motion/AmbientMotion";
import { Closing } from "@/components/sections/Closing";
import { getImage } from "@/content/images";
import { enhancedDawn, enhancedLandscape } from "@/content/enhanced-images";
import { villages } from "@/content/villages";
import { pageMetadata } from "@/lib/metadata";
import styles from "./Home.module.css";

export const metadata = pageMetadata("Otra forma de habitar la Tierra", "Descubre Kiryus: ecoaldeas en Argentina y Colombia, vida en comunidad, regeneración y el legado de España. Encuentra tu forma de participar.", "/");
const paths = [
  { href: "/aldeas", label: "Explora las aldeas", detail: "Argentina · Colombia", Icon: MapPin },
  { href: "/vida-en-comunidad", label: "Vida en comunidad", detail: "Personas, tareas y encuentros", Icon: Users },
  { href: "/regeneracion", label: "Regeneración", detail: "Del cuidado a la práctica", Icon: Leaf },
  { href: "/red", label: "Conoce la red", detail: "Territorios y raíces compartidas", Icon: Globe2 },
];
export default function Home() {
  return (<>
    <Link href="/evento" className={styles.eventBanner}><span><strong>EVENTO / TUCONEXIÓN 2026</strong><span>13, 14 y 15 de noviembre · Aldea Kiryus, Tucumán</span></span><span>Ver evento<ArrowUpRight size={19} aria-hidden="true" /></span></Link>
    <section className={styles.hero} aria-labelledby="home-title">
      <HeroAtmosphere className={styles.atmosphere}><ResponsiveHeroPhoto desktop={enhancedLandscape} mobile={enhancedDawn} /></HeroAtmosphere>
      <div className={styles.heroShade} />
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <p className={styles.tag}><span /> Comunidad Kiryus / Ecoaldeas</p>
          <h1 id="home-title"><span>Otra forma </span><span>de habitar </span><span className={styles.accent}>la Tierra.</span></h1>
          <p className={styles.heroDescription}>Volver a lo esencial. Cuidar el territorio. Construir una vida que se comparte.</p>
          <div className={styles.heroActions}><Action href="/aldeas" light>Descubre las aldeas</Action><Action href="/involucrate" secondary>Encuentra tu lugar</Action></div>
        </div>
        <Link href="/vida-en-comunidad" className={styles.heroStory}><div className={styles.storyImage}><Photo image={getImage("comunidad-grupo")} sizes="(max-width: 700px) 49px, (max-width: 1100px) 65px, 80px" /></div><div><span>La vida sucede juntos</span><p>Asómate a la comunidad</p></div><ArrowUpRight size={22} aria-hidden="true" /></Link>
        <div className={styles.heroFooter}><p><span className={styles.locationDot} />Argentina y Colombia <span className={styles.footerDivider}>/</span><span className={styles.heroMotto}>Dos aldeas. Una intención.</span></p><a href="#explorar" aria-label="Explorar Kiryus"><MoveDown size={17} aria-hidden="true" /></a></div>
      </div>
    </section>
    <nav id="explorar" className={`container ${styles.pathNav}`} aria-label="Encuentra lo que buscas en Kiryus">{paths.map(({ href, label, detail, Icon }, index) => (<Link key={href} href={href}><Icon size={21} strokeWidth={1.6} aria-hidden="true" /><div><span>{label}</span><small>{detail}</small></div><span className={styles.pathNumber}>0{index + 1}</span><ArrowUpRight className={styles.pathArrow} size={18} aria-hidden="true" /></Link>))}</nav>
    <section className={`container ${styles.territories}`} aria-labelledby="territories-title">
      <Reveal className={styles.sectionHeading}><div><p className="eyebrow">Los lugares que nos reúnen</p><h2 id="territories-title">Dos paisajes.<br /><em>Una vida en común.</em></h2></div><div className={styles.sectionIntro}><p>Cada aldea tiene su ritmo y su manera de cuidar la tierra. Elige un territorio y conoce lo que está creciendo allí.</p><Link href="/red" className="text-link">Cómo se conecta la red <ArrowUpRight size={18} aria-hidden="true" /></Link></div></Reveal>
      <div className={styles.villageGrid}>{villages.map((village, index) => (<Reveal key={village.slug} delay={index * 0.1}><Link href={`/aldeas/${village.slug}`} className={styles.village}><Photo image={village.image} sizes="(max-width: 700px) 100vw, 50vw" /><div className={styles.villageShade} /><span className={styles.villageStatus}><span />{village.status}</span><div className={styles.villageCopy}><p><MapPin size={15} aria-hidden="true" />{village.location}</p><h3>{village.country}</h3><span>{village.focus}</span></div><span className={styles.circleArrow}><ArrowUpRight size={26} aria-hidden="true" /></span></Link></Reveal>))}</div>
      <Link href="/legado/espana" className={styles.legacyNote}><span>Nuestras raíces también están en España.</span><span>Descubre su legado <ArrowUpRight size={18} aria-hidden="true" /></span></Link>
    </section>
    <section className={styles.discovery} aria-labelledby="discovery-title"><div className="container">
      <Reveal className={styles.discoveryHeading}><p className="eyebrow">Hay más de una manera de acercarte</p><h2 id="discovery-title">Encuentra lo<br /><em>que te mueve.</em></h2><p>Una comunidad se conoce por lo que vive, lo que cuida y lo que comparte. Empieza por lo que te interesa.</p></Reveal>
      <div className={styles.discoveryGrid}>
        <Reveal className={styles.lifeCard}><Link href="/vida-en-comunidad" className={styles.photoCard}><Photo image={getImage("comunidad-circulo")} sizes="(max-width: 700px) 100vw, 55vw" /><div className={styles.cardShade} /><div><p className={styles.cardKicker}>01 / Vida en comunidad</p><h3>Lo cotidiano<br />también transforma.</h3><p>Personas, aprendizajes y momentos que hacen comunidad.</p></div><span className={styles.circleArrow}><ArrowUpRight size={25} aria-hidden="true" /></span></Link></Reveal>
        <Reveal className={styles.impactCard} delay={0.08}><Link href="/regeneracion" className={styles.colorCard}><div className={styles.cardTop}><span className={styles.cardKicker}>02 / Regeneración</span><Leaf size={33} strokeWidth={1.4} aria-hidden="true" /></div><h3>Pequeñas acciones.<br />Territorios que cambian.</h3><div className={styles.cardBottom}><p>Permacultura, autonomía y cuidado de la tierra.</p><span className={styles.smallArrow}><ArrowUpRight size={22} aria-hidden="true" /></span></div></Link></Reveal>
        <Reveal className={styles.networkCard} delay={0.12}><Link href="/red" className={styles.colorCard}><div className={styles.cardTop}><span className={styles.cardKicker}>03 / La red Kiryus</span><Globe2 size={33} strokeWidth={1.4} aria-hidden="true" /></div><h3>Distintas latitudes.<br />El mismo horizonte.</h3><div className={styles.cardBottom}><p>Dos aldeas actuales y una memoria compartida.</p><span className={styles.smallArrow}><ArrowUpRight size={22} aria-hidden="true" /></span></div></Link></Reveal>
      </div>
    </div></section>
    <Closing />
  </>);
}
