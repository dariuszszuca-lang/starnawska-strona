import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Maximize2,
  BedDouble,
  Building2,
  Calendar,
  Layers,
  Sparkles,
  Phone,
  Mail,
  Check,
  Hash,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getOfferById } from "@/lib/esti/store";
import { getMemberBySlug } from "@/lib/team";
import { siteConfig } from "@/lib/site";
import {
  formatPrice,
  formatPricePerSqm,
  formatArea,
  offerTitle,
  typeLabel,
  typeLabels,
  transactionLabels,
} from "@/lib/esti/format";

export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const offer = await getOfferById(id);
  if (!offer) return { title: "Oferta nie znaleziona" };

  return {
    title: offerTitle(offer),
    description:
      offer.shortDescription ??
      offer.description?.slice(0, 160) ??
      `${typeLabels[offer.type]} ${transactionLabels[offer.transaction].toLowerCase()}, ${formatArea(offer.area)}, ${offer.city}.`,
    openGraph: {
      title: offerTitle(offer),
      description: offer.description?.slice(0, 200),
      images: offer.images.slice(0, 1).map((img) => ({
        url: img.url,
        alt: img.alt ?? offerTitle(offer),
      })),
    },
  };
}

export default async function OfferDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const offer = await getOfferById(id);
  if (!offer) notFound();

  const agent = offer.agent?.slug ? getMemberBySlug(offer.agent.slug) : null;
  const primary = offer.images.find((i) => i.primary) ?? offer.images[0];
  const gallery = offer.images.filter((i) => i !== primary);

  // RealEstateListing JSON-LD
  const schema = {
    "@context": "https://schema.org",
    "@type": offer.transaction === "najem" ? "RentAction" : "SellAction",
    name: offerTitle(offer),
    description: offer.description,
    image: offer.images.map((i) => i.url),
    offers: {
      "@type": "Offer",
      price: offer.price,
      priceCurrency: "PLN",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero gallery */}
      <section className="pt-28 lg:pt-32 pb-8">
        <Container size="wide">
          <Link
            href="/oferty"
            className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="size-4" />
            Wszystkie oferty
          </Link>

          {offer.images.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
              <div className="lg:col-span-3 relative aspect-[16/10] rounded-3xl overflow-hidden bg-gray-100">
                {primary && (
                  <Image
                    src={primary.url}
                    alt={primary.alt ?? offerTitle(offer)}
                    fill
                    sizes="(min-width: 1024px) 75vw, 100vw"
                    className="object-cover"
                    priority
                  />
                )}
              </div>
              <div className="hidden lg:grid grid-rows-3 gap-3">
                {gallery.slice(0, 3).map((img, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                    <Image
                      src={img.url}
                      alt={img.alt ?? ""}
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="aspect-[16/9] rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <Building2 className="size-16 text-gray-400" />
            </div>
          )}
        </Container>
      </section>

      {/* Title + price */}
      <section className="pb-8">
        <Container size="wide">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-lime/15 text-brand-forest-deep text-[10px] font-semibold uppercase tracking-wider">
                  {transactionLabels[offer.transaction]}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-foreground text-[10px] font-semibold uppercase tracking-wider">
                  {typeLabel(offer)}
                </span>
                {offer.market && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-foreground text-[10px] font-semibold uppercase tracking-wider">
                    {offer.market === "pierwotny" ? "Rynek pierwotny" : "Rynek wtórny"}
                  </span>
                )}
                {offer.offerNumber && (
                  <span className="inline-flex items-center gap-1 text-xs text-foreground-subtle">
                    <Hash className="size-3" />
                    {offer.offerNumber}
                  </span>
                )}
              </div>

              <h1 className="font-bold tracking-tight text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] text-foreground mb-4">
                {offerTitle(offer)}
              </h1>

              <p className="text-base text-foreground-muted flex items-center gap-2">
                <MapPin className="size-4 text-brand-olive" />
                {offer.street && <>{offer.street}, </>}
                {offer.district && <>{offer.district}, </>}
                {offer.city}
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <p className="text-xs uppercase tracking-wider text-foreground-muted mb-1">
                Cena
              </p>
              <p className="font-bold text-3xl lg:text-4xl text-foreground tabular-nums">
                {formatPrice(offer.price)}
                {offer.transaction === "najem" && (
                  <span className="text-base font-normal text-foreground-muted"> / mc</span>
                )}
              </p>
              {offer.pricePerSqm && (
                <p className="text-sm text-foreground-muted mt-1">
                  {formatPricePerSqm(offer.pricePerSqm)}
                </p>
              )}
              {offer.rent && (
                <p className="text-xs text-foreground-subtle mt-2">
                  + czynsz adm.: {formatPrice(offer.rent)} / mc
                </p>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Specs + description + agent */}
      <section className="py-8">
        <Container size="wide">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-8 space-y-8">
              {/* Key specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Spec icon={Maximize2} label="Powierzchnia" value={formatArea(offer.area)} />
                {offer.rooms !== undefined && (
                  <Spec icon={BedDouble} label="Pokoje" value={String(offer.rooms)} />
                )}
                {offer.floor !== undefined && offer.type === "mieszkanie" && (
                  <Spec
                    icon={Layers}
                    label="Piętro"
                    value={
                      offer.floor === 0
                        ? "Parter"
                        : `${offer.floor}${offer.totalFloors ? ` / ${offer.totalFloors}` : ""}`
                    }
                  />
                )}
                {offer.yearBuilt && (
                  <Spec icon={Calendar} label="Rok budowy" value={String(offer.yearBuilt)} />
                )}
                {offer.landArea && (
                  <Spec icon={Maximize2} label="Działka" value={formatArea(offer.landArea)} />
                )}
                {offer.state && <Spec icon={Sparkles} label="Stan" value={offer.state} />}
              </div>

              {/* Description */}
              {offer.description && (
                <div className="rounded-3xl bg-surface border border-border p-7 lg:p-8">
                  <h2 className="font-bold tracking-tight text-xl text-foreground mb-4">
                    Opis nieruchomości
                  </h2>
                  <div className="text-foreground leading-relaxed whitespace-pre-line">
                    {offer.description}
                  </div>
                </div>
              )}

              {/* Features */}
              {offer.features && offer.features.length > 0 && (
                <div className="rounded-3xl bg-surface border border-border p-7 lg:p-8">
                  <h2 className="font-bold tracking-tight text-xl text-foreground mb-4">
                    Wyposażenie i cechy
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {offer.features.map((f) => (
                      <li key={f} className="inline-flex items-start gap-2 text-sm text-foreground">
                        <Check className="size-4 text-brand-olive shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gallery rest */}
              {gallery.length > 3 && (
                <div>
                  <h2 className="font-bold tracking-tight text-xl text-foreground mb-4">
                    Galeria
                  </h2>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {gallery.slice(3).map((img, i) => (
                      <div
                        key={i}
                        className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100"
                      >
                        <Image
                          src={img.url}
                          alt={img.alt ?? ""}
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar: agent + CTA */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-32 space-y-4">
                {agent ? (
                  <Link
                    href={`/zespol/${agent.slug}`}
                    className="block rounded-3xl bg-surface border border-border p-6 hover:border-brand-forest hover:shadow-[var(--shadow-card)] transition-all"
                  >
                    <p className="text-xs uppercase tracking-wider text-foreground-muted mb-3">
                      Prowadzi
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="relative size-16 rounded-full overflow-hidden bg-gray-100 shrink-0">
                        <Image
                          src={agent.photo}
                          alt={agent.fullName}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{agent.fullName}</p>
                        {agent.phoneDisplay && (
                          <p className="text-sm text-foreground-muted tabular-nums mt-0.5">
                            {agent.phoneDisplay}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      {agent.phone && (
                        <a
                          href={`tel:${agent.phone.replace(/\s/g, "")}`}
                          className="inline-flex items-center justify-center gap-2 h-10 px-3 rounded-xl bg-foreground text-background text-xs font-semibold"
                        >
                          <Phone className="size-3.5" />
                          Zadzwoń
                        </a>
                      )}
                      <span className="inline-flex items-center justify-center gap-2 h-10 px-3 rounded-xl bg-gray-100 text-foreground text-xs font-semibold">
                        <Mail className="size-3.5" />
                        Wizytówka
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div className="rounded-3xl bg-surface border border-border p-6">
                    <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                      Skontaktuj się z biurem
                    </p>
                    <p className="font-bold text-2xl text-foreground tabular-nums">
                      {siteConfig.contact.phones[0].displayValue}
                    </p>
                  </div>
                )}

                <div className="rounded-3xl bg-surface-dark text-foreground-on-dark p-6">
                  <p className="text-sm font-semibold mb-3">
                    Zainteresowana ta nieruchomość?
                  </p>
                  <p className="text-xs text-foreground-on-dark-muted mb-5 leading-relaxed">
                    Zostaw kontakt, oddzwonimy z dodatkowymi informacjami i umówimy pokaz.
                  </p>
                  <Button asChild variant="lime" size="md" className="w-full">
                    <Link href={`/konsultacja?intent=kup&oferta=${offer.id}`}>
                      Zostaw zapytanie
                    </Link>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}

function Spec({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-surface border border-border p-4">
      <div className="flex items-center gap-2 text-xs text-foreground-muted mb-2">
        <Icon className="size-3.5 text-brand-olive" />
        {label}
      </div>
      <p className="font-bold text-foreground text-base lg:text-lg tabular-nums">{value}</p>
    </div>
  );
}
