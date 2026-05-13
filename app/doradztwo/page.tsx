import type { Metadata } from "next";
import Link from "next/link";
import { Home, KeyRound, Calculator, Sparkles, ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Doradztwo i usługi — sprzedaż, najem, kredyty, home staging",
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
      "Umowa najmu okazjonalnego/instytucjonalnego",
      "Protokół zdawczo-odbiorczy ze zdjęciami",
      "Opieka nad nieruchomością w trakcie najmu",
      "Pomoc przy rozliczeniach administracji",
    ],
    cta: "Porozmawiajmy o najmie",
    tone: "lime" as const,
  },
  {
    id: "kredyt",
    icon: Calculator,
    title: "Doradztwo kredytowe",
    lead: "Sprawdź ile mieszkania możesz kupić.",
    body: "Współpracujemy z niezależnymi pośrednikami kredytowymi. Sprawdzamy zdolność, porównujemy oferty kilku banków, doprowadzamy do decyzji.",
    points: [
      "Bezpłatna analiza zdolności kredytowej",
      "Porównanie ofert z kilku banków",
      "Programy rządowe (Bezpieczny Kredyt 2%, BK# itp.)",
      "Pomoc w skompletowaniu dokumentów",
      "Sprawdzenie zabezpieczeń notarialnych",
    ],
    cta: "Sprawdź zdolność",
    tone: "default" as const,
  },
  {
    id: "staging",
    icon: Sparkles,
    title: "Home staging i sesje",
    lead: "Twoja oferta wygląda jak z magazynu.",
    body: "Profesjonalne zdjęcia, plan 2D, lekka aranżacja. Statystycznie podnoszą zainteresowanie ofertą o 60–120%. Robimy to dla każdej oferty, którą sprzedajemy.",
    points: [
      "Sesja zdjęciowa szerokokątna",
      "Plan piętra 2D",
      "Wirtualne meblowanie pustych pomieszczeń (opcja)",
      "Doradztwo: co posprzątać, co odłożyć przed sesją",
      "Lekkie aranżacje (akcesoria, oświetlenie)",
    ],
    cta: "Zobacz przykłady",
    tone: "default" as const,
  },
];

export default function DoradztwoPage() {
  return (
    <>
      <section className="pt-32 lg:pt-36 pb-12">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
              Doradztwo
            </p>
            <h1 className="font-bold tracking-tight text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-foreground">
              Cztery sposoby,
              <br />
              <span className="text-foreground-muted">w jakie pomagamy.</span>
            </h1>
            <p className="mt-6 text-lg text-foreground-muted leading-relaxed max-w-2xl">
              Najczęściej pomagamy w jednym z tych czterech obszarów. Ale w praktyce
              każdą sprawę traktujemy jako kompleks: ktoś sprzedaje + szuka nowego,
              ktoś wynajmuje + bierze kredyt na drugie. Zaczynamy od rozmowy, potem
              rozkładamy plan na atomy.
            </p>
          </div>
        </Container>
      </section>

      {/* Nav anchors */}
      <section className="py-4 border-y border-border bg-surface sticky top-20 z-30 backdrop-blur-sm">
        <Container size="wide">
          <nav className="flex flex-wrap gap-2" aria-label="Spis usług">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 hover:bg-brand-lime/20 text-sm text-foreground transition-colors"
              >
                <s.icon className="size-3.5 text-brand-olive" />
                {s.title}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      {/* Sekcje */}
      {services.map((s, i) => {
        const Icon = s.icon;
        const dark = s.tone === "lime" || i % 2 === 0;
        return (
          <section
            key={s.id}
            id={s.id}
            className={`py-16 lg:py-24 scroll-mt-32 ${
              dark ? "bg-surface" : ""
            }`}
          >
            <Container size="wide">
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                <div className="lg:col-span-5">
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
                  <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-foreground mb-6">
                    {s.title}
                  </h2>
                  <p className="text-lg text-foreground-muted leading-relaxed mb-8">
                    {s.body}
                  </p>
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
                        className="flex items-start gap-4 p-5 rounded-2xl bg-surface border border-border"
                      >
                        <span className="size-6 rounded-full bg-brand-lime/20 text-brand-olive flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="size-3.5" strokeWidth={3} />
                        </span>
                        <span className="text-foreground leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* CTA końcowy */}
      <section className="py-16 lg:py-24">
        <Container size="default">
          <div className="rounded-[40px] bg-surface-dark text-foreground-on-dark p-10 lg:p-16 text-center">
            <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight mb-4">
              Twoja sprawa nie pasuje do żadnej kategorii?
            </h2>
            <p className="text-lg text-foreground-on-dark-muted max-w-2xl mx-auto mb-8">
              Spadek, podział majątku, sprzedaż udziałów, rynek pierwotny, grunty
              inwestycyjne. Robiliśmy to wszystko. Powiedz nam co masz.
            </p>
            <Button asChild variant="lime" size="lg">
              <Link href="/konsultacja">
                Opisz nam swoją sytuację
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
