import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";

const partners = [
  {
    name: "Polska Federacja Rynku Nieruchomości i SPPON",
    short: "PFRN · SPPON",
    description: "Pomorski oddział, od 2014",
    logo: "/partners/pfrn_sppon.jpg",
  },
  {
    name: "RECAMP — Akademia Real Estate",
    short: "RECAMP",
    description: "Akredytacja branżowa",
    logo: "/partners/recamp.jpg",
  },
  {
    name: "Wyłącznie Pomorskie",
    short: "Wyłącznie Pomorskie",
    description: "Lokalna sieć biur",
    logo: "/partners/pomorskie.png",
  },
];

export function Partners() {
  return (
    <section className="py-20 lg:py-28 border-y border-border bg-surface">
      <Container size="wide">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-lime/15 text-brand-forest-deep text-xs font-semibold uppercase tracking-wider mb-4">
              <ShieldCheck className="size-3.5" />
              Standardy branżowe
            </div>
            <h2 className="font-bold tracking-tight text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] text-foreground mb-4">
              Pracujemy zgodnie ze standardami stowarzyszeń branżowych.
            </h2>
            <p className="text-foreground-muted leading-relaxed">
              Członkostwo zobowiązuje. Każda umowa podlega kodeksowi etyki PFRN i SPPON,
              każda transakcja jest zabezpieczona ubezpieczeniem OC zawodowym.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
              {partners.map((p) => (
                <div
                  key={p.short}
                  className="group relative flex flex-col rounded-3xl bg-background border border-border p-5 lg:p-6 hover:border-brand-forest hover:shadow-[var(--shadow-card)] transition-all min-h-[240px]"
                  title={p.name}
                >
                  <div className="relative flex-1 flex items-center justify-center py-4">
                    <Image
                      src={p.logo}
                      alt={p.name}
                      width={240}
                      height={140}
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 80vw"
                      className="max-h-[100px] lg:max-h-[120px] w-auto object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                      {p.short}
                    </p>
                    <p className="text-xs text-foreground-muted mt-0.5">
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
