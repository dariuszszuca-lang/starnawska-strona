"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  KeyRound,
  Calculator,
  Sparkles,
  ArrowRight,
  Check,
  Clock,
  Camera,
  TrendingUp,
  Building,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Service = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tagline: string;
  description: string;
  steps: { icon: React.ComponentType<{ className?: string }>; label: string }[];
  stat: { value: string; label: string };
  cta: string;
};

const services: Service[] = [
  {
    id: "sprzedaz",
    icon: Home,
    title: "Sprzedaż nieruchomości",
    tagline: "Od pierwszej rozmowy do aktu notarialnego.",
    description:
      "Bierzemy całą sprzedaż na siebie: wycenę, przygotowanie oferty, sesję, promocję, pokazy i obsługę dokumentów. Ty podpisujesz tylko umowę.",
    steps: [
      { icon: TrendingUp, label: "Wycena rynkowa po wizji lokalnej" },
      { icon: Camera, label: "Profesjonalna sesja zdjęciowa i plan 2D" },
      { icon: Building, label: "Publikacja w 30+ portalach + nasza baza" },
      { icon: ShieldCheck, label: "Obsługa dokumentów do aktu notarialnego" },
    ],
    stat: { value: "6 tyg.", label: "średni czas sprzedaży" },
    cta: "Sprzedaj z nami",
  },
  {
    id: "wynajem",
    icon: KeyRound,
    title: "Wynajem długoterminowy",
    tagline: "Dla właścicieli i poszukujących.",
    description:
      "Dla właścicieli: znajdujemy najemcę, weryfikujemy, prowadzimy umowę. Dla najemców: pokazujemy oferty dopasowane do budżetu i preferencji.",
    steps: [
      { icon: ShieldCheck, label: "Weryfikacja najemcy (zaświadczenia, referencje)" },
      { icon: Home, label: "Umowa najmu okazjonalnego/instytucjonalnego" },
      { icon: Camera, label: "Protokół zdawczo-odbiorczy ze zdjęciami" },
      { icon: Wallet, label: "Pomoc przy rozliczeniach administracji" },
    ],
    stat: { value: "10 dni", label: "średnio do znalezienia najemcy" },
    cta: "Porozmawiajmy o najmie",
  },
  {
    id: "kredyt",
    icon: Calculator,
    title: "Doradztwo kredytowe",
    tagline: "Sprawdź ile mieszkania możesz kupić.",
    description:
      "Współpracujemy z niezależnymi pośrednikami kredytowymi. Sprawdzamy zdolność, porównujemy oferty z kilku banków, doprowadzamy do decyzji.",
    steps: [
      { icon: TrendingUp, label: "Bezpłatna analiza zdolności kredytowej" },
      { icon: Wallet, label: "Porównanie ofert z 5–8 banków" },
      { icon: ShieldCheck, label: "Programy rządowe (Bezpieczny Kredyt 2%, BK#)" },
      { icon: Building, label: "Pomoc w skompletowaniu dokumentów" },
    ],
    stat: { value: "5–8", label: "banków porównujemy w 24h" },
    cta: "Sprawdź zdolność",
  },
  {
    id: "staging",
    icon: Sparkles,
    title: "Home staging i sesja zdjęciowa",
    tagline: "Twoja oferta wygląda jak z magazynu.",
    description:
      "Profesjonalne zdjęcia, plan 2D, lekka aranżacja. Statystycznie podnoszą zainteresowanie ofertą o 60–120% w pierwszym tygodniu publikacji.",
    steps: [
      { icon: Camera, label: "Sesja szerokokątna 12–20 ujęć" },
      { icon: Building, label: "Plan piętra 2D w formacie PNG/PDF" },
      { icon: Sparkles, label: "Wirtualne meblowanie pustych pomieszczeń" },
      { icon: Home, label: "Doradztwo: co posprzątać przed sesją" },
    ],
    stat: { value: "+120%", label: "wzrost zainteresowania ofertą" },
    cta: "Zobacz przykłady",
  },
];

export function Services() {
  const [active, setActive] = useState(services[0].id);
  const current = services.find((s) => s.id === active) ?? services[0];
  const Icon = current.icon;

  return (
    <section className="py-20 lg:py-28">
      <Container size="wide">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
            Z czym do nas przychodzą
          </p>
          <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-foreground">
            Cztery sprawy, w których
            <br />
            robimy największą różnicę.
          </h2>
          <p className="mt-5 text-lg text-foreground-muted leading-relaxed max-w-xl">
            Wybierz tę, która pasuje do Twojej sytuacji. Albo zadzwoń, jeśli sprawa
            jest bardziej skomplikowana — łączymy te obszary, kiedy trzeba.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Zakładki po lewej */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {services.map((s) => {
              const IconBtn = s.icon;
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActive(s.id)}
                  onMouseEnter={() => setActive(s.id)}
                  className={cn(
                    "group relative text-left rounded-2xl border p-5 transition-all overflow-hidden",
                    isActive
                      ? "bg-surface-dark text-foreground-on-dark border-transparent shadow-[var(--shadow-card)]"
                      : "bg-surface border-border hover:border-brand-forest hover:-translate-y-0.5"
                  )}
                  aria-pressed={isActive}
                >
                  {isActive && (
                    <motion.div
                      layoutId="service-tab-glow"
                      aria-hidden
                      className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(163,199,51,0.18),transparent_55%)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative flex items-center gap-4">
                    <span
                      className={cn(
                        "size-11 shrink-0 rounded-xl flex items-center justify-center transition-colors",
                        isActive
                          ? "bg-brand-lime text-brand-forest-deep"
                          : "bg-gray-100 text-brand-forest group-hover:bg-brand-lime/15 group-hover:text-brand-olive"
                      )}
                    >
                      <IconBtn className="size-5" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "font-semibold text-base lg:text-lg leading-tight tracking-tight",
                          isActive ? "text-foreground-on-dark" : "text-foreground"
                        )}
                      >
                        {s.title}
                      </p>
                      <p
                        className={cn(
                          "text-xs mt-1",
                          isActive
                            ? "text-foreground-on-dark-muted"
                            : "text-foreground-muted"
                        )}
                      >
                        {s.tagline}
                      </p>
                    </div>
                    <ArrowRight
                      className={cn(
                        "size-4 shrink-0 transition-all",
                        isActive
                          ? "text-brand-lime opacity-100"
                          : "text-foreground-subtle opacity-0 group-hover:opacity-100"
                      )}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Panel szczegółów po prawej */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.article
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-full rounded-3xl bg-surface border border-border p-8 lg:p-10 overflow-hidden"
              >
                <div
                  aria-hidden
                  className="absolute -top-20 -right-20 size-64 rounded-full bg-brand-lime/12 blur-3xl"
                />

                <div className="relative">
                  <div className="flex items-start gap-5 mb-6">
                    <span className="size-14 rounded-2xl bg-brand-lime/15 text-brand-olive flex items-center justify-center shrink-0">
                      <Icon className="size-7" />
                    </span>
                    <div>
                      <h3 className="font-bold text-2xl lg:text-3xl tracking-tight text-foreground leading-tight">
                        {current.title}
                      </h3>
                      <p className="text-sm uppercase tracking-wider text-brand-olive font-semibold mt-1.5">
                        {current.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-lg text-foreground leading-relaxed mb-8 max-w-2xl">
                    {current.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {current.steps.map((step, i) => {
                      const StepIcon = step.icon;
                      return (
                        <motion.div
                          key={step.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.06 }}
                          className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-border"
                        >
                          <span className="size-8 rounded-lg bg-surface text-brand-forest flex items-center justify-center shrink-0">
                            <StepIcon className="size-4" />
                          </span>
                          <span className="text-sm text-foreground leading-snug pt-1">
                            {step.label}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap items-end justify-between gap-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-full bg-brand-lime/20 text-brand-olive flex items-center justify-center">
                        <Clock className="size-5" />
                      </div>
                      <div>
                        <p className="font-bold text-2xl text-foreground tabular-nums">
                          {current.stat.value}
                        </p>
                        <p className="text-xs text-foreground-muted uppercase tracking-wider">
                          {current.stat.label}
                        </p>
                      </div>
                    </div>
                    <Button asChild variant="lime" size="md">
                      <Link href={`/doradztwo#${current.id}`}>
                        {current.cta}
                        <ArrowRight />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Mini krzywa decorative */}
                <svg
                  aria-hidden
                  viewBox="0 0 400 80"
                  className="absolute bottom-4 right-6 w-32 opacity-40"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M 0 60 Q 100 20 200 40 T 400 10"
                    stroke="#a3c733"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  />
                </svg>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
