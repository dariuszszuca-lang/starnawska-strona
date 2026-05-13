import { Hero } from "@/components/sections/hero";
import { QuickSearch } from "@/components/sections/quick-search";
import { Partners } from "@/components/sections/partners";
import { ValueBento } from "@/components/sections/value-bento";
import { Services } from "@/components/sections/services";
import { OffMarket } from "@/components/sections/off-market";
import { TeamPreview } from "@/components/sections/team-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { Reveal } from "@/components/motion/reveal";

export default function HomePage() {
  return (
    <>
      {/* Hero ma własną animację — bez Reveal */}
      <Hero />
      <QuickSearch />

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
        <TeamPreview />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <FAQ />
      </Reveal>
      <Reveal>
        <CTA />
      </Reveal>
    </>
  );
}
