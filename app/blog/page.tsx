import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/coming-soon";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artykuły o rynku nieruchomości w Trójmieście. Praktyczne porady dla kupujących i sprzedających.",
};

export default function Page() {
  return (
    <ComingSoon
      title="Blog"
      description="Artykuły o rynku nieruchomości w Trójmieście. Praktyczne porady dla kupujących i sprzedających."
    />
  );
}
