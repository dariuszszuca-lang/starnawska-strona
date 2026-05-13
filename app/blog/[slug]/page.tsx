import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ContentRenderer } from "@/components/blog/content-renderer";
import { BreadcrumbsSchema } from "@/components/seo/json-ld";
import { posts, getPostBySlug } from "@/lib/blog/posts";
import { siteConfig } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPostBySlug(slug);
  if (!p) return { title: "Nie znaleziono" };
  return {
    title: p.title,
    description: p.excerpt,
    keywords: p.keywords,
    authors: [{ name: p.author }],
    openGraph: {
      type: "article",
      title: p.title,
      description: p.excerpt,
      publishedTime: p.publishedAt,
      modifiedTime: p.updatedAt,
      authors: [p.author],
      images: [
        {
          url: `${siteConfig.url}${p.cover}`,
          width: 1200,
          height: 630,
          alt: p.coverAlt,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  // Article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${siteConfig.url}${post.cover}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/brand/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/blog/${post.slug}` },
    keywords: post.keywords.join(", "),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // TOC
  const toc = post.content
    .filter((b) => b.type === "h2")
    .map((b) => ({ id: (b as { id: string }).id, text: (b as { text: string }).text }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbsSchema
        items={[
          { name: "Strona główna", url: siteConfig.url },
          { name: "Blog", url: `${siteConfig.url}/blog` },
          { name: post.title, url: `${siteConfig.url}/blog/${post.slug}` },
        ]}
      />

      <article>
        {/* Hero */}
        <header className="pt-12 lg:pt-20 pb-12">
          <Container size="default">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="size-4" />
              Wróć do bloga
            </Link>

            <div className="flex flex-wrap items-center gap-3 text-sm text-foreground-muted mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-lime/15 text-brand-forest font-semibold text-xs uppercase tracking-wider">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("pl-PL", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {post.readingMinutes} min czytania
              </span>
            </div>

            <h1 className="font-bold tracking-tight text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-tight text-foreground mb-6 max-w-4xl">
              {post.title}
            </h1>

            <p className="text-xl text-foreground-muted leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>
          </Container>
        </header>

        {/* Cover gradient (placeholder zamiast obrazu — bo nie mam jeszcze realnych) */}
        <Container size="wide" className="mb-12">
          <div className="relative aspect-[2.4/1] rounded-3xl overflow-hidden bg-surface-dark">
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-br from-brand-forest-deep via-brand-forest to-brand-olive"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(163,199,51,0.3),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(45,74,31,0.4),transparent_50%)]"
            />
            <div className="absolute inset-0 grain" />
          </div>
        </Container>

        {/* Content + TOC */}
        <section className="pb-16 lg:pb-24">
          <Container size="default">
            <div className="lg:grid lg:grid-cols-12 lg:gap-12">
              {/* TLDR + TOC */}
              <aside className="lg:col-span-3 lg:order-2 mb-10 lg:mb-0">
                <div className="sticky top-24 space-y-6">
                  <div className="rounded-2xl bg-brand-lime/15 border border-brand-lime/30 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-forest-deep mb-2">
                      W skrócie
                    </p>
                    <p className="text-sm text-brand-forest-deep leading-relaxed">
                      {post.tldr}
                    </p>
                  </div>

                  {toc.length > 0 && (
                    <nav className="rounded-2xl bg-surface border border-border p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-3">
                        W artykule
                      </p>
                      <ul className="space-y-2 text-sm">
                        {toc.map((t) => (
                          <li key={t.id}>
                            <a
                              href={`#${t.id}`}
                              className="text-foreground-muted hover:text-foreground transition-colors leading-snug block"
                            >
                              {t.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  )}
                </div>
              </aside>

              {/* Article body */}
              <div className="lg:col-span-9 lg:order-1 max-w-3xl">
                <ContentRenderer blocks={post.content} />

                {/* FAQ */}
                {post.faq.length > 0 && (
                  <div className="mt-16 pt-12 border-t border-border">
                    <h2 className="font-bold tracking-tight text-3xl text-foreground mb-8 tracking-tight">
                      Najczęściej zadawane pytania
                    </h2>
                    <div className="space-y-4">
                      {post.faq.map((f, i) => (
                        <details
                          key={i}
                          className="group rounded-2xl bg-surface border border-border overflow-hidden open:shadow-[var(--shadow-soft)]"
                        >
                          <summary className="cursor-pointer p-5 lg:p-6 flex items-start justify-between gap-4 font-medium text-foreground">
                            <span className="flex-1">{f.q}</span>
                            <span
                              aria-hidden
                              className="size-6 rounded-full bg-gray-100 group-open:bg-brand-lime group-open:text-brand-forest-deep flex items-center justify-center text-lg leading-none shrink-0 transition-colors"
                            >
                              <span className="group-open:hidden">+</span>
                              <span className="hidden group-open:inline">−</span>
                            </span>
                          </summary>
                          <div className="px-5 lg:px-6 pb-5 lg:pb-6 -mt-1 text-foreground-muted leading-relaxed">
                            {f.a}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-16 p-8 lg:p-10 rounded-3xl bg-surface-dark text-foreground-on-dark">
                  <h2 className="font-bold tracking-tight text-2xl lg:text-3xl tracking-tight mb-3">
                    Masz konkretną sprawę?
                  </h2>
                  <p className="text-foreground-on-dark-muted leading-relaxed mb-6">
                    Każda transakcja jest inna. 30 minut rozmowy pomoże nam zrozumieć
                    Twoją sytuację i powiedzieć, co realnie się da zrobić.
                  </p>
                  <Button asChild variant="lime" size="md">
                    <Link href="/konsultacja">
                      Umów konsultację
                      <ArrowRight />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Inne artykuły */}
        <section className="py-16 lg:py-24 bg-surface">
          <Container size="wide">
            <h2 className="font-bold tracking-tight text-3xl lg:text-4xl text-foreground mb-10 tracking-tight">
              Sprawdź też
            </h2>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group block rounded-3xl overflow-hidden bg-background border border-border hover:border-brand-forest hover:shadow-[var(--shadow-card)] transition-all"
                >
                  <div className="aspect-[16/9] relative bg-gradient-to-br from-brand-forest/30 to-brand-lime/40 overflow-hidden">
                    <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full bg-surface/95 backdrop-blur text-[10px] font-semibold uppercase tracking-wider text-brand-forest">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-6 lg:p-8">
                    <h3 className="font-bold tracking-tight text-2xl text-foreground tracking-tight leading-tight mb-3">
                      {p.title}
                    </h3>
                    <p className="text-foreground-muted leading-relaxed">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </article>
    </>
  );
}
