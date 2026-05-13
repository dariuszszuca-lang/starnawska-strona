import type { Metadata } from "next";
import { Phone, Clock, MessageCircle, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { siteConfig } from "@/lib/site";
import { getMemberBySlug } from "@/lib/team";

export const metadata: Metadata = {
  title: "Umów konsultację — 30 minut bez zobowiązań",
  description:
    "Skontaktuj się z nami w sprawie sprzedaży, kupna, wynajmu lub doradztwa. Odpowiadamy w ciągu jednego dnia roboczego.",
};

type SearchParams = Promise<{ agentka?: string }>;

export default async function KonsultacjaPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { agentka } = await searchParams;
  const selectedAgent = agentka ? getMemberBySlug(agentka) : null;

  return (
    <>
      <section className="pt-32 lg:pt-36 pb-8">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
              Konsultacja
            </p>
            <h1 className="font-bold tracking-tight text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-foreground">
              Zacznijmy
              <br />
              <span className="text-foreground-muted">od rozmowy.</span>
            </h1>
            <p className="mt-6 text-lg text-foreground-muted leading-relaxed max-w-2xl">
              30 minut, bez zobowiązań. Napisz co Cię sprowadza, zadzwonimy lub
              odpiszemy w ciągu jednego dnia roboczego.
              {selectedAgent && (
                <>
                  {" "}Twoje zgłoszenie skierujemy bezpośrednio do{" "}
                  <strong>{selectedAgent.fullName}</strong>.
                </>
              )}
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container size="wide">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <ConsultationForm agentka={agentka} />
            </div>

            <aside className="lg:col-span-5 space-y-6">
              <article className="rounded-3xl bg-surface-dark text-foreground-on-dark p-7 lg:p-9">
                <p className="text-xs uppercase tracking-wider text-brand-lime font-semibold mb-3">
                  Wolisz telefon
                </p>
                <p className="font-bold tracking-tight text-4xl tracking-tight mb-2 tabular-nums">
                  {siteConfig.contact.phones[0].displayValue}
                </p>
                <p className="text-sm text-foreground-on-dark-muted leading-relaxed">
                  Biuro odbiera w godzinach pracy. Po godzinach zostaw wiadomość
                  na poczcie głosowej lub wyślij SMS.
                </p>
              </article>

              <ul className="space-y-3">
                <Info
                  icon={Clock}
                  title="Odpowiadamy w 24h"
                  body="Każde zgłoszenie obsługujemy w ciągu jednego dnia roboczego."
                />
                <Info
                  icon={MessageCircle}
                  title="30 minut rozmowy"
                  body="Pierwsze spotkanie jest bezpłatne i nie zobowiązuje do współpracy."
                />
                <Info
                  icon={ShieldCheck}
                  title="Twoje dane są bezpieczne"
                  body="Nie udostępniamy danych firmom trzecim. RODO jak się patrzy."
                />
                <Info
                  icon={Phone}
                  title="Drugi telefon"
                  body={siteConfig.contact.phones[1].displayValue}
                />
              </ul>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}

function Info({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <li className="flex items-start gap-4 p-5 rounded-2xl bg-surface border border-border">
      <span className="size-10 rounded-2xl bg-brand-lime/15 text-brand-olive flex items-center justify-center shrink-0">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="font-medium text-foreground leading-tight">{title}</p>
        <p className="text-sm text-foreground-muted mt-0.5 leading-relaxed">{body}</p>
      </div>
    </li>
  );
}
