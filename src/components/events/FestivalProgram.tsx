import { ArrowDown, Clock3 } from "lucide-react";
import { festivalDays } from "@/content/festival";
import styles from "./FestivalProgram.module.css";

export function FestivalProgram() {
  return <div className={styles.program}>
    {festivalDays.map((day, index) => <details key={day.id} name="festival-day" className={styles.day}>
      <summary>
        <span className={styles.date}>{13 + index}<small>NOV</small></span>
        <span className={styles.dayTitle}><span>{day.day}</span><strong>{day.verb}</strong><small>{day.summary}</small></span>
        <span className={styles.toggle}><ArrowDown size={22} aria-hidden="true" /></span>
      </summary>
      <div className={styles.timeline}>
        <p className={styles.dayLabel}>{day.day} · {day.date} de 2026</p>
        <ol>{day.items.map((item, itemIndex) => <li key={`${day.id}-${itemIndex}`}>
          <div className={styles.time}><Clock3 size={13} aria-hidden="true" /><span>{item.time}</span></div>
          <div className={styles.activity}><h3>{item.title}</h3><p>{item.description}</p>{item.highlights && <ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}</div>
        </li>)}</ol>
      </div>
    </details>)}
  </div>;
}
