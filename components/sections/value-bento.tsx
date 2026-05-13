"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { ShieldCheck, MapPin, Users, Camera, Calculator, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { getAllMembersSorted } from "@/lib/team";

/* ============================================
   Count-up helper
   ============================================ */
function CountUp({
  to,
  duration = 1.6,
  suffix = "",
  className,
}: {
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}

/* ============================================
   Section
   ============================================ */
export function ValueBento() {
  const team = getAllMembersSorted();

  return (
    <section className="py-20 lg:py-28">
      <Container size="wide">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
            Dlaczego my
          </p>
          <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-foreground">
            Po co właściwie wybierać
            <br />
            biuro nieruchomości?
          </h2>
          <p className="mt-5 text-lg text-foreground-muted leading-relaxed max-w-xl">
            Pytanie zasadne. Jeśli sam dasz radę sprzedać, nie potrzebujesz nas.
            Ale jest sześć powodów, dla których 9 na 10 naszych klientów wraca po raz drugi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[200px]">
          {/* 1. Tylko Trójmiasto — hero card, ciemna, 3x2 */}
          <BentoCard
            tone="dark"
            span="md:col-span-3 md:row-span-2"
            delay={0}
            icon={MapPin}
            title="Tylko Trójmiasto"
            body="Znamy każdą dzielnicę Gdyni, Sopotu i Gdańska. Nie sprzedajemy w ciemno."
            extra={
              <div className="mt-auto grid grid-cols-3 gap-3 pt-6 border-t border-border-on-dark">
                <Stat value={3} label="miasta" />
                <Stat value={73} label="dzielnic" />
                <Stat value={15} label="lat" />
              </div>
            }
          />

          {/* 2. Zespół 9 kobiet — 3x1 */}
          <BentoCard
            span="md:col-span-3"
            delay={0.1}
            icon={Users}
            title="Zespół 9 kobiet"
            body="Każda specjalizuje się w innym segmencie rynku."
            extra={
              <div className="mt-auto flex -space-x-2 pt-3">
                {team.slice(0, 6).map((m, i) => (
                  <span
                    key={m.slug}
                    className="size-9 rounded-full bg-gradient-to-br from-brand-lime/40 to-brand-forest/60 ring-2 ring-surface flex items-center justify-center text-[10px] font-bold text-brand-forest-deep"
                    style={{ zIndex: 10 - i }}
                  >
                    {m.firstName[0]}
                    {m.lastName[0]}
                  </span>
                ))}
                <span className="size-9 rounded-full bg-brand-forest text-foreground-on-dark text-[10px] font-bold flex items-center justify-center ring-2 ring-surface">
                  +{team.length - 6}
                </span>
              </div>
            }
          />

          {/* 3. Profesjonalne sesje — lime, 3x1 */}
          <BentoCard
            tone="lime"
            span="md:col-span-3"
            delay={0.2}
            icon={Camera}
            title="Profesjonalne sesje"
            body="Fotografia, home staging, plany 2D. Twoja nieruchomość wygląda jak z magazynu."
            extra={
              <div className="mt-auto flex items-center gap-2 pt-3 text-xs font-semibold uppercase tracking-wider text-brand-forest-deep/70">
                <span className="size-1.5 rounded-full bg-brand-forest-deep animate-pulse" />
                Konwersja oferty +120%
              </div>
            }
          />

          {/* 4. Transparentna umowa — 2x1 */}
          <BentoCard
            span="md:col-span-2"
            delay={0.3}
            icon={ShieldCheck}
            title="Transparentna umowa"
            body="Bez ukrytych prowizji. Wszystko spisane od pierwszego spotkania."
          />

          {/* 5. Doradztwo kredytowe — 2x1 */}
          <BentoCard
            span="md:col-span-2"
            delay={0.4}
            icon={Calculator}
            title="Doradztwo kredytowe"
            body="Współpracujemy z bankami i pośrednikami. Pomagamy załatwić kredyt równolegle."
          />

          {/* 6. Rynek pierwotny — 2x1 */}
          <BentoCard
            span="md:col-span-2"
            delay={0.5}
            icon={Sparkles}
            title="Rynek pierwotny"
            body="Bezpośrednio z deweloperami. Lepsze warunki, czasem ceny niedostępne publicznie."
          />
        </div>
      </Container>
    </section>
  );
}

/* ============================================
   Stat — animowany count-up
   ============================================ */
function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <CountUp
        to={value}
        suffix="+"
        className="block font-bold text-2xl tabular-nums text-foreground-on-dark"
      />
      <span className="block text-[10px] uppercase tracking-wider text-foreground-on-dark-muted mt-0.5">
        {label}
      </span>
    </div>
  );
}

/* ============================================
   BentoCard
   ============================================ */
function BentoCard({
  tone = "default",
  span,
  delay,
  icon: Icon,
  title,
  body,
  extra,
}: {
  tone?: "default" | "dark" | "lime";
  span: string;
  delay: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  extra?: React.ReactNode;
}) {
  const palette =
    tone === "dark"
      ? {
          card: "bg-surface-dark text-foreground-on-dark border-transparent",
          iconBox: "bg-brand-lime/15 text-brand-lime",
          body: "text-foreground-on-dark-muted",
        }
      : tone === "lime"
        ? {
            card: "bg-brand-lime text-brand-forest-deep border-transparent",
            iconBox: "bg-brand-forest-deep/12 text-brand-forest-deep",
            body: "text-brand-forest-deep/80",
          }
        : {
            card: "bg-surface text-foreground border border-border",
            iconBox: "bg-gray-100 text-brand-forest group-hover:bg-brand-lime/20 group-hover:text-brand-olive",
            body: "text-foreground-muted",
          };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={`${span} ${palette.card} relative overflow-hidden rounded-3xl p-6 lg:p-7 flex flex-col group cursor-default transition-all duration-300 hover:shadow-[var(--shadow-hover)]`}
    >
      {/* Tło grain (subtelne) */}
      {tone === "dark" && (
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(163,199,51,0.18),transparent_55%)]"
        />
      )}

      <div className="relative flex flex-col h-full">
        <motion.div
          className={`size-12 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300 ${palette.iconBox}`}
          whileHover={{ rotate: -6, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Icon className="size-6" />
        </motion.div>

        <h3 className="font-bold text-lg lg:text-xl leading-tight mb-2 tracking-tight">
          {title}
        </h3>
        <p className={`text-sm leading-relaxed ${palette.body}`}>{body}</p>

        {extra}
      </div>

      {/* Arrow hover */}
      <motion.span
        aria-hidden
        className="absolute top-5 right-5 opacity-0 group-hover:opacity-60 transition-opacity"
        animate={{ rotate: [0, -8, 0] }}
        transition={{ duration: 0.4 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </motion.span>
    </motion.article>
  );
}
