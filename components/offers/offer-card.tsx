import Link from "next/link";
import Image from "next/image";
import { MapPin, Maximize2, BedDouble, Building2 } from "lucide-react";
import type { Offer } from "@/lib/esti/types";
import { formatPrice, formatPricePerSqm, formatArea, offerTitle, typeLabel } from "@/lib/esti/format";

export function OfferCard({ offer, priority = false }: { offer: Offer; priority?: boolean }) {
  const primary = offer.images.find((i) => i.primary) ?? offer.images[0];
  const transactionLabel = offer.transaction === "najem" ? "Wynajem" : "Sprzedaż";

  return (
    <Link
      href={`/oferty/${offer.id}`}
      className="group block rounded-3xl bg-surface border border-border overflow-hidden hover:border-brand-forest hover:shadow-[var(--shadow-card)] hover:-translate-y-1 transition-all"
    >
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {primary?.url ? (
          <Image
            src={primary.url}
            alt={primary.alt ?? offerTitle(offer)}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <Building2 className="size-12 text-gray-400" />
          </div>
        )}

        {/* Badges top */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-surface/95 backdrop-blur text-[10px] font-semibold uppercase tracking-wider text-brand-forest">
            {typeLabel(offer)}
          </span>
          {offer.transaction === "najem" && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-brand-lime text-[10px] font-semibold uppercase tracking-wider text-brand-forest-deep">
              Najem
            </span>
          )}
          {offer.market === "pierwotny" && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-brand-forest text-[10px] font-semibold uppercase tracking-wider text-foreground-on-dark">
              Pierwotny
            </span>
          )}
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-foreground-on-dark">
          <p className="font-bold text-xl tabular-nums">
            {formatPrice(offer.price)}
            {offer.transaction === "najem" && (
              <span className="text-sm font-normal opacity-80"> / mc</span>
            )}
          </p>
          {offer.pricePerSqm && (
            <p className="text-xs opacity-80">{formatPricePerSqm(offer.pricePerSqm)}</p>
          )}
        </div>
      </div>

      <div className="p-5">
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

        <div className="flex items-center gap-4 text-xs text-foreground-muted tabular-nums">
          <span className="inline-flex items-center gap-1">
            <Maximize2 className="size-3.5 text-brand-olive" />
            {formatArea(offer.area)}
          </span>
          {offer.rooms ? (
            <span className="inline-flex items-center gap-1">
              <BedDouble className="size-3.5 text-brand-olive" />
              {offer.rooms} {offer.rooms === 1 ? "pokój" : offer.rooms < 5 ? "pokoje" : "pokoi"}
            </span>
          ) : null}
          {offer.floor !== undefined && offer.type === "mieszkanie" && (
            <span className="inline-flex items-center gap-1">
              <Building2 className="size-3.5 text-brand-olive" />
              {offer.floor === 0 ? "parter" : `${offer.floor} p.`}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
