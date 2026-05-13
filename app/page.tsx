import { Hero } from "@/components/sections/hero";
import { QuickSearch } from "@/components/sections/quick-search";
import { ValueBento } from "@/components/sections/value-bento";
import { Services } from "@/components/sections/services";
import { TeamPreview } from "@/components/sections/team-preview";
import { CTA } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickSearch />
      <ValueBento />
      <Services />
      <TeamPreview />
      <CTA />
    </>
  );
}
