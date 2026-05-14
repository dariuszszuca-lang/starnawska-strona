/**
 * Artykuły blog — dane w data/posts.json, edytowalne przez /admin.
 */

import postsData from "@/data/posts.json";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  /** Główne pytanie, na które odpowiada artykuł (do FAQ schema) */
  keyQuestion: string;
  /** TL;DR. Gotowa odpowiedź dla AI (max 2 zdania) */
  tldr: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  cover: string;
  coverAlt: string;
  keywords: string[];
  /** Treść jako tablica bloków. Proste markdown-like + heading id-ki dla TOC */
  content: ContentBlock[];
  /** FAQ na końcu artykułu. Wsadowo do schema FAQ */
  faq: { q: string; a: string }[];
};

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string; id: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; tone: "tip" | "warning" | "info"; title: string; text: string }
  | { type: "table"; head: string[]; rows: string[][] };

export const posts = postsData as Post[];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
