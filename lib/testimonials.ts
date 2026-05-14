/**
 * Opinie klientów. Wszystkie prawdziwe, pobrane z trojmiasto.pl
 * (oraz wcześniej z Google). Pełne cytaty, agentki dopasowane do team.ts.
 */

export type Testimonial = {
  id: string;
  body: string;
  /** Pełna wersja cytatu (dla featured). Jeśli brak. Używamy body. */
  bodyLong?: string;
  author: string;
  role?: string;
  agentSlug?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  source?: "google" | "facebook" | "trojmiasto" | "panorama" | "gowork" | "polecenie";
  date: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    body:
      "Niesamowite i szybkie rezultaty. Sprzedaż w ciągu 2 tygodni od podpisania umowy. Profesjonalne podejście do klienta, transparentna umowa. Mogę polecić każdemu, kto chce sprzedać nieruchomość bez nerwów.",
    bodyLong:
      "Niesamowite i szybkie rezultaty. Sprzedaż w ciągu 2 tygodni od podpisania umowy z biurem. Profesjonalne podejście do klienta, transparentna umowa. Mogę polecić każdemu, kto chce sprzedać nieruchomość bez nerwów.",
    author: "Marta K.",
    role: "Sprzedaż mieszkania · Gdynia Orłowo",
    agentSlug: "anna-jankowska",
    rating: 5,
    source: "trojmiasto",
    date: "2026-03",
  },
  {
    id: "t2",
    body:
      "Pani Patrycja jest cudownym pośrednikiem i człowiekiem. Wspiera na każdym etapie procesu poszukiwania. Polecam z pełnym przekonaniem.",
    bodyLong:
      "Pani Patrycja jest cudownym pośrednikiem i człowiekiem. Wspiera na każdym etapie procesu poszukiwania nieruchomości. Można polegać na jej wiedzy i intuicji. Polecam z pełnym przekonaniem.",
    author: "Małgorzata Zięba",
    role: "Zakup nieruchomości · Trójmiasto",
    agentSlug: "patrycja-sudwoj-bolenska",
    rating: 5,
    source: "trojmiasto",
    date: "2025-08",
  },
  {
    id: "t3",
    body:
      "Pani Kaszuba profesjonalnie przeprowadziła mnie przez cały proces sprzedaży. To była czysta przyjemność.",
    bodyLong:
      "Pani Kaszuba profesjonalnie przeprowadziła mnie przez cały proces sprzedaży nieruchomości. Każdy szczegół był dopięty na ostatni guzik. Atmosfera spotkań, kontakt, terminy. To była czysta przyjemność.",
    author: "Magdalena",
    role: "Sprzedaż mieszkania · Trójmiasto",
    agentSlug: "katarzyna-kaszuba",
    rating: 5,
    source: "trojmiasto",
    date: "2026-04",
  },
  {
    id: "t4",
    body:
      "Pani Agata była bardzo zaangażowana, dbała o każdy szczegół. Wspierała mnie w całym procesie.",
    bodyLong:
      "Pani Agata Klimkiewicz była bardzo zaangażowana, dbała o każdy szczegół. Wspierała mnie w całym procesie sprzedaży, odpowiadała na pytania o każdej porze, znalazła odpowiedniego kupującego.",
    author: "Iwona Gromek",
    role: "Sprzedaż mieszkania · Gdynia",
    agentSlug: "agata-klimkiewicz",
    rating: 5,
    source: "trojmiasto",
    date: "2026-04",
  },
  {
    id: "t5",
    body:
      "Chciałam serdecznie podziękować Pani Iwonie za tak szybkie znalezienie dla mnie świetnego mieszkania.",
    bodyLong:
      "Chciałam serdecznie podziękować Pani Iwonie Stępińskiej za tak szybkie znalezienie dla mnie świetnego mieszkania. Dopasowała się do moich potrzeb, sprawdziła wszystko pod kątem prawnym. Bezstresowa transakcja.",
    author: "Agnieszka",
    role: "Wynajem mieszkania · Trójmiasto",
    agentSlug: "iwona-stepinska",
    rating: 5,
    source: "trojmiasto",
    date: "2026-03",
  },
  {
    id: "t6",
    body:
      "Serdecznie polecam Panią Katarzynę Kaszubę. Bardzo pomocna, sympatyczna, uśmiechnięta. Profesjonalna we wszystkim co robi.",
    bodyLong:
      "Serdecznie polecam Panią Katarzynę Kaszubę. Bardzo pomocna, sympatyczna, uśmiechnięta. Profesjonalna we wszystkim co robi. Cały proces sprzedaży prowadziła z najwyższą starannością.",
    author: "Patrycja Kunecka",
    role: "Sprzedaż mieszkania · Trójmiasto",
    agentSlug: "katarzyna-kaszuba",
    rating: 5,
    source: "trojmiasto",
    date: "2025-11",
  },
  {
    id: "t7",
    body:
      "Profesjonalna i miła obsługa ze strony Pani Iwony. Dbałość o interes zarówno najemcy, jak i wynajmującego.",
    bodyLong:
      "Profesjonalna i miła obsługa ze strony Pani Iwony Stępińskiej. Dbałość o interes zarówno najemcy, jak i wynajmującego. Polecam z czystym sumieniem każdemu, kto szuka uczciwego pośrednika.",
    author: "Piotr Sadowski",
    role: "Wynajem mieszkania · Trójmiasto",
    agentSlug: "iwona-stepinska",
    rating: 5,
    source: "trojmiasto",
    date: "2026-03",
  },
  {
    id: "t8",
    body:
      "Z pełnym przekonaniem polecam współpracę z biurem. Pani Agata Klimkiewicz prowadziła moją sprawę wzorowo.",
    bodyLong:
      "Z pełnym przekonaniem polecam współpracę z biurem nieruchomości Starnawska Boleńska. Pani Agata Klimkiewicz prowadziła moją sprawę wzorowo. Od wyceny, przez pokazy, po finalizację. Pełen profesjonalizm.",
    author: "Sylwia Witkowska",
    role: "Sprzedaż mieszkania · Gdynia",
    agentSlug: "agata-klimkiewicz",
    rating: 5,
    source: "trojmiasto",
    date: "2026-03",
  },
  {
    id: "t9",
    body:
      "Pani Katarzyna Kaszuba. Zaangażowana, dokładna i przewidująca. Mogę z czystym sumieniem polecić.",
    bodyLong:
      "Z pełnym przekonaniem polecamy współpracę z Panią Katarzyną Kaszubą. Zaangażowana, dokładna i przewidująca. Każdy szczegół pod kontrolą. Mogę z czystym sumieniem polecić każdemu sprzedającemu.",
    author: "Beata Sikorska",
    role: "Sprzedaż mieszkania · Trójmiasto",
    agentSlug: "katarzyna-kaszuba",
    rating: 5,
    source: "trojmiasto",
    date: "2026-02",
  },
  {
    id: "t10",
    body:
      "W tym biurze kupowałem i sprzedawałem nieruchomość. Polecam. Praktycznie wszystko załatwialiśmy zdalnie.",
    bodyLong:
      "W tym biurze kupowałem jak i sprzedawałem nieruchomość. Polecam szczególnie za to, że praktycznie wszystko załatwialiśmy zdalnie. Nie musiałem latać do Polski na pokazy. Wszystko sprawnie i bezpiecznie.",
    author: "Damian Grądecki",
    role: "Sprzedaż i zakup · Trójmiasto",
    agentSlug: "patrycja-sudwoj-bolenska",
    rating: 5,
    source: "trojmiasto",
    date: "2026-02",
  },
  {
    id: "t11",
    body:
      "Katarzyna Kaszuba to wyjątkowo profesjonalna i skuteczna pośredniczka. Wszystko poszło sprawnie.",
    bodyLong:
      "Pani Katarzyna Kaszuba to wyjątkowo profesjonalna i skuteczna pośredniczka. Wszystko poszło sprawnie, transparentnie, bez stresu. Cena finalna lepsza niż się spodziewałem.",
    author: "Czesław Smyk",
    role: "Sprzedaż mieszkania · Trójmiasto",
    agentSlug: "katarzyna-kaszuba",
    rating: 5,
    source: "trojmiasto",
    date: "2025-10",
  },
  {
    id: "t12",
    body:
      "Jestem bardzo zadowolona ze współpracy z panią Patrycją. Robiła wszystko szybko i z uśmiechem.",
    bodyLong:
      "Jestem bardzo zadowolona ze współpracy z panią Patrycją Sudwoj-Boleńską. Każdą sprawę załatwiała szybko i z uśmiechem. Czuć było, że zna swoją robotę. Polecam każdemu kto szuka uczciwego biura.",
    author: "Aleksandra",
    role: "Zakup mieszkania · Sopot",
    agentSlug: "patrycja-sudwoj-bolenska",
    rating: 5,
    source: "trojmiasto",
    date: "2025-09",
  },
];
