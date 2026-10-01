"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
const countries = [
  { href: "/aldeas", text: "Explorar las aldeas" },
  { href: "/aldeas/argentina", text: "Argentina · Tucumán" },
  { href: "/aldeas/colombia", text: "Colombia · Guatavita" },
  { href: "/aldeas/espana", text: "España · Murcia" },
];
export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [villagesOpen, setVillagesOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const desktopButton = useRef<HTMLButtonElement>(null);
  const menuDialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);
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
      if (returnTarget?.isConnected)
        returnTarget.focus({ preventScroll: true });
    };
  }, [menuOpen]);
  useEffect(() => {
    if (!villagesOpen) return;
    const close = (event: PointerEvent) => {
      if (!dropdown.current?.contains(event.target as Node))
        setVillagesOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [villagesOpen]);
  useEffect(() => {
    const closeOnHistory = () => {
      menuDialog.current?.close();
      setMenuOpen(false);
      setVillagesOpen(false);
    };
    window.addEventListener("popstate", closeOnHistory);
    return () => window.removeEventListener("popstate", closeOnHistory);
  }, []);
  const closeMobile = () => {
    menuDialog.current?.close();
    setMenuOpen(false);
    menuButton.current?.focus({ preventScroll: true });
  };
  function handleDropdownKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const links = Array.from(
      dropdown.current?.querySelectorAll<HTMLAnchorElement>(
        ".dropdown-panel a",
      ) || [],
    );
    if (event.key === "Escape" && villagesOpen) {
      event.preventDefault();
      event.stopPropagation();
      setVillagesOpen(false);
      desktopButton.current?.focus();
      return;
    }
    if (
      event.key !== "ArrowDown" &&
      event.key !== "ArrowUp" &&
      event.key !== "Home" &&
      event.key !== "End"
    )
      return;
    if (event.target === desktopButton.current) {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      event.preventDefault();
      setVillagesOpen(true);
      requestAnimationFrame(() =>
        (event.key === "ArrowUp" ? links.at(-1) : links[0])?.focus(),
      );
      return;
    }
    const index = links.indexOf(event.target as HTMLAnchorElement);
    if (!villagesOpen || index < 0) return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? links.length - 1
          : (index + (event.key === "ArrowDown" ? 1 : -1) + links.length) %
            links.length;
    links[next]?.focus();
  }
  return (
    <header className="site-header">
      <div className="header-inner container">
        <Link className="brand" href="/" aria-label="Comunidad Kiryus · Inicio">
          <Image
            src="/images/kiryus-logo.webp"
            alt="Kiryus"
            width={156}
            height={75}
            className="brand-image"
            priority
          />
        </Link>
        <nav className="desktop-nav" aria-label="Navegación principal">
          <Link
            href="/nosotros"
            aria-current={pathname === "/nosotros" ? "page" : undefined}
          >
            Nosotros
          </Link>
          <div
            className="nav-dropdown"
            ref={dropdown}
            onKeyDown={handleDropdownKey}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setVillagesOpen(false);
            }}
          >
            <button
              type="button"
              ref={desktopButton}
              aria-expanded={villagesOpen}
              aria-controls="villages-menu"
              onClick={() => setVillagesOpen(!villagesOpen)}
              className={pathname.startsWith("/aldeas") ? "nav-active" : ""}
            >
              Aldeas <ChevronDown size={14} aria-hidden="true" />
            </button>
            <div
              className="dropdown-panel"
              id="villages-menu"
              hidden={!villagesOpen}
            >
              {countries.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={() => setVillagesOpen(false)}
                >
                  {item.text}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/involucrate"
            aria-current={pathname === "/involucrate" ? "page" : undefined}
          >
            Involúcrate
          </Link>
          <Link
            href="/blog"
            aria-current={pathname.startsWith("/blog") ? "page" : undefined}
          >
            Blog
          </Link>
        </nav>
        <Link href="/contacto" className="header-connect">
          Conectar con Kiryus <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <button
          type="button"
          ref={menuButton}
          className="menu-toggle"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => {
            setVillagesOpen(false);
            setMenuOpen(true);
          }}
        >
          <Menu size={26} aria-hidden="true" />
        </button>
      </div>
      <dialog
        ref={menuDialog}
        id="mobile-navigation"
        className="mobile-menu"
        aria-label="Menú de navegación"
        aria-modal="true"
        onClose={() => setMenuOpen(false)}
        onCancel={(event) => {
          event.preventDefault();
          closeMobile();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMobile();
        }}
      >
        <div className="mobile-menu-top">
          <span>Comunidad Kiryus</span>
          <button
            type="button"
            ref={closeButton}
            autoFocus
            aria-label="Cerrar menú"
            onClick={closeMobile}
          >
            <X size={26} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Navegación móvil">
          <Link
            href="/"
            onClick={closeMobile}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            Inicio
          </Link>
          <Link
            href="/nosotros"
            onClick={closeMobile}
            aria-current={pathname === "/nosotros" ? "page" : undefined}
          >
            Nosotros
          </Link>
          <Link
            href="/aldeas"
            onClick={closeMobile}
            aria-current={pathname === "/aldeas" ? "page" : undefined}
          >
            Nuestras aldeas
          </Link>
          <div className="mobile-country-links">
            {countries.slice(1).map((item) => (
              <Link
                href={item.href}
                key={item.href}
                onClick={closeMobile}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.text}
              </Link>
            ))}
          </div>
          <Link
            href="/involucrate"
            onClick={closeMobile}
            aria-current={pathname === "/involucrate" ? "page" : undefined}
          >
            Involúcrate
          </Link>
          <Link
            href="/blog"
            onClick={closeMobile}
            aria-current={pathname.startsWith("/blog") ? "page" : undefined}
          >
            Blog
          </Link>
          <Link
            href="/contacto"
            onClick={closeMobile}
            aria-current={pathname === "/contacto" ? "page" : undefined}
          >
            Conectar con Kiryus <ArrowUpRight size={22} aria-hidden="true" />
          </Link>
        </nav>
        <p>Personas y territorios que se encuentran.</p>
      </dialog>
    </header>
  );
}
