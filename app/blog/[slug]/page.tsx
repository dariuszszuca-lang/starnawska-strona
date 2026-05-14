import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  Clock,
  Calendar,
  ArrowRight,
  ArrowUpRight,
  Phone,
  Sparkles,
  MapPin,
  BookOpen,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ContentRenderer } from "@/components/blog/content-renderer";
import { BreadcrumbsSchema } from "@/components/seo/json-ld";
import { posts, getPostBySlug } from "@/lib/blog/posts";
import { siteConfig } from "@/lib/site";
import { getLatestOffers } from "@/lib/esti/store";
import { formatPrice, offerTitle, typeLabel } from "@/lib/esti/format";

export const dynamic = "force-dynamic";

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
  const sidebarOffers = (await getLatestOffers(20))
    .filter((o) => o.images.length > 0)
    .slice(0, 3);

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
        <header className="pt-32 lg:pt-36 pb-12">
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

            <h1 className="font-bold tracking-tight text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-foreground mb-6 max-w-4xl">
              {post.title}
            </h1>

            <p className="text-xl text-foreground-muted leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>
          </Container>
        </header>

        {/* Cover obraz */}
        <Container size="wide" className="mb-12 lg:mb-16">
          <div className="relative aspect-[2.4/1] rounded-3xl overflow-hidden bg-surface-dark">
            <Image
              src={post.cover}
              alt={post.coverAlt}
              fill
              sizes="(min-width: 1024px) 90vw, 100vw"
              className="object-cover"
              priority
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
            />
          </div>
        </Container>

        {/* Content + sidebar */}
        <section className="pb-16 lg:pb-24">
          <Container size="default">
            <div className="lg:grid lg:grid-cols-12 lg:gap-12">
              {/* SIDEBAR */}
              <aside className="lg:col-span-4 lg:order-2 mb-10 lg:mb-0">
                <div className="sticky top-24 space-y-5">
                  {/* TLDR */}
                  <div className="rounded-2xl bg-brand-lime/15 border border-brand-lime/30 p-5 lg:p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="size-4 text-brand-forest-deep" />
                      <p className="text-xs font-bold uppercase tracking-wider text-brand-forest-deep">
                        W skrócie
                      </p>
                    </div>
                    <p className="text-sm text-brand-forest-deep leading-relaxed">
                      {post.tldr}
                    </p>
                  </div>

                  {/* TOC */}
                  {toc.length > 0 && (
                    <nav className="rounded-2xl bg-surface border border-border p-5 lg:p-6">
                      <p className="text-xs font-bold uppercase tracking-wider text-foreground-muted mb-3">
                        W artykule
                      </p>
                      <ul className="space-y-2.5 text-sm">
                        {toc.map((t, i) => (
                          <li key={t.id} className="flex gap-3">
                            <span className="text-foreground-subtle tabular-nums text-xs pt-0.5 shrink-0">
                              0{i + 1}
                            </span>
                            <a
                              href={`#${t.id}`}
                              className="text-foreground-muted hover:text-brand-forest transition-colors leading-snug"
                            >
                              {t.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  )}

                  {/* Oferty z ESTI */}
                  {sidebarOffers.length > 0 && (
                    <div className="rounded-2xl bg-surface border border-border p-5 lg:p-6">
                      <p className="text-xs font-bold uppercase tracking-wider text-foreground-muted mb-4">
                        Aktualne oferty
                      </p>
                      <ul className="space-y-3">
                        {sidebarOffers.map((o) => (
                          <li key={o.id}>
                            <Link
                              href={`/oferty/${o.id}`}
                              className="group flex gap-3 rounded-xl hover:bg-background p-2 -m-2 transition-colors"
                            >
                              <div className="relative size-16 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                <Image
                                  src={o.images[0].url}
                                  alt={offerTitle(o)}
                                  fill
                                  sizes="64px"
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-brand-olive mb-0.5">
                                  {typeLabel(o)}
                                </p>
                                <p className="text-sm font-semibold text-foreground leading-tight line-clamp-2 group-hover:text-brand-forest transition-colors">
                                  {offerTitle(o)}
                                </p>
                                <p className="text-xs text-foreground-muted mt-1 flex items-center gap-1">
                                  <MapPin className="size-3 text-brand-olive shrink-0" />
                                  <span className="truncate">{o.city}</span>
                                  <span className="ml-auto font-semibold text-foreground tabular-nums">
                                    {formatPrice(o.price)}
                                  </span>
                                </p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/oferty"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-forest hover:gap-2.5 transition-all"
                      >
                        Wszystkie oferty
                        <ArrowUpRight className="size-3.5" />
                      </Link>
                    </div>
                  )}

                  {/* Pomoc / CTA agent */}
                  <div className="rounded-2xl bg-surface-dark text-foreground-on-dark p-5 lg:p-6 overflow-hidden relative">
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(163,199,51,0.18),transparent_55%)]"
                    />
                    <div className="relative">
                      <p className="text-xs font-bold uppercase tracking-wider text-brand-lime mb-3">
                        Potrzebujesz pomocy?
                      </p>
                      <p className="text-base font-semibold leading-snug mb-4">
                        Każda transakcja jest inna. Zadzwoń, dopasujemy plan pod Ciebie.
                      </p>
                      <a
                        href={siteConfig.contact.phones[0].href}
                        className="inline-flex items-center gap-2 text-brand-lime font-bold text-lg tabular-nums hover:gap-3 transition-all"
                      >
                        <Phone className="size-4" />
                        {siteConfig.contact.phones[0].displayValue}
                      </a>
                      <Button asChild variant="lime" size="sm" className="w-full mt-4">
                        <Link href="/konsultacja">
                          Umów konsultację
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Polecane artykuły */}
                  {others.length > 0 && (
                    <div className="rounded-2xl bg-surface border border-border p-5 lg:p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="size-4 text-brand-olive" />
                        <p className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
                          Sprawdź też
                        </p>
                      </div>
                      <ul className="space-y-3">
                        {others.map((p) => (
                          <li key={p.slug}>
                            <Link
                              href={`/blog/${p.slug}`}
                              className="group flex gap-3 rounded-xl hover:bg-background p-2 -m-2 transition-colors"
                            >
                              <div className="relative size-16 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                <Image
                                  src={p.cover}
                                  alt={p.coverAlt}
                                  fill
                                  sizes="64px"
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-brand-olive mb-0.5">
                                  {p.category}
                                </p>
                                <p className="text-sm font-semibold text-foreground leading-tight line-clamp-2 group-hover:text-brand-forest transition-colors">
                                  {p.title}
                                </p>
                                <p className="text-xs text-foreground-muted mt-1 inline-flex items-center gap-1">
                                  <Clock className="size-3" />
                                  {p.readingMinutes} min
                                </p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </aside>

              {/* Article body */}
              <div className="lg:col-span-8 lg:order-1">
                <div className="max-w-3xl">
                  <ContentRenderer blocks={post.content} />

                  {/* FAQ */}
                  {post.faq.length > 0 && (
                    <div className="mt-16 pt-12 border-t border-border">
                      <h2 className="font-bold tracking-tight text-3xl text-foreground mb-8">
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

                  {/* CTA na końcu artykułu */}
                  <div className="mt-16 p-8 lg:p-10 rounded-3xl bg-surface-dark text-foreground-on-dark relative overflow-hidden">
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(163,199,51,0.18),transparent_55%)]"
                    />
                    <div className="relative">
                      <h2 className="font-bold tracking-tight text-2xl lg:text-3xl mb-3">
                        Masz konkretną sprawę?
                      </h2>
                      <p className="text-foreground-on-dark-muted leading-relaxed mb-6 max-w-xl">
                        Każda transakcja jest inna. 30 minut rozmowy pomoże nam zrozumieć
                        Twoją sytuację i powiedzieć, co realnie się da zrobić.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Button asChild variant="lime" size="md">
                          <Link href="/konsultacja">
                            Umów konsultację
                            <ArrowRight />
                          </Link>
                        </Button>
                        <Button asChild variant="outline-dark" size="md">
                          <a href={siteConfig.contact.phones[0].href}>
                            <Phone />
                            {siteConfig.contact.phones[0].displayValue}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Inne artykuły. Duża sekcja na dole */}
        <section className="py-16 lg:py-24 bg-surface">
          <Container size="wide">
            <h2 className="font-bold tracking-tight text-3xl lg:text-4xl text-foreground mb-10">
              Sprawdź też
            </h2>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group block rounded-3xl overflow-hidden bg-background border border-border hover:border-brand-forest hover:shadow-[var(--shadow-card)] hover:-translate-y-1 transition-all"
                >
                  <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
                    <Image
                      src={p.cover}
                      alt={p.coverAlt}
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1.5 rounded-full bg-surface/95 backdrop-blur text-[10px] font-semibold uppercase tracking-wider text-brand-forest">
                      {p.category}
                    </span>
                    <div className="absolute top-4 right-4 size-9 rounded-full bg-brand-lime opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all flex items-center justify-center">
                      <ArrowUpRight className="size-4 text-brand-forest-deep" />
                    </div>
                  </div>
                  <div className="p-6 lg:p-8">
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
                    <h3 className="font-bold tracking-tight text-2xl text-foreground leading-tight mb-3 group-hover:text-brand-forest transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-foreground-muted leading-relaxed line-clamp-2">{p.excerpt}</p>
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
