import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  Award,
  Briefcase,
  Languages,
  Home,
  Building2,
  TreePine,
  Key,
  Maximize2,
  Compass,
  HeartHandshake,
  MessageCircle,
  Sparkles,
  BookOpen,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MemberPhoto } from "@/components/team/member-photo";
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
    title: `${member.fullName}. ${member.role}`,
    description: member.bio,
    openGraph: {
      title: `${member.fullName} | ${siteConfig.shortName}`,
      description: member.bio,
      images: member.photo
        ? [{ url: member.photo, width: 800, height: 1200, alt: member.fullName }]
        : undefined,
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

type BioSectionMeta = { title: string; icon: LucideIcon };

function bioSectionMeta(paragraph: string, index: number): BioSectionMeta {
  const text = paragraph.toLowerCase();

  if (
    text.startsWith("prywatnie") ||
    text.includes("wolnych chwilach") ||
    text.includes("prywatny czas") ||
    text.includes("kiedy zdejmuję") ||
    text.includes("żyję z pasją")
  ) {
    return { title: "Prywatnie", icon: Sparkles };
  }

  if (
    text.includes("pierwsze kroki") ||
    text.includes("przez lata") ||
    text.includes("od ponad") ||
    text.includes("ukończyłam") ||
    text.includes("doświadczenie pozwoliło")
  ) {
    return { title: "Doświadczenie", icon: Award };
  }

  if (
    text.includes("specjalizuję") ||
    text.includes("na co dzień wspieram") ||
    text.includes("pomagam przejść") ||
    text.includes("na co dzień pracuję")
  ) {
    return { title: "Zakres wsparcia", icon: HeartHandshake };
  }

  if (
    text.includes("filozofia pracy") ||
    text.includes("ambasadorami") ||
    text.includes("każdą współpracę") ||
    text.includes("stawiam") ||
    text.includes("w pracy łączę") ||
    text.includes("w moim odczuciu")
  ) {
    return { title: "Podejście", icon: Compass };
  }

  if (
    text.includes("relacje") ||
    text.includes("zaufania")
  ) {
    return { title: "Relacje", icon: MessageCircle };
  }

  if (text.includes("trójmiasto") || text.includes("gdyn") || text.includes("gdańsk")) {
    return { title: "Lokalnie", icon: MapPin };
  }

  const fallback: BioSectionMeta[] = [
    { title: "Doświadczenie", icon: Award },
    { title: "Podejście", icon: Compass },
    { title: "Zakres wsparcia", icon: HeartHandshake },
    { title: "Relacje", icon: MessageCircle },
  ];
  return fallback[index % fallback.length];
}

function chunkParagraph(text: string, sentencesPerChunk = 2): string[] {
  const sentences = text.split(/(?<=[.!?])\s+(?=[A-ZŁŚĆŻŹŃĘĄÓ"„])/);
  if (sentences.length <= 1) return [text];
  const chunks: string[] = [];
  for (let i = 0; i < sentences.length; i += sentencesPerChunk) {
    const chunk = sentences.slice(i, i + sentencesPerChunk).join(" ").trim();
    if (chunk) chunks.push(chunk);
  }
  return chunks;
}

export default async function AgentPage({ params }: { params: Params }) {
  const { slug } = await params;
  const member = getMemberBySlug(slug);
  if (!member) notFound();

  const offers = await getOffersByAgentSlug(member.slug, 60);
  const specializations = specializationFromOffers(offers);
  const areas = areasFromOffers(offers);
  const others = team.filter((m) => m.slug !== member.slug).slice(0, 4);
  const [bioLead, ...bioRest] = member.bioParagraphs;

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
      <section className="relative bg-background text-foreground overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(163,199,51,0.13),transparent_55%),linear-gradient(180deg,rgba(247,248,243,0.96),rgba(255,255,255,0.92)_58%,rgba(247,248,243,0.72))]"
        />

        <Container size="wide" className="relative pt-28 lg:pt-36 pb-10 lg:pb-12">
          <Link
            href="/zespol"
            className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-brand-forest transition-colors mb-6"
          >
            <ArrowLeft className="size-4" />
            Cały zespół
          </Link>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1 space-y-7">
              <div>
                <div className="space-y-1 mb-4">
                  {(member.credentialLines ?? [member.shortRole ?? member.role]).map((line) => (
                    <p
                      key={line}
                      className="text-xs font-semibold uppercase tracking-wider text-brand-olive"
                    >
                      {line}
                    </p>
                  ))}
                </div>
                <h1 className="font-bold tracking-tight text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1.02] text-foreground">
                  {member.firstName}
                  <br />
                  <span className="text-brand-forest">{member.lastName}</span>
                </h1>
                <p className="mt-6 max-w-2xl text-base lg:text-lg leading-8 text-foreground-muted">
                  {member.bio}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {member.phone && (
                  <Button asChild variant="lime" size="lg">
                    <a href={`tel:${member.phone.replace(/\s/g, "")}`}>
                      <Phone />
                      {member.phoneDisplay ?? member.phone}
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline" size="lg">
                  <Link href={`/konsultacja?agentka=${member.slug}`}>
                    Umów spotkanie
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Portret */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative max-w-[320px] sm:max-w-[360px] lg:max-w-[400px] xl:max-w-[420px] mx-auto lg:ml-auto lg:mr-0">
                <div
                  aria-hidden
                  className="absolute -inset-3 rounded-[40px] bg-brand-lime/[0.08]"
                />
                <MemberPhoto
                  member={member}
                  sizes="(min-width: 1280px) 420px, (min-width: 1024px) 36vw, 88vw"
                  priority
                  className="aspect-[4/5] rounded-[32px] border border-border bg-surface shadow-[var(--shadow-card)]"
                />

              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SPECJALIZACJE + OBSZARY DZIAŁANIA — jedna karta */}
      {(specializations.length > 0 || areas.length > 0) && (
        <Reveal>
          <section className="py-10 lg:py-14">
            <Container size="wide">
              <div className="flex flex-wrap items-end justify-between gap-5 mb-7">
                <div className="max-w-2xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-olive mb-3">
                    Czym się zajmuję
                  </p>
                  <h2 className="font-bold tracking-tight text-[clamp(1.75rem,3vw,2.35rem)] leading-[1.1] text-foreground">
                    Z czym mogę Ci pomóc.
                  </h2>
                </div>
              </div>

              <div className="rounded-[32px] border border-border bg-background shadow-[var(--shadow-soft)] overflow-hidden">
                <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
                  {/* SPECJALIZACJE */}
                  {specializations.length > 0 && (
                    <div className="p-7 lg:p-10">
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-olive mb-5">
                        <Briefcase className="size-3.5" />
                        Specjalizacja
                      </div>
                      <ul className="space-y-2.5">
                        {specializations.map((s) => {
                          const Icon = typeIcon[s.type];
                          return (
                            <li
                              key={s.type}
                              className="group flex items-center gap-4 rounded-2xl border border-border bg-surface px-4 py-3.5 lg:px-5 lg:py-4 hover:border-brand-lime/40 hover:bg-brand-lime/[0.04] transition-colors"
                            >
                              <div className="size-11 rounded-xl bg-brand-lime/15 text-brand-olive flex items-center justify-center shrink-0">
                                <Icon className="size-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-[15px] lg:text-base text-foreground leading-tight">
                                  {typeNamePlural[s.type]}
                                </p>
                              </div>
                              <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-olive tabular-nums shrink-0">
                                {s.count} {s.count === 1 ? "oferta" : s.count < 5 ? "oferty" : "ofert"}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {/* OBSZARY DZIAŁANIA */}
                  {areas.length > 0 && (
                    <div className="p-7 lg:p-10">
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-olive mb-5">
                        <MapPin className="size-3.5" />
                        Gdzie pracuję
                      </div>
                      <ul className="space-y-2.5">
                        {areas.map((a) => {
                          const [city, district] = a.label.split(" · ");
                          return (
                            <li
                              key={a.label}
                              className="group flex items-center gap-4 rounded-2xl border border-border bg-surface px-4 py-3.5 lg:px-5 lg:py-4 hover:border-brand-lime/40 hover:bg-brand-lime/[0.04] transition-colors"
                            >
                              <div className="size-11 rounded-xl bg-brand-lime/15 text-brand-olive flex items-center justify-center shrink-0">
                                <MapPin className="size-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-[15px] lg:text-base text-foreground leading-tight">
                                  {city}
                                </p>
                                {district && (
                                  <p className="mt-0.5 text-sm text-foreground-muted truncate">
                                    {district}
                                  </p>
                                )}
                              </div>
                              <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-olive tabular-nums shrink-0">
                                {a.count} {a.count === 1 ? "oferta" : a.count < 5 ? "oferty" : "ofert"}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </Container>
          </section>
        </Reveal>
      )}

      {/* O MNIE + KONTAKT */}
      <Reveal>
        <section className="py-12 lg:py-16 bg-surface">
          <Container size="wide">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-5 lg:gap-6 items-start">
              <article className="rounded-[36px] border border-border bg-background overflow-hidden shadow-[var(--shadow-soft)]">
                {/* HEADER + LEAD */}
                <div className="px-7 lg:px-12 pt-9 lg:pt-12 pb-8 lg:pb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="size-9 rounded-full bg-brand-lime/15 text-brand-olive flex items-center justify-center">
                      <BookOpen className="size-4" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-olive">
                      O mnie
                    </p>
                  </div>

                  {bioLead && (
                    <div className="max-w-4xl space-y-4 text-base lg:text-[17px] leading-8 lg:leading-9 text-foreground">
                      {chunkParagraph(bioLead).map((chunk, i) => (
                        <p key={i}>{chunk}</p>
                      ))}
                    </div>
                  )}
                </div>

                {/* NUMEROWANE SEKCJE BIO */}
                {bioRest.length > 0 && (
                  <div className="border-t border-border">
                    {bioRest.map((paragraph, index) => {
                      const meta = bioSectionMeta(paragraph, index);
                      const Icon = meta.icon;
                      const number = String(index + 1).padStart(2, "0");
                      const isAlt = index % 2 === 1;
                      const isLast = index === bioRest.length - 1;
                      return (
                        <div
                          key={paragraph}
                          className={`relative px-7 lg:px-12 py-10 lg:py-14 ${
                            isAlt ? "bg-brand-lime/[0.05]" : "bg-background"
                          } ${!isLast ? "border-b border-border" : ""}`}
                        >
                          <div className="grid lg:grid-cols-[140px_minmax(0,1fr)] gap-6 lg:gap-12 items-start">
                            <div className="flex lg:flex-col items-center lg:items-start gap-5 lg:gap-4">
                              <span className="font-semibold text-[clamp(2.5rem,4.5vw,3.75rem)] leading-none text-brand-olive/55 tabular-nums select-none">
                                {number}
                              </span>
                              <div className="size-12 lg:size-14 rounded-full bg-brand-lime/15 text-brand-olive flex items-center justify-center ring-1 ring-brand-lime/30">
                                <Icon className="size-5 lg:size-6" />
                              </div>
                            </div>
                            <div className="lg:pt-3">
                              <div className="flex items-center gap-3 mb-3">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-olive">
                                  {meta.title}
                                </p>
                                <span className="h-px flex-1 max-w-[100px] bg-brand-olive/25" />
                              </div>
                              <div className="space-y-4 text-base lg:text-[17px] leading-8 lg:leading-9 text-foreground">
                                {chunkParagraph(paragraph).map((chunk, i) => (
                                  <p key={i}>{chunk}</p>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* JEZYKI + SPECJALIZACJE */}
                {(member.languages?.length || member.specializations?.length) && (
                  <div className="border-t border-border bg-surface px-7 lg:px-12 py-9 lg:py-11">
                    <div className="grid md:grid-cols-2 gap-5">
                      {member.languages && member.languages.length > 0 && (
                        <div>
                          <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-olive mb-4">
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
                        <div>
                          <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-olive mb-4">
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
                  </div>
                )}
              </article>

              <aside className="lg:sticky lg:top-24 rounded-[28px] border border-border bg-background overflow-hidden shadow-[var(--shadow-card)]">
                {/* Panel header */}
                <div className="bg-gradient-to-br from-brand-lime/[0.22] via-brand-lime/[0.10] to-brand-lime/[0.04] border-b border-brand-lime/30 px-6 py-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-olive mb-2">
                    Kontakt bezpośredni
                  </p>
                  <p className="text-xl font-bold text-foreground leading-tight">
                    {member.fullName}
                  </p>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {member.shortRole ?? member.role}
                  </p>
                </div>

                {/* Telefon — primary */}
                {member.phone && (
                  <div className="px-6 py-5 border-b border-border">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-olive mb-2">
                      <Phone className="size-3.5" />
                      Telefon
                    </div>
                    <a
                      href={`tel:${member.phone.replace(/\s/g, "")}`}
                      className="block text-2xl font-bold text-brand-forest hover:text-brand-forest-deep transition-colors tabular-nums"
                    >
                      {member.phoneDisplay ?? member.phone}
                    </a>
                    <Button asChild variant="lime" size="md" className="mt-3 w-full">
                      <a href={`tel:${member.phone.replace(/\s/g, "")}`}>
                        <Phone />
                        Zadzwoń teraz
                      </a>
                    </Button>
                  </div>
                )}

                {/* Email */}
                {member.email && (
                  <div className="px-6 py-5 border-b border-border">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-olive mb-2">
                      <Mail className="size-3.5" />
                      E-mail
                    </div>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-foreground font-medium hover:text-brand-forest transition-colors break-words text-[15px]"
                    >
                      {member.email}
                    </a>
                  </div>
                )}

                {/* Godziny */}
                <div className="px-6 py-5 border-b border-border">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-olive mb-2">
                    <Clock className="size-3.5" />
                    Godziny pracy
                  </div>
                  <p className="text-foreground font-medium text-[15px]">
                    {siteConfig.contact.hours}
                  </p>
                </div>

                {/* Adres biura */}
                <div className="px-6 py-5 border-b border-border">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-olive mb-2">
                    <MapPin className="size-3.5" />
                    Biuro
                  </div>
                  <p className="text-foreground font-medium text-[15px] leading-relaxed">
                    {siteConfig.address.street}
                    <br />
                    <span className="text-foreground-muted">
                      {siteConfig.address.postalCode} {siteConfig.address.city}
                    </span>
                  </p>
                </div>

                {/* Licencja */}
                {member.credentialLines?.some((line) => line.toLowerCase().includes("licencj")) && (
                  <div className="px-6 py-5 border-b border-border">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-olive mb-2">
                      <ShieldCheck className="size-3.5" />
                      Licencja
                    </div>
                    <p className="text-foreground font-medium text-[15px] leading-relaxed">
                      {member.credentialLines.find((line) =>
                        line.toLowerCase().includes("licencj"),
                      )}
                    </p>
                  </div>
                )}

                {/* Social biura */}
                <div className="px-6 py-5 border-b border-border">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-olive mb-3">
                    Znajdziesz nas też
                  </div>
                  <div className="flex items-center gap-2">
                    {siteConfig.social.facebook && (
                      <a
                        href={siteConfig.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-border bg-surface text-sm font-semibold text-foreground hover:bg-brand-lime/15 hover:text-brand-forest hover:border-brand-lime/40 transition-colors"
                      >
                        Facebook
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    )}
                    {siteConfig.social.instagram && (
                      <a
                        href={siteConfig.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-border bg-surface text-sm font-semibold text-foreground hover:bg-brand-lime/15 hover:text-brand-forest hover:border-brand-lime/40 transition-colors"
                      >
                        Instagram
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Główne CTA */}
                <div className="px-6 py-5 bg-surface">
                  <Button asChild variant="lime" size="lg" className="w-full">
                    <Link href={`/konsultacja?agentka=${member.slug}`}>
                      Napisz w formularzu
                      <ArrowRight />
                    </Link>
                  </Button>
                  <p className="mt-3 text-xs text-foreground-muted text-center">
                    Bez zobowiązań. Odpowiadam tego samego dnia.
                  </p>
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
                    W mojej obsłudze.
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
                  <MemberPhoto
                    member={m}
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="absolute inset-0"
                    imageClassName="transition-transform duration-700 group-hover:scale-105"
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
