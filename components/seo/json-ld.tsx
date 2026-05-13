import { siteConfig } from "@/lib/site";
import { team } from "@/lib/team";

/**
 * Główny RealEstateAgent + Organization JSON-LD.
 * Wstaw raz w app/layout.tsx (head) albo na stronie głównej.
 */
export function RealEstateAgentSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
    legalName: "Starnawska & Boleńska Nieruchomości s.c.",
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/logo.png`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    foundingDate: `${siteConfig.foundedYear}-01-01`,
    telephone: siteConfig.contact.phones.map((p) => p.value),
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      postalCode: siteConfig.address.postalCode,
      addressLocality: siteConfig.address.city,
      addressRegion: "pomorskie",
      addressCountry: "PL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: [
      { "@type": "City", name: "Gdynia" },
      { "@type": "City", name: "Sopot" },
      { "@type": "City", name: "Gdańsk" },
      { "@type": "AdministrativeArea", name: "województwo pomorskie" },
    ],
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.metrics.rating,
      reviewCount: "120",
      bestRating: "5",
    },
    employee: team.map((m) => ({
      "@type": "Person",
      "@id": `${siteConfig.url}/zespol/${m.slug}#person`,
      name: m.fullName,
      givenName: m.firstName,
      familyName: m.lastName,
      jobTitle: m.role,
      image: `${siteConfig.url}${m.photo}`,
      telephone: m.phone,
      worksFor: { "@id": `${siteConfig.url}#organization` },
      url: `${siteConfig.url}/zespol/${m.slug}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Person schema dla podstrony agentki.
 */
export function PersonSchema({
  member,
}: {
  member: (typeof team)[number];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/zespol/${member.slug}#person`,
    name: member.fullName,
    givenName: member.firstName,
    familyName: member.lastName,
    jobTitle: member.role,
    image: `${siteConfig.url}${member.photo}`,
    telephone: member.phone,
    email: member.email,
    description: member.bio,
    url: `${siteConfig.url}/zespol/${member.slug}`,
    knowsLanguage: member.languages,
    worksFor: {
      "@type": "RealEstateAgent",
      "@id": `${siteConfig.url}#organization`,
      name: siteConfig.name,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      postalCode: siteConfig.address.postalCode,
      addressLocality: siteConfig.address.city,
      addressCountry: "PL",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Breadcrumbs schema.
 */
export function BreadcrumbsSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((i, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: i.name,
      item: i.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
