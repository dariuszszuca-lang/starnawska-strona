import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUpRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { getAllMembersSorted, getOwners, getAgents } from "@/lib/team";

export const metadata: Metadata = {
  title: "Nasz zespół — agentki nieruchomości w Gdyni",
  description:
    "Poznaj zespół Starnawska & Boleńska Nieruchomości. 9 ekspertek z Trójmiasta. Każda specjalizuje się w innym segmencie rynku.",
};

export default function TeamPage() {
  const owners = getOwners();
  const agents = getAgents();
  const all = getAllMembersSorted();

  return (
    <>
      {/* Hero strony */}
      <section className="pt-12 lg:pt-20 pb-12">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
              Nasz zespół
            </p>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-foreground">
              {all.length} kobiet.
              <br />
              <span className="text-foreground-muted italic">Jeden zespół.</span>
            </h1>
            <p className="mt-6 text-lg text-foreground-muted leading-relaxed max-w-2xl">
              Każda z nas specjalizuje się w innym segmencie rynku. Wybierz osobę, której
              styl pracy najlepiej Ci pasuje. Albo zacznij od dowolnej, my przekierujemy
              Cię tam, gdzie trzeba.
            </p>
          </div>
        </Container>
      </section>

      {/* Właścicielki */}
      <section className="py-12">
        <Container size="wide">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-6">
            Założycielki
          </h2>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {owners.map((m) => (
              <TeamCard key={m.slug} member={m} large />
            ))}
          </div>
        </Container>
      </section>

      {/* Pośredniczki */}
      <section className="py-12">
        <Container size="wide">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-6">
            Pośredniczki nieruchomości
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((m) => (
              <TeamCard key={m.slug} member={m} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function TeamCard({
  member,
  large = false,
}: {
  member: ReturnType<typeof getAllMembersSorted>[number];
  large?: boolean;
}) {
  return (
    <Link
      href={`/zespol/${member.slug}`}
      className="group block rounded-3xl overflow-hidden bg-surface border border-border hover:border-brand-forest hover:shadow-[var(--shadow-card)] hover:-translate-y-0.5 transition-all"
    >
      <div className={`relative ${large ? "aspect-[4/3]" : "aspect-[3/4]"} bg-gray-100 overflow-hidden`}>
        <Image
          src={member.photo}
          alt={`${member.fullName}, ${member.role.toLowerCase()}`}
          fill
          sizes={large ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {member.isOwner && (
          <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full bg-brand-lime text-[10px] font-semibold uppercase tracking-wider text-brand-forest-deep">
            Współwłaścicielka
          </span>
        )}
      </div>
      <div className="p-6 lg:p-7">
        <h3 className="font-display text-2xl leading-tight tracking-tight text-foreground mb-1">
          {member.fullName}
        </h3>
        <p className="text-sm text-foreground-muted mb-4">{member.role}</p>
        {member.phoneDisplay && (
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 text-sm text-foreground-muted">
              <Phone className="size-3.5 text-brand-olive" />
              {member.phoneDisplay}
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-forest group-hover:gap-2 transition-all">
              Wizytówka
              <ArrowUpRight className="size-4" />
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
