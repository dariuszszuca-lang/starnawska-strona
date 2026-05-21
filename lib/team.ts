/**
 * Zespół Starnawska & Boleńska.
 *
 * Kolejność i treści zgodne z dokumentem `tekst_zespół_2026.docx`.
 */

export type TeamMember = {
  slug: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  shortRole?: string;
  credentialLines?: string[];
  photo?: string;
  email?: string;
  phone?: string;
  phoneDisplay?: string;
  languages?: string[];
  specializations?: string[];
  bio: string;
  bioParagraphs: string[];
  isOwner?: boolean;
  yearsExperience?: number;
  order: number;
};

export const team: TeamMember[] = [
  {
    slug: "jolanta-starnawska",
    firstName: "Jolanta",
    lastName: "Starnawska",
    fullName: "Jolanta Starnawska",
    role: "Pośrednik nieruchomości nr licencji 4855",
    shortRole: "Wspólnik",
    credentialLines: ["Pośrednik nieruchomości nr licencji 4855", "Wspólnik"],
    photo: "/team/jolanta-starnawska.jpg",
    phone: "+48 608 692 552",
    phoneDisplay: "608 692 552",
    email: "jstarnawska@starnawska.pl",
    bio: "Od 1998 roku nieprzerwanie działam na rynku nieruchomości. Moją zawodową drogę zaczynałam jako asystentka pośrednika i bardzo szybko przekonałam się, że nieruchomości to nie tylko zawód, ale przede wszystkim praca z ludźmi i towarzyszenie im w ważnych życiowych decyzjach.",
    bioParagraphs: [
      "Od 1998 roku nieprzerwanie działam na rynku nieruchomości. Moją zawodową drogę zaczynałam jako asystentka pośrednika i bardzo szybko przekonałam się, że nieruchomości to nie tylko zawód, ale przede wszystkim praca z ludźmi i towarzyszenie im w ważnych życiowych decyzjach. Dziś jestem licencjonowanym pośrednikiem nieruchomości (licencja nr 4855), wspólniczką Starnawska&Boleńska Nieruchomości oraz przedsiębiorcą, który od ponad 27 lat aktywnie działa na rynku.",
      "Przez lata miałam okazję pracować zarówno w mniejszych organizacjach, jak i dużych strukturach sieciowych. To doświadczenie pozwoliło mi spojrzeć na rynek nieruchomości z wielu perspektyw i wypracować własny model pracy oparty na profesjonalizmie, bezpieczeństwie oraz indywidualnym podejściu do klienta. Bo jestem przekonana, że nie ma dwóch takich samych transakcji – tak samo jak nie ma dwóch takich samych historii.",
      "Na co dzień wspieram klientów sprzedających, kupujących, wynajmujących oraz poszukujących nieruchomości. Pomagam przejść przez cały proces – od poznania potrzeb i przygotowania odpowiedniej strategii działania, przez negocjacje i kwestie formalno-prawne, aż po bezpieczne doprowadzenie transakcji do końca. Dla mnie współpraca nie polega wyłącznie na otwieraniu drzwi do nieruchomości. To przede wszystkim budowanie poczucia bezpieczeństwa, zaufania i relacji, które często zostają ze mną na długo po podpisaniu aktu notarialnego czy umowy najmu.",
      "To właśnie relacje są dla mnie największą wartością. Wielokrotnie słyszę od klientów, że czują się zaopiekowani od początku do końca, że potrafię słuchać, przewidywać problemy i być obok wtedy, kiedy pojawiają się emocje, stres czy trudne decyzje. I chyba właśnie to cenię najbardziej – kiedy po zakończonej współpracy klient wraca lub poleca mnie swoim bliskim.",
      "W naszej firmie od lat pracujemy zgodnie z zasadą: „Ambasadorami naszej marki są nasi klienci.” To nie jest dla mnie hasło marketingowe. To filozofia pracy, którą każdego dnia staram się realizować w praktyce. Bo wierzę, że najlepszą rekomendacją nie są słowa, które mówimy o sobie, ale te, które mówią o nas inni.",
      "A kiedy zdejmuję zawodowe buty pośrednika, najczęściej szukam przestrzeni i oddechu z dala od utartych tras. W wolnych chwilach przemierzam nieoczywiste miejsca off-roadowym autem z namiotem na dachu, bo podobnie jak w życiu i pracy – najbardziej lubię odkrywać to, czego nie widać na pierwszy rzut oka.",
    ],
    isOwner: true,
    order: 1,
  },
  {
    slug: "patrycja-sudwoj-bolenska",
    firstName: "Patrycja",
    lastName: "Sudwoj-Boleńska",
    fullName: "Patrycja Sudwoj-Boleńska",
    role: "Pośrednik nieruchomości nr licencji 20026",
    shortRole: "Wspólnik",
    credentialLines: ["Pośrednik nieruchomości nr licencji 20026", "Wspólnik"],
    photo: "/team/patrycja-sudwoj-bolenska.jpg",
    phone: "+48 532 843 660",
    phoneDisplay: "532 843 660",
    email: "psudwoj@starnawska.pl",
    bio: "Jestem absolwentką marketingu na Wydziale Zarządzania Uniwersytetu Gdańskiego. Choć moją zawodową podróż zaczynałam w biurze projektowym, to branża nieruchomości szybko stała się moją prawdziwą pasją i pozostaje nią od 2009 r.",
    bioParagraphs: [
      "Jestem absolwentką marketingu na Wydziale Zarządzania Uniwersytetu Gdańskiego. Choć moją zawodową podróż zaczynałam w biurze projektowym, to branża nieruchomości szybko stała się moją prawdziwą pasją i pozostaje nią od 2009 r.",
      "Swoje pierwsze kroki stawiałam na rynku pierwotnym, współpracując zarówno z trójmiejskimi potentatami deweloperskimi, jak i kameralnymi inwestorami. Ponieważ w pracy stawiam na merytorykę, regularnie podnosiłam poprzeczkę – na przestrzeni tych 17 lat ukończyłam studia podyplomowe z Pośrednictwa w obrocie nieruchomościami oraz Wyceny nieruchomości, uczestniczyłam w licznych szkoleniach, kursach i konferencjach branżowych. To pozwola mi płynnie i z sukcesem pracować dla klientów na bardzo zmieniającym się rynku.",
      "Tworząc własną markę – Starnawska&Boleńska Nieruchomości – od początku miałyśmy z moją wspólniczką jasną wizję: chciałyśmy biura, które opiera się na autentycznych relacjach, a nie tylko na transakcjach. Dziś z dumą rozwijamy kameralną, ale rozpoznawalną w branży markę, kojarzoną z edukacją, najwyższą jakością obsługi oraz ogólnopolską współpracą z innymi pośrednikami.",
      "Moja filozofia pracy? Przeprowadzam moich klientów przez proces zakupu, sprzedaży czy wynajmu \"za rękę\" – bezpiecznie, bez stresu i z pełnym zrozumieniem ich potrzeb.",
      "Specjalizuję się w szeroko pojętym sektorze mieszkalnym (mieszkania, domy, grunty) oraz projektach deweloperskich. Dla mnie nieruchomości to nie tylko mury – to przede wszystkim ludzie i ich życiowe plany, w których realizacji mam zaszczyt pomagać.",
      "Prywatny czas spędzam na rozwijaniu pasji muzycznych oraz podróżach.",
    ],
    isOwner: true,
    order: 2,
  },
  {
    slug: "iwona-stepinska",
    firstName: "Iwona",
    lastName: "Stępińska",
    fullName: "Iwona Stępińska",
    role: "Pośrednik nieruchomości",
    credentialLines: ["Pośrednik nieruchomości"],
    photo: "/team/iwona-stepinska.jpg",
    phone: "+48 530 521 572",
    phoneDisplay: "530 521 572",
    email: "istepinska@starnawska.pl",
    bio: "Od ponad 20 lat jestem związana z rynkiem nieruchomości. W 2006 roku ukończyłam Wyższą Szkołę Gospodarowania Nieruchomościami w Warszawie, a zdobyta wiedza i doświadczenie pozwalają mi skutecznie wspierać klientów w ważnych momentach życia – sprzedaży mieszkania, zakupie wymarzonego domu czy wynajmie pierwszego lokum.",
    bioParagraphs: [
      "Od ponad 20 lat jestem związana z rynkiem nieruchomości. W 2006 roku ukończyłam Wyższą Szkołę Gospodarowania Nieruchomościami w Warszawie, a zdobyta wiedza i doświadczenie pozwalają mi skutecznie wspierać klientów w ważnych momentach życia – sprzedaży mieszkania, zakupie wymarzonego domu czy wynajmie pierwszego lokum.",
      "Każdą współpracę opieram na indywidualnym podejściu, szczerej komunikacji i wzajemnym zaufaniu. Słucham potrzeb, doradzam i jestem obecna na każdym etapie procesu, dbając o komfort oraz bezpieczeństwo swoich klientów.",
      "Na co dzień pracuję na terenie Trójmiasta – Gdańska, Gdyni i Sopotu – jednak chętnie pomagam również poza tym obszarem. Wierzę, że dobra współpraca zaczyna się od zwykłej, ludzkiej rozmowy.",
      "Jeśli szukasz agenta nieruchomości, który łączy doświadczenie z zaangażowaniem i normalnym podejściem do ludzi – zapraszam do kontaktu. Chętnie pomogę znaleźć najlepsze rozwiązanie.",
    ],
    order: 3,
  },
  {
    slug: "katarzyna-kaszuba",
    firstName: "Katarzyna",
    lastName: "Kaszuba",
    fullName: "Katarzyna Kaszuba",
    role: "Pośrednik nieruchomości nr licencji 31825",
    credentialLines: ["Pośrednik nieruchomości nr licencji 31825"],
    photo: "/team/katarzyna-kaszuba.jpg",
    phone: "+48 668 305 552",
    phoneDisplay: "668 305 552",
    email: "kkaszuba@starnawska.pl",
    languages: ["angielski"],
    bio: "Nazywam się Katarzyna Kaszuba i jestem agentką nieruchomości działającą w Trójmieście.",
    bioParagraphs: [
      "Nazywam się Katarzyna Kaszuba i jestem agentką nieruchomości działającą w Trójmieście.",
      "W moim odczuciu nieruchomości to nie tylko metry kwadratowe, bo za każdą sprzedażą, zakupem czy wynajmem stoi przecież człowiek ze swoją historią, emocjami, wspomnieniami, planami i marzenia o kolejnym etapie życia.",
      "Wiem, że dla wielu osób sprzedaż nieruchomości to moment pełen emocji i ważnych decyzji. Dlatego stawiam nie tylko na skuteczność, ale również na uważność, szczerość i partnerską współpracę. Lubię sprzedawać nieruchomości i z satysfakcją prowadzę klientów przez cały proces sprzedaży, ale z równie dużą pasją współpracuję z klientami kupującymi, pomagając im znaleźć miejsce, w którym naprawdę poczują się „u siebie”.",
      "Trójmiasto to przestrzeń, z którą jestem związana nie tylko zawodowo, ale i prywatnie. Szczególne miejsce w moim sercu zajmuje Gdańsk, zarówno z jego eleganckim, miejskim obliczem, jak i zielona, pełna natury Wyspa Sobieszewska, która przypomina, że dom to czasem coś więcej niż adres. To styl życia, spokój i codzienność, do której chce się wracać.",
      "W pracy łączę estetykę, strategię sprzedaży i dbałość o relacje, wierząc, że dobra nieruchomość zasługuje na odpowiednią historię, a klient na profesjonalne wsparcie i poczucie bezpieczeństwa na każdym etapie transakcji.",
      "Prywatnie kocham podróże, zarówno te dalekie, odkrywające nowe kultury i miejsca, jak i spontaniczne wyjazdy „po sąsiedzku”, które pozwalają na chwilę zatrzymać się i docenić lokalne piękno Pomorza. Pasjonuję się również fotografią portretową i naturą. Fascynuje mnie także szydełkowanie maskotek, coś zupełnie innego niż świat nieruchomości, ale dającego ogromną satysfakcję, spokój i przestrzeń dla kreatywności.",
      "Jestem osobą energiczną, otwartą na ludzi i biegle posługuję się językiem angielskim, dzięki czemu z przyjemnością wspieram również klientów zagranicznych. Kocham zwierzęta, szczególnie psy, a sportowe emocje najchętniej przeżywam, kibicując reprezentacji Polski w siatkówce.",
    ],
    order: 4,
  },
  {
    slug: "alicja-stuchlik",
    firstName: "Alicja",
    lastName: "Stuchlik",
    fullName: "Alicja Stuchlik",
    role: "Pośrednik nieruchomości licencji nr 25136",
    credentialLines: ["Pośrednik nieruchomości licencji nr 25136"],
    photo: "/team/alicja-stuchlik.jpg",
    phone: "+48 530 523 184",
    phoneDisplay: "530 523 184",
    email: "astuchlik@starnawska.pl",
    bio: "Od kilkunastu lat z sukcesem działam w branży nieruchomości, łącząc znajomość lokalnego rynku, doświadczenie, profesjonalizm oraz wrodzoną empatię.",
    bioParagraphs: [
      "Od kilkunastu lat z sukcesem działam w branży nieruchomości, łącząc znajomość lokalnego rynku, doświadczenie, profesjonalizm oraz wrodzoną empatię.",
      "Jako rodowita Gdynianka świetnie znam Trójmiasto i jego okolice, a przede wszystkim wsłuchuję się w realne potrzeby Klientów. Pomagam nie tylko jako pośrednik nieruchomości, ale przede wszystkim jako osoba, która sama przeszła długą drogę do swojego wymarzonego domu.",
      "Wiem, co oznacza być najemcą, sprzedającym, kupującym i kredytobiorcą. Mieszkałam na przedmieściach, w centrum miasta, w starych kamienicach i na nowoczesnych osiedlach. Znam uroki życia w takich miejscach – bliskość wszystkiego, ale też wartość ciszy, przestrzeni i własnego ogrodu, ponieważ sama podjęłam odważną decyzję i wybudowałam poza miastem dom, o którym zawsze marzyłam.",
      "Dziś wiem, że każdy ma własną definicję idealnego miejsca do życia, a ta często zmienia się na różnych etapach życia. Dla jednych będzie to mieszkanie w centrum miasta, dla innych bliźniak z ogródkiem i dobrym dojazdem. Dla niektórych będzie to apartament z widokiem na morze, a dla innych działka na wsi pod budowę domu marzeń.",
      "Tak samo różne są powody sprzedaży i zakupu nieruchomości. Niezależnie od tego, czego szukasz, co sprzedajesz i z jakiego powodu podejmujesz tę decyzję – pomogę Ci przejść przez cały proces spokojnie, świadomie i bez błędów, które sama kiedyś popełniłam.",
      "Wiem, że nieruchomość to coś więcej niż adres. To ważne życiowe decyzje. Dlatego jestem i będę przy Tobie.",
      "Prywatnie jestem miłośniczką przyrody. Wolny czas spędzam w swoim wiejskim ustroniu z moimi czworonogami – spacerując, pielęgnując ogród, malując i fotografując. Kiedy tylko mogę, podróżuję. Uwielbiam odkrywać Europę, chłonąć jej architekturę, sztukę i kulturę. Moje zamiłowanie do architektury oraz oko do detali są wyjątkowym atutem w pracy pośrednika nieruchomości.",
      "Żyję z pasją i z pasją pomagam spełniać marzenia moich Klientów.",
    ],
    order: 5,
  },
  {
    slug: "agata-klimkiewicz",
    firstName: "Agata",
    lastName: "Klimkiewicz",
    fullName: "Agata Klimkiewicz",
    role: "Pośrednik nieruchomości nr licencji 31119",
    credentialLines: ["Pośrednik nieruchomości nr licencji 31119"],
    photo: "/team/agata-klimkiewicz.jpg",
    phone: "+48 530 518 448",
    phoneDisplay: "530 518 448",
    email: "aklimkiewicz@starnawska.pl",
    bio: "Jestem agentką nieruchomości z humanistycznym sercem.",
    bioParagraphs: [
      "Jestem agentką nieruchomości z humanistycznym sercem.",
      "Wierzę, że za każdą nieruchomością stoi przede wszystkim człowiek, jego historia, marzenia i nowe początki.",
      "Kieruję się zasadą: „Człowiekiem jestem i nic, co ludzkie, nie jest mi obce”.",
      "Cenię spokój, autentyczne relacje i ciekawość świata, która nieustannie prowadzi mnie do ludzi i nowych doświadczeń.",
      "Stoicki spokój pomaga mi zachować równowagę, a życiowa energia i odrobina epikurejskiego „carpe diem” przypominają, by cieszyć się drogą, nie tylko celem.",
      "Nieruchomości to dla mnie nie tylko praca — to towarzyszenie ludziom w ważnych momentach życia, przez które pomagam im przejść ,,suchą stopą\", aby kolejne etapy tej wędrówki kojarzyły im się ze spokojnym docieraniem do życiowego portu. Dla klientów, którzy zakup lub sprzedaż nieruchomości traktują jak kolejną zmianę w życiu, jestem przewodnikiem w meandrach formalnych zawiłości.",
    ],
    order: 6,
  },
  {
    slug: "ewelina-pawelczyk",
    firstName: "Ewelina",
    lastName: "Pawelczyk",
    fullName: "Ewelina Pawelczyk",
    role: "Pośrednik nieruchomości nr licencji 31852",
    credentialLines: ["Pośrednik nieruchomości nr licencji 31852"],
    photo: "/team/ewelina-pawelczyk.jpg",
    phone: "+48 530 482 592",
    phoneDisplay: "530 482 592",
    email: "epawelczyk@starnawska.pl",
    bio: "Nieruchomości to dla mnie przede wszystkim praca z ludźmi i możliwość towarzyszenia im w ważnych życiowych decyzjach.",
    bioParagraphs: [
      "Nieruchomości to dla mnie przede wszystkim praca z ludźmi i możliwość towarzyszenia im w ważnych życiowych decyzjach. W swojej pracy stawiam na zaangażowanie, dobrą komunikację oraz indywidualne podejście do każdego klienta. Zależy mi, aby cały proces związany z zakupem, sprzedażą czy wynajmem nieruchomości przebiegał w komfortowej i spokojnej atmosferze.",
      "Prywatnie uwielbiam podróże, odkrywanie nowych miejsc oraz poznawanie różnych kultur i ludzi. Cenię sobie możliwość nawiązywania relacji, poznawania nowych perspektyw i inspirowania się światem. Lubię również dobrą kuchnię i miejsca z wyjątkowym klimatem, ponieważ wierzę, że to właśnie detale tworzą najlepsze doświadczenia — zarówno w życiu, jak i w pracy z klientem.",
    ],
    order: 7,
  },
  {
    slug: "dagmara-wegner",
    firstName: "Dagmara",
    lastName: "Wegner",
    fullName: "Dagmara Wegner",
    role: "Office Manager & Executive Assistant",
    credentialLines: ["Office Manager & Executive Assistant"],
    photo: "/team/dagmara-wegner.jpg",
    phone: "+48 795 579 585",
    phoneDisplay: "795 579 585",
    email: "sekretariat@starnawska.pl",
    bio: "W biurze Starnawska&Boleńska Nieruchomości s.c. odpowiadam za sprawne funkcjonowanie i organizację pracy, zapewniając codzienne wsparcie administracyjne oraz operacyjne dla zespołu i zarządu.",
    bioParagraphs: [
      "W biurze Starnawska&Boleńska Nieruchomości s.c. odpowiadam za sprawne funkcjonowanie i organizację pracy, zapewniając codzienne wsparcie administracyjne oraz operacyjne dla zespołu i zarządu. Łączę doświadczenie w księgowości, zarządzaniu jakością ISO oraz branży nieruchomości, co pozwala mi skutecznie porządkować procesy i znajdować praktyczne rozwiązania w dynamicznym środowisku pracy. Można liczyć na moją pomoc w kontaktach i sprawnej komunikacji, zarówno wewnątrz firmy, jak i z partnerami zewnętrznymi.",
      "Prywatnie interesuję się podróżami, włoskim designem, sztuką oraz nadawaniem nowego życia zabytkowym i historycznym nieruchomościom, z wyczuciem estetyki i szacunkiem do ich charakteru.",
    ],
    order: 8,
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
