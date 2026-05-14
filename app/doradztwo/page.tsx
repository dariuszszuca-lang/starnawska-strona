import type { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  KeyRound,
  Calculator,
  Sparkles,
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
  title: "Doradztwo i usługi. Sprzedaż, najem, kredyty, home staging",
  description:
    "Co dla Ciebie zrobimy: kompleksowa sprzedaż, wynajem długoterminowy, doradztwo kredytowe, home staging i sesje fotograficzne. Trójmiasto.",
};

const services = [
  {
    id: "sprzedaz",
    icon: Home,
    title: "Sprzedaż nieruchomości",
    lead: "Od pierwszej rozmowy do aktu notarialnego.",
    body: "Bierzemy całość: wycenę, przygotowanie oferty, sesję, promocję, pokazy, negocjacje, dokumenty. Ty podpisujesz tylko umowę i odbierasz pieniądze.",
    points: [
      "Wycena rynkowa po wizji lokalnej",
      "Profesjonalna sesja zdjęciowa i plan 2D",
      "Publikacja w 30+ portalach + nasza baza",
      "Aktywne dotarcie do kupujących z naszego CRM",
      "Pokazy i raport ze spotkań",
      "Negocjacje + obsługa dokumentacji notarialnej",
    ],
    caseStudy: {
      label: "Ostatnio",
      text: "Mieszkanie 78 m² w Sopocie. Sprzedane w 14 dni, 8% powyżej średniej dzielnicowej.",
    },
    cta: "Sprzedaj z nami",
    tone: "default" as const,
  },
  {
    id: "wynajem",
    icon: KeyRound,
    title: "Wynajem długoterminowy",
    lead: "Dla właścicieli i poszukujących.",
    body: "Dla właścicieli: znajdujemy najemcę, weryfikujemy, prowadzimy umowę. Dla najemców: pokażemy oferty dopasowane do budżetu i preferencji.",
    points: [
      "Weryfikacja najemcy (zaświadczenia, referencje)",
      "Umowa najmu okazjonalnego lub instytucjonalnego",
      "Protokół zdawczo-odbiorczy ze zdjęciami",
      "Opieka nad nieruchomością w trakcie najmu",
      "Pomoc przy rozliczeniach administracji",
    ],
    caseStudy: {
      label: "Średnio",
      text: "Najemca w 7-10 dni. Roczna umowa, pełna dokumentacja, zero pustostanu między najemcami.",
    },
    cta: "Porozmawiajmy o najmie",
    tone: "lime" as const,
  },
  {
    id: "kredyt",
    icon: Calculator,
    title: "Doradztwo kredytowe",
    lead: "Sprawdź swoją zdolność kredytową.",
    body: "Współpracujemy z niezależnymi pośrednikami kredytowymi. Liczymy zdolność, porównujemy oferty kilku banków i doprowadzamy do decyzji kredytowej.",
    points: [
      "Bezpłatna analiza zdolności kredytowej",
      "Porównanie ofert z kilku banków",
      "Programy rządowe (Bezpieczny Kredyt 2%, BK# itp.)",
      "Pomoc w skompletowaniu dokumentów",
      "Sprawdzenie zabezpieczeń notarialnych",
    ],
    caseStudy: {
      label: "Bez ukrytych kosztów",
      text: "Doradca opłacany przez bank, dla Ciebie bezpłatny. Mówimy które oferty się opłacają, a które tylko wyglądają korzystnie.",
    },
    cta: "Sprawdź zdolność",
    tone: "default" as const,
  },
  {
    id: "staging",
    icon: Sparkles,
    title: "Home staging i sesja zdjęciowa",
    lead: "Pierwsze cztery sekundy decydują.",
    body: "Profesjonalne zdjęcia szerokokątne, plan piętra w 2D, lekka aranżacja wnętrza. Tak przygotowana oferta uzyskuje średnio 60-120% więcej zapytań w pierwszym tygodniu publikacji. Robimy to dla każdej oferty, którą sprzedajemy.",
    points: [
      "Sesja zdjęciowa szerokokątna",
      "Plan piętra 2D",
      "Wirtualne meblowanie pustych pomieszczeń (opcja)",
      "Doradztwo: co posprzątać, co odłożyć przed sesją",
      "Lekkie aranżacje (akcesoria, oświetlenie)",
    ],
    caseStudy: {
      label: "Liczby mówią same",
      text: "Te same mieszkanie, przed i po stagingu: 3x więcej zapytań w pierwszym tygodniu, krótsza średnia sprzedaży o 40%.",
    },
    cta: "Zobacz przykłady",
    tone: "default" as const,
  },
];

const stats = [
  { value: "120+", label: "transakcji rocznie" },
  { value: "14", label: "dni. Średni czas sprzedaży" },
  { value: "12", label: "banków w sieci kredytowej" },
  { value: "73%", label: "klientów z polecenia" },
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

export default function DoradztwoPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 lg:pt-36 pb-12 lg:pb-16 overflow-hidden">
        {/* Soft accents w tle */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(163,199,51,0.18),transparent_50%),radial-gradient(circle_at_85%_60%,rgba(45,74,31,0.08),transparent_55%)]"
        />

        <Container size="wide">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                Doradztwo
              </p>
              <h1 className="font-bold tracking-tight text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-foreground">
                Cztery sposoby,
                <br />
                <span className="text-foreground-muted">w jakie pomagamy.</span>
              </h1>
              <p className="mt-6 text-lg text-foreground-muted leading-relaxed max-w-2xl">
                Najczęściej pomagamy w jednym z tych czterech obszarów. W praktyce
                każdą sprawę traktujemy jako kompleks: ktoś sprzedaje + szuka nowego,
                ktoś wynajmuje + bierze kredyt na drugie. Zaczynamy od rozmowy,
                potem rozkładamy plan na atomy.
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
                <span className="text-foreground-muted">Bez niespodzianek.</span>
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
            <div className="relative rounded-[40px] bg-surface-dark text-foreground-on-dark p-10 lg:p-16 text-center overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(163,199,51,0.18),transparent_55%),radial-gradient(circle_at_75%_75%,rgba(45,74,31,0.5),transparent_60%)]"
              />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-lime mb-3">
                  Nietypowy temat?
                </p>
                <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-tight mb-4">
                  Twoja sprawa nie pasuje
                  <br />
                  do żadnej kategorii?
                </h2>
                <p className="text-lg text-foreground-on-dark-muted max-w-2xl mx-auto mb-8">
                  Spadek, podział majątku, sprzedaż udziałów, rynek pierwotny, grunty
                  inwestycyjne. Robiliśmy to wszystko. Powiedz nam co masz.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button asChild variant="lime" size="lg">
                    <Link href="/konsultacja">
                      Opisz nam swoją sytuację
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
