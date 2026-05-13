"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Home, Building2, TreePine, Key, Hash, SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const types = [
  { value: "mieszkanie", label: "Mieszkanie", icon: Home },
  { value: "dom", label: "Dom", icon: Building2 },
  { value: "dzialka", label: "Działka", icon: TreePine },
  { value: "lokal", label: "Lokal", icon: Building2 },
  { value: "najem", label: "Wynajem", icon: Key },
] as const;

type TypeValue = typeof types[number]["value"];

const cityOptions = [
  "Gdynia",
  "Sopot",
  "Gdańsk",
  "Rumia",
  "Reda",
  "Wejherowo",
  "Pruszcz Gdański",
];

const roomOptions = ["1", "2", "3", "4", "5+"];
const marketOptions = [
  { value: "wszystkie", label: "Wszystkie" },
  { value: "wtorny", label: "Wtórny" },
  { value: "pierwotny", label: "Pierwotny" },
];
const stateOptions = [
  "do wprowadzenia",
  "do odświeżenia",
  "do remontu",
  "deweloperski",
  "surowy",
];

export function QuickSearch() {
  const [type, setType] = useState<TypeValue>("mieszkanie");
  const [advanced, setAdvanced] = useState(false);

  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [market, setMarket] = useState("wszystkie");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [areaMin, setAreaMin] = useState("");
  const [areaMax, setAreaMax] = useState("");
  const [rooms, setRooms] = useState<string[]>([]);
  const [floorMin, setFloorMin] = useState("");
  const [floorMax, setFloorMax] = useState("");
  const [yearMin, setYearMin] = useState("");
  const [state, setState] = useState<string[]>([]);
  const [offerId, setOfferId] = useState("");

  const toggleArr = (arr: string[], v: string, set: (a: string[]) => void) =>
    arr.includes(v) ? set(arr.filter((x) => x !== v)) : set([...arr, v]);

  const params = new URLSearchParams();
  if (type === "najem") params.set("transakcja", "najem");
  else {
    params.set("transakcja", "sprzedaz");
    params.set("typ", type);
  }
  if (city) params.set("miasto", city);
  if (district) params.set("dzielnica", district);
  if (market && market !== "wszystkie") params.set("rynek", market);
  if (priceMin) params.set("cena_min", priceMin);
  if (priceMax) params.set("cena_max", priceMax);
  if (areaMin) params.set("metraz_min", areaMin);
  if (areaMax) params.set("metraz_max", areaMax);
  if (rooms.length) params.set("pokoje", rooms.join(","));
  if (floorMin) params.set("pietro_min", floorMin);
  if (floorMax) params.set("pietro_max", floorMax);
  if (yearMin) params.set("rok_min", yearMin);
  if (state.length) params.set("stan", state.join(","));
  if (offerId) params.set("id", offerId);

  const resetAll = () => {
    setCity("");
    setDistrict("");
    setMarket("wszystkie");
    setPriceMin("");
    setPriceMax("");
    setAreaMin("");
    setAreaMax("");
    setRooms([]);
    setFloorMin("");
    setFloorMax("");
    setYearMin("");
    setState([]);
    setOfferId("");
  };

  const activeCount =
    [city, district, priceMin, priceMax, areaMin, areaMax, floorMin, floorMax, yearMin, offerId]
      .filter(Boolean).length +
    rooms.length +
    state.length +
    (market !== "wszystkie" ? 1 : 0);

  return (
    <section className="relative -mt-12 lg:-mt-16 z-10">
      <Container size="default">
        <div className="rounded-3xl bg-surface border border-border shadow-[var(--shadow-card)] p-5 lg:p-7">
          {/* Type tabs */}
          <div className="flex flex-wrap gap-2 mb-5">
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

          {/* Quick row: location + price + button */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
            <FieldWrap label="Miasto" colSpan="md:col-span-3">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="form-select"
              >
                <option value="">Dowolne</option>
                {cityOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </FieldWrap>
            <FieldWrap label="Dzielnica / lokalizacja" colSpan="md:col-span-3">
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Np. Orłowo, Wzgórze, Letnica"
                className="form-input"
              />
            </FieldWrap>
            <FieldWrap label="Cena od (zł)" colSpan="md:col-span-2">
              <input
                type="number"
                inputMode="numeric"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                placeholder="0"
                className="form-input"
              />
            </FieldWrap>
            <FieldWrap label="Cena do (zł)" colSpan="md:col-span-2">
              <input
                type="number"
                inputMode="numeric"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                placeholder="bez limitu"
                className="form-input"
              />
            </FieldWrap>
            <div className="md:col-span-2 flex items-end">
              <Button asChild variant="lime" size="lg" className="w-full h-12">
                <Link href={`/oferty?${params.toString()}`}>
                  <Search />
                  Szukaj
                </Link>
              </Button>
            </div>
          </div>

          {/* Toggle advanced + counter + reset */}
          <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setAdvanced((v) => !v)}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-brand-forest transition-colors"
              aria-expanded={advanced}
            >
              <SlidersHorizontal className="size-4" />
              Więcej filtrów
              {activeCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-brand-lime text-brand-forest-deep text-[10px] font-bold tabular-nums">
                  {activeCount}
                </span>
              )}
              <ChevronDown
                className={cn(
                  "size-3.5 opacity-60 transition-transform",
                  advanced && "rotate-180"
                )}
              />
            </button>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground transition-colors"
              >
                <X className="size-3.5" />
                Wyczyść filtry
              </button>
            )}
          </div>

          {/* Advanced filters */}
          {advanced && (
            <div className="mt-5 pt-5 border-t border-border space-y-5">
              {/* Rynek */}
              <div>
                <p className="text-xs font-medium text-foreground-muted mb-2">Rynek</p>
                <div className="flex flex-wrap gap-2">
                  {marketOptions.map((m) => (
                    <Pill
                      key={m.value}
                      active={market === m.value}
                      onClick={() => setMarket(m.value)}
                    >
                      {m.label}
                    </Pill>
                  ))}
                </div>
              </div>

              {/* Pokoje */}
              {type !== "dzialka" && (
                <div>
                  <p className="text-xs font-medium text-foreground-muted mb-2">
                    Liczba pokoi
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {roomOptions.map((r) => (
                      <Pill
                        key={r}
                        active={rooms.includes(r)}
                        onClick={() => toggleArr(rooms, r, setRooms)}
                      >
                        {r}
                      </Pill>
                    ))}
                  </div>
                </div>
              )}

              {/* Metraż */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
                <FieldWrap label="Metraż od (m²)" colSpan="md:col-span-3">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={areaMin}
                    onChange={(e) => setAreaMin(e.target.value)}
                    placeholder="0"
                    className="form-input"
                  />
                </FieldWrap>
                <FieldWrap label="Metraż do (m²)" colSpan="md:col-span-3">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={areaMax}
                    onChange={(e) => setAreaMax(e.target.value)}
                    placeholder="bez limitu"
                    className="form-input"
                  />
                </FieldWrap>
                {type === "mieszkanie" && (
                  <>
                    <FieldWrap label="Piętro od" colSpan="md:col-span-2">
                      <input
                        type="number"
                        inputMode="numeric"
                        value={floorMin}
                        onChange={(e) => setFloorMin(e.target.value)}
                        placeholder="0"
                        className="form-input"
                      />
                    </FieldWrap>
                    <FieldWrap label="Piętro do" colSpan="md:col-span-2">
                      <input
                        type="number"
                        inputMode="numeric"
                        value={floorMax}
                        onChange={(e) => setFloorMax(e.target.value)}
                        placeholder="bez limitu"
                        className="form-input"
                      />
                    </FieldWrap>
                  </>
                )}
                <FieldWrap label="Rok bud. od" colSpan="md:col-span-2">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={yearMin}
                    onChange={(e) => setYearMin(e.target.value)}
                    placeholder="np. 2010"
                    className="form-input"
                  />
                </FieldWrap>
              </div>

              {/* Stan */}
              {type !== "dzialka" && type !== "najem" && (
                <div>
                  <p className="text-xs font-medium text-foreground-muted mb-2">Stan</p>
                  <div className="flex flex-wrap gap-2">
                    {stateOptions.map((s) => (
                      <Pill
                        key={s}
                        active={state.includes(s)}
                        onClick={() => toggleArr(state, s, setState)}
                      >
                        {s}
                      </Pill>
                    ))}
                  </div>
                </div>
              )}

              {/* Offer ID */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-end pt-2 border-t border-border">
                <FieldWrap label="Znasz numer oferty?" colSpan="md:col-span-4">
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-foreground-subtle" />
                    <input
                      type="text"
                      value={offerId}
                      onChange={(e) => setOfferId(e.target.value)}
                      placeholder="np. SB12345"
                      className="form-input pl-9"
                    />
                  </div>
                </FieldWrap>
                <p className="md:col-span-8 text-xs text-foreground-subtle pb-3">
                  Podaj numer oferty, jeśli widziałeś ją gdzieś indziej i chcesz przejść
                  od razu do szczegółów.
                </p>
              </div>
            </div>
          )}

          <p className="text-xs text-foreground-subtle mt-4 leading-relaxed">
            Wyszukiwarka pobiera oferty bezpośrednio z naszego systemu CRM (EstiCRM).
            Aktualizujemy co godzinę. Wszystkie ceny są aktualne.
          </p>
        </div>
      </Container>

      <style>{`
        .form-input,
        .form-select {
          width: 100%;
          height: 3rem;
          padding: 0 1rem;
          border-radius: 0.75rem;
          background: var(--gray-50);
          border: 1px solid var(--border);
          color: var(--foreground);
          font-size: 0.9rem;
          outline: none;
          transition: all 0.15s ease;
          appearance: none;
          -webkit-appearance: none;
        }
        .form-input::placeholder { color: var(--foreground-subtle); }
        .form-input:focus,
        .form-select:focus {
          background: var(--surface);
          border-color: var(--brand-forest);
          box-shadow: 0 0 0 3px rgba(163, 199, 51, 0.22);
        }
        .form-select {
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23737373' stroke-width='2'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='m6 9 6 6 6-6'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 16px;
          padding-right: 36px;
        }
      `}</style>
    </section>
  );
}

function FieldWrap({
  label,
  colSpan,
  children,
}: {
  label: string;
  colSpan?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", colSpan)}>
      <span className="block text-xs font-medium text-foreground-muted mb-1.5 px-1">
        {label}
      </span>
      {children}
    </label>
  );
}

function Pill({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-4 py-1.5 rounded-full text-xs font-medium border transition-all",
        active
          ? "bg-brand-forest text-foreground-on-dark border-brand-forest"
          : "bg-transparent text-foreground border-border hover:border-brand-forest"
      )}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
