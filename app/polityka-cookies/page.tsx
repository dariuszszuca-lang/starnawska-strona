import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/coming-soon";

export const metadata: Metadata = {
  title: "Polityka cookies",
  description: "Dokument w przygotowaniu.",
};

export default function Page() {
  return (
    <ComingSoon
      title="Polityka cookies"
      description="Dokument w przygotowaniu."
    />
  );
}
