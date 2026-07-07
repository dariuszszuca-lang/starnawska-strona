import type { EstiApiOffer } from "./api-client";
import { matchAgentSlug } from "./parser";
import type {
  Offer,
  OfferType,
  OfferTransaction,
  OfferMarket,
  OfferImage,
} from "./types";

/**
 * Mapper EstiCRM API (JSON) → wewnętrzny typ Offer.
 *
 * Źródło formatu: oficjalny PDF "EstiAPI v1.5"
 *   https://przetestuj.esticrm.pl/docs/EstiCRM-API-dokumentacja-techniczna.pdf
 *
 * RÓŻNICA vs parser.ts (EstiCRM XML z FTP):
 *   - API zwraca JSON z PŁASKIMI wartościami (np. "transaction": 131,
 *     "market": 11, "mainTypeId": 2, "pricePermeter": "989.86"),
 *     a XML zwracał obiekty {#text, @_dictionary} i pola w innym zapisie.
 *   - Dykcjonarze (kody słownikowe) są te same co w XML:
 *       transaction: 131 = sprzedaż, 132 = wynajem (134 = najem)
 *       market:      10 = pierwotny, 11 = wtórny
 *       mainTypeId:  1 = dom, 2 = mieszkanie, 3 = działka, 4 = komercyjny
 *
 * UWAGA dot. zdjęć: dokładny kształt pola ze zdjęciami w odpowiedzi /offer/list
 *   nie jest w pełni opisany w PDF (przykład jest skrócony "..."). Obsługujemy
 *   najczęstsze warianty (tablica stringów / tablica obiektów z url|file|name).
 *   Jeśli realne dane mają inny kształt → patrz TODO niżej.
 */

const ESTI_API_BASE = "https://app.esticrm.pl";

export function mapApiOffersToOffers(raw: EstiApiOffer[]): Offer[] {
  return raw.map(mapOne).filter((o): o is Offer => o !== null);
}

function mapOne(raw: EstiApiOffer): Offer | null {
  const id = str(raw.id);
  if (!id) return null;

  const price = num(raw.price) ?? 0;
  const area = num(raw.areaTotal) ?? num(raw.areaUsable) ?? 0;

  const transaction = mapTransaction(raw.transaction);
  const market = mapMarket(raw.market);
  const typeName = str(raw.typeName);
  const type = mapType(typeName, raw.mainTypeId);
  const typeDetail = extractTypeDetail(typeName);

  const city =
    str(raw.locationCityName) ||
    str(raw.locationCity) ||
    "Trójmiasto";
  const district =
    str(raw.locationPrecinctName) ||
    str(raw.locationDistrictName) ||
    undefined;
  const streetType = str(raw.locationStreetType);
  const streetName = str(raw.locationStreetName) || str(raw.locationStreet);
  const street = [streetType, streetName].filter(Boolean).join(" ") || undefined;

  const agentName = [str(raw.contactFirstname), str(raw.contactLastname)]
    .filter(Boolean)
    .join(" ");

  const title =
    str(raw.portalTitle) ||
    str(raw.portalWwwTitle) ||
    generateTitle(type, area, city);

  const descriptionHtml =
    str(raw.descriptionWebsite) || str(raw.description) || "";
  const description = htmlToPlainText(descriptionHtml);

  const pricePerSqm =
    num(raw.pricePermeter) ?? (area > 0 ? Math.round(price / area) : undefined);

  return {
    id,
    offerNumber: str(raw.numberExport) || str(raw.number) || undefined,
    transaction,
    type,
    typeDetail,
    market,

    title,
    description: description || undefined,
    shortDescription: undefined,

    price,
    pricePerSqm,
    rent: num(raw.apartmentRent) || undefined,

    area,
    landArea: num(raw.areaPlot) || undefined,

    rooms: int(raw.apartmentRoomNumber),
    floor: int(raw.apartmentFloor),
    totalFloors: int(raw.buildingFloornumber),
    yearBuilt: int(raw.buildingYear),

    state: mapBuildingCondition(raw.buildingCondition),

    city,
    district,
    street,
    lat: num(raw.locationLatitude),
    lng: num(raw.locationLongitude),

    images: mapImages(raw),
    videoUrl: mapVideoUrl(raw.videoLink),
    features: undefined,

    agent: agentName
      ? {
          estiId: str(raw.contactId) || undefined,
          slug: matchAgentSlug(agentName),
          fullName: agentName,
          phone: str(raw.contactPhone) || undefined,
          email: str(raw.contactEmail) || undefined,
        }
      : undefined,

    url: `https://starnawska.pl/oferty/${id}`,
    createdAt: str(raw.addDate) || new Date().toISOString(),
    updatedAt:
      str(raw.updateDate) || str(raw.activateDate) || new Date().toISOString(),
  };
}

// ----- zdjęcia -----

/**
 * Próbuje wyłuskać URL-e zdjęć z odpowiedzi API.
 *
 * TODO: zweryfikować realny kształt pola zdjęć po pierwszym wywołaniu z prawdziwym
 *   tokenem (PDF EstiAPI v1.5 nie opisuje go w pełni). Logujemy nieznany kształt
 *   przez zwrócenie [] zamiast zgadywać. Obsłużone warianty:
 *     - raw.pictures = ["https://.../1.jpg", ...]
 *     - raw.pictures = [{ url|file|name|src: "..." }, ...]
 *     - raw.photos / raw.images analogicznie
 */
function mapImages(raw: EstiApiOffer): OfferImage[] {
  const candidates =
    asArray(raw.pictures) || asArray(raw.photos) || asArray(raw.images) || [];

  const urls: string[] = [];
  for (const item of candidates) {
    if (typeof item === "string") {
      urls.push(item);
    } else if (item && typeof item === "object") {
      const o = item as Record<string, unknown>;
      const u = str(o.url) || str(o.file) || str(o.src) || str(o.name) || str(o.path);
      if (u) urls.push(u);
    }
  }

  return urls
    .map((u, i): OfferImage | null => {
      if (!u) return null;
      const url = /^https?:\/\//i.test(u)
        ? u
        : `${ESTI_API_BASE}/${u.replace(/^\/+/, "")}`;
      return { url, primary: i === 0 };
    })
    .filter((x): x is OfferImage => x !== null);
}

function asArray(v: unknown): unknown[] | null {
  return Array.isArray(v) ? v : null;
}

// ----- słowniki (spójne z parser.ts) -----

/** transaction: 131 = sprzedaż, 132/134 = najem (z dokumentacji EstiAPI). */
function mapTransaction(v: unknown): OfferTransaction {
  const txt = str(v);
  if (txt === "132" || txt === "134") return "najem";
  return "sprzedaz";
}

/** market: 10 = pierwotny, 11 = wtórny (z dokumentacji EstiAPI). */
function mapMarket(v: unknown): OfferMarket | undefined {
  const txt = str(v);
  if (txt === "10") return "pierwotny";
  if (txt === "11") return "wtorny";
  return undefined;
}

/**
 * mainTypeId: 1 = dom, 2 = mieszkanie, 3 = działka, 4 = komercyjny
 * (z dokumentacji EstiAPI: type_id => 1 - dom, 2 - mieszkanie, 3 - działka, 4 - komercyjny).
 * Fallback przez typeName, gdy brak mainTypeId.
 */
function mapType(typeName: string, mainTypeId: unknown): OfferType {
  const id = str(mainTypeId);
  const v = typeName.toLowerCase();

  switch (id) {
    case "1":
      return "dom";
    case "2":
      return "mieszkanie";
    case "3":
      return "dzialka";
    case "4":
      if (
        v.includes("garaż") ||
        v.includes("garaz") ||
        v.includes("miejsce postoj") ||
        v.includes("hala garaż")
      ) {
        return "garaz";
      }
      return "lokal";
    case "5":
      return "garaz";
  }

  if (v.startsWith("działk") || v.startsWith("dzialk") || v.includes("grunt")) return "dzialka";
  if (v.startsWith("dom") || v.includes("willa")) return "dom";
  if (v.includes("garaż") || v.includes("garaz") || v.includes("miejsce postoj")) return "garaz";
  if (v.includes("magazyn") || v.includes("lokal") || v.includes("komerc") || v.includes("biuro"))
    return "lokal";
  if (v.includes("mieszkani") || v.includes("apartament") || v.includes("kawalerk"))
    return "mieszkanie";

  return "inne";
}

function extractTypeDetail(typeName: string): string | undefined {
  if (!typeName) return undefined;
  const match = typeName.match(/\(([^)]+)\)/);
  if (match) return match[1].trim();
  const v = typeName.toLowerCase();
  if (v === "mieszkanie" || v === "dom" || v === "działka" || v === "lokal" || v === "garaż") {
    return undefined;
  }
  return typeName.trim();
}

function mapBuildingCondition(v: unknown): string | undefined {
  const txt = str(v);
  const map: Record<string, string> = {
    "61": "do wprowadzenia",
    "62": "do odświeżenia",
    "63": "do remontu",
    "64": "deweloperski",
    "65": "surowy",
  };
  return map[txt];
}

// ----- helpery -----

function str(v: unknown): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return v.trim();
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    if ("#text" in o) return str(o["#text"]);
  }
  return "";
}

function num(v: unknown): number | undefined {
  const s = str(v);
  if (!s) return undefined;
  const n = Number.parseFloat(s.replace(",", "."));
  return Number.isFinite(n) ? n : undefined;
}

function int(v: unknown): number | undefined {
  const n = num(v);
  return n !== undefined ? Math.round(n) : undefined;
}

function generateTitle(type: OfferType, area: number, city: string): string {
  const typeLabel = {
    mieszkanie: "Mieszkanie",
    dom: "Dom",
    dzialka: "Działka",
    lokal: "Lokal",
    garaz: "Garaż",
    inne: "Nieruchomość",
  }[type];
  return `${typeLabel}, ${area > 0 ? `${area} m², ` : ""}${city}`;
}

function htmlToPlainText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// ----- film / wideo -----

/**
 * Wyłuskuje 11-znakowe ID filmu YouTube z różnych form linku
 * (watch?v=, youtu.be/, /embed/, /shorts/).
 */
function youtubeId(url: string): string | undefined {
  const m =
    url.match(/[?&]v=([A-Za-z0-9_-]{11})/) ||
    url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/) ||
    url.match(/\/embed\/([A-Za-z0-9_-]{11})/) ||
    url.match(/\/shorts\/([A-Za-z0-9_-]{11})/);
  return m ? m[1] : undefined;
}

/**
 * Normalizuje link do filmu (pole `videoLink` z Esti) na URL do osadzenia.
 * Obsługujemy YouTube (najczęstsze u agentek). Puste / nie-YouTube → undefined
 * (nie renderujemy nieznanego formatu, zamiast psuć stronę).
 */
function mapVideoUrl(v: unknown): string | undefined {
  const raw = str(v);
  if (!raw) return undefined;
  const id = youtubeId(raw);
  if (!id) return undefined;
  return `https://www.youtube-nocookie.com/embed/${id}`;
}
