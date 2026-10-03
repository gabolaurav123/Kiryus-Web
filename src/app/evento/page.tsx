import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, ChevronDown, MapPin, Music2, Tent, Ticket, Users } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { FestivalProgram } from "@/components/events/FestivalProgram";
import { FestivalBookingBar } from "@/components/events/FestivalBookingBar";
import { festival, festivalAlwaysOn, festivalExtras, festivalFaqs, festivalGeneralIncludes, festivalPackingList, festivalPurchaseConditions, festivalTickets, festivalVipIncludes, festivalWorkshops } from "@/content/festival";
import { festivalDuo, festivalPresenters } from "@/content/festival-presenters";
import { enhancedDawn } from "@/content/enhanced-images";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/config";
import styles from "./Evento.module.css";

const description = "Viví TuConexión 2026 del 13 al 15 de noviembre en Aldea Kiryus, Tucumán. Elegí General o VIP, conocé el programa y adquirí tu entrada.";
const baseMetadata = pageMetadata("Festival TuConexión 2026 · Entradas y programa", description, "/evento");
export const metadata: Metadata = { ...baseMetadata, openGraph: { ...baseMetadata.openGraph, locale: "es_AR" } };
const formatPrice = (price: number) => `$${new Intl.NumberFormat("es-AR").format(price)}`;
const inquiry = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hola, Comunidad Kiryus. Quiero consultar sobre TuConexión 2026, entradas y servicios opcionales.")}`;
const duoImage = { src: "/images/evento/alma-qhana.webp", alt: "Marité y Carlos Sat Nam en un concierto de Alma Qhana", width: 2450, height: 1634, position: "50% 80%" };

function BuyButton({ label = "Adquirir entrada", context, secondary = false }: { label?: string; context?: string; secondary?: boolean }) {
  return <a href={festival.ticketUrl} target="_blank" rel="noopener noreferrer" className={`${styles.button} ${secondary ? styles.buttonOutline : ""}`} aria-label={`${label}${context ? ` · ${context}` : ""} (abre Fanz en otra pestaña)`}>{label}<ArrowUpRight size={20} aria-hidden="true" /></a>;
}

function faqCategory(question: string) {
  if (/entrada|VIP|reservar y/.test(question)) return "compra";
  if (/dónde|comidas|traslado|carpa|colchón|alimentación/i.test(question)) return "viaje";
  return "participar";
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
  return <div className={styles.page} data-festival-page>
    <section className={styles.hero} aria-labelledby="festival-title"><div className={styles.wrap}>
      <div className={styles.heroTop}><Link href="/">Comunidad Kiryus / Argentina</Link><span>EVENTO · CUARTA EDICIÓN</span></div>
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>13 · 14 · 15 NOVIEMBRE 2026</p>
          <h1 id="festival-title">Festival<br /><em>TuConexión</em><span>2026</span></h1>
          <p className={styles.heroLead}>Tres días para encontrarnos en la naturaleza y vivir otra manera de estar juntos.</p>
          <p className={styles.location}><MapPin size={18} aria-hidden="true" />Aldea Kiryus · Burruyacú · Tucumán</p>
          <div className={styles.heroActions}><BuyButton /><a href="#entradas" className={styles.textLink}>Ver precios y opciones<ArrowDown size={17} aria-hidden="true" /></a></div>
          <p className={styles.buyHint}>La compra se realiza en Fanz. Allí elegís General, VIP o Reserva.</p>
          <p className={styles.heroPrices}>General <strong>$133.000</strong><span>·</span>VIP <strong>$369.000</strong><small>ARS por persona</small></p>
        </div>
        <div className={styles.heroVisual}>
          <Photo image={enhancedDawn} priority quality={85} sizes="(max-width: 760px) 100vw, 45vw" />
          <div className={styles.photoShade} /><span className={styles.photoLabel}>NUEVA HUMANIDAD</span>
          <p className={styles.photoCaption}>Todos unidos<br /><em>por un mismo propósito.</em></p><span className={styles.edition}>04<small>EDICIÓN</small></span>
        </div>
      </div>
      <div className={styles.heroFacts}><span><Tent size={19} aria-hidden="true" />3 días · 2 noches</span><span><Check size={19} aria-hidden="true" />Camping incluido</span><span><Users size={19} aria-hidden="true" />Cupo: 120 personas</span></div>
    </div></section>

    <nav className={styles.sectionNav} aria-label="Secciones del evento"><div className={styles.wrap}><a href="#entradas">Entradas</a><a href="#programa">Programa</a><a href="#protagonistas">Artistas</a><a href="#preparar">Tu estadía</a><a href="#informacion">Dudas</a></div></nav>

    <section id="entradas" className={`${styles.ticketsSection} ${styles.wrap}`} aria-labelledby="tickets-title">
      <div className={styles.sectionHeading}><div><p className={styles.kicker}>01 / ELEGÍ CÓMO VIVIRLO</p><h2 id="tickets-title">Tu entrada,<br /><em>tu experiencia.</em></h2></div><p>Ambas opciones incluyen los 3 días y 2 noches de camping. Valores en pesos argentinos.</p></div>
      <div className={styles.ticketGrid}>{festivalTickets.filter(({ id }) => id === "general" || id === "vip").map((ticket) => {
        const vip = ticket.id === "vip";
        return <article key={ticket.id} className={`${styles.ticket} ${vip ? styles.vip : ""}`}>
          <div className={styles.ticketTop}><h3>{vip ? "VIP" : "General"}</h3><span>{vip ? "SUMÁ LOS TALLERES" : "VIVÍ EL ENCUENTRO"}</span></div>
          <p className={styles.price}>{formatPrice(ticket.price)}<small>ARS / persona</small></p>
          <p className={styles.ticketCopy}>{vip ? "Todo General, seis talleres, Pasaporte y traslado de ida y vuelta incluidos." : "Ceremonias, música y convivencia. Talleres especiales opcionales: $35.000 cada uno."}</p>
          <ul className={styles.quickIncludes}>{(vip ? ["Todo lo incluido en General", "6 experiencias especiales + Pasaporte", "Traslado de ida y vuelta incluido"] : ["Yoga Nidra, gong y ceremonia del sol", "Conciertos, fogatas y celebración", "Meditación y actividades de comunidad"]).map((item) => <li key={item}><Check size={17} aria-hidden="true" />{item}</li>)}</ul>
          <BuyButton label={`Adquirir ${vip ? "VIP" : "General"}`} />
          <details className={styles.ticketDetails}><summary>Ver todo lo que incluye<ChevronDown size={18} aria-hidden="true" /></summary><ul>{(vip ? festivalVipIncludes : festivalGeneralIncludes).map((item) => <li key={item}>{item}</li>)}</ul>{vip && <p>Las propuestas pueden coincidir en horario. La organización confirmará los turnos y la inscripción a cada experiencia.</p>}</details>
        </article>;
      })}</div>
      <div className={styles.purchaseFacts}><p><Check size={19} aria-hidden="true" /><span><strong>Alojamiento incluido.</strong> Carpas comunitarias para mujeres y para hombres, o espacio para tu propia carpa. Traé tus elementos para dormir.</span></p><p><span className={styles.extraMark} aria-hidden="true">+</span><span><strong>Se abonan aparte:</strong> comidas, carpa individual privada y colchón inflable. El transporte solo se abona aparte con General.</span></p></div>
      <div className={styles.reserve}><div><p className={styles.kicker}>RESERVA · PAGO PARCIAL</p><h3>$20.000 <small>ARS</small></h3><p>Es una reserva, no la entrada completa. Confirmación, aplicación al valor final, plazo del saldo y cancelaciones: condiciones próximamente.</p></div><BuyButton label="Adquirir reserva" /></div>
      <details className={styles.groupOffer}><summary><Users size={23} aria-hidden="true" /><span><strong>Vienen 5. Pagan 4.</strong><small>General $532.000 · VIP $1.476.000 ARS por grupo</small></span><ChevronDown size={21} aria-hidden="true" /></summary><div className={styles.disclosureBody}><p>En Fanz, elegí la tarifa grupal 5×4 de General o VIP y seleccioná cinco entradas. Cada grupo corresponde a cinco personas para los tres días del festival.</p><div className={styles.vouchers}>{festivalTickets.filter(({ id }) => id.startsWith("voucher")).map((ticket) => <article key={ticket.id}><h3>{ticket.name}</h3><p>{ticket.description}</p><BuyButton label="Adquirir 5×4" context={ticket.name} secondary /></article>)}</div></div></details>
      <p className={styles.checkoutNote}><Ticket size={18} aria-hidden="true" /><span>Los botones abren Fanz: elegí tu modalidad y cantidad, revisá el pedido y completá la compra. <a href="#informacion">Consultá las condiciones antes de pagar.</a></span></p>
    </section>

    <section id="programa" className={styles.experienceSection} aria-labelledby="program-title"><div className={styles.wrap}>
      <div className={styles.sectionHeading}><div><p className={styles.kicker}>02 / TRES DÍAS, UN ENCUENTRO</p><h2 id="program-title">Conectar. Experimentar.<br /><em>Integrar.</em></h2></div><p>Abrí cada día para ver sus horarios. Elegí tu recorrido y dejá espacio para lo inesperado.</p></div>
      <FestivalProgram />
      <details id="talleres" className={styles.disclosure}><summary><span><strong>Talleres & experiencias</strong><small>6 talleres incluidos en VIP o $35.000 cada uno por separado</small></span><ChevronDown size={21} aria-hidden="true" /></summary><div className={styles.disclosureBody}><div className={styles.workshops}>{festivalWorkshops.map((workshop) => <details key={workshop.id} className={styles.workshop}><summary><span><strong>{workshop.title}</strong><small>{workshop.modality === "vip" ? "INCLUIDO EN VIP" : "INCLUIDO EN GENERAL"} · {workshop.duration}</small></span><ChevronDown size={19} aria-hidden="true" /></summary><div><h3>{workshop.subtitle}</h3>{workshop.modality === "vip" && <p><strong>$35.000 ARS por separado.</strong> Consultá cupos e inscripción con la organización.</p>}<p>{workshop.description}</p><ul>{workshop.activities.map((item) => <li key={item}>{item}</li>)}</ul>{workshop.note && <p className={styles.note}>{workshop.note}</p>}</div></details>)}</div><p className={styles.note}>Comprender → experimentar → integrar → llevar a la vida. Algunas experiencias tienen cupos limitados y pueden requerir inscripción previa.</p><a className={styles.textLink} href={inquiry} target="_blank" rel="noopener noreferrer">Consultar talleres individuales<ArrowUpRight size={17} aria-hidden="true" /></a></div></details>
      <details className={styles.disclosure}><summary><span><strong>Mucho más que talleres</strong><small>Mercado, arte, música, naturaleza y comunidad</small></span><ChevronDown size={21} aria-hidden="true" /></summary><div className={styles.disclosureBody}><p>{festival.description} No necesitás pertenecer a Kiryus, saber meditar ni conocer a nadie antes de llegar.</p><p>El Mercado Autosostenible reúne emprendimientos, productos y proyectos para conocer, comprar, intercambiar contactos y crear alianzas. Habrá propuestas gastronómicas para adquirir alimentos y bebidas.</p><div className={styles.tags}>{festivalAlwaysOn.map((item) => <span key={item}>{item}</span>)}</div></div></details>
      <p className={styles.programNote}>{festival.programNote}</p>

      <div id="protagonistas" className={styles.people}><div className={styles.peopleHeading}><h3>Voces que nos acompañan</h3><p>Primeros artistas confirmados. Seguiremos anunciando la grilla.</p></div>
        <div className={styles.peopleGrid}>{festivalPresenters.map((presenter) => <article key={presenter.id} className={styles.person}><div className={styles.portrait}><Photo image={presenter.image} sizes="120px" /></div><div><p>{presenter.offering}</p><h4>{presenter.name}</h4><small>{presenter.time}</small></div></article>)}<article className={styles.person}><div className={styles.portrait}><Photo image={duoImage} sizes="120px" /></div><div><p>Concierto meditativo</p><h4>Alma Qhana</h4><small>Sábado · Por la noche</small></div></article></div>
        <details className={styles.disclosure}><summary><span><strong>Conocé a Marité, Carlos y Alma Qhana</strong><small>Biografías, música y redes</small></span><ChevronDown size={21} aria-hidden="true" /></summary><div className={`${styles.disclosureBody} ${styles.bioGrid}`}>{festivalPresenters.map((presenter) => <article key={presenter.id}><h3>{presenter.name}</h3><p className={styles.bioRole}>{presenter.role}</p>{presenter.fullBio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<a className={styles.social} href={presenter.instagramUrl} target="_blank" rel="noopener noreferrer"><SocialIcon network="instagram" size={18} />Instagram de {presenter.name}<ArrowUpRight size={16} aria-hidden="true" /></a></article>)}<article><h3>{festivalDuo.name}</h3><p className={styles.bioRole}>{festivalDuo.subtitle}</p><p>{festivalDuo.description}</p>{festivalDuo.detail.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<p>El horario individual del concierto se anunciará con la grilla artística.</p><a className={styles.social} href={festivalDuo.instagramUrl} target="_blank" rel="noopener noreferrer"><SocialIcon network="instagram" size={18} />Instagram de Alma Qhana<ArrowUpRight size={16} aria-hidden="true" /></a><a className={styles.social} href={festivalDuo.spotifyUrl} target="_blank" rel="noopener noreferrer"><Music2 size={18} aria-hidden="true" />Escuchá a Carlos en Spotify<ArrowUpRight size={16} aria-hidden="true" /></a></article></div></details>
      </div>
    </div></section>

    <section id="preparar" className={`${styles.staySection} ${styles.wrap}`} aria-labelledby="stay-title">
      <div className={styles.sectionHeading}><div><p className={styles.kicker}>03 / ORGANIZÁ TU VIAJE</p><h2 id="stay-title">Lo esencial<br /><em>para venir.</em></h2></div><p>Llegada: viernes de 14:00 a 16:00.<br />Cierre: domingo a las 17:00.<br />Aldea Kiryus · Burruyacú · Tucumán.</p></div>
      <div className={styles.stayFacts}><article><Tent size={26} aria-hidden="true" /><h3>Tu lugar para dormir</h3><p>Dos noches en carpa comunitaria o espacio para tu propia carpa, incluidos en ambas entradas.</p></article><article><MapPin size={26} aria-hidden="true" /><h3>Traslado incluido con VIP</h3><p>General: $25.000 ARS por persona, ida y vuelta desde San Miguel de Tucumán. Coordiná tu traslado con la organización.</p></article></div>
      <details id="extras" className={styles.disclosure}><summary><span><strong>Cómo llegar y extras opcionales</strong><small>Transporte, carpa individual y colchón inflable</small></span><ChevronDown size={21} aria-hidden="true" /></summary><div className={styles.disclosureBody}><div className={styles.extraGrid}>{festivalExtras.map((extra) => <article key={extra.id}><h3>{extra.title}</h3><strong>{extra.priceLabel}</strong><p>{extra.description}</p><ul>{extra.details.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div><p>La información específica de acceso se comunicará a los participantes confirmados. Consultá previamente cualquier necesidad de accesibilidad.</p><a className={styles.textLink} href={inquiry} target="_blank" rel="noopener noreferrer">Consultar extras por WhatsApp<ArrowUpRight size={17} aria-hidden="true" /></a><Link className={styles.textLink} href="/aldeas/argentina">Conocer Aldea Kiryus Argentina<ArrowUpRight size={17} aria-hidden="true" /></Link></div></details>
      <details className={styles.disclosure}><summary><span><strong>Qué traer y dónde comer</strong><small>Tu equipaje y las opciones gastronómicas</small></span><ChevronDown size={21} aria-hidden="true" /></summary><div className={styles.disclosureBody}><p><strong>Las comidas se abonan aparte.</strong> Habrá propuestas gastronómicas durante el festival. Consultá previamente opciones de alimentación particulares.</p><ul className={styles.packing}>{festivalPackingList.map((item) => <li key={item}>{item}</li>)}</ul></div></details>
    </section>

    <section id="informacion" className={styles.infoSection} aria-labelledby="info-title"><div className={styles.wrap}>
      <div className={styles.sectionHeading}><div><p className={styles.kicker}>04 / ANTES DE COMPRAR</p><h2 id="info-title">Tus dudas,<br /><em>resueltas.</em></h2></div><p>Consultá lo que necesitás saber para elegir tu entrada y preparar el viaje.</p></div>
      <details className={`${styles.disclosure} ${styles.conditions}`}><summary><span><strong>Información importante antes de comprar</strong><small>Reserva, saldo, cancelaciones, menores y condiciones</small></span><ChevronDown size={21} aria-hidden="true" /></summary><div className={`${styles.disclosureBody} ${styles.answers}`}>{festivalPurchaseConditions.map((condition) => <article key={condition.title}><h3>{condition.title}</h3><p>{condition.description}</p></article>)}</div></details>
      {[{ id: "compra", title: "Entradas y reservas", summary: "Qué incluye cada modalidad y cómo comprar" }, { id: "viaje", title: "Viaje, alojamiento y comidas", summary: "Llegada, camping, alquileres y necesidades particulares" }, { id: "participar", title: "Participar del festival", summary: "Experiencia previa, cupos, talleres y artistas" }].map((group) => <details key={group.id} className={styles.disclosure}><summary><span><strong>{group.title}</strong><small>{group.summary}</small></span><ChevronDown size={21} aria-hidden="true" /></summary><div className={`${styles.disclosureBody} ${styles.answers}`}>{festivalFaqs.filter(({ question }) => faqCategory(question) === group.id).map((faq) => <article key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></article>)}</div></details>)}
      <div className={styles.finalCall}><div><p className={styles.kicker}>NO VENGAS SOLO A IMAGINARLO. VENÍ A VIVIRLO.</p><h3>Nos encontramos en Kiryus.</h3><p>13, 14 y 15 de noviembre · Tucumán</p></div><div><BuyButton /><a className={styles.textLink} href={inquiry} target="_blank" rel="noopener noreferrer">Consultar por WhatsApp<ArrowUpRight size={17} aria-hidden="true" /></a></div></div>
    </div></section>
    <FestivalBookingBar />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema).replace(/</g, "\\u003c") }} />
  </div>;
}
