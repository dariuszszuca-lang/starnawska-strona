import { redirect } from "next/navigation";
import Image from "next/image";
import { Lock } from "lucide-react";
import { isAdmin } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

type Search = Promise<{ error?: string; from?: string }>;

export default async function AdminLoginPage({ searchParams }: { searchParams: Search }) {
  if (await isAdmin()) {
    const params = await searchParams;
    redirect(params.from || "/admin");
  }
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/brand/logo.png"
            alt=""
            width={56}
            height={56}
            className="rounded-2xl mx-auto mb-5"
          />
          <h1 className="font-bold tracking-tight text-2xl text-foreground">
            Panel admina
          </h1>
          <p className="text-sm text-foreground-muted mt-2">
            Starnawska &amp; Boleńska
          </p>
        </div>

        <form
          action="/api/admin/login"
          method="POST"
          className="rounded-3xl bg-surface border border-border p-7 lg:p-8 shadow-[var(--shadow-card)]"
        >
          {params.from && (
            <input type="hidden" name="from" value={params.from} />
          )}

          <label className="block">
            <span className="block text-xs font-semibold uppercase tracking-wider text-brand-olive mb-2">
              Hasło
            </span>
            <div className="relative">
              <Lock className="size-4 text-foreground-muted absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="password"
                required
                autoFocus
                autoComplete="current-password"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-background border border-border focus:border-brand-forest focus:outline-none focus:ring-2 focus:ring-brand-lime/30 transition-all text-foreground"
                placeholder="••••••••"
              />
            </div>
          </label>

          {params.error && (
            <p className="mt-4 text-sm text-red-600">
              {params.error === "bad-password"
                ? "Niepoprawne hasło."
                : "Spróbuj jeszcze raz."}
            </p>
          )}

          <button
            type="submit"
            className="mt-6 w-full h-12 rounded-2xl bg-brand-lime text-brand-forest-deep font-semibold hover:bg-brand-lime-bright active:scale-[0.98] transition-all"
          >
            Zaloguj
          </button>

          <p className="mt-5 text-xs text-foreground-muted text-center leading-relaxed">
            Sesja ważna 7 dni. Jeśli nie pamiętasz hasła, napisz do Darka.
          </p>
        </form>
      </div>
    </div>
  );
}
