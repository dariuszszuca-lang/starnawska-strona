"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { getAllMembersSorted } from "@/lib/team";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Oferty", href: "/oferty" },
  { label: "Nasz zespół", href: "/zespol", hasDropdown: true },
  { label: "Doradztwo", href: "/doradztwo" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/kontakt" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const team = getAllMembersSorted();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setTeamOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className={cn(
          "transition-all duration-500",
          scrolled ? "pt-3 lg:pt-4" : "pt-5 lg:pt-6"
        )}
      >
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <motion.div
            animate={{
              borderRadius: scrolled ? 28 : 36,
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative flex items-center justify-between gap-4 transition-all duration-500",
              "border backdrop-blur-xl",
              scrolled
                ? "h-16 px-3 lg:px-4 bg-surface/85 border-border shadow-[var(--shadow-card)]"
                : "h-20 px-4 lg:px-6 bg-surface/70 border-border/70 shadow-[var(--shadow-soft)]"
            )}
          >
            {/* Logo */}
            <div className="shrink-0">
              <Logo size={scrolled ? "sm" : "md"} />
            </div>

            {/* Nav center */}
            <nav
              className="hidden lg:flex items-center gap-0.5"
              aria-label="Główna nawigacja"
            >
              {navItems.map((item) =>
                item.hasDropdown ? (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setTeamOpen(true)}
                    onMouseLeave={() => setTeamOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex items-center gap-1 px-4 py-2.5 text-[13px] font-medium rounded-full transition-all",
                        pathname.startsWith(item.href)
                          ? "text-brand-forest bg-brand-lime/15"
                          : "text-foreground hover:text-brand-forest hover:bg-gray-100/80"
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "size-3.5 opacity-60 transition-transform",
                          teamOpen && "rotate-180"
                        )}
                      />
                    </Link>
                    <AnimatePresence>
                      {teamOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute left-1/2 top-full -translate-x-1/2 pt-4"
                        >
                          <div className="w-[340px] rounded-3xl border border-border bg-surface/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-3">
                            <Link
                              href="/zespol"
                              className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-surface-dark text-foreground-on-dark mb-1.5 group/all"
                            >
                              <div>
                                <span className="block font-semibold text-sm">
                                  Cały zespół
                                </span>
                                <span className="block text-xs text-foreground-on-dark-muted">
                                  Wszystkie {team.length} agentki
                                </span>
                              </div>
                              <ArrowUpRight className="size-4 text-brand-lime group-hover/all:rotate-12 transition-transform" />
                            </Link>
                            <div className="grid grid-cols-1 gap-0.5 max-h-[55vh] overflow-y-auto pt-1">
                              {team.map((m) => (
                                <Link
                                  key={m.slug}
                                  href={`/zespol/${m.slug}`}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-colors group/item"
                                >
                                  <span className="size-9 rounded-full bg-gradient-to-br from-brand-lime/30 via-brand-olive/40 to-brand-forest/50 flex items-center justify-center text-xs font-bold text-brand-forest-deep ring-1 ring-border">
                                    {m.firstName[0]}
                                    {m.lastName[0]}
                                  </span>
                                  <span className="flex-1 min-w-0">
                                    <span className="block font-medium text-foreground truncate text-sm">
                                      {m.fullName}
                                    </span>
                                    {m.shortRole && (
                                      <span className="block text-[11px] text-foreground-muted truncate">
                                        {m.shortRole}
                                      </span>
                                    )}
                                  </span>
                                  <ArrowUpRight className="size-3.5 text-foreground-subtle opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-4 py-2.5 text-[13px] font-medium rounded-full transition-all",
                      pathname === item.href || pathname.startsWith(item.href + "/")
                        ? "text-brand-forest bg-brand-lime/15"
                        : "text-foreground hover:text-brand-forest hover:bg-gray-100/80"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right side: phone + CTA */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <a
                href={siteConfig.contact.phones[0].href}
                className="hidden xl:inline-flex items-center gap-2 px-3 py-2 rounded-full text-[13px] font-medium text-foreground-muted hover:text-foreground hover:bg-gray-100/80 transition-all tabular-nums"
              >
                <Phone className="size-3.5" />
                {siteConfig.contact.phones[0].displayValue}
              </a>
              <Button asChild variant="lime" size="sm">
                <Link href="/konsultacja">Umów konsultację</Link>
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center size-10 rounded-full bg-foreground text-background hover:bg-gray-800 active:scale-95 transition-all"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu — pełnoekranowe wysuwane */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-40 bg-background/90 backdrop-blur-md pt-28 pb-8 overflow-y-auto"
          >
            <div className="mx-auto w-full max-w-md px-6">
              <motion.nav
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.3 }}
                className="space-y-1.5"
                aria-label="Menu mobilne"
              >
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-5 py-4 text-2xl font-display tracking-tight rounded-2xl transition-colors",
                        pathname === item.href || pathname.startsWith(item.href + "/")
                          ? "text-brand-forest bg-brand-lime/15"
                          : "text-foreground hover:bg-gray-100"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 pt-8 border-t border-border space-y-4"
              >
                <Button asChild variant="lime" size="lg" className="w-full">
                  <Link href="/konsultacja">Umów konsultację</Link>
                </Button>
                <div className="flex flex-col items-center gap-2 pt-2">
                  <p className="text-xs uppercase tracking-wider text-foreground-muted">
                    Wolisz telefon
                  </p>
                  {siteConfig.contact.phones.map((p) => (
                    <a
                      key={p.value}
                      href={p.href}
                      className="font-display text-2xl tabular-nums text-foreground hover:text-brand-forest transition-colors"
                    >
                      {p.displayValue}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
