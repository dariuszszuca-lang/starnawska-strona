import { XMLParser } from "fast-xml-parser";
import AdmZip from "adm-zip";
import type { Offer, OfferType, OfferTransaction, OfferMarket, OfferImage } from "./types";

/**
 * Parser EstiCRMXml — format natywny ESTI.
 * Pełna spec: https://przetestuj.esticrm.pl/help/esticrmxml
 *
 * UWAGA: parser jest tolerancyjny — różne wersje ESTI mogą zwracać
 * nieco inny układ pól. Brakujące pola dostają sensowne wartości default.
 */

const xml = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  parseTagValue: true,
  trimValues: true,
  isArray: (name) =>
    [
      "oferta",
      "offer",
      "zdjecie",
      "image",
      "photo",
      "cecha",
      "feature",
    ].includes(name),
});

type RawEstiOffer = Record<string, unknown> & {
  "@_id"?: string;
  id?: string | number;
  numer?: string;
  numer_oferty?: string;
};

/**
 * Rozpakowuje paczkę ZIP z FTP, znajduje pierwszy XML, zwraca jego treść jako string.
 * Zachowuje też listę plików (zdjęcia) z bufora.
 */
export function unpackEstiZip(buffer: Buffer): {
  xmlText: string | null;
  images: Map<string, Buffer>;
} {
  const zip = new AdmZip(buffer);
  const entries = zip.getEntries();
  let xmlText: string | null = null;
  const images = new Map<string, Buffer>();

  for (const entry of entries) {
    if (entry.isDirectory) continue;
    const name = entry.entryName.toLowerCase();
    if (name.endsWith(".xml") && !xmlText) {
      xmlText = entry.getData().toString("utf8");
    } else if (
      name.endsWith(".jpg") ||
      name.endsWith(".jpeg") ||
      name.endsWith(".png") ||
      name.endsWith(".webp")
    ) {
      images.set(entry.entryName, entry.getData());
    }
  }

  return { xmlText, images };
}

/**
 * Parsuje XML EstiCRM i zwraca tablicę ofert w naszym modelu.
 */
export function parseEstiXml(xmlText: string): Offer[] {
  const parsed = xml.parse(xmlText);

  // Format ESTI XML zazwyczaj wygląda tak:
  // <oferty>
  //   <oferta id="...">...</oferta>
  // </oferty>
  // ALBO
  // <offers><offer>...
  const root =
    (parsed.oferty as { oferta?: RawEstiOffer[] } | undefined)?.oferta ??
    (parsed.offers as { offer?: RawEstiOffer[] } | undefined)?.offer ??
    [];

  if (!Array.isArray(root)) return [];

  return root
    .map(mapRawToOffer)
    .filter((o): o is Offer => o !== null);
}

function mapRawToOffer(raw: RawEstiOffer): Offer | null {
  const id = String(raw["@_id"] ?? raw.id ?? raw.numer ?? raw.numer_oferty ?? "");
  if (!id) return null;

  const get = <T = string>(...keys: string[]): T | undefined => {
    for (const k of keys) {
      const v = raw[k];
      if (v !== undefined && v !== null && v !== "") return v as T;
    }
    return undefined;
  };

  const transaction = normalizeTransaction(
    get<string>("rodzaj_oferty", "transakcja", "transaction", "typ_transakcji")
  );
  const type = normalizeType(
    get<string>("typ_nieruchomosci", "rodzaj_nieruchomosci", "kategoria", "typ", "type")
  );
  const market = normalizeMarket(get<string>("rynek", "market"));

  const price = Number(get<string | number>("cena", "cena_calkowita", "price") ?? 0);
  const area = Number(get<string | number>("powierzchnia", "powierzchnia_calkowita", "metraz", "area") ?? 0);

  return {
    id,
    offerNumber: get<string>("numer", "numer_oferty"),
    transaction,
    type,
    market,

    title:
      get<string>("tytul", "title", "nazwa") ??
      generateTitle(type, area, get<string>("miasto", "city")),
    description: get<string>("opis", "description"),
    shortDescription: get<string>("krotki_opis", "short_description"),

    price,
    pricePerSqm: area > 0 ? Math.round(price / area) : undefined,
    rent: Number(get<string | number>("czynsz", "rent") ?? 0) || undefined,

    area,
    landArea: Number(get<string | number>("powierzchnia_dzialki", "land_area") ?? 0) || undefined,

    rooms: Number(get<string | number>("liczba_pokoi", "pokoje", "rooms") ?? 0) || undefined,
    floor: Number(get<string | number>("pietro", "floor") ?? 0) || undefined,
    totalFloors: Number(get<string | number>("liczba_pieter", "total_floors") ?? 0) || undefined,
    yearBuilt: Number(get<string | number>("rok_budowy", "year_built") ?? 0) || undefined,

    state: get<string>("stan", "stan_nieruchomosci", "state"),

    city: String(get<string>("miasto", "city") ?? "").trim() || "Trójmiasto",
    district: get<string>("dzielnica", "district"),
    street: get<string>("ulica", "street"),
    lat: Number(get<string | number>("szerokosc", "lat") ?? 0) || undefined,
    lng: Number(get<string | number>("dlugosc", "lng") ?? 0) || undefined,

    images: extractImages(raw),
    floorPlan: get<string>("plan", "floor_plan"),
    virtualTour: get<string>("spacer", "virtual_tour"),

    features: extractFeatures(raw),

    agent: extractAgent(raw),

    url: `https://starnawska.pl/oferty/${id}`,
    createdAt:
      get<string>("data_dodania", "created_at", "created") ?? new Date().toISOString(),
    updatedAt:
      get<string>("data_modyfikacji", "updated_at", "modified") ?? new Date().toISOString(),
  };
}

function normalizeTransaction(s?: string): OfferTransaction {
  const v = (s ?? "").toLowerCase();
  if (v.includes("najem") || v.includes("wynajem") || v.includes("rent")) return "najem";
  return "sprzedaz";
}

function normalizeType(s?: string): OfferType {
  const v = (s ?? "").toLowerCase();
  if (v.includes("mieszkani") || v.includes("apartament")) return "mieszkanie";
  if (v.includes("dom") || v.includes("house") || v.includes("willa")) return "dom";
  if (v.includes("dzialk") || v.includes("grunt") || v.includes("ziemia")) return "dzialka";
  if (v.includes("lokal") || v.includes("biuro") || v.includes("komerc")) return "lokal";
  if (v.includes("garaz") || v.includes("miejsce post")) return "garaz";
  return "inne";
}

function normalizeMarket(s?: string): OfferMarket | undefined {
  const v = (s ?? "").toLowerCase();
  if (v.includes("pierwot")) return "pierwotny";
  if (v.includes("wtorn")) return "wtorny";
  return undefined;
}

function generateTitle(type: OfferType, area: number, city?: string): string {
  const typeLabel = {
    mieszkanie: "Mieszkanie",
    dom: "Dom",
    dzialka: "Działka",
    lokal: "Lokal",
    garaz: "Garaż",
    inne: "Nieruchomość",
  }[type];
  const areaPart = area > 0 ? `, ${area} m²` : "";
  const cityPart = city ? `, ${city}` : "";
  return `${typeLabel}${areaPart}${cityPart}`;
}

function extractImages(raw: RawEstiOffer): OfferImage[] {
  // ESTI może umieszczać zdjęcia w różnych miejscach:
  // <zdjecia><zdjecie>url</zdjecie></zdjecia>
  // <images><image url="..."/></images>
  // <photos>url1|url2|url3</photos>
  const container =
    (raw.zdjecia as { zdjecie?: unknown[] } | undefined)?.zdjecie ??
    (raw.images as { image?: unknown[] } | undefined)?.image ??
    (raw.photos as { photo?: unknown[] } | undefined)?.photo ??
    [];

  const arr = Array.isArray(container) ? container : [container];
  return arr
    .map((item, i): OfferImage | null => {
      if (!item) return null;
      if (typeof item === "string") {
        return { url: item, primary: i === 0 };
      }
      if (typeof item === "object") {
        const o = item as Record<string, unknown>;
        const url = String(o.url ?? o["@_url"] ?? o["#text"] ?? "");
        if (!url) return null;
        return {
          url,
          alt: o.alt ? String(o.alt) : undefined,
          primary: i === 0,
        };
      }
      return null;
    })
    .filter((x): x is OfferImage => x !== null);
}

function extractFeatures(raw: RawEstiOffer): string[] | undefined {
  const container =
    (raw.cechy as { cecha?: string[] } | undefined)?.cecha ??
    (raw.features as { feature?: string[] } | undefined)?.feature ??
    [];
  const arr = Array.isArray(container) ? container : [container];
  const result = arr.filter((x): x is string => typeof x === "string" && x.length > 0);
  return result.length > 0 ? result : undefined;
}

function extractAgent(raw: RawEstiOffer): Offer["agent"] {
  const agent = raw.agent as Record<string, unknown> | undefined;
  const opiekun = raw.opiekun as Record<string, unknown> | undefined;
  const source = agent ?? opiekun;
  if (!source) return undefined;

  const fullName = String(source.imie_nazwisko ?? source.name ?? "");
  const phone = String(source.telefon ?? source.phone ?? "");
  const email = String(source.email ?? "");

  return {
    estiId: String(source.id ?? source["@_id"] ?? "") || undefined,
    slug: matchAgentSlug(fullName),
    fullName: fullName || undefined,
    phone: phone || undefined,
    email: email || undefined,
  };
}

/**
 * Dopasowanie ESTI agent → nasz slug z team.ts (po nazwisku).
 */
function matchAgentSlug(fullName: string): string | undefined {
  if (!fullName) return undefined;
  const lower = fullName.toLowerCase();
  const map: Record<string, string> = {
    "sudwoj-boleńska": "patrycja-sudwoj-bolenska",
    "sudwoj-bolenska": "patrycja-sudwoj-bolenska",
    boleńska: "patrycja-sudwoj-bolenska",
    bolenska: "patrycja-sudwoj-bolenska",
    starnawska: "jolanta-starnawska",
    kaszuba: "katarzyna-kaszuba",
    klimkiewicz: "agata-klimkiewicz",
    wegner: "dagmara-wegner",
    stępińska: "iwona-stepinska",
    stepinska: "iwona-stepinska",
    janik: "izabela-janik",
    jankowska: "anna-jankowska",
    pawelczyk: "ewelina-pawelczyk",
  };
  for (const key in map) {
    if (lower.includes(key)) return map[key];
  }
  return undefined;
}
