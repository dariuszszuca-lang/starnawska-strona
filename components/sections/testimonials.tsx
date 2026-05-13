"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { testimonials } from "@/lib/testimonials";
import { getMemberBySlug } from "@/lib/team";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const items = testimonials;
  const current = items[index];
  const agent = current.agentSlug ? getMemberBySlug(current.agentSlug) : null;

  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <Container size="wide">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
              Opinie klientów
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-foreground mb-6">
              Tego nie da się
              <br />
              <span className="text-foreground-muted italic">kupić.</span>
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-8 max-w-md">
              {items.length} historii naszych klientów. Mediana ocen w portalach
              (Google, Trojmiasto.pl, Panorama Firm) z ostatniego roku: 4.9/5.
            </p>

            {/* Nav arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                aria-label="Poprzednia opinia"
                className="size-12 rounded-full border border-border hover:border-brand-forest hover:bg-surface flex items-center justify-center transition-all"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={next}
                aria-label="Następna opinia"
                className="size-12 rounded-full border border-border hover:border-brand-forest hover:bg-surface flex items-center justify-center transition-all"
              >
                <ChevronRight className="size-5" />
              </button>
              <div className="ml-4 text-sm tabular-nums text-foreground-muted">
                {index + 1} / {items.length}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.article
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-3xl bg-background border border-border p-8 lg:p-12"
              >
                <Quote
                  className="absolute -top-6 left-8 size-12 text-brand-lime"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-brand-lime text-brand-lime"
                      aria-hidden
                    />
                  ))}
                </div>
                <blockquote className="text-xl lg:text-2xl text-foreground leading-relaxed font-display tracking-tight mb-8">
                  „{current.body}"
                </blockquote>
                <footer className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-border">
                  <div>
                    <p className="font-semibold text-foreground">{current.author}</p>
                    {current.role && (
                      <p className="text-sm text-foreground-muted">{current.role}</p>
                    )}
                  </div>
                  {agent && (
                    <a
                      href={`/zespol/${agent.slug}`}
                      className="text-sm text-foreground-muted hover:text-brand-forest transition-colors"
                    >
                      <span className="text-xs uppercase tracking-wider text-foreground-subtle block mb-0.5">
                        Prowadziła
                      </span>
                      {agent.fullName} →
                    </a>
                  )}
                </footer>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
