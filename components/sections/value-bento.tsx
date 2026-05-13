import { ShieldCheck, MapPin, Users, Camera, Calculator, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";

type Value = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  /** Tailwind classes — pozwala robić bento (różne wielkości) */
  span: string;
  tone?: "default" | "dark" | "lime";
};

const values: Value[] = [
  {
    icon: MapPin,
    title: "Tylko Trójmiasto",
    body: "Znamy każdą dzielnicę Gdyni, Sopotu i Gdańska. Nie sprzedajemy w ciemno.",
    span: "md:col-span-2 md:row-span-2",
    tone: "dark",
  },
  {
    icon: Users,
    title: "Zespół 9 kobiet",
    body: "Każda specjalizuje się w innym segmencie rynku.",
    span: "md:col-span-2",
  },
  {
    icon: ShieldCheck,
    title: "Transparentna umowa",
    body: "Bez ukrytych prowizji. Wszystko spisane od pierwszego spotkania.",
    span: "md:col-span-2",
  },
  {
    icon: Camera,
    title: "Profesjonalne sesje",
    body: "Fotografia, home staging, plany 2D. Twoja nieruchomość wygląda jak z magazynu.",
    span: "md:col-span-2",
    tone: "lime",
  },
  {
    icon: Calculator,
    title: "Doradztwo kredytowe",
    body: "Współpracujemy z bankami i pośrednikami. Pomagamy załatwić kredyt równolegle.",
    span: "md:col-span-2",
  },
  {
    icon: Sparkles,
    title: "Rynek pierwotny",
    body: "Bezpośrednio z deweloperami. Lepsze warunki, czasem ceny niedostępne publicznie.",
    span: "md:col-span-2",
  },
];

export function ValueBento() {
  return (
    <section className="py-20 lg:py-28">
      <Container size="wide">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
            Dlaczego my
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-foreground">
            Sześć powodów, dla których
            <br />
            <span className="text-foreground-muted italic">wybierają nas klienci.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 auto-rows-[180px]">
          {values.map((v, i) => {
            const Icon = v.icon;
            const toneClasses =
              v.tone === "dark"
                ? "bg-surface-dark text-foreground-on-dark"
                : v.tone === "lime"
                ? "bg-brand-lime text-brand-forest-deep"
                : "bg-surface text-foreground border border-border";

            return (
              <article
                key={i}
                className={`${v.span} ${toneClasses} rounded-3xl p-6 lg:p-8 flex flex-col justify-between transition-all hover:shadow-[var(--shadow-card)] hover:-translate-y-1 group`}
              >
                <div
                  className={`size-12 rounded-2xl flex items-center justify-center ${
                    v.tone === "dark"
                      ? "bg-brand-lime/15 text-brand-lime"
                      : v.tone === "lime"
                      ? "bg-brand-forest-deep/10 text-brand-forest-deep"
                      : "bg-gray-100 text-brand-forest group-hover:bg-brand-lime/15 group-hover:text-brand-olive"
                  } transition-colors`}
                >
                  <Icon className="size-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg lg:text-xl leading-tight mb-2">
                    {v.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      v.tone === "dark"
                        ? "text-foreground-on-dark-muted"
                        : v.tone === "lime"
                        ? "text-brand-forest-deep/80"
                        : "text-foreground-muted"
                    }`}
                  >
                    {v.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
