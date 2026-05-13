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
    <section className="py-20 lg:py-28">
      <Container size="wide">
        <div className="relative overflow-hidden rounded-[40px] bg-surface-dark text-foreground-on-dark grain">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(163,199,51,0.15),transparent_50%),radial-gradient(circle_at_85%_30%,rgba(45,74,31,0.45),transparent_50%)]"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -left-32 size-[400px] rounded-full bg-brand-lime/8 blur-3xl"
          />

          <div className="relative grid lg:grid-cols-12 gap-10 lg:gap-16 items-center p-10 lg:p-16">
            <div className="lg:col-span-7 space-y-6">
              {/* NSL Badge */}
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/[0.06] border border-border-on-dark backdrop-blur">
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
                  <span className="text-[10px] uppercase tracking-[0.2em] text-foreground-on-dark-muted">
                    Sieć współpracy
                  </span>
                  <span className="text-sm font-semibold text-foreground-on-dark">
                    Nieruchomości Spod Lady
                  </span>
                </div>
              </div>

              <h2 className="font-bold tracking-tight text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05]">
                Nieruchomości, których
                <br />
                nigdzie <span className="text-gradient-lime">nie wystawiamy.</span>
              </h2>

              <p className="text-lg text-foreground-on-dark-muted leading-relaxed max-w-xl">
                Część naszych ofert nie trafia do portali ani na stronę. Powody są
                różne. Czasem sprzedający nie chce, żeby sąsiedzi wiedzieli. Czasem
                nieruchomość jest tak dobra, że nie musimy. Dostęp tylko po
                rozmowie z agentką.
              </p>

              <ul className="space-y-3">
                {[
                  "Mieszkania z najlepszych adresów w Sopocie i Gdyni Orłowie",
                  "Domy z prywatnym ogrodem, blisko morza",
                  "Nieruchomości komercyjne i inwestycyjne",
                  "Oferty przed publiczną premierą (1–4 tygodnie wcześniej)",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-foreground-on-dark"
                  >
                    <span className="mt-2 size-1.5 rounded-full bg-brand-lime shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button asChild variant="lime" size="lg">
                  <Link href="/konsultacja?intent=spod-lady">
                    Poproś o dostęp
                    <ArrowRight />
                  </Link>
                </Button>
                <span className="text-sm text-foreground-on-dark-muted">
                  Rozmowa 15 minut, bez zobowiązań.
                </span>
              </div>

              {/* Hasło NSL */}
              <p className="text-sm text-brand-lime/80 italic pt-4 border-t border-border-on-dark">
                Najlepsi współpracują.
              </p>
            </div>

            {/* Kafelki ofert — animowane */}
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
                        className="relative rounded-2xl bg-surface-dark-elevated border border-border-on-dark p-5 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] cursor-default"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-foreground-on-dark-muted mb-1">
                              {card.city}
                            </p>
                            <p className="font-bold text-2xl text-foreground-on-dark mb-1 tabular-nums">
                              {card.area}
                            </p>
                            <p className="text-sm text-brand-lime tabular-nums">
                              {card.price}
                            </p>
                          </div>
                          <div className="size-10 rounded-full bg-brand-lime/15 flex items-center justify-center shrink-0">
                            <Lock className="size-4 text-brand-lime" />
                          </div>
                        </div>
                        {/* Blurred overlay — udaje że szczegóły są ukryte */}
                        <div
                          aria-hidden
                          className="absolute right-0 bottom-0 left-1/3 h-12 bg-gradient-to-r from-transparent to-surface-dark-elevated"
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
