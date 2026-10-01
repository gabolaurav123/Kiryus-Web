import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import {
  createFileArticleAdapter,
  getPublishedArticle,
  getPublishedArticles,
} from "../src/lib/articles";

function source(slug: string, date = "2026-09-30", extra = "") {
  return `---\nslug: ${slug}\ntitle: "Historia confirmada"\nsummary: "Resumen editorial"\ncategory: naturaleza\nauthor:\n  name: "Equipo editorial"\n  type: Organization\ndate: "${date}"\nstatus: published\n${extra}---\n\n## Un aprendizaje\n\nContenido confirmado para esta prueba.\n`;
}

async function fixture(t: { after: (callback: () => Promise<void>) => void }) {
  const directory = await mkdtemp(path.join(tmpdir(), "kiryus-articles-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return { directory, adapter: createFileArticleAdapter(directory) };
}

test("un borrador no aparece en el listado ni se puede consultar por su slug", async (t) => {
  const { directory, adapter } = await fixture(t);
  await writeFile(
    path.join(directory, "historia-real.mdx"),
    source("historia-real"),
  );
  await writeFile(
    path.join(directory, "borrador.mdx"),
    "---\nslug: borrador\nstatus: draft\n---\nMaterial privado.",
  );
  await writeFile(path.join(directory, "notas.txt"), "Esto no es un artículo.");
  assert.deepEqual(
    (await adapter.getPublishedArticles()).map(
      (article) => article.frontmatter.slug,
    ),
    ["historia-real"],
  );
  assert.equal(await adapter.getPublishedArticle("borrador"), undefined);
  assert.equal(await adapter.getPublishedArticle("inexistente"), undefined);
});

test("las consultas por slug no pueden recorrer directorios", async (t) => {
  const { adapter } = await fixture(t);
  for (const slug of [
    "../secret",
    "..",
    "historia/otra",
    "historia\\otra",
    "",
    "%2e%2e",
  ]) {
    assert.equal(await adapter.getPublishedArticle(slug), undefined);
  }
});

test("los artículos publicados se ordenan por su fecha real y conservan metadatos opcionales", async (t) => {
  const { directory, adapter } = await fixture(t);
  await writeFile(
    path.join(directory, "anterior.mdx"),
    source("anterior", "2026-03-01"),
  );
  await writeFile(
    path.join(directory, "reciente.mdx"),
    source(
      "reciente",
      "2026-09-30",
      'aldea: colombia\nupdatedAt: "2026-10-01"\ncover:\n  src: /images/colombia.webp\n  alt: "Un territorio documentado"\n  width: 1200\n  height: 800\n',
    ),
  );
  const articles = await adapter.getPublishedArticles();
  assert.deepEqual(
    articles.map((article) => article.frontmatter.slug),
    ["reciente", "anterior"],
  );
  assert.equal(articles[0].frontmatter.aldea, "colombia");
  assert.equal(articles[0].frontmatter.cover?.width, 1200);
  assert.match(articles[0].content, /Un aprendizaje/);
  assert.doesNotMatch(articles[0].content, /status: published/);
});

test("una fecha inexistente impide publicar el artículo", async (t) => {
  const { directory, adapter } = await fixture(t);
  await writeFile(
    path.join(directory, "fecha-invalida.mdx"),
    source("fecha-invalida", "2026-02-30"),
  );
  await assert.rejects(
    adapter.getPublishedArticles(),
    /no existe en el calendario/,
  );
});

test("un slug distinto al nombre del archivo impide publicar una ruta ambigua", async (t) => {
  const { directory, adapter } = await fixture(t);
  await writeFile(path.join(directory, "nombre.mdx"), source("otra-ruta"));
  await assert.rejects(
    adapter.getPublishedArticles(),
    /coincidir con el nombre/,
  );
});

test("la publicación exige autoría y un estado explícito", async (t) => {
  const { directory, adapter } = await fixture(t);
  await writeFile(
    path.join(directory, "sin-autor.mdx"),
    source("sin-autor").replace('name: "Equipo editorial"', 'name: ""'),
  );
  await assert.rejects(adapter.getPublishedArticles(), /campo «name»/);
  await writeFile(
    path.join(directory, "sin-autor.mdx"),
    source("sin-autor").replace("status: published", "status: pendiente"),
  );
  await assert.rejects(
    adapter.getPublishedArticles(),
    /estado debe ser draft o published/,
  );
});

test("el contenido inicial del repositorio no publica la plantilla", async () => {
  assert.equal(
    (await getPublishedArticles()).some(
      (article) => article.frontmatter.slug === "borrador-editorial",
    ),
    false,
  );
  assert.equal(await getPublishedArticle("borrador-editorial"), undefined);
});
