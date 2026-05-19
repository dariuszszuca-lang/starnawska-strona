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
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Strefa kupującego. Agent kupującego w Trójmieście",
  description:
    "Reprezentujemy interes kupującego nieruchomość. Analiza, negocjacje, weryfikacja dokumentów. Od pierwszej rozmowy do odbioru kluczy. Gdynia, Sopot, Gdańsk.",
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

const prawdziweMotywy = [
  "spokojniejszego życia",
  "miejsca bliżej natury",
  "przestrzeni do pracy zdalnej",
  "nowego początku",
  "bezpieczeństwa dla swojej rodziny",
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
      {/* HERO */}
      <section className="relative pt-36 lg:pt-48 pb-14 lg:pb-20 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(163,199,51,0.16),transparent_55%),radial-gradient(circle_at_85%_60%,rgba(45,74,31,0.08),transparent_55%)]"
        />

        <Container size="wide">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
              Strefa kupującego
            </p>
            <h1 className="font-bold tracking-tight text-[clamp(2.25rem,5.2vw,4rem)] leading-[1.05] text-foreground">
              Kupujesz nieruchomość?
              <br />
              <span className="text-foreground-muted">
                Nie musisz przechodzić przez ten proces sam.
              </span>
            </h1>
            <p className="mt-6 text-lg text-foreground-muted leading-relaxed max-w-2xl">
              Zakup nieruchomości to jedna z najważniejszych decyzji finansowych
              i życiowych. Dlatego reprezentujemy interes kupującego kompleksowo,
              od pierwszej rozmowy aż po odbiór kluczy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="primary" size="md">
                <Link href="/konsultacja">
                  Umów konsultację
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="md">
                <a href="#wspolpraca">
                  Porozmawiajmy o Twoim zakupie
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* SEKCJA 1 — KIM JEST AGENT KUPUJĄCEGO */}
      <Reveal>
        <section className="py-16 lg:py-24 bg-surface">
          <Container size="wide">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                  01 · Kim jest agent kupującego?
                </p>
                <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-tight text-foreground mb-6">
                  Kupujący również zasługuje na swojego reprezentanta.
                </h2>
                <p className="text-lg text-foreground-muted leading-relaxed mb-4">
                  Przez lata rynek nieruchomości skupiał się głównie na sprzedaży.
                  A przecież po drugiej stronie jest człowiek, który podejmuje
                  ogromną decyzję, inwestuje swoje pieniądze, emocje i przyszłość.
                </p>
                <p className="text-lg text-foreground-muted leading-relaxed mb-4">
                  Właśnie dlatego powstała nasza Strefa Kupującego, która od
                  początku istnienia firmy jest naszą specjalizacją.
                </p>
                <p className="text-foreground font-semibold leading-relaxed">
                  Reprezentujemy interes kupującego. I to robi ogromną różnicę.
                </p>
              </div>

              <div className="lg:col-span-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-brand-olive mb-5">
                  Nasza rola to:
                </p>
                <ul className="space-y-3">
                  {rolaAgenta.map((r) => (
                    <li
                      key={r}
                      className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-background hover:border-brand-forest/40 transition-colors"
                    >
                      <span className="size-7 rounded-full bg-brand-lime/20 text-brand-olive flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="size-4" strokeWidth={3} />
                      </span>
                      <span className="text-foreground leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* SEKCJA 2 — JAK WYGLĄDA WSPÓŁPRACA (8 KROKÓW) */}
      <Reveal>
        <section id="wspolpraca" className="py-16 lg:py-24 scroll-mt-24">
          <Container size="wide">
            <div className="max-w-2xl mb-10 lg:mb-14">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                02 · Jak wygląda współpraca?
              </p>
              <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-foreground">
                Osiem kroków.
                <br />
                <span className="text-foreground-muted">Od rozmowy do kluczy.</span>
              </h2>
            </div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {wspolpraca.map((step, i) => {
                const Icon = step.icon;
                return (
                  <li
                    key={step.title}
                    className="relative rounded-2xl bg-surface p-6 lg:p-7 border border-border"
                  >
                    <p className="absolute top-5 right-5 font-bold text-3xl text-foreground/10 tabular-nums leading-none">
                      0{i + 1}
                    </p>
                    <div className="size-11 rounded-xl bg-brand-lime/15 text-brand-olive flex items-center justify-center mb-4">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-2 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      {step.text}
                    </p>
                  </li>
                );
              })}
            </ol>
          </Container>
        </section>
      </Reveal>

      {/* SEKCJA 3 — CZEGO KLIENT NIE WIDZI */}
      <Reveal>
        <section className="py-16 lg:py-24 bg-surface">
          <Container size="wide">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                  03 · Czego klient często nie widzi?
                </p>
                <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-tight text-foreground mb-6">
                  Za&nbsp;kulisami dzieje się więcej niż podczas prezentacji.
                </h2>
                <p className="text-lg text-foreground-muted leading-relaxed">
                  Zakup nieruchomości to dużo więcej niż oglądanie mieszkań. Dobra
                  obsługa kupującego zaczyna się tam, gdzie kończy się zwykłe
                  pokazywanie nieruchomości.
                </p>
              </div>

              <div className="lg:col-span-7">
                <ul className="grid sm:grid-cols-2 gap-3">
                  {zaKulisami.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 p-4 rounded-2xl border border-border bg-background"
                    >
                      <span className="size-6 rounded-full bg-brand-lime/20 text-brand-olive flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-foreground leading-relaxed text-sm">
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

      {/* SEKCJA 4 — DLA KOGO */}
      <Reveal>
        <section className="py-16 lg:py-24">
          <Container size="wide">
            <div className="max-w-2xl mb-10 lg:mb-14">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                04 · Dla kogo jest ta usługa?
              </p>
              <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-foreground">
                Najczęściej pomagamy klientom, którzy:
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {dlaKogo.map((d) => (
                <span
                  key={d}
                  className="inline-flex items-center gap-2 pl-2.5 pr-4 py-2.5 rounded-full bg-surface border border-border text-foreground"
                >
                  <Check className="size-3.5 text-brand-olive" strokeWidth={3} />
                  {d}
                </span>
              ))}
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
                Każda nieruchomość zaczyna się od&nbsp;czyjejś historii.
              </h2>
              <p className="text-lg text-foreground-muted leading-relaxed mb-3">
                Czasami klient mówi:
              </p>
              <p className="text-xl lg:text-2xl text-foreground italic leading-relaxed border-l-4 border-brand-lime pl-6 mb-6">
                „Szukamy mieszkania 3 pokojowego.”
              </p>
              <p className="text-lg text-foreground-muted leading-relaxed mb-5">
                A po kilku rozmowach okazuje się, że naprawdę szuka:
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {prawdziweMotywy.map((m) => (
                <span
                  key={m}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-background border border-border text-foreground"
                >
                  {m}
                </span>
              ))}
            </div>

            <div className="max-w-3xl">
              <p className="text-lg text-foreground-muted leading-relaxed mb-3">
                Dlatego nie pracujemy schematami.
              </p>
              <p className="text-foreground font-semibold leading-relaxed text-lg">
                Każdy klient ma swoją historię. I swoją definicję idealnego miejsca.
              </p>
            </div>
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
                  Szukasz nieruchomości?
                </p>
                <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-tight mb-6">
                  Zacznijmy od&nbsp;rozmowy,
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
