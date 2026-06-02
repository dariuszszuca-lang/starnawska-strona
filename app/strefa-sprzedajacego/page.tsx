import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, HelpCircle, Phone, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Strefa sprzedającego. Strategia sprzedaży nieruchomości",
  description:
    "Sprzedaż nieruchomości to strategia. Nie przypadek. Tworzymy przemyślane strategie sprzedaży, które pomagają naszym klientom osiągać najlepsze rezultaty.",
};

const przygotowanie = [
  "analizujemy jej potencjał",
  "dobieramy grupę docelową",
  "ustalamy strategię komunikacji",
  "przygotowujemy plan marketingowy",
  "dbamy o prezentację nieruchomości",
];

const obszary = [
  {
    title: "Strategia i przygotowanie",
    points: [
      "analiza rynku i wycena",
      "strategia sprzedaży",
      "przygotowanie nieruchomości",
      "home staging",
      "sesja zdjęciowa i video",
    ],
  },
  {
    title: "Marketing",
    points: [
      "promocja w social mediach",
      "współpraca międzyagencyjna",
      "marketing off market",
      "baza klientów poszukujących",
      "kampanie reklamowe",
    ],
  },
  {
    title: "Obsługa procesu sprzedaży",
    points: [
      "prezentacje nieruchomości",
      "selekcja klientów",
      "negocjacje",
      "bezpieczeństwo formalne",
      "koordynacja notariusza",
      "przekazanie nieruchomości",
    ],
  },
];

const wartosci = [
  "komunikacja",
  "relacje",
  "współpraca",
  "jakość prezentacji",
  "znajomość rynku",
  "umiejętność negocjacji",
  "skuteczność działania",
];

const wspolpraca = [
  "z innymi pośrednikami",
  "społecznością off market",
  "agentami lokalnymi i ogólnopolskimi",
  "ekspertami rynku nieruchomości",
];

const sprzedajemy = [
  "mieszkania",
  "domy",
  "działki",
  "nieruchomości inwestycyjne",
  "nieruchomości premium",
  "nieruchomości nad morzem",
  "oferty off market",
];

const faq = [
  {
    q: "Czy współpracujecie na wyłączność?",
    a: "Tak. Dzięki temu możemy w pełni odpowiadać za strategię sprzedaży i jakość działań marketingowych.",
  },
  {
    q: "Czy pomagacie przygotować nieruchomość do sprzedaży?",
    a: "Tak. Doradzamy, jak przygotować nieruchomość, aby zwiększyć jej atrakcyjność. Współpracujemy z home stagerami, mamy własny magazyn wyposażenia i profesjonalnego fotografa wnętrz.",
  },
  {
    q: "Czy współpracujecie z innymi biurami?",
    a: "Tak. Wierzymy w skuteczną współpracę międzyagentową.",
  },
  {
    q: "Czy prowadzicie sprzedaż off market?",
    a: "Tak. W wybranych przypadkach realizujemy również sprzedaż poza portalami.",
  },
  {
    q: "Czy pomagacie w formalnościach?",
    a: "Tak. Koordynujemy cały proces aż do przekazania nieruchomości.",
  },
];

export default function StrefaSprzedajacegoPage() {
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
              Strefa sprzedającego
            </div>
            <h1 className="font-bold tracking-tight text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] text-foreground">
              Sprzedaż nieruchomości to strategia.
              <br />
              <span className="text-brand-forest">Nie przypadek.</span>
            </h1>
            <p className="mt-7 text-lg lg:text-xl text-foreground-muted leading-relaxed max-w-2xl">
              Dobra sprzedaż zaczyna się dużo wcześniej niż publikacja ogłoszenia.
              Tworzymy przemyślane strategie sprzedaży, które pomagają naszym klientom
              osiągać najlepsze rezultaty.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="primary" size="lg">
                <Link href="/konsultacja">
                  Umów spotkanie
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#jak-pracujemy">Poznaj nasz sposób pracy</a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Reveal>
        <section id="jak-pracujemy" className="py-16 lg:py-24 bg-surface scroll-mt-24">
          <Container size="wide">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-5 lg:sticky lg:top-32">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                  Nasze podejście
                </p>
                <h2 className="font-bold tracking-tight text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-foreground mb-6">
                  Jak pracujemy?
                </h2>
                <p className="text-lg text-foreground leading-relaxed mb-4">
                  Nie wrzucamy ofert do internetu i nie czekamy.
                </p>
                <p className="text-lg text-foreground-muted leading-relaxed">
                  Każda nieruchomość wymaga indywidualnej strategii.
                  Dlatego zanim oferta trafi na rynek:
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
                      Bo skuteczna sprzedaż
                      <br />
                      <span className="text-brand-forest">zaczyna się od dobrego przygotowania.</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <ul className="grid sm:grid-cols-2 gap-5">
                  {przygotowanie.map((item, index) => (
                    <li
                      key={item}
                      className="group relative rounded-[28px] bg-background border border-border shadow-[var(--shadow-soft)] overflow-hidden hover:border-brand-lime/60 hover:shadow-[0_20px_50px_-20px_rgba(45,74,31,0.25)] hover:-translate-y-1 transition-all duration-400"
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
                      <div className="relative p-6 lg:p-7 min-h-[150px] flex flex-col">
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-olive/80 mb-3">
                          0{index + 1}
                        </div>
                        <span className="text-base lg:text-lg font-semibold text-foreground leading-snug tracking-tight">
                          {item}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
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
                Zakres usług
              </p>
              <h2 className="font-bold tracking-tight text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-foreground mb-5">
                Co robimy dla sprzedającego?
              </h2>
              <p className="text-lg text-foreground-muted leading-relaxed">
                Kompleksowo prowadzimy cały proces sprzedaży.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {obszary.map((area, index) => {
                const featured = index === 1;
                return (
                  <div
                    key={area.title}
                    className={`group relative rounded-[30px] border shadow-[var(--shadow-soft)] overflow-hidden hover:shadow-[0_24px_60px_-20px_rgba(45,74,31,0.30)] hover:-translate-y-1 transition-all duration-400 ${
                      featured
                        ? "bg-brand-lime/[0.10] border-brand-lime/35 hover:border-brand-lime/70"
                        : "bg-surface border-border hover:border-brand-lime/60"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="absolute -top-4 right-5 text-[8rem] font-bold tabular-nums leading-none text-brand-lime/[0.08] group-hover:text-brand-lime/[0.22] transition-all duration-500 pointer-events-none select-none"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-br from-brand-lime/0 via-transparent to-brand-lime/0 group-hover:from-brand-lime/[0.06] group-hover:to-brand-lime/[0.12] transition-all duration-500"
                    />
                    <div
                      aria-hidden
                      className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-lime/0 via-brand-lime/70 to-brand-lime/0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    />
                    <div className="relative p-8 lg:p-9">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-brand-olive/80">
                        Obszar 0{index + 1}
                      </p>
                      <h3 className="font-bold text-xl lg:text-2xl leading-tight mb-6 tracking-tight">{area.title}</h3>
                      <ul className="space-y-3">
                        {area.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
                          >
                            <span className="size-5 rounded-md bg-brand-lime/15 text-brand-olive flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand-lime/30 transition-all duration-300">
                              <Check className="size-3" strokeWidth={3} />
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal>
        <section className="relative py-16 lg:py-24 bg-surface text-foreground overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(163,199,51,0.12),transparent_52%),radial-gradient(ellipse_at_bottom_left,rgba(45,74,31,0.06),transparent_60%)]"
          />
          <Container size="wide" className="relative">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                  Skuteczność, nie przypadek
                </p>
                <h2 className="font-bold tracking-tight text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] mb-6">
                  Dlaczego nasze oferty sprzedają się skutecznie?
                </h2>
                <p className="text-lg text-foreground-muted leading-relaxed mb-4">
                  Bo za każdą ofertą stoi strategia i doświadczenie.
                </p>
                <p className="text-lg text-foreground-muted leading-relaxed">
                  Nie działamy szablonowo.
                  <br />
                  Każda nieruchomość ma inną historię.
                  <br />
                  I wymaga indywidualnego podejścia.
                </p>
              </div>
              <div className="lg:col-span-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-olive/80 mb-5">
                  W naszej pracy liczy się:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {wartosci.map((item, index) => (
                    <div
                      key={item}
                      className="group relative rounded-2xl bg-background border border-border shadow-[var(--shadow-soft)] overflow-hidden hover:border-brand-lime/60 hover:shadow-[0_16px_40px_-16px_rgba(45,74,31,0.22)] hover:-translate-y-1 transition-all duration-400"
                    >
                      <span
                        aria-hidden
                        className="absolute -top-2 right-3 text-[5rem] font-bold tabular-nums leading-none text-brand-lime/[0.08] group-hover:text-brand-lime/[0.20] transition-all duration-500 pointer-events-none select-none"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-br from-brand-lime/0 via-transparent to-brand-lime/0 group-hover:from-brand-lime/[0.05] group-hover:to-brand-lime/[0.12] transition-all duration-500"
                      />
                      <div
                        aria-hidden
                        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-lime/0 via-brand-lime/60 to-brand-lime/0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      />
                      <div className="relative flex items-center gap-3 p-5">
                        <span className="size-10 rounded-xl bg-brand-lime/15 text-brand-olive flex items-center justify-center shrink-0 group-hover:bg-brand-lime/30 group-hover:rotate-6 transition-all duration-300">
                          <Check className="size-4.5" strokeWidth={2.6} />
                        </span>
                        <span className="font-semibold text-foreground text-base leading-snug tracking-tight">
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
        <section className="py-16 lg:py-24">
          <Container size="wide">
            <div className="max-w-3xl mb-12">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                Sieć współpracy
              </p>
              <h2 className="font-bold tracking-tight text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-foreground mb-5">
                Współpraca międzyagencyjna
              </h2>
              <p className="text-lg text-foreground-muted leading-relaxed">
                Wierzymy, że dobra współpraca zwiększa skuteczność sprzedaży.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {wspolpraca.map((item, index) => (
                <div
                  key={item}
                  className="group relative rounded-[28px] bg-surface border border-border shadow-[var(--shadow-soft)] overflow-hidden hover:border-brand-lime/60 hover:shadow-[0_20px_50px_-20px_rgba(45,74,31,0.25)] hover:-translate-y-1 transition-all duration-400"
                >
                  <span
                    aria-hidden
                    className="absolute -top-3 right-4 text-[7rem] lg:text-[8rem] font-bold tabular-nums leading-none text-brand-lime/[0.08] group-hover:text-brand-lime/[0.20] transition-all duration-500 pointer-events-none select-none"
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
                  <div className="relative p-6 lg:p-7 min-h-[170px] flex flex-col">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-brand-olive/80 font-bold mb-4 tabular-nums">
                      0{index + 1}
                    </p>
                    <p className="font-semibold text-foreground text-base lg:text-lg leading-snug tracking-tight">{item}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-10 text-xl font-semibold text-foreground">
              Bo naszym celem nie jest tylko publikacja oferty.
              <br />
              Naszym celem jest skuteczna sprzedaż.
            </p>
          </Container>
        </section>
      </Reveal>

      <Reveal>
        <section className="py-16 lg:py-24 bg-surface">
          <Container size="wide">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                  Nasza specjalizacja
                </p>
                <h2 className="font-bold tracking-tight text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-foreground mb-6">
                  Historie naszych klientów
                </h2>
                <p className="text-xl text-foreground font-semibold leading-relaxed mb-5">
                  Za każdą sprzedażą stoi człowiek.
                </p>
                <p className="text-lg text-foreground-muted leading-relaxed mb-5">
                  Czasami to szybka sprzedaż po jednej prezentacji.
                  <br />
                  Czasami proces wymagający miesięcy przygotowań, wielu rozmów i strategicznych decyzji.
                </p>
                <p className="text-lg text-foreground-muted leading-relaxed">
                  Ale przede wszystkim pomagamy ludziom przejść przez ważne życiowe zmiany.
                </p>
              </div>
              <div className="lg:col-span-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-olive/80 mb-5">
                  Sprzedajemy:
                </p>
                <div className="grid gap-3">
                  {sprzedajemy.map((item, index) => (
                    <div
                      key={item}
                      className="group relative rounded-2xl bg-background border border-border shadow-[var(--shadow-soft)] overflow-hidden hover:border-brand-lime/60 hover:shadow-[0_16px_40px_-16px_rgba(45,74,31,0.22)] hover:-translate-x-1 transition-all duration-400"
                    >
                      <span
                        aria-hidden
                        className="absolute -top-2 right-3 text-[4.5rem] font-bold tabular-nums leading-none text-brand-lime/[0.08] group-hover:text-brand-lime/[0.20] transition-all duration-500 pointer-events-none select-none"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-r from-brand-lime/0 via-transparent to-brand-lime/0 group-hover:from-brand-lime/[0.06] group-hover:to-brand-lime/[0.10] transition-all duration-500"
                      />
                      <div
                        aria-hidden
                        className="absolute left-0 top-4 bottom-4 w-[3px] bg-brand-lime/0 group-hover:bg-brand-lime rounded-r-full transition-all duration-300"
                      />
                      <div className="relative flex items-center gap-3 px-5 py-4">
                        <span className="size-8 rounded-lg bg-brand-lime/15 text-brand-olive flex items-center justify-center shrink-0 group-hover:bg-brand-lime/30 group-hover:rotate-6 transition-all duration-300">
                          <Check className="size-4" strokeWidth={2.8} />
                        </span>
                        <span className="font-semibold text-foreground text-base leading-snug tracking-tight">{item}</span>
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
                  Myślisz o sprzedaży nieruchomości?
                  <br />
                  Zacznijmy od strategii, nie od przypadku.
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button asChild variant="lime" size="lg">
                    <Link href="/konsultacja">
                      Umów spotkanie
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
