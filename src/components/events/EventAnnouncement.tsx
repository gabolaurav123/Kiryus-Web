"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef } from "react";
import { ArrowUpRight, CalendarDays, MapPin, X } from "lucide-react";
import styles from "./EventAnnouncement.module.css";

function excludedPath(pathname: string) {
  return pathname === "/evento" || pathname.startsWith("/evento/") || pathname === "/admin" || pathname.startsWith("/admin/");
}

export function EventAnnouncement() {
  const pathname = usePathname();
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const eventLink = useRef<HTMLAnchorElement>(null);
  const previousPath = useRef<string | null>(null);
  const dismissed = useRef(false);
  const opening = useRef<{ overflow: string; focus: HTMLElement | null } | null>(null);

  const release = useCallback((restoreFocus: boolean) => {
    const saved = opening.current;
    if (!saved) return;
    opening.current = null;
    // Never release another modal's scroll lock or move focus outside it.
    const anotherDialog = document.querySelector("dialog[open]");
    if (!anotherDialog && document.body.style.overflow === "hidden") document.body.style.overflow = saved.overflow;
    if (restoreFocus && !anotherDialog && saved.focus?.isConnected) saved.focus.focus({ preventScroll: true });
  }, []);

  const closeDialog = useCallback((restoreFocus = true) => {
    if (dialog.current?.open) dialog.current.close();
    release(restoreFocus);
  }, [release]);

  function dismiss() {
    dismissed.current = true;
    closeDialog();
  }

  useEffect(() => {
    const previous = previousPath.current;
    previousPath.current = pathname;
    if (excludedPath(pathname)) {
      dismissed.current = true;
      closeDialog(false);
      return;
    }
    if (pathname === "/" && previous !== null && previous !== "/") dismissed.current = false;
    if (dismissed.current) return;

    let frame = 0;
    const modal = dialog.current;
    if (!modal) return;
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(present);
    });

    function present() {
      if (!modal || dismissed.current || modal.open) return;
      // A menu or gallery may still be finishing its close after navigation.
      if (document.querySelector("dialog[open]")) return;
      const active = document.activeElement;
      opening.current = {
        overflow: document.body.style.overflow,
        focus: active instanceof HTMLElement && active !== document.body ? active : document.getElementById("contenido"),
      };
      modal.showModal();
      document.body.style.overflow = "hidden";
      eventLink.current?.focus({ preventScroll: true });
      observer.disconnect();
    }

    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["open"], childList: true });
    frame = requestAnimationFrame(present);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      // Do not mark dismissed during cleanup: Strict Mode can run setup again.
      closeDialog(false);
    };
  }, [pathname, closeDialog]);

  if (excludedPath(pathname)) return null;

  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
      onClose={() => { if (!dialog.current?.open) release(true); }}
      onCancel={(event) => { event.preventDefault(); dismiss(); }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const box = event.currentTarget.getBoundingClientRect();
        if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dismiss();
      }}
    >
      <div className={styles.surface}>
        <div className={styles.poster} aria-hidden="true">
          <span className={styles.posterLabel}>KIRYUS / TUCONEXIÓN</span>
          <div className={styles.posterTitle}>Nueva<br /><em>Humanidad.</em></div>
          <svg className={styles.waves} viewBox="0 0 340 300" fill="none" focusable="false">
            <g stroke="currentColor" strokeWidth="1.2">
              {[0, 18, 36, 54, 72, 90, 108].map((offset) => <path key={offset} d={`M-30 ${140 + offset}C58 ${-60 + offset} 143 ${360 + offset} 232 ${120 + offset}S359 ${-10 + offset} 380 ${150 + offset}`} />)}
            </g>
          </svg>
          <div className={styles.posterFooter}><span>13 / 14 / 15 NOV</span><strong>2026</strong></div>
        </div>
        <div className={styles.copy}>
          <button type="button" className={styles.close} aria-label="Cerrar anuncio del evento" onClick={dismiss}><X size={22} aria-hidden="true" /></button>
          <p className={styles.eyebrow}><span /> EVENTO</p>
          <h2 id={`${id}-title`}>Festival<br /><span>TuConexión</span><br />2026</h2>
          <p className={styles.edition}>Cuarta edición · Nueva Humanidad</p>
          <div className={styles.details}>
            <p><CalendarDays size={18} aria-hidden="true" /><span>13, 14 y 15 de noviembre de 2026</span></p>
            <p><MapPin size={18} aria-hidden="true" /><span>Aldea Kiryus · Burruyacú, Tucumán</span></p>
          </div>
          <p id={`${id}-description`} className={styles.description}>Tres días en la naturaleza para encontrarnos, aprender y compartir arte, música y vida en comunidad.</p>
          <Link ref={eventLink} className={styles.cta} href="/evento" onClick={() => { dismissed.current = true; closeDialog(false); }}>Ver evento<ArrowUpRight size={20} aria-hidden="true" /></Link>
          <button type="button" className={styles.continue} onClick={dismiss}>Seguir explorando Kiryus</button>
        </div>
      </div>
    </dialog>
  );
}
