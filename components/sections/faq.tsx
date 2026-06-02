"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Phone, MessageCircle, Plus, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type FAQItem = {
  q: string;
  a: string[]; // akapity — renderowane z odstępami
  cat: "Sprzedaż" | "Najem" | "Kredyt" | "Współpraca" | "Ogólne";
};

const faqs: FAQItem[] = [
  {
    cat: "Sprzedaż",
    q: "Ile kosztuje sprzedaż mieszkania przez biuro?",
    a: [
      "To zależy. Każdą usługę wyceniamy indywidualnie, po wcześniejszym zapoznaniu się z nieruchomością i rozmowie z klientem.",
      "Na ostateczną wycenę wpływają przede wszystkim sytuacja prawna nieruchomości, zakres prac jakie musimy podjąć oraz indywidualnie dobrany plan marketingowy.",
      "Dzięki współpracy z biurem klienci osiągają najkorzystniejsze warunki sprzedaży.",
    ],
  },
  {
    cat: "Sprzedaż",
    q: "Jak długo trwa sprzedaż mieszkania?",
    a: [
      "Na ostateczny czas transakcji wpływa wiele czynników, zarówno zewnętrznych (takich jak koniunktura gospodarcza czy dostępność kredytów hipotecznych), jak i tych, na które mamy bezpośredni wpływ.",
      "Mowa tu o właściwej wycenie, przygotowaniu nieruchomości (np. home stagingu) oraz dobrze przemyślanej komunikacji marketingowej.",
      "To właśnie działania podjęte jeszcze przed opublikowaniem ogłoszenia w dużej mierze decydują o tym, jak szybko znajdziesz kupca.",
    ],
  },
  {
    cat: "Współpraca",
    q: "Czy podpisujemy wyłączność?",
    a: [
      "Zdecydowanie tak. Podpisanie umowy na wyłączność z jednym pośrednikiem to najskuteczniejszy sposób na szybką i zyskowną sprzedaż nieruchomości. Wbrew pozorom, takie rozwiązanie nie ogranicza zasięgu oferty, lecz maksymalizuje jej potencjał.",
      "Agent pracujący na wyłączność angażuje 100% swoich sił i środków finansowych w promocję, ponieważ ma gwarancję wynagrodzenia za swój wysiłek. Nieruchomość zyskuje status oferty premium, co budzi większe zainteresowanie i zaufanie ze strony potencjalnych kupujących.",
      "Unika się dzięki temu chaosu, w którym to samo mieszkanie pojawia się w sieci wielokrotnie, z różnymi cenami i opisami, co zawsze budzi podejrzliwość klientów.",
      "Co więcej, pośrednik ma komfort czasowy, by profesjonalnie przygotować ofertę: home staging, profesjonalną sesję zdjęciową czy wirtualny spacer. Sprzedający zyskuje jednego, odpowiedzialnego partnera do kontaktu, który dba o jego interesy i filtruje rzetelnych kupujących.",
      "Taka relacja pozwala agentowi na twarde negocjacje cenowe w imieniu właściciela, bez obawy, że inna agencja podkradnie klienta, obniżając stawkę. W efekcie nieruchomość sprzedaje się średnio o kilkanaście procent szybciej i często za wyższą kwotę.",
      "To bezpieczna, przejrzysta i bezstresowa forma współpracy, która po prostu najbardziej się opłaca.",
    ],
  },
  {
    cat: "Najem",
    q: "Czy obsługujecie też wynajem?",
    a: [
      "Tak, prowadzimy wynajem długoterminowy zarówno dla właścicieli, jak i dla najemców.",
      "Weryfikujemy najemców (zaświadczenia o zatrudnieniu, referencje), przygotowujemy umowę najmu okazjonalnego lub instytucjonalnego, prowadzimy protokół zdawczo-odbiorczy.",
    ],
  },
  {
    cat: "Ogólne",
    q: "W jakich miastach pracujecie?",
    a: [
      "Trójmiasto i szeroko rozumiane okolice. Działamy wszędzie tam, gdzie jesteśmy ekspertami.",
    ],
  },
  {
    cat: "Kredyt",
    q: "Czy pomagacie z kredytem hipotecznym?",
    a: [
      "Tak. Współpracujemy z niezależnymi pośrednikami kredytowymi.",
      "Sprawdzamy Twoją zdolność kredytową bezpłatnie, porównujemy oferty banków i pomagamy w wyborze optymalnej oferty. Wspieramy w całym procesie, od skompletowania dokumentów do uruchomienia kredytu.",
    ],
  },
];

const categories = ["Wszystkie", "Sprzedaż", "Najem", "Kredyt", "Współpraca", "Ogólne"] as const;
type Category = typeof categories[number];

export function FAQ() {
  const [activeCat, setActiveCat] = useState<Category>("Wszystkie");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filtered = activeCat === "Wszystkie" ? faqs : faqs.filter((f) => f.cat === activeCat);

  // FAQPage schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") },
    })),
  };

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(163,199,51,0.08),transparent_55%)]"
      />

      <Container size="wide" className="relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEWA. Sticky panel */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-lime/15 text-brand-forest-deep text-xs font-semibold uppercase tracking-wider">
              <HelpCircle className="size-3.5" />
              Pytania klientów
            </div>

            <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-foreground">
              Pytania,
              <br />
              <span className="text-brand-forest">które słyszymy codziennie.</span>
            </h2>

            <p className="text-foreground-muted leading-relaxed">
              Sześć tematów, o które klienci pytają najczęściej. Filtruj po kategorii
              albo przejrzyj wszystko. Twojego pytania tu nie ma?
            </p>

            {/* Quick contact */}
            <div className="rounded-3xl bg-surface border border-border text-foreground p-6 relative overflow-hidden shadow-[var(--shadow-soft)]">
              <div
                aria-hidden
                className="absolute -top-12 -right-12 size-32 rounded-full bg-brand-lime/20 blur-2xl"
              />
              <div className="relative">
                <p className="text-xs uppercase tracking-wider text-brand-olive font-semibold mb-2">
                  Brak Twojego pytania?
                </p>
                <p className="text-lg font-semibold mb-4 leading-snug">
                  Zadzwoń lub napisz. Odpowiemy w 30 sekund.
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href={siteConfig.contact.phones[0].href}
                    className="inline-flex items-center gap-3 text-foreground hover:text-brand-forest transition-colors"
                  >
                    <span className="size-9 rounded-xl bg-brand-lime/15 flex items-center justify-center">
                      <Phone className="size-4 text-brand-olive" />
                    </span>
                    <span className="font-bold tabular-nums">
                      {siteConfig.contact.phones[0].displayValue}
                    </span>
                  </a>
                  <Link
                    href="/konsultacja"
                    className="inline-flex items-center gap-3 text-foreground hover:text-brand-forest transition-colors"
                  >
                    <span className="size-9 rounded-xl bg-brand-lime/15 flex items-center justify-center">
                      <MessageCircle className="size-4 text-brand-olive" />
                    </span>
                    <span className="font-medium text-sm">Formularz konsultacji</span>
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* PRAWA. Filtry + lista */}
          <div className="lg:col-span-8">
            {/* Filtry kategorii */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((c) => {
                const count =
                  c === "Wszystkie" ? faqs.length : faqs.filter((f) => f.cat === c).length;
                const active = activeCat === c;
                return (
                  <button
                    key={c}
                    onClick={() => {
                      setActiveCat(c);
                      setOpenIdx(null);
                    }}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all border",
                      active
                        ? "bg-foreground text-background border-foreground"
                        : "bg-surface text-foreground border-border hover:border-foreground"
                    )}
                  >
                    {c}
                    <span
                      className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded-full tabular-nums",
                        active ? "bg-background/15 text-background" : "bg-gray-100 text-foreground-muted"
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Lista FAQ */}
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((f, i) => {
                  const isOpen = openIdx === i;
                  return (
                    <motion.article
                      key={`${activeCat}-${f.q}`}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className={cn(
                        "rounded-3xl border overflow-hidden transition-all",
                        isOpen
                          ? "bg-surface border-brand-forest shadow-[var(--shadow-card)]"
                          : "bg-surface border-border hover:border-foreground-muted"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenIdx(isOpen ? null : i)}
                        className="w-full text-left p-6 lg:p-7 flex items-start justify-between gap-4"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-start gap-4 flex-1">
                          <span className="font-mono text-xs text-brand-olive font-bold tabular-nums mt-1.5 shrink-0">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="flex-1">
                            <span className="inline-block text-[10px] uppercase tracking-wider text-foreground-muted font-semibold mb-1.5">
                              {f.cat}
                            </span>
                            <h3 className="font-semibold text-lg lg:text-xl text-foreground leading-snug tracking-tight">
                              {f.q}
                            </h3>
                          </div>
                        </div>
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          className={cn(
                            "size-10 rounded-2xl shrink-0 flex items-center justify-center transition-colors",
                            isOpen
                              ? "bg-brand-lime text-brand-forest-deep"
                              : "bg-gray-100 text-foreground"
                          )}
                          aria-hidden
                        >
                          <Plus className="size-5" />
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div className="px-6 lg:px-7 pb-6 lg:pb-7 pl-[60px] lg:pl-[72px]">
                              <div className="border-t border-border pt-4 space-y-3.5">
                                {f.a.map((para, pi) => (
                                  <p key={pi} className="text-foreground leading-relaxed">
                                    {para}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* CTA pod listą */}
            <div className="mt-10 p-6 lg:p-7 rounded-3xl bg-gradient-to-br from-brand-lime/15 to-brand-forest/5 border border-brand-lime/30 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-foreground">Nie znalazłeś odpowiedzi?</p>
                <p className="text-sm text-foreground-muted mt-0.5">
                  Każda sprawa jest inna. Powiedz nam co masz, odpowiemy konkretnie.
                </p>
              </div>
              <Button asChild variant="primary" size="md">
                <Link href="/konsultacja">
                  Zadaj pytanie
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
