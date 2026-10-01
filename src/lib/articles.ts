import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export const articleCategories = {
  naturaleza: "Naturaleza",
  "practicas-sostenibles": "Prácticas sostenibles",
  "vida-comunitaria": "Vida comunitaria",
} as const;

export type ArticleCategory = keyof typeof articleCategories;
export type ArticleStatus = "draft" | "published";
export type ArticleAldea = "argentina" | "colombia" | "espana";

export interface ArticleCover {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ArticleFrontmatter {
  slug: string;
  title: string;
  summary: string;
  category: ArticleCategory;
  author: { name: string; type: "Person" | "Organization" };
  date: string;
  status: ArticleStatus;
  updatedAt?: string;
  aldea?: ArticleAldea;
  cover?: ArticleCover;
}

export interface Article {
  frontmatter: ArticleFrontmatter;
  content: string;
}

/** This boundary can be implemented by a CMS without changing the public pages. */
export interface ArticleContentAdapter {
  getPublishedArticles(): Promise<Article[]>;
  getPublishedArticle(slug: string): Promise<Article | undefined>;
}

const articleDirectory = path.join(process.cwd(), "src", "content", "articles");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredText(data: Record<string, unknown>, key: string): string {
  const value = data[key];
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`El campo «${key}» debe contener texto.`);
  }
  return value.trim();
}

function calendarDate(value: unknown, key: string): string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(
      `El campo «${key}» debe ser una fecha entre comillas: YYYY-MM-DD.`,
    );
  }
  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (
    Number.isNaN(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== value
  ) {
    throw new Error(`La fecha «${key}» no existe en el calendario.`);
  }
  return value;
}

function publishedFrontmatter(
  data: Record<string, unknown>,
  filename: string,
): ArticleFrontmatter {
  const slug = requiredText(data, "slug");
  if (!slugPattern.test(slug) || filename !== `${slug}.mdx`) {
    throw new Error(
      "El slug debe coincidir con el nombre del archivo y usar letras minúsculas, números y guiones.",
    );
  }
  const category = requiredText(data, "category");
  if (!Object.hasOwn(articleCategories, category)) {
    throw new Error("La categoría no está preparada en articleCategories.");
  }
  if (
    !record(data.author) ||
    !["Person", "Organization"].includes(String(data.author.type))
  ) {
    throw new Error(
      "El autor debe indicar name y type (Person u Organization).",
    );
  }
  const date = calendarDate(data.date, "date");
  const updatedAt =
    data.updatedAt === undefined
      ? undefined
      : calendarDate(data.updatedAt, "updatedAt");
  if (updatedAt && updatedAt < date) {
    throw new Error(
      "La fecha de actualización no puede preceder a la publicación.",
    );
  }
  const aldea = data.aldea;
  if (
    aldea !== undefined &&
    !["argentina", "colombia", "espana"].includes(String(aldea))
  ) {
    throw new Error(
      "La aldea relacionada debe ser argentina, colombia o espana.",
    );
  }
  let cover: ArticleCover | undefined;
  if (data.cover !== undefined) {
    if (!record(data.cover)) throw new Error("La portada debe ser un objeto.");
    const src = requiredText(data.cover, "src");
    const width = data.cover.width;
    const height = data.cover.height;
    if (
      !src.startsWith("/images/") ||
      src.includes("..") ||
      /[?#\\]/.test(src)
    ) {
      throw new Error(
        "La portada debe referirse a una imagen local dentro de /images/.",
      );
    }
    if (
      typeof width !== "number" ||
      !Number.isInteger(width) ||
      width <= 0 ||
      typeof height !== "number" ||
      !Number.isInteger(height) ||
      height <= 0
    ) {
      throw new Error(
        "La portada requiere sus dimensiones reales width y height.",
      );
    }
    cover = { src, alt: requiredText(data.cover, "alt"), width, height };
  }
  return {
    slug,
    title: requiredText(data, "title"),
    summary: requiredText(data, "summary"),
    category: category as ArticleCategory,
    author: {
      name: requiredText(data.author, "name"),
      type: data.author.type as "Person" | "Organization",
    },
    date,
    status: "published",
    ...(updatedAt ? { updatedAt } : {}),
    ...(aldea ? { aldea: aldea as ArticleAldea } : {}),
    ...(cover ? { cover } : {}),
  };
}

/** Only local, reviewed editorial files are accepted. Never feed visitor input to MDX. */
export function createFileArticleAdapter(
  directory = articleDirectory,
): ArticleContentAdapter {
  async function getPublishedArticles(): Promise<Article[]> {
    let entries;
    try {
      entries = await readdir(directory, { withFileTypes: true });
    } catch (error) {
      if (record(error) && error.code === "ENOENT") return [];
      throw error;
    }
    const filenames = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
      .map((entry) => entry.name)
      .sort();
    const articles: Article[] = [];
    for (const filename of filenames) {
      try {
        const source = await readFile(path.join(directory, filename), "utf8");
        const { data, content } = matter(source);
        if (data.status === "draft") continue;
        if (data.status !== "published")
          throw new Error("El estado debe ser draft o published.");
        if (!content.trim())
          throw new Error("Un artículo publicado requiere contenido.");
        articles.push({
          frontmatter: publishedFrontmatter(data, filename),
          content,
        });
      } catch (error) {
        const detail = error instanceof Error ? error.message : String(error);
        throw new Error(`Artículo ${filename}: ${detail}`, { cause: error });
      }
    }
    return articles.sort(
      (a, b) =>
        b.frontmatter.date.localeCompare(a.frontmatter.date) ||
        a.frontmatter.slug.localeCompare(b.frontmatter.slug),
    );
  }

  return {
    getPublishedArticles,
    async getPublishedArticle(slug) {
      if (!slugPattern.test(slug)) return undefined;
      return (await getPublishedArticles()).find(
        (article) => article.frontmatter.slug === slug,
      );
    },
  };
}

const adapter = createFileArticleAdapter();
export const getPublishedArticles = () => adapter.getPublishedArticles();
export const getPublishedArticle = (slug: string) =>
  adapter.getPublishedArticle(slug);

export function formatArticleDate(date: string): string {
  return new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00.000Z`));
}
