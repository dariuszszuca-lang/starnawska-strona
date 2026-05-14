import type { Metadata } from "next";
import Link from "next/link";
import { Search, RefreshCw, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { OfferCard } from "@/components/offers/offer-card";
import { QuickSearch } from "@/components/sections/quick-search";
import { getFilteredOffers } from "@/lib/esti/store";
import { siteConfig } from "@/lib/site";
import type { OfferFilters, OfferTransaction, OfferType, OfferMarket } from "@/lib/esti/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Oferty nieruchomości. Trójmiasto",
  description:
    "Aktualne oferty mieszkań, domów, działek i lokali w Gdyni, Sopocie i Gdańsku. Sprzedaż, wynajem. Dane aktualizowane co godzinę z naszego CRM.",
};

type SearchParams = Promise<Record<string, string | undefined>>;

function paramsToFilters(p: Record<string, string | undefined>): OfferFilters {
  const parseNum = (s?: string) => (s ? Number(s) : undefined);
  return {
    transaction: (p.transakcja as OfferTransaction) || undefined,
    type: (p.typ as OfferType) || undefined,
    market: (p.rynek as OfferMarket) || undefined,
    city: p.miasto,
    district: p.dzielnica,
    priceMin: parseNum(p.cena_min),
    priceMax: parseNum(p.cena_max),
    areaMin: parseNum(p.metraz_min),
    areaMax: parseNum(p.metraz_max),
    rooms: p.pokoje?.split(",").map(Number).filter(Boolean),
    floorMin: parseNum(p.pietro_min),
    floorMax: parseNum(p.pietro_max),
    yearMin: parseNum(p.rok_min),
    state: p.stan?.split(","),
    offerId: p.id,
    sort: (p.sort as OfferFilters["sort"]) || "newest",
  };
}

export default async function OfertyPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const filters = paramsToFilters(params);
  const { items, total, lastSync } = await getFilteredOffers(filters);

  const lastSyncLabel =
    lastSync && new Date(lastSync).getFullYear() > 2020
      ? new Date(lastSync).toLocaleString("pl-PL", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        })
      : null;

  return (
    <>
      <section className="pt-32 lg:pt-36 pb-6">
        <Container size="wide">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
              Oferty
            </p>
            <h1 className="font-bold tracking-tight text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] text-foreground">
              {filters.transaction === "najem"
                ? "Wynajem w Trójmieście."
                : filters.transaction === "sprzedaz"
                  ? "Sprzedaż w Trójmieście."
                  : "Oferty w Trójmieście."}
            </h1>
            <p className="mt-3 text-base text-foreground-muted">
              {total > 0 ? (
                <>
                  <strong className="text-foreground">{total}</strong> ofert spełnia
                  kryteria.
                  {lastSyncLabel && (
                    <span className="text-xs"> · Aktualizacja {lastSyncLabel}</span>
                  )}
                </>
              ) : (
                "Brak ofert spełniających kryteria. Spróbuj zmienić filtry."
              )}
            </p>
          </div>
        </Container>
      </section>

      {/* Wyszukiwarka */}
      <QuickSearch variant="embed" />

      {items.length === 0 ? (
        <EmptyState lastSyncLabel={lastSyncLabel} />
      ) : (
        <section className="pb-20 lg:pb-28">
          <Container size="wide">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {items.map((o, i) => (
                <OfferCard key={o.id} offer={o} priority={i < 3} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

function EmptyState({ lastSyncLabel }: { lastSyncLabel: string | null }) {
  return (
    <section className="pb-20 lg:pb-28">
      <Container size="default">
        <div className="rounded-3xl bg-surface border border-border p-10 lg:p-14 text-center">
          <div className="inline-flex size-16 rounded-2xl bg-brand-lime/15 text-brand-olive items-center justify-center mb-5 mx-auto">
            {lastSyncLabel ? <Search className="size-7" /> : <RefreshCw className="size-7 animate-spin" />}
          </div>

          <h2 className="font-bold tracking-tight text-2xl lg:text-3xl text-foreground mb-3">
            {lastSyncLabel ? "Nie znaleziono ofert" : "Pierwsze oferty już w drodze"}
          </h2>
          <p className="text-foreground-muted leading-relaxed max-w-xl mx-auto mb-8">
            {lastSyncLabel
              ? "Zmień filtry, wyczyść kryteria lub skontaktuj się z nami. Może mamy coś spod lady."
              : "Synchronizujemy bazę z naszym CRM ESTI. Pierwsze oferty pojawią się tu w ciągu najbliższej godziny. W międzyczasie zadzwoń. Dopasujemy ofertę pod Ciebie."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="lime" size="md">
              <Link href="/konsultacja">Zostaw kontakt</Link>
            </Button>
            <a
              href={siteConfig.contact.phones[0].href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border-strong hover:border-foreground text-foreground font-medium text-sm transition-colors"
            >
              <Phone className="size-4 text-brand-olive" />
              {siteConfig.contact.phones[0].displayValue}
            </a>
          </div>

          {lastSyncLabel && (
            <p className="mt-8 text-xs text-foreground-subtle">
              Ostatnia synchronizacja z CRM: {lastSyncLabel}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
