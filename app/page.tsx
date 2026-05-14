import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { QuickSearch } from "@/components/sections/quick-search";
import { FeaturedOffers } from "@/components/sections/featured-offers";
import { Partners } from "@/components/sections/partners";
import { ValueBento } from "@/components/sections/value-bento";
import { Services } from "@/components/sections/services";
import { OffMarket } from "@/components/sections/off-market";
import { CaseStudies } from "@/components/sections/case-studies";
import { Portals } from "@/components/sections/portals";
import { TeamPreview } from "@/components/sections/team-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { ConsultationBox } from "@/components/sections/consultation-box";
import { Reveal } from "@/components/motion/reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Biuro nieruchomości w Gdyni od 2011 — Sprzedaż, wynajem, doradztwo",
  description:
    "Lokalne biuro nieruchomości w Gdyni: 7 doświadczonych agentek, kompleksowa sprzedaż, wynajem długoterminowy, doradztwo kredytowe i home staging. Trójmiasto.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero ma własną animację. Bez Reveal */}
      <Hero />
      <QuickSearch />

      <Reveal>
        <FeaturedOffers />
      </Reveal>
      <Reveal>
        <Partners />
      </Reveal>
      <Reveal>
        <ValueBento />
      </Reveal>
      <Reveal>
        <Services />
      </Reveal>
      <Reveal>
        <OffMarket />
      </Reveal>
      <Reveal>
        <CaseStudies />
      </Reveal>
      <Reveal>
        <Portals />
      </Reveal>
      <Reveal>
        <TeamPreview />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <FAQ />
      </Reveal>
      <Reveal>
        <ConsultationBox />
      </Reveal>
    </>
  );
}
