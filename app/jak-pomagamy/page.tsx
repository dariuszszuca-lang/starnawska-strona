import type { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  KeyRound,
  Search,
  Building,
  ArrowRight,
  Check,
  Phone,
  MessageSquare,
  ClipboardList,
  Megaphone,
  Handshake,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Jak pomagamy. Sprzedaż, kupno, wynajem, najem | Starnawska",
  description:
    "Pełna obsługa transakcji nieruchomościowych: sprzedaż, kupno, wynajem i najem. Trójmiasto i okolice. Wybierz obszar, w którym możemy Ci pomóc.",
};

const services = [
  {
    id: "sprzedaz",
    icon: Home,
    title: "Sprzedaż",
    lead: "Od pierwszej rozmowy do aktu notarialnego.",
    body: "Bierzemy całą sprzedaż na siebie. Wyceniamy, robimy sesję, publikujemy, prowadzimy pokazy, negocjujemy i kompletujemy dokumenty. Ty podpisujesz tylko umowę i odbierasz pieniądze.",
    points: [
      "Wycena rynkowa po wizji lokalnej",
      "Aktywne dotarcie do kupujących z naszego CRM",
      "Pokazy i raport ze spotkań",
      "Negocjacje i obsługa dokumentów do aktu notarialnego",
    ],
    caseStudy: {
      label: "Ostatnio",
      text: "2 działki w Nowym Dworze Wejherowskim sprzedane 14 dni od podpisania umowy pośrednictwa. Dom w Wejherowie sprzedany 18 dni od publikacji oferty. Mieszkanie w Gdyni sprzedane 1 250 zł za m² drożej od średniej na osiedlu.",
    },
    cta: "Sprzedaj z nami",
    tone: "default" as const,
  },
  {
    id: "kupno",
    icon: Search,
    title: "Kupno",
    lead: "Reprezentujemy Twój interes, nie sprzedającego.",
    body: "Znajdujemy nieruchomości, w tym te, których nie ma na portalach. Mamy dostęp do ofert off-market przez sieć Nieruchomości Spod Lady. Sprawdzamy stan prawny i techniczny, negocjujemy cenę, prowadzimy Cię do odbioru kluczy.",
    points: [
      "Rozmowa o budżecie, lokalizacji i preferencjach",
      "Dobór ofert z naszej bazy i z rynku off-market",
      "Oględziny z naszą oceną stanu mieszkania",
      "Sprawdzenie stanu prawnego i hipotecznego",
      "Negocjacje ceny i warunków umowy",
      "Obsługa dokumentów do aktu notarialnego",
    ],
    caseStudy: {
      label: "Z naszych historii",
      text: "Klient z Niemiec szukał mieszkania w Gdańsku. Pokazaliśmy 2 oferty, w tym jedną off market. Druga spełniła wszystkie jego potrzeby i zakup zrealizowaliśmy w trakcie jednego pobytu.",
    },
    cta: "Kupuj z nami",
    tone: "lime" as const,
  },
  {
    id: "wynajem",
    icon: KeyRound,
    title: "Najem",
    lead: "Znajdź mieszkanie do wynajęcia w Trójmieście.",
    body: "Pokazujemy oferty z naszej bazy i z rynku. Sprawdzamy stan techniczny i umowę najmu. Pomagamy negocjować warunki, żebyś nie wpadł na trudnego właściciela.",
    points: [
      "Rozmowa o budżecie i potrzebach",
      "Oferty dopasowane do lokalizacji i wymagań",
      "Oględziny z oceną stanu mieszkania",
      "Sprawdzenie umowy najmu (klauzule, terminy, kaucja)",
      "Pomoc w negocjacji warunków",
    ],
    caseStudy: {
      label: "Z naszych historii",
      text: "Poszukiwanie mieszkania dla klientów spoza Polski. Wskazaliśmy oferty spełniające ich oczekiwania, przygotowaliśmy umowę dwujęzyczną i przeprowadziliśmy przez wszystkie procedury najmu okazjonalnego.",
    },
    cta: "Znajdź mieszkanie",
    tone: "default" as const,
  },
  {
    id: "najem",
    icon: Building,
    title: "Wynajem",
    lead: "Wynajmij swoje mieszkanie bez zmartwień.",
    body: "Znajdujemy najemcę, weryfikujemy go, podpisujemy umowę najmu okazjonalnego lub instytucjonalnego. Robimy protokół zdawczo-odbiorczy ze zdjęciami. Mieszkanie jest pod kontrolą, Ty masz spokojną głowę.",
    points: [
      "Wycena stawki najmu na rynku",
      "Weryfikacja najemcy (zaświadczenia, referencje)",
      "Umowa najmu okazjonalnego lub instytucjonalnego",
      "Protokół zdawczo-odbiorczy ze zdjęciami",
      "Pomoc przy rozliczeniach administracji",
    ],
    caseStudy: {
      label: "Z naszych historii",
      text: "Właścicielki miały wysokie wymagania wobec najemców swojego domu. Mimo wcześniejszego zainteresowania innych osób, umowę zrealizowaliśmy dopiero po pojawieniu się odpowiedniego najemcy.",
    },
    cta: "Wynajmijmy razem",
    tone: "default" as const,
  },
];

const stats = [
  { value: "95%", label: "zrealizowanych zleceń" },
  { value: "90%", label: "klientów z polecenia" },
];

const processSteps = [
  {
    icon: MessageSquare,
    title: "Rozmowa",
    text: "Zaczynamy od 30 minut. Bez zobowiązań. Słuchamy, co chcesz osiągnąć.",
  },
  {
    icon: ClipboardList,
    title: "Plan",
    text: "Konkretny harmonogram działań. Co, kiedy, ile to potrwa, ile kosztuje.",
  },
  {
    icon: Megaphone,
    title: "Akcja",
    text: "Sesja, publikacja, pokazy, negocjacje. Raportujemy postęp na bieżąco.",
  },
  {
    icon: Handshake,
    title: "Finał",
    text: "Umowa, akt notarialny, przekazanie kluczy. Zostajemy na linii po transakcji.",
  },
];

export default function JakPomagamyPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-36 lg:pt-48 pb-12 lg:pb-16 overflow-hidden">
        {/* Soft accents w tle */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(163,199,51,0.18),transparent_50%),radial-gradient(circle_at_85%_60%,rgba(45,74,31,0.08),transparent_55%)]"
        />

        <Container size="wide">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                Jak pomagamy
              </p>
              <h1 className="font-bold tracking-tight text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-foreground">
                Sprzedaż, kupno,
                <br />
                <span className="text-brand-forest">wynajem, najem.</span>
              </h1>
              <p className="mt-6 text-lg text-foreground-muted leading-relaxed max-w-2xl">
                Cztery filary naszej pracy. Każdy z nich znamy od podszewki, w każdym mamy zbudowane procedury. Najczęściej pomagamy w jednym obszarze, w praktyce sprawy się łączą: ktoś sprzedaje i szuka nowego mieszkania, ktoś wynajmuje i przygotowuje swoje pod najem. Zaczynamy od rozmowy, potem ustalamy konkretny plan.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="primary" size="md">
                  <Link href="/konsultacja">
                    Umów konsultację
                    <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="md">
                  <a href="tel:+48532843660">
                    <Phone />
                    532 843 660
                  </a>
                </Button>
              </div>
            </div>

            {/* Pływające karty z mini-info */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3 lg:gap-4">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={`group relative rounded-2xl p-5 border bg-surface hover:border-brand-forest hover:-translate-y-1 transition-all ${
                      i === 1 ? "translate-y-4" : ""
                    } ${i === 3 ? "translate-y-4" : ""}`}
                  >
                    <div className="size-10 rounded-xl bg-brand-lime/15 text-brand-olive flex items-center justify-center mb-3 group-hover:bg-brand-lime group-hover:text-brand-forest-deep transition-colors">
                      <Icon className="size-5" />
                    </div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground-muted mb-1">
                      0{i + 1}
                    </p>
                    <p className="font-semibold text-sm text-foreground leading-tight">
                      {s.title}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* STATS BAR */}
      <Reveal>
        <section className="py-10 lg:py-14 border-y border-border bg-surface">
          <Container size="wide">
            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-2">
                    {s.label}
                  </dt>
                  <dd className="font-bold tracking-tight text-[clamp(2rem,3.5vw,3rem)] leading-none text-foreground tabular-nums">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      </Reveal>

      {/* Pasek nav. Bez sticky, jako wskazówka co dalej */}
      <section className="py-6 lg:py-8">
        <Container size="wide">
          <nav className="flex flex-wrap gap-2" aria-label="Spis usług">
            {services.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center gap-2.5 pl-2.5 pr-4 py-1.5 rounded-full bg-gray-100 hover:bg-brand-lime/25 text-sm text-foreground transition-colors"
              >
                <span className="inline-flex size-6 rounded-full bg-foreground text-foreground-on-dark text-[10px] font-bold items-center justify-center tabular-nums">
                  0{i + 1}
                </span>
                <s.icon className="size-3.5 text-brand-olive" />
                {s.title}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      {/* SEKCJE USŁUG */}
      {services.map((s, i) => {
        const Icon = s.icon;
        const alt = i % 2 === 1;
        return (
          <Reveal key={s.id}>
            <section
              id={s.id}
              className={`py-16 lg:py-24 scroll-mt-24 ${alt ? "bg-surface" : ""}`}
            >
              <Container size="wide">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="font-bold text-5xl text-foreground/15 tabular-nums leading-none">
                        0{i + 1}
                      </span>
                      <div className="h-px bg-border flex-1" />
                    </div>

                    <div
                      className={`size-14 rounded-2xl flex items-center justify-center mb-6 ${
                        s.tone === "lime"
                          ? "bg-brand-lime text-brand-forest-deep"
                          : "bg-brand-lime/15 text-brand-olive"
                      }`}
                    >
                      <Icon className="size-7" />
                    </div>
                    <p className="text-xs uppercase tracking-wider text-brand-olive font-semibold mb-3">
                      {s.lead}
                    </p>
                    <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-tight text-foreground mb-6">
                      {s.title}
                    </h2>
                    <p className="text-lg text-foreground-muted leading-relaxed mb-8">
                      {s.body}
                    </p>

                    {/* Mini case study */}
                    <div className="mb-8 rounded-2xl border border-border-strong/40 border-dashed p-5 bg-background">
                      <p className="text-[10px] uppercase tracking-wider text-brand-olive font-semibold mb-2">
                        {s.caseStudy.label}
                      </p>
                      <p className="text-sm text-foreground leading-relaxed">
                        {s.caseStudy.text}
                      </p>
                    </div>

                    <Button asChild variant={s.tone === "lime" ? "lime" : "primary"} size="md">
                      <Link href="/konsultacja">
                        {s.cta}
                        <ArrowRight />
                      </Link>
                    </Button>
                  </div>

                  <div className="lg:col-span-7">
                    <ul className="space-y-3">
                      {s.points.map((p) => (
                        <li
                          key={p}
                          className={`flex items-start gap-4 p-5 rounded-2xl border border-border transition-colors hover:border-brand-forest/40 ${
                            alt ? "bg-background" : "bg-surface"
                          }`}
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
        );
      })}

      {/* JAK PRACUJEMY */}
      <Reveal>
        <section className="py-16 lg:py-24 bg-surface">
          <Container size="wide">
            <div className="max-w-2xl mb-10 lg:mb-14">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                Jak pracujemy
              </p>
              <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-foreground">
                Cztery kroki.
                <br />
                <span className="text-brand-forest">Bez niespodzianek.</span>
              </h2>
            </div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {processSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <li
                    key={step.title}
                    className="relative rounded-2xl bg-background p-6 lg:p-7 border border-border"
                  >
                    <p className="absolute top-5 right-5 font-bold text-3xl text-foreground/10 tabular-nums leading-none">
                      0{i + 1}
                    </p>
                    <div className="size-11 rounded-xl bg-brand-lime/15 text-brand-olive flex items-center justify-center mb-4">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-foreground-muted leading-relaxed">{step.text}</p>
                  </li>
                );
              })}
            </ol>
          </Container>
        </section>
      </Reveal>

      {/* CTA końcowy */}
      <Reveal>
        <section className="py-16 lg:py-24">
          <Container size="default">
            <div className="relative rounded-[40px] bg-surface border border-border text-foreground p-10 lg:p-16 text-center overflow-hidden shadow-[var(--shadow-soft)]">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(163,199,51,0.14),transparent_55%),radial-gradient(circle_at_75%_75%,rgba(163,199,51,0.07),transparent_60%)]"
              />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                  Nietypowy temat?
                </p>
                <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-tight mb-4">
                  Twoja sprawa nie pasuje
                  <br />
                  do żadnej kategorii?
                </h2>
                <p className="text-lg text-foreground-muted max-w-2xl mx-auto mb-8">
                  Spadek, podział majątku, sprzedaż udziałów, grunty inwestycyjne. Robiliśmy to wszystko. Powiedz nam co masz.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button asChild variant="lime" size="lg">
                    <Link href="/konsultacja">
                      Opisz nam swoją sytuację
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
