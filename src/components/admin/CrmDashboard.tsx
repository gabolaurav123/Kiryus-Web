"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowDownToLine, ArrowLeft, ArrowRight, Check, LogOut, Mail, RefreshCw, Search, Trash2, X } from "lucide-react";
import type { Lead, LeadStatus } from "@/lib/crm/types";
import { participationInterests, participationVillages } from "@/lib/participation";
import styles from "./Admin.module.css";

const statuses: { value: LeadStatus; label: string }[] = [
  { value: "nuevo", label: "Nueva consulta" },
  { value: "contactado", label: "Contactado" },
  { value: "en_conversacion", label: "En conversación" },
  { value: "cerrado", label: "Cerrado" },
];
type Filters = { q: string; status: string; village: string; interest: string };
type Result = { leads: Lead[]; total: number; page: number; pageSize: number; stats: Record<LeadStatus | "total", number> };
const emptyFilters: Filters = { q: "", status: "", village: "", interest: "" };

function queryFor(filters: Filters, page = 1) {
  const query = new URLSearchParams({ page: String(page) });
  Object.entries(filters).forEach(([key, value]) => { if (value) query.set(key, value); });
  return query.toString();
}
function villageName(value: string) {
  return participationVillages.find((item) => item.value === value)?.label || value;
}
function interestName(value: string) {
  return participationInterests.find((item) => item.value === value)?.label || value;
}
function dateLabel(value: string) {
  return new Intl.DateTimeFormat("es", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(value));
}

export function CrmDashboard({ email }: { email: string }) {
  const router = useRouter();
  const [draftFilters, setDraftFilters] = useState<Filters>(emptyFilters);
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [status, setStatus] = useState<LeadStatus>("nuevo");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const detail = useRef<HTMLHeadingElement>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/admin/leads?${queryFor(filters, page)}`, { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        if (response.status === 401) { router.replace("/admin/login"); return null; }
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "No pudimos cargar las consultas.");
        return result as Result;
      })
      .then((result) => { if (result && !controller.signal.aborted) { setData(result); setError(""); } })
      .catch((cause) => { if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : "Comprueba tu conexión."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [filters, page, refreshKey, router]);

  function refresh() { setLoading(true); setError(""); setRefreshKey((value) => value + 1); }

  function openLead(lead: Lead) {
    if (saving) return;
    setSelected(lead);
    setStatus(lead.status);
    setNotes(lead.notes);
    setFeedback("");
    setError("");
    setDeleteConfirmation(false);
    requestAnimationFrame(() => detail.current?.focus());
  }
  function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setPage(1);
    setFilters({ ...draftFilters, q: draftFilters.q.trim() });
  }
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    setSaving(true);
    setFeedback("");
    setError("");
    try {
      const response = await fetch(`/api/admin/leads/${selected.id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status, notes }),
      });
      if (response.status === 401) { router.replace("/admin/login"); return; }
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "No pudimos guardar el seguimiento.");
      setSelected(result.lead);
      setStatus(result.lead.status);
      setNotes(result.lead.notes);
      setFeedback("Seguimiento guardado.");
      refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Comprueba tu conexión.");
    } finally { setSaving(false); }
  }
  async function remove() {
    if (!selected || !deleteConfirmation) return;
    setSaving(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/leads/${selected.id}`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: "{}" });
      if (response.status === 401) { router.replace("/admin/login"); return; }
      if (!response.ok) { const result = await response.json(); throw new Error(result.error || "No pudimos eliminar la consulta."); }
      setSelected(null);
      setFeedback("Consulta eliminada.");
      refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Comprueba tu conexión."); }
    finally { setSaving(false); }
  }
  async function logout() {
    try {
      const response = await fetch("/api/admin/logout", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      if (!response.ok) throw new Error("No pudimos cerrar la sesión. Inténtalo de nuevo.");
      router.replace("/admin/login");
      router.refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Comprueba tu conexión."); }
  }

  return (
    <section className={styles.dashboard}>
      <header className={styles.topbar}>
        <div><p className="eyebrow">Comunidad Kiryus / CRM</p><h1>Conversaciones <em>que crecen.</em></h1><p className={styles.muted}>Cada consulta, su historia y su próximo paso.</p></div>
        <div className={styles.account}><span>{email}</span><button className={styles.secondary} onClick={logout}><LogOut size={16} aria-hidden="true" /> Cerrar sesión</button></div>
      </header>
      <div className={styles.stats} aria-label="Resumen de consultas">
        {[{ value: "total", label: "Todas las consultas" }, ...statuses].map((item) => (
          <div className={styles.stat} key={item.value}><span>{item.label}</span><strong>{data?.stats[item.value as keyof Result["stats"]] ?? "—"}</strong></div>
        ))}
      </div>
      <div className={styles.workspace}>
        <div className={styles.listPanel}>
          <div className={styles.panelHeader}><h2>Consultas recibidas</h2><button className={styles.iconButton} onClick={refresh} aria-label="Actualizar consultas" disabled={loading}><RefreshCw size={18} aria-hidden="true" /></button></div>
          <form className={styles.filters} onSubmit={applyFilters}>
            <label className={styles.search}>Buscar por nombre, correo o mensaje<input type="search" maxLength={160} placeholder="Buscar una conversación…" value={draftFilters.q} onChange={(event) => setDraftFilters({ ...draftFilters, q: event.target.value })} /></label>
            <label>Estado<select value={draftFilters.status} onChange={(event) => setDraftFilters({ ...draftFilters, status: event.target.value })}><option value="">Todos los estados</option>{statuses.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
            <label>Aldea<select value={draftFilters.village} onChange={(event) => setDraftFilters({ ...draftFilters, village: event.target.value })}><option value="">Todas las aldeas</option>{participationVillages.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
            <label>Interés<select value={draftFilters.interest} onChange={(event) => setDraftFilters({ ...draftFilters, interest: event.target.value })}><option value="">Todos los intereses</option>{participationInterests.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
            <button className={styles.primary} type="submit"><Search size={16} aria-hidden="true" /> Aplicar filtros</button>
          </form>
          <div className={styles.listActions}><p aria-live="polite">{loading ? "Cargando consultas…" : `${data?.total ?? 0} ${(data?.total ?? 0) === 1 ? "consulta" : "consultas"}`}</p><a className={styles.textButton} href={`/api/admin/export.csv?${queryFor(filters)}`}><ArrowDownToLine size={16} aria-hidden="true" /> Exportar CSV</a></div>
          {error && <p className={styles.error} role="alert">{error}</p>}
          {!loading && data?.leads.length === 0 && <div className={styles.empty}><Mail size={28} aria-hidden="true" /><h3>{data.stats.total ? "Ninguna consulta coincide." : "La primera conversación está por llegar."}</h3><p>{data.stats.total ? "Prueba otros filtros o una búsqueda diferente." : "Las personas aparecerán aquí cuando envíen el formulario de participación."}</p></div>}
          <ul className={styles.leadList} aria-label="Lista de consultas" aria-busy={loading}>
            {data?.leads.map((lead) => <li key={lead.id}><button className={`${styles.leadRow} ${selected?.id === lead.id ? styles.selectedRow : ""}`} onClick={() => openLead(lead)} disabled={saving} aria-pressed={selected?.id === lead.id}><span className={styles.avatar} aria-hidden="true">{lead.firstName.slice(0, 1)}{lead.lastName.slice(0, 1)}</span><span className={styles.leadIdentity}><strong>{lead.firstName} {lead.lastName}</strong><span>{lead.email}</span><small>{villageName(lead.village)} · {interestName(lead.interest)}</small></span><span className={styles.leadMeta}><span className={`${styles.badge} ${styles[lead.status]}`}>{statuses.find((item) => item.value === lead.status)?.label}</span><time dateTime={lead.createdAt}>{dateLabel(lead.createdAt)}</time></span></button></li>)}
          </ul>
          {data && data.total > data.pageSize && <nav className={styles.pagination} aria-label="Páginas de consultas"><button className={styles.secondary} disabled={page <= 1 || loading} onClick={() => setPage(page - 1)}><ArrowLeft size={16} aria-hidden="true" /> Anterior</button><span>Página {page} de {Math.ceil(data.total / data.pageSize)}</span><button className={styles.secondary} disabled={page * data.pageSize >= data.total || loading} onClick={() => setPage(page + 1)}>Siguiente <ArrowRight size={16} aria-hidden="true" /></button></nav>}
        </div>
        <aside className={styles.detailPanel} aria-label="Detalle y seguimiento">
          {selected ? <>
            <div className={styles.panelHeader}><p className="eyebrow">Detalle de la consulta</p><button className={styles.iconButton} aria-label="Cerrar detalle" disabled={saving} onClick={() => setSelected(null)}><X size={18} aria-hidden="true" /></button></div>
            <h2 ref={detail} tabIndex={-1}>{selected.firstName} {selected.lastName}</h2>
            <p className={styles.small}>Recibida el {dateLabel(selected.createdAt)} · Ref. {selected.id.slice(0, 8)}</p>
            <dl className={styles.facts}><div><dt>Correo</dt><dd><a href={`mailto:${encodeURIComponent(selected.email)}`}>{selected.email}</a></dd></div>{selected.phone && <div><dt>Teléfono</dt><dd><a href={`tel:${selected.phone}`}>{selected.phone}</a></dd></div>}<div><dt>Aldea</dt><dd>{villageName(selected.village)}</dd></div><div><dt>Interés</dt><dd>{interestName(selected.interest)}</dd></div>{selected.arrival && <div><dt>Llegada orientativa</dt><dd>{selected.arrival}</dd></div>}{selected.departure && <div><dt>Salida orientativa</dt><dd>{selected.departure}</dd></div>}</dl>
            <div className={styles.message}><h3>Lo que nos cuenta</h3><p>{selected.message}</p></div>
            <form className={styles.followup} onSubmit={save}><label>Estado de seguimiento<select disabled={saving} value={status} onChange={(event) => setStatus(event.target.value as LeadStatus)}>{statuses.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label><label>Notas internas<textarea disabled={saving} rows={5} maxLength={5000} placeholder="Acuerdos, preguntas y próximos pasos…" value={notes} onChange={(event) => setNotes(event.target.value)} /></label><p className={styles.small}>Solo el equipo administrativo puede ver estas notas.</p><button className={styles.primary} type="submit" disabled={saving}><Check size={17} aria-hidden="true" />{saving ? "Guardando…" : "Guardar seguimiento"}</button></form>
            <p className={styles.feedback} role="status">{feedback}</p>
            <div className={styles.danger}>{deleteConfirmation ? <><p>Se borrarán permanentemente esta consulta y sus notas. Esta acción no se puede deshacer.</p><div className={styles.dangerActions}><button className={styles.destructive} onClick={() => void remove()} disabled={saving}>Eliminar definitivamente</button><button className={styles.secondary} onClick={() => setDeleteConfirmation(false)}>Cancelar</button></div></> : <button className={styles.textButton} disabled={saving} onClick={() => setDeleteConfirmation(true)}><Trash2 size={15} aria-hidden="true" /> Eliminar consulta</button>}</div>
          </> : <div className={styles.detailEmpty}><div className={styles.icon}><Mail size={26} aria-hidden="true" /></div><h2>Una conversación a la vez.</h2><p>Selecciona una consulta para conocer a la persona, anotar lo conversado y actualizar su seguimiento.</p>{feedback && <p role="status">{feedback}</p>}</div>}
        </aside>
      </div>
      <p className={styles.bottomNote}>Información privada de participación. Exporta y comparte los datos únicamente con personas autorizadas del equipo.</p>
    </section>
  );
}
