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
  Quote,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Strefa sprzedającego. Strategia sprzedaży nieruchomości w Trójmieście",
  description:
    "Sprzedaż nieruchomości to strategia, nie przypadek. Analiza, marketing, prezentacja, negocjacje. Kompleksowo prowadzimy proces sprzedaży w Gdyni, Sopocie, Gdańsku.",
};

const proces = [
  "analizujemy potencjał nieruchomości",
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
    intro: "Każda sprzedaż zaczyna się od strategii. Nie od portalu.",
    points: [
      "analiza rynku i wycena",
      "strategia sprzedaży",
      "przygotowanie nieruchomości",
      "home staging",
      "sesja zdjęciowa i video",
    ],
  },
  {
    icon: Megaphone,
    label: "02",
    title: "Marketing",
    intro: "Docieramy tam, gdzie są kupujący. Z portalami i poza nimi.",
    points: [
      "promocja w social mediach",
      "współpraca międzyagentowa",
      "marketing off market",
      "baza klientów poszukujących",
      "kampanie reklamowe",
    ],
  },
  {
    icon: Handshake,
    label: "03",
    title: "Obsługa procesu sprzedaży",
    intro: "Od pierwszej prezentacji aż do przekazania kluczy.",
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
  "negocjacje",
  "skuteczność",
];

const wspolpraca = [
  { label: "Inni pośrednicy", desc: "Wymieniamy oferty z biurami z całego Trójmiasta." },
  { label: "Społeczność off market", desc: "Część ofert wcale nie trafia do portali." },
  { label: "Agenci lokalni i ogólnopolscy", desc: "Mamy zasięg poza Pomorzem." },
  { label: "Eksperci rynku nieruchomości", desc: "Prawnicy, doradcy kredytowi, geodeci." },
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
      {/* HERO — split layout z dramatyczną typografią i metrics */}
      <section className="relative overflow-hidden bg-background">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(163,199,51,0.15),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(45,74,31,0.10),transparent_60%)]"
        />
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-brand-lime/[0.03] blur-[140px]"
        />

        <Container size="wide" className="relative pt-36 lg:pt-48 pb-16 lg:pb-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-lime/15 text-brand-forest-deep text-xs font-semibold uppercase tracking-wider mb-5">
                <Sparkles className="size-3.5" />
                Strefa sprzedającego
              </div>
              <h1 className="font-bold tracking-tight text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] text-foreground">
                Sprzedaż to <span className="text-gradient-lime">strategia</span>.
                <br />
                <span className="text-foreground-muted">Nie przypadek.</span>
              </h1>
              <p className="mt-7 text-lg lg:text-xl text-foreground-muted leading-relaxed max-w-2xl">
                Dobra sprzedaż zaczyna się długo przed publikacją ogłoszenia.
                Tworzymy przemyślane strategie sprzedaży, które pomagają naszym
                klientom osiągać najlepsze rezultaty.
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

            <div className="lg:col-span-5">
              <div className="grid grid-cols-3 gap-4 lg:gap-5">
                <div className="rounded-2xl border border-border bg-surface p-5 lg:p-6">
                  <p className="text-[10px] uppercase tracking-wider text-brand-olive font-semibold mb-2">
                    Na rynku
                  </p>
                  <p className="font-bold text-3xl lg:text-4xl text-foreground tabular-nums leading-none">
                    {siteConfig.metrics.yearsActive}
                  </p>
                  <p className="mt-1 text-[11px] text-foreground-muted">lat</p>
                </div>
                <div className="rounded-2xl border border-brand-forest bg-brand-forest-deep text-foreground-on-dark p-5 lg:p-6">
                  <p className="text-[10px] uppercase tracking-wider text-brand-lime font-semibold mb-2">
                    Transakcji
                  </p>
                  <p className="font-bold text-3xl lg:text-4xl tabular-nums leading-none">
                    {siteConfig.metrics.transactions}
                  </p>
                  <p className="mt-1 text-[11px] text-foreground-on-dark-muted">zrealizowanych</p>
                </div>
                <div className="rounded-2xl border border-border bg-surface p-5 lg:p-6">
                  <p className="text-[10px] uppercase tracking-wider text-brand-olive font-semibold mb-2">
                    Ocena
                  </p>
                  <p className="font-bold text-3xl lg:text-4xl text-foreground tabular-nums leading-none inline-flex items-baseline gap-1">
                    {siteConfig.metrics.rating}
                    <span className="text-sm text-brand-olive">★</span>
                  </p>
                  <p className="mt-1 text-[11px] text-foreground-muted">średnia</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SEKCJA 1 — JAK PRACUJEMY (sticky lead + numbered list) */}
      <Reveal>
        <section id="jak-pracujemy" className="py-20 lg:py-28 bg-surface scroll-mt-24">
          <Container size="wide">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-5 lg:sticky lg:top-32">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                  01 · Jak pracujemy
                </p>
                <h2 className="font-bold tracking-tight text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] text-foreground mb-6">
                  Nie wrzucamy ofert do&nbsp;internetu i&nbsp;nie czekamy.
                </h2>
                <p className="text-lg text-foreground-muted leading-relaxed mb-6">
                  Każda nieruchomość wymaga indywidualnej strategii. Dlatego
                  zanim oferta trafi na rynek, robimy konkretną pracę.
                </p>
                <div className="inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-brand-lime/15 border border-brand-lime/30">
                  <TrendingUp className="size-5 text-brand-forest-deep shrink-0" />
                  <p className="text-sm font-semibold text-brand-forest-deep">
                    Skuteczna sprzedaż zaczyna się od&nbsp;przygotowania.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7">
                <ul className="space-y-3">
                  {proces.map((p, i) => (
                    <li
                      key={p}
                      className="group relative flex items-start gap-5 p-6 rounded-3xl border border-border bg-background hover:border-brand-forest hover:shadow-[var(--shadow-card)] hover:-translate-y-0.5 transition-all"
                    >
                      <span className="font-bold text-2xl text-brand-lime/40 tabular-nums w-10 shrink-0 group-hover:text-brand-lime transition-colors">
                        0{i + 1}
                      </span>
                      <span className="text-lg text-foreground leading-relaxed pt-1">
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* SEKCJA 2 — 3 FILARY jako dramatic alternating cards (środkowa ciemna, wyższa) */}
      <Reveal>
        <section className="py-20 lg:py-28">
          <Container size="wide">
            <div className="max-w-2xl mb-12 lg:mb-16">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                02 · Co robimy dla sprzedającego
              </p>
              <h2 className="font-bold tracking-tight text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] text-foreground">
                Trzy filary,
                <br />
                <span className="text-gradient-lime">jedna sprzedaż</span>.
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {filary.map((f, i) => {
                const Icon = f.icon;
                const isDark = i === 1;
                return (
                  <div
                    key={f.label}
                    className={`relative rounded-[28px] p-8 lg:p-9 border overflow-hidden ${
                      isDark
                        ? "bg-brand-forest-deep text-foreground-on-dark border-brand-forest lg:-translate-y-6"
                        : "bg-surface border-border"
                    }`}
                  >
                    {isDark && (
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(163,199,51,0.18),transparent_55%)]"
                      />
                    )}
                    <div className="relative">
                      <div
                        className={`size-14 rounded-2xl flex items-center justify-center mb-6 ${
                          isDark
                            ? "bg-brand-lime text-brand-forest-deep"
                            : "bg-brand-lime/15 text-brand-olive"
                        }`}
                      >
                        <Icon className="size-7" strokeWidth={2.2} />
                      </div>
                      <p
                        className={`text-[10px] font-bold uppercase tracking-[0.18em] mb-3 ${
                          isDark ? "text-brand-lime" : "text-brand-olive"
                        }`}
                      >
                        {f.label} / III
                      </p>
                      <h3 className="font-bold text-2xl lg:text-[28px] leading-tight mb-3">
                        {f.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed mb-7 ${
                          isDark ? "text-foreground-on-dark-muted" : "text-foreground-muted"
                        }`}
                      >
                        {f.intro}
                      </p>
                      <div
                        className={`h-px w-full mb-6 ${
                          isDark ? "bg-white/10" : "bg-border"
                        }`}
                      />
                      <ul className="space-y-3">
                        {f.points.map((p) => (
                          <li
                            key={p}
                            className={`flex items-start gap-3 text-sm leading-relaxed ${
                              isDark ? "text-foreground-on-dark" : "text-foreground"
                            }`}
                          >
                            <Check
                              className={`size-4 shrink-0 mt-0.5 ${
                                isDark ? "text-brand-lime" : "text-brand-olive"
                              }`}
                              strokeWidth={3}
                            />
                            <span>{p}</span>
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

      {/* SEKCJA 3 — DLACZEGO SKUTECZNIE (dark + lime tag pills) */}
      <Reveal>
        <section className="relative py-20 lg:py-28 bg-brand-forest-deep text-foreground-on-dark overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(163,199,51,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(45,74,31,0.55),transparent_60%)]"
          />
          <Container size="wide" className="relative">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-lime mb-3">
                  03 · Dlaczego skutecznie?
                </p>
                <h2 className="font-bold tracking-tight text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] mb-6">
                  Za&nbsp;każdą ofertą stoi <span className="text-gradient-lime">strategia</span>
                  <br />i doświadczenie.
                </h2>
                <p className="text-lg text-foreground-on-dark-muted leading-relaxed">
                  Nie działamy szablonowo. Każda nieruchomość ma inną historię.
                  I wymaga indywidualnego podejścia.
                </p>
              </div>

              <div className="lg:col-span-5">
                <p className="text-xs uppercase tracking-wider text-brand-lime font-semibold mb-5">
                  W naszej pracy liczy się
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {wartosci.map((w, i) => (
                    <span
                      key={w}
                      className={`inline-flex items-center gap-2 pl-3 pr-5 py-2.5 rounded-full text-sm font-medium ${
                        i % 3 === 0
                          ? "bg-brand-lime text-brand-forest-deep"
                          : "bg-white/[0.06] text-foreground-on-dark border border-white/10"
                      }`}
                    >
                      <Sparkles className="size-3.5" />
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* SEKCJA 4 — WSPÓŁPRACA jako 4-grid karty */}
      <Reveal>
        <section className="py-20 lg:py-28">
          <Container size="wide">
            <div className="max-w-2xl mb-12 lg:mb-16">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                04 · Współpraca międzyagentowa
              </p>
              <h2 className="font-bold tracking-tight text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] text-foreground">
                Najlepsi
                <br />
                <span className="text-foreground-muted">współpracują.</span>
              </h2>
              <p className="mt-5 text-lg text-foreground-muted leading-relaxed">
                Naszym celem nie jest tylko publikacja oferty.
                Naszym celem jest skuteczna sprzedaż.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {wspolpraca.map((w, i) => (
                <div
                  key={w.label}
                  className="rounded-3xl bg-surface border border-border p-7 hover:border-brand-forest hover:shadow-[var(--shadow-card)] transition-all"
                >
                  <div className="size-12 rounded-2xl bg-brand-lime/15 text-brand-olive flex items-center justify-center mb-5">
                    <Users className="size-5" />
                  </div>
                  <p className="text-[10px] uppercase tracking-wider text-brand-olive font-semibold mb-2 tabular-nums">
                    0{i + 1}
                  </p>
                  <h3 className="font-bold text-lg text-foreground leading-tight mb-3">
                    {w.label}
                  </h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </Reveal>

      {/* SEKCJA 5 — HISTORIE jako big quote + tag list */}
      <Reveal>
        <section className="py-20 lg:py-28 bg-surface">
          <Container size="wide">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                  05 · Historie klientów
                </p>
                <h2 className="font-bold tracking-tight text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] text-foreground mb-8">
                  Za&nbsp;każdą sprzedażą stoi człowiek.
                </h2>

                <div className="relative pl-10 mb-8">
                  <Quote
                    aria-hidden
                    className="absolute -left-2 -top-2 size-10 text-brand-lime/40"
                  />
                  <p className="text-xl lg:text-2xl text-foreground italic leading-relaxed">
                    Czasami to szybka sprzedaż po jednej prezentacji. Czasami
                    proces wymagający miesięcy przygotowań i wielu rozmów.
                  </p>
                </div>

                <p className="text-lg text-foreground-muted leading-relaxed">
                  Ale przede wszystkim pomagamy ludziom przejść przez ważne
                  życiowe zmiany.
                </p>
              </div>

              <div className="lg:col-span-5">
                <p className="text-xs uppercase tracking-wider text-brand-olive font-semibold mb-5">
                  Sprzedajemy
                </p>
                <div className="grid grid-cols-1 gap-2.5">
                  {historie.map((h, i) => (
                    <div
                      key={h}
                      className={`flex items-center gap-3 px-5 py-4 rounded-2xl border ${
                        i % 2 === 0
                          ? "bg-background border-border"
                          : "bg-brand-lime/10 border-brand-lime/30"
                      }`}
                    >
                      <span className="size-2 rounded-full bg-brand-lime shrink-0" />
                      <span className="font-medium text-foreground capitalize">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* SEKCJA 6 — FAQ */}
      <Reveal>
        <section className="py-20 lg:py-28">
          <Container size="default">
            <div className="max-w-2xl mb-12 lg:mb-16">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                06 · FAQ
              </p>
              <h2 className="font-bold tracking-tight text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] text-foreground">
                Najczęstsze pytania.
              </h2>
            </div>

            <div className="space-y-3">
              {faq.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-3xl border border-border bg-surface p-6 lg:p-7 transition-all hover:border-brand-forest/40 open:border-brand-forest open:bg-surface-elevated open:shadow-[var(--shadow-card)]"
                >
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                    <span className="font-semibold text-foreground text-lg leading-snug">
                      {item.q}
                    </span>
                    <ChevronDown
                      className="size-5 text-foreground-muted shrink-0 mt-1 group-open:rotate-180 group-open:text-brand-forest transition-all"
                      strokeWidth={2.2}
                    />
                  </summary>
                  <p className="mt-5 text-foreground-muted leading-relaxed text-base">
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
            <div className="relative rounded-[40px] bg-surface-dark text-foreground-on-dark p-12 lg:p-20 text-center overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(163,199,51,0.22),transparent_55%),radial-gradient(circle_at_75%_75%,rgba(45,74,31,0.55),transparent_60%)]"
              />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-lime mb-4">
                  Myślisz o sprzedaży?
                </p>
                <h2 className="font-bold tracking-tight text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] mb-7 max-w-3xl mx-auto">
                  Zacznijmy od&nbsp;<span className="text-gradient-lime">strategii</span>,
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
