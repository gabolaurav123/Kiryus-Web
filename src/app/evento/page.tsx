import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, CalendarDays, Check, ChevronDown, Clock3, Flame, MapPin, Moon, Music2, Sparkles, Sun, Tent, Ticket, Users, Bus, Bed, ShoppingBag } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Reveal } from "@/components/motion/Reveal";
import { FestivalProgram } from "@/components/events/FestivalProgram";
import { festival, festivalAlwaysOn, festivalDays, festivalExtras, festivalFaqs, festivalGeneralIncludes, festivalPackingList, festivalPurchaseConditions, festivalTickets, festivalVipIncludes, festivalWorkshops } from "@/content/festival";
import { festivalDuo, festivalPresenters } from "@/content/festival-presenters";
import { enhancedDawn } from "@/content/enhanced-images";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/config";
import styles from "./Evento.module.css";

const description = "Viví TuConexión 2026: 13, 14 y 15 de noviembre en Aldea Kiryus, Burruyacú, Tucumán. Programa, talleres, música, alojamiento y entradas General y VIP.";
const baseMetadata = pageMetadata("Festival TuConexión 2026 · Evento", description, "/evento");
export const metadata: Metadata = { ...baseMetadata, openGraph: { ...baseMetadata.openGraph, locale: "es_AR" } };
const formatPrice = (price: number) => `$${new Intl.NumberFormat("es-AR").format(price)}`;
const inquiry = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hola, Comunidad Kiryus. Quiero consultar sobre TuConexión 2026, entradas y servicios opcionales.")}`;
const dayIcons = [Users, Sun, Sparkles];
const extraIcons = [Bus, Tent, Bed];
const highlights = [
  { Icon: Sun, label: "Recibir el amanecer", description: "Una ceremonia antes de que salga el sol. Respirar, caminar y comenzar juntos." },
  { Icon: Users, label: "Pasar del yo al nosotros", description: "Escucha, cooperación y pequeñas aldeas para experimentar otra manera de convivir." },
  { Icon: Flame, label: "Celebrar bajo las estrellas", description: "Música, fogatas, conversaciones y una noche para bailar y encontrarnos." },
];

function BuyButton({ label = "Adquirir", secondary = false, className = "", context }: { label?: string; secondary?: boolean; className?: string; context?: string }) {
  return <a href={festival.ticketUrl} target="_blank" rel="noopener noreferrer" className={`${styles.button} ${secondary ? styles.buttonOutline : ""} ${className}`} aria-label={context ? `${label} · ${context} (abre la plataforma de entradas)` : `${label} (abre la plataforma de entradas)`}>{label}<ArrowUpRight size={19} aria-hidden="true" /></a>;
}

export default function FestivalPage() {
  const eventSchema = {
    "@context": "https://schema.org", "@type": "Festival", name: festival.title, description,
    url: `${siteConfig.url}/evento`, startDate: "2026-11-13T14:00:00-03:00", endDate: "2026-11-15T17:00:00-03:00",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "Place", name: "Aldea Kiryus", address: { "@type": "PostalAddress", addressLocality: "Burruyacú", addressRegion: "Tucumán", addressCountry: "AR" } },
    organizer: { "@type": "Organization", name: "Comunidad Kiryus", url: siteConfig.url },
    offers: festivalTickets.filter(({ id }) => id !== "reserva").map(({ name, price }) => ({ "@type": "Offer", name, price, priceCurrency: "ARS", url: festival.ticketUrl })),
    performer: festivalPresenters.map(({ name, instagramUrl }) => ({ "@type": "Person", name, sameAs: instagramUrl })),
    maximumAttendeeCapacity: 120,
  };
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="festival-title">
      <div className={styles.wrap}>
        <div className={styles.heroTop}><Link href="/">Comunidad Kiryus <span>/</span> Argentina</Link><span>CUARTA EDICIÓN · 120 PERSONAS</span></div>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eventWord}>EVENTO<span className={styles.eventDot} /></p>
            <h1 id="festival-title">Festival<br /><span>TuConexión</span><small>2026</small></h1>
            <p className={styles.heroTheme}>Nueva <em>Humanidad.</em></p>
            <p className={styles.heroMotto}>{festival.motto}</p>
            <div className={styles.heroDetails}><p><CalendarDays size={18} aria-hidden="true" /><strong>13, 14 y 15 de noviembre</strong></p><p><MapPin size={18} aria-hidden="true" />Aldea Kiryus · Burruyacú · Tucumán</p></div>
            <div className={styles.heroActions}><BuyButton context="Festival TuConexión 2026" /><a href="#programa" className={styles.heroProgram}>Explorar el programa<ArrowDown size={17} aria-hidden="true" /></a></div>
            <p className={styles.heroPrice}>General <strong>$133.000</strong><span>·</span>VIP <strong>$369.000</strong><small>Valores base en ARS · Reserva base $20.000</small><small><strong>Compra online: +10% por servicio de Fanz.</strong> Revisá el desglose y el total antes de pagar.</small></p>
          </div>
          <div className={styles.heroVisual}>
            <Photo image={enhancedDawn} priority quality={85} sizes="(max-width: 760px) 100vw, 45vw" />
            <div className={styles.heroPhotoShade} />
            <div className={styles.visualTop}><span><span /> NOS ENCONTRAMOS EN KIRYUS</span><span>01 — 03</span></div>
            <div className={styles.orbit} aria-hidden="true"><div /><div /><div /><span>YO<br />OTRO<br /><em>NOSOTROS</em></span></div>
            <div className={styles.visualBottom}><p>Tres días para vivir<br /><em>otra manera de estar juntos.</em></p><span>13 / 14 / 15<br /><strong>NOVIEMBRE</strong></span></div>
          </div>
        </div>
        <div className={styles.heroFoot}><span><Tent size={17} aria-hidden="true" /> 3 días · 2 noches en la naturaleza</span><span><Users size={17} aria-hidden="true" /> Abierto a quienes quieran vivir la experiencia</span><a href="#entradas">Reservá tu lugar<ArrowUpRight size={16} aria-hidden="true" /></a></div>
      </div>
    </section>

    <nav className={styles.sectionNav} aria-label="Secciones del evento"><div className={styles.wrap}><a href="#experiencia">La experiencia</a><a href="#programa">Programa</a><a href="#talleres">Talleres</a><a href="#protagonistas">Protagonistas</a><a href="#entradas">Entradas</a><a href="#preparar">Tu estadía</a><a href="#informacion">Antes de comprar</a></div></nav>

    <section id="experiencia" className={`${styles.section} ${styles.wrap}`} aria-labelledby="experience-title">
      <Reveal className={styles.intro}><div><p className={styles.kicker}>01 / La experiencia</p><h2 id="experience-title">La nueva humanidad<br /><em>se vive juntos.</em></h2></div><div><p>{festival.description}</p><p>No necesitás pertenecer a Kiryus, saber meditar ni conocer a nadie antes de llegar. Vení con curiosidad y ganas de participar desde el cuidado.</p><span className={styles.intent}>YO <ArrowUpRight size={16} aria-hidden="true" /> AL OTRO <ArrowUpRight size={16} aria-hidden="true" /> AL NOSOTROS</span></div></Reveal>
      <div className={styles.highlightGrid}>{highlights.map(({ Icon, label, description: text }, index) => <Reveal key={label} delay={index * .07} className={styles.highlight}><Icon size={29} strokeWidth={1.3} aria-hidden="true" /><h3>{label}</h3><p>{text}</p><span>0{index + 1}</span></Reveal>)}</div>
      <div className={styles.alwaysOn} aria-label="Durante todo el festival">{festivalAlwaysOn.map((item) => <span key={item}>{item}</span>)}</div>
    </section>

    <section id="programa" className={styles.programSection} aria-labelledby="program-title"><div className={styles.wrap}>
      <Reveal className={styles.sectionHeading}><div><p className={styles.kicker}>02 / Tu recorrido</p><h2 id="program-title">Cada día,<br /><em>un nuevo encuentro.</em></h2></div><p>Del primer abrazo a la última semilla. Abrí cada día y descubrí el programa completo.</p></Reveal>
      <div className={styles.dayPreview}>{festivalDays.map((day, index) => { const Icon = dayIcons[index]; return <div key={day.id}><Icon size={21} strokeWidth={1.5} aria-hidden="true" /><p>{day.day} {13 + index}</p><strong>{day.verb}</strong><small>{index === 0 ? "Llegada desde las 14:00" : index === 1 ? "Un día entero para explorar" : "Cierre a las 17:00"}</small></div>; })}</div>
      <FestivalProgram />
      <p className={styles.programNote}>{festival.programNote} La grilla completa de artistas y facilitadores se anunciará progresivamente.</p>
    </div></section>

    <section id="talleres" className={`${styles.section} ${styles.wrap}`} aria-labelledby="workshops-title">
      <Reveal className={styles.sectionHeading}><div><p className={styles.kicker}>03 / Aprender haciendo</p><h2 id="workshops-title">No solo escucharlo.<br /><em>Experimentarlo.</em></h2></div><p>Elegí tu recorrido entre propuestas en simultáneo. Las seis experiencias especiales pertenecen a VIP; meditación y presencia forman parte de General.</p></Reveal>
      <div className={styles.workshops}>{festivalWorkshops.map((workshop, index) => <details key={workshop.id} className={styles.workshop}>
        <summary><span className={styles.workshopNumber}>0{index + 1}</span><span className={styles.workshopTitle}><strong>{workshop.title}</strong><span>{workshop.subtitle}</span></span><span className={styles.workshopMeta}><span>{workshop.modality === "vip" ? "VIP" : "GENERAL"}</span><small><Clock3 size={12} aria-hidden="true" />{workshop.duration}</small></span><ChevronDown className={styles.chevron} size={20} aria-hidden="true" /></summary>
        <div className={styles.workshopBody}><p>{workshop.description}</p><ul>{workshop.activities.map((item) => <li key={item}><Check size={15} aria-hidden="true" />{item}</li>)}</ul>{workshop.note && <p className={styles.smallNote}>{workshop.note}</p>}</div>
      </details>)}</div>
      <div className={styles.workshopJourney}><span>COMPRENDER</span><ArrowUpRight size={17} aria-hidden="true" /><span>EXPERIMENTAR</span><ArrowUpRight size={17} aria-hidden="true" /><span>INTEGRAR</span><ArrowUpRight size={17} aria-hidden="true" /><span>LLEVAR A LA VIDA</span></div>
      <p className={styles.smallNote}>Cupos limitados según cada propuesta. La organización confirmará la inscripción y la distribución horaria de los talleres de 2 horas y de bioconstrucción, de 3 horas.</p>
    </section>

    <section id="protagonistas" className={styles.peopleSection} aria-labelledby="people-title"><div className={styles.wrap}>
      <Reveal className={styles.sectionHeading}><div><p className={styles.kicker}>04 / Personas que nos acompañan</p><h2 id="people-title">Voces, presencia<br /><em>y caminos compartidos.</em></h2></div><p>Conocé a los primeros facilitadores confirmados. Seguiremos incorporando músicos, artistas, ponentes y expositores.</p></Reveal>
      <div className={styles.peopleGrid}>{festivalPresenters.map((person) => <Reveal key={person.id} className={styles.person}>
        <div className={styles.portrait}><Photo image={person.image} quality={85} sizes="(max-width: 700px) 100vw, 45vw" /><span>{person.time}</span></div>
        <div className={styles.personBody}><p className={styles.kicker}>{person.offering}</p><h3>{person.name}</h3><p className={styles.personRole}>{person.role}</p><p>{person.shortBio}</p><details className={styles.biography}><summary>Conocé su trayectoria<ChevronDown size={16} aria-hidden="true" /></summary><div>{person.fullBio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></details><a href={person.instagramUrl} target="_blank" rel="noopener noreferrer" className={styles.social}><SocialIcon network="instagram" size={17} />Instagram de {person.name}<ArrowUpRight size={15} aria-hidden="true" /></a></div>
      </Reveal>)}</div>
    </div></section>

    <section className={styles.night} aria-labelledby="night-title"><div className={styles.wrap}>
      <div className={styles.nightTop}><p className={styles.kicker}><Moon size={16} aria-hidden="true" /> Sábado / Noche TuConexión</p><span>ESCENARIO DESDE LAS 20:30</span></div>
      <div className={styles.nightGrid}><Reveal className={styles.duoPhoto}><Photo image={{ src: "/images/evento/alma-qhana.webp", alt: "Marité Zalazar y Carlos Sat Nam, Alma Qhana, compartiendo voz, guitarra y percusión en un concierto", width: 2450, height: 1634, position: "50% 50%" }} quality={85} sizes="(max-width: 760px) 100vw, 55vw" /><span><Music2 size={15} aria-hidden="true" /> MARITÉ & CARLOS SAT NAM</span></Reveal><Reveal className={styles.nightCopy}><p className={styles.kicker}>Concierto meditativo</p><h2 id="night-title">Alma <em>Qhana.</em></h2><p>{festivalDuo.description}</p><p className={styles.nightWords}>Mantras · Shabds · Voz · Música · Presencia</p><details className={styles.duoDetails}><summary>La propuesta del dúo<ChevronDown size={17} aria-hidden="true" /></summary><div>{festivalDuo.detail.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></details><div className={styles.duoLinks}><a href={festivalDuo.instagramUrl} target="_blank" rel="noopener noreferrer"><SocialIcon network="instagram" size={17} />Alma Qhana<ArrowUpRight size={15} aria-hidden="true" /></a><a href={festivalDuo.spotifyUrl} target="_blank" rel="noopener noreferrer">Escuchá a Carlos<ArrowUpRight size={15} aria-hidden="true" /></a></div><small>El horario individual del concierto se anunciará con la grilla artística.</small></Reveal></div>
      <div className={styles.nightFeatures}><div><Flame size={22} aria-hidden="true" /><h3>Fogatas de la Nueva Humanidad</h3><p>Historias, canciones y conversaciones bajo el mismo cielo.</p></div><div><Music2 size={22} aria-hidden="true" /><h3>Gran Fiesta TuConexión</h3><p>Baile, arte, movimiento y la alegría de disfrutar juntos.</p></div><div><Sparkles size={22} aria-hidden="true" /><h3>Más artistas por anunciar</h3><p>Los próximos nombres confirmados aparecerán en esta página.</p></div></div>
    </div></section>

    <section className={`${styles.section} ${styles.wrap} ${styles.market}`} aria-labelledby="market-title"><div><p className={styles.kicker}>Un espacio para descubrir</p><h2 id="market-title">Mercado<br /><em>Autosostenible.</em></h2></div><div><ShoppingBag size={31} strokeWidth={1.4} aria-hidden="true" /><p>Emprendimientos, productores, creadores y proyectos. Productos, servicios, gastronomía e ideas para conocer, intercambiar y crear alianzas.</p><small>Los emprendimientos y expositores participantes se anunciarán próximamente. Los alimentos y bebidas se adquieren por separado.</small></div></section>

    <section id="entradas" className={styles.ticketsSection} aria-labelledby="tickets-title"><div className={styles.wrap}>
      <Reveal className={styles.sectionHeading}><div><p className={styles.kicker}>05 / Elegí tu experiencia</p><h2 id="tickets-title">Tu lugar en<br /><em>TuConexión.</em></h2></div><p>Los tres días y una opción de alojamiento están incluidos. Elegí General o sumá las experiencias especiales con VIP. Los precios de entradas, reservas y vouchers son valores base en ARS. {festival.onlineServiceNote}</p></Reveal>
      <div className={styles.ticketGrid}>{festivalTickets.filter(({ id }) => ["general", "vip"].includes(id)).map((ticket) => <Reveal key={ticket.id} className={`${styles.ticket} ${ticket.id === "vip" ? styles.vip : ""}`}>
        <div className={styles.ticketTop}><span>{ticket.id === "vip" ? "LA EXPERIENCIA MÁS COMPLETA" : "TRES DÍAS PARA ENCONTRARNOS"}</span>{ticket.id === "vip" ? <Sparkles size={23} aria-hidden="true" /> : <Ticket size={23} aria-hidden="true" />}</div><h3>{ticket.name}</h3><p className={styles.price}>{formatPrice(ticket.price)}<small>ARS / persona · Valor base</small></p><p className={styles.ticketDescription}>{ticket.description}</p>
        <details className={styles.ticketIncludes} open><summary>{ticket.id === "vip" ? "General + experiencias especiales" : "Qué incluye General"}<ChevronDown size={16} aria-hidden="true" /></summary><ul>{(ticket.id === "vip" ? festivalVipIncludes : festivalGeneralIncludes).map((item) => <li key={item}><Check size={15} aria-hidden="true" /><span>{item}</span></li>)}</ul></details><BuyButton context={ticket.name} />
      </Reveal>)}</div>
      <div className={styles.notIncluded}><strong>En ninguna entrada están incluidos:</strong><span>Comidas · Transporte · Carpa individual privada · Colchón inflable</span></div>
      <div className={styles.groupHeading}><Users size={21} aria-hidden="true" /><div><h3>Vienen 5. Pagan 4.</h3><p>Compartí la experiencia con tu grupo.</p></div></div>
      <div className={styles.voucherGrid}>{festivalTickets.filter(({ id }) => id.startsWith("voucher")).map((ticket) => <div key={ticket.id} className={styles.voucher}><div><p>{ticket.name}</p><strong>{formatPrice(ticket.price)} <small>ARS / 5 personas · Valor base</small></strong><span>Ahorro sobre valores base: {ticket.id === "voucher-general" ? "$133.000" : "$369.000"} ARS</span></div><BuyButton secondary context={ticket.name} /></div>)}</div>
      <div className={styles.reserve}><div><p>Reservá tu lugar con</p><strong>$20.000 <small>ARS · Valor base</small></strong></div><p>{festival.onlineServiceNote} Las condiciones de reserva, la fecha límite para completar el saldo y la política de cancelación y devolución serán informadas próximamente por la organización.</p><BuyButton context="Reserva base de $20.000 ARS" /></div>
      <a href="#informacion" className={styles.conditionsLink}>Leé la información importante antes de comprar<ArrowDown size={16} aria-hidden="true" /></a>
    </div></section>

    <section id="extras" className={`${styles.section} ${styles.wrap}`} aria-labelledby="extras-title">
      <Reveal className={styles.sectionHeading}><div><p className={styles.kicker}>06 / Extras opcionales</p><h2 id="extras-title">Llegar y quedarte,<br /><em>a tu manera.</em></h2></div><p>Estos servicios tienen costo adicional y no están incluidos en General ni en VIP. Se solicitan con anticipación directamente a la organización.</p></Reveal>
      <div className={styles.extraGrid}>{festivalExtras.map((extra, index) => { const Icon = extraIcons[index]; return <div key={extra.id} className={styles.extra}><Icon size={29} strokeWidth={1.4} aria-hidden="true" /><h3>{extra.title}</h3><p className={styles.extraPrice}>{extra.priceLabel}</p><p>{extra.description}</p><details><summary>Detalles del servicio<ChevronDown size={16} aria-hidden="true" /></summary><ul>{extra.details.map((item) => <li key={item}>{item}</li>)}</ul></details><a href={inquiry} target="_blank" rel="noopener noreferrer">Consultar y reservar<ArrowUpRight size={16} aria-hidden="true" /></a></div>; })}</div>
    </section>

    <section id="preparar" className={styles.staySection} aria-labelledby="stay-title"><div className={styles.wrap}>
      <Reveal className={styles.sectionHeading}><div><p className={styles.kicker}>07 / Prepará tu estadía</p><h2 id="stay-title">Dos noches.<br /><em>La misma tierra.</em></h2></div><p>La aldea también es parte de la experiencia. Llegamos el viernes desde las 14:00 y nos despedimos el domingo a las 17:00.</p></Reveal>
      <div className={styles.stayGrid}><div className={styles.sleep}><Tent size={34} strokeWidth={1.4} aria-hidden="true" /><h3>Tenés dónde dormir.</h3><p>Tu entrada incluye alojamiento en las carpas comunitarias de Kiryus: una compartida para mujeres y otra para hombres.</p><p>También podés traer tu propia carpa e instalarla en el sector habilitado, sin costo adicional. No necesitás tener carpa propia para participar.</p><div className={styles.food}><strong>¿Y la comida?</strong><p>No está incluida en ninguna entrada. Habrá propuestas gastronómicas para adquirir tus alimentos y bebidas.</p></div></div><div className={styles.packing}><p className={styles.kicker}>Qué traer</p><h3>Un equipaje simple.<br />Ganas de compartir.</h3><ul>{festivalPackingList.map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul><small>Los elementos personales para dormir los trae cada participante, también si utiliza las carpas comunitarias.</small></div></div>
      <div className={styles.arrival}><MapPin size={25} aria-hidden="true" /><div><h3>Aldea Kiryus · Burruyacú · Tucumán, Argentina</h3><p>La información específica de acceso se comunicará a las personas confirmadas. Para el traslado organizado, el punto previsto es Parque 9 de Julio, cerca de la Terminal de San Miguel de Tucumán; los detalles se confirmarán con la reserva.</p><Link href="/aldeas/argentina">Conocé la aldea<ArrowUpRight size={16} aria-hidden="true" /></Link></div></div>
    </div></section>

    <section className={`${styles.section} ${styles.wrap}`} aria-labelledby="faq-title"><div className={styles.faqGrid}><div><p className={styles.kicker}>08 / Resolvé tus dudas</p><h2 id="faq-title">Antes de<br /><em>hacer la mochila.</em></h2><p className={styles.faqIntro}>Si tenés una necesidad particular, escribinos para confirmar los detalles antes de reservar.</p><a href={inquiry} target="_blank" rel="noopener noreferrer" className={styles.social}><SocialIcon network="whatsapp" size={18} />Hablá con Kiryus<ArrowUpRight size={16} aria-hidden="true" /></a></div><div className={styles.faqs}>{festivalFaqs.map(({ question, answer }) => <details key={question}><summary>{question}<ChevronDown size={17} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div></section>

    <section id="informacion" className={styles.purchaseSection} aria-labelledby="purchase-title"><div className={styles.wrap}>
      <Reveal className={styles.sectionHeading}><div><p className={styles.kicker}>09 / Antes de reservar</p><h2 id="purchase-title">Información importante<br /><em>antes de comprar.</em></h2></div><p>Queremos que tengas la información necesaria antes de reservar tu lugar. Verificá la modalidad elegida y los servicios adicionales que necesitás.</p></Reveal>
      <div className={styles.includeSummary}><div><span><Check size={19} aria-hidden="true" /> TU ENTRADA SÍ INCLUYE</span><p>Los 3 días del festival, alojamiento en carpa comunitaria o espacio para instalar tu propia carpa, y la programación correspondiente a la modalidad adquirida.</p></div><div><span>TU ENTRADA NO INCLUYE</span><p>Comidas, transporte, carpa individual privada ni colchón inflable. Son servicios que se adquieren o consultan por separado.</p></div></div>
      <div className={styles.purchaseConditions}>{festivalPurchaseConditions.map(({ title, description: text }) => <div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div>
      <details className={styles.priceSummary}><summary>Ver valores base y servicios opcionales<ChevronDown size={19} aria-hidden="true" /></summary><div>{festivalTickets.map((ticket) => <p key={ticket.id}><span>{ticket.name} · Valor base</span><strong>{formatPrice(ticket.price)} ARS</strong></p>)}<p><span>Compra online de entradas y reservas en Fanz</span><strong>+10% de cargo por servicio</strong></p><p><span>Transporte ida y vuelta / persona · Consulta a la organización</span><strong>$25.000 ARS</strong></p><p><span>Carpa individual privada</span><strong>Consultar</strong></p><p><span>Colchón inflable</span><strong>Consultar</strong></p></div></details>
    </div></section>

    <section className={styles.final} aria-labelledby="final-title"><div className={styles.finalRings} aria-hidden="true" /><div className={styles.wrap}><p className={styles.kicker}>13 · 14 · 15 de noviembre / Cupo limitado: 120 personas</p><h2 id="final-title">No vengas a imaginarla.<br /><em>Vení a vivirla.</em></h2><p>Nueva Humanidad · Todos unidos por un mismo propósito.</p><BuyButton context="Festival TuConexión 2026" /><span className={styles.finalLocation}>Aldea Kiryus · Burruyacú · Tucumán</span><small>Reserva base: $20.000 ARS. {festival.onlineServiceNote} Revisá también las condiciones informadas por la organización.</small></div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema).replace(/</g, "\\u003c") }} />
  </div>;
}
