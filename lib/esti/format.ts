import type { Offer } from "./types";

export function formatPrice(value: number, currency: "PLN" = "PLN"): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPricePerSqm(value: number): string {
  return new Intl.NumberFormat("pl-PL", {
    maximumFractionDigits: 0,
  }).format(value) + " zł/m²";
}

export function formatArea(m2: number): string {
  return new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 1 }).format(m2) + " m²";
}

export function offerTitle(o: Offer): string {
  if (o.title && o.title.length > 8) return o.title;
  return generateTitle(o);
}

function generateTitle(o: Offer): string {
  const typeMap: Record<Offer["type"], string> = {
    mieszkanie: "Mieszkanie",
    dom: "Dom",
    dzialka: "Działka",
    lokal: "Lokal",
    garaz: "Garaż",
    inne: "Nieruchomość",
  };
  const transactionLabel = o.transaction === "najem" ? "wynajem" : "sprzedaż";
  return `${typeMap[o.type]} ${transactionLabel}, ${formatArea(o.area)}, ${o.city}`;
}

export const typeLabels: Record<Offer["type"], string> = {
  mieszkanie: "Mieszkanie",
  dom: "Dom",
  dzialka: "Działka",
  lokal: "Lokal użytkowy",
  garaz: "Garaż",
  inne: "Inne",
};

/**
 * Etykieta typu z uwzględnieniem podtypu z ESTI.
 * Używamy na kartach (Działka budowlana, Lokal handlowy, Dom wolnostojący...).
 */
export function typeLabel(o: Pick<Offer, "type" | "typeDetail">): string {
  if (!o.typeDetail) return typeLabels[o.type];

  const d = o.typeDetail.toLowerCase();
  if (o.type === "dzialka") {
    if (d.includes("rekreacyj")) return "Działka rekreacyjna";
    if (d.includes("pod zabud") || d.includes("budowlan") || d.includes("mieszkani"))
      return "Działka budowlana";
    if (d.includes("usług") || d.includes("komerc")) return "Działka usługowa";
    if (d.includes("rolna") || d.includes("rolnicz")) return "Działka rolna";
    if (d.includes("leśna") || d.includes("lesna")) return "Działka leśna";
    return "Działka";
  }
  if (o.type === "dom") {
    if (d.includes("wolnost")) return "Dom wolnostojący";
    if (d.includes("bliźniak") || d.includes("blizniak")) return "Bliźniak";
    if (d.includes("segment")) return "Segment";
    if (d.includes("szeregowiec")) return "Szeregowiec";
    if (d.includes("kamienic")) return "Kamienica";
    return "Dom";
  }
  if (o.type === "lokal") {
    if (d.includes("magazyn")) return "Magazyn";
    if (d.includes("handlow") || d.includes("usługow") || d.includes("uslugow"))
      return "Lokal użytkowy";
    if (d.includes("biuro")) return "Biuro";
    if (d.includes("gastronom")) return "Gastronomia";
    return "Lokal użytkowy";
  }
  if (o.type === "garaz") {
    if (d.includes("miejsce")) return "Miejsce postojowe";
    return "Garaż";
  }
  return typeLabels[o.type];
}

export const transactionLabels: Record<Offer["transaction"], string> = {
  sprzedaz: "Sprzedaż",
  najem: "Wynajem",
};
