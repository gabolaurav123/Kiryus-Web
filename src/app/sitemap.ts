import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/articles";
import { siteConfig } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!siteConfig.indexable) return [];
  const pages = [
    "/",
    "/nosotros",
    "/aldeas",
    "/aldeas/argentina",
    "/aldeas/colombia",
    "/aldeas/espana",
    "/involucrate",
    "/blog",
    "/contacto",
    "/privacidad",
  ];
  return [
    ...pages.map((page) => ({ url: new URL(page, siteConfig.url).toString() })),
    ...(await getPublishedArticles()).map(({ frontmatter }) => ({
      url: new URL(`/blog/${frontmatter.slug}`, siteConfig.url).toString(),
      lastModified: frontmatter.updatedAt ?? frontmatter.date,
    })),
  ];
}
