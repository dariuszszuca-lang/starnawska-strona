import { ReactNode } from "react";
import { Container } from "@/components/ui/container";

export function LegalPage({
  title,
  lastUpdated,
  intro,
  children,
}: {
  title: string;
  lastUpdated: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="pt-12 lg:pt-20 pb-8">
        <Container size="default">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
            Dokumenty
          </p>
          <h1 className="font-bold tracking-tight text-[clamp(2rem,4.5vw,3.5rem)] leading-tight tracking-tight text-foreground mb-4">
            {title}
          </h1>
          <p className="text-sm text-foreground-muted">
            Ostatnia aktualizacja: {lastUpdated}
          </p>
          {intro && (
            <p className="mt-6 text-lg text-foreground-muted leading-relaxed max-w-2xl">
              {intro}
            </p>
          )}
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container size="default">
          <div className="legal-content max-w-3xl">{children}</div>
        </Container>
      </section>

      <style>{`
        .legal-content h2 {
          font-family: var(--font-bold tracking-tight);
          font-size: 1.75rem;
          line-height: 1.2;
          margin-top: 3rem;
          margin-bottom: 1rem;
          color: var(--foreground);
          letter-spacing: -0.02em;
        }
        .legal-content h3 {
          font-weight: 600;
          font-size: 1.125rem;
          margin-top: 2rem;
          margin-bottom: 0.5rem;
          color: var(--foreground);
        }
        .legal-content p {
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 1rem;
          color: var(--foreground);
        }
        .legal-content ul, .legal-content ol {
          margin: 1rem 0 1.5rem 1.5rem;
          color: var(--foreground);
        }
        .legal-content ul li {
          list-style: disc;
          margin-bottom: 0.5rem;
          line-height: 1.7;
        }
        .legal-content ol li {
          list-style: decimal;
          margin-bottom: 0.5rem;
          line-height: 1.7;
        }
        .legal-content strong {
          font-weight: 600;
        }
        .legal-content a {
          color: var(--brand-forest);
          text-decoration: underline;
        }
        .legal-content a:hover {
          color: var(--brand-olive);
        }
      `}</style>
    </>
  );
}
