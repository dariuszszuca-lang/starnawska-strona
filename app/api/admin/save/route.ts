import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin/auth";
import { parseMarkdown, slugify } from "@/lib/admin/markdown";
import { commitFiles } from "@/lib/github/commit";
import type { Post } from "@/lib/blog/posts";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const OWNER = "dariuszszuca-lang";
const REPO = "starnawska-strona";
const BRANCH = "main";
const DATA_PATH = "data/posts.json";

type SavePayload = {
  title: string;
  excerpt: string;
  category: string;
  keyQuestion: string;
  tldr: string;
  author: string;
  publishedAt: string;
  readingMinutes: number;
  cover: string;
  coverAlt: string;
  keywords: string[];
  contentMd: string;
  faq: { q: string; a: string }[];
};

type Request =
  | { action: "create"; slug?: string; payload: SavePayload }
  | { action: "update"; slug: string; payload: SavePayload }
  | { action: "delete"; slug: string };

async function readCurrentPosts(): Promise<Post[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN missing");
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${DATA_PATH}?ref=${BRANCH}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.raw",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error(`GitHub GET posts.json: ${res.status}`);
  const text = await res.text();
  return JSON.parse(text) as Post[];
}

export async function POST(req: globalThis.Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: Request;
  try {
    body = (await req.json()) as Request;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  try {
    const posts = await readCurrentPosts();

    if (body.action === "delete") {
      const next = posts.filter((p) => p.slug !== body.slug);
      if (next.length === posts.length) {
        return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
      }
      await commitFiles({
        owner: OWNER,
        repo: REPO,
        branch: BRANCH,
        message: `blog: usuń "${body.slug}"`,
        files: [{ path: DATA_PATH, contentUtf8: JSON.stringify(next, null, 2) }],
      });
      return NextResponse.json({ ok: true });
    }

    // create / update
    const { payload } = body;
    if (!payload.title.trim()) {
      return NextResponse.json({ ok: false, error: "title_required" }, { status: 400 });
    }

    const content = parseMarkdown(payload.contentMd);
    if (content.length === 0) {
      return NextResponse.json({ ok: false, error: "content_required" }, { status: 400 });
    }

    let slug = body.action === "update" ? body.slug : slugify(payload.title);
    if (!slug) {
      return NextResponse.json({ ok: false, error: "bad_slug" }, { status: 400 });
    }

    // dla create: zapobiec kolizji slugów
    if (body.action === "create") {
      let i = 1;
      let candidate = slug;
      while (posts.some((p) => p.slug === candidate)) {
        i++;
        candidate = `${slug}-${i}`;
      }
      slug = candidate;
    }

    const post: Post = {
      slug,
      title: payload.title.trim(),
      excerpt: payload.excerpt.trim(),
      keyQuestion: payload.keyQuestion.trim(),
      tldr: payload.tldr.trim(),
      category: payload.category,
      author: payload.author.trim() || "Zespół Starnawska & Boleńska",
      publishedAt: payload.publishedAt,
      updatedAt: new Date().toISOString().slice(0, 10),
      readingMinutes: Math.max(1, Math.min(60, payload.readingMinutes || 5)),
      cover: payload.cover || "/blog/jak-sprzedac-mieszkanie-2026.jpg",
      coverAlt: payload.coverAlt || payload.title,
      keywords: payload.keywords,
      content,
      faq: payload.faq,
    };

    const next = body.action === "create"
      ? [post, ...posts]
      : posts.map((p) => (p.slug === slug ? post : p));

    const action = body.action === "create" ? "dodaj" : "edytuj";
    await commitFiles({
      owner: OWNER,
      repo: REPO,
      branch: BRANCH,
      message: `blog: ${action} "${post.title.slice(0, 60)}"`,
      files: [{ path: DATA_PATH, contentUtf8: JSON.stringify(next, null, 2) }],
    });

    return NextResponse.json({ ok: true, slug });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "unknown" },
      { status: 500 }
    );
  }
}
