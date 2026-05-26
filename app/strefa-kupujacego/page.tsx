import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Check,
  ClipboardList,
  Compass,
  Handshake,
  HelpCircle,
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
                  Kim jest agent kupującego?
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
              </div>

              <div className="lg:col-span-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  {rolaAgenta.map((item, index) => (
                    <div
                      key={item}
                      className="group relative flex items-start gap-4 p-6 rounded-2xl border border-border bg-background overflow-hidden shadow-[var(--shadow-soft)] hover:border-brand-lime/60 hover:shadow-[0_12px_32px_-8px_rgba(45,74,31,0.18)] hover:-translate-y-1 transition-all duration-300"
                    >
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-br from-brand-lime/0 via-brand-lime/0 to-brand-lime/0 group-hover:from-brand-lime/[0.05] group-hover:to-brand-lime/[0.12] transition-all duration-500"
                      />
                      <div
                        aria-hidden
                        className="absolute left-0 top-6 bottom-6 w-[3px] bg-brand-lime/0 group-hover:bg-brand-lime rounded-r-full transition-all duration-300"
                      />
                      <span className="relative size-11 rounded-xl bg-brand-lime/15 text-brand-olive flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand-lime/30 group-hover:rotate-6 transition-all duration-300">
                        <Check className="size-5" strokeWidth={2.6} />
                      </span>
                      <div className="relative flex-1 min-w-0">
                        <div className="text-[10px] font-bold tabular-nums text-brand-olive/70 uppercase tracking-[0.18em] mb-1.5">
                          0{index + 1}
                        </div>
                        <span className="font-semibold text-foreground leading-snug block">
                          {item}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-10 text-xl lg:text-2xl font-bold text-foreground leading-snug tracking-tight">
                  Reprezentujemy interes kupującego.
                  <br />
                  <span className="text-brand-forest">I właśnie to robi ogromną różnicę.</span>
                </p>
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
                Jak wygląda współpraca?
              </p>
              <h2 className="font-bold tracking-tight text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-foreground mb-5">
                Jak wygląda współpraca?
              </h2>
              <p className="text-lg text-foreground-muted leading-relaxed">
                Jak pracujemy z kupującym?
              </p>
            </div>

            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {wspolpraca.map((step, index) => {
                const Icon = step.icon;
                const featured = index === 0 || index === 3 || index === 7;
                return (
                  <li
                    key={step.title}
                    className={`rounded-[28px] p-6 lg:p-7 border shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 ${
                      featured
                        ? "bg-brand-lime/[0.10] border-brand-lime/35"
                        : "bg-surface border-border"
                    }`}
                  >
                    <div
                      className={`size-12 rounded-xl flex items-center justify-center mb-5 ${
                        featured ? "bg-brand-lime/25 text-brand-forest-deep" : "bg-brand-lime/15 text-brand-olive"
                      }`}
                    >
                      <Icon className="size-5" strokeWidth={2.2} />
                    </div>
                    <h3 className="font-bold text-base lg:text-lg leading-tight mb-3 text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground-muted">
                      {step.text}
                    </p>
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
                  Czego klient często nie widzi?
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
                <ul className="grid sm:grid-cols-2 gap-3">
                  {zaKulisami.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-background border border-border shadow-[var(--shadow-soft)]"
                    >
                      <span className="size-6 rounded-full bg-brand-lime/20 text-brand-olive flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-foreground leading-relaxed text-sm">
                        {item}
                      </span>
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
                Dla kogo jest ta usługa?
              </p>
              <h2 className="font-bold tracking-tight text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-foreground">
                Dla kogo jest ta usługa?
              </h2>
              <p className="mt-5 text-lg text-foreground-muted leading-relaxed">
                Najczęściej pomagamy klientom, którzy:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {dlaKogo.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4 p-6 rounded-[28px] bg-surface border border-border shadow-[var(--shadow-soft)] hover:border-brand-olive/45 hover:-translate-y-0.5 transition-all"
                >
                  <span className="size-10 rounded-xl bg-brand-lime/15 text-brand-olive flex items-center justify-center shrink-0">
                    <Check className="size-5" strokeWidth={2.6} />
                  </span>
                  <span className="font-semibold text-foreground leading-snug pt-1">
                    {item}
                  </span>
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
                Historie naszych klientów
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
