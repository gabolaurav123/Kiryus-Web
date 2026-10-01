import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return siteConfig.indexable
    ? {
        rules: { userAgent: "*", allow: "/" },
        sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
