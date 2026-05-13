import { Container } from "@/components/ui/container";

const portals = [
  "Otodom",
  "Olx",
  "Morizon",
  "Domiporta",
  "Adresowo",
  "Trojmiasto.pl",
  "Sprzedajemy.pl",
  "Domy.pl",
  "Nieruchomości-online",
  "Gratka",
  "Oferty.net",
  "Gethome",
  "RynekPierwotny",
  "Tabelaofert",
  "Domplus",
];

export function Portals() {
  return (
    <section className="py-16 lg:py-20 bg-surface">
      <Container size="wide">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
            Zasięg publikacji
          </p>
          <h2 className="font-display text-3xl lg:text-4xl leading-tight tracking-tight text-foreground">
            Publikujemy w {portals.length}+ portalach.
            <br />
            <span className="text-foreground-muted italic">Twojej oferty nie da się przegapić.</span>
          </h2>
        </div>

        {/* Marquee infinite scroll */}
        <div className="relative overflow-hidden">
          <div
            aria-hidden
            className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface to-transparent z-10"
          />
          <div
            aria-hidden
            className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface to-transparent z-10"
          />

          <div className="flex gap-3 animate-[marquee_40s_linear_infinite]">
            {[...portals, ...portals].map((portal, i) => (
              <span
                key={`${portal}-${i}`}
                className="shrink-0 inline-flex items-center px-6 py-3 rounded-full bg-background border border-border text-foreground font-medium text-sm whitespace-nowrap"
              >
                {portal}
              </span>
            ))}
          </div>

          <style>{`
            @keyframes marquee {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            @media (prefers-reduced-motion: reduce) {
              .animate-\\[marquee_40s_linear_infinite\\] {
                animation: none;
              }
            }
          `}</style>
        </div>

        <p className="mt-6 text-sm text-foreground-muted">
          Plus własna baza pośredników: 200+ aktywnych biur w Trójmieście wymienia się
          ofertami przez nasz CRM.
        </p>
      </Container>
    </section>
  );
}
