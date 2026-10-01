"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import styles from "./Navigation.module.css";

type Destination = { href: string; label: string; detail?: string };
const villageLinks: Destination[] = [
  { href: "/aldeas/argentina", label: "Argentina", detail: "Tucumán" },
  { href: "/aldeas/colombia", label: "Colombia", detail: "Guatavita" },
  { href: "/aldeas", label: "Todas las aldeas", detail: "Dos territorios, una intención" },
];
const communityLinks: Destination[] = [
  { href: "/vida-en-comunidad", label: "Vida en comunidad", detail: "Lo cotidiano también transforma" },
  { href: "/nosotros", label: "Nuestra historia", detail: "Las raíces de Kiryus" },
  { href: "/red", label: "La red", detail: "Personas que nos conectan" },
  { href: "/legado/espana", label: "Legado de España", detail: "Una parte de nuestra historia" },
];
const exploreLinks: Destination[] = [
  { href: "/", label: "Inicio" },
  { href: "/regeneracion", label: "Regeneración" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];
const desktopCommunityLinks: Destination[] = [
  ...communityLinks,
  { href: "/contacto", label: "Contacto", detail: "Empecemos una conversación" },
];

function Dropdown({ label, items, id, pathname }: { label: string; items: Destination[]; id: string; pathname: string }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const active = items.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const history = () => setOpen(false);
    document.addEventListener("pointerdown", dismiss);
    window.addEventListener("popstate", history);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("popstate", history);
    };
  }, [open]);

  function keyboard(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const key = event.key;
    const links = Array.from(panel.current?.querySelectorAll<HTMLAnchorElement>("a") || []);
    if (key === "Escape" && open) {
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
      button.current?.focus();
      return;
    }
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(key)) return;
    if (event.target === button.current) {
      if (key !== "ArrowDown" && key !== "ArrowUp") return;
      event.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => (key === "ArrowUp" ? links.at(-1) : links[0])?.focus());
      return;
    }
    const index = links.indexOf(event.target as HTMLAnchorElement);
    if (!open || index < 0) return;
    event.preventDefault();
    const next = key === "Home" ? 0 : key === "End" ? links.length - 1 : (index + (key === "ArrowDown" ? 1 : -1) + links.length) % links.length;
    links[next]?.focus();
  }

  return (
    <div ref={root} className={styles.dropdown} onKeyDown={keyboard} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <button ref={button} type="button" className={styles.navLink} data-active={active || undefined} aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        {label}<ChevronDown size={14} aria-hidden="true" className={open ? styles.chevronOpen : undefined} />
      </button>
      <div ref={panel} id={id} className={styles.dropdownPanel} hidden={!open}>
        <p className={styles.dropdownLabel}>{label === "Aldeas" ? "Nuestros territorios" : "Somos comunidad"}</p>
        {items.map((item) => <Link href={item.href} key={item.href} className={styles.dropdownLink} aria-current={pathname === item.href ? "page" : undefined} onClick={() => setOpen(false)}>
          <span><strong>{item.label}</strong>{item.detail && <small>{item.detail}</small>}</span><ArrowUpRight size={17} aria-hidden="true" />
        </Link>)}
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuDialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = menuDialog.current;
    if (!dialog || !menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const returnTarget = menuButton.current;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    closeButton.current?.focus({ preventScroll: true });
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      if (returnTarget?.isConnected) returnTarget.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  useEffect(() => {
    const history = () => {
      menuDialog.current?.close();
      setMenuOpen(false);
    };
    window.addEventListener("popstate", history);
    return () => window.removeEventListener("popstate", history);
  }, []);

  function closeMobile() {
    menuDialog.current?.close();
    setMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link className={styles.brand} href="/" aria-label="Comunidad Kiryus · Inicio">
          <Image src="/images/kiryus-logo.webp" alt="Kiryus" width={124} height={60} className={styles.brandImage} priority />
        </Link>
        <nav className={styles.desktopNav} aria-label="Navegación principal">
          <Dropdown label="Aldeas" items={villageLinks} id="villages-menu" pathname={pathname} />
          <Dropdown label="Comunidad" items={desktopCommunityLinks} id="community-menu" pathname={pathname} />
          <Link className={styles.navLink} href="/regeneracion" aria-current={pathname === "/regeneracion" ? "page" : undefined}>Regeneración</Link>
          <Link className={styles.navLink} href="/blog" aria-current={pathname === "/blog" ? "page" : pathname.startsWith("/blog/") ? "location" : undefined}>Blog</Link>
        </nav>
        <div className={styles.headerActions}>
          <Link className={styles.participate} href="/involucrate" aria-current={pathname === "/involucrate" ? "page" : undefined}>Participar<ArrowUpRight size={17} aria-hidden="true" /></Link>
          <button ref={menuButton} className={styles.menuToggle} type="button" aria-label="Abrir menú" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(true)}><Menu size={23} aria-hidden="true" /></button>
        </div>
      </div>
      <noscript>
        <nav className={styles.fallbackNav} aria-label="Explorar Kiryus sin JavaScript">
          {[
            { href: "/aldeas", label: "Aldeas" },
            { href: "/vida-en-comunidad", label: "Vida en comunidad" },
            { href: "/regeneracion", label: "Regeneración" },
            { href: "/red", label: "La red" },
            { href: "/nosotros", label: "Nuestra historia" },
            { href: "/legado/espana", label: "Legado de España" },
            { href: "/blog", label: "Blog" },
            { href: "/contacto", label: "Contacto" },
            { href: "/involucrate", label: "Participar" },
          ].map((item) => <Link href={item.href} key={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}
        </nav>
      </noscript>
      <dialog ref={menuDialog} id="mobile-navigation" className={styles.mobileDialog} aria-label="Menú de navegación" onClose={() => setMenuOpen(false)} onCancel={(event) => { event.preventDefault(); closeMobile(); }} onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const box = event.currentTarget.getBoundingClientRect();
        if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeMobile();
      }}>
        <div className={styles.mobileSurface}>
          <div className={styles.mobileTop}><span>KIRYUS<span className={styles.mobileTopLabel}>Comunidad</span></span><button ref={closeButton} type="button" aria-label="Cerrar menú" className={styles.mobileClose} onClick={closeMobile}><X size={23} aria-hidden="true" /></button></div>
          <nav className={styles.mobileNav} aria-label="Navegación móvil">
            {[{ label: "Comunidad", items: communityLinks }, { label: "Aldeas", items: villageLinks }, { label: "Explorar", items: exploreLinks }].map((group) => <div key={group.label} className={styles.mobileGroup}>
              <h2>{group.label}</h2>
              {group.items.map((item) => <Link href={item.href} key={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={closeMobile}>{item.label}<ArrowUpRight size={15} aria-hidden="true" /></Link>)}
            </div>)}
          </nav>
          <div className={styles.mobileBottom}><Link className={styles.mobileCta} href="/involucrate" onClick={closeMobile}>Encuentra tu forma de participar<ArrowUpRight size={19} aria-hidden="true" /></Link><p>Dos territorios. Muchas formas de encontrarnos.</p></div>
        </div>
      </dialog>
    </header>
  );
}
