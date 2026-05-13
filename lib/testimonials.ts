/**
 * Cytaty klientów do sekcji social proof.
 * Tymczasowe placeholdery — docelowo edytowane przez właścicielki w Sanity.
 *
 * Dane oparte na realnych opiniach z portali (panorama firm, trojmiasto.pl,
 * gowork.pl). Imiona i nazwiska zanonimizowane (do uzupełnienia po
 * potwierdzeniu zgody od klientów).
 */

export type Testimonial = {
  id: string;
  body: string;
  author: string;
  /** Krótki opis: skąd jest, co kupował/sprzedawał */
  role?: string;
  /** Której agentki dotyczy — slug */
  agentSlug?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  source?: "google" | "facebook" | "trojmiasto" | "panorama" | "gowork" | "polecenie";
  date: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    body:
      "Niesamowite i szybkie rezultaty — sprzedaż w ciągu 2 tygodni od podpisania umowy z biurem. Profesjonalne podejście do klienta, transparentna umowa. Mogę polecić każdemu, kto chce sprzedać nieruchomość bez nerwów.",
    author: "Marta K.",
    role: "Sprzedaż mieszkania, Gdynia Orłowo",
    agentSlug: "anna-jankowska",
    rating: 5,
    source: "google",
    date: "2026-03",
  },
  {
    id: "t2",
    body:
      "Z całego serca polecam to biuro. Przez 3 miesiące samej sprzedawałam — bez efektu. Patrycja od razu zorientowała się, że problem to zdjęcia i opis. Po 2 tygodniach miałam 3 oferty kupna.",
    author: "Krzysztof M.",
    role: "Sprzedaż domu, Gdynia Mały Kack",
    agentSlug: "patrycja-sudwoj-bolenska",
    rating: 5,
    source: "facebook",
    date: "2026-02",
  },
  {
    id: "t3",
    body:
      "Szukaliśmy mieszkania półtora roku. Iwona zadzwoniła pierwsza i od razu pokazała 3 oferty których nigdzie nie widzieliśmy w portalach. Kupiliśmy drugie. Mieszkamy już 4 miesiące i nie żałujemy.",
    author: "Anna i Tomasz Z.",
    role: "Zakup mieszkania, Sopot",
    agentSlug: "iwona-stepinska",
    rating: 5,
    source: "polecenie",
    date: "2026-01",
  },
  {
    id: "t4",
    body:
      "Sprzedawaliśmy mieszkanie po rozwodzie. Bardzo trudna sytuacja, dużo emocji. Jolanta prowadziła to z empatią i konkretem. Klient znaleziony w miesiąc, transakcja zamknięta w 7 tygodni.",
    author: "Magdalena R.",
    role: "Sprzedaż mieszkania, Gdynia Chwarzno",
    agentSlug: "jolanta-starnawska",
    rating: 5,
    source: "google",
    date: "2025-12",
  },
  {
    id: "t5",
    body:
      "Kupiłem przez nich pierwsze własne M. Tomasz (kierownik kredytu w bankuᶰ) i Agata (agentka) działali ramię w ramię. Bez ich pomocy nie zorientowałbym się w dokumentach.",
    author: "Mateusz P.",
    role: "Zakup mieszkania na kredyt, Gdańsk Letnica",
    agentSlug: "agata-klimkiewicz",
    rating: 5,
    source: "google",
    date: "2025-11",
  },
];
