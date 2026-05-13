"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, AlertCircle, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const schema = z.object({
  intent: z.enum(["sprzedaj", "kup", "wynajmij", "szukam-najmu", "inne"], {
    message: "Wybierz powód kontaktu",
  }),
  name: z.string().min(2, "Imię i nazwisko (min. 2 znaki)").max(80),
  phone: z
    .string()
    .min(9, "Numer telefonu (min. 9 cyfr)")
    .max(20)
    .regex(/^[+0-9 \-()]+$/, "Tylko cyfry, spacje, +, (, ), -"),
  email: z.email("Niepoprawny adres e-mail").or(z.literal("")),
  message: z.string().max(2000).optional(),
  agentka: z.string().optional(),
  rodo: z.boolean().refine((v) => v === true, {
    message: "Musisz wyrazić zgodę na przetwarzanie danych",
  }),
});

type FormData = z.infer<typeof schema>;

const intents = [
  { value: "sprzedaj", label: "Chcę sprzedać" },
  { value: "kup", label: "Szukam do kupna" },
  { value: "wynajmij", label: "Chcę wynająć (jako właściciel)" },
  { value: "szukam-najmu", label: "Szukam wynajmu" },
  { value: "inne", label: "Coś innego" },
] as const;

export function ConsultationForm({ agentka }: { agentka?: string }) {
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      intent: undefined,
      agentka: agentka ?? undefined,
      rodo: false,
    },
  });

  const currentIntent = watch("intent");

  async function onSubmit(data: FormData) {
    setSubmitState("loading");
    try {
      const res = await fetch("/api/konsultacja", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("send failed");
      setSubmitState("ok");
    } catch {
      setSubmitState("error");
    }
  }

  if (submitState === "ok") {
    return (
      <div className="rounded-3xl bg-brand-lime/15 border border-brand-lime/40 p-8 lg:p-10">
        <div className="size-14 rounded-2xl bg-brand-lime text-brand-forest-deep flex items-center justify-center mb-5">
          <Check className="size-7" strokeWidth={2.5} />
        </div>
        <h2 className="font-bold tracking-tight text-2xl lg:text-3xl text-foreground mb-3">
          Dziękujemy. Wkrótce się odezwiemy.
        </h2>
        <p className="text-foreground-muted leading-relaxed">
          Wiadomość trafiła do biura. Zadzwonimy lub odpiszemy w ciągu jednego dnia
          roboczego. Jeśli sprawa jest pilna, zadzwoń bezpośrednio: 532 843 660.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl bg-surface border border-border p-6 lg:p-10 space-y-8"
    >
      <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
          1. Co Cię sprowadza
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {intents.map((opt) => {
            const active = currentIntent === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setValue("intent", opt.value, { shouldValidate: true })}
                className={cn(
                  "px-5 py-3.5 rounded-2xl text-sm font-medium text-left border transition-all",
                  active
                    ? "bg-brand-forest text-foreground-on-dark border-brand-forest"
                    : "bg-transparent text-foreground border-border hover:border-brand-forest"
                )}
                aria-pressed={active}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {errors.intent && <FieldError msg={errors.intent.message!} />}
      </fieldset>

      <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
          2. Twoje dane
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Imię i nazwisko"
            required
            error={errors.name?.message}
            input={
              <input
                type="text"
                autoComplete="name"
                placeholder="Anna Kowalska"
                {...register("name")}
                className="form-input"
              />
            }
          />
          <Field
            label="Telefon"
            required
            error={errors.phone?.message}
            input={
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="600 123 456"
                {...register("phone")}
                className="form-input"
              />
            }
          />
          <div className="md:col-span-2">
            <Field
              label="E-mail (opcjonalnie)"
              error={errors.email?.message}
              input={
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="anna@example.com"
                  {...register("email")}
                  className="form-input"
                />
              }
            />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
          3. Powiedz nam więcej (opcjonalnie)
        </legend>
        <textarea
          rows={5}
          placeholder="Np. dwupokojowe na Witominie, do 800 tys, kupuję na kredyt; albo: mam mieszkanie na sprzedaż, chcę poznać wycenę"
          {...register("message")}
          className="form-input resize-none"
        />
      </fieldset>

      <fieldset>
        <label className="flex items-start gap-3 cursor-pointer group">
          <span className="relative mt-0.5 size-5 shrink-0 rounded-md border border-border-strong group-has-[:checked]:bg-brand-forest group-has-[:checked]:border-brand-forest transition-colors flex items-center justify-center">
            <input type="checkbox" {...register("rodo")} className="sr-only peer" />
            <Check
              className="size-3.5 text-foreground-on-dark opacity-0 peer-checked:opacity-100 [.peer:checked~&]:opacity-100"
              strokeWidth={3}
            />
          </span>
          <span className="text-sm text-foreground-muted leading-relaxed">
            Wyrażam zgodę na przetwarzanie moich danych osobowych w celu kontaktu
            zwrotnego, zgodnie z{" "}
            <a href="/polityka-prywatnosci" className="text-foreground underline">
              polityką prywatności
            </a>
            .
          </span>
        </label>
        {errors.rodo && <FieldError msg={errors.rodo.message!} />}
      </fieldset>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-border">
        <p className="text-xs text-foreground-subtle">
          Odpowiadamy w ciągu jednego dnia roboczego.
        </p>
        <Button
          type="submit"
          variant="lime"
          size="lg"
          disabled={submitState === "loading"}
          className="min-w-[200px] justify-center"
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
      </div>

      {submitState === "error" && (
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900">
          <AlertCircle className="size-5 shrink-0 mt-0.5" />
          <p className="text-sm">
            Coś poszło nie tak. Spróbuj jeszcze raz, albo zadzwoń: 532 843 660.
          </p>
        </div>
      )}

      <style>{`
        .form-input {
          width: 100%;
          height: 3rem;
          padding: 0 1rem;
          border-radius: 0.75rem;
          background: var(--gray-50);
          border: 1px solid var(--border);
          color: var(--foreground);
          font-size: 0.95rem;
          outline: none;
          transition: all 0.15s ease;
        }
        .form-input:focus {
          background: var(--surface);
          border-color: var(--brand-forest);
          box-shadow: 0 0 0 3px rgba(163, 199, 51, 0.25);
        }
        textarea.form-input {
          height: auto;
          padding-top: 0.875rem;
          line-height: 1.6;
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  input,
}: {
  label: string;
  required?: boolean;
  error?: string;
  input: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-foreground mb-1.5">
        {label}
        {required && <span className="text-brand-olive ml-1">*</span>}
      </span>
      {input}
      {error && <FieldError msg={error} />}
    </label>
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
