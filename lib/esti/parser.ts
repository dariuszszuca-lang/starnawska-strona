import { XMLParser } from "fast-xml-parser";
import AdmZip from "adm-zip";
import { put } from "@vercel/blob";
import type { Offer, OfferType, OfferTransaction, OfferMarket, OfferImage } from "./types";

/**
 * Parser EstiCRMXml — format natywny ESTI (wersja angielska, z dictionaries).
 *
 * Struktura: <offers><offer>...</offer></offers>
 * Każda oferta ma ~270 pól. Mapujemy najważniejsze.
 *
 * Niektóre pola to obiekty {#text: '132', @_dictionary: 'transaction'}
 * — dictionary lookup. Hardkodujemy znane wartości.
 */

const xml = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  parseTagValue: false,
  trimValues: true,
  isArray: (name) => ["offer", "picture"].includes(name),
});

type RawValue =
  | string
  | number
  | boolean
  | null
  | { "#text"?: string | number; "@_dictionary"?: string; [k: string]: unknown };
type RawOffer = Record<string, RawValue | RawValue[]>;

/**
 * Rozpakowuje paczkę ZIP z FTP, znajduje XML + wszystkie obrazy.
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
      // Klucz: nazwa pliku (bez folderów)
      const baseName = entry.entryName.split("/").pop() ?? entry.entryName;
      images.set(baseName, entry.getData());
    }
  }

  return { xmlText, images };
}

/**
 * Wgrywa zdjęcia do Vercel Blob i zwraca mapping fileName -> URL.
 * Robione przed parsowaniem ofert.
 */
export async function uploadImages(
  imagesMap: Map<string, Buffer>
): Promise<Map<string, string>> {
  const result = new Map<string, string>();
  // Limit: nie wgrywać wszystkich (może być setki) - max 6 per oferta przy parsowaniu
  // Ale tu jeszcze nie wiemy ile per oferta — wgrywamy wszystkie.
  // Concurrent uploads w paczkach po 5 żeby nie zarzynać Vercel Blob API.
  const entries = Array.from(imagesMap.entries());
  const BATCH = 5;
  for (let i = 0; i < entries.length; i += BATCH) {
    const batch = entries.slice(i, i + BATCH);
    const uploaded = await Promise.all(
      batch.map(async ([name, data]) => {
        try {
          const blob = await put(`esti-images/${name}`, data, {
            access: "private",
            addRandomSuffix: false,
            allowOverwrite: true,
            contentType: name.endsWith(".png")
              ? "image/png"
              : name.endsWith(".webp")
                ? "image/webp"
                : "image/jpeg",
          });
          return [name, blob.url] as const;
        } catch {
          return null;
        }
      })
    );
    for (const u of uploaded) if (u) result.set(u[0], u[1]);
  }
  return result;
}

/**
 * Parsuje XML EstiCRM i zwraca tablicę ofert.
 * imageUrls: mapping fileName -> public URL (po uploadzie).
 */
export function parseEstiXml(xmlText: string, imageUrls: Map<string, string> = new Map()): Offer[] {
  const parsed = xml.parse(xmlText) as { offers?: { offer?: RawOffer[] } };
  const offers = parsed.offers?.offer ?? [];
  if (!Array.isArray(offers)) return [];
  return offers.map((raw) => mapRawToOffer(raw, imageUrls)).filter((o): o is Offer => o !== null);
}

function mapRawToOffer(raw: RawOffer, imageUrls: Map<string, string>): Offer | null {
  const id = str(raw.id);
  if (!id) return null;

  const price = num(raw.price) ?? 0;
  const area = num(raw.areaTotal) ?? num(raw.areaUsable) ?? 0;
  const transaction = mapTransaction(raw.transaction);
  const type = mapType(str(raw.typeName), raw.mainTypeId);
  const market = mapMarket(raw.market);

  // Zdjęcia
  const picturesRaw = raw.pictures as { picture?: RawValue[] } | undefined;
  const pictureItems = Array.isArray(picturesRaw?.picture)
    ? picturesRaw.picture
    : picturesRaw?.picture
      ? [picturesRaw.picture]
      : [];

  const images: OfferImage[] = pictureItems
    .map((p, i): OfferImage | null => {
      const fileName = typeof p === "object" && p ? str((p as Record<string, unknown>)["#text"]) : str(p);
      if (!fileName) return null;
      const url = imageUrls.get(fileName);
      if (!url) return null;
      return { url, primary: i === 0 };
    })
    .filter((x): x is OfferImage => x !== null);

  // Adres
  const streetType = str(raw.locationStreetType);
  const streetName = str(raw.locationStreetName);
  const street = [streetType, streetName].filter(Boolean).join(" ") || undefined;

  const city = str(raw.locationCityName) || "Trójmiasto";
  const district = str(raw.locationPrecinctName) || str(raw.locationDistrictName) || undefined;

  // Agent
  const agentName = [str(raw.contactFirstname), str(raw.contactLastname)].filter(Boolean).join(" ");

  // Tytuł: portalTitle (krótki dla portali) jest najczęściej najlepszy
  const title =
    str(raw.portalTitle) ||
    str(raw.portalWwwTitle) ||
    generateTitle(type, area, city);

  // Opis: HTML → tekst (usuwamy <br>, <strong>)
  const descriptionHtml = str(raw.descriptionWebsite) || str(raw.description) || "";
  const description = htmlToPlainText(descriptionHtml);

  const pricePerSqm = num(raw.pricePermeter) ?? (area > 0 ? Math.round(price / area) : undefined);

  return {
    id,
    offerNumber: str(raw.numberPrime) || str(raw.number),
    transaction,
    type,
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

    images,
    features: extractFeatures(raw),

    agent: agentName
      ? {
          fullName: agentName,
          phone: str(raw.contactPhone) || undefined,
          email: str(raw.contactEmail) || undefined,
          slug: matchAgentSlug(agentName),
        }
      : undefined,

    url: `https://starnawska.pl/oferty/${id}`,
    createdAt: str(raw.addDate) || new Date().toISOString(),
    updatedAt: str(raw.updateDate) || str(raw.activateDate) || new Date().toISOString(),
  };
}

// ----- helpers -----

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

/**
 * Dictionary mapping dla transaction.
 * Z obserwacji XML: 132 = wynajem (cena ~3000zł/mc), inne = sprzedaż.
 */
function mapTransaction(v: unknown): OfferTransaction {
  const txt = typeof v === "object" && v ? str((v as Record<string, unknown>)["#text"]) : str(v);
  // ESTI dictionary: 132 = wynajem; 130, 131 = sprzedaż
  if (txt === "132") return "najem";
  return "sprzedaz";
}

/**
 * Mapping typu oferty. Używamy stringa typeName jako głównego źródła.
 */
function mapType(typeName: string, mainTypeIdObj: unknown): OfferType {
  const v = typeName.toLowerCase();
  if (v.includes("mieszkani") || v.includes("apartament")) return "mieszkanie";
  if (v.includes("dom") || v.includes("willa")) return "dom";
  if (v.includes("dzialk") || v.includes("działk") || v.includes("grunt")) return "dzialka";
  if (v.includes("lokal") || v.includes("komerc") || v.includes("biuro")) return "lokal";
  if (v.includes("garaz") || v.includes("garaż")) return "garaz";

  // Fallback przez mainTypeId
  const id =
    typeof mainTypeIdObj === "object" && mainTypeIdObj
      ? str((mainTypeIdObj as Record<string, unknown>)["#text"])
      : str(mainTypeIdObj);
  switch (id) {
    case "1":
      return "dom";
    case "2":
      return "mieszkanie";
    case "3":
      return "dzialka";
    case "4":
      return "lokal";
    case "5":
      return "garaz";
    default:
      return "inne";
  }
}

function mapMarket(v: unknown): OfferMarket | undefined {
  const txt = typeof v === "object" && v ? str((v as Record<string, unknown>)["#text"]) : str(v);
  // ESTI dictionary: 11 = wtórny, 12 = pierwotny (zgaduję)
  if (txt === "12") return "pierwotny";
  if (txt === "11") return "wtorny";
  return undefined;
}

function mapBuildingCondition(v: unknown): string | undefined {
  const txt = typeof v === "object" && v ? str((v as Record<string, unknown>)["#text"]) : str(v);
  // ESTI dictionary buildingCondition - mapping nieznany, zwracamy raw
  const map: Record<string, string> = {
    "61": "do wprowadzenia",
    "62": "do odświeżenia",
    "63": "do remontu",
    "64": "deweloperski",
    "65": "surowy",
  };
  return map[txt];
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

function extractFeatures(raw: RawOffer): string[] | undefined {
  // ESTI: setki binary pól typu neighborhoodPark = '1', communicationTram = '1' itp.
  // Mapujemy najbardziej istotne.
  const featureMap: Array<[string, string]> = [
    ["recreationForest", "Las w pobliżu"],
    ["recreationPark", "Park w pobliżu"],
    ["recreationLake", "Jezioro w pobliżu"],
    ["recreationSea", "Morze w pobliżu"],
    ["communicationTram", "Tramwaj"],
    ["communicationBus", "Autobus"],
    ["communicationSuburbanrailway", "Kolejka SKM"],
    ["communicationRailway", "Kolej"],
    ["neighborhoodShoppingcenter", "Centrum handlowe"],
    ["neighborhoodKindergarten", "Przedszkole"],
    ["neighborhoodPrimaryschool", "Szkoła podstawowa"],
    ["neighborhoodGrocery", "Sklep spożywczy"],
    ["neighborhoodPharmacy", "Apteka"],
    ["neighborhoodPlayground", "Plac zabaw"],
    ["buildingElevatornumber", "Winda"],
    ["buildingAirConditioning", "Klimatyzacja"],
    ["buildingGym", "Siłownia"],
  ];

  const result: string[] = [];
  for (const [key, label] of featureMap) {
    const v = raw[key];
    const txt = typeof v === "object" && v ? str((v as Record<string, unknown>)["#text"]) : str(v);
    // ESTI binary: '1' = TAK, '149'/'150' = TAK/NIE (zazwyczaj 1 = yes)
    if (txt === "1" || txt === "149") result.push(label);
  }
  return result.length > 0 ? result : undefined;
}

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
  for (const key in map) if (lower.includes(key)) return map[key];
  return undefined;
}
