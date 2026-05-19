import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Check,
  Target,
  Megaphone,
  Handshake,
  Users,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Strefa sprzedającego. Strategia sprzedaży nieruchomości w Trójmieście",
  description:
    "Sprzedaż nieruchomości to strategia, nie przypadek. Analiza, marketing, prezentacja, negocjacje. Kompleksowo prowadzimy proces sprzedaży w Gdyni, Sopocie, Gdańsku.",
};

const proces = [
  "analizujemy jej potencjał",
  "dobieramy grupę docelową",
  "ustalamy strategię komunikacji",
  "przygotowujemy plan marketingowy",
  "dbamy o prezentację nieruchomości",
];

const filary = [
  {
    icon: Target,
    label: "01",
    title: "Strategia i przygotowanie",
    points: [
      "analiza rynku i wycena",
      "strategia sprzedaży",
      "przygotowanie nieruchomości",
      "home staging",
      "sesja zdjęciowa i video",
    ],
    tone: "light" as const,
  },
  {
    icon: Megaphone,
    label: "02",
    title: "Marketing",
    points: [
      "promocja w social mediach",
      "współpraca międzyagentowa",
      "marketing off market",
      "baza klientów poszukujących",
      "kampanie reklamowe",
    ],
    tone: "lime" as const,
  },
  {
    icon: Handshake,
    label: "03",
    title: "Obsługa procesu sprzedaży",
    points: [
      "prezentacje nieruchomości",
      "selekcja klientów",
      "negocjacje",
      "bezpieczeństwo formalne",
      "koordynacja notariusza",
      "przekazanie nieruchomości",
    ],
    tone: "light" as const,
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
  "ze społecznością off market",
  "z agentami lokalnymi i ogólnopolskimi",
  "z ekspertami rynku nieruchomości",
];

const historie = [
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
      {/* HERO */}
      <section className="relative pt-36 lg:pt-48 pb-14 lg:pb-20 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(163,199,51,0.16),transparent_55%),radial-gradient(circle_at_85%_60%,rgba(45,74,31,0.08),transparent_55%)]"
        />

        <Container size="wide">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
              Strefa sprzedającego
            </p>
            <h1 className="font-bold tracking-tight text-[clamp(2.25rem,5.2vw,4rem)] leading-[1.05] text-foreground">
              Sprzedaż nieruchomości to strategia.
              <br />
              <span className="text-foreground-muted">Nie przypadek.</span>
            </h1>
            <p className="mt-6 text-lg text-foreground-muted leading-relaxed max-w-2xl">
              Dobra sprzedaż zaczyna się dużo wcześniej niż publikacja ogłoszenia.
              Tworzymy przemyślane strategie sprzedaży, które pomagają naszym
              klientom osiągać najlepsze rezultaty.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="primary" size="md">
                <Link href="/konsultacja">
                  Umów spotkanie
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="md">
                <a href="#jak-pracujemy">
                  Poznaj nasz sposób pracy
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* SEKCJA 1 — JAK PRACUJEMY */}
      <Reveal>
        <section id="jak-pracujemy" className="py-16 lg:py-24 bg-surface scroll-mt-24">
          <Container size="wide">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                  01 · Jak pracujemy?
                </p>
                <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-tight text-foreground mb-6">
                  Nie wrzucamy ofert do&nbsp;internetu i&nbsp;nie czekamy.
                </h2>
                <p className="text-lg text-foreground-muted leading-relaxed mb-6">
                  Każda nieruchomość wymaga indywidualnej strategii. Dlatego zanim
                  oferta trafi na rynek:
                </p>
                <p className="text-foreground font-semibold leading-relaxed">
                  Bo skuteczna sprzedaż zaczyna się od dobrego przygotowania.
                </p>
              </div>

              <div className="lg:col-span-7">
                <ul className="space-y-3">
                  {proces.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-background hover:border-brand-forest/40 transition-colors"
                    >
                      <span className="size-7 rounded-full bg-brand-lime/20 text-brand-olive flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="size-4" strokeWidth={3} />
                      </span>
                      <span className="text-foreground leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* SEKCJA 2 — CO ROBIMY DLA SPRZEDAJĄCEGO (3 filary) */}
      <Reveal>
        <section className="py-16 lg:py-24">
          <Container size="wide">
            <div className="max-w-2xl mb-10 lg:mb-14">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                02 · Co robimy dla sprzedającego?
              </p>
              <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-foreground">
                Kompleksowo prowadzimy
                <br />
                <span className="text-foreground-muted">cały proces sprzedaży.</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-5">
              {filary.map((f) => {
                const Icon = f.icon;
                const isLime = f.tone === "lime";
                return (
                  <div
                    key={f.label}
                    className={`relative rounded-3xl p-7 lg:p-8 border ${
                      isLime
                        ? "bg-brand-forest-deep text-foreground-on-dark border-brand-forest"
                        : "bg-surface border-border"
                    }`}
                  >
                    <div
                      className={`size-12 rounded-2xl flex items-center justify-center mb-5 ${
                        isLime
                          ? "bg-brand-lime text-brand-forest-deep"
                          : "bg-brand-lime/15 text-brand-olive"
                      }`}
                    >
                      <Icon className="size-6" />
                    </div>
                    <p
                      className={`text-[10px] font-semibold uppercase tracking-wider mb-2 ${
                        isLime ? "text-brand-lime" : "text-brand-olive"
                      }`}
                    >
                      {f.label}
                    </p>
                    <h3 className="font-bold text-xl mb-5 leading-tight">
                      {f.title}
                    </h3>
                    <ul className="space-y-2.5">
                      {f.points.map((p) => (
                        <li
                          key={p}
                          className={`flex items-start gap-2.5 text-sm leading-relaxed ${
                            isLime
                              ? "text-foreground-on-dark-muted"
                              : "text-foreground-muted"
                          }`}
                        >
                          <Check
                            className={`size-4 shrink-0 mt-0.5 ${
                              isLime ? "text-brand-lime" : "text-brand-olive"
                            }`}
                            strokeWidth={3}
                          />
                          <span>{p}</span>
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

      {/* SEKCJA 3 — DLACZEGO SKUTECZNIE */}
      <Reveal>
        <section className="py-16 lg:py-24 bg-surface">
          <Container size="wide">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                  03 · Dlaczego skutecznie?
                </p>
                <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-tight text-foreground mb-6">
                  Bo za&nbsp;każdą ofertą stoi strategia i&nbsp;doświadczenie.
                </h2>
                <p className="text-lg text-foreground-muted leading-relaxed mb-4">
                  Nie działamy szablonowo. Każda nieruchomość ma inną historię.
                  I wymaga indywidualnego podejścia.
                </p>
              </div>

              <div className="lg:col-span-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-brand-olive mb-5">
                  W naszej pracy liczy się:
                </p>
                <div className="flex flex-wrap gap-2">
                  {wartosci.map((w) => (
                    <span
                      key={w}
                      className="inline-flex items-center gap-2 pl-2.5 pr-4 py-2 rounded-full bg-background border border-border text-foreground"
                    >
                      <Sparkles className="size-3.5 text-brand-olive" />
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* SEKCJA 4 — WSPÓŁPRACA MIĘDZYAGENTOWA */}
      <Reveal>
        <section className="py-16 lg:py-24">
          <Container size="wide">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                  04 · Współpraca międzyagentowa
                </p>
                <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-tight text-foreground mb-6">
                  Dobra współpraca zwiększa skuteczność sprzedaży.
                </h2>
                <p className="text-lg text-foreground-muted leading-relaxed mb-4">
                  Bo naszym celem nie jest tylko publikacja oferty.
                </p>
                <p className="text-foreground font-semibold leading-relaxed">
                  Naszym celem jest skuteczna sprzedaż.
                </p>
              </div>

              <div className="lg:col-span-7">
                <ul className="space-y-3">
                  {wspolpraca.map((w) => (
                    <li
                      key={w}
                      className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-surface hover:border-brand-forest/40 transition-colors"
                    >
                      <span className="size-7 rounded-full bg-brand-lime/20 text-brand-olive flex items-center justify-center shrink-0 mt-0.5">
                        <Users className="size-4" strokeWidth={2.5} />
                      </span>
                      <span className="text-foreground leading-relaxed">
                        Aktywnie współpracujemy {w}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* SEKCJA 5 — HISTORIE KLIENTÓW */}
      <Reveal>
        <section className="py-16 lg:py-24 bg-surface">
          <Container size="wide">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                05 · Historie naszych klientów
              </p>
              <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-tight text-foreground mb-6">
                Za&nbsp;każdą sprzedażą stoi człowiek.
              </h2>
              <p className="text-lg text-foreground-muted leading-relaxed mb-4">
                Czasami to szybka sprzedaż po jednej prezentacji. Czasami proces
                wymagający miesięcy przygotowań, wielu rozmów i strategicznych decyzji.
              </p>
            </div>

            <p className="mt-10 text-sm font-semibold uppercase tracking-wider text-brand-olive mb-5">
              Sprzedajemy:
            </p>
            <div className="flex flex-wrap gap-2 mb-10">
              {historie.map((h) => (
                <span
                  key={h}
                  className="inline-flex items-center pl-4 pr-4 py-2 rounded-full bg-background border border-border text-foreground"
                >
                  {h}
                </span>
              ))}
            </div>

            <p className="max-w-3xl text-lg text-foreground leading-relaxed">
              Ale przede wszystkim pomagamy ludziom przejść przez ważne życiowe zmiany.
            </p>
          </Container>
        </section>
      </Reveal>

      {/* SEKCJA 6 — FAQ */}
      <Reveal>
        <section className="py-16 lg:py-24">
          <Container size="default">
            <div className="max-w-2xl mb-10 lg:mb-14">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                06 · FAQ
              </p>
              <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-foreground">
                Najczęściej zadawane pytania
              </h2>
            </div>

            <div className="space-y-3">
              {faq.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-brand-forest/40 open:border-brand-forest/40"
                >
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                    <span className="font-semibold text-foreground text-lg leading-snug">
                      {item.q}
                    </span>
                    <ChevronDown
                      className="size-5 text-foreground-muted shrink-0 mt-1 group-open:rotate-180 transition-transform"
                      strokeWidth={2.2}
                    />
                  </summary>
                  <p className="mt-4 text-foreground-muted leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </Container>
        </section>
      </Reveal>

      {/* CTA KOŃCOWY */}
      <Reveal>
        <section className="py-16 lg:py-24">
          <Container size="default">
            <div className="relative rounded-[40px] bg-surface-dark text-foreground-on-dark p-10 lg:p-16 text-center overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(163,199,51,0.18),transparent_55%),radial-gradient(circle_at_75%_75%,rgba(45,74,31,0.5),transparent_60%)]"
              />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-lime mb-3">
                  Myślisz o sprzedaży nieruchomości?
                </p>
                <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-tight mb-6">
                  Zacznijmy od&nbsp;strategii,
                  <br />
                  nie od&nbsp;przypadku.
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button asChild variant="lime" size="lg">
                    <Link href="/konsultacja">
                      Umów spotkanie
                      <ArrowRight />
                    </Link>
                  </Button>
                  <Button asChild variant="outline-dark" size="lg">
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
