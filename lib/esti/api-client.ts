/**
 * Klient EstiCRM API (metoda company + token).
 *
 * Źródło dokumentacji: oficjalny PDF "EstiAPI v1.5"
 *   https://przetestuj.esticrm.pl/docs/EstiCRM-API-dokumentacja-techniczna.pdf
 *
 * Z dokumentacji (sekcja "Wstęp"):
 *   - Base URL: https://app.esticrm.pl/apiClient
 *   - Obowiązkowe parametry autoryzacyjne (GET lub POST) dołączane do KAŻDEGO wywołania:
 *       company - identyfikator firmy
 *       token   - hash zabezpieczający
 *   - Parametry dostępne w EstiCRM → Ustawienia → Dane firmowe.
 *
 * Endpointy ofert (wszystkie GET, odpowiedź JSON):
 *   GET /offer/list           - pełne informacje o ofertach (paginacja skip/take, filtr status, updateDate)
 *   GET /offer/basic-list     - podstawowe info (status, updateDate)
 *   GET /offer/exported-list  - tylko oferty eksportowane na www
 *   GET /offer/details        - szczegóły jednej oferty (param: id)
 *
 * Format odpowiedzi /offer/list:
 *   { "success": true, "count": 10, "totalCount": 47, "data": [ { ...oferta... } ] }
 *
 * UWAGA: API zwraca JSON (NIE EstiCRM XML jak eksport FTP). Pola są płaskie
 * (np. mainTypeId, transaction, market, pricePermeter), więc do mapowania
 * używamy `mapApiOffersToOffers` z ./api-mapper, a nie `parseEstiXml`.
 */

const BASE_URL = "https://app.esticrm.pl/apiClient";

const trim = (s?: string) => (s ?? "").trim();

type EstiApiConfig = {
  company: string;
  token: string;
};

function getConfig(): EstiApiConfig {
  const company = trim(process.env.ESTI_API_COMPANY);
  const token = trim(process.env.ESTI_API_TOKEN);
  if (!company || !token) {
    throw new Error(
      "ESTI API nie skonfigurowany. Ustaw ESTI_API_COMPANY oraz ESTI_API_TOKEN w .env.local (dane Dom Hunter z panelu EstiCRM)."
    );
  }
  return { company, token };
}

/**
 * Surowy rekord oferty zwracany przez /offer/list.
 * Mapowanie do typu Offer w ./api-mapper. Trzymamy luźny typ, bo API ma ~270 pól
 * i zwraca je jako płaskie wartości (string | number | null).
 */
export type EstiApiOffer = Record<string, unknown>;

type OfferListResponse = {
  success?: boolean;
  count?: number;
  totalCount?: number;
  data?: EstiApiOffer[];
};

export type FetchEstiOffersOptions = {
  /**
   * Lista statusów ofert (numerycznie, po przecinku).
   * Domyślnie "3,99" = aktywne publikowane (3) + aktywne wewnętrzne (99),
   * zgodnie z przykładem w dokumentacji EstiAPI v1.5.
   */
  status?: string;
  /** Liczba rekordów do pobrania w jednej stronie (paginacja). Domyślnie 100. */
  take?: number;
  /** Liczba rekordów do pominięcia (paginacja). Domyślnie 0. */
  skip?: number;
  /** Opcjonalny filtr "tylko zmienione po" w formacie YYYY-MM-DD HH:MM:SS. */
  updateDate?: string;
  /**
   * Gdy ustawione: Next cache'uje odpowiedź API na N sekund (Data Cache / ISR),
   * dzięki czemu oferty odświeżają się automatycznie bez crona. Gdy puste: "no-store".
   */
  revalidateSeconds?: number;
};

function buildUrl(path: string, params: Record<string, string | number | undefined>): string {
  const { company, token } = getConfig();
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("company", company);
  url.searchParams.set("token", token);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  }
  return url.toString();
}

/**
 * Pobiera JEDNĄ stronę ofert (GET /offer/list).
 * Reużywa globalnego fetch (Node/Next), zero zależności npm.
 */
async function fetchOfferListPage(opts: FetchEstiOffersOptions): Promise<OfferListResponse> {
  const url = buildUrl("/offer/list", {
    status: opts.status ?? "3,99",
    take: opts.take ?? 100,
    skip: opts.skip ?? 0,
    updateDate: opts.updateDate,
  });

  const cacheOpts =
    opts.revalidateSeconds != null
      ? { next: { revalidate: opts.revalidateSeconds } }
      : { cache: "no-store" as const };

  // Timeout: API Esti bywa wolne (~4 s). Bez limitu zawieszony request wiesza
  // całą stronę (Vercel function timeout). Z limitem -> fetch rzuca -> loadFromApi
  // zwraca null -> readOffers przełącza się na snapshot data/offers.json.
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7000);
  let res: Response;
  try {
    res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
      ...cacheOpts,
    });
  } finally {
    clearTimeout(timeoutId);
  }

  if (!res.ok) {
    throw new Error(`ESTI API /offer/list zwróciło HTTP ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as OfferListResponse;
  if (json.success === false) {
    throw new Error("ESTI API /offer/list: success=false (sprawdź company/token i uprawnienia).");
  }
  return json;
}

/**
 * Pobiera WSZYSTKIE oferty z /offer/list, stronicując po `totalCount`.
 * Zwraca surowe rekordy JSON (do zmapowania przez ./api-mapper).
 *
 * Bezpiecznik: max 50 stron (5000 ofert przy take=100), żeby nie zapętlić się
 * na błędnej odpowiedzi API.
 */
export async function fetchEstiOffersJson(
  opts: Omit<FetchEstiOffersOptions, "skip"> = {}
): Promise<EstiApiOffer[]> {
  const take = opts.take ?? 100;
  const all: EstiApiOffer[] = [];
  let skip = 0;
  let totalCount = Infinity;
  const MAX_PAGES = 50;

  for (let page = 0; page < MAX_PAGES; page++) {
    const res = await fetchOfferListPage({ ...opts, take, skip });
    const data = Array.isArray(res.data) ? res.data : [];
    all.push(...data);

    if (typeof res.totalCount === "number") totalCount = res.totalCount;
    skip += take;

    // Koniec: pobraliśmy tyle ile zapowiada totalCount, albo strona pusta/niepełna.
    if (data.length === 0 || all.length >= totalCount || data.length < take) break;
  }

  return all;
}
