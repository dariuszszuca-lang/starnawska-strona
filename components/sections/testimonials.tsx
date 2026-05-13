"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { testimonials, type Testimonial } from "@/lib/testimonials";
import { getMemberBySlug } from "@/lib/team";
import { cn } from "@/lib/utils";

const AUTO_MS = 7000;

export function Testimonials() {
  const items = testimonials;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = items[index];
  const agent = current.agentSlug ? getMemberBySlug(current.agentSlug) : null;

  // Auto-rotate
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, AUTO_MS);
    return () => clearInterval(t);
  }, [paused, items.length]);

  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  // 6 opinii w gridzie (pomijamy aktualnie wyświetlaną)
  const gridItems = items.filter((_, i) => i !== index).slice(0, 6);

  return (
    <section className="py-20 lg:py-28 bg-surface relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(163,199,51,0.06),transparent_50%),radial-gradient(circle_at_90%_90%,rgba(45,74,31,0.05),transparent_50%)]"
      />

      <Container size="wide" className="relative">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
              Opinie klientów
            </p>
            <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-foreground">
              Co mówią klienci,
              <br />
              <span className="text-foreground-muted">którzy z nami sprzedali.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-brand-lime text-brand-lime" />
              ))}
              <span className="ml-2 font-bold text-2xl text-foreground tabular-nums">4.9</span>
              <span className="text-sm text-foreground-muted ml-1">/5</span>
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-border text-sm">
              <span className="font-semibold text-foreground tabular-nums">{items.length}+</span>
              <span className="text-foreground-muted">opinii w {new Date().getFullYear()}</span>
            </div>
            <div className="flex items-center gap-2 pl-4 border-l border-border text-xs text-foreground-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-brand-lime animate-pulse" />
                Google · Trojmiasto.pl · Panorama
              </span>
            </div>
          </div>
        </div>

        {/* Featured + nav */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative rounded-3xl bg-background border border-border overflow-hidden mb-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 lg:p-12"
            >
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-8">
                  <Quote
                    className="size-10 text-brand-lime mb-5"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <div className="flex items-center gap-1 mb-5">
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-brand-lime text-brand-lime"
                        aria-hidden
                      />
                    ))}
                  </div>
                  <blockquote className="text-xl lg:text-2xl text-foreground leading-relaxed font-medium tracking-tight">
                    „{current.bodyLong ?? current.body}"
                  </blockquote>
                </div>

                <div className="lg:col-span-4 lg:border-l lg:border-border lg:pl-10">
                  <div className="flex items-center gap-4 mb-6">
                    <AvatarInitials author={current.author} />
                    <div>
                      <p className="font-semibold text-foreground">{current.author}</p>
                      {current.role && (
                        <p className="text-xs text-foreground-muted mt-0.5">
                          {current.role}
                        </p>
                      )}
                    </div>
                  </div>

                  {agent && (
                    <Link
                      href={`/zespol/${agent.slug}`}
                      className="block p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group/agent"
                    >
                      <p className="text-[10px] uppercase tracking-wider text-foreground-muted mb-1">
                        Prowadziła
                      </p>
                      <p className="font-medium text-foreground text-sm group-hover/agent:text-brand-forest transition-colors inline-flex items-center gap-1">
                        {agent.fullName}
                        <span className="opacity-0 group-hover/agent:opacity-100 transition-opacity">
                          →
                        </span>
                      </p>
                    </Link>
                  )}

                  <p className="mt-4 text-[10px] uppercase tracking-wider text-foreground-subtle">
                    {sourceLabel(current.source)} ·{" "}
                    {new Date(current.date + "-01").toLocaleDateString("pl-PL", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-100">
            <motion.div
              key={current.id + (paused ? "-p" : "")}
              initial={{ width: 0 }}
              animate={{ width: paused ? "100%" : "100%" }}
              transition={{ duration: paused ? 0 : AUTO_MS / 1000, ease: "linear" }}
              className="h-full bg-brand-lime"
            />
          </div>
        </div>

        {/* Nav */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2 text-sm text-foreground-muted">
            <span className="font-mono tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-foreground-subtle">/</span>
            <span className="font-mono tabular-nums">
              {String(items.length).padStart(2, "0")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Poprzednia opinia"
              className="size-11 rounded-xl border border-border bg-background hover:border-brand-forest hover:bg-surface flex items-center justify-center transition-all"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={next}
              aria-label="Następna opinia"
              className="size-11 rounded-xl border border-border bg-background hover:border-brand-forest hover:bg-surface flex items-center justify-center transition-all"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Grid pozostałych opinii */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gridItems.map((t, i) => {
            const tAgent = t.agentSlug ? getMemberBySlug(t.agentSlug) : null;
            return (
              <motion.button
                key={t.id}
                onClick={() => setIndex(items.findIndex((x) => x.id === t.id))}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className="group text-left rounded-2xl bg-background border border-border p-5 hover:border-brand-forest hover:shadow-[var(--shadow-card)] transition-all"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-3 fill-brand-lime text-brand-lime" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4 line-clamp-4">
                  „{t.body}"
                </p>
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <AvatarInitials author={t.author} size="sm" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {t.author}
                      </p>
                      {tAgent && (
                        <p className="text-[10px] text-foreground-muted truncate">
                          z {tAgent.firstName}
                        </p>
                      )}
                    </div>
                  </div>
                  <Sparkles className="size-3.5 text-foreground-subtle group-hover:text-brand-lime transition-colors shrink-0" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ============================================
   AvatarInitials — kolorowe inicjały
   ============================================ */
function AvatarInitials({
  author,
  size = "md",
}: {
  author: string;
  size?: "sm" | "md";
}) {
  const initials = author
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  // Deterministyczny kolor z hasha imienia
  const hash = author
    .split("")
    .reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 0);
  const hue = hash % 360;

  const sizeClass = size === "sm" ? "size-9 text-xs" : "size-12 text-sm";

  return (
    <span
      className={cn(
        "shrink-0 rounded-full flex items-center justify-center font-bold text-brand-forest-deep ring-1 ring-border",
        sizeClass
      )}
      style={{
        background: `linear-gradient(135deg, hsl(${hue}, 60%, 85%), hsl(${(hue + 40) % 360}, 50%, 75%))`,
      }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

function sourceLabel(source: Testimonial["source"]): string {
  switch (source) {
    case "google":
      return "Google";
    case "trojmiasto":
      return "Trojmiasto.pl";
    case "facebook":
      return "Facebook";
    case "panorama":
      return "Panorama Firm";
    case "gowork":
      return "GoWork";
    case "polecenie":
      return "Polecenie";
    default:
      return "Recenzja";
  }
}
