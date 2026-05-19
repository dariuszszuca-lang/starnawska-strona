import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Check,
  MessageSquare,
  Compass,
  Search,
  Calendar,
  Handshake,
  ShieldCheck,
  ClipboardList,
  KeyRound,
  ChevronDown,
  Quote,
  Sparkles,
  Heart,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Strefa kupującego. Agent kupującego w Trójmieście",
  description:
    "Reprezentujemy interes kupującego nieruchomość. Analiza, negocjacje, weryfikacja dokumentów. Od pierwszej rozmowy do odbioru kluczy. Gdynia, Sopot, Gdańsk.",
};

const rolaAgenta = [
  { label: "Analiza rynku", icon: Search },
  { label: "Najlepsze możliwości", icon: Compass },
  { label: "Negocjacje warunków", icon: Handshake },
  { label: "Bezpieczeństwo transakcji", icon: ShieldCheck },
  { label: "Cały proces zakupu", icon: ClipboardList },
];

const wspolpraca = [
  {
    icon: MessageSquare,
    title: "Poznajemy Twoje potrzeby",
    text: "Rozmawiamy nie tylko o metrażu i lokalizacji. Chcemy zrozumieć Twój styl życia, plany i priorytety.",
  },
  {
    icon: Compass,
    title: "Tworzymy strategię zakupu",
    text: "Analizujemy rynek, możliwości finansowe i realne kierunki poszukiwań.",
  },
  {
    icon: Search,
    title: "Szukamy nieruchomości",
    text: "Także poza portalami i ofertami publicznymi.",
  },
  {
    icon: Calendar,
    title: "Organizujemy prezentacje",
    text: "Selekcjonujemy nieruchomości, aby oszczędzać Twój czas.",
  },
  {
    icon: Handshake,
    title: "Negocjujemy warunki",
    text: "Cenę, terminy, wyposażenie, warunki wydania i bezpieczeństwo transakcji.",
  },
  {
    icon: ShieldCheck,
    title: "Weryfikujemy dokumenty",
    text: "Sprawdzamy stan prawny nieruchomości i potencjalne ryzyka.",
  },
  {
    icon: ClipboardList,
    title: "Koordynujemy cały proces",
    text: "Kredyt, notariusz, formalności, kontakt między stronami.",
  },
  {
    icon: KeyRound,
    title: "Jesteśmy z Tobą do końca",
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
  "dbamy o bezpieczeństwo klientów",
];

const dlaKogo = [
  { label: "Kupujesz pierwsze mieszkanie", emoji: "🔑" },
  { label: "Nie masz czasu na poszukiwania", emoji: "⏱️" },
  { label: "Mieszkasz poza Trójmiastem", emoji: "✈️" },
  { label: "Chcesz kupić bezpiecznie", emoji: "🛡️" },
  { label: "Szukasz ofert spoza portali", emoji: "🔍" },
  { label: "Kupujesz inwestycyjnie", emoji: "📈" },
  { label: "Cenisz profesjonalne wsparcie", emoji: "💎" },
];

const prawdziweMotywy = [
  "spokojniejszego życia",
  "miejsca bliżej natury",
  "przestrzeni do pracy zdalnej",
  "nowego początku",
  "bezpieczeństwa dla rodziny",
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
      {/* HERO — split z dramatyczną typografią */}
      <section className="relative overflow-hidden bg-background">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(163,199,51,0.15),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(45,74,31,0.10),transparent_60%)]"
        />

        <Container size="wide" className="relative pt-36 lg:pt-48 pb-16 lg:pb-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-lime/15 text-brand-forest-deep text-xs font-semibold uppercase tracking-wider mb-5">
                <Sparkles className="size-3.5" />
                Strefa kupującego
              </div>
              <h1 className="font-bold tracking-tight text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] text-foreground">
                Kupujesz <span className="text-gradient-lime">nieruchomość</span>?
                <br />
                <span className="text-foreground-muted">
                  Nie musisz przechodzić przez to sam.
                </span>
              </h1>
              <p className="mt-7 text-lg lg:text-xl text-foreground-muted leading-relaxed max-w-2xl">
                Zakup nieruchomości to jedna z najważniejszych decyzji
                finansowych i życiowych. Reprezentujemy interes kupującego
                kompleksowo, od pierwszej rozmowy aż po odbiór kluczy.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild variant="primary" size="lg">
                  <Link href="/konsultacja">
                    Umów konsultację
                    <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#wspolpraca">Porozmawiajmy o&nbsp;zakupie</a>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4 lg:gap-5">
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
                    Zadowolonych
                  </p>
                  <p className="font-bold text-3xl lg:text-4xl tabular-nums leading-none">
                    {siteConfig.metrics.transactions}
                  </p>
                  <p className="mt-1 text-[11px] text-foreground-on-dark-muted">klientów</p>
                </div>
                <div className="rounded-2xl border border-border bg-surface p-5 lg:p-6 col-span-2">
                  <p className="text-[10px] uppercase tracking-wider text-brand-olive font-semibold mb-2">
                    Średnia ocen
                  </p>
                  <p className="font-bold text-3xl lg:text-4xl text-foreground tabular-nums leading-none inline-flex items-baseline gap-2">
                    {siteConfig.metrics.rating}
                    <span className="text-base text-brand-olive">★★★★★</span>
                  </p>
                  <p className="mt-2 text-[11px] text-foreground-muted">
                    od kupujących w&nbsp;Trójmieście
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SEKCJA 1 — KIM JEST AGENT KUPUJĄCEGO */}
      <Reveal>
        <section className="py-20 lg:py-28 bg-surface">
          <Container size="wide">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-6 lg:sticky lg:top-32">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                  01 · Kim jest agent kupującego
                </p>
                <h2 className="font-bold tracking-tight text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] text-foreground mb-6">
                  Kupujący też zasługuje na&nbsp;swojego reprezentanta.
                </h2>
                <p className="text-lg text-foreground-muted leading-relaxed mb-4">
                  Przez lata rynek skupiał się głównie na sprzedaży. A przecież
                  po drugiej stronie jest człowiek, który podejmuje ogromną
                  decyzję, inwestuje pieniądze, emocje i przyszłość.
                </p>
                <p className="text-lg text-foreground leading-relaxed font-semibold">
                  Strefa Kupującego to nasza specjalizacja od&nbsp;początku
                  istnienia firmy.
                </p>
              </div>

              <div className="lg:col-span-6">
                <p className="text-xs uppercase tracking-wider text-brand-olive font-semibold mb-5">
                  Nasza rola
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {rolaAgenta.map((r) => {
                    const Icon = r.icon;
                    return (
                      <div
                        key={r.label}
                        className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-background hover:border-brand-forest hover:shadow-[var(--shadow-card)] transition-all"
                      >
                        <div className="size-11 rounded-xl bg-brand-lime/15 text-brand-olive flex items-center justify-center shrink-0">
                          <Icon className="size-5" strokeWidth={2.2} />
                        </div>
                        <span className="font-semibold text-foreground leading-snug">
                          {r.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* SEKCJA 2 — 8 KROKÓW timeline z accent cards */}
      <Reveal>
        <section id="wspolpraca" className="py-20 lg:py-28 scroll-mt-24">
          <Container size="wide">
            <div className="max-w-3xl mb-12 lg:mb-16">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                02 · Jak wygląda współpraca
              </p>
              <h2 className="font-bold tracking-tight text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] text-foreground">
                Osiem kroków.
                <br />
                <span className="text-gradient-lime">Od&nbsp;rozmowy do&nbsp;kluczy</span>.
              </h2>
            </div>

            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {wspolpraca.map((step, i) => {
                const Icon = step.icon;
                const accent = i === 0 || i === 3 || i === 7;
                return (
                  <li
                    key={step.title}
                    className={`group relative rounded-3xl p-6 lg:p-7 border overflow-hidden transition-all hover:-translate-y-1 ${
                      accent
                        ? "bg-brand-forest-deep text-foreground-on-dark border-brand-forest hover:border-brand-lime"
                        : "bg-surface border-border hover:border-brand-forest"
                    }`}
                  >
                    <p
                      className={`absolute top-5 right-5 font-bold text-4xl tabular-nums leading-none transition-colors ${
                        accent
                          ? "text-brand-lime/40 group-hover:text-brand-lime/70"
                          : "text-foreground/10 group-hover:text-brand-lime/40"
                      }`}
                    >
                      0{i + 1}
                    </p>
                    <div
                      className={`size-12 rounded-xl flex items-center justify-center mb-5 ${
                        accent
                          ? "bg-brand-lime text-brand-forest-deep"
                          : "bg-brand-lime/15 text-brand-olive"
                      }`}
                    >
                      <Icon className="size-5" strokeWidth={2.2} />
                    </div>
                    <h3
                      className={`font-bold text-base lg:text-lg leading-tight mb-2 ${
                        accent ? "text-foreground-on-dark" : "text-foreground"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed ${
                        accent ? "text-foreground-on-dark-muted" : "text-foreground-muted"
                      }`}
                    >
                      {step.text}
                    </p>
                  </li>
                );
              })}
            </ol>
          </Container>
        </section>
      </Reveal>

      {/* SEKCJA 3 — ZA KULISAMI (dark) */}
      <Reveal>
        <section className="relative py-20 lg:py-28 bg-brand-forest-deep text-foreground-on-dark overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(163,199,51,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(45,74,31,0.55),transparent_60%)]"
          />
          <Container size="wide" className="relative">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-lime mb-3">
                  03 · Za&nbsp;kulisami
                </p>
                <h2 className="font-bold tracking-tight text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] mb-6">
                  Czego klient
                  <br />
                  <span className="text-gradient-lime">nie widzi</span>?
                </h2>
                <p className="text-lg text-foreground-on-dark-muted leading-relaxed">
                  Zakup nieruchomości to dużo więcej niż oglądanie mieszkań.
                  Dobra obsługa zaczyna się tam, gdzie kończy się zwykłe
                  pokazywanie nieruchomości.
                </p>
              </div>

              <div className="lg:col-span-7">
                <ul className="grid sm:grid-cols-2 gap-3">
                  {zaKulisami.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm"
                    >
                      <span className="size-6 rounded-full bg-brand-lime/20 text-brand-lime flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-foreground-on-dark leading-relaxed text-sm">
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* SEKCJA 4 — DLA KOGO (cards z emoji) */}
      <Reveal>
        <section className="py-20 lg:py-28">
          <Container size="wide">
            <div className="max-w-2xl mb-12 lg:mb-16">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                04 · Dla kogo
              </p>
              <h2 className="font-bold tracking-tight text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] text-foreground">
                Najczęściej pomagamy ludziom, którzy…
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {dlaKogo.map((d) => (
                <div
                  key={d.label}
                  className="group flex items-start gap-4 p-6 rounded-3xl bg-surface border border-border hover:border-brand-lime hover:shadow-[var(--shadow-card)] hover:-translate-y-1 transition-all"
                >
                  <span className="text-3xl shrink-0" aria-hidden>
                    {d.emoji}
                  </span>
                  <span className="font-semibold text-foreground leading-snug pt-1">
                    {d.label}
                  </span>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </Reveal>

      {/* SEKCJA 5 — HISTORIE (big quote card) */}
      <Reveal>
        <section className="py-20 lg:py-28 bg-surface">
          <Container size="default">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                05 · Historie klientów
              </p>
              <h2 className="font-bold tracking-tight text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] text-foreground">
                Każda nieruchomość zaczyna się
                <br />
                od&nbsp;<span className="text-gradient-lime">czyjejś historii</span>.
              </h2>
            </div>

            <div className="relative max-w-3xl mx-auto p-10 lg:p-14 rounded-[32px] bg-background border border-border">
              <Quote
                aria-hidden
                className="absolute -top-5 left-10 size-12 text-brand-lime"
              />
              <p className="text-lg lg:text-xl text-foreground-muted leading-relaxed mb-5">
                Czasami klient mówi:
              </p>
              <p className="text-2xl lg:text-3xl text-foreground italic font-semibold leading-tight mb-8">
                „Szukamy mieszkania 3-pokojowego.”
              </p>
              <p className="text-lg text-foreground-muted leading-relaxed mb-6">
                A po kilku rozmowach okazuje się, że naprawdę szuka:
              </p>
              <div className="flex flex-wrap gap-2.5 mb-8">
                {prawdziweMotywy.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center gap-2 pl-3 pr-5 py-2.5 rounded-full bg-brand-lime/15 border border-brand-lime/30 text-brand-forest-deep font-medium text-sm"
                  >
                    <Heart className="size-3.5 fill-brand-lime text-brand-lime" />
                    {m}
                  </span>
                ))}
              </div>
              <p className="text-foreground font-semibold leading-relaxed text-lg pt-6 border-t border-border">
                Dlatego nie pracujemy schematami. Każdy klient ma swoją historię.
                I swoją definicję idealnego miejsca.
              </p>
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
                  Szukasz nieruchomości?
                </p>
                <h2 className="font-bold tracking-tight text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] mb-7 max-w-3xl mx-auto">
                  Zacznijmy od&nbsp;<span className="text-gradient-lime">rozmowy</span>,
                  <br />
                  nie od&nbsp;przypadkowych ogłoszeń.
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button asChild variant="lime" size="lg">
                    <Link href="/konsultacja">
                      Umów konsultację
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
