import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { isAdmin } from "@/lib/admin/auth";
import { getPostBySlug, type Post } from "@/lib/blog/posts";
import { blocksToMarkdown } from "@/lib/admin/markdown";
import { PostEditor } from "@/components/admin/post-editor";

type Params = Promise<{ slug: string }>;

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  if (!(await isAdmin())) redirect(`/admin/login?from=/admin/edit/${slug}`);

  const isNew = slug === "new";
  let post: Post | null = null;

  if (!isNew) {
    const found = getPostBySlug(slug);
    if (!found) notFound();
    post = found;
  }

  const initial = post
    ? {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        keyQuestion: post.keyQuestion,
        tldr: post.tldr,
        author: post.author,
        publishedAt: post.publishedAt,
        readingMinutes: post.readingMinutes,
        cover: post.cover,
        coverAlt: post.coverAlt,
        keywords: post.keywords.join(", "),
        contentMd: blocksToMarkdown(post.content),
        faq: post.faq,
      }
    : {
        slug: "",
        title: "",
        excerpt: "",
        category: "Sprzedaż",
        keyQuestion: "",
        tldr: "",
        author: "Zespół Starnawska & Boleńska",
        publishedAt: new Date().toISOString().slice(0, 10),
        readingMinutes: 5,
        cover: "",
        coverAlt: "",
        keywords: "",
        contentMd: "",
        faq: [],
      };

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="size-4" />
          Wróć do listy
        </Link>
        <h1 className="font-bold tracking-tight text-3xl text-foreground">
          {isNew ? "Nowy artykuł" : "Edycja artykułu"}
        </h1>
        {!isNew && (
          <p className="mt-2 text-sm text-foreground-muted">
            URL na stronie: <span className="font-mono text-xs">/blog/{slug}</span>
          </p>
        )}
      </div>

      <PostEditor initial={initial} isNew={isNew} />
    </div>
  );
}
