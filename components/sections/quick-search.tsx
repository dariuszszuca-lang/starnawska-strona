"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Home, Building2, TreePine, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const types = [
  { value: "mieszkanie", label: "Mieszkanie", icon: Home },
  { value: "dom", label: "Dom", icon: Building2 },
  { value: "dzialka", label: "Działka", icon: TreePine },
  { value: "najem", label: "Wynajem", icon: Key },
] as const;

export function QuickSearch() {
  const [type, setType] = useState<typeof types[number]["value"]>("mieszkanie");
  const [city, setCity] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const params = new URLSearchParams();
  if (type === "najem") {
    params.set("transakcja", "najem");
  } else {
    params.set("transakcja", "sprzedaz");
    params.set("typ", type);
  }
  if (city) params.set("miasto", city);
  if (priceMax) params.set("cena_max", priceMax);

  return (
    <section className="relative -mt-12 lg:-mt-16 z-10">
      <Container size="default">
        <div className="rounded-3xl bg-surface border border-border shadow-[var(--shadow-card)] p-6 lg:p-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {types.map((t) => {
              const Icon = t.icon;
              const active = type === t.value;
              return (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setType(t.value)}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border",
                    active
                      ? "bg-brand-forest text-foreground-on-dark border-brand-forest"
                      : "bg-transparent text-foreground-muted border-border hover:border-brand-forest hover:text-foreground"
                  )}
                  aria-pressed={active}
                >
                  <Icon className="size-4" />
                  {t.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <label className="md:col-span-5 group">
              <span className="block text-xs font-medium text-foreground-muted mb-1.5 px-1">
                Lokalizacja
              </span>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Gdynia, Sopot, Gdańsk…"
                className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-border focus:bg-surface focus:border-brand-forest focus:ring-2 focus:ring-brand-lime/30 outline-none transition-all text-foreground placeholder:text-foreground-subtle"
              />
            </label>
            <label className="md:col-span-4 group">
              <span className="block text-xs font-medium text-foreground-muted mb-1.5 px-1">
                Cena do (zł)
              </span>
              <input
                type="number"
                inputMode="numeric"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                placeholder="np. 800 000"
                className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-border focus:bg-surface focus:border-brand-forest focus:ring-2 focus:ring-brand-lime/30 outline-none transition-all text-foreground placeholder:text-foreground-subtle"
              />
            </label>
            <div className="md:col-span-3 flex items-end">
              <Button asChild variant="lime" size="lg" className="w-full h-12">
                <Link href={`/oferty?${params.toString()}`}>
                  <Search />
                  Szukaj
                </Link>
              </Button>
            </div>
          </div>

          <p className="text-xs text-foreground-subtle mt-4">
            Wyszukiwarka pobiera oferty bezpośrednio z naszego systemu CRM. Aktualizujemy
            co godzinę.
          </p>
        </div>
      </Container>
    </section>
  );
}
