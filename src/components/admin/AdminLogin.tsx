"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";
import styles from "./Admin.module.css";

export function AdminLogin({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), password: data.get("password") }),
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "No pudimos iniciar la sesión.");
      }
      router.replace("/admin");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Comprueba tu conexión e inténtalo de nuevo.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className={styles.login} aria-labelledby="admin-title">
      <div className={styles.icon}><LockKeyhole size={24} aria-hidden="true" /></div>
      <p className="eyebrow">Comunidad Kiryus / Administración</p>
      <h1 id="admin-title">Cuidar cada <em>conversación.</em></h1>
      <p className={styles.muted}>Acceso privado al seguimiento de consultas y participación.</p>
      {configured ? (
        <form onSubmit={login} className={styles.loginForm}>
          <label>Correo administrativo
            <input name="email" type="email" autoComplete="username" required maxLength={254} />
          </label>
          <label>Contraseña
            <input name="password" type="password" autoComplete="current-password" required maxLength={256} />
          </label>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <button className={styles.primary} disabled={busy} type="submit">
            {busy ? "Iniciando sesión…" : "Entrar al panel"} <ArrowRight size={18} aria-hidden="true" />
          </button>
          <p className={styles.small}>La sesión caduca automáticamente. Cierra sesión al terminar en un equipo compartido.</p>
        </form>
      ) : (
        <div className={styles.notice} role="status">
          <strong>Panel preparado, pendiente de activación.</strong>
          <p>El acceso se habilitará cuando estén configurados el almacenamiento permanente y la cuenta administrativa.</p>
        </div>
      )}
      <Link className={styles.back} href="/">Volver a la comunidad</Link>
    </section>
  );
}
