import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/social-icons";
import { NewsletterForm } from "@/components/forms/newsletter-form";
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
  return (
    <footer className="bg-surface-dark text-foreground-on-dark mt-24">
      {/* Newsletter bar */}
      <Container size="wide" as="div" className="py-12 border-b border-border-on-dark">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-lime mb-2">
              Nowe oferty co poniedziałek
            </p>
            <h2 className="font-bold tracking-tight text-2xl lg:text-3xl tracking-tight">
              Najlepsze oferty wpadają do skrzynki, zanim trafią do portali.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <NewsletterForm />
          </div>
        </div>
      </Container>

      <Container size="wide" as="div" className="py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-12 gap-x-8">
          <div className="col-span-2 md:col-span-4 space-y-6">
            <Logo variant="dark" size="lg" />
            <p className="text-sm leading-relaxed text-foreground-on-dark-muted max-w-sm">
              Biuro nieruchomości w Gdyni. Sprzedaż, wynajem, doradztwo. Od 2011 roku
              pomagamy klientom z Trójmiasta i okolic znaleźć swoje miejsce.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center size-10 rounded-full border border-border-on-dark hover:border-brand-lime hover:bg-brand-lime/10 hover:text-brand-lime transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon className="size-4" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center size-10 rounded-full border border-border-on-dark hover:border-brand-lime hover:bg-brand-lime/10 hover:text-brand-lime transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="size-4" />
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
