"use client";

import { useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { ChevronDown, Clock3 } from "lucide-react";
import { festivalDays } from "@/content/festival";
import styles from "./FestivalProgram.module.css";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function FestivalProgram() {
  const id = useId();
  const interactive = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function changeTab(index: number) {
    setSelected(index);
    tabs.current[index]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % festivalDays.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + festivalDays.length) % festivalDays.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = festivalDays.length - 1;
    else return;
    event.preventDefault();
    changeTab(next);
  }

  return <div className={styles.program}>
    <div role="tablist" aria-label="Días del programa" className={styles.tabs} hidden={!interactive}>
      {festivalDays.map((day, index) => <button
        key={day.id}
        ref={(node) => { tabs.current[index] = node; }}
        type="button"
        role="tab"
        id={`${id}-tab-${day.id}`}
        aria-controls={`${id}-panel-${day.id}`}
        aria-selected={selected === index}
        tabIndex={selected === index ? 0 : -1}
        className={styles.tab}
        onClick={() => setSelected(index)}
        onKeyDown={(event) => onKeyDown(event, index)}
      ><span>{day.day}</span><strong>{day.number} NOV</strong></button>)}
    </div>
    {festivalDays.map((day, index) => <section
      key={day.id}
      role={interactive ? "tabpanel" : "region"}
      id={`${id}-panel-${day.id}`}
      aria-labelledby={interactive ? `${id}-tab-${day.id}` : `${id}-heading-${day.id}`}
      hidden={interactive && selected !== index}
      tabIndex={0}
      className={styles.panel}
    >
      <div className={styles.dayHeading}><h3 id={`${id}-heading-${day.id}`}>{day.day} {day.number} · {day.verb}</h3><p>{day.summary}</p></div>
      <ol className={styles.timeline}>{day.items.map((item, itemIndex) => <li key={`${day.id}-${itemIndex}`}>
        <div className={styles.time}><Clock3 size={13} aria-hidden="true" /><time dateTime={`${day.isoDate}T${item.time}:00-03:00`}>{item.time}</time></div>
        <details className={styles.activity}>
          <summary><h4>{item.title}</h4><ChevronDown size={17} aria-hidden="true" /></summary>
          <p>{item.description}</p>
        </details>
      </li>)}</ol>
    </section>)}
  </div>;
}
