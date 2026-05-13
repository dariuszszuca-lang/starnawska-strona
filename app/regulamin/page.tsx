import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/coming-soon";

export const metadata: Metadata = {
  title: "Regulamin",
  description: "Dokument w przygotowaniu.",
};

export default function Page() {
  return (
    <ComingSoon
      title="Regulamin"
      description="Dokument w przygotowaniu."
    />
  );
}
