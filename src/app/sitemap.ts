import type { MetadataRoute } from "next";
import { PAGE_SEO, toCanonicalUrl } from "@/data/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(PAGE_SEO)
    .filter(
      (entry) =>
        !entry.noindex &&
        !entry.path.includes("#") &&
        !entry.path.startsWith("/api")
    )
    .map((entry) => ({
      url: toCanonicalUrl(entry.path),
      lastModified: entry.lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    }));
}
