import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, Maximize2, BedDouble, Layers, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getLatestOffers, getFilteredOffers } from "@/lib/esti/store";
import { formatPrice, formatPricePerSqm, formatArea, offerTitle, typeLabels } from "@/lib/esti/format";
import type { Offer } from "@/lib/esti/types";

export async function FeaturedOffers() {
  // Tylko oferty ze zdjęciami, posortowane wg najnowszej daty
  const all = await getLatestOffers(30);
  const featured = all.filter((o) => o.images.length > 0).slice(0, 3);
  const { total } = await getFilteredOffers({});

  if (featured.length === 0) return null;

  return (
    <section className="py-20 lg:py-28">
      <Container size="wide">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 lg:mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-lime/15 text-brand-forest-deep text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="size-3.5" />
              Najnowsze w bazie
            </div>
            <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-foreground">
              Świeże oferty z naszego CRM.
            </h2>
            <p className="mt-3 text-base text-foreground-muted">
              Aktualizujemy bazę codziennie z systemu ESTI. To trzy najnowsze.
            </p>
          </div>
          <Button asChild variant="primary" size="md">
            <Link href="/oferty">
              Zobacz wszystkie {total} ofert
              <ArrowUpRight />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {featured.map((offer, i) => (
            <FeaturedCard key={offer.id} offer={offer} priority={i === 0} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function FeaturedCard({ offer, priority }: { offer: Offer; priority: boolean }) {
  const primary = offer.images[0];
  return (
    <Link
      href={`/oferty/${offer.id}`}
      className="group relative flex flex-col rounded-3xl bg-surface border border-border overflow-hidden hover:border-brand-forest hover:shadow-[var(--shadow-card)] hover:-translate-y-1 transition-all"
    >
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {primary?.url && (
          <Image
            src={primary.url}
            alt={offerTitle(offer)}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority={priority}
          />
        )}

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-surface/95 backdrop-blur text-[10px] font-semibold uppercase tracking-wider text-brand-forest">
            {typeLabels[offer.type]}
          </span>
          {offer.transaction === "najem" && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-brand-lime text-[10px] font-semibold uppercase tracking-wider text-brand-forest-deep">
              Najem
            </span>
          )}
        </div>

        {/* Top-right CTA */}
        <div className="absolute top-3 right-3 size-9 rounded-full bg-brand-lime opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all flex items-center justify-center">
          <ArrowUpRight className="size-4 text-brand-forest-deep" />
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 text-foreground-on-dark">
          <p className="font-bold text-2xl tabular-nums leading-tight">
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

      <div className="p-5 lg:p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-foreground-muted mb-2">
          <MapPin className="size-3.5 text-brand-olive shrink-0" />
          <span className="truncate">
            {offer.city}
            {offer.district && <> · {offer.district}</>}
          </span>
        </div>

        <h3 className="font-semibold text-base lg:text-lg text-foreground leading-tight mb-4 line-clamp-2 group-hover:text-brand-forest transition-colors">
          {offerTitle(offer)}
        </h3>

        <dl className="mt-auto grid grid-cols-3 gap-3 pt-4 border-t border-border">
          <Stat icon={Maximize2} label="Pow." value={formatArea(offer.area)} />
          {offer.rooms !== undefined ? (
            <Stat icon={BedDouble} label="Pokoje" value={`${offer.rooms}`} />
          ) : (
            <Stat icon={BedDouble} label="Pokoje" value="—" />
          )}
          {offer.floor !== undefined && offer.type === "mieszkanie" ? (
            <Stat
              icon={Layers}
              label="Piętro"
              value={offer.floor === 0 ? "P" : `${offer.floor}`}
            />
          ) : offer.yearBuilt ? (
            <Stat icon={Layers} label="Rok" value={`${offer.yearBuilt}`} />
          ) : (
            <Stat icon={Layers} label="—" value="—" />
          )}
        </dl>
      </div>
    </Link>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-foreground-muted mb-0.5">
        <Icon className="size-3 text-brand-olive" />
        {label}
      </div>
      <div className="font-bold text-sm text-foreground tabular-nums leading-tight">{value}</div>
    </div>
  );
}
