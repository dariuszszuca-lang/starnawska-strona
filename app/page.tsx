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

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickSearch />
      <Partners />
      <ValueBento />
      <Services />
      <OffMarket />
      <TeamPreview />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
