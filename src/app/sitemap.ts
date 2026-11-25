import type { MetadataRoute } from "next";

export const SITE_URL = "https://www.qorvaynology.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: "2026-03-17",
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
