import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import {
  articleCategories,
  formatArticleDate,
  getPublishedArticle,
  getPublishedArticles,
} from "@/lib/articles";
import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/metadata";

type ArticlePageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPublishedArticles()).map(({ frontmatter }) => ({
    slug: frontmatter.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) notFound();
  const { frontmatter } = article;
  const metadata = pageMetadata(
    frontmatter.title,
    frontmatter.summary,
    `/blog/${frontmatter.slug}`,
  );
  return {
    ...metadata,
    authors: [{ name: frontmatter.author.name }],
    robots: { index: siteConfig.indexable, follow: siteConfig.indexable },
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: frontmatter.date,
      ...(frontmatter.updatedAt ? { modifiedTime: frontmatter.updatedAt } : {}),
      authors: [frontmatter.author.name],
      ...(frontmatter.cover
        ? {
            images: [
              {
                url: frontmatter.cover.src,
                width: frontmatter.cover.width,
                height: frontmatter.cover.height,
                alt: frontmatter.cover.alt,
              },
            ],
          }
        : {}),
    },
    ...(frontmatter.cover
      ? {
          twitter: {
            card: "summary_large_image",
            title: frontmatter.title,
            description: frontmatter.summary,
            images: [frontmatter.cover.src],
          },
        }
      : {}),
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) notFound();
  const { frontmatter } = article;
  // Source is local editorial material reviewed in Git. Never compile request or remote input.
  const { content } = await compileMDX({
    source: article.content,
    options: {
      blockJS: true,
      blockDangerousJS: true,
      mdxOptions: { useDynamicImport: false },
    },
  });
  const related = (await getPublishedArticles())
    .filter(
      ({ frontmatter: candidate }) =>
        candidate.slug !== slug &&
        (candidate.category === frontmatter.category ||
          (frontmatter.aldea && candidate.aldea === frontmatter.aldea)),
    )
    .slice(0, 3);
  const url = new URL(`/blog/${frontmatter.slug}`, siteConfig.url).toString();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.summary,
    datePublished: frontmatter.date,
    ...(frontmatter.updatedAt ? { dateModified: frontmatter.updatedAt } : {}),
    author: { "@type": frontmatter.author.type, name: frontmatter.author.name },
    mainEntityOfPage: url,
    inLanguage: "es",
    ...(frontmatter.cover
      ? { image: new URL(frontmatter.cover.src, siteConfig.url).toString() }
      : {}),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <article>
        <header className="page-hero">
          <div className="container">
            <Link href="/blog">← Volver al cuaderno</Link>
            <p className="eyebrow">{articleCategories[frontmatter.category]}</p>
            <h1>{frontmatter.title}</h1>
            <p className="page-hero-intro">{frontmatter.summary}</p>
            <p className="article-meta" style={{ marginTop: "1.5rem" }}>
              Por {frontmatter.author.name} ·{" "}
              <time dateTime={frontmatter.date}>
                {formatArticleDate(frontmatter.date)}
              </time>
            </p>
            {frontmatter.updatedAt && (
              <p className="article-meta">
                Actualizado el{" "}
                <time dateTime={frontmatter.updatedAt}>
                  {formatArticleDate(frontmatter.updatedAt)}
                </time>
              </p>
            )}
          </div>
        </header>
        <div className="article-page container">
          {frontmatter.cover && (
            <Image
              src={frontmatter.cover.src}
              alt={frontmatter.cover.alt}
              width={frontmatter.cover.width}
              height={frontmatter.cover.height}
              sizes="(max-width: 1280px) 100vw, 1280px"
              style={{
                width: "100%",
                height: "auto",
                marginBottom: "3rem",
                borderRadius: "1rem",
              }}
            />
          )}
          <div className="prose">{content}</div>
          {frontmatter.aldea && (
            <p style={{ marginTop: "2rem" }}>
              <Link
                href={`/aldeas/${frontmatter.aldea}`}
                className="button button-outline"
              >
                Conoce la aldea relacionada
              </Link>
            </p>
          )}
        </div>
      </article>
      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <p className="eyebrow">Para seguir explorando</p>
            <h2>Historias relacionadas</h2>
            <ul>
              {related.map(({ frontmatter: item }) => (
                <li key={item.slug}>
                  <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
