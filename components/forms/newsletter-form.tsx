"use client";

import { useState } from "react";
import { Send, Check, Loader2 } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setState("error");
      return;
    }
    setState("loading");
    try {
      // TODO: podpięcie do MailerLite/Resend/Mailchimp po dorzuceniu klucza
      await new Promise((r) => setTimeout(r, 800));
      setState("ok");
    } catch {
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-brand-lime/15 border border-brand-lime/30">
        <Check className="size-5 text-brand-lime shrink-0 mt-0.5" strokeWidth={2.5} />
        <div>
          <p className="font-medium text-foreground-on-dark">Zapisano. Dziękujemy.</p>
          <p className="text-xs text-foreground-on-dark-muted mt-0.5">
            Pierwszy mail dostaniesz w poniedziałek.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="flex items-stretch gap-2">
        <input
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="anna@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          className="flex-1 h-11 px-4 rounded-xl bg-white/5 border border-border-on-dark text-foreground-on-dark placeholder:text-foreground-on-dark-muted/60 focus:bg-white/10 focus:border-brand-lime focus:outline-none transition-colors text-sm"
          aria-label="Twój e-mail"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex items-center justify-center px-4 h-11 rounded-xl bg-brand-lime text-brand-forest-deep font-semibold text-sm hover:bg-brand-lime-hover active:scale-[0.98] disabled:opacity-60 transition-all"
        >
          {state === "loading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
        </button>
      </div>
      {state === "error" && (
        <p className="text-xs text-red-300">Podaj poprawny adres e-mail.</p>
      )}
      <p className="text-xs text-foreground-on-dark-muted leading-relaxed">
        Bez spamu. Tylko nowe oferty w poniedziałki. W każdej chwili możesz się wypisać.
      </p>
    </form>
  );
}
