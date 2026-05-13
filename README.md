# Starnawska & Boleńska Nieruchomości

Strona firmowa biura nieruchomości w Gdyni. Aktywne repo poza iCloud:
`~/dev/wlasne/starnawska-strona/`.

## Stack

- **Next.js 16** (App Router, Turbopack, ISR)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** + design tokens (paleta szaro-zielona z logo)
- **shadcn/ui** patterns (Radix UI primitives)
- **Framer Motion** (animacje)
- **Sanity Studio** (planowany panel admina dla właścicielek)
- **Supabase** (lead capture + cache ofert ESTI)
- **Resend** (formularz konsultacji)
- **Vercel** (hosting + auto-deploy + Cron)

## Komendy

```bash
npm run dev       # localhost:3000
npm run build     # production build
npm run start     # serwer produkcyjny
npm run lint      # eslint
```

## Struktura

```
app/
├── layout.tsx                # root layout (header + footer + fonty)
├── page.tsx                  # strona główna
├── zespol/
│   ├── page.tsx              # lista zespołu
│   └── [slug]/page.tsx       # wizytówki agentek (SSG)
├── oferty/                   # wyszukiwarka ofert (TODO: integracja ESTI)
├── doradztwo/                # opis usług
├── blog/                     # 3 artykuły SEO + LLM (TODO)
├── kontakt/                  # mapa + dane (TODO)
└── konsultacja/              # formularz (TODO)

components/
├── layout/{header,footer}.tsx
├── sections/                 # sekcje strony głównej (hero, bento, usp, cta…)
└── ui/                       # button, container, logo, social-icons

lib/
├── site.ts                   # dane firmy (NAP, social, godziny)
├── team.ts                   # zespół (placeholder; docelowo z Sanity)
├── utils.ts                  # cn, formatPrice, slugify
└── esti/                     # integracja ESTI CRM (TODO)
```

## ESTI CRM — eksport ofert

Klient ma w EstiCRM aktywny portal "Starnawska.pl Esti" eksportujący
XML w formacie EstiCRMXml na FTP `starnawska.iq.pl:21` z loginem
`starnawska_esti`. Eksport leci codziennie ok. 05:00.

Plan integracji: Vercel Cron co godzinę → FTP fetch → parser XML →
cache w Supabase → ISR.

## Status

Pierwszy push: pierwsza wersja designu (kierunek "Modern Bento" — szarość
+ zieleń intensywna z logo). Wszystkie strony budują się statycznie,
SEO metadata gotowe, layout responsywny.

Do zrobienia (po kolei):
- [ ] Integracja ESTI (wyszukiwarka, lista, szczegół oferty)
- [ ] Formularz konsultacji + Resend
- [ ] Sanity Studio (panel admina dla Patrycji i Jolanty)
- [ ] Blog 3 artykuły SEO + LLM
- [ ] Baner RODO (lewy dolny róg)
- [ ] Sitemap, robots.txt, JSON-LD (RealEstateAgent, Person, Article)

## Klient

**Starnawska & Boleńska Nieruchomości**
ul. Bytomska 14/1, 81-509 Gdynia
☎ 532 843 660, 608 692 552
🌐 https://starnawska.pl

Właścicielki: **Patrycja Sudwój-Boleńska**, **Jolanta Starnawska**.
