import { Container } from "@/components/ui/container";

const faqs = [
  {
    q: "Ile kosztuje sprzedaż mieszkania przez biuro?",
    a: "W Trójmieście standardowa prowizja to 2–3% wartości nieruchomości + VAT. Płaci sprzedający, kupujący, albo strony dzielą się prowizją. Kwota jest negocjowalna przy droższych ofertach. Wszystkie warunki zapisujemy w umowie pośrednictwa, bez gwiazdek.",
  },
  {
    q: "Jak długo trwa sprzedaż mieszkania w Gdyni?",
    a: "Średnio 6–10 tygodni od publikacji oferty do podpisania umowy przedwstępnej, plus kolejne 4–8 tygodni do aktu notarialnego, jeśli kupujący bierze kredyt. Krótszy czas to znak dobrze ustalonej ceny, dłuższy oznacza zazwyczaj problem z wyceną lub prezentacją.",
  },
  {
    q: "Czy podpisujemy wyłączność?",
    a: "Tak, ale na warunkach uczciwych. Standardowa umowa to 3–6 miesięcy z prawem wypowiedzenia 30-dniowego. Comiesięcznie wysyłamy raport z aktywności: ile pokazów, ile zapytań, jakie kontroferty. Wyłączność to warunek skutecznej promocji w naszej bazie pośredników.",
  },
  {
    q: "Czy obsługujecie też wynajem?",
    a: "Tak, prowadzimy wynajem długoterminowy zarówno dla właścicieli, jak i dla najemców. Weryfikujemy najemców (zaświadczenia o zatrudnieniu, referencje), przygotowujemy umowę najmu okazjonalnego lub instytucjonalnego, prowadzimy protokół zdawczo-odbiorczy.",
  },
  {
    q: "W jakich miastach pracujecie?",
    a: "Trójmiasto i okolice: Gdynia, Sopot, Gdańsk, plus gmina Kosakowo, Reda, Rumia. Sporadycznie obsługujemy klientów z Pomorza spoza Trójmiasta, jeśli wcześniej mieliśmy z nimi relację.",
  },
  {
    q: "Czy pomagacie z kredytem hipotecznym?",
    a: "Tak. Współpracujemy z niezależnymi pośrednikami kredytowymi. Sprawdzamy Twoją zdolność kredytową bezpłatnie, porównujemy oferty kilku banków, pomagamy skompletować dokumenty. Nie zarabiamy na prowizjach od banków, więc rekomendacje są neutralne.",
  },
];

export function FAQ() {
  // FAQ schema dla SEO
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="py-20 lg:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Container size="default">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
              Pytania klientów
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-foreground mb-4">
              Sześć rzeczy,
              <br />
              <span className="text-foreground-muted italic">
                o które pytają najczęściej.
              </span>
            </h2>
            <p className="text-foreground-muted leading-relaxed">
              Nie znalazłeś odpowiedzi? Zadzwoń albo napisz, odpowiemy konkretnie.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-3">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl bg-surface border border-border overflow-hidden hover:border-foreground-muted transition-colors open:border-brand-forest open:shadow-[var(--shadow-soft)]"
              >
                <summary className="cursor-pointer p-6 lg:p-7 flex items-start justify-between gap-4 list-none">
                  <span className="font-semibold text-lg text-foreground leading-snug">
                    {f.q}
                  </span>
                  <span
                    aria-hidden
                    className="size-8 rounded-full bg-gray-100 group-open:bg-brand-lime group-open:text-brand-forest-deep flex items-center justify-center text-xl leading-none shrink-0 transition-colors"
                  >
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">−</span>
                  </span>
                </summary>
                <div className="px-6 lg:px-7 pb-6 lg:pb-7 -mt-2 text-foreground-muted leading-relaxed">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
