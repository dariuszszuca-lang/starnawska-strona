import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/coming-soon";

export const metadata: Metadata = {
  title: "Wyszukiwarka ofert",
  description: "Pełna wyszukiwarka ofert pobiera dane bezpośrednio z naszego CRM ESTI. Aktualizacja co godzinę. Już niedługo.",
};

export default function Page() {
  return (
    <ComingSoon
      title="Wyszukiwarka ofert"
      description="Pełna wyszukiwarka ofert pobiera dane bezpośrednio z naszego CRM ESTI. Aktualizacja co godzinę. Już niedługo."
    />
  );
}
