import { promises as fs } from "node:fs";
import path from "node:path";
import type { Offer, OfferFilters, OffersResult } from "./types";

/**
 * Prosta warstwa cache. Na Vercel używamy /tmp (ephemeral per instance,
 * ale wystarczy bo cron odświeża co godzinę). Lokalnie też w /tmp.
 *
 * Docelowo: migracja do Supabase / Vercel KV gdy będzie potrzebne
 * zachowanie historii i analityka.
 */

const CACHE_DIR = process.env.NODE_ENV === "production" ? "/tmp/esti" : "/tmp/esti-dev";
const CACHE_FILE = path.join(CACHE_DIR, "offers.json");

type CacheShape = {
  lastSync: string;
  offers: Offer[];
};

async function ensureDir() {
  await fs.mkdir(CACHE_DIR, { recursive: true });
}

export async function saveOffers(offers: Offer[]): Promise<void> {
  await ensureDir();
  const payload: CacheShape = {
    lastSync: new Date().toISOString(),
    offers,
  };
  await fs.writeFile(CACHE_FILE, JSON.stringify(payload), "utf8");
}

export async function readOffers(): Promise<CacheShape | null> {
  try {
    const raw = await fs.readFile(CACHE_FILE, "utf8");
    return JSON.parse(raw) as CacheShape;
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
  if (filters.city) items = items.filter((o) => o.city.toLowerCase().includes(filters.city!.toLowerCase()));
  if (filters.district) items = items.filter((o) => o.district?.toLowerCase().includes(filters.district!.toLowerCase()));
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

  // Sortowanie
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
  return cache.offers
    .filter((o) => o.agent?.slug === slug)
    .slice(0, limit);
}
