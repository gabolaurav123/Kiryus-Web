import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { get } from "node:http";

const port = 3101;
const base = `http://127.0.0.1:${port}`;
const indexable = process.env.SITE_INDEXABLE === "true";
const publicOrigin = new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").origin;
function requestWithHost(path, host) {
  return new Promise((resolve, reject) => {
    const request = get(base + path, { headers: { Host: host } }, (response) => {
      response.resume();
      resolve({ status: response.statusCode, location: response.headers.location });
    });
    request.on("error", reject);
    request.setTimeout(10_000, () => request.destroy(new Error("Timeout comprobando el dominio")));
  });
}
const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    String(port),
  ],
  {
    env: { ...process.env, PORT: String(port), NEXT_TELEMETRY_DISABLED: "1" },
    stdio: ["ignore", "pipe", "pipe"],
  },
);
let output = "";
server.stdout.on("data", (chunk) => {
  output += chunk;
});
server.stderr.on("data", (chunk) => {
  output += chunk;
});

try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      ready = (await fetch(base)).ok;
    } catch {}
    if (ready) break;
    if (server.exitCode !== null)
      throw new Error(`Servidor detenido: ${output}`);
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  assert.ok(ready, `El servidor no arrancó: ${output}`);
  const routes = [
    "/",
    "/evento",
    "/nosotros",
    "/red",
    "/regeneracion",
    "/vida-en-comunidad",
    "/aldeas",
    "/aldeas/argentina",
    "/aldeas/colombia",
    "/legado/espana",
    "/involucrate",
    "/contacto",
    "/blog",
    "/privacidad",
  ];
  const titles = new Set();
  for (const route of routes) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.equal(
      (html.match(/<h1[\s>]/g) || []).length,
      1,
      `${route}: un H1 en el HTML inicial`,
    );
    assert.match(html, /<html lang="es"/, `${route}: idioma`);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title, `${route}: título`);
    assert.ok(!titles.has(title), `${route}: título específico`);
    titles.add(title);
    assert.match(
      html,
      indexable ? /name="robots" content="index, follow"/ : /name="robots" content="noindex, nofollow"/,
      `${route}: indexación del entorno configurado`,
    );
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.ok(canonical, `${route}: canonical`);
    assert.equal(new URL(canonical).origin, publicOrigin, `${route}: dominio canónico`);
    assert.equal(new URL(canonical).pathname, route, `${route}: ruta canónica`);
  }
  for (const [from, to] of [
    ["/eventos", "/evento"],
    ["/kiryus-argentina", "/aldeas/argentina"],
    ["/kiryus-colombia", "/aldeas/colombia"],
    ["/aldeas/espana", "/legado/espana"],
    ["/kiryus-espana", "/legado/espana"],
    ["/kiryus-espa%C3%B1a", "/legado/espana"],
  ]) {
    const response = await fetch(base + from, { redirect: "manual" });
    assert.equal(response.status, 308, from);
    assert.equal(response.headers.get("location"), to, from);
    assert.equal((await fetch(base + to)).status, 200, to);
  }
  if (indexable && publicOrigin === "https://www.comunidadkiryus.org") {
    const apexResponse = await requestWithHost("/evento?source=domain-check", "comunidadkiryus.org");
    assert.equal(apexResponse.status, 308, "apex redirige al dominio principal");
    assert.equal(apexResponse.location, `${publicOrigin}/evento?source=domain-check`, "redirección conserva ruta y consulta");
    const canonicalResponse = await requestWithHost("/evento", "www.comunidadkiryus.org");
    assert.equal(canonicalResponse.status, 200, "dominio principal sin bucle de redirección");
  }
  const adminResponse = await fetch(base + "/admin", { redirect: "manual" });
  assert.equal(adminResponse.status, 307, "/admin: requiere sesión");
  assert.equal(
    new URL(adminResponse.headers.get("location"), base).pathname,
    "/admin/login",
    "/admin: redirección al acceso privado",
  );
  const loginResponse = await fetch(base + "/admin/login");
  assert.equal(loginResponse.status, 200, "/admin/login");
  const loginHtml = await loginResponse.text();
  assert.match(
    loginHtml,
    /name="robots" content="noindex, nofollow(?:,[^"]*)?"/,
    "/admin/login: acceso no indexable",
  );
  for (const route of [
    "/aldeas/inexistente",
    "/blog/inexistente",
    "/blog/borrador-editorial",
    "/ruta-inexistente",
  ]) {
    assert.equal((await fetch(base + route)).status, 404, route);
  }
  const robots = await (await fetch(base + "/robots.txt")).text();
  const sitemap = await (await fetch(base + "/sitemap.xml")).text();
  if (indexable) {
    assert.match(robots, /Allow: \//, "robots de producción permite rastreo");
    assert.ok(robots.includes(`Sitemap: ${publicOrigin}/sitemap.xml`), "sitemap canónico en robots");
    const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]));
    assert.ok(urls.length >= routes.length, "sitemap de producción contiene las páginas públicas");
    assert.ok(urls.every((url) => url.origin === publicOrigin), "sitemap sin dominios de preview");
    assert.ok(urls.every((url) => !url.pathname.startsWith("/admin") && !url.pathname.includes("borrador")), "sitemap excluye administración y borradores");
    for (const route of routes) assert.ok(urls.some((url) => url.pathname === route), `${route}: incluida en sitemap`);
  } else {
    assert.match(robots, /Disallow: \//, "robots de preview bloquea rastreo");
    assert.ok(!sitemap.includes("<loc>"), "sitemap de preview vacío");
  }
  for (const asset of [
    "/favicon.png",
    "/images/kiryus-logo.webp",
    "/images/social-cover.jpg",
    "/images/evento/marite.webp",
    "/images/evento/carlos-sat-nam.webp",
    "/images/evento/alma-qhana.webp",
    "/images/evento/marisa-antonieta-cardozo-arce.webp",
  ]) {
    assert.equal((await fetch(base + asset)).status, 200, asset);
  }
  console.log(
    `Rutas: ${routes.length} páginas con HTML, títulos, H1 y SEO; 6 redirecciones; acceso administrativo protegido; 4 respuestas 404; robots, sitemap y recursos aprobados.`,
  );
} finally {
  server.kill("SIGTERM");
}
