"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface-dark text-foreground-on-dark grain">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(163,199,51,0.18),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(45,74,31,0.45),transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-brand-lime/5 blur-[120px]"
      />

      <Container size="wide" className="relative pt-12 lg:pt-16 pb-20 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-on-dark bg-white/[0.03] text-xs font-medium text-foreground-on-dark-muted"
            >
              <span className="size-1.5 rounded-full bg-brand-lime animate-pulse" />
              Trójmiasto · od {siteConfig.foundedYear} roku · {siteConfig.metrics.transactions} transakcji
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="font-bold text-[clamp(2.75rem,6.5vw,5rem)] leading-[1] tracking-[-0.04em]"
            >
              Najlepsze oferty
              <br />
              w Trójmieście.{" "}
              <span className="text-gradient-lime">Wybierane</span>
              <br />
              jeszcze przed publikacją.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl text-lg lg:text-xl text-foreground-on-dark-muted leading-relaxed"
            >
              Sprzedajemy, kupujemy i wynajmujemy mieszkania, domy i działki
              w Gdyni, Sopocie i Gdańsku. Część ofert wcale nie trafia do portali.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3"
            >
              <Button asChild variant="lime" size="lg">
                <Link href="/oferty">
                  Zobacz oferty
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline-dark" size="lg">
                <Link href="/konsultacja">
                  <Sparkles className="size-4" />
                  Zacznij od rozmowy
                </Link>
              </Button>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-border-on-dark max-w-md"
            >
              <div>
                <dt className="text-xs uppercase tracking-wider text-foreground-on-dark-muted">
                  Na rynku
                </dt>
                <dd className="text-2xl font-bold mt-1 tabular-nums">
                  {siteConfig.metrics.yearsActive} lat
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-foreground-on-dark-muted">
                  Sprzedanych
                </dt>
                <dd className="text-2xl font-bold mt-1 tabular-nums">
                  {siteConfig.metrics.transactions}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-foreground-on-dark-muted">
                  Ocena
                </dt>
                <dd className="text-2xl font-bold mt-1 inline-flex items-baseline gap-1 tabular-nums">
                  {siteConfig.metrics.rating}
                  <span className="text-xs text-brand-lime">★</span>
                </dd>
              </div>
            </motion.dl>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-square max-w-[480px] mx-auto">
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-brand-lime/25 to-brand-forest/45 blur-2xl" />

              <div className="relative h-full rounded-[40px] bg-gradient-to-br from-gray-900 to-black border border-border-on-dark p-10 flex items-center justify-center overflow-hidden">
                <Image
                  src="/brand/logo.png"
                  alt="Starnawska & Boleńska Nieruchomości — znak"
                  width={320}
                  height={320}
                  className="relative z-10 drop-shadow-2xl"
                  priority
                />
                <div
                  aria-hidden
                  className="absolute -bottom-20 -right-20 size-64 rounded-full bg-brand-lime/15 blur-3xl"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -left-4 lg:-left-12 top-10 bg-surface text-foreground rounded-2xl shadow-[var(--shadow-card)] p-4 max-w-[200px]"
              >
                <div className="flex items-center gap-2 text-xs text-foreground-muted mb-2">
                  <MapPin className="size-3.5 text-brand-olive" />
                  Gdynia · Bytomska 14
                </div>
                <div className="text-sm font-semibold text-foreground leading-snug">
                  Biuro przy Skwerze, w sercu miasta
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.75 }}
                className="absolute -right-4 lg:-right-8 bottom-10 bg-brand-lime text-brand-forest-deep rounded-2xl shadow-[var(--shadow-lime)] p-4 max-w-[200px]"
              >
                <div className="text-xs font-medium mb-1 opacity-70 uppercase tracking-wider">
                  Średni czas sprzedaży
                </div>
                <div className="font-bold leading-tight">
                  <span className="text-2xl tabular-nums">6 tygodni</span>
                  <span className="block text-xs font-medium opacity-70 mt-0.5">
                    rynek wtórny, ostatnie 12 miesięcy
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
