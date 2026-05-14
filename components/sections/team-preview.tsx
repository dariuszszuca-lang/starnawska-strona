"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getAllMembersSorted } from "@/lib/team";

export function TeamPreview() {
  const team = getAllMembersSorted();

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <Container size="wide">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
              Nasz zespół
            </p>
            <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-foreground">
              Zespół, który zna Trójmiasto na pamięć.
            </h2>
            <p className="mt-5 text-lg text-foreground-muted leading-relaxed max-w-xl">
              Każda z nas zajmuje się innym kawałkiem rynku.
              Sprzedaż mieszkań, najem długoterminowy, rynek pierwotny, grunty.
              Wybierz osobę, której styl Ci pasuje.
            </p>
          </div>
          <Button asChild variant="outline" size="md">
            <Link href="/zespol">
              Poznaj cały zespół
              <ArrowUpRight />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {team.slice(0, 8).map((m, i) => (
            <motion.div
              key={m.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={`/zespol/${m.slug}`}
                className="group block relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100"
              >
                <Image
                  src={m.photo}
                  alt={m.fullName}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient overlay - mocniejszy na dole */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

                {/* Hover arrow */}
                <div className="absolute top-3 right-3 size-9 rounded-full bg-brand-lime backdrop-blur flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="size-4 text-brand-forest-deep" />
                </div>

                {/* Hover phone. Subtelny */}
                {m.phoneDisplay && (
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur text-[10px] font-semibold text-brand-forest-deep opacity-0 group-hover:opacity-100 transition-all tabular-nums">
                    <Phone className="size-3 text-brand-olive" />
                    {m.phoneDisplay}
                  </div>
                )}

                {/* Bottom: tylko imię i nazwisko */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-foreground-on-dark">
                  <h3 className="font-bold tracking-tight text-xl leading-tight transition-transform group-hover:-translate-y-0.5">
                    {m.firstName}
                    <br />
                    {m.lastName}
                  </h3>
                  {/* Animowany underline */}
                  <span className="block mt-2 h-px bg-brand-lime w-0 group-hover:w-12 transition-all duration-500" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
