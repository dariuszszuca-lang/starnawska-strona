"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Clock, TrendingUp, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

type CaseStudy = {
  id: string;
  number: string;
  location: string;
  type: string;
  area: string;
  daysToSell: number;
  priceTrend: string;
  story: string;
  /** Procent paska postępu na linii czasowej. Im krócej tym lepiej. */
  speedScore: number;
};

const cases: CaseStudy[] = [
  {
    id: "c1",
    number: "01",
    location: "Gdynia, Orłowo",
    type: "Mieszkanie 3-pokojowe",
    area: "72 m²",
    daysToSell: 11,
    priceTrend: "+8% nad wycenę bankową",
    story:
      "Mieszkanie wisiało pół roku w portalach po cenie 940 tys. zł. Klienci przyszli do nas po samodzielnej próbie sprzedaży. Zmieniliśmy zdjęcia, zrobiliśmy plan 2D, ustaliliśmy realną cenę 880 tys. Sprzedane w 11 dni za 920 tys.",
    speedScore: 95,
  },
  {
    id: "c2",
    number: "02",
    location: "Sopot, Górny",
    type: "Mieszkanie 2-pokojowe",
    area: "48 m²",
    daysToSell: 21,
    priceTrend: "Najlepsza cena w bloku w 2026",
    story:
      "Spadek po dziadku, klient mieszka w Niemczech. Zorganizowaliśmy zdalnie wszystko: pełnomocnictwo, sprzątanie, sesję, pokazy. Akt notarialny przez pełnomocnika, klient w Polsce był 1 raz na 3 godziny.",
    speedScore: 80,
  },
  {
    id: "c3",
    number: "03",
    location: "Gdańsk, Letnica",
    type: "Dom wolnostojący",
    area: "180 m² + 600 m² działki",
    daysToSell: 67,
    priceTrend: "Cena z pierwszego pokazu",
    story:
      "Nietypowa nieruchomość: dom z lat 70-tych w stanie wymagającym remontu, ale działka idealna pod inwestycję. Znaleźliśmy inwestora przez naszą bazę B2B (developera szukającego gruntów). Sprzedane bez publikacji w portalach.",
    speedScore: 55,
  },
];

/* ============================================
   Count-up
   ============================================ */
function Counter({ to, suffix = "", className }: { to: number; suffix?: string; className?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}

/* ============================================
   Speed bar. Wskaźnik tempa sprzedaży
   ============================================ */
function SpeedBar({ score }: { score: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-foreground-muted">
        <span>Tempo</span>
        <span className="font-bold text-foreground tabular-nums">{score}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-brand-olive to-brand-lime"
        />
      </div>
    </div>
  );
}

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
          {cases.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col rounded-3xl bg-surface border border-border overflow-hidden transition-all duration-300 hover:border-brand-forest hover:shadow-[var(--shadow-hover)]"
            >
              {/* Top accent bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                style={{ transformOrigin: "left" }}
                className="h-1 bg-gradient-to-r from-brand-lime via-brand-olive to-brand-forest"
              />

              <div className="relative flex flex-col h-full p-7 lg:p-8">
                {/* Numer + status */}
                <div className="flex items-start justify-between mb-5">
                  <span className="font-mono text-5xl font-bold text-foreground-subtle/30 leading-none select-none group-hover:text-brand-olive/40 transition-colors">
                    {c.number}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-lime/15 text-brand-forest-deep text-[10px] font-semibold uppercase tracking-wider">
                    <CheckCircle2 className="size-3" />
                    Sprzedane
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-foreground-muted mb-3">
                  <MapPin className="size-3.5 text-brand-olive" />
                  {c.location}
                </div>

                <h3 className="font-bold text-xl lg:text-2xl tracking-tight text-foreground mb-1 leading-tight">
                  {c.type}
                </h3>
                <p className="text-sm text-foreground-muted mb-5">{c.area}</p>

                <p className="text-sm text-foreground leading-relaxed mb-6 flex-1">
                  {c.story}
                </p>

                <SpeedBar score={c.speedScore} />

                <dl className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-border">
                  <div>
                    <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-foreground-muted mb-1.5">
                      <Clock className="size-3" />
                      Czas
                    </dt>
                    <dd>
                      <Counter
                        to={c.daysToSell}
                        suffix=" dni"
                        className="font-bold text-3xl text-foreground tabular-nums"
                      />
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-foreground-muted mb-1.5">
                      <TrendingUp className="size-3" />
                      Cena
                    </dt>
                    <dd className="font-semibold text-sm text-foreground leading-tight">
                      {c.priceTrend}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Hover lime glow */}
              <div
                aria-hidden
                className="absolute -bottom-32 -right-32 size-64 rounded-full bg-brand-lime/0 group-hover:bg-brand-lime/8 blur-3xl transition-all duration-500"
              />
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
