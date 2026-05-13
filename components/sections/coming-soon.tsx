import Link from "next/link";
import { Hammer, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function ComingSoon({
  title,
  description,
  backHref = "/",
  backLabel = "Strona główna",
}: {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <section className="py-24 lg:py-32 min-h-[60vh] flex items-center">
      <Container size="default">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-lime/15 text-brand-forest-deep text-xs font-semibold uppercase tracking-wider mb-6">
            <Hammer className="size-3.5" />
            Sekcja w przygotowaniu
          </div>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight tracking-tight text-foreground mb-6">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-foreground-muted leading-relaxed mb-10">
              {description}
            </p>
          )}
          <Button asChild variant="outline" size="md">
            <Link href={backHref}>
              <ArrowLeft />
              {backLabel}
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
