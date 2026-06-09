import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Calendar,
  Check,
  ClipboardList,
  Compass,
  Handshake,
  HelpCircle,
  Home,
  KeyRound,
  MessageSquare,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Strefa kupującego. Agent kupującego w Trójmieście",
  description:
    "Kupujesz nieruchomość? Nie musisz przechodzić przez ten proces sam. Reprezentujemy interes kupującego kompleksowo — od pierwszej rozmowy aż po odbiór kluczy.",
};

const rolaAgenta = [
  "analiza rynku",
  "wyszukiwanie najlepszych możliwości",
  "negocjowanie warunków",
  "weryfikacja bezpieczeństwa transakcji",
  "prowadzenie klienta przez cały proces zakupu",
];

const wspolpraca = [
  {
    icon: MessageSquare,
    title: "1. Poznajemy Twoje potrzeby",
    text: "Rozmawiamy nie tylko o metrażu i lokalizacji. Chcemy zrozumieć Twój styl życia, plany i priorytety.",
  },
  {
    icon: Compass,
    title: "2. Tworzymy strategię zakupu",
    text: "Analizujemy rynek, możliwości finansowe i realne kierunki poszukiwań.",
  },
  {
    icon: Search,
    title: "3. Szukamy nieruchomości",
    text: "Także poza portalami i ofertami publicznymi.",
  },
  {
    icon: Calendar,
    title: "4. Organizujemy prezentacje",
    text: "Selekcjonujemy nieruchomości, aby oszczędzać Twój czas.",
  },
  {
    icon: Handshake,
    title: "5. Negocjujemy warunki",
    text: "Cenę, terminy, wyposażenie, warunki wydania i bezpieczeństwo transakcji.",
  },
  {
    icon: ShieldCheck,
    title: "6. Weryfikujemy dokumenty",
    text: "Sprawdzamy stan prawny nieruchomości i potencjalne ryzyka.",
  },
  {
    icon: ClipboardList,
    title: "7. Koordynujemy cały proces",
    text: "Kredyt, notariusz, formalności, kontakt między stronami.",
  },
  {
    icon: KeyRound,
    title: "8. Jesteśmy z Tobą do końca",
    text: "Aż do przekazania nieruchomości i odbioru kluczy.",
  },
];

const zaKulisami = [
  "analizujemy księgi wieczyste",
  "sprawdzamy dokumentację",
  "koordynujemy terminy",
  "współpracujemy z innymi agentami",
  "szukamy ofert off market",
  "negocjujemy warunki",
  "pomagamy uniknąć kosztownych błędów",
  "dbamy o bezpieczeństwo i komfort naszych klientów",
];

const dlaKogo = [
  "kupują pierwsze mieszkanie",
  "nie mają czasu na samodzielne poszukiwania",
  "mieszkają poza Trójmiastem lub za granicą",
  "chcą kupić bezpiecznie i świadomie",
  "szukają ofert spoza portali",
  "kupują inwestycyjnie",
  "cenią profesjonalne wsparcie i strategię",
];

const motywy = [
  "spokojniejszego życia",
  "miejsca bliżej natury",
  "przestrzeni do pracy zdalnej",
  "nowego początku",
  "bezpieczeństwa dla swojej rodziny",
];

const historie = [
  {
    icon: Building2,
    title: "Żurawie",
    essence:
      "Niektórzy szukają nieruchomości. Inni szukają miejsca, w którym poczują, że są u siebie.",
    blocks: [
      {
        t: "p",
        c: "Nasza klientka wiedziała jedno: potrzebuje przestrzeni. Przestrzeni do życia. Przestrzeni do pracy. Przestrzeni do oddychania.",
      },
      {
        t: "p",
        c: "Wśród najważniejszych kryteriów nie pojawiały się modne osiedla czy konkretne adresy. Najczęściej powtarzały się inne słowa: jasność, przestrzeń, natura, aktywność, możliwość biegania i długich spacerów.",
      },
      {
        t: "p",
        c: "Ponieważ na co dzień mieszkała w innym mieście, cały proces poszukiwań prowadziliśmy zdalnie. Spośród dziesiątek ofert dostępnych na portalach oraz propozycji pozyskanych poza rynkiem publicznym wspólnie wybierałyśmy wyłącznie te, które rzeczywiście odpowiadały jej potrzebom.",
      },
      {
        t: "p",
        c: "Pierwsza prezentacja online pomogła doprecyzować kierunek poszukiwań. Druga okazała się przełomowa. Klientka zdecydowała się przyjechać do Gdańska i zobaczyć nieruchomość na żywo.",
      },
      {
        t: "p",
        c: "I właśnie wtedy pojawiły się żurawie. Najpierw podczas podróży do Gdańska. Później po wjeździe do miasta. A kiedy stanęła na tarasie oglądanego mieszkania, zobaczyła je po raz kolejny, wpisane w panoramę Gdańska. Decyzja o zakupie zapadła niemal natychmiast.",
      },
      {
        t: "p",
        c: "To jednak tylko część tej historii. Klientka nie wiedziała, że równolegle trwał zupełnie inny proces. Niezależne od sprzedających komplikacje związane ze stanem prawnym nieruchomości wymagały ogromnego zaangażowania, wielu rozmów, koordynacji działań różnych stron i walki z czasem. Dla kupującej ten etap pozostał niewidoczny. Celowo.",
      },
      {
        t: "p",
        c: "Naszym zadaniem było nie tylko znaleźć odpowiednią nieruchomość, ale również zadbać o to, aby mogła przejść przez cały proces spokojnie i bez dodatkowego stresu. Dopiero podczas podpisywania aktu notarialnego dowiedziała się, jak wiele pracy zostało wykonane za kulisami.",
      },
      {
        t: "quote",
        lead: "Pamiętam jej słowa",
        c: "Dziękuję, że nie byłam częścią tego procesu.",
      },
      {
        t: "p",
        c: "Dla nas był to jeden z największych komplementów. Bo czasami najlepsza praca agenta polega właśnie na tym, że klient nie musi mierzyć się z problemami, które mogłyby odebrać mu radość z zakupu wymarzonego miejsca.",
      },
      {
        t: "p",
        c: "A kilka tygodni później, jadąc na podpisanie aktu notarialnego, klientka ponownie zauważyła żurawie. Nawet obok kancelarii notarialnej pracowały kolejne, tym razem budowlane. Przypadek? Być może. Dla niej były symbolem, że jest dokładnie tam, gdzie powinna być.",
      },
      {
        t: "closing",
        c: "A dla nas ta historia jest przypomnieniem, że zakup nieruchomości zaczyna się od marzeń klienta, ale bardzo często kończy się sukcesem dzięki pracy, której klient nigdy nie widzi.",
      },
    ],
    efekt: [
      "2 prezentacje online",
      "1 prezentacja na żywo",
      "Zakup nieruchomości spełniającej wszystkie priorytetowe potrzeby klientki",
      "Przeprowadzenie klientki przez cały proces bez angażowania jej w skomplikowane kwestie formalne i prawne",
      "Pełna koordynacja procesu od pierwszej rozmowy do aktu notarialnego",
    ],
  },
  {
    icon: Home,
    title: "Po 30 latach wrócili do domu",
    essence:
      "Nie każda nieruchomość jest marzeniem. Ale za niektórymi zakupami stoją marzenia budowane przez całe życie.",
    blocks: [
      {
        t: "p",
        c: "Tak było w przypadku naszych klientów, którzy od wielu lat mieszkali poza granicami Polski. Od początku wiedzieli jedno: kiedy przyjdzie czas emerytury, chcą wrócić do kraju i zamieszkać w ukochanym Gdańsku. Przez ponad 30 lat pracowali na ten moment. Na miejsce, które będzie ich domem.",
      },
      {
        t: "p",
        c: "Zanim trafili do nas, próbowali kupić nieruchomość samodzielnie. Współpracowali również z pośrednikiem, który deklarował obsługę kupującego. Niestety szybko okazało się, że pomiędzy pokazywaniem mieszkań a prawdziwym reprezentowaniem interesów klienta jest ogromna różnica.",
      },
      {
        t: "p",
        c: "Intuicja podpowiadała im, że potrzebują osoby, która zrozumie, że nie chodzi o zwykłą transakcję. Chodzi o spełnienie marzenia. Do nas trafili z polecenia pośrednika z innego miasta.",
      },
      {
        t: "p",
        c: "Już podczas pierwszych rozmów wiedzieliśmy, że najważniejsze są dla nich dwie rzeczy: bezpieczeństwo oraz gotowość do zamieszkania od pierwszego dnia. Nie szukali okazji inwestycyjnej. Nie chcieli remontów. Nie planowali wielomiesięcznych prac wykończeniowych. Po latach pracy chcieli po prostu otworzyć drzwi, wnieść swoje rzeczy i rozpocząć nowy etap życia.",
      },
      {
        t: "p",
        c: "Dodatkowym wyzwaniem był fakt, że nie czuli się komfortowo w dzisiejszym, mocno zdigitalizowanym świecie. Dokumenty elektroniczne, procedury, systemy bankowe i formalności budziły więcej obaw niż ekscytacji. Dlatego od początku wiedzieliśmy, że równie ważne jak znalezienie odpowiedniego mieszkania będzie zapewnienie im poczucia bezpieczeństwa na każdym etapie procesu.",
      },
      {
        t: "beat",
        lead: "I wtedy wydarzyło się coś, co zdarza się niezwykle rzadko.",
        c: "Pierwsza prezentacja. Pierwsze mieszkanie. Pierwsza decyzja. Kupujemy.",
      },
      {
        t: "p",
        c: "Nieruchomość znaleźliśmy dzięki współpracy z pośrednikiem działającym w społeczności Nieruchomości Spod Lady, sieci współpracy, która od lat pozwala naszym klientom docierać do najlepszych ofert dostępnych na rynku.",
      },
      {
        t: "p",
        c: "Na prezentacji obecny był mąż. Żona została w domu. Po obejrzeniu nieruchomości przygotowaliśmy dla niej szczegółowy materiał wideo, dzięki któremu mogła zobaczyć mieszkanie niemal tak, jakby była tam osobiście. To wystarczyło. Po wielu rozmowach i analizach zapadła ostateczna decyzja.",
      },
      {
        t: "p",
        c: "Kilka tygodni później oboje przyjechali do Gdańska na podpisanie aktu notarialnego. Co ciekawe, żona nadal nie widziała swojego nowego mieszkania na żywo. Po raz pierwszy przekroczyła jego próg już jako właścicielka.",
      },
      {
        t: "p",
        c: "Pamiętam ten moment doskonale. Po otwarciu drzwi zatrzymała się na chwilę. Słońce wpadało przez okna, rozświetlając całe wnętrze. A ona zakryła dłonią uśmiechniętą twarz. Nie trzeba było nic mówić. Wszyscy wiedzieliśmy, że właśnie zakończyła się podróż, która trwała ponad 30 lat. I rozpoczął się nowy rozdział.",
      },
      {
        t: "closing",
        c: "Bo czasami klient nie szuka mieszkania. Czasami szuka drogi do domu, do którego chciał wrócić przez całe życie. ❤️",
      },
    ],
    efekt: [
      "Klienci trafili do nas z polecenia innego pośrednika",
      "Znalezienie wymarzonego mieszkania już podczas pierwszej prezentacji",
      "Zakup nieruchomości gotowej do zamieszkania bez dodatkowych nakładów finansowych",
      "Pełne wsparcie klientów, którzy nie czuli się pewnie w świecie cyfrowych procedur i formalności",
      "Współpraca międzyagentowa w ramach społeczności Nieruchomości Spod Lady",
      "Bezpieczne przeprowadzenie całego procesu od pierwszej rozmowy do odbioru kluczy",
    ],
  },
];

const faq = [
  {
    q: "Czy podpisujemy umowę współpracy?",
    a: "Tak. Jasne zasady współpracy dają bezpieczeństwo obu stronom i pozwalają nam działać skutecznie.",
  },
  {
    q: "Czy pomagacie w kredycie?",
    a: "Tak. Współpracujemy z zaufanymi ekspertami kredytowymi.",
  },
  {
    q: "Czy pokazujecie tylko oferty z Waszej strony?",
    a: "Nie. Współpracujemy również z innymi biurami oraz w systemach off market.",
  },
  {
    q: "Czy mogę kupić nieruchomość inwestycyjnie?",
    a: "Oczywiście. Pomagamy również klientom inwestycyjnym.",
  },
  {
    q: "Czy działacie tylko w Trójmieście?",
    a: "Specjalizujemy się w rynku Trójmiasta i okolic, ale prowadzimy również transakcje poza regionem.",
  },
];

export default function StrefaKupujacegoPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-background">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(163,199,51,0.15),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(45,74,31,0.10),transparent_60%)]"
        />
        <Container size="wide" className="relative pt-36 lg:pt-44 pb-16 lg:pb-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-lime/15 text-brand-forest-deep text-xs font-semibold uppercase tracking-wider mb-5">
              <Sparkles className="size-3.5" />
              Strefa kupującego
            </div>
            <h1 className="font-bold tracking-tight text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] text-foreground">
              Kupujesz nieruchomość?
              <br />
              <span className="text-brand-forest">Nie musisz przechodzić przez ten proces sam.</span>
            </h1>
            <p className="mt-7 text-lg lg:text-xl text-foreground-muted leading-relaxed max-w-2xl">
              Zakup nieruchomości to jedna z najważniejszych decyzji finansowych i życiowych.
              Dlatego reprezentujemy interes kupującego kompleksowo — od pierwszej rozmowy
              aż po odbiór kluczy.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="primary" size="lg">
                <Link href="/konsultacja">
                  Umów konsultację
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#wspolpraca">Porozmawiajmy o Twoim zakupie</a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Reveal>
        <section className="py-16 lg:py-24 bg-surface">
          <Container size="wide">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-6 lg:sticky lg:top-32">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                  Po Twojej stronie
                </p>
                <h2 className="font-bold tracking-tight text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-foreground mb-6">
                  Kim jest agent kupującego?
                </h2>
                <p className="text-lg text-foreground font-semibold leading-relaxed mb-5">
                  Kupujący również zasługuje na swojego reprezentanta.
                </p>
                <p className="text-lg text-foreground-muted leading-relaxed mb-5">
                  Przez lata rynek nieruchomości skupiał się głównie na sprzedaży nieruchomości.
                  A przecież po drugiej stronie jest człowiek, który podejmuje ogromną decyzję,
                  inwestuje swoje pieniądze, emocje i przyszłość.
                </p>
                <p className="text-lg text-foreground-muted leading-relaxed mb-5">
                  Właśnie dlatego powstała nasza Strefa Kupującego, która od początku
                  powstania firmy jest specjalizacją.
                </p>
                <p className="text-lg text-foreground-muted leading-relaxed">
                  Nie jesteśmy tylko po to, aby pokazywać nieruchomości.
                  <br />
                  Naszą rolą jest:
                </p>

                {/* Premium pull-quote box */}
                <div className="relative mt-10 rounded-[28px] overflow-hidden bg-gradient-to-br from-brand-lime/[0.08] via-brand-lime/[0.05] to-transparent border border-brand-lime/35 shadow-[0_12px_40px_-16px_rgba(45,74,31,0.20)]">
                  <div
                    aria-hidden
                    className="absolute left-0 top-6 bottom-6 w-[4px] bg-gradient-to-b from-brand-lime via-brand-olive to-brand-lime/40 rounded-r-full"
                  />
                  <div
                    aria-hidden
                    className="absolute top-4 right-5 text-[7rem] leading-none font-serif text-brand-lime/[0.20] pointer-events-none select-none"
                  >
                    “
                  </div>
                  <div className="relative p-7 lg:p-8 pl-9 lg:pl-10">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-olive/80 mb-3">
                      Nasze podejście
                    </p>
                    <p className="text-xl lg:text-2xl font-bold text-foreground leading-snug tracking-tight">
                      Reprezentujemy interes kupującego.
                      <br />
                      <span className="text-brand-forest">I właśnie to robi ogromną różnicę.</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  {rolaAgenta.map((item, index) => (
                    <div
                      key={item}
                      className="group relative rounded-[28px] bg-background border border-border shadow-[var(--shadow-soft)] overflow-hidden hover:border-brand-lime/60 hover:shadow-[0_20px_50px_-20px_rgba(45,74,31,0.25)] hover:-translate-y-1 transition-all duration-400"
                    >
                      <span
                        aria-hidden
                        className="absolute -top-3 right-4 text-[6rem] lg:text-[7rem] font-bold tabular-nums leading-none text-brand-lime/[0.08] group-hover:text-brand-lime/[0.20] transition-all duration-500 pointer-events-none select-none"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-br from-brand-lime/0 via-transparent to-brand-lime/0 group-hover:from-brand-lime/[0.04] group-hover:to-brand-lime/[0.10] transition-all duration-500"
                      />
                      <div
                        aria-hidden
                        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-lime/0 via-brand-lime/60 to-brand-lime/0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      />
                      <div className="relative p-6 lg:p-7 min-h-[160px] flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="size-11 rounded-xl bg-brand-lime/15 text-brand-olive flex items-center justify-center group-hover:bg-brand-lime/30 group-hover:rotate-6 transition-all duration-300">
                            <Check className="size-5" strokeWidth={2.6} />
                          </div>
                          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-olive/80">
                            0{index + 1}
                          </div>
                        </div>
                        <span className="font-semibold text-foreground text-base lg:text-lg leading-snug tracking-tight">
                          {item}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal>
        <section id="wspolpraca" className="py-16 lg:py-24 scroll-mt-24">
          <Container size="wide">
            <div className="max-w-3xl mb-12">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                Proces krok po kroku
              </p>
              <h2 className="font-bold tracking-tight text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-foreground mb-5">
                Jak wygląda współpraca?
              </h2>
              <p className="text-lg text-foreground-muted leading-relaxed">
                Jak pracujemy z kupującym?
              </p>
            </div>

            {/* PREMIUM HORIZONTAL TIMELINE */}
            <ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {wspolpraca.map((step, index) => {
                const Icon = step.icon;
                return (
                  <li
                    key={step.title}
                    className="group relative rounded-[28px] bg-background border border-border shadow-[var(--shadow-soft)] overflow-hidden hover:border-brand-lime/60 hover:shadow-[0_20px_50px_-20px_rgba(45,74,31,0.25)] hover:-translate-y-1 transition-all duration-400"
                  >
                    {/* Ogromny watermark numer */}
                    <span
                      aria-hidden
                      className="absolute -top-3 right-4 text-[7rem] lg:text-[8rem] font-bold tabular-nums leading-none text-brand-lime/[0.08] group-hover:text-brand-lime/[0.20] transition-all duration-500 pointer-events-none select-none"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Gradient subtle hover */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-br from-brand-lime/0 via-transparent to-brand-lime/0 group-hover:from-brand-lime/[0.04] group-hover:to-brand-lime/[0.10] transition-all duration-500"
                    />

                    {/* Akcent na górze */}
                    <div
                      aria-hidden
                      className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-lime/0 via-brand-lime/60 to-brand-lime/0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    />

                    <div className="relative p-6 lg:p-7">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="size-12 rounded-xl bg-brand-lime/15 text-brand-olive flex items-center justify-center group-hover:bg-brand-lime/30 group-hover:rotate-6 transition-all duration-300">
                          <Icon className="size-5" strokeWidth={2.2} />
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-olive/80">
                          Krok {index + 1} z 8
                        </div>
                      </div>
                      <h3 className="font-bold text-base lg:text-lg leading-tight mb-3 text-foreground tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-foreground-muted">
                        {step.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Container>
        </section>
      </Reveal>

      <Reveal>
        <section className="relative py-16 lg:py-24 bg-surface text-foreground overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(163,199,51,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(45,74,31,0.06),transparent_60%)]"
          />
          <Container size="wide" className="relative">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                  Za kulisami
                </p>
                <h2 className="font-bold tracking-tight text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] mb-6">
                  Czego klient często nie widzi?
                </h2>
                <p className="text-lg text-foreground-muted leading-relaxed mb-4">
                  Zakup nieruchomości to dużo więcej niż oglądanie mieszkań.
                </p>
                <p className="text-lg text-foreground-muted leading-relaxed">
                  Za kulisami naszej pracy często dzieje się więcej niż podczas samej prezentacji.
                </p>
              </div>

              <div className="lg:col-span-7">
                <ul className="grid sm:grid-cols-2 gap-4">
                  {zaKulisami.map((item, index) => (
                    <li
                      key={item}
                      className="group relative rounded-2xl bg-background border border-border shadow-[var(--shadow-soft)] overflow-hidden hover:border-brand-lime/60 hover:shadow-[0_12px_32px_-12px_rgba(45,74,31,0.22)] hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <span
                        aria-hidden
                        className="absolute -top-2 right-3 text-[4.5rem] font-bold tabular-nums leading-none text-brand-lime/[0.07] group-hover:text-brand-lime/[0.18] transition-all duration-500 pointer-events-none select-none"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div
                        aria-hidden
                        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-lime/0 via-brand-lime/60 to-brand-lime/0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      />
                      <div className="relative flex items-start gap-3 p-5">
                        <span className="size-7 rounded-full bg-brand-lime/20 text-brand-olive flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand-lime/35 group-hover:scale-110 transition-all duration-300">
                          <Check className="size-4" strokeWidth={3} />
                        </span>
                        <span className="text-foreground font-medium leading-relaxed text-sm pt-0.5">
                          {item}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-lg text-foreground-muted leading-relaxed">
                  Bo dobra obsługa kupującego zaczyna się tam, gdzie kończy się zwykłe
                  „pokazywanie nieruchomości”.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal>
        <section className="py-16 lg:py-24">
          <Container size="wide">
            <div className="max-w-3xl mb-12">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                Komu pomagamy
              </p>
              <h2 className="font-bold tracking-tight text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-foreground">
                Dla kogo jest ta usługa?
              </h2>
              <p className="mt-5 text-lg text-foreground-muted leading-relaxed">
                Najczęściej pomagamy klientom, którzy:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {dlaKogo.map((item, index) => (
                <div
                  key={item}
                  className="group relative rounded-[28px] bg-surface border border-border shadow-[var(--shadow-soft)] overflow-hidden hover:border-brand-lime/60 hover:shadow-[0_20px_50px_-20px_rgba(45,74,31,0.25)] hover:-translate-y-1 transition-all duration-400"
                >
                  <span
                    aria-hidden
                    className="absolute -top-3 right-4 text-[6rem] font-bold tabular-nums leading-none text-brand-lime/[0.08] group-hover:text-brand-lime/[0.20] transition-all duration-500 pointer-events-none select-none"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-br from-brand-lime/0 via-transparent to-brand-lime/0 group-hover:from-brand-lime/[0.04] group-hover:to-brand-lime/[0.10] transition-all duration-500"
                  />
                  <div
                    aria-hidden
                    className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-lime/0 via-brand-lime/60 to-brand-lime/0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  />
                  <div className="relative p-6 lg:p-7 min-h-[160px] flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="size-10 rounded-xl bg-brand-lime/15 text-brand-olive flex items-center justify-center group-hover:bg-brand-lime/30 group-hover:rotate-6 transition-all duration-300">
                        <Check className="size-5" strokeWidth={2.6} />
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-olive/80">
                        0{index + 1}
                      </div>
                    </div>
                    <span className="font-semibold text-foreground text-base lg:text-lg leading-snug tracking-tight">
                      {item}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal>
        <section className="py-16 lg:py-24 bg-surface">
          <Container size="default">
            <div className="mb-12">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                Każdy klient inny
              </p>
              <h2 className="font-bold tracking-tight text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-foreground">
                Historie naszych klientów
              </h2>
            </div>

            <div className="rounded-[36px] bg-background border border-border p-8 lg:p-12 shadow-[var(--shadow-soft)]">
              <p className="text-xl font-semibold text-foreground leading-relaxed mb-5">
                Każda nieruchomość zaczyna się od czyjejś historii.
              </p>
              <p className="text-lg text-foreground-muted leading-relaxed mb-6">
                Czasami klient mówi:
                <br />
                „Szukamy mieszkania 3 pokojowego.”
              </p>
              <p className="text-lg text-foreground-muted leading-relaxed mb-5">
                A po kilku rozmowach okazuje się, że naprawdę szuka:
              </p>
              <div className="flex flex-wrap gap-2.5 mb-8">
                {motywy.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 pl-3 pr-5 py-2.5 rounded-full bg-brand-lime/15 border border-brand-lime/30 text-brand-forest-deep font-medium text-sm"
                  >
                    <Check className="size-3.5" />
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-foreground font-semibold leading-relaxed text-lg pt-6 border-t border-border">
                Dlatego nie pracujemy schematami.
                <br />
                Każdy klient ma swoją historię.
                <br />
                I swoją definicję idealnego miejsca.
              </p>
            </div>

            {/* HISTORIE KLIENTÓW — prawdziwe case studies */}
            <div className="mt-10 lg:mt-14 space-y-8 lg:space-y-10">
              {historie.map((story, storyIndex) => {
                const Icon = story.icon;
                return (
                  <article
                    key={story.title}
                    className="relative rounded-[36px] bg-background border border-border shadow-[var(--shadow-soft)] overflow-hidden"
                  >
                    <div
                      aria-hidden
                      className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-lime/0 via-brand-lime/70 to-brand-lime/0"
                    />
                    <span
                      aria-hidden
                      className="absolute -top-6 right-6 text-[7rem] lg:text-[9rem] font-bold tabular-nums leading-none text-brand-lime/[0.07] pointer-events-none select-none"
                    >
                      {String(storyIndex + 1).padStart(2, "0")}
                    </span>

                    <div className="relative p-7 sm:p-9 lg:p-12">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-lime/15 text-brand-forest-deep text-xs font-semibold uppercase tracking-wider mb-5">
                        <Icon className="size-3.5" />
                        Historia klienta
                      </div>
                      <h3 className="font-bold tracking-tight text-[clamp(1.4rem,2.8vw,2rem)] leading-[1.15] text-foreground mb-4">
                        {story.title}
                      </h3>
                      <p className="text-lg lg:text-xl text-brand-forest font-semibold leading-relaxed mb-7">
                        {story.essence}
                      </p>

                      <div className="space-y-5">
                        {story.blocks.map((block, blockIndex) => {
                          const lead = "lead" in block ? block.lead : undefined;

                          if (block.t === "quote") {
                            return (
                              <div
                                key={blockIndex}
                                className="relative my-2 rounded-[28px] overflow-hidden bg-gradient-to-br from-brand-lime/[0.08] via-brand-lime/[0.05] to-transparent border border-brand-lime/35 shadow-[0_12px_40px_-16px_rgba(45,74,31,0.20)]"
                              >
                                <div
                                  aria-hidden
                                  className="absolute left-0 top-6 bottom-6 w-[4px] bg-gradient-to-b from-brand-lime via-brand-olive to-brand-lime/40 rounded-r-full"
                                />
                                <div
                                  aria-hidden
                                  className="absolute top-4 right-5 text-[7rem] leading-none font-serif text-brand-lime/[0.20] pointer-events-none select-none"
                                >
                                  “
                                </div>
                                <div className="relative p-7 lg:p-8 pl-9 lg:pl-10">
                                  {lead ? (
                                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-olive/80 mb-3">
                                      {lead}
                                    </p>
                                  ) : null}
                                  <p className="text-xl lg:text-2xl font-bold text-foreground leading-snug tracking-tight">
                                    {block.c}
                                  </p>
                                </div>
                              </div>
                            );
                          }

                          if (block.t === "beat") {
                            return (
                              <div
                                key={blockIndex}
                                className="my-2 rounded-[24px] border border-brand-lime/30 bg-brand-lime/[0.06] p-6 lg:p-7"
                              >
                                {lead ? (
                                  <p className="text-lg text-foreground-muted leading-relaxed mb-2">
                                    {lead}
                                  </p>
                                ) : null}
                                <p className="text-xl lg:text-2xl font-bold text-brand-forest leading-snug tracking-tight">
                                  {block.c}
                                </p>
                              </div>
                            );
                          }

                          if (block.t === "closing") {
                            return (
                              <p
                                key={blockIndex}
                                className="text-foreground font-semibold leading-relaxed text-lg lg:text-xl pt-6 mt-2 border-t border-border"
                              >
                                {block.c}
                              </p>
                            );
                          }

                          return (
                            <p
                              key={blockIndex}
                              className="text-lg text-foreground-muted leading-relaxed"
                            >
                              {block.c}
                            </p>
                          );
                        })}
                      </div>

                      <div className="mt-9 rounded-[28px] bg-gradient-to-br from-brand-lime/[0.08] via-brand-lime/[0.05] to-transparent border border-brand-lime/35 p-7 lg:p-8">
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-olive/80 mb-5">
                          Efekt współpracy
                        </p>
                        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3.5">
                          {story.efekt.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <span className="size-6 rounded-full bg-brand-lime/25 text-brand-forest-deep flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="size-3.5" strokeWidth={3} />
                              </span>
                              <span className="text-foreground font-medium leading-relaxed text-sm lg:text-base">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal>
        <section className="py-16 lg:py-24 bg-surface">
          <Container size="wide">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-4 lg:sticky lg:top-32">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-lime/15 text-brand-forest-deep text-xs font-semibold uppercase tracking-wider mb-5">
                  <HelpCircle className="size-3.5" />
                  Najczęstsze pytania
                </div>
                <h2 className="font-bold tracking-tight text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-foreground">
                  Najczęściej zadawane pytania
                </h2>
              </div>
              <div className="lg:col-span-8">
                <div className="space-y-3">
                  {faq.map((item, index) => (
                    <details
                      key={item.q}
                      className="group rounded-[28px] border border-border bg-background p-6 lg:p-7 transition-all hover:border-brand-olive/45 open:border-brand-olive/60 open:shadow-[var(--shadow-soft)] open:bg-gradient-to-br open:from-background open:to-brand-lime/[0.06]"
                    >
                      <summary className="flex items-start justify-between gap-6 cursor-pointer list-none">
                        <div className="flex items-start gap-5">
                          <span className="font-bold text-sm text-brand-olive tabular-nums shrink-0 pt-1.5">
                            0{index + 1}
                          </span>
                          <span className="font-semibold text-foreground text-lg lg:text-xl leading-snug">
                            {item.q}
                          </span>
                        </div>
                        <span className="size-10 rounded-full bg-brand-lime/15 text-brand-forest-deep flex items-center justify-center shrink-0 group-open:bg-brand-lime transition-all">
                          <ArrowRight className="size-4 group-open:rotate-90 transition-transform" />
                        </span>
                      </summary>
                      <p className="mt-6 ml-11 text-foreground-muted leading-relaxed text-base lg:text-lg">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal>
        <section className="py-16 lg:py-24">
          <Container size="default">
            <div className="relative rounded-[40px] bg-surface text-foreground border border-border p-12 lg:p-20 text-center overflow-hidden shadow-[var(--shadow-soft)]">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(163,199,51,0.14),transparent_55%),radial-gradient(circle_at_75%_75%,rgba(45,74,31,0.06),transparent_60%)]"
              />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-4">
                  Twój następny krok
                </p>
                <h2 className="font-bold tracking-tight text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.15] mb-7 max-w-2xl mx-auto">
                  Szukasz nieruchomości?
                  <br />
                  Zacznijmy od rozmowy, nie od przypadkowych ogłoszeń.
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button asChild variant="lime" size="lg">
                    <Link href="/konsultacja">
                      Umów konsultację
                      <ArrowRight />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href="tel:+48608692552">
                      <Phone />
                      608 692 552
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>
    </>
  );
}
