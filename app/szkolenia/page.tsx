import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/coming-soon";

export const metadata: Metadata = {
  title: "Szkolenia",
  description: "Kursy i szkolenia z rynku nieruchomości. Wkrótce program i terminy.",
};

export default function Page() {
  return (
    <ComingSoon
      title="Szkolenia"
      description="Kursy i szkolenia z rynku nieruchomości. Wkrótce program i terminy."
    />
  );
}
