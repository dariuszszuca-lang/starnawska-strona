/**
 * Centralne dane firmy.
 * Każda zmiana (telefon, adres, social) — TYLKO tutaj.
 */

export const siteConfig = {
  name: "Starnawska & Boleńska Nieruchomości",
  shortName: "Starnawska & Boleńska",
  tagline: "Twoje potrzeby naszym priorytetem",
  description:
    "Biuro nieruchomości w Gdyni od 2011 roku. Sprzedaż, wynajem, doradztwo. Lokalna wiedza, sprawdzone procedury, kompleksowa obsługa.",
  url: "https://starnawska.pl",
  ogImage: "/og.jpg",

  /** Adres biura */
  address: {
    street: "ul. Bytomska 14/1",
    postalCode: "81-509",
    city: "Gdynia",
    country: "Polska",
    full: "ul. Bytomska 14/1, 81-509 Gdynia",
  },

  /** Kontakt */
  contact: {
    phones: [
      { label: "Biuro", value: "+48 532 843 660", displayValue: "532 843 660", href: "tel:+48532843660" },
      { label: "Biuro", value: "+48 608 692 552", displayValue: "608 692 552", href: "tel:+48608692552" },
    ],
    email: "biuro@starnawska.pl",
    hours: "Pon–Pt, 9:00–17:00",
  },

  /** Profile zewnętrzne */
  social: {
    facebook: "https://www.facebook.com/starnawska",
    instagram: "https://www.instagram.com/starnawska.pl",
  },

  /** Geo */
  geo: {
    latitude: 54.5189,
    longitude: 18.5305,
  },

  /** Rok założenia */
  foundedYear: 2011,

  /** Liczby na hero / sekcję USP — placeholdery do potwierdzenia */
  metrics: {
    yearsActive: new Date().getFullYear() - 2011,
    transactions: "1500+",
    rating: "5.0",
    teamSize: 9,
  },
} as const;

export type SiteConfig = typeof siteConfig;
