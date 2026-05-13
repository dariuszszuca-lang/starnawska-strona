import Link from "next/link";
import { Home, KeyRound, Calculator, Sparkles, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";

const services = [
  {
    icon: Home,
    title: "Sprzedaż nieruchomości",
    body: "Przygotowujemy ofertę, prowadzimy sprzedaż od pierwszego ogłoszenia aż po akt notarialny.",
    href: "/doradztwo#sprzedaz",
  },
  {
    icon: KeyRound,
    title: "Wynajem długoterminowy",
    body: "Znajdujemy najemców, weryfikujemy, opiekujemy się umową. Dla właścicieli i poszukujących.",
    href: "/doradztwo#wynajem",
  },
  {
    icon: Calculator,
    title: "Doradztwo kredytowe",
    body: "Pomagamy zorientować się ile mieszkania możesz kupić. Negocjujemy warunki z bankami.",
    href: "/doradztwo#kredyt",
  },
  {
    icon: Sparkles,
    title: "Home staging i sesje",
    body: "Profesjonalne zdjęcia, plany, lekka aranżacja. Twoja oferta zauważalna w pierwszej minucie.",
    href: "/doradztwo#staging",
  },
];

export function Services() {
  return (
    <section className="py-20 lg:py-28">
      <Container size="wide">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
            Co możemy dla Ciebie zrobić
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-foreground">
            Cztery sposoby,
            <br />
            <span className="text-foreground-muted italic">w jakie pomagamy.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.href}
                href={s.href}
                className="group relative overflow-hidden rounded-3xl bg-surface border border-border p-8 lg:p-10 transition-all hover:border-brand-forest hover:shadow-[var(--shadow-card)] hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-5">
                  <div className="size-14 shrink-0 rounded-2xl bg-gray-100 group-hover:bg-brand-lime/15 flex items-center justify-center text-brand-forest group-hover:text-brand-olive transition-colors">
                    <Icon className="size-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl mb-2 text-foreground">{s.title}</h3>
                    <p className="text-foreground-muted leading-relaxed">{s.body}</p>
                  </div>
                  <ArrowRight className="size-5 text-foreground-subtle group-hover:text-brand-forest group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
