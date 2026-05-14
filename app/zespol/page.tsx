import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUpRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { getAllMembersSorted } from "@/lib/team";

export const metadata: Metadata = {
  title: "Nasz zespół. Agentki nieruchomości w Gdyni",
  description:
    "Poznaj zespół Starnawska & Boleńska Nieruchomości. 9 ekspertek z Trójmiasta. Każda specjalizuje się w innym segmencie rynku.",
};

export default function TeamPage() {
  const all = getAllMembersSorted();

  return (
    <>
      {/* Hero strony */}
      <section className="pt-32 lg:pt-36 pb-12">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
              Nasz zespół
            </p>
            <h1 className="font-bold tracking-tight text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-foreground">
              {all.length} kobiet.
              <br />
              <span className="text-foreground-muted">Jeden zespół.</span>
            </h1>
            <p className="mt-6 text-lg text-foreground-muted leading-relaxed max-w-2xl">
              Każda z nas specjalizuje się w innym segmencie rynku. Wybierz osobę, której
              styl pracy najlepiej Ci pasuje. Albo zacznij od dowolnej, my przekierujemy
              Cię tam, gdzie trzeba.
            </p>
          </div>
        </Container>
      </section>

      {/* Cały zespół. Jeden grid */}
      <section className="py-12 pb-24">
        <Container size="wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {all.map((m) => (
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
}: {
  member: ReturnType<typeof getAllMembersSorted>[number];
}) {
  return (
    <Link
      href={`/zespol/${member.slug}`}
      className="group block rounded-3xl overflow-hidden bg-surface border border-border hover:border-brand-forest hover:shadow-[var(--shadow-card)] hover:-translate-y-1 transition-all"
    >
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
        <Image
          src={member.photo}
          alt={member.fullName}
          fill
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Hover arrow */}
        <div className="absolute top-4 right-4 size-10 rounded-full bg-brand-lime flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight className="size-4 text-brand-forest-deep" />
        </div>
      </div>
      <div className="p-6 lg:p-7">
        <h3 className="font-bold tracking-tight text-2xl leading-tight text-foreground mb-4">
          {member.fullName}
        </h3>
        {member.phoneDisplay && (
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground tabular-nums">
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
