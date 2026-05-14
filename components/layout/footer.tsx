"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/social-icons";
import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

const footerNav = {
  oferta: [
    { label: "Sprzedaż mieszkań", href: "/oferty?typ=mieszkanie&transakcja=sprzedaz" },
    { label: "Sprzedaż domów", href: "/oferty?typ=dom&transakcja=sprzedaz" },
    { label: "Rynek pierwotny", href: "/oferty?segment=pierwotny" },
    { label: "Wynajem", href: "/oferty?transakcja=najem" },
    { label: "Grunty i działki", href: "/oferty?typ=dzialka" },
  ],
  firma: [
    { label: "O nas", href: "/o-nas" },
    { label: "Nasz zespół", href: "/zespol" },
    { label: "Doradztwo", href: "/doradztwo" },
    { label: "Szkolenia", href: "/szkolenia" },
    { label: "Blog", href: "/blog" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  pomoc: [
    { label: "Konsultacja", href: "/konsultacja" },
    { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
    { label: "Cookies", href: "/polityka-cookies" },
    { label: "Regulamin", href: "/regulamin" },
  ],
};

export function Footer() {
  const pathname = usePathname();
  // Panel admina nie pokazuje głównego footera
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-surface-dark text-foreground-on-dark mt-24">
      <Container size="wide" as="div" className="py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-12 gap-x-8">
          {/* Lewa kolumna: logo + opis + NSL + social */}
          <div className="col-span-2 md:col-span-4 space-y-6">
            <Logo variant="dark" size="md" />

            <p className="text-sm leading-relaxed text-foreground-on-dark-muted max-w-sm">
              Biuro nieruchomości w Gdyni. Sprzedaż, wynajem, doradztwo. Od {siteConfig.foundedYear} roku
              pomagamy klientom z Trójmiasta znaleźć swoje miejsce.
            </p>

            {/* NSL badge */}
            <Link
              href="https://nieruchomoscispodlady.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 pl-2 pr-3.5 py-2 rounded-2xl bg-white/[0.04] border border-border-on-dark hover:bg-white/[0.08] hover:border-brand-lime/40 transition-all"
            >
              <span className="shrink-0 bg-white rounded-lg p-1.5 flex items-center">
                <Image
                  src="/partners/nsl-logo.png"
                  alt="Nieruchomości Spod Lady"
                  width={48}
                  height={36}
                  className="h-6 w-auto object-contain"
                />
              </span>
              <span className="leading-tight">
                <span className="block text-[9px] uppercase tracking-[0.18em] text-brand-lime font-semibold">
                  Sieć współpracy
                </span>
                <span className="block text-xs font-semibold text-foreground-on-dark">
                  Nieruchomości Spod Lady
                </span>
              </span>
              <ArrowUpRight className="size-3.5 text-foreground-on-dark-muted group-hover:text-brand-lime group-hover:rotate-12 transition-all" />
            </Link>

            <div className="flex items-center gap-2">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group/social inline-flex items-center justify-center size-10 rounded-xl border border-border-on-dark hover:border-transparent hover:bg-[#1877F2] hover:text-white transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon className="size-4" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group/social relative inline-flex items-center justify-center size-10 rounded-xl border border-border-on-dark hover:border-transparent hover:text-white transition-all overflow-hidden"
                aria-label="Instagram"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover/social:opacity-100 transition-opacity bg-[linear-gradient(45deg,#FEDA75_0%,#FA7E1E_25%,#D62976_50%,#962FBF_75%,#4F5BD5_100%)]"
                />
                <InstagramIcon className="size-4 relative" />
              </a>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-lime mb-4">
              Oferta
            </h3>
            <ul className="space-y-3 text-sm">
              {footerNav.oferta.map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className="text-foreground-on-dark-muted hover:text-foreground-on-dark transition-colors"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-lime mb-4">
              Firma
            </h3>
            <ul className="space-y-3 text-sm">
              {footerNav.firma.map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className="text-foreground-on-dark-muted hover:text-foreground-on-dark transition-colors"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-lime mb-4">
              Biuro w Gdyni
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-foreground-on-dark-muted">
                <MapPin className="size-4 mt-0.5 shrink-0 text-brand-lime" />
                <span>
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.postalCode} {siteConfig.address.city}
                </span>
              </li>
              {siteConfig.contact.phones.map((p) => (
                <li key={p.value}>
                  <a
                    href={p.href}
                    className="flex items-center gap-3 text-foreground-on-dark-muted hover:text-foreground-on-dark transition-colors"
                  >
                    <Phone className="size-4 shrink-0 text-brand-lime" />
                    {p.displayValue}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-3 text-foreground-on-dark-muted hover:text-foreground-on-dark transition-colors"
                >
                  <Mail className="size-4 shrink-0 text-brand-lime" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-foreground-on-dark-muted">
                <Clock className="size-4 shrink-0 text-brand-lime" />
                {siteConfig.contact.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border-on-dark flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-foreground-on-dark-muted">
            © {new Date().getFullYear()} {siteConfig.name}. Wszystkie prawa zastrzeżone.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
            {footerNav.pomoc.map((i) => (
              <li key={i.href}>
                <Link
                  href={i.href}
                  className="text-foreground-on-dark-muted hover:text-foreground-on-dark transition-colors"
                >
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
