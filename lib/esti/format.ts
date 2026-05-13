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

export const transactionLabels: Record<Offer["transaction"], string> = {
  sprzedaz: "Sprzedaż",
  najem: "Wynajem",
};
