import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { QuickSearch } from "@/components/sections/quick-search";
import { FeaturedOffers } from "@/components/sections/featured-offers";
import { Partners } from "@/components/sections/partners";
import { ValueBento } from "@/components/sections/value-bento";
import { Services } from "@/components/sections/services";
import { OffMarket } from "@/components/sections/off-market";
import { CaseStudies } from "@/components/sections/case-studies";
import { Motto } from "@/components/sections/motto";
import { TeamPreview } from "@/components/sections/team-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { ConsultationBox } from "@/components/sections/consultation-box";
import { Reveal } from "@/components/motion/reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Biuro nieruchomości w Gdyni Orłowo — Trójmiasto i okolice od 2011",
  description:
    "Lokalne biuro nieruchomości w Gdyni Orłowie. Sprzedaż, wynajem, kredyty hipoteczne. Trójmiasto i okolice — Gdynia, Sopot, Gdańsk, Rumia, Reda, Wejherowo.",
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
        <Motto />
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
