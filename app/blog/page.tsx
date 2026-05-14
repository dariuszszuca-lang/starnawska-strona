import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUpRight, Clock, BookOpen } from "lucide-react";
import { Container } from "@/components/ui/container";
import { getAllPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Blog — porady o rynku nieruchomości w Trójmieście",
  description:
    "Praktyczna wiedza o sprzedaży, kupnie, najmie i rynku nieruchomości w Gdyni, Sopocie i Gdańsku. Artykuły zespołu Starnawska & Boleńska.",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      {/* HERO */}
      <section className="pt-32 lg:pt-36 pb-12 lg:pb-16">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
              Blog
            </p>
            <h1 className="font-bold tracking-tight text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-foreground">
              Co warto wiedzieć
              <br />
              <span className="text-foreground-muted">zanim kupisz albo sprzedasz.</span>
            </h1>
            <p className="mt-6 text-lg text-foreground-muted leading-relaxed max-w-2xl">
              Artykuły piszemy sami, na podstawie tego, czego klienci pytają nas najczęściej.
              Bez lania wody. Konkretne kwoty, konkretne kroki, lokalne dane.
            </p>
          </div>
        </Container>
      </section>

      {/* FEATURED — duża karta z nakładką tekstu na zdjęciu */}
      {featured && (
        <section className="pb-12 lg:pb-16">
          <Container size="wide">
            <Link
              href={`/blog/${featured.slug}`}
              className="group relative block aspect-[16/10] lg:aspect-[21/9] rounded-[32px] overflow-hidden bg-gray-100"
            >
              <Image
                src={featured.cover}
                alt={featured.coverAlt}
                fill
                sizes="(min-width: 1024px) 90vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                priority
              />
              {/* Gradient overlay */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent"
              />

              {/* Top-left badge */}
              <div className="absolute top-6 left-6 lg:top-8 lg:left-8 flex items-center gap-2">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-lime text-brand-forest-deep text-[10px] font-bold uppercase tracking-wider">
                  Polecane
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-surface/95 backdrop-blur text-[10px] font-semibold uppercase tracking-wider text-brand-forest">
                  {featured.category}
                </span>
              </div>

              {/* Top-right arrow */}
              <div className="absolute top-6 right-6 lg:top-8 lg:right-8 size-12 rounded-full bg-brand-lime opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all flex items-center justify-center">
                <ArrowUpRight className="size-5 text-brand-forest-deep" />
              </div>

              {/* Treść na dole */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10 text-foreground-on-dark">
                <div className="flex items-center gap-3 text-xs text-foreground-on-dark-muted mb-3">
                  <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
                  <span className="size-1 rounded-full bg-foreground-on-dark/40" />
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3" />
                    {featured.readingMinutes} min czytania
                  </span>
                </div>
                <h2 className="font-bold tracking-tight text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.1] max-w-3xl mb-3">
                  {featured.title}
                </h2>
                <p className="text-foreground-on-dark-muted leading-relaxed max-w-2xl line-clamp-2 lg:line-clamp-none">
                  {featured.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-lime group-hover:gap-3 transition-all">
                  Czytaj artykuł
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </Link>
          </Container>
        </section>
      )}

      {/* RESZTA — siatka 2-3 kolumny */}
      {rest.length > 0 && (
        <section className="pb-20 lg:pb-28">
          <Container size="wide">
            <div className="flex items-end justify-between gap-6 mb-8 lg:mb-10">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-9 rounded-full bg-brand-lime/15 text-brand-olive items-center justify-center">
                  <BookOpen className="size-4" />
                </span>
                <h2 className="font-bold tracking-tight text-xl lg:text-2xl text-foreground">
                  Więcej artykułów
                </h2>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-8">
              {rest.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group block rounded-3xl overflow-hidden bg-surface border border-border hover:border-brand-forest hover:shadow-[var(--shadow-card)] hover:-translate-y-1 transition-all"
                >
                  <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                    <Image
                      src={p.cover}
                      alt={p.coverAlt}
                      fill
                      sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1.5 rounded-full bg-surface/95 backdrop-blur text-[10px] font-semibold uppercase tracking-wider text-brand-forest">
                      {p.category}
                    </span>
                    <div className="absolute top-4 right-4 size-9 rounded-full bg-brand-lime opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all flex items-center justify-center">
                      <ArrowUpRight className="size-4 text-brand-forest-deep" />
                    </div>
                  </div>

                  <div className="p-6 lg:p-7">
                    <div className="flex items-center gap-3 text-xs text-foreground-muted mb-3">
                      <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
                      <span className="size-1 rounded-full bg-foreground-subtle" />
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-3" />
                        {p.readingMinutes} min
                      </span>
                    </div>
                    <h3 className="font-bold tracking-tight text-foreground mb-3 leading-tight text-xl lg:text-2xl group-hover:text-brand-forest transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-foreground-muted leading-relaxed line-clamp-3">
                      {p.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-forest group-hover:gap-2.5 transition-all">
                      Czytaj artykuł
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
