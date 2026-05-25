"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Search, Home as HomeIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background grain">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(163,199,51,0.10),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(90,140,46,0.08),transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-brand-lime/[0.04] blur-[140px]"
      />

      <Container size="wide" className="relative pt-36 lg:pt-48 pb-16 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface text-xs font-medium text-foreground-muted"
        >
          <span className="size-1.5 rounded-full bg-brand-lime animate-pulse" />
          Gdynia Orłowo · od {siteConfig.foundedYear} roku · {siteConfig.metrics.transactions} transakcji
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-bold text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] tracking-[-0.03em] text-foreground max-w-3xl"
        >
          Twoje miejsce w Trójmieście. Znajdziemy je razem.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-2xl text-lg lg:text-xl text-foreground-muted leading-relaxed"
        >
          Sprzedaż, kupno i wynajem mieszkań, domów i działek. Trójmiasto i okolice. Wybierz, w czym możemy Ci pomóc.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 grid md:grid-cols-2 gap-5 max-w-4xl"
        >
          <Link
            href="/strefa-kupujacego"
            className="group relative overflow-hidden rounded-3xl bg-surface border border-border p-8 lg:p-10 transition-all hover:border-brand-lime hover:shadow-[var(--shadow-card)] hover:-translate-y-1"
          >
            <div className="size-14 rounded-2xl bg-brand-lime/15 flex items-center justify-center mb-6 group-hover:bg-brand-lime/25 transition-colors">
              <Search className="size-7 text-brand-forest-deep" strokeWidth={2.2} />
            </div>
            <div className="text-xs uppercase tracking-wider text-brand-olive font-semibold mb-2">
              Strefa kupującego
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
              Chcę kupić nieruchomość
            </div>
            <p className="mt-3 text-foreground-muted leading-relaxed">
              Reprezentujemy interes kupującego od pierwszej rozmowy aż po odbiór kluczy.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-brand-forest-deep font-semibold">
              Zobacz, jak pracujemy
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/strefa-sprzedajacego"
            className="group relative overflow-hidden rounded-3xl bg-surface border border-border p-8 lg:p-10 transition-all hover:border-brand-lime hover:shadow-[var(--shadow-card)] hover:-translate-y-1"
          >
            <div className="size-14 rounded-2xl bg-brand-lime/15 flex items-center justify-center mb-6 group-hover:bg-brand-lime/25 transition-colors">
              <HomeIcon className="size-7 text-brand-forest-deep" strokeWidth={2.2} />
            </div>
            <div className="text-xs uppercase tracking-wider text-brand-olive font-semibold mb-2">
              Strefa sprzedającego
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
              Chcę sprzedać nieruchomość
            </div>
            <p className="mt-3 text-foreground-muted leading-relaxed">
              Tworzymy przemyślane strategie sprzedaży. Skuteczność zaczyna się od dobrego przygotowania.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-brand-forest-deep font-semibold">
              Zobacz, jak pracujemy
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 grid grid-cols-3 gap-6 pt-8 border-t border-border max-w-2xl"
        >
          <div>
            <dt className="text-xs uppercase tracking-wider text-foreground-muted">Na rynku</dt>
            <dd className="text-2xl lg:text-3xl font-bold mt-1 text-foreground tabular-nums">
              {siteConfig.metrics.yearsActive} lat
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-foreground-muted">Sprzedanych</dt>
            <dd className="text-2xl lg:text-3xl font-bold mt-1 text-foreground tabular-nums">
              {siteConfig.metrics.transactions}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-foreground-muted">Ocena</dt>
            <dd className="text-2xl lg:text-3xl font-bold mt-1 text-foreground inline-flex items-baseline gap-1 tabular-nums">
              {siteConfig.metrics.rating}
              <span className="text-xs text-brand-lime">★</span>
            </dd>
          </div>
        </motion.dl>
      </Container>
    </section>
  );
}
