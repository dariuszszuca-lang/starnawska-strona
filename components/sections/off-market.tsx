"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const cards = [
  { area: "85 m²", city: "Sopot, Dolny", price: "2 580 000 zł", rot: -2 },
  { area: "120 m²", city: "Gdynia, Orłowo", price: "1 990 000 zł", rot: 1.5 },
  { area: "210 m²", city: "Gdańsk, Oliwa", price: "2 850 000 zł", rot: -1 },
];

export function OffMarket() {
  return (
    <section className="py-16 lg:py-20">
      <Container size="wide">
        <div className="relative overflow-hidden rounded-[40px] bg-surface border border-border text-foreground shadow-[var(--shadow-soft)]">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(163,199,51,0.16),transparent_55%),radial-gradient(circle_at_85%_30%,rgba(163,199,51,0.08),transparent_55%)]"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -left-32 size-[400px] rounded-full bg-brand-lime/10 blur-3xl"
          />

          <div className="relative grid lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 lg:p-12">
            <div className="lg:col-span-7 space-y-5">
              {/* NSL Badge */}
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-background border border-border">
                <div className="bg-white rounded-lg p-1.5 flex items-center">
                  <Image
                    src="/partners/nsl-logo.png"
                    alt="Nieruchomości Spod Lady"
                    width={72}
                    height={48}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-foreground-muted">
                    Sieć współpracy
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    Nieruchomości Spod Lady
                  </span>
                </div>
              </div>

              <h2 className="font-bold tracking-tight text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1]">
                Nieruchomości, których nigdzie{" "}
                <span className="text-brand-forest">nie znajdziesz.</span>
              </h2>

              <p className="text-base text-foreground-muted leading-relaxed max-w-xl">
                Część naszych ofert nie trafia do portali ani na stronę. Powody są
                różne. Czasem sprzedający nie chce, żeby sąsiedzi wiedzieli. Czasem
                nieruchomość jest tak dobra, że nie musimy. Dostęp tylko po
                rozmowie z agentką.
              </p>

              <ul className="space-y-2">
                {[
                  "Mieszkania z najlepszych adresów w Sopocie i Gdyni Orłowie",
                  "Domy z prywatnym ogrodem, blisko morza",
                  "Nieruchomości komercyjne i inwestycyjne",
                  "Oferty przed publiczną premierą (1-4 tygodnie wcześniej)",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-foreground"
                  >
                    <span className="mt-2 size-1.5 rounded-full bg-brand-olive shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button asChild variant="lime" size="lg">
                  <a
                    href="https://nieruchomoscispodlady.pl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sieć Nieruchomości Spod Lady
                    <ArrowRight />
                  </a>
                </Button>
              </div>

              {/* Hasło NSL */}
              <p className="text-sm text-brand-olive italic pt-4 border-t border-border">
                Najlepsi współpracują.
              </p>
            </div>

            {/* Kafelki ofert. Animowane */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] max-w-sm mx-auto">
                <div className="absolute inset-0 flex flex-col justify-center gap-4">
                  {cards.map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 40, rotate: card.rot * 2 }}
                      whileInView={{ opacity: 1, x: 0, rotate: card.rot }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{
                        duration: 0.6,
                        delay: 0.15 + i * 0.12,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{
                        rotate: 0,
                        scale: 1.05,
                        y: -4,
                        transition: { type: "spring", stiffness: 300, damping: 22 },
                      }}
                    >
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          duration: 4 + i * 0.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.3,
                        }}
                        className="relative rounded-2xl bg-background border border-border p-5 overflow-hidden shadow-[var(--shadow-card)] cursor-default"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-foreground-muted mb-1">
                              {card.city}
                            </p>
                            <p className="font-bold text-2xl text-foreground mb-1 tabular-nums">
                              {card.area}
                            </p>
                            <p className="text-sm text-brand-olive font-semibold tabular-nums">
                              {card.price}
                            </p>
                          </div>
                          <div className="size-10 rounded-full bg-brand-lime/15 flex items-center justify-center shrink-0">
                            <Lock className="size-4 text-brand-olive" />
                          </div>
                        </div>
                        {/* Blurred overlay. Udaje że szczegóły są ukryte */}
                        <div
                          aria-hidden
                          className="absolute right-0 bottom-0 left-1/3 h-12 bg-gradient-to-r from-transparent to-background"
                        />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
