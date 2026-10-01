"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="container empty-state">
      <p className="eyebrow">Un momento</p>
      <h1>
        No pudimos cargar
        <br />
        <em>esta página.</em>
      </h1>
      <p>Intenta de nuevo o regresa al inicio.</p>
      <button className="button" onClick={reset}>
        Intentar de nuevo
      </button>
      <Link className="text-link" href="/">
        Volver al inicio
      </Link>
    </section>
  );
}
