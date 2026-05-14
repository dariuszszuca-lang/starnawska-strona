"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { BuildingHouse } from "@/components/sections/building-house";
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

      <Container size="wide" className="relative pt-32 lg:pt-36 pb-20 lg:pb-28">
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
              className="font-bold text-[clamp(2rem,4.8vw,3.75rem)] leading-[1.05] tracking-[-0.035em]"
            >
              Najlepsze oferty
              <br />
              w Trójmieście.{" "}
              <span className="text-gradient-lime">Sprzedane</span>
              <br />
              zanim trafią do portali.
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

              {/* NSL Badge zamiast Zacznij od rozmowy */}
              <a
                href="https://nieruchomoscispodlady.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 pl-2 pr-4 h-14 rounded-full bg-white/[0.05] border border-border-on-dark hover:bg-white/[0.1] hover:border-brand-lime/40 transition-all"
              >
                <span className="shrink-0 bg-white rounded-full p-1.5 flex items-center">
                  <Image
                    src="/partners/nsl-logo.png"
                    alt="Nieruchomości Spod Lady"
                    width={48}
                    height={36}
                    className="h-7 w-auto object-contain"
                  />
                </span>
                <span className="leading-tight">
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-brand-lime font-semibold">
                    Sieć współpracy
                  </span>
                  <span className="block text-sm font-semibold text-foreground-on-dark">
                    Najlepsi współpracują.
                  </span>
                </span>
                <ArrowUpRight className="size-4 text-foreground-on-dark-muted group-hover:text-brand-lime group-hover:rotate-12 transition-all" />
              </a>
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
            className="hidden lg:block lg:col-span-5 relative"
          >
            <BuildingHouse />

            <motion.div
              initial={{ opacity: 0, x: -20, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -left-4 lg:-left-12 top-10 bg-surface text-foreground rounded-2xl shadow-[var(--shadow-card)] p-4 max-w-[200px] z-10"
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
              className="absolute -right-4 lg:-right-8 bottom-10 bg-brand-lime text-brand-forest-deep rounded-2xl shadow-[var(--shadow-lime)] p-4 max-w-[200px] z-10"
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
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
