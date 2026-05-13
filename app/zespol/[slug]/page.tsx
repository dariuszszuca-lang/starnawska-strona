import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Phone, Mail, MapPin, ArrowRight, Quote, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PersonSchema, BreadcrumbsSchema } from "@/components/seo/json-ld";
import { StickyMobileCTA } from "@/components/agent/sticky-mobile-cta";
import { team, getMemberBySlug } from "@/lib/team";
import { siteConfig } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const member = getMemberBySlug(slug);
  if (!member) return { title: "Nie znaleziono" };
  return {
    title: `${member.fullName} — ${member.role}`,
    description: member.bio,
    openGraph: {
      title: `${member.fullName} | ${siteConfig.shortName}`,
      description: member.bio,
      images: [{ url: member.photo, width: 800, height: 1200, alt: member.fullName }],
    },
  };
}

export default async function AgentPage({ params }: { params: Params }) {
  const { slug } = await params;
  const member = getMemberBySlug(slug);
  if (!member) notFound();

  const others = team.filter((m) => m.slug !== member.slug).slice(0, 4);

  return (
    <>
      <StickyMobileCTA member={member} />
      <PersonSchema member={member} />
      <BreadcrumbsSchema
        items={[
          { name: "Strona główna", url: siteConfig.url },
          { name: "Nasz zespół", url: `${siteConfig.url}/zespol` },
          { name: member.fullName, url: `${siteConfig.url}/zespol/${member.slug}` },
        ]}
      />

      {/* Hero wizytówki */}
      <section className="relative bg-surface-dark text-foreground-on-dark overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(163,199,51,0.15),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(45,74,31,0.4),transparent_60%)]"
        />

        <Container size="wide" className="relative py-12 lg:py-20">
          <Link
            href="/zespol"
            className="inline-flex items-center gap-2 text-sm text-foreground-on-dark-muted hover:text-brand-lime transition-colors mb-8"
          >
            <ArrowLeft className="size-4" />
            Cały zespół
          </Link>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1 space-y-8">
              <div>
                <h1 className="font-bold tracking-tight text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight">
                  {member.firstName}
                  <br />
                  <span className="text-gradient-lime">{member.lastName}</span>
                </h1>
              </div>

              {member.quote && (
                <blockquote className="relative max-w-xl pl-8 border-l-2 border-brand-lime/50">
                  <Quote className="absolute -left-3 -top-2 size-6 text-brand-lime/60" aria-hidden />
                  <p className="text-lg text-foreground-on-dark-muted leading-relaxed">
                    {member.quote}
                  </p>
                </blockquote>
              )}

              <div className="flex flex-wrap items-center gap-3">
                {member.phone && (
                  <Button asChild variant="lime" size="lg">
                    <a href={`tel:${member.phone.replace(/\s/g, "")}`}>
                      <Phone />
                      {member.phoneDisplay ?? member.phone}
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline-dark" size="lg">
                  <Link href={`/konsultacja?agentka=${member.slug}`}>
                    Umów spotkanie
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Portret */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative max-w-md lg:max-w-none mx-auto">
                <div
                  aria-hidden
                  className="absolute -inset-4 rounded-[40px] bg-brand-lime/10 blur-2xl"
                />
                <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden border border-border-on-dark">
                  <Image
                    src={member.photo}
                    alt={member.fullName}
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Bio + dane */}
      <section className="py-16 lg:py-24">
        <Container size="default">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-4">
                O mnie
              </p>
              <div className="prose prose-lg max-w-none text-foreground leading-relaxed">
                <p className="text-xl leading-relaxed text-foreground-muted">{member.bio}</p>
              </div>

              {member.specializations && member.specializations.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-4">
                    Specjalizacja
                  </h2>
                  <ul className="flex flex-wrap gap-2">
                    {member.specializations.map((s) => (
                      <li
                        key={s}
                        className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-sm text-foreground"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {member.languages && member.languages.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                    Języki
                  </h2>
                  <p className="text-foreground">{member.languages.join(", ")}</p>
                </div>
              )}
            </div>

            {/* Karta kontaktowa */}
            <aside className="lg:col-span-5">
              <div className="sticky top-24 rounded-3xl bg-surface border border-border p-8">
                <h2 className="font-semibold text-lg text-foreground mb-6">
                  Skontaktuj się bezpośrednio
                </h2>
                <dl className="space-y-5">
                  {member.phone && (
                    <div className="flex items-start gap-4">
                      <span className="size-10 rounded-full bg-brand-lime/15 flex items-center justify-center shrink-0">
                        <Phone className="size-4 text-brand-olive" />
                      </span>
                      <div>
                        <dt className="text-xs text-foreground-muted">Telefon</dt>
                        <dd>
                          <a
                            href={`tel:${member.phone.replace(/\s/g, "")}`}
                            className="text-foreground font-medium hover:text-brand-forest transition-colors tabular-nums"
                          >
                            {member.phoneDisplay ?? member.phone}
                          </a>
                        </dd>
                      </div>
                    </div>
                  )}
                  {member.email && (
                    <div className="flex items-start gap-4">
                      <span className="size-10 rounded-full bg-brand-lime/15 flex items-center justify-center shrink-0">
                        <Mail className="size-4 text-brand-olive" />
                      </span>
                      <div>
                        <dt className="text-xs text-foreground-muted">E-mail</dt>
                        <dd>
                          <a
                            href={`mailto:${member.email}`}
                            className="text-foreground font-medium hover:text-brand-forest transition-colors"
                          >
                            {member.email}
                          </a>
                        </dd>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <span className="size-10 rounded-full bg-brand-lime/15 flex items-center justify-center shrink-0">
                      <MapPin className="size-4 text-brand-olive" />
                    </span>
                    <div>
                      <dt className="text-xs text-foreground-muted">Biuro</dt>
                      <dd className="text-foreground font-medium">
                        {siteConfig.address.street}
                        <br />
                        <span className="text-foreground-muted">
                          {siteConfig.address.postalCode} {siteConfig.address.city}
                        </span>
                      </dd>
                    </div>
                  </div>
                </dl>

                <Button asChild variant="lime" size="lg" className="w-full mt-8">
                  <Link href={`/konsultacja?agentka=${member.slug}`}>
                    Napisz w formularzu
                  </Link>
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Inne agentki */}
      <section className="py-16 lg:py-24 bg-surface">
        <Container size="wide">
          <div className="flex items-end justify-between gap-6 mb-10">
            <h2 className="font-bold tracking-tight text-3xl lg:text-4xl tracking-tight text-foreground">
              Poznaj resztę zespołu
            </h2>
            <Link
              href="/zespol"
              className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-brand-forest"
            >
              Wszystkie
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {others.map((m) => (
              <Link
                key={m.slug}
                href={`/zespol/${m.slug}`}
                className="group block aspect-[3/4] relative rounded-3xl overflow-hidden bg-gray-100"
              >
                <Image
                  src={m.photo}
                  alt={m.fullName}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-foreground-on-dark">
                  <p className="font-bold tracking-tight text-lg leading-tight">{m.fullName}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
