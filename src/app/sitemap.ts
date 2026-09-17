import type { MetadataRoute } from "next";
import { chapters } from "@/content/chapters";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  const chapterRoutes: MetadataRoute.Sitemap = chapters
    .filter((c) => c.available)
    .map((c) => ({
      url: `${SITE_URL}/chapter/${c.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    }));

  return [...staticRoutes, ...chapterRoutes];
}
