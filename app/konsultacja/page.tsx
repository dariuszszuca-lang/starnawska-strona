import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/coming-soon";

export const metadata: Metadata = {
  title: "Umów konsultację",
  description: "30 minut bez zobowiązań. Formularz konsultacyjny wkrótce.",
};

export default function Page() {
  return (
    <ComingSoon
      title="Umów konsultację"
      description="30 minut bez zobowiązań. Formularz konsultacyjny wkrótce."
    />
  );
}
