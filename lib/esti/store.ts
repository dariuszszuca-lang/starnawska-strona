import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Offer, OfferFilters, OffersResult } from "./types";

/**
 * Storage ofert: lokalny plik data/offers.json w repo.
 *
 * Cron sync (Vercel) zapisuje plik przez commit do GitHuba.
 * Tu tylko czytamy z lokalnego filesystem. Zero zewnętrznych usług.
 */

const OFFERS_FILE = path.join(process.cwd(), "data", "offers.json");

export type CacheShape = {
  lastSync: string;
  offers: Offer[];
};

let memCache: { data: CacheShape; loadedAt: number } | null = null;
const MEM_TTL_MS = 60_000;

export async function readOffers(): Promise<CacheShape | null> {
  // In-memory cache w obrębie jednej instancji (60s). Żeby nie czytać pliku
  // przy każdym żądaniu strony.
  if (memCache && Date.now() - memCache.loadedAt < MEM_TTL_MS) {
    return memCache.data;
  }
  try {
    const text = await readFile(OFFERS_FILE, "utf8");
    const parsed = JSON.parse(text) as CacheShape;
    memCache = { data: parsed, loadedAt: Date.now() };
    return parsed;
  } catch {
    return null;
  }
}

export async function getFilteredOffers(filters: OfferFilters): Promise<OffersResult> {
  const cache = await readOffers();
  if (!cache) {
    return { items: [], total: 0, lastSync: new Date(0).toISOString() };
  }

  let items = cache.offers;

  if (filters.transaction) items = items.filter((o) => o.transaction === filters.transaction);
  if (filters.type) items = items.filter((o) => o.type === filters.type);
  if (filters.market) items = items.filter((o) => o.market === filters.market);
  if (filters.city)
    items = items.filter((o) => o.city.toLowerCase().includes(filters.city!.toLowerCase()));
  if (filters.district)
    items = items.filter((o) =>
      o.district?.toLowerCase().includes(filters.district!.toLowerCase())
    );
  if (filters.priceMin) items = items.filter((o) => o.price >= filters.priceMin!);
  if (filters.priceMax) items = items.filter((o) => o.price <= filters.priceMax!);
  if (filters.areaMin) items = items.filter((o) => o.area >= filters.areaMin!);
  if (filters.areaMax) items = items.filter((o) => o.area <= filters.areaMax!);
  if (filters.rooms?.length)
    items = items.filter((o) => o.rooms !== undefined && filters.rooms!.includes(o.rooms));
  if (filters.floorMin !== undefined)
    items = items.filter((o) => (o.floor ?? 0) >= filters.floorMin!);
  if (filters.floorMax !== undefined)
    items = items.filter((o) => (o.floor ?? 0) <= filters.floorMax!);
  if (filters.yearMin)
    items = items.filter((o) => (o.yearBuilt ?? 0) >= filters.yearMin!);
  if (filters.state?.length)
    items = items.filter((o) => o.state && filters.state!.includes(o.state));
  if (filters.offerId)
    items = items.filter(
      (o) =>
        o.id.toLowerCase().includes(filters.offerId!.toLowerCase()) ||
        o.offerNumber?.toLowerCase().includes(filters.offerId!.toLowerCase())
    );

  switch (filters.sort) {
    case "price-asc":
      items = [...items].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      items = [...items].sort((a, b) => b.price - a.price);
      break;
    case "area-asc":
      items = [...items].sort((a, b) => a.area - b.area);
      break;
    case "area-desc":
      items = [...items].sort((a, b) => b.area - a.area);
      break;
    default:
      items = [...items].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }

  return {
    items,
    total: items.length,
    lastSync: cache.lastSync,
  };
}

export async function getOfferById(id: string): Promise<Offer | null> {
  const cache = await readOffers();
  if (!cache) return null;
  return cache.offers.find((o) => o.id === id) ?? null;
}

export async function getLatestOffers(limit = 4): Promise<Offer[]> {
  const cache = await readOffers();
  if (!cache) return [];
  return [...cache.offers]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export async function getOffersByAgentSlug(slug: string, limit = 6): Promise<Offer[]> {
  const cache = await readOffers();
  if (!cache) return [];
  return cache.offers.filter((o) => o.agent?.slug === slug).slice(0, limit);
}
