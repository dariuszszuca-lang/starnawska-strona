import Link from "next/link";
import { ArrowRight, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Nie znaleziono strony",
  description: "Strona której szukasz nie istnieje albo została przeniesiona.",
};

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-surface-dark text-foreground-on-dark overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(163,199,51,0.15),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(45,74,31,0.4),transparent_60%)]"
      />
      <Container size="default" className="relative">
        <div className="max-w-2xl">
          <p className="font-mono text-sm text-brand-lime mb-6 tracking-wider">
            404 — strona nie znaleziona
          </p>
          <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[1] tracking-tight mb-6">
            Tu nic nie ma.
            <br />
            <span className="text-gradient-lime">Spróbuj inaczej.</span>
          </h1>
          <p className="text-lg text-foreground-on-dark-muted leading-relaxed mb-10 max-w-lg">
            Strona której szukasz mogła zostać przeniesiona albo nigdy nie istniała.
            Wróć do strony głównej albo przeglądaj oferty.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="lime" size="lg">
              <Link href="/">
                <Home />
                Strona główna
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline-dark" size="lg">
              <Link href="/oferty">
                <Search />
                Przeglądaj oferty
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
