import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Bed, Check, ChevronDown, MapPin, Music2, Tent, Ticket, Users } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { FestivalProgram } from "@/components/events/FestivalProgram";
import { FestivalBookingBar } from "@/components/events/FestivalBookingBar";
import { festival, festivalAlwaysOn, festivalExtras, festivalFaqs, festivalIncludes, festivalPackingList, festivalPurchaseConditions, festivalRoomPackingList, festivalTickets, festivalWorkshops } from "@/content/festival";
import { festivalDuo, festivalPresenters } from "@/content/festival-presenters";
import { enhancedDawn } from "@/content/enhanced-images";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/config";
import styles from "./Evento.module.css";

const description = "TuConexión 2026: 14 y 15 de noviembre en Aldea Kiryus, Tucumán. Dos días y una noche, con todas las experiencias y comidas. Camping o habitación compartida.";
const baseMetadata = pageMetadata("Festival TuConexión 2026 · Entradas y programa", description, "/evento");
export const metadata: Metadata = { ...baseMetadata, openGraph: { ...baseMetadata.openGraph, locale: "es_AR" } };
const formatPrice = (price: number) => `$${new Intl.NumberFormat("es-AR").format(price)}`;
const inquiry = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hola, Comunidad Kiryus. Quiero consultar sobre TuConexión 2026, Camping, Habitación compartida y transporte opcional.")}`;
const duoImage = { src: "/images/evento/alma-qhana.webp", alt: "Marité y Carlos Sat Nam en un concierto de Alma Qhana", width: 2450, height: 1634, position: "50% 80%" };

function BuyButton({ label = "Adquirir entrada", context }: { label?: string; context?: string }) {
  return <a href={festival.ticketUrl} target="_blank" rel="noopener noreferrer" className={styles.button} aria-label={`${label}${context ? ` · ${context}` : ""} (abre Fanz en otra pestaña)`}>{label}<ArrowUpRight size={20} aria-hidden="true" /></a>;
}

export default function FestivalPage() {
  const eventSchema = {
    "@context": "https://schema.org", "@type": "Festival", name: festival.title, description,
    url: `${siteConfig.url}/evento`, startDate: festival.startDate, endDate: festival.endDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "Place", name: "Aldea Kiryus", address: { "@type": "PostalAddress", addressLocality: "Burruyacú", addressRegion: "Tucumán", addressCountry: "AR" } },
    organizer: { "@type": "Organization", name: "Comunidad Kiryus", url: siteConfig.url },
    offers: festivalTickets.map(({ name, price }) => ({ "@type": "Offer", name, price, priceCurrency: "ARS", url: festival.ticketUrl })),
    performer: [
      ...festivalPresenters.map(({ name, instagramUrl }) => ({ "@type": "Person", name, ...(instagramUrl ? { sameAs: instagramUrl } : {}) })),
      { "@type": "MusicGroup", name: festivalDuo.name, sameAs: festivalDuo.instagramUrl },
    ],
  };
  return <div className={styles.page} data-festival-page>
    <section className={styles.hero} aria-labelledby="festival-title"><div className={styles.wrap}>
      <div className={styles.heroTop}><Link href="/">Comunidad Kiryus / Argentina</Link><span>EVENTO · CUARTA EDICIÓN</span></div>
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>{festival.dateLabel.toLocaleUpperCase("es-AR")}</p>
          <h1 id="festival-title">Festival<br /><em>TuConexión</em><span>2026</span></h1>
          <p className={styles.heroLead}>Dos días y una noche para encontrarnos, crear juntos y dejar nuestra huella.</p>
          <p className={styles.location}><MapPin size={18} aria-hidden="true" />{festival.location}</p>
          <div className={styles.heroActions}><BuyButton /><a href="#entradas" className={styles.textLink}>Ver precios y opciones<ArrowDown size={17} aria-hidden="true" /></a></div>
          <p className={styles.buyHint}>Elegí en Fanz dónde dormir: Camping o Habitación compartida.</p>
          <p className={styles.heroPrices}>{festivalTickets.map((ticket) => <span key={ticket.id}>{ticket.id === "habitacion" ? "Habitación" : ticket.name} <strong>{formatPrice(ticket.price)}</strong></span>)}<small>ARS por persona</small></p>
        </div>
        <div className={styles.heroVisual}>
          <Photo image={enhancedDawn} priority quality={85} sizes="(max-width: 760px) 100vw, 45vw" />
          <div className={styles.photoShade} /><span className={styles.photoLabel}>{festival.theme.toLocaleUpperCase("es-AR")}</span>
          <p className={styles.photoCaption}>Todos unidos<br /><em>por un mismo propósito.</em></p><span className={styles.edition}>04<small>EDICIÓN</small></span>
        </div>
      </div>
      <div className={styles.heroFacts}><span><Tent size={19} aria-hidden="true" />{festival.stayLabel}</span><span><Check size={19} aria-hidden="true" />Experiencias y comidas incluidas</span><span><Users size={19} aria-hidden="true" />Sin experiencia previa</span></div>
    </div></section>

    <nav className={styles.sectionNav} aria-label="Secciones del evento"><div className={styles.wrap}><a href="#entradas">Entradas</a><a href="#programa">Programa</a><a href="#protagonistas">Expositores</a><a href="#preparar">Tu estadía</a><a href="#informacion">Dudas</a></div></nav>

    <section id="entradas" className={`${styles.ticketsSection} ${styles.wrap}`} aria-labelledby="tickets-title">
      <div className={styles.sectionHeading}><div><p className={styles.kicker}>01 / ELEGÍ DÓNDE DORMIR</p><h2 id="tickets-title">Una experiencia.<br /><em>Dos modalidades.</em></h2></div><p>Los dos días, todas las actividades y las comidas previstas están incluidos. Solo cambia dónde pasás la noche. Valores en ARS por persona.</p></div>
      <div className={styles.ticketGrid}>{festivalTickets.map((ticket) => {
        const room = ticket.id === "habitacion";
        return <article key={ticket.id} className={`${styles.ticket} ${room ? styles.room : ""}`}>
          <div className={styles.ticketTop}><h3>{ticket.name}</h3><span>{room ? "ALOJAMIENTO COMUNITARIO" : "TRAÉ TU PROPIA CARPA"}</span></div>
          <p className={styles.price}>{formatPrice(ticket.price)}<small>ARS / persona</small></p>
          <p className={styles.ticketCopy}>{ticket.description}</p>
          <ul className={styles.quickIncludes}>{["Todas las experiencias y comidas previstas", room ? "Una noche en habitación compartida" : "Espacio para tu carpa · Una noche", room ? "Habitación no privada" : "Traé tu carpa y equipo completo"].map((item) => <li key={item}><Check size={17} aria-hidden="true" />{item}</li>)}</ul>
          <BuyButton label={room ? "Adquirir con habitación" : "Adquirir Camping"} context={ticket.name} />
          <p className={styles.ticketNote}>{ticket.note}</p>
          <details className={styles.ticketDetails}><summary>Qué incluye esta modalidad<ChevronDown size={18} aria-hidden="true" /></summary><ul>{ticket.includes.map((item) => <li key={item}>{item}</li>)}</ul><p><strong>No incluye:</strong> {ticket.notIncluded.join(" ")}</p></details>
        </article>;
      })}</div>
      <div className={styles.purchaseFacts}><p><Check size={19} aria-hidden="true" /><span><strong>El festival se vive completo.</strong> Sábado desde las 09:00 hasta el domingo a las 17:00. Todas las experiencias y comidas previstas, en ambas modalidades.</span></p><p><span className={styles.extraMark} aria-hidden="true">+</span><span><strong>Transporte opcional:</strong> $25.000 ARS por persona, ida y vuelta. No está incluido en ninguna modalidad.</span></p></div>
      <details className={styles.disclosure}><summary><span><strong>Todo lo que vas a vivir</strong><small>El programa completo está incluido en tu entrada</small></span><ChevronDown size={21} aria-hidden="true" /></summary><div className={styles.disclosureBody}><ul>{festivalIncludes.map((item) => <li key={item}>{item}</li>)}</ul></div></details>
      <p className={styles.checkoutNote}><Ticket size={18} aria-hidden="true" /><span>Los botones abren Fanz: elegí tu modalidad, revisá el pedido y completá la compra. <a href="#informacion">Consultá las condiciones antes de pagar.</a></span></p>
    </section>

    <section id="programa" className={styles.experienceSection} aria-labelledby="program-title"><div className={styles.wrap}>
      <div className={styles.sectionHeading}><div><p className={styles.kicker}>02 / DOS DÍAS, UN RECORRIDO</p><h2 id="program-title">Soltar. Encontrarnos.<br /><em>Crear juntos.</em></h2></div><p>Del yo al otro, del otro al nosotros. Naturaleza, experiencias, música y una obra que quedará en Kiryus.</p></div>
      <details className={styles.disclosure}><summary><span><strong>Programa completo · Sábado y domingo</strong><small>Elegí el día y abrí cada actividad para conocerla</small></span><ChevronDown size={21} aria-hidden="true" /></summary><div className={styles.disclosureBody}><FestivalProgram /></div></details>
      <details id="talleres" className={styles.disclosure}><summary><span><strong>Las experiencias</strong><small>Todo el recorrido está incluido en ambas modalidades</small></span><ChevronDown size={21} aria-hidden="true" /></summary><div className={styles.disclosureBody}><div className={styles.workshops}>{festivalWorkshops.map((workshop) => <details key={workshop.id} className={styles.workshop}><summary><span><strong>{workshop.title}</strong><small>{workshop.time} · INCLUIDA</small></span><ChevronDown size={19} aria-hidden="true" /></summary><div><h3>{workshop.subtitle}</h3><p>{workshop.description}</p>{workshop.note && <p className={styles.note}>{workshop.note}</p>}</div></details>)}</div></div></details>
      <details className={styles.disclosure}><summary><span><strong>El viaje TuConexión</strong><small>Llegar · Soltar · Encontrarnos · Celebrar · Crear · Elegir</small></span><ChevronDown size={21} aria-hidden="true" /></summary><div className={styles.disclosureBody}><p>{festival.description} No necesitás pertenecer a Kiryus, saber yoga, bailar ni conocer a nadie antes de llegar.</p><p>YO → OTRO → NOSOTROS → CREACIÓN → COMPROMISO</p><div className={styles.tags}>{festivalAlwaysOn.map((item) => <span key={item}>{item}</span>)}</div></div></details>
      <p className={styles.programNote}>{festival.programNote}</p>

      <div id="protagonistas" className={styles.people}><div className={styles.peopleHeading}><h3>Quienes nos acompañan</h3><p>Presencia, música y caminos compartidos.</p></div>
        <div className={styles.peopleGrid}>
          {festivalPresenters.map((presenter) => <article key={presenter.id} className={styles.person}>
            <div className={styles.portrait}><Photo image={presenter.image} sizes="120px" /></div>
            <div><p>{presenter.offering ?? presenter.role}</p><h4>{presenter.name}</h4><small>{presenter.time ?? presenter.shortBio}</small></div>
          </article>)}
          <article className={styles.person}><div className={styles.portrait}><Photo image={duoImage} sizes="120px" /></div><div><p>Concierto meditativo</p><h4>Alma Qhana</h4><small>{festivalDuo.time}</small></div></article>
        </div>
        <details className={styles.disclosure}>
          <summary><span><strong>Conocé a quienes nos acompañan</strong><small>Biografías, música y redes</small></span><ChevronDown size={21} aria-hidden="true" /></summary>
          <div className={`${styles.disclosureBody} ${styles.bioGrid}`}>
            {festivalPresenters.map((presenter) => <article key={presenter.id}>
              <h3>{presenter.name}</h3><p className={styles.bioRole}>{presenter.role}</p>
              {presenter.fullBio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {presenter.instagramUrl && <a className={styles.social} href={presenter.instagramUrl} target="_blank" rel="noopener noreferrer"><SocialIcon network="instagram" size={18} />Instagram de {presenter.name}<ArrowUpRight size={16} aria-hidden="true" /></a>}
            </article>)}
            <article><h3>{festivalDuo.name}</h3><p className={styles.bioRole}>{festivalDuo.subtitle}</p><p>{festivalDuo.description}</p>{festivalDuo.detail.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<p>{festivalDuo.time} · Concierto meditativo.</p><a className={styles.social} href={festivalDuo.instagramUrl} target="_blank" rel="noopener noreferrer"><SocialIcon network="instagram" size={18} />Instagram de Alma Qhana<ArrowUpRight size={16} aria-hidden="true" /></a><a className={styles.social} href={festivalDuo.spotifyUrl} target="_blank" rel="noopener noreferrer"><Music2 size={18} aria-hidden="true" />Escuchá a Carlos en Spotify<ArrowUpRight size={16} aria-hidden="true" /></a></article>
          </div>
        </details>
      </div>
    </div></section>

    <section id="preparar" className={`${styles.staySection} ${styles.wrap}`} aria-labelledby="stay-title">
      <div className={styles.sectionHeading}><div><p className={styles.kicker}>03 / ORGANIZÁ TU VIAJE</p><h2 id="stay-title">Una noche.<br /><em>Tu forma de habitarla.</em></h2></div><p>Llegada: sábado a las 09:00.<br />Cierre: domingo a las 17:00.<br />{festival.location}.</p></div>
      <div className={styles.stayFacts}><article><Bed size={26} aria-hidden="true" /><h3>Elegís dónde dormir</h3><p>Camping con tu propia carpa y equipo, o una noche en habitación comunitaria compartida. El programa y las comidas son los mismos.</p></article><article><MapPin size={26} aria-hidden="true" /><h3>Transporte opcional · $25.000 ARS</h3><p>Por persona, ida y vuelta entre San Miguel de Tucumán y Kiryus. Se contrata aparte, con reserva previa, en ambas modalidades.</p></article></div>
      <details id="extras" className={styles.disclosure}><summary><span><strong>Cómo llegar y contratar el traslado</strong><small>Servicio adicional de ida y vuelta</small></span><ChevronDown size={21} aria-hidden="true" /></summary><div className={styles.disclosureBody}><div className={styles.extraGrid}>{festivalExtras.map((extra) => <article key={extra.id}><h3>{extra.title}</h3><strong>{extra.priceLabel}</strong><p>{extra.description}</p><ul>{extra.details.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div><p>Consultá previamente cualquier necesidad de accesibilidad con la organización.</p><a className={styles.textLink} href={inquiry} target="_blank" rel="noopener noreferrer">Consultar transporte por WhatsApp<ArrowUpRight size={17} aria-hidden="true" /></a><Link className={styles.textLink} href="/aldeas/argentina">Conocer Aldea Kiryus Argentina<ArrowUpRight size={17} aria-hidden="true" /></Link></div></details>
      <details className={styles.disclosure}><summary><span><strong>Qué traer según tu modalidad</strong><small>Tu equipo de camping o lo esencial para la habitación</small></span><ChevronDown size={21} aria-hidden="true" /></summary><div className={styles.disclosureBody}><h3>Si elegís Camping</h3><ul className={styles.packing}>{festivalPackingList.map((item) => <li key={item}>{item}</li>)}</ul><h3>Si dormís en habitación</h3><ul className={styles.packing}>{festivalRoomPackingList.map((item) => <li key={item}>{item}</li>)}</ul></div></details>
      <details className={styles.disclosure}><summary><span><strong>Comidas incluidas</strong><small>Informá previamente alergias o necesidades alimentarias</small></span><ChevronDown size={21} aria-hidden="true" /></summary><div className={styles.disclosureBody}><p>Las comidas previstas durante el festival están incluidas tanto en Camping como en Habitación compartida. Si tenés alergias, intolerancias o necesidades específicas, informalas con anticipación para consultar qué alternativas pueden contemplarse.</p></div></details>
    </section>

    <section id="informacion" className={styles.infoSection} aria-labelledby="info-title"><div className={styles.wrap}>
      <div className={styles.sectionHeading}><div><p className={styles.kicker}>04 / ANTES DE COMPRAR</p><h2 id="info-title">Tus dudas,<br /><em>resueltas.</em></h2></div><p>Elegí dónde dormir y preparate para vivir el encuentro completo.</p></div>
      <details className={`${styles.disclosure} ${styles.conditions}`}><summary><span><strong>Información importante antes de comprar</strong><small>Alojamiento, comidas, transporte y participación</small></span><ChevronDown size={21} aria-hidden="true" /></summary><div className={`${styles.disclosureBody} ${styles.answers}`}>{festivalPurchaseConditions.map((condition) => <article key={condition.title}><h3>{condition.title}</h3><p>{condition.description}</p></article>)}</div></details>
      {[{ id: "compra", title: "Entradas y modalidades", summary: "Qué incluye cada opción y cómo comprar" }, { id: "viaje", title: "Viaje, alojamiento y comidas", summary: "Camping, habitación compartida y traslado" }, { id: "participar", title: "Participar del festival", summary: "Experiencia previa, actividades y artistas" }].map((group) => <details key={group.id} className={styles.disclosure}><summary><span><strong>{group.title}</strong><small>{group.summary}</small></span><ChevronDown size={21} aria-hidden="true" /></summary><div className={`${styles.disclosureBody} ${styles.answers}`}>{festivalFaqs.filter(({ category }) => category === group.id).map((faq) => <article key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></article>)}</div></details>)}
      <div className={styles.finalCall}><div><p className={styles.kicker}>DOS DÍAS. UNA NOCHE. UNA HUELLA.</p><h3>Nos encontramos en Kiryus.</h3><p>{festival.shortDateLabel} · Tucumán</p></div><div><BuyButton /><a className={styles.textLink} href={inquiry} target="_blank" rel="noopener noreferrer">Consultar por WhatsApp<ArrowUpRight size={17} aria-hidden="true" /></a></div></div>
    </div></section>
    <FestivalBookingBar />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema).replace(/</g, "\\u003c") }} />
  </div>;
}
