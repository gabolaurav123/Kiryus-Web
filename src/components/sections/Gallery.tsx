"use client";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import type { DocumentaryImage } from "@/content/villages";
export function Gallery({
  images,
  compact = false,
}: {
  images: DocumentaryImage[];
  compact?: boolean;
}) {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const id = useId();
  const activeIndex =
    active === null || images.length === 0 ? null : active % images.length;
  const selected = activeIndex === null ? null : images[activeIndex];
  const isOpen = Boolean(selected);
  useEffect(() => {
    const modal = dialog.current;
    if (!modal || !isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const returnTarget = opener.current;
    const returnGrid = grid.current;
    if (!modal.open) modal.showModal();
    document.body.style.overflow = "hidden";
    closeButton.current?.focus({ preventScroll: true });
    return () => {
      if (modal.open) modal.close();
      document.body.style.overflow = previousOverflow;
      if (returnTarget?.isConnected)
        returnTarget.focus({ preventScroll: true });
      else if (returnGrid?.isConnected)
        returnGrid.focus({ preventScroll: true });
    };
  }, [isOpen]);
  function close() {
    dialog.current?.close();
    setActive(null);
    if (opener.current?.isConnected)
      opener.current.focus({ preventScroll: true });
    else grid.current?.focus({ preventScroll: true });
  }
  function step(direction: number) {
    setActive((previous) =>
      previous === null
        ? null
        : (previous + direction + images.length) % images.length,
    );
  }
  return (
    <>
      <div
        ref={grid}
        tabIndex={-1}
        className={`gallery-grid ${compact ? "gallery-compact" : ""}`}
      >
        {images.map((image, index) => (
          <button
            type="button"
            key={`${image.src}-${index}`}
            className={`gallery-item gallery-item-${index + 1}`}
            onClick={(event) => {
              opener.current = event.currentTarget;
              setActive(index);
            }}
            aria-label={`Ampliar fotografía: ${image.alt}`}
            aria-haspopup="dialog"
            aria-controls={`${id}-gallery-dialog`}
          >
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              sizes="(max-width: 700px) 50vw, 33vw"
              style={{ objectPosition: image.position || "center" }}
            />
            <span>
              <Maximize2 size={19} aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        id={`${id}-gallery-dialog`}
        className="gallery-dialog"
        aria-label="Galería de fotografías"
        aria-modal="true"
        aria-describedby={`${id}-gallery-help`}
        onClose={() => setActive(null)}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (
            event.altKey ||
            event.ctrlKey ||
            event.metaKey ||
            images.length < 2
          )
            return;
          if (
            event.key === "ArrowLeft" ||
            event.key === "ArrowRight" ||
            event.key === "Home" ||
            event.key === "End"
          ) {
            event.preventDefault();
            event.stopPropagation();
            if (event.key === "ArrowLeft") step(-1);
            else if (event.key === "ArrowRight") step(1);
            else setActive(event.key === "Home" ? 0 : images.length - 1);
          }
        }}
      >
        <p className="sr-only" id={`${id}-gallery-help`}>
          Pulsa Escape para cerrar.{" "}
          {images.length > 1 &&
            "Usa las flechas izquierda y derecha para cambiar de fotografía."}
        </p>
        <button
          type="button"
          ref={closeButton}
          className="gallery-close"
          onClick={close}
          aria-label="Cerrar fotografía"
          autoFocus
        >
          <X size={26} aria-hidden="true" />
        </button>
        {selected && (
          <div className="gallery-dialog-content">
            <Image
              src={selected.src}
              width={selected.width}
              height={selected.height}
              alt={selected.alt}
              sizes="90vw"
            />
            <div
              className="gallery-dialog-footer"
              aria-live="polite"
              aria-atomic="true"
            >
              <p>{selected.alt}</p>
              <span>
                {(activeIndex ?? 0) + 1} / {images.length}
              </span>
            </div>
          </div>
        )}
        {images.length > 1 && (
          <>
            <button
              type="button"
              className="gallery-prev"
              onClick={() => step(-1)}
              aria-label="Fotografía anterior"
            >
              <ArrowLeft size={25} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="gallery-next"
              onClick={() => step(1)}
              aria-label="Fotografía siguiente"
            >
              <ArrowRight size={25} aria-hidden="true" />
            </button>
          </>
        )}
      </dialog>
    </>
  );
}
