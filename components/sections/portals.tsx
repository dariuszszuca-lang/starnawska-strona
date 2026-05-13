"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Globe, Building2, Users } from "lucide-react";
import { Container } from "@/components/ui/container";

type Portal = { name: string; color: string };

const portals: Portal[] = [
  { name: "Otodom", color: "#E20074" },
  { name: "Olx", color: "#5BAA00" },
  { name: "Morizon", color: "#FF6B00" },
  { name: "Domiporta", color: "#1F4E8C" },
  { name: "Adresowo", color: "#0066CC" },
  { name: "Trojmiasto.pl", color: "#003F7F" },
  { name: "Sprzedajemy.pl", color: "#E30613" },
  { name: "Domy.pl", color: "#1AA458" },
  { name: "Nieruchomości-online", color: "#2E86AB" },
  { name: "Gratka", color: "#D32F2F" },
  { name: "Oferty.net", color: "#4A90E2" },
  { name: "Gethome", color: "#6D28D9" },
  { name: "RynekPierwotny", color: "#0F766E" },
  { name: "Tabelaofert", color: "#9333EA" },
  { name: "Domplus", color: "#DC2626" },
];

// Drugi rząd (różne portale dla zmiennej kompozycji)
const portalsRow2: Portal[] = [
  { name: "Otodom", color: "#E20074" },
  { name: "Otoprzeprowadzka", color: "#F97316" },
  { name: "Krn.pl", color: "#16A34A" },
  { name: "Nieruchomości24", color: "#0EA5E9" },
  { name: "Rynekpierwotny.pl", color: "#0F766E" },
  { name: "Nportal.pl", color: "#7C3AED" },
  { name: "Bezposrednio.com", color: "#DC2626" },
  { name: "Domosfera", color: "#EA580C" },
  { name: "Lento.pl", color: "#0891B2" },
  { name: "Adres.pl", color: "#0066CC" },
  { name: "Sonarhome", color: "#DB2777" },
  { name: "WGN", color: "#1E40AF" },
];

/* ============================================
   Counter
   ============================================ */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/* ============================================
   Pill — pojedynczy portal w marquee
   ============================================ */
function PortalPill({ portal }: { portal: Portal }) {
  return (
    <span className="group/pill shrink-0 inline-flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full bg-background border border-border text-foreground font-medium text-sm whitespace-nowrap transition-all hover:border-foreground hover:shadow-[var(--shadow-soft)]">
      <span
        className="size-7 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0 transition-transform group-hover/pill:scale-110"
        style={{ backgroundColor: portal.color }}
      >
        {portal.name[0]}
      </span>
      {portal.name}
    </span>
  );
}

export function Portals() {
  return (
    <section className="py-20 lg:py-24 bg-surface overflow-hidden">
      <Container size="wide">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-10 lg:mb-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
              Zasięg publikacji
            </p>
            <h2 className="font-bold tracking-tight text-3xl lg:text-4xl leading-[1.1] text-foreground mb-3">
              Publikujemy w {portals.length}+ portalach.
              <br />
              <span className="text-foreground-muted">Twojej oferty nie da się przegapić.</span>
            </h2>
          </div>

          {/* 3 liczniki */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-3 lg:gap-4">
            <StatCard icon={Globe} value={15} suffix="+" label="portali ogłoszeniowych" />
            <StatCard icon={Building2} value={200} suffix="+" label="biur w naszej bazie" />
            <StatCard
              icon={Users}
              value={1500000}
              suffix="+"
              format={(n) => (n >= 1000 ? `${(n / 1000000).toFixed(1)}M` : `${n}`)}
              label="wizyt miesięcznie"
            />
          </div>
        </div>

        {/* Marquee rząd 1 — w lewo */}
        <div className="relative overflow-hidden">
          <div
            aria-hidden
            className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-surface to-transparent z-10"
          />
          <div
            aria-hidden
            className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-surface to-transparent z-10"
          />
          <div className="flex gap-3 animate-[marquee-l_38s_linear_infinite] whitespace-nowrap">
            {[...portals, ...portals].map((p, i) => (
              <PortalPill key={`r1-${p.name}-${i}`} portal={p} />
            ))}
          </div>
        </div>

        {/* Marquee rząd 2 — w prawo */}
        <div className="relative overflow-hidden mt-3">
          <div
            aria-hidden
            className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-surface to-transparent z-10"
          />
          <div
            aria-hidden
            className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-surface to-transparent z-10"
          />
          <div className="flex gap-3 animate-[marquee-r_42s_linear_infinite] whitespace-nowrap">
            {[...portalsRow2, ...portalsRow2].map((p, i) => (
              <PortalPill key={`r2-${p.name}-${i}`} portal={p} />
            ))}
          </div>
        </div>

        {/* Footer note z live indicator */}
        <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-foreground-muted">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-lime/15 text-brand-forest-deep font-semibold text-xs">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-lime opacity-75 animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-lime" />
            </span>
            Publikacja na żywo
          </span>
          <span className="leading-relaxed">
            Plus własna baza pośredników: 200+ aktywnych biur w Trójmieście wymienia
            się ofertami przez nasz CRM.
          </span>
        </div>

        <style>{`
          @keyframes marquee-l {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes marquee-r {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-\\[marquee-l_38s_linear_infinite\\],
            .animate-\\[marquee-r_42s_linear_infinite\\] {
              animation: none;
            }
          }
        `}</style>
      </Container>
    </section>
  );
}

/* ============================================
   StatCard
   ============================================ */
function StatCard({
  icon: Icon,
  value,
  suffix,
  label,
  format,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix?: string;
  label: string;
  format?: (n: number) => string;
}) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => setV(Math.round(n)),
    });
    return () => controls.stop();
  }, [inView, value]);

  const display = format ? format(v) : v.toLocaleString("pl-PL");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl bg-background border border-border p-4 lg:p-5 hover:border-brand-forest transition-colors"
    >
      <Icon className="size-5 text-brand-olive mb-3" />
      <p className="font-bold text-2xl lg:text-3xl text-foreground tabular-nums leading-tight">
        {display}
        {suffix}
      </p>
      <p className="text-xs text-foreground-muted mt-1 leading-tight">{label}</p>
    </motion.div>
  );
}
