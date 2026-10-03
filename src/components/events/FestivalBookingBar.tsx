import { ArrowUpRight } from "lucide-react";
import { festival, festivalTickets } from "@/content/festival";
import styles from "./FestivalBookingBar.module.css";

export function FestivalBookingBar() {
  const generalTicket = festivalTickets.find((ticket) => ticket.id === "general");
  const generalPrice = generalTicket?.price.toLocaleString("es-AR");

  return (
    <aside className={styles.bar} aria-label={`Entradas para ${festival.title}`}>
      <div className={styles.information}>
        <strong className={styles.name}>TuConexión 2026</strong>
        <p className={styles.details}>
          <span>13–15 nov</span>
          <span className={styles.separator} aria-hidden="true">·</span>
          {generalPrice && (
            <span className={styles.price}>
              <span className={styles.kind}>General </span>${generalPrice} ARS
            </span>
          )}
        </p>
      </div>
      <a
        className={styles.cta}
        href={festival.ticketUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Adquirir entrada para ${festival.title} (se abre en otra pestaña)`}
      >
        <span>Adquirir entrada</span>
        <ArrowUpRight size={20} aria-hidden="true" />
      </a>
    </aside>
  );
}
