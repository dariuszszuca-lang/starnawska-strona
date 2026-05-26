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
      "współpraca międzyagentowa",
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
    a: "Tak. Doradzamy, jak przygotować nieruchomość, aby zwiększyć jej atrakcyjność.",
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
                  Jak pracujemy?
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
              </div>

              <div className="lg:col-span-7">
                <ul className="space-y-3">
                  {przygotowanie.map((item, index) => (
                    <li
                      key={item}
                      className="group flex items-start gap-5 p-6 rounded-[28px] border border-border bg-background/90 shadow-[var(--shadow-soft)] hover:border-brand-olive/45 hover:-translate-y-0.5 transition-all"
                    >
                      <span className="font-bold text-2xl text-brand-olive/35 tabular-nums w-10 shrink-0 group-hover:text-brand-olive transition-colors">
                        0{index + 1}
                      </span>
                      <span className="text-lg text-foreground leading-relaxed pt-1">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-xl font-semibold text-foreground">
                  Bo skuteczna sprzedaż zaczyna się od dobrego przygotowania.
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
                Co robimy dla sprzedającego?
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
                    className={`rounded-[30px] p-8 lg:p-9 border shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 ${
                      featured
                        ? "bg-brand-lime/[0.10] border-brand-lime/35"
                        : "bg-surface border-border"
                    }`}
                  >
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.18em] mb-4 text-brand-olive"
                    >
                      0{index + 1}
                    </p>
                    <h3 className="font-bold text-2xl leading-tight mb-6">{area.title}</h3>
                    <ul className="space-y-3">
                      {area.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
                        >
                          <Check
                            className="size-4 shrink-0 mt-0.5 text-brand-olive"
                            strokeWidth={3}
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
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
                  Dlaczego nasze oferty sprzedają się skutecznie?
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
                <p className="text-xs uppercase tracking-wider text-brand-olive font-semibold mb-5">
                  W naszej pracy liczy się:
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {wartosci.map((item, index) => (
                    <span
                      key={item}
                      className={`inline-flex items-center gap-2 pl-3 pr-5 py-2.5 rounded-full text-sm font-medium ${
                        index % 3 === 0
                          ? "bg-brand-lime/20 text-brand-forest-deep border border-brand-lime/35"
                          : "bg-background text-foreground border border-border"
                      }`}
                    >
                      <Check className="size-3.5" />
                      {item}
                    </span>
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
                Współpraca międzyagentowa
              </p>
              <h2 className="font-bold tracking-tight text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-foreground mb-5">
                Współpraca międzyagentowa
              </h2>
              <p className="text-lg text-foreground-muted leading-relaxed">
                Wierzymy, że dobra współpraca zwiększa skuteczność sprzedaży.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {wspolpraca.map((item, index) => (
                <div
                  key={item}
                  className="rounded-[28px] bg-surface border border-border p-7 shadow-[var(--shadow-soft)] hover:border-brand-olive/45 hover:-translate-y-0.5 transition-all"
                >
                  <p className="text-[10px] uppercase tracking-wider text-brand-olive font-semibold mb-4 tabular-nums">
                    0{index + 1}
                  </p>
                  <p className="font-semibold text-foreground leading-relaxed">{item}</p>
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
                  Historie naszych klientów
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
                <p className="text-xs uppercase tracking-wider text-brand-olive font-semibold mb-5">
                  Sprzedajemy:
                </p>
                <div className="grid gap-2.5">
                  {sprzedajemy.map((item, index) => (
                    <div
                      key={item}
                      className={`flex items-center gap-3 px-5 py-4 rounded-2xl border ${
                        index % 2 === 0
                          ? "bg-background border-border"
                          : "bg-brand-lime/10 border-brand-lime/30"
                      }`}
                    >
                      <span className="size-2 rounded-full bg-brand-lime shrink-0" />
                      <span className="font-medium text-foreground">{item}</span>
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
                    <a href="tel:+48532843660">
                      <Phone />
                      532 843 660
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
