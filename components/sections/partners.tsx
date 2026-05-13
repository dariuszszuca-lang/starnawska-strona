import { Container } from "@/components/ui/container";

const partners = [
  {
    name: "Polska Federacja Rynku Nieruchomości",
    short: "PFRN",
    description: "Członek federacji od 2014",
  },
  {
    name: "Stowarzyszenie Pośredników w Obrocie Nieruchomościami",
    short: "SPPON",
    description: "Pomorski oddział",
  },
  {
    name: "RECAMP",
    short: "RECAMP",
    description: "Akademia Real Estate",
  },
  {
    name: "Polska Federacja Zarządców Nieruchomości",
    short: "PFZN",
    description: "Standardy zarządzania",
  },
];

export function Partners() {
  return (
    <section className="py-16 lg:py-20 border-y border-border bg-surface">
      <Container size="wide">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <p className="text-sm text-foreground-muted max-w-md">
            <span className="font-semibold text-foreground">
              Pracujemy z zachowaniem standardów branżowych.
            </span>{" "}
            Jesteśmy członkami stowarzyszeń zrzeszających pośredników w obrocie
            nieruchomościami.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 lg:gap-x-12">
            {partners.map((p) => (
              <div
                key={p.short}
                className="text-center lg:text-left group"
                title={p.name}
              >
                <div className="font-display text-2xl lg:text-3xl tracking-tight text-foreground-muted group-hover:text-brand-forest transition-colors mb-1">
                  {p.short}
                </div>
                <div className="text-xs text-foreground-subtle leading-tight">
                  {p.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
