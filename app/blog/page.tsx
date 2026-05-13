import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { getAllPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Blog — porady o rynku nieruchomości w Trójmieście",
  description:
    "Praktyczna wiedza o sprzedaży, kupnie, najmie i rynku nieruchomości w Gdyni, Sopocie i Gdańsku. Artykuły zespołu Starnawska & Boleńska.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="pt-32 lg:pt-36 pb-12">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
              Blog
            </p>
            <h1 className="font-bold tracking-tight text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-foreground">
              Co warto wiedzieć
              <br />
              <span className="text-foreground-muted">
                zanim kupisz albo sprzedasz.
              </span>
            </h1>
            <p className="mt-6 text-lg text-foreground-muted leading-relaxed max-w-2xl">
              Artykuły piszemy sami, na podstawie tego, czego klienci pytają nas najczęściej.
              Bez lania wody. Konkretne kwoty, konkretne kroki, lokalne dane.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container size="wide">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((p, i) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className={`group block rounded-3xl overflow-hidden bg-surface border border-border hover:border-brand-forest hover:shadow-[var(--shadow-card)] hover:-translate-y-0.5 transition-all ${
                  i === 0 ? "lg:col-span-3 lg:grid lg:grid-cols-2" : ""
                }`}
              >
                <div
                  className={`relative bg-gray-100 overflow-hidden ${
                    i === 0 ? "aspect-[4/3] lg:aspect-auto" : "aspect-[16/10]"
                  }`}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-br from-brand-forest/20 via-brand-olive/30 to-brand-lime/40 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent_50%)]"
                  />
                  <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full bg-surface/95 backdrop-blur text-[10px] font-semibold uppercase tracking-wider text-brand-forest">
                    {p.category}
                  </span>
                </div>
                <div className={`p-6 lg:p-8 ${i === 0 ? "lg:flex lg:flex-col lg:justify-center lg:p-10" : ""}`}>
                  <div className="flex items-center gap-3 text-xs text-foreground-muted mb-3">
                    <time dateTime={p.publishedAt}>
                      {new Date(p.publishedAt).toLocaleDateString("pl-PL", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <span className="size-1 rounded-full bg-foreground-subtle" />
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" />
                      {p.readingMinutes} min
                    </span>
                  </div>
                  <h2
                    className={`font-bold tracking-tight text-foreground mb-3 leading-tight ${
                      i === 0 ? "text-3xl lg:text-4xl" : "text-2xl"
                    }`}
                  >
                    {p.title}
                  </h2>
                  <p className="text-foreground-muted leading-relaxed">{p.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-forest group-hover:gap-2 transition-all">
                    Czytaj artykuł
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
