import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function OffMarket() {
  return (
    <section className="py-20 lg:py-28">
      <Container size="wide">
        <div className="relative overflow-hidden rounded-[40px] bg-surface-dark text-foreground-on-dark grain">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(163,199,51,0.15),transparent_50%),radial-gradient(circle_at_85%_30%,rgba(45,74,31,0.45),transparent_50%)]"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -left-32 size-[400px] rounded-full bg-brand-lime/8 blur-3xl"
          />

          <div className="relative grid lg:grid-cols-12 gap-10 lg:gap-16 items-center p-10 lg:p-16">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-on-dark bg-white/[0.03] text-xs font-medium text-foreground-on-dark-muted">
                <Lock className="size-3.5 text-brand-lime" />
                Oferty spod lady
              </div>

              <h2 className="font-bold tracking-tight text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-tight">
                Nieruchomości,
                <br />
                których nigdzie
                <br />
                <span className="text-gradient-lime">nie wystawiamy.</span>
              </h2>

              <p className="text-lg text-foreground-on-dark-muted leading-relaxed max-w-xl">
                Część naszych ofert nie trafia do portali ani na stronę. Powody
                są różne. Czasem sprzedający nie chce, żeby sąsiedzi wiedzieli.
                Czasem nieruchomość jest tak dobra, że nie musimy. Dostęp tylko
                po rozmowie z agentką.
              </p>

              <ul className="space-y-3">
                {[
                  "Mieszkania z najlepszych adresów w Sopocie i Gdyni Orłowie",
                  "Domy z prywatnym ogrodem, blisko morza",
                  "Nieruchomości komercyjne i inwestycyjne",
                  "Oferty przed publiczną premierą (1–4 tygodnie wcześniej)",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-foreground-on-dark"
                  >
                    <span className="mt-2 size-1.5 rounded-full bg-brand-lime shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button asChild variant="lime" size="lg">
                  <Link href="/konsultacja?intent=spod-lady">
                    Poproś o dostęp
                    <ArrowRight />
                  </Link>
                </Button>
                <span className="text-sm text-foreground-on-dark-muted">
                  Rozmowa 15 minut, bez zobowiązań.
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] max-w-sm mx-auto">
                {/* Trzy "zablokowane" karty ofert */}
                <div className="absolute inset-0 flex flex-col justify-center gap-4">
                  {[
                    { area: "85 m²", city: "Sopot, Dolny", price: "2 580 000 zł" },
                    { area: "120 m²", city: "Gdynia, Orłowo", price: "1 990 000 zł" },
                    { area: "210 m²", city: "Gdańsk, Oliwa", price: "2 850 000 zł" },
                  ].map((card, i) => (
                    <div
                      key={i}
                      className="relative rounded-2xl bg-surface-dark-elevated border border-border-on-dark p-5 overflow-hidden"
                      style={{
                        transform: `rotate(${i === 1 ? "-2deg" : i === 2 ? "1deg" : "-1deg"})`,
                      }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-foreground-on-dark-muted mb-1">
                            {card.city}
                          </p>
                          <p className="font-bold tracking-tight text-2xl text-foreground-on-dark mb-1 tabular-nums">
                            {card.area}
                          </p>
                          <p className="text-sm text-brand-lime tabular-nums">
                            {card.price}
                          </p>
                        </div>
                        <div className="size-10 rounded-full bg-brand-lime/15 flex items-center justify-center shrink-0">
                          <Lock className="size-4 text-brand-lime" />
                        </div>
                      </div>
                      {/* Blurred overlay - imitates hidden details */}
                      <div
                        aria-hidden
                        className="absolute right-0 bottom-0 left-1/3 h-12 bg-gradient-to-r from-transparent to-surface-dark-elevated"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
