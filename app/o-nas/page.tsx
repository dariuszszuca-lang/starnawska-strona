import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Compass, Handshake, TrendingUp, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "O nas — historia biura od 2011 roku",
  description:
    "Starnawska & Boleńska Nieruchomości. Od 2011 roku w Gdyni. Zespół 9 kobiet, ponad 1500 transakcji, jedna zasada: Twoje potrzeby są naszym priorytetem.",
};

const values = [
  {
    icon: Heart,
    title: "Człowiek przed transakcją",
    body: "Najpierw słuchamy, potem działamy. Nie wciskamy. Jeśli sprawa nie ma sensu, mówimy wprost.",
  },
  {
    icon: Compass,
    title: "Lokalna wiedza",
    body: "Znamy każde osiedle w Gdyni, Sopocie i Gdańsku. Wiemy gdzie warto, a gdzie poczekać.",
  },
  {
    icon: Handshake,
    title: "Transparentność",
    body: "Wszystkie warunki na stole. Bez ukrytych prowizji, bez gwiazdki przy umowie.",
  },
  {
    icon: TrendingUp,
    title: "Skuteczność",
    body: "Większość ofert sprzedajemy w pierwszym miesiącu. Mierzymy to, mówimy o tym.",
  },
];

const timeline = [
  { year: "2011", title: "Początek", body: "Patrycja i Jolanta otwierają biuro w Gdyni." },
  { year: "2015", title: "Pierwsze 500 transakcji", body: "Marka rozpoznawalna w Trójmieście." },
  { year: "2019", title: "Rynek pierwotny", body: "Współpraca z deweloperami z Pomorza." },
  { year: "2022", title: "Zespół 8+ osób", body: "Specjalizacje: grunty, mieszkania, najem, dewelopment." },
  {
    year: `${new Date().getFullYear()}`,
    title: "Teraz",
    body: "9 kobiet, ponad 1500 transakcji, partnerzy: PFRN, SPPON, RECAMP.",
  },
];

export default function OnasPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 lg:pt-36 pb-12">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
              O nas
            </p>
            <h1 className="font-bold tracking-tight text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-foreground">
              Od {siteConfig.foundedYear} roku
              <br />
              <span className="text-foreground-muted">
                pomagamy Trójmiastu znaleźć dom.
              </span>
            </h1>
            <p className="mt-6 text-lg text-foreground-muted leading-relaxed max-w-2xl">
              Nasza firma powstała z prostego założenia: pośrednik to ktoś, kto pomaga,
              a nie sprzedaje. Po {siteConfig.metrics.yearsActive} latach i ponad{" "}
              {siteConfig.metrics.transactions} transakcjach trzymamy się tej zasady.
            </p>
          </div>
        </Container>
      </section>

      {/* Metrics row */}
      <section className="py-12">
        <Container size="wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            <Metric value={`${siteConfig.metrics.yearsActive}+`} label="lat na rynku" />
            <Metric value={siteConfig.metrics.transactions} label="transakcji" />
            <Metric value={`${siteConfig.metrics.teamSize}`} label="ekspertek w zespole" />
            <Metric value={`${siteConfig.metrics.rating} ★`} label="średnia ocen klientów" />
          </div>
        </Container>
      </section>

      {/* Wartości */}
      <section className="py-16 lg:py-24">
        <Container size="wide">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
              Wartości
            </p>
            <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-foreground">
              Cztery rzeczy,
              <br />
              <span className="text-foreground-muted">w które wierzymy.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <article
                  key={v.title}
                  className="rounded-3xl bg-surface border border-border p-8 lg:p-10"
                >
                  <div className="size-12 rounded-2xl bg-brand-lime/15 text-brand-olive flex items-center justify-center mb-5">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-semibold text-xl text-foreground mb-2">{v.title}</h3>
                  <p className="text-foreground-muted leading-relaxed">{v.body}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24 bg-surface">
        <Container size="default">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
              Nasza historia
            </p>
            <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-foreground">
              {new Date().getFullYear() - siteConfig.foundedYear} lat na pomorskim rynku.
            </h2>
          </div>

          <ol className="relative space-y-12 border-l-2 border-brand-lime/30 pl-8 lg:pl-12">
            {timeline.map((t, i) => (
              <li key={i} className="relative">
                <span
                  className="absolute -left-[42px] lg:-left-[58px] size-10 rounded-full bg-brand-lime text-brand-forest-deep flex items-center justify-center text-xs font-bold tracking-tight"
                  aria-hidden
                >
                  {t.year.slice(-2)}
                </span>
                <p className="text-sm font-mono text-brand-olive mb-1">{t.year}</p>
                <h3 className="font-bold tracking-tight text-2xl tracking-tight text-foreground mb-2">
                  {t.title}
                </h3>
                <p className="text-foreground-muted leading-relaxed max-w-xl">{t.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <Container size="default">
          <div className="rounded-[40px] bg-surface-dark text-foreground-on-dark p-10 lg:p-16 text-center">
            <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight mb-4">
              Sprawdź jak pracujemy.
            </h2>
            <p className="text-lg text-foreground-on-dark-muted max-w-2xl mx-auto mb-8">
              30 minut bez zobowiązań. Powiedz nam czego potrzebujesz.
            </p>
            <Button asChild variant="lime" size="lg">
              <Link href="/konsultacja">
                Umów konsultację
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl bg-surface border border-border p-6 lg:p-8">
      <p className="font-bold tracking-tight text-4xl lg:text-5xl text-foreground tracking-tight mb-2 tabular-nums">
        {value}
      </p>
      <p className="text-sm text-foreground-muted leading-tight">{label}</p>
    </div>
  );
}
