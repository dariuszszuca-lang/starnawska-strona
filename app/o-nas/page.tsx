import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/coming-soon";

export const metadata: Metadata = {
  title: "O nas",
  description: "Historia biura, wartości, sposób pracy. Pełna strona w przygotowaniu.",
};

export default function Page() {
  return (
    <ComingSoon
      title="O nas"
      description="Historia biura, wartości, sposób pracy. Pełna strona w przygotowaniu."
    />
  );
}
