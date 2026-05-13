import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FacebookIcon, InstagramIcon } from "@/components/ui/social-icons";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt — biuro w Gdyni, Bytomska 14/1",
  description:
    "Skontaktuj się z biurem Starnawska & Boleńska Nieruchomości w Gdyni. Telefon, e-mail, mapa. Otwarte pon–pt, 9–17.",
};

export default function KontaktPage() {
  return (
    <>
      <section className="pt-32 lg:pt-36 pb-12">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive mb-3">
              Kontakt
            </p>
            <h1 className="font-bold tracking-tight text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-foreground">
              Zadzwoń, napisz,
              <br />
              <span className="text-foreground-muted">albo wpadnij.</span>
            </h1>
            <p className="mt-6 text-lg text-foreground-muted leading-relaxed max-w-2xl">
              Jesteśmy w sercu Gdyni, dwie minuty od Skweru Kościuszki.
              Pracujemy w godzinach biurowych, ale telefony odbieramy też wieczorem.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container size="wide">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
            <div className="lg:col-span-5 space-y-6">
              <article className="rounded-3xl bg-surface-dark text-foreground-on-dark p-8 lg:p-10 relative overflow-hidden">
                <div
                  aria-hidden
                  className="absolute -top-20 -right-20 size-64 rounded-full bg-brand-lime/10 blur-3xl"
                />
                <h2 className="font-bold tracking-tight text-3xl leading-tight tracking-tight mb-8">
                  Biuro w Gdyni
                </h2>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <span className="size-11 rounded-2xl bg-brand-lime/15 flex items-center justify-center shrink-0">
                      <MapPin className="size-5 text-brand-lime" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-foreground-on-dark-muted mb-1">
                        Adres
                      </p>
                      <p className="text-lg">
                        {siteConfig.address.street}
                        <br />
                        {siteConfig.address.postalCode} {siteConfig.address.city}
                      </p>
                    </div>
                  </li>
                  {siteConfig.contact.phones.map((p, i) => (
                    <li key={p.value} className="flex items-start gap-4">
                      <span className="size-11 rounded-2xl bg-brand-lime/15 flex items-center justify-center shrink-0">
                        <Phone className="size-5 text-brand-lime" />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-foreground-on-dark-muted mb-1">
                          {i === 0 ? "Telefon" : "Drugi telefon"}
                        </p>
                        <a
                          href={p.href}
                          className="text-lg font-medium hover:text-brand-lime transition-colors tabular-nums"
                        >
                          {p.displayValue}
                        </a>
                      </div>
                    </li>
                  ))}
                  <li className="flex items-start gap-4">
                    <span className="size-11 rounded-2xl bg-brand-lime/15 flex items-center justify-center shrink-0">
                      <Mail className="size-5 text-brand-lime" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-foreground-on-dark-muted mb-1">
                        E-mail
                      </p>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-lg font-medium hover:text-brand-lime transition-colors break-all"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="size-11 rounded-2xl bg-brand-lime/15 flex items-center justify-center shrink-0">
                      <Clock className="size-5 text-brand-lime" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-foreground-on-dark-muted mb-1">
                        Godziny pracy
                      </p>
                      <p className="text-lg">{siteConfig.contact.hours}</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-10 pt-8 border-t border-border-on-dark">
                  <p className="text-xs uppercase tracking-wider text-foreground-on-dark-muted mb-4">
                    Znajdź nas też
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href={siteConfig.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center size-11 rounded-full border border-border-on-dark hover:border-brand-lime hover:bg-brand-lime/10 hover:text-brand-lime transition-all"
                      aria-label="Facebook"
                    >
                      <FacebookIcon className="size-4" />
                    </a>
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center size-11 rounded-full border border-border-on-dark hover:border-brand-lime hover:bg-brand-lime/10 hover:text-brand-lime transition-all"
                      aria-label="Instagram"
                    >
                      <InstagramIcon className="size-4" />
                    </a>
                  </div>
                </div>
              </article>

              <Button asChild variant="lime" size="lg" className="w-full">
                <Link href="/konsultacja">
                  Wolisz formularz? Tędy
                  <ArrowRight />
                </Link>
              </Button>
            </div>

            <div className="lg:col-span-7">
              <div className="relative h-full min-h-[480px] rounded-3xl overflow-hidden border border-border bg-gray-100">
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${siteConfig.geo.longitude - 0.005},${siteConfig.geo.latitude - 0.002},${siteConfig.geo.longitude + 0.005},${siteConfig.geo.latitude + 0.002}&layer=mapnik&marker=${siteConfig.geo.latitude},${siteConfig.geo.longitude}`}
                  className="absolute inset-0 w-full h-full grayscale-[0.15]"
                  title={`Mapa: ${siteConfig.address.full}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute bottom-4 right-4 max-w-xs bg-surface rounded-2xl p-4 shadow-[var(--shadow-card)]">
                  <p className="text-xs uppercase tracking-wider text-brand-olive font-semibold mb-1">
                    Tu jesteśmy
                  </p>
                  <p className="font-medium text-foreground text-sm leading-snug">
                    {siteConfig.address.street}
                    <br />
                    {siteConfig.address.city}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address.full)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand-forest hover:gap-1.5 transition-all"
                  >
                    Otwórz w Google Maps
                    <ArrowRight className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
