import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { team } from "@/lib/team";
import { posts } from "@/lib/blog/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/oferty`, lastModified: now, changeFrequency: "hourly", priority: 0.9 },
    { url: `${base}/zespol`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/doradztwo`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/kontakt`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/konsultacja`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/o-nas`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/szkolenia`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/polityka-prywatnosci`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/polityka-cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/regulamin`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const teamPages: MetadataRoute.Sitemap = team.map((m) => ({
    url: `${base}/zespol/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...teamPages, ...blogPages];
}
