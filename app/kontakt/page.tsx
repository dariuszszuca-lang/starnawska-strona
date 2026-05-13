import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/coming-soon";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Biuro w Gdyni, ul. Bytomska 14/1. Pełna strona kontaktowa z mapą wkrótce.",
};

export default function Page() {
  return (
    <ComingSoon
      title="Kontakt"
      description="Biuro w Gdyni, ul. Bytomska 14/1. Pełna strona kontaktowa z mapą wkrótce."
    />
  );
}
