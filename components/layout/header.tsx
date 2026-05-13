"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
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
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setTeamOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <Container size="wide">
        <div className="flex h-20 items-center justify-between gap-6">
          <Logo size="md" />

          <nav className="hidden lg:flex items-center gap-1" aria-label="Główna nawigacja">
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
                      "inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-colors",
                      pathname.startsWith(item.href)
                        ? "text-brand-forest bg-gray-100"
                        : "text-foreground hover:text-brand-forest hover:bg-gray-100"
                    )}
                  >
                    {item.label}
                    <ChevronDown className="size-3.5 opacity-60" />
                  </Link>
                  <AnimatePresence>
                    {teamOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                      >
                        <div className="w-[320px] rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)] p-2">
                          <Link
                            href="/zespol"
                            className="block px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-gray-50 border-b border-border mb-1"
                          >
                            Cały zespół →
                          </Link>
                          <div className="grid grid-cols-1 gap-0.5 max-h-[60vh] overflow-y-auto">
                            {team.map((m) => (
                              <Link
                                key={m.slug}
                                href={`/zespol/${m.slug}`}
                                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm hover:bg-gray-50 transition-colors group/item"
                              >
                                <span className="size-8 rounded-full bg-gradient-to-br from-brand-lime/20 to-brand-olive/30 flex items-center justify-center text-xs font-semibold text-brand-forest-deep">
                                  {m.firstName[0]}
                                  {m.lastName[0]}
                                </span>
                                <span className="flex-1 min-w-0">
                                  <span className="block font-medium text-foreground truncate">
                                    {m.fullName}
                                  </span>
                                  {m.shortRole && (
                                    <span className="block text-xs text-foreground-muted truncate">
                                      {m.shortRole}
                                    </span>
                                  )}
                                </span>
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
                    "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                    pathname === item.href || pathname.startsWith(item.href + "/")
                      ? "text-brand-forest bg-gray-100"
                      : "text-foreground hover:text-brand-forest hover:bg-gray-100"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <a
              href={siteConfig.contact.phones[0].href}
              className="hidden xl:inline-flex items-center gap-2 text-sm font-medium text-foreground-muted hover:text-foreground transition-colors"
            >
              <Phone className="size-4" />
              {siteConfig.contact.phones[0].displayValue}
            </a>
            <Button asChild variant="lime" size="md">
              <Link href="/konsultacja">Umów konsultację</Link>
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center size-11 rounded-full border border-border hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-t border-border bg-background overflow-hidden"
          >
            <Container size="wide" className="py-6">
              <nav className="flex flex-col gap-1" aria-label="Menu mobilne">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-4 py-3 text-base font-medium rounded-xl transition-colors",
                      pathname === item.href || pathname.startsWith(item.href + "/")
                        ? "text-brand-forest bg-gray-100"
                        : "text-foreground hover:bg-gray-50"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-4 pt-4 border-t border-border space-y-3">
                <Button asChild variant="lime" size="lg" className="w-full">
                  <Link href="/konsultacja">Umów konsultację</Link>
                </Button>
                {siteConfig.contact.phones.map((p) => (
                  <a
                    key={p.value}
                    href={p.href}
                    className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-foreground-muted hover:text-foreground"
                  >
                    <Phone className="size-4" />
                    {p.displayValue}
                  </a>
                ))}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
