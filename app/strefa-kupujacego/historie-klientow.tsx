"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Building2, Check, Home, X, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Block =
  | { t: "p"; c: string }
  | { t: "closing"; c: string }
  | { t: "quote"; lead?: string; c: string }
  | { t: "beat"; lead?: string; c: string };

type Story = {
  icon: LucideIcon;
  title: string;
  essence: string;
  blocks: Block[];
  efekt: string[];
};

const historie: Story[] = [
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

function StoryBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        if (block.t === "quote") {
          return (
            <div
              key={i}
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
                {block.lead ? (
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-olive/80 mb-3">
                    {block.lead}
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
              key={i}
              className="my-2 rounded-[24px] border border-brand-lime/30 bg-brand-lime/[0.06] p-6 lg:p-7"
            >
              {block.lead ? (
                <p className="text-lg text-foreground-muted leading-relaxed mb-2">
                  {block.lead}
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
              key={i}
              className="text-foreground font-semibold leading-relaxed text-lg lg:text-xl pt-6 mt-2 border-t border-border"
            >
              {block.c}
            </p>
          );
        }

        return (
          <p key={i} className="text-lg text-foreground-muted leading-relaxed">
            {block.c}
          </p>
        );
      })}
    </div>
  );
}

export function HistorieKlientow() {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const active = open !== null ? historie[open] : null;

  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div className="mt-10 lg:mt-14 grid gap-6 lg:grid-cols-2">
        {historie.map((story, i) => {
          const Icon = story.icon;
          const teaser = story.blocks.find((b) => b.t === "p")?.c ?? "";
          return (
            <article
              key={story.title}
              className="group relative flex flex-col rounded-[32px] bg-background border border-border shadow-[var(--shadow-soft)] overflow-hidden hover:border-brand-lime/60 hover:shadow-[0_24px_60px_-24px_rgba(45,74,31,0.28)] hover:-translate-y-1 transition-all duration-400"
            >
              <div
                aria-hidden
                className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-lime/0 via-brand-lime/70 to-brand-lime/0 opacity-0 group-hover:opacity-100 transition-all duration-500"
              />
              <span
                aria-hidden
                className="absolute -top-4 right-5 text-[6.5rem] font-bold tabular-nums leading-none text-brand-lime/[0.08] group-hover:text-brand-lime/[0.18] transition-all duration-500 pointer-events-none select-none"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative flex flex-col flex-1 p-7 sm:p-9">
                <div className="inline-flex w-fit items-center gap-2 px-3 py-1.5 rounded-full bg-brand-lime/15 text-brand-forest-deep text-xs font-semibold uppercase tracking-wider mb-5">
                  <Icon className="size-3.5" />
                  Historia klienta
                </div>
                <h3 className="font-bold tracking-tight text-[clamp(1.4rem,2.6vw,1.9rem)] leading-[1.15] text-foreground mb-3">
                  {story.title}
                </h3>
                <p className="text-base lg:text-lg text-brand-forest font-semibold leading-relaxed mb-3">
                  {story.essence}
                </p>
                <p className="text-base text-foreground-muted leading-relaxed line-clamp-3">
                  {teaser}
                </p>

                <div className="mt-7 pt-5 border-t border-border flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-olive/80">
                    Efekt: {story.efekt.length} punktów
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setOpen(i)}
                    aria-label={`Czytaj dalej: ${story.title}`}
                  >
                    Czytaj dalej
                    <ArrowRight />
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-brand-forest-deep/40 backdrop-blur-sm"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <motion.div
              className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[86vh] flex flex-col bg-background border border-border rounded-t-[32px] sm:rounded-[32px] shadow-[0_30px_80px_-20px_rgba(45,74,31,0.45)] overflow-hidden"
              initial={reduce ? false : { y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { y: 30, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Zamknij"
                className="absolute top-4 right-4 z-10 size-10 rounded-full bg-surface/90 backdrop-blur border border-border text-foreground flex items-center justify-center hover:bg-brand-lime hover:text-brand-forest-deep hover:border-brand-lime transition-all"
              >
                <X className="size-5" />
              </button>

              <div className="overflow-y-auto p-7 sm:p-9 lg:p-10 pt-12 sm:pt-12">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-lime/15 text-brand-forest-deep text-xs font-semibold uppercase tracking-wider mb-5">
                  <active.icon className="size-3.5" />
                  Historia klienta
                </div>
                <h3 className="font-bold tracking-tight text-[clamp(1.6rem,3vw,2.25rem)] leading-[1.15] text-foreground mb-4">
                  {active.title}
                </h3>
                <p className="text-lg lg:text-xl text-brand-forest font-semibold leading-relaxed mb-7">
                  {active.essence}
                </p>

                <StoryBlocks blocks={active.blocks} />

                <div className="mt-9 rounded-[28px] bg-gradient-to-br from-brand-lime/[0.08] via-brand-lime/[0.05] to-transparent border border-brand-lime/35 p-7 lg:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-olive/80 mb-5">
                    Efekt współpracy
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3.5">
                    {active.efekt.map((item) => (
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
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
