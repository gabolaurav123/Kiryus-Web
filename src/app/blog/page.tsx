import Image from "next/image";
import Link from "next/link";
import { BookOpen, ArrowUpRight } from "lucide-react";
import {
  articleCategories,
  formatArticleDate,
  getPublishedArticles,
} from "@/lib/articles";
import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/metadata";
import { Photo } from "@/components/ui/Photo";
import { getImage } from "@/content/images";

export const metadata = {
  ...pageMetadata(
    "Cuaderno de Kiryus",
    "Historias, aprendizajes y prácticas de la Comunidad Kiryus. Explora los territorios y las personas que dan vida al proyecto.",
    "/blog",
  ),
  robots: { index: siteConfig.indexable, follow: siteConfig.indexable },
};

type BlogPageProps = {
  searchParams: Promise<{
    q?: string | string[];
    categoria?: string | string[];
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const articles = await getPublishedArticles();
  const query = articles.length ? await searchParams : {};
  const search =
    typeof query.q === "string" ? query.q.slice(0, 100).trim() : "";
  const category =
    typeof query.categoria === "string" &&
    Object.hasOwn(articleCategories, query.categoria)
      ? query.categoria
      : "";
  const normalize = (value: string) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("es");
  const visibleArticles = articles.filter(
    ({ frontmatter: article }) =>
      (!category || article.category === category) &&
      (!search ||
        normalize(
          `${article.title} ${article.summary} ${articleCategories[article.category]}`,
        ).includes(normalize(search))),
  );
  const availableCategories = Object.entries(articleCategories).filter(
    ([key]) => articles.some(({ frontmatter }) => frontmatter.category === key),
  );
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Historias de la comunidad</p>
          <h1>Cuaderno de Kiryus</h1>
          <p className="page-hero-intro">
            Un lugar para compartir lo que aprendemos al convivir, cuidar la
            tierra y trabajar juntos.
          </p>
        </div>
      </section>
      <section
        className={articles.length ? "section" : undefined}
        aria-label={
          articles.length ? "Artículos publicados" : "Explora la comunidad"
        }
      >
        <div className="container">
          {articles.length === 0 ? (
            <div className="blog-empty">
              <div className="blog-empty-photo"><Photo image={getImage("comunidad-interior")} sizes="(max-width: 700px) 100vw, 50vw" /><span>El cuaderno de la comunidad</span></div>
              <div className="blog-empty-copy">
              <BookOpen size={48} strokeWidth={1.25} aria-hidden="true" />
              <h2>Las historias empiezan en el territorio.</h2>
              <p>
                Este cuaderno todavía no tiene artículos publicados. Mientras
                tanto, puedes conocer la comunidad, explorar sus dos aldeas y
                descubrir el legado de España.
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  gap: "1rem",
                }}
              >
                <Link href="/nosotros" className="button">
                  Conoce la comunidad{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
                <Link href="/aldeas" className="button button-outline">
                  Explora las aldeas{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </div>
              </div>
            </div>
          ) : (
            <>
              <form
                key={`${search}:${category}`}
                action="/blog"
                method="get"
                role="search"
                aria-label="Buscar historias"
                className="blog-toolbar"
              >
                <label
                  htmlFor="article-search"
                  style={{ display: "grid", gap: ".5rem" }}
                >
                  Buscar en el cuaderno
                  <input
                    id="article-search"
                    name="q"
                    type="search"
                    defaultValue={search}
                    maxLength={100}
                    placeholder="Una práctica, una historia…"
                  />
                </label>
                <label
                  htmlFor="article-category"
                  style={{ display: "grid", gap: ".5rem" }}
                >
                  Categoría
                  <select
                    id="article-category"
                    name="categoria"
                    defaultValue={category}
                  >
                    <option value="">Todas las categorías</option>
                    {availableCategories.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
                <button type="submit" className="button">
                  Buscar
                </button>
                {(search || category) && (
                  <Link href="/blog" className="button button-outline">
                    Ver todas
                  </Link>
                )}
              </form>
              {visibleArticles.length === 0 && (
                <div className="prose">
                  <h2>No encontramos historias con esa búsqueda.</h2>
                  <p>Prueba otra palabra o explora todas las categorías.</p>
                </div>
              )}
              <div className="blog-grid">
                {visibleArticles.map(({ frontmatter: article }) => (
                  <article key={article.slug} className="article-card">
                    {article.cover && (
                      <Link
                        href={`/blog/${article.slug}`}
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <Image
                          src={article.cover.src}
                          alt=""
                          width={article.cover.width}
                          height={article.cover.height}
                          sizes="(max-width: 768px) 100vw, 40vw"
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "1rem",
                          }}
                        />
                      </Link>
                    )}
                    <p className="eyebrow">
                      {articleCategories[article.category]}
                    </p>
                    <h2>
                      <Link href={`/blog/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>
                    <p>{article.summary}</p>
                    <p className="article-meta">
                      <time dateTime={article.date}>
                        {formatArticleDate(article.date)}
                      </time>{" "}
                      · {article.author.name}
                    </p>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="button button-outline"
                      aria-label={`Leer: ${article.title}`}
                    >
                      Leer la historia{" "}
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
