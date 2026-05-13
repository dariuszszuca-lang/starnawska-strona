import Link from "next/link";
import { Clock, TrendingUp, MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

type CaseStudy = {
  id: string;
  location: string;
  type: string;
  area: string;
  daysToSell: number;
  priceTrend: string;
  story: string;
};

const cases: CaseStudy[] = [
  {
    id: "c1",
    location: "Gdynia, Orłowo",
    type: "Mieszkanie 3-pokojowe",
    area: "72 m²",
    daysToSell: 11,
    priceTrend: "+8% nad wycenę bankową",
    story:
      "Mieszkanie wisiało pół roku w portalach po cenie 940 tys. zł. Klienci przyszli do nas po samodzielnej próbie sprzedaży. Zmieniliśmy zdjęcia, zrobiliśmy plan 2D, ustaliliśmy realną cenę 880 tys. Sprzedane w 11 dni za 920 tys.",
  },
  {
    id: "c2",
    location: "Sopot, Górny",
    type: "Mieszkanie 2-pokojowe",
    area: "48 m²",
    daysToSell: 21,
    priceTrend: "Najlepsza cena w bloku w 2026",
    story:
      "Spadek po dziadku, klient mieszka w Niemczech. Zorganizowaliśmy zdalnie wszystko: pełnomocnictwo, sprzątanie, sesję, pokazy. Akt notarialny przez pełnomocnika, klient w Polsce był 1 raz na 3 godziny.",
  },
  {
    id: "c3",
    location: "Gdańsk, Letnica",
    type: "Dom wolnostojący",
    area: "180 m² + 600 m² działki",
    daysToSell: 67,
    priceTrend: "Cena z pierwszego pokazu",
    story:
      "Nietypowa nieruchomość: dom z lat 70-tych w stanie wymagającym remontu, ale działka idealna pod inwestycję. Znaleźliśmy inwestora przez naszą bazę B2B (developera szukającego gruntów). Sprzedane bez publikacji w portalach.",
  },
];

export function CaseStudies() {
  return (
    <section className="py-20 lg:py-28">
      <Container size="wide">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
              Realizacje
            </p>
            <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-foreground">
              3 mieszkania. 3 historie.
              <br />
              <span className="text-foreground-muted">Liczby na końcu.</span>
            </h2>
          </div>
          <Button asChild variant="outline" size="md">
            <Link href="/konsultacja">
              Twoja sprawa jest następna
              <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {cases.map((c) => (
            <article
              key={c.id}
              className="group flex flex-col rounded-3xl bg-surface border border-border p-7 lg:p-8 hover:border-brand-forest hover:shadow-[var(--shadow-card)] transition-all"
            >
              <div className="flex items-center gap-2 text-xs text-foreground-muted mb-4">
                <MapPin className="size-3.5 text-brand-olive" />
                {c.location}
              </div>

              <h3 className="font-bold tracking-tight text-2xl tracking-tight text-foreground mb-2 leading-tight">
                {c.type}
              </h3>
              <p className="text-sm text-foreground-muted mb-6">{c.area}</p>

              <p className="text-foreground leading-relaxed mb-8 flex-1">
                {c.story}
              </p>

              <dl className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
                <div>
                  <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-foreground-muted mb-1">
                    <Clock className="size-3" />
                    Czas
                  </dt>
                  <dd className="font-bold tracking-tight text-2xl text-foreground tabular-nums">
                    {c.daysToSell} dni
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-foreground-muted mb-1">
                    <TrendingUp className="size-3" />
                    Cena
                  </dt>
                  <dd className="font-semibold text-sm text-foreground leading-tight">
                    {c.priceTrend}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
