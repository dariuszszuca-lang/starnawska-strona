"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface-dark text-foreground-on-dark grain">
      {/* Tło — gradient + delikatna mgła */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(163,199,51,0.18),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(45,74,31,0.4),transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-brand-lime/5 blur-[120px]"
      />

      <Container size="wide" className="relative pt-12 lg:pt-20 pb-20 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Lewa — tekst */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-on-dark bg-white/[0.03] text-xs font-medium text-foreground-on-dark-muted"
            >
              <span className="size-1.5 rounded-full bg-brand-lime animate-pulse" />
              Pomorskie biuro nieruchomości od {siteConfig.foundedYear}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight"
            >
              Twoje miejsce w
              <br />
              <span className="text-gradient-lime">Trójmieście</span> zaczyna się
              <br />
              <span className="text-foreground-on-dark-muted italic">rozmową.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl text-lg text-foreground-on-dark-muted leading-relaxed"
            >
              Pomagamy sprzedać, kupić i wynająć. Z lokalną wiedzą, sprawdzonymi
              procedurami i zespołem, który traktuje Twoją sprawę jak własną.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3"
            >
              <Button asChild variant="lime" size="lg">
                <Link href="/oferty">
                  Przeglądaj oferty
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline-dark" size="lg">
                <Link href="/konsultacja">Umów konsultację</Link>
              </Button>
            </motion.div>

            {/* Mini-stats */}
            <motion.dl
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-border-on-dark max-w-md"
            >
              <div>
                <dt className="text-xs uppercase tracking-wider text-foreground-on-dark-muted">
                  Lat na rynku
                </dt>
                <dd className="text-2xl font-semibold mt-1">
                  {siteConfig.metrics.yearsActive}+
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-foreground-on-dark-muted">
                  Transakcji
                </dt>
                <dd className="text-2xl font-semibold mt-1">
                  {siteConfig.metrics.transactions}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-foreground-on-dark-muted">
                  Ocena
                </dt>
                <dd className="text-2xl font-semibold mt-1 inline-flex items-baseline gap-1">
                  {siteConfig.metrics.rating}
                  <span className="text-xs text-brand-lime">★</span>
                </dd>
              </div>
            </motion.dl>
          </div>

          {/* Prawa — wizualizacja: logo + bento mini-cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-square max-w-[480px] mx-auto">
              {/* Glow */}
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-brand-lime/20 to-brand-forest/40 blur-2xl" />

              {/* Główna karta z logo */}
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
                  className="absolute -bottom-20 -right-20 size-64 rounded-full bg-brand-lime/10 blur-3xl"
                />
              </div>

              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -left-4 lg:-left-12 top-10 bg-surface text-foreground rounded-2xl shadow-[var(--shadow-card)] p-4 max-w-[200px]"
              >
                <div className="flex items-center gap-2 text-xs text-foreground-muted mb-2">
                  <MapPin className="size-3.5 text-brand-olive" />
                  Gdynia, Bytomska 14
                </div>
                <div className="text-sm font-medium text-foreground leading-snug">
                  Centrum miasta, blisko Skweru
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.75 }}
                className="absolute -right-4 lg:-right-8 bottom-10 bg-brand-lime text-brand-forest-deep rounded-2xl shadow-[var(--shadow-lime)] p-4 max-w-[180px]"
              >
                <div className="flex items-center gap-2 text-xs font-medium mb-2 opacity-70">
                  <Search className="size-3.5" />
                  Wyszukiwarka
                </div>
                <div className="text-sm font-semibold leading-snug">
                  Oferty na żywo z ESTI CRM
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
