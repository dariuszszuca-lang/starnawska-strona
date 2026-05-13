/**
 * Wewnętrzny model oferty (po sparsowaniu EstiCRMXml).
 * Tylko pola których faktycznie używamy na stronie.
 */

export type OfferTransaction = "sprzedaz" | "najem";
export type OfferType = "mieszkanie" | "dom" | "dzialka" | "lokal" | "garaz" | "inne";
export type OfferMarket = "pierwotny" | "wtorny";

export type OfferImage = {
  url: string;
  alt?: string;
  /** Czy główne zdjęcie */
  primary?: boolean;
};

export type OfferAgent = {
  /** ESTI ID agenta */
  estiId?: string;
  /** Dopasowany slug z naszego team.ts */
  slug?: string;
  fullName?: string;
  phone?: string;
  email?: string;
};

export type Offer = {
  /** Główny identyfikator (ESTI offer_id albo nasz slug) */
  id: string;
  /** Krótki numer oferty do wyświetlania (SB12345) */
  offerNumber?: string;

  transaction: OfferTransaction;
  type: OfferType;
  market?: OfferMarket;

  /** Tytuł oferty (z ESTI lub generowany) */
  title: string;
  description?: string;
  shortDescription?: string;

  /** Cena w PLN (lub czynsz dla najmu) */
  price: number;
  /** Cena za m² */
  pricePerSqm?: number;
  /** Czynsz administracyjny (osobno, dla mieszkań) */
  rent?: number;

  /** Powierzchnia w m² */
  area: number;
  /** Powierzchnia działki (jeśli dotyczy) */
  landArea?: number;

  /** Liczba pokoi */
  rooms?: number;
  /** Piętro (0 = parter) */
  floor?: number;
  /** Liczba pięter w budynku */
  totalFloors?: number;
  /** Rok budowy */
  yearBuilt?: number;

  /** Stan: do remontu / do odświeżenia / wykończone / deweloperski */
  state?: string;

  /** Lokalizacja */
  city: string;
  district?: string;
  street?: string;
  /** Współrzędne dla mapy */
  lat?: number;
  lng?: number;

  /** Zdjęcia */
  images: OfferImage[];

  /** Plan piętra (osobny, jeśli jest) */
  floorPlan?: string;

  /** Wirtualny spacer */
  virtualTour?: string;

  /** Wyposażenie / cechy */
  features?: string[];

  /** Agent prowadzący */
  agent?: OfferAgent;

  /** URL na starnawska.pl (kanoniczne) */
  url: string;

  /** Daty */
  createdAt: string;
  updatedAt: string;
};

/** Filtry wyszukiwarki — synchronizowane z URL search params */
export type OfferFilters = {
  transaction?: OfferTransaction;
  type?: OfferType;
  market?: OfferMarket;
  city?: string;
  district?: string;
  priceMin?: number;
  priceMax?: number;
  areaMin?: number;
  areaMax?: number;
  rooms?: number[];
  floorMin?: number;
  floorMax?: number;
  yearMin?: number;
  state?: string[];
  offerId?: string;
  sort?: "newest" | "price-asc" | "price-desc" | "area-asc" | "area-desc";
};

export type OffersResult = {
  items: Offer[];
  total: number;
  /** Czas ostatniej aktualizacji z ESTI */
  lastSync: string;
};
