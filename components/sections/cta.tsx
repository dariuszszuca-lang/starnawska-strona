import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export function CTA() {
  return (
    <section className="py-20 lg:py-28">
      <Container size="wide">
        <div className="relative overflow-hidden rounded-[40px] bg-surface-dark text-foreground-on-dark p-10 lg:p-16 grain">
          {/* tło */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(163,199,51,0.18),transparent_55%)]"
          />
          <div
            aria-hidden
            className="absolute -right-32 -bottom-32 size-[400px] rounded-full bg-brand-lime/8 blur-3xl"
          />

          <div className="relative max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-lime mb-4">
              Pierwsza rozmowa bez zobowiązań
            </p>
            <h2 className="font-bold tracking-tight text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] tracking-tight mb-6">
              Sprzedajesz? Kupujesz?
              <br />
              <span className="text-gradient-lime">Zacznijmy od rozmowy.</span>
            </h2>
            <p className="text-lg text-foreground-on-dark-muted leading-relaxed mb-10 max-w-2xl">
              30 minut, bez presji. Powiedz czego potrzebujesz, my powiemy co realnie da się
              zrobić w Twojej sytuacji. Bez wciskania, bez pustych obietnic.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button asChild variant="lime" size="lg">
                <Link href="/konsultacja">
                  Umów konsultację
                  <ArrowRight />
                </Link>
              </Button>
              <a
                href={siteConfig.contact.phones[0].href}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-foreground-on-dark hover:text-brand-lime transition-colors group"
              >
                <span className="size-11 rounded-full border border-border-on-dark group-hover:border-brand-lime flex items-center justify-center transition-colors">
                  <Phone className="size-4" />
                </span>
                <span>
                  <span className="block text-xs text-foreground-on-dark-muted">
                    Albo zadzwoń teraz
                  </span>
                  <span className="block font-semibold tabular-nums">
                    {siteConfig.contact.phones[0].displayValue}
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
