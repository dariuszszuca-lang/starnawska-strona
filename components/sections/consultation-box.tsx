"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send,
  Check,
  Loader2,
  AlertCircle,
  Phone,
  Clock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const schema = z.object({
  intent: z.enum(["kup", "sprzedaj", "wynajmij", "szukam-najmu", "inne"], {
    message: "Wybierz powód kontaktu",
  }),
  name: z.string().min(2, "Imię i nazwisko").max(80),
  phone: z
    .string()
    .min(9, "Numer telefonu")
    .max(20)
    .regex(/^[+0-9 \-()]+$/, "Tylko cyfry, spacje, +, (, ), -"),
  message: z.string().max(500).optional(),
  rodo: z.boolean().refine((v) => v === true, {
    message: "Wymagana zgoda",
  }),
});
type FormData = z.infer<typeof schema>;

const intents = [
  { value: "kup", label: "Szukam do kupna", emoji: "🔍" },
  { value: "sprzedaj", label: "Chcę sprzedać", emoji: "🏠" },
  { value: "wynajmij", label: "Chcę wynająć (właściciel)", emoji: "🔑" },
  { value: "szukam-najmu", label: "Szukam wynajmu", emoji: "🛏️" },
  { value: "inne", label: "Coś innego", emoji: "✨" },
] as const;

export function ConsultationBox() {
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { rodo: false },
  });
  const currentIntent = watch("intent");

  async function onSubmit(data: FormData) {
    setSubmitState("loading");
    try {
      const res = await fetch("/api/konsultacja", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, email: "" }),
      });
      if (!res.ok) throw new Error("send failed");
      setSubmitState("ok");
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <section className="py-20 lg:py-28">
      <Container size="wide">
        <div className="relative overflow-hidden rounded-[40px] bg-surface border border-border shadow-[var(--shadow-card)]">
          {/* tło glow */}
          <div
            aria-hidden
            className="absolute -top-32 -right-32 size-[500px] rounded-full bg-brand-lime/15 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-40 -left-40 size-[400px] rounded-full bg-brand-forest/15 blur-3xl"
          />

          <div className="relative grid lg:grid-cols-12 gap-10 lg:gap-16 p-8 lg:p-14">
            {/* LEWA — tekst sprzedażowy */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-lime/15 text-brand-forest-deep text-xs font-semibold uppercase tracking-wider mb-5">
                  <Sparkles className="size-3.5" />
                  Konsultacja bezpłatna
                </div>

                <h2 className="font-bold tracking-tight text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] text-foreground mb-5">
                  30 minut rozmowy.
                  <br />
                  Bez zobowiązań.
                </h2>

                <p className="text-lg text-foreground-muted leading-relaxed mb-8">
                  Powiedz nam co dokładnie potrzebujesz, my powiemy co realnie da się
                  zrobić w Twojej sytuacji. Bez wciskania, bez pustych obietnic.
                </p>

                <ul className="space-y-3">
                  <Promise icon={Clock} text="Odpowiadamy w ciągu jednego dnia roboczego" />
                  <Promise icon={Check} text="Spotkanie w biurze, online lub telefonicznie" />
                  <Promise icon={ShieldCheck} text="Twoje dane bezpieczne — RODO" />
                </ul>
              </div>

              {/* Telefon bezpośredni */}
              <div className="mt-10 pt-6 border-t border-border">
                <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                  Albo zadzwoń teraz
                </p>
                <a
                  href={siteConfig.contact.phones[0].href}
                  className="inline-flex items-center gap-3 text-foreground hover:text-brand-forest transition-colors group"
                >
                  <span className="size-11 rounded-full bg-brand-lime/15 text-brand-olive flex items-center justify-center group-hover:bg-brand-lime group-hover:text-brand-forest-deep transition-colors">
                    <Phone className="size-5" />
                  </span>
                  <span className="font-bold text-2xl tabular-nums">
                    {siteConfig.contact.phones[0].displayValue}
                  </span>
                </a>
              </div>
            </div>

            {/* PRAWA — formularz */}
            <div className="lg:col-span-7">
              {submitState === "ok" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-3xl bg-brand-lime/15 border border-brand-lime/40 p-10 h-full flex flex-col justify-center"
                >
                  <div className="size-16 rounded-2xl bg-brand-lime text-brand-forest-deep flex items-center justify-center mb-6">
                    <Check className="size-8" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-bold text-3xl text-foreground mb-3 tracking-tight">
                    Dziękujemy.
                    <br />
                    Wkrótce się odezwiemy.
                  </h3>
                  <p className="text-foreground-muted leading-relaxed">
                    Wiadomość trafiła do biura. Zadzwonimy lub odpiszemy w ciągu jednego
                    dnia roboczego. Jeśli sprawa pilna, zadzwoń:{" "}
                    <strong>{siteConfig.contact.phones[0].displayValue}</strong>.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="rounded-3xl bg-background border border-border p-7 lg:p-8 space-y-6"
                >
                  {/* Intent buttons */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
                      Co Cię sprowadza?
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {intents.map((opt) => {
                        const active = currentIntent === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() =>
                              setValue("intent", opt.value, { shouldValidate: true })
                            }
                            className={cn(
                              "px-4 py-3 rounded-2xl text-sm font-medium text-left border transition-all flex items-center gap-2",
                              active
                                ? "bg-brand-forest text-foreground-on-dark border-brand-forest shadow-[var(--shadow-soft)]"
                                : "bg-transparent text-foreground border-border hover:border-brand-forest"
                            )}
                            aria-pressed={active}
                          >
                            <span className="text-base">{opt.emoji}</span>
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                    {errors.intent && <FieldError msg={errors.intent.message!} />}
                  </div>

                  {/* Name + phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-foreground-muted mb-1.5 px-1">
                        Imię i nazwisko<span className="text-brand-olive ml-0.5">*</span>
                      </label>
                      <input
                        type="text"
                        autoComplete="name"
                        placeholder="Anna Kowalska"
                        {...register("name")}
                        className="form-input"
                      />
                      {errors.name && <FieldError msg={errors.name.message!} />}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground-muted mb-1.5 px-1">
                        Telefon<span className="text-brand-olive ml-0.5">*</span>
                      </label>
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="600 123 456"
                        {...register("phone")}
                        className="form-input"
                      />
                      {errors.phone && <FieldError msg={errors.phone.message!} />}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-foreground-muted mb-1.5 px-1">
                      Powiedz nam więcej <span className="text-foreground-subtle">(opcjonalnie)</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Np. dwupokojowe na Witominie, do 800 tys, kupuję na kredyt"
                      {...register("message")}
                      className="form-input resize-none"
                    />
                  </div>

                  {/* RODO */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <span className="relative mt-0.5 size-5 shrink-0 rounded-md border border-border-strong has-[:checked]:bg-brand-forest has-[:checked]:border-brand-forest transition-colors flex items-center justify-center">
                      <input type="checkbox" {...register("rodo")} className="sr-only peer" />
                      <Check
                        className="size-3.5 text-foreground-on-dark opacity-0 peer-checked:opacity-100 [.peer:checked~&]:opacity-100"
                        strokeWidth={3}
                      />
                    </span>
                    <span className="text-xs text-foreground-muted leading-relaxed">
                      Wyrażam zgodę na przetwarzanie moich danych w celu kontaktu zwrotnego.{" "}
                      <Link
                        href="/polityka-prywatnosci"
                        className="text-foreground underline"
                      >
                        Polityka prywatności
                      </Link>
                      .
                    </span>
                  </label>
                  {errors.rodo && <FieldError msg={errors.rodo.message!} />}

                  <Button
                    type="submit"
                    variant="lime"
                    size="lg"
                    disabled={submitState === "loading"}
                    className="w-full justify-center"
                  >
                    {submitState === "loading" ? (
                      <>
                        <Loader2 className="animate-spin" />
                        Wysyłam…
                      </>
                    ) : (
                      <>
                        <Send />
                        Wyślij zgłoszenie
                      </>
                    )}
                  </Button>

                  {submitState === "error" && (
                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900">
                      <AlertCircle className="size-5 shrink-0 mt-0.5" />
                      <p className="text-sm">
                        Coś poszło nie tak. Spróbuj jeszcze raz, albo zadzwoń:{" "}
                        {siteConfig.contact.phones[0].displayValue}.
                      </p>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>

          <style>{`
            .form-input {
              width: 100%;
              height: 2.75rem;
              padding: 0 1rem;
              border-radius: 0.75rem;
              background: var(--gray-50);
              border: 1px solid var(--border);
              color: var(--foreground);
              font-size: 0.95rem;
              outline: none;
              transition: all 0.15s ease;
            }
            .form-input::placeholder { color: var(--foreground-subtle); }
            .form-input:focus {
              background: var(--surface);
              border-color: var(--brand-forest);
              box-shadow: 0 0 0 3px rgba(163, 199, 51, 0.22);
            }
            textarea.form-input {
              height: auto;
              padding-top: 0.75rem;
              line-height: 1.6;
            }
          `}</style>
        </div>
      </Container>
    </section>
  );
}

function Promise({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}) {
  return (
    <li className="flex items-start gap-3 text-sm">
      <span className="size-7 rounded-lg bg-brand-lime/15 text-brand-olive flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="size-3.5" />
      </span>
      <span className="text-foreground pt-1">{text}</span>
    </li>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1.5">
      <AlertCircle className="size-3.5" />
      {msg}
    </p>
  );
}
