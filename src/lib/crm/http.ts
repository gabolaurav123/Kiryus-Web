import { CrmError } from "./core";
import type { LeadFilters } from "./types";

export function assertSameOrigin(request: Request, expectedOrigin: string, required = true) {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site" || (required && !origin) || (origin && origin !== expectedOrigin)) {
    throw new CrmError(403, "Abre el formulario desde la web de Comunidad Kiryus.");
  }
}

export async function readJson(request: Request, maximum = 16_384): Promise<unknown> {
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get("content-type") || "")) throw new CrmError(415, "Envía los datos como JSON.");
  const declared = request.headers.get("content-length");
  if (declared && (!/^\d+$/.test(declared) || Number(declared) > maximum)) throw new CrmError(413, "La consulta es demasiado grande.");
  const reader = request.body?.getReader();
  if (!reader) throw new CrmError(400, "Faltan los datos de la consulta.");
  const chunks: Uint8Array[] = []; let size = 0;
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maximum) { await reader.cancel(); throw new CrmError(413, "La consulta es demasiado grande."); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  try { return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)); }
  catch { throw new CrmError(400, "Los datos de la consulta no son válidos."); }
}

export function parseLeadFilters(request: Request): LeadFilters {
  const query = new URL(request.url).searchParams;
  return { q: query.get("q") || undefined, status: query.get("status") || undefined, village: query.get("village") || undefined, interest: query.get("interest") || undefined, page: query.has("page") ? Number(query.get("page")) : 1 };
}

export function readCookie(request: Request, name: string) {
  for (const item of (request.headers.get("cookie") || "").split(";")) {
    const at = item.indexOf("=");
    if (at < 0 || item.slice(0, at).trim() !== name) continue;
    return item.slice(at + 1).trim();
  }
  return undefined;
}
