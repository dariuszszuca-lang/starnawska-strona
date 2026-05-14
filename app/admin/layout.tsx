import Link from "next/link";
import { LogOut, FileText, ArrowLeft } from "lucide-react";
import { isAdmin } from "@/lib/admin/auth";

export const metadata = {
  title: "Panel admina — Starnawska & Boleńska",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const loggedIn = await isAdmin();

  if (!loggedIn) {
    // Login page — pełnoekranowy, bez naszego wrappera
    return <div className="bg-background min-h-screen text-foreground">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {loggedIn && (
        <header className="border-b border-border bg-surface">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <Link
                href="/admin"
                className="font-bold text-foreground hover:text-brand-forest transition-colors"
              >
                Panel admina
              </Link>
              <nav className="hidden sm:flex items-center gap-4 text-sm">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-foreground-muted hover:text-foreground transition-colors"
                >
                  <FileText className="size-3.5" />
                  Blog
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground transition-colors px-3 py-1.5 rounded-full border border-border"
              >
                <ArrowLeft className="size-3.5" />
                Strona
              </Link>
              <form action="/api/admin/logout" method="POST">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground transition-colors px-3 py-1.5 rounded-full border border-border hover:border-foreground"
                >
                  <LogOut className="size-3.5" />
                  Wyloguj
                </button>
              </form>
            </div>
          </div>
        </header>
      )}
      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {children}
      </main>
    </div>
  );
}
