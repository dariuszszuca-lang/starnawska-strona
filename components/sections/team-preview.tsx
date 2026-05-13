import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
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
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-foreground">
              {team.length} kobiet, jedna misja.
              <br />
              <span className="text-foreground-muted italic">
                Pomóc Ci znaleźć dom.
              </span>
            </h2>
          </div>
          <Button asChild variant="outline" size="md">
            <Link href="/zespol">
              Poznaj cały zespół
              <ArrowUpRight />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {team.slice(0, 8).map((m) => (
            <Link
              key={m.slug}
              href={`/zespol/${m.slug}`}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100"
            >
              <Image
                src={m.photo}
                alt={`${m.fullName}, ${m.role.toLowerCase()}`}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Owner badge */}
              {m.isOwner && (
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-lime/95 backdrop-blur text-[10px] font-semibold uppercase tracking-wider text-brand-forest-deep">
                  Właścicielka
                </span>
              )}

              {/* Hover arrow */}
              <div className="absolute top-3 right-3 size-9 rounded-full bg-white/95 backdrop-blur flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <ArrowUpRight className="size-4 text-foreground" />
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-foreground-on-dark">
                <p className="text-xs uppercase tracking-wider text-brand-lime mb-1.5 font-medium">
                  {m.shortRole ?? m.role.split(",")[0]}
                </p>
                <h3 className="font-display text-xl leading-tight tracking-tight">
                  {m.firstName}
                  <br />
                  {m.lastName}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
