import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/coming-soon";

export const metadata: Metadata = {
  title: "Doradztwo i usługi",
  description: "Sprzedaż, wynajem, home staging, doradztwo kredytowe. Wkrótce kompletny opis każdej usługi.",
};

export default function Page() {
  return (
    <ComingSoon
      title="Doradztwo i usługi"
      description="Sprzedaż, wynajem, home staging, doradztwo kredytowe. Wkrótce kompletny opis każdej usługi."
    />
  );
}
