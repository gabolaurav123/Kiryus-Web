import type { Metadata } from "next";
import { siteConfig } from "./config";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · Comunidad Kiryus`,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: "es_ES",
      type: "website",
      images: [
        {
          url: "/images/social-cover.jpg",
          width: 1200,
          height: 630,
          alt: "Comunidad Kiryus",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/social-cover.jpg"],
    },
  };
}
