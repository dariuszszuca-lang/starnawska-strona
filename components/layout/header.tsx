"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { getAllMembersSorted } from "@/lib/team";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

const navItems: NavItem[] = [
  { label: "Oferty", href: "/oferty" },
  { label: "Nasz zespół", href: "/zespol", hasDropdown: true },
  { label: "Doradztwo", href: "/doradztwo" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/kontakt" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const team = getAllMembersSorted();

  useEffect(() => {
    setMobileOpen(false);
    setTeamOpen(false);
  }, [pathname]);

  return (
    <header className="relative z-50 w-full">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-6 lg:pt-8 pb-2">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          <Logo size="md" />

          {/* Desktop nav z magic cursor */}
          <MagicNav pathname={pathname} teamOpen={teamOpen} setTeamOpen={setTeamOpen} team={team} />

          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href={siteConfig.contact.phones[0].href}
              className="hidden xl:inline-flex items-center gap-2 text-sm font-medium text-foreground-muted hover:text-foreground transition-colors tabular-nums"
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
            className="lg:hidden inline-flex items-center justify-center size-12 rounded-2xl bg-foreground text-background hover:bg-gray-800 active:scale-95 transition-all"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — pełnoekranowy overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-32 pb-8 overflow-y-auto"
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
                        "block px-5 py-4 text-2xl font-bold tracking-tight rounded-2xl transition-colors",
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
                      className="text-2xl font-bold tabular-nums text-foreground hover:text-brand-forest transition-colors"
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

/* ============================================
   MagicNav — kursor podążający za items
   Inspirowane 21st.dev (Tab/Cursor pattern)
   ============================================ */

function MagicNav({
  pathname,
  teamOpen,
  setTeamOpen,
  team,
}: {
  pathname: string;
  teamOpen: boolean;
  setTeamOpen: (v: boolean) => void;
  team: ReturnType<typeof getAllMembersSorted>;
}) {
  const [hover, setHover] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <nav
      className="hidden lg:flex relative items-center"
      aria-label="Główna nawigacja"
      onMouseLeave={() => setHover((p) => ({ ...p, opacity: 0 }))}
    >
      <ul className="relative flex items-center rounded-full border border-border bg-surface/80 backdrop-blur-xl shadow-[var(--shadow-soft)] px-1.5 py-1.5">
        {/* Pływający highlight */}
        <motion.span
          animate={hover}
          transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.6 }}
          className="absolute top-1.5 bottom-1.5 rounded-full bg-foreground pointer-events-none"
          style={{ left: 0, width: 0 }}
          aria-hidden
        />

        {navItems.map((item) => (
          <NavTab
            key={item.href}
            item={item}
            pathname={pathname}
            setHover={setHover}
            onTeamHoverChange={
              item.hasDropdown
                ? (v: boolean) => setTeamOpen(v)
                : undefined
            }
            teamOpen={item.hasDropdown ? teamOpen : false}
            team={team}
          />
        ))}
      </ul>
    </nav>
  );
}

function NavTab({
  item,
  pathname,
  setHover,
  onTeamHoverChange,
  teamOpen,
  team,
}: {
  item: NavItem;
  pathname: string;
  setHover: (v: { left: number; width: number; opacity: number }) => void;
  onTeamHoverChange?: (v: boolean) => void;
  teamOpen: boolean;
  team: ReturnType<typeof getAllMembersSorted>;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const active = pathname === item.href || pathname.startsWith(item.href + "/");

  const onEnter = () => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const parent = ref.current.parentElement!.getBoundingClientRect();
    setHover({ left: r.left - parent.left, width: r.width, opacity: 1 });
    onTeamHoverChange?.(true);
  };

  const onLeave = () => {
    onTeamHoverChange?.(false);
  };

  return (
    <li
      ref={ref}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative"
    >
      <Link
        href={item.href}
        className={cn(
          "relative z-10 inline-flex items-center gap-1 px-4 py-2 text-[13px] font-medium rounded-full transition-colors",
          "text-foreground mix-blend-difference group-hover:text-white",
          active && !item.hasDropdown && "text-background"
        )}
        style={{ mixBlendMode: "difference" }}
      >
        {item.label}
        {item.hasDropdown && <ChevronDown className="size-3" />}
      </Link>

      {item.hasDropdown && (
        <AnimatePresence>
          {teamOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-1/2 top-full -translate-x-1/2 pt-4 z-50"
              style={{ mixBlendMode: "normal" }}
            >
              <div className="w-[360px] rounded-3xl border border-border bg-surface shadow-[0_24px_60px_rgba(10,10,10,0.18)] p-3">
                <Link
                  href="/zespol"
                  className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-surface-dark text-foreground-on-dark mb-2 group/all"
                >
                  <div>
                    <span className="block font-semibold text-sm">Cały zespół</span>
                    <span className="block text-xs text-foreground-on-dark-muted">
                      Poznaj wszystkie {team.length} agentki
                    </span>
                  </div>
                  <ArrowUpRight className="size-4 text-brand-lime group-hover/all:rotate-12 transition-transform" />
                </Link>
                <div className="grid grid-cols-1 gap-0.5 max-h-[55vh] overflow-y-auto">
                  {team.map((m) => (
                    <Link
                      key={m.slug}
                      href={`/zespol/${m.slug}`}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 transition-colors group/item"
                    >
                      <span className="size-9 rounded-full bg-gradient-to-br from-brand-lime/30 via-brand-olive/40 to-brand-forest/55 ring-1 ring-border flex items-center justify-center text-xs font-bold text-brand-forest-deep">
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
      )}
    </li>
  );
}
