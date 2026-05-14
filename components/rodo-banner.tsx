"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Check, Settings, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "starnawska_cookies_v1";

type Preferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
};

function readPreferences(): Preferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Preferences;
  } catch {
    return null;
  }
}

function savePreferences(p: Preferences) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  // Dispatchujemy event dla innych komponentów (np. żeby załadować analytics)
  window.dispatchEvent(new CustomEvent("starnawska:consent", { detail: p }));
}

export function RodoBanner() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = readPreferences();
    if (!saved) {
      const t = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(t);
    }
    setAnalytics(saved.analytics);
    setMarketing(saved.marketing);
  }, []);

  const accept = (mode: "all" | "necessary" | "custom") => {
    const p: Preferences = {
      necessary: true,
      analytics: mode === "all" ? true : mode === "necessary" ? false : analytics,
      marketing: mode === "all" ? true : mode === "necessary" ? false : marketing,
      decidedAt: new Date().toISOString(),
    };
    savePreferences(p);
    setOpen(false);
    setSettings(false);
  };

  const openAgain = () => {
    setOpen(true);
    setSettings(true);
  };

  if (!mounted) return null;
  // Nie pokazujemy bannera RODO w panelu admina
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-4 left-4 right-4 sm:right-auto z-[100] sm:max-w-md"
            role="dialog"
            aria-labelledby="rodo-title"
            aria-describedby="rodo-desc"
          >
            <div className="relative rounded-3xl bg-surface-dark text-foreground-on-dark border border-border-on-dark shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,199,51,0.12),transparent_60%)]"
              />

              <div className="relative p-6">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-2xl bg-brand-lime/15 flex items-center justify-center">
                      <Cookie className="size-5 text-brand-lime" />
                    </div>
                    <div>
                      <h2 id="rodo-title" className="font-semibold text-base">
                        Cookies i prywatność
                      </h2>
                      <p className="text-xs text-foreground-on-dark-muted">
                        Twój komfort. Twoja zgoda.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => accept("necessary")}
                    aria-label="Zamknij i odrzuć opcjonalne"
                    className="size-8 rounded-full text-foreground-on-dark-muted hover:bg-white/5 hover:text-foreground-on-dark transition-colors flex items-center justify-center"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {!settings ? (
                  <>
                    <p
                      id="rodo-desc"
                      className="text-sm text-foreground-on-dark-muted leading-relaxed mb-5"
                    >
                      Używamy plików cookies, żeby strona działała poprawnie i żeby lepiej
                      rozumieć, czego szukasz. Możesz wybrać, na co się zgadzasz.{" "}
                      <Link
                        href="/polityka-cookies"
                        className="text-brand-lime hover:underline"
                      >
                        Dowiedz się więcej
                      </Link>
                    </p>

                    <div className="space-y-2">
                      <Button
                        variant="lime"
                        size="md"
                        className="w-full"
                        onClick={() => accept("all")}
                      >
                        <Check />
                        Zgadzam się na wszystkie
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => accept("necessary")}
                          className="h-10 px-4 rounded-full text-xs font-medium border border-border-on-dark text-foreground-on-dark hover:bg-white/5 transition-colors"
                        >
                          Tylko niezbędne
                        </button>
                        <button
                          onClick={() => setSettings(true)}
                          className="h-10 px-4 rounded-full text-xs font-medium border border-border-on-dark text-foreground-on-dark hover:bg-white/5 transition-colors inline-flex items-center justify-center gap-1.5"
                        >
                          <Settings className="size-3.5" />
                          Wybierz sam
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-foreground-on-dark-muted leading-relaxed mb-5">
                      Wybierz, które ciasteczka akceptujesz.
                    </p>

                    <div className="space-y-3 mb-5">
                      <PreferenceRow
                        label="Niezbędne"
                        description="Bez nich strona nie działa (sesja, formularze)."
                        checked
                        disabled
                      />
                      <PreferenceRow
                        label="Analityka"
                        description="Anonimowe statystyki. Co działa, co nie."
                        checked={analytics}
                        onChange={setAnalytics}
                      />
                      <PreferenceRow
                        label="Marketing"
                        description="Remarketing i piksele kampanii reklamowych."
                        checked={marketing}
                        onChange={setMarketing}
                      />
                    </div>

                    <Button
                      variant="lime"
                      size="md"
                      className="w-full"
                      onClick={() => accept("custom")}
                    >
                      Zapisz moje wybory
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pływająca ikona po decyzji. Pozwala wrócić do ustawień */}
      {!open && readPreferences() && (
        <button
          onClick={openAgain}
          aria-label="Ustawienia prywatności"
          className={cn(
            "fixed bottom-4 left-4 z-[90] size-12 rounded-full shadow-[var(--shadow-card)]",
            "bg-surface-dark text-brand-lime border border-border-on-dark",
            "hover:bg-surface-dark-elevated hover:scale-105 transition-all",
            "flex items-center justify-center"
          )}
        >
          <Shield className="size-5" />
        </button>
      )}
    </>
  );
}

function PreferenceRow({
  label,
  description,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label
      className={cn(
        "flex items-start gap-3 p-3 rounded-2xl border transition-colors cursor-pointer",
        checked
          ? "bg-brand-lime/8 border-brand-lime/30"
          : "bg-white/[0.02] border-border-on-dark hover:bg-white/[0.04]",
        disabled && "opacity-70 cursor-not-allowed"
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="sr-only"
      />
      <span
        className={cn(
          "relative mt-0.5 size-5 shrink-0 rounded-md border transition-colors flex items-center justify-center",
          checked
            ? "bg-brand-lime border-brand-lime text-brand-forest-deep"
            : "bg-transparent border-border-on-dark"
        )}
      >
        {checked && <Check className="size-3.5" />}
      </span>
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground-on-dark leading-tight">{label}</p>
        <p className="text-xs text-foreground-on-dark-muted mt-0.5 leading-relaxed">
          {description}
        </p>
      </div>
    </label>
  );
}
