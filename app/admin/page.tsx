import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus, Pencil, Calendar, Clock, ExternalLink } from "lucide-react";
import { isAdmin } from "@/lib/admin/auth";
import { getAllPosts } from "@/lib/blog/posts";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  if (!(await isAdmin())) redirect("/admin/login?from=/admin");

  const posts = getAllPosts();

  return (
    <div className="space-y-8 lg:space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-2">
            Blog
          </p>
          <h1 className="font-bold tracking-tight text-3xl lg:text-4xl text-foreground">
            Artykuły
          </h1>
          <p className="mt-2 text-sm text-foreground-muted">
            {posts.length === 1
              ? "1 opublikowany artykuł."
              : posts.length < 5
                ? `${posts.length} opublikowane artykuły.`
                : `${posts.length} opublikowanych artykułów.`}{" "}
            Zmiany trafiają online za 1-2 minuty od zapisu.
          </p>
        </div>
        <Link
          href="/admin/edit/new"
          className="inline-flex items-center gap-2 h-11 px-5 rounded-2xl bg-brand-lime text-brand-forest-deep font-semibold hover:bg-brand-lime-bright active:scale-[0.98] transition-all"
        >
          <Plus className="size-4" />
          Nowy artykuł
        </Link>
      </div>

      <ul className="space-y-3">
        {posts.map((p) => (
          <li
            key={p.slug}
            className="group rounded-2xl bg-surface border border-border hover:border-brand-forest hover:shadow-[var(--shadow-card)] transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 lg:p-6">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-brand-lime/15 text-brand-forest-deep text-[10px] font-bold uppercase tracking-wider">
                    {p.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-foreground-muted">
                    <Calendar className="size-3" />
                    <time dateTime={p.publishedAt}>
                      {new Date(p.publishedAt).toLocaleDateString("pl-PL", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-foreground-muted">
                    <Clock className="size-3" />
                    {p.readingMinutes} min
                  </span>
                </div>
                <h3 className="font-bold text-base lg:text-lg text-foreground leading-tight mb-1 group-hover:text-brand-forest transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-foreground-muted line-clamp-1">{p.excerpt}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/blog/${p.slug}`}
                  target="_blank"
                  aria-label="Otwórz na stronie"
                  className="inline-flex items-center justify-center size-9 rounded-xl border border-border hover:border-foreground text-foreground-muted hover:text-foreground transition-all"
                >
                  <ExternalLink className="size-4" />
                </Link>
                <Link
                  href={`/admin/edit/${p.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 h-9 rounded-xl bg-foreground text-background text-sm font-semibold hover:bg-gray-800 active:scale-[0.98] transition-all"
                >
                  <Pencil className="size-3.5" />
                  Edytuj
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {posts.length === 0 && (
        <div className="rounded-3xl bg-surface border border-border p-10 text-center">
          <p className="text-foreground-muted mb-5">Nie ma jeszcze artykułów.</p>
          <Link
            href="/admin/edit/new"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-2xl bg-brand-lime text-brand-forest-deep font-semibold"
          >
            <Plus className="size-4" />
            Napisz pierwszy
          </Link>
        </div>
      )}
    </div>
  );
}
