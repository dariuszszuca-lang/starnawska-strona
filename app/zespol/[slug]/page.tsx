import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  Quote,
  ArrowLeft,
  Award,
  Briefcase,
  Languages,
  Home,
  Building2,
  TreePine,
  Key,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PersonSchema, BreadcrumbsSchema } from "@/components/seo/json-ld";
import { StickyMobileCTA } from "@/components/agent/sticky-mobile-cta";
import { Reveal } from "@/components/motion/reveal";
import { team, getMemberBySlug } from "@/lib/team";
import { getOffersByAgentSlug } from "@/lib/esti/store";
import { formatPrice, formatPricePerSqm, formatArea, offerTitle, typeLabel } from "@/lib/esti/format";
import { siteConfig } from "@/lib/site";
import type { Offer, OfferType } from "@/lib/esti/types";

export const dynamic = "force-dynamic";

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

const typeIcon: Record<OfferType, typeof Home> = {
  mieszkanie: Home,
  dom: Building2,
  dzialka: TreePine,
  lokal: Building2,
  garaz: Key,
  inne: Briefcase,
};

const typeNamePlural: Record<OfferType, string> = {
  mieszkanie: "Mieszkania",
  dom: "Domy",
  dzialka: "Działki",
  lokal: "Lokale użytkowe",
  garaz: "Miejsca postojowe",
  inne: "Nieruchomości",
};

function specializationFromOffers(offers: Offer[]): Array<{ type: OfferType; count: number }> {
  const map = new Map<OfferType, number>();
  for (const o of offers) {
    map.set(o.type, (map.get(o.type) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);
}

function areasFromOffers(offers: Offer[]): Array<{ label: string; count: number }> {
  const map = new Map<string, number>();
  for (const o of offers) {
    const key = o.district ? `${o.city} · ${o.district}` : o.city;
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

export default async function AgentPage({ params }: { params: Params }) {
  const { slug } = await params;
  const member = getMemberBySlug(slug);
  if (!member) notFound();

  const offers = await getOffersByAgentSlug(member.slug, 60);
  const specializations = specializationFromOffers(offers);
  const areas = areasFromOffers(offers);
  const others = team.filter((m) => m.slug !== member.slug).slice(0, 4);

  const stats: Array<{ value: string; label: string }> = [];
  if (member.yearsExperience) {
    stats.push({ value: `${member.yearsExperience}+`, label: "lat doświadczenia" });
  }
  if (offers.length > 0) {
    stats.push({ value: `${offers.length}`, label: "aktywnych ofert" });
  }
  if (member.languages?.length) {
    stats.push({ value: member.languages.length === 1 ? "Polski" : `${member.languages.length} języki`, label: "obsługa klientów" });
  }
  if (member.isOwner) {
    stats.push({ value: "Właściciel", label: "biura Starnawska & Boleńska" });
  }

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

      {/* HERO */}
      <section className="relative bg-surface-dark text-foreground-on-dark overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(163,199,51,0.15),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(45,74,31,0.4),transparent_60%)]"
        />

        <Container size="wide" className="relative pt-32 lg:pt-40 pb-12 lg:pb-20">
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
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-lime mb-3">
                  {member.shortRole ?? member.role}
                </p>
                <h1 className="font-bold tracking-tight text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05]">
                  {member.firstName}
                  <br />
                  <span className="text-gradient-lime">{member.lastName}</span>
                </h1>
              </div>

              {member.quote && (
                <blockquote className="relative max-w-xl pl-8 border-l-2 border-brand-lime/50">
                  <Quote className="absolute -left-3 -top-2 size-6 text-brand-lime/60" aria-hidden />
                  <p className="text-lg text-foreground-on-dark-muted leading-relaxed italic">
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

      {/* PASEK STATYSTYK */}
      {stats.length > 0 && (
        <Reveal>
          <section className="py-10 lg:py-12 border-b border-border bg-surface">
            <Container size="wide">
              <dl
                className={`grid gap-8 lg:gap-12 ${
                  stats.length === 1
                    ? "grid-cols-1"
                    : stats.length === 2
                      ? "grid-cols-2"
                      : stats.length === 3
                        ? "grid-cols-2 lg:grid-cols-3"
                        : "grid-cols-2 lg:grid-cols-4"
                }`}
              >
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-2">
                      {s.label}
                    </dt>
                    <dd className="font-bold tracking-tight text-[clamp(1.5rem,3vw,2.5rem)] leading-none text-foreground tabular-nums">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Container>
          </section>
        </Reveal>
      )}

      {/* SPECJALIZACJE z agregacji ofert */}
      {specializations.length > 0 && (
        <Reveal>
          <section className="py-16 lg:py-20">
            <Container size="wide">
              <div className="max-w-2xl mb-10">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                  Czym się zajmuję
                </p>
                <h2 className="font-bold tracking-tight text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.1] text-foreground">
                  Z czym mogę Ci pomóc.
                </h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                {specializations.map((s) => {
                  const Icon = typeIcon[s.type];
                  return (
                    <div
                      key={s.type}
                      className="rounded-2xl border border-border bg-surface p-6"
                    >
                      <div className="size-11 rounded-xl bg-brand-lime/15 text-brand-olive flex items-center justify-center mb-4">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="font-bold text-lg text-foreground leading-tight">
                        {typeNamePlural[s.type]}
                      </h3>
                      <p className="mt-2 text-sm text-foreground-muted">
                        {s.count} {s.count === 1 ? "aktywna oferta" : s.count < 5 ? "aktywne oferty" : "aktywnych ofert"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Container>
          </section>
        </Reveal>
      )}

      {/* O MNIE + KONTAKT SIDEBAR */}
      <Reveal>
        <section className="py-16 lg:py-20 bg-surface">
          <Container size="default">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-4">
                  O mnie
                </p>
                <p className="text-xl lg:text-2xl leading-relaxed text-foreground-muted">
                  {member.bio}
                </p>

                {member.languages && member.languages.length > 0 && (
                  <div className="mt-10">
                    <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                      <Languages className="size-3.5" />
                      Języki obsługi
                    </h2>
                    <ul className="flex flex-wrap gap-2">
                      {member.languages.map((l) => (
                        <li
                          key={l}
                          className="inline-flex items-center px-4 py-1.5 rounded-full bg-background text-sm text-foreground border border-border"
                        >
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {member.specializations && member.specializations.length > 0 && (
                  <div className="mt-8">
                    <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                      <Award className="size-3.5" />
                      Doświadczenie
                    </h2>
                    <ul className="flex flex-wrap gap-2">
                      {member.specializations.map((s) => (
                        <li
                          key={s}
                          className="inline-flex items-center px-4 py-1.5 rounded-full bg-background text-sm text-foreground border border-border"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <aside className="lg:col-span-5">
                <div className="sticky top-24 rounded-3xl bg-background border border-border p-8">
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
                      <ArrowRight />
                    </Link>
                  </Button>
                </div>
              </aside>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* MOJE AKTUALNE OFERTY */}
      {offers.length > 0 && (
        <Reveal>
          <section className="py-16 lg:py-24">
            <Container size="wide">
              <div className="flex flex-wrap items-end justify-between gap-6 mb-10 lg:mb-12">
                <div className="max-w-xl">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                    Aktualne oferty
                  </p>
                  <h2 className="font-bold tracking-tight text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.1] text-foreground">
                    {offers.length === 1
                      ? `1 oferta w mojej obsłudze.`
                      : offers.length < 5
                        ? `${offers.length} aktualne oferty.`
                        : `${offers.length} aktualnych ofert.`}
                  </h2>
                </div>
                <Button asChild variant="outline" size="md">
                  <Link href={`/oferty?agentka=${member.slug}`}>
                    Zobacz wszystkie
                    <ArrowRight />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {offers.slice(0, 6).map((offer) => (
                  <AgentOfferCard key={offer.id} offer={offer} />
                ))}
              </div>
            </Container>
          </section>
        </Reveal>
      )}

      {/* OBSZARY DZIAŁANIA */}
      {areas.length > 0 && (
        <Reveal>
          <section className="py-16 lg:py-20 bg-surface">
            <Container size="wide">
              <div className="max-w-2xl mb-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                  Gdzie pracuję
                </p>
                <h2 className="font-bold tracking-tight text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.1] text-foreground">
                  Obszary działania.
                </h2>
                <p className="mt-3 text-foreground-muted">
                  Lokalizacje, w których obecnie obsługuję transakcje.
                </p>
              </div>
              <ul className="flex flex-wrap gap-2.5">
                {areas.map((a) => (
                  <li
                    key={a.label}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border text-sm text-foreground"
                  >
                    <MapPin className="size-3.5 text-brand-olive" />
                    {a.label}
                    <span className="text-xs text-foreground-muted">· {a.count}</span>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        </Reveal>
      )}

      {/* RESZTA ZESPOŁU */}
      <Reveal>
        <section className="py-16 lg:py-24">
          <Container size="wide">
            <div className="flex items-end justify-between gap-6 mb-10">
              <h2 className="font-bold tracking-tight text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.1] text-foreground">
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
      </Reveal>
    </>
  );
}

function AgentOfferCard({ offer }: { offer: Offer }) {
  const primary = offer.images.find((i) => i.primary) ?? offer.images[0];
  return (
    <Link
      href={`/oferty/${offer.id}`}
      className="group flex flex-col rounded-3xl bg-surface border border-border overflow-hidden hover:border-brand-forest hover:shadow-[var(--shadow-card)] hover:-translate-y-1 transition-all"
    >
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {primary?.url ? (
          <Image
            src={primary.url}
            alt={offerTitle(offer)}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <Building2 className="size-12 text-gray-400" />
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-surface/95 backdrop-blur text-[10px] font-semibold uppercase tracking-wider text-brand-forest">
            {typeLabel(offer)}
          </span>
        </div>
        <div className="absolute top-3 right-3 size-9 rounded-full bg-brand-lime opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all flex items-center justify-center">
          <ArrowUpRight className="size-4 text-brand-forest-deep" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 text-foreground-on-dark">
          <p className="font-bold text-xl tabular-nums leading-tight">
            {formatPrice(offer.price)}
            {offer.transaction === "najem" && (
              <span className="text-xs font-normal opacity-80"> / mc</span>
            )}
          </p>
          {offer.pricePerSqm ? (
            <p className="text-xs opacity-80 mt-0.5">{formatPricePerSqm(offer.pricePerSqm)}</p>
          ) : null}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-foreground-muted mb-2">
          <MapPin className="size-3.5 text-brand-olive shrink-0" />
          <span className="truncate">
            {offer.city}
            {offer.district && <> · {offer.district}</>}
          </span>
        </div>
        <h3 className="font-semibold text-base text-foreground leading-tight mb-3 line-clamp-2 group-hover:text-brand-forest transition-colors">
          {offerTitle(offer)}
        </h3>
        <div className="mt-auto flex items-center gap-3 pt-3 border-t border-border text-xs text-foreground-muted">
          <span className="inline-flex items-center gap-1.5">
            <Maximize2 className="size-3 text-brand-olive" />
            {formatArea(offer.area)}
          </span>
          {offer.rooms !== undefined && (
            <>
              <span className="size-1 rounded-full bg-border" />
              <span>{offer.rooms} {offer.rooms === 1 ? "pokój" : "pokoje"}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
