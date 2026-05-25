import { Quote } from "lucide-react";
import { Container } from "@/components/ui/container";

export function Motto() {
  return (
    <section className="py-24 lg:py-32 bg-surface border-y border-border">
      <Container size="wide">
        <div className="max-w-4xl mx-auto text-center">
          <Quote
            aria-hidden
            className="size-10 lg:size-12 text-brand-lime mx-auto mb-8"
            strokeWidth={1.5}
          />
          <blockquote className="font-bold tracking-tight text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.15] text-foreground">
            Ambasadorami naszej marki są nasi klienci.
          </blockquote>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-brand-olive">
            Klient naszym ambasadorem
          </p>
        </div>
      </Container>
    </section>
  );
}
