/**
 * Zespół Starnawska & Boleńska.
 *
 * To są tymczasowe dane (placeholdery) — docelowo agentki będą zarządzane
 * z panelu Sanity Studio przez Patrycję i Jolantę.
 *
 * Dopasowanie zdjęć do imion wymaga weryfikacji od klienta (Darek/właścicielki).
 */

export type TeamMember = {
  slug: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  shortRole?: string;
  photo: string;
  email?: string;
  phone?: string;
  phoneDisplay?: string;
  languages?: string[];
  specializations?: string[];
  bio: string;
  /** Krótki cytat na hero podstrony */
  quote?: string;
  /** Czy współwłaścicielka */
  isOwner?: boolean;
  /** Lata doświadczenia */
  yearsExperience?: number;
  /** Kolejność wyświetlania na liście */
  order: number;
};

export const team: TeamMember[] = [
  {
    slug: "patrycja-sudwoj-bolenska",
    firstName: "Patrycja",
    lastName: "Sudwój-Boleńska",
    fullName: "Patrycja Sudwój-Boleńska",
    role: "Współwłaścicielka, pośrednik nieruchomości",
    shortRole: "Współwłaścicielka",
    photo: "/team/patrycja-sudwoj-bolenska.jpg",
    phone: "+48 532 843 660",
    phoneDisplay: "532 843 660",
    bio: "Współzałożycielka biura. Specjalizacja w rynku pierwotnym, współpraca z deweloperami, transakcje pod klucz. Stawia na transparentność i długofalowe relacje.",
    quote: "Lider to przede wszystkim zobowiązanie. Wobec klientów, zespołu, miasta.",
    isOwner: true,
    order: 1,
  },
  {
    slug: "jolanta-starnawska",
    firstName: "Jolanta",
    lastName: "Starnawska",
    fullName: "Jolanta Starnawska",
    role: "Współwłaścicielka, pośrednik nieruchomości",
    shortRole: "Współwłaścicielka",
    photo: "/team/jolanta-starnawska.jpg",
    phone: "+48 608 692 552",
    phoneDisplay: "608 692 552",
    bio: "Współzałożycielka biura. Sprzedaż i wynajem mieszkań w Trójmieście, doradztwo dla osób relokujących się z innych miast.",
    quote: "Najlepsza transakcja to taka, po której klient wraca. Albo poleca nas znajomym.",
    isOwner: true,
    order: 2,
  },
  {
    slug: "katarzyna-kaszuba",
    firstName: "Katarzyna",
    lastName: "Kaszuba",
    fullName: "Katarzyna Kaszuba",
    role: "Pośrednik nieruchomości",
    photo: "/team/katarzyna-kaszuba.jpg",
    phone: "+48 668 305 552",
    phoneDisplay: "668 305 552",
    languages: ["polski", "angielski"],
    bio: "W 2022 roku związała życie prywatne i zawodowe z Trójmiastem. Zawód pośrednika idealnie wpisuje się w jej zainteresowania. Obsługa klientów anglojęzycznych.",
    quote: "Energiczna, kocham kontakt z ludźmi. Każda transakcja to nowa historia.",
    order: 3,
  },
  {
    slug: "agata-klimkiewicz",
    firstName: "Agata",
    lastName: "Klimkiewicz",
    fullName: "Agata Klimkiewicz",
    role: "Pośrednik nieruchomości",
    photo: "/team/agata-klimkiewicz.jpg",
    phone: "+48 530 518 448",
    phoneDisplay: "530 518 448",
    bio: "Humanistka z zamiłowania. Wsłuchuje się w człowieka i jego potrzeby, kieruje się myślą: człowiekiem jestem i nic, co ludzkie nie jest mi obce.",
    quote: "Ciągle głodna wiedzy. W nieruchomościach najbardziej interesuje mnie człowiek.",
    order: 4,
  },
  {
    slug: "dagmara-wegner",
    firstName: "Dagmara",
    lastName: "Wegner",
    fullName: "Dagmara Wegner",
    role: "Pośrednik nieruchomości, wsparcie zarządu",
    shortRole: "Wsparcie zarządu",
    photo: "/team/dagmara-wegner.jpg",
    phone: "+48 795 579 585",
    phoneDisplay: "795 579 585",
    bio: "Łączy doświadczenie w księgowości, zarządzaniu jakością ISO i pośrednictwie z dokładnością i skutecznością. Wsparcie operacyjne zarządu.",
    order: 5,
  },
  {
    slug: "iwona-stepinska",
    firstName: "Iwona",
    lastName: "Stępińska",
    fullName: "Iwona Stępińska",
    role: "Pośrednik nieruchomości",
    photo: "/team/iwona-stepinska.jpg",
    phone: "+48 530 521 572",
    phoneDisplay: "530 521 572",
    yearsExperience: 10,
    bio: "Pośrednik z wieloletnim doświadczeniem. Stawia na rozwój, jakość i profesjonalizm. Do każdego zlecenia podchodzi nieszablonowo.",
    quote: "Praca jest moją pasją. Uwielbiam kontakt z ludźmi.",
    order: 6,
  },
  {
    slug: "izabela-janik",
    firstName: "Izabela",
    lastName: "Janik",
    fullName: "Izabela Janik",
    role: "Pośrednik nieruchomości, grunty i mieszkania",
    shortRole: "Grunty i mieszkania",
    photo: "/team/izabela-janik.jpg",
    phone: "+48 577 316 688",
    phoneDisplay: "577 316 688",
    yearsExperience: 17,
    bio: "W nieruchomościach pracuje od 17 lat. Sprzedaż nieruchomości gruntowych i mieszkaniowych. Każda transakcja to misja, która daje satysfakcję.",
    quote: "Pragnę pomagać ludziom. To dla mnie misja, nie zawód.",
    order: 7,
  },
  {
    slug: "anna-jankowska",
    firstName: "Anna",
    lastName: "Jankowska",
    fullName: "Anna Jankowska",
    role: "Pośrednik nieruchomości",
    photo: "/team/anna-jankowska.jpg",
    phone: "+48 733 875 566",
    phoneDisplay: "733 875 566",
    bio: "Specjalizacja w sprzedaży nieruchomości. Profesjonalne podejście, transparentne umowy, szybkie rezultaty.",
    order: 8,
  },
  {
    slug: "ewelina-pawelczyk",
    firstName: "Ewelina",
    lastName: "Pawelczyk",
    fullName: "Ewelina Pawelczyk",
    role: "Pośrednik nieruchomości",
    photo: "/team/ewelina-pawelczyk.jpg",
    phone: "+48 530 482 592",
    phoneDisplay: "530 482 592",
    bio: "Nieruchomości fascynowały ją na długo przed pracą jako agent. Latami analizowała rynek prywatnie, uczestniczyła w transakcjach, przygotowywała własne projekty.",
    quote: "Poza pracą kocham podróże i dobrą kawę. W nieruchomościach — szczerą rozmowę.",
    order: 9,
  },
];

export function getMemberBySlug(slug: string): TeamMember | undefined {
  return team.find((m) => m.slug === slug);
}

export function getOwners(): TeamMember[] {
  return team.filter((m) => m.isOwner).sort((a, b) => a.order - b.order);
}

export function getAgents(): TeamMember[] {
  return team.filter((m) => !m.isOwner).sort((a, b) => a.order - b.order);
}

export function getAllMembersSorted(): TeamMember[] {
  return [...team].sort((a, b) => a.order - b.order);
}
