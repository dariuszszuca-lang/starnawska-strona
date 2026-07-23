# ROADMAP — Starnawska & Boleńska Nieruchomości (klient)

> Wzór: `AITeam/PROJEKTY/AUTOFIRMA/ROADMAP.md`. Prowadzi: Darek. Wdraża: @cto. Utworzona 2026-07-23.
> Repo: `dariuszszuca-lang/starnawska-strona` · lokalnie `~/dev/wlasne/starnawska-strona`. Status: AKTYWNY, produkcja działa.

## 🎯 CEL

**Po co ten projekt istnieje:** firmowa strona biura nieruchomości Starnawska & Boleńska (Gdynia) — prezentuje aktualne oferty (auto z EstiCRM), zespół i formularz konsultacji/lead capture. Zastąpiła stary WordPress na IQ (bez SEO i Open Graph).
**Miara sukcesu:** strona live na własnej domenie z SEO i OG; oferty ESTI zawsze aktualne; leady z formularza konsultacji.
**Dla kogo:** klientka (biuro Starnawska & Boleńska) + jej klienci.
**Model:** kliencki (strona + obsługa).

**Infra (bez sekretów):** Next.js 16 + React 19 + Tailwind v4, Vercel. LIVE na `starnawska.pl` (migracja z WP 31.05.2026, DNS+poczta zostają na IQ). ESTI przez API (company 18, status „3"), cache 1h + fallback `data/offers.json`. Cron `/api/cron/sync-esti` (`30 5 * * *`). Poczta: nodemailer + SMTP IQ. Monitoring: GitHub Actions `esti-kontrola` (wspólne z Dom Hunter). Sekrety w `~/.secrets/` — NIE w tym pliku.

## Jak czytać ten plik

Goła lista DO ZROBIENIA. Rzecz zrobiona znika stąd i ląduje w changelogu. Liczby i stan sprawdzamy w żywym systemie, nie w roadmapie.

---

## PRIORYTET WYSOKI

- [ ] [ODPORNOŚĆ], odświeżyć fallbackowy snapshot `data/offers.json` (dziś 28 ofert, lastSync 2026-07-07) i ustalić rytm jego odświeżania
      priorytet: wysoki
      po co: gdy API ESTI padnie, strona pokaże stan sprzed miesięcy. Fallback bez odświeżania to fałszywe bezpieczeństwo.
      status: nowy

## PRIORYTET ŚREDNI

- [ ] [ESTI], uporządkować/wyłączyć redundantny cron FTP `sync-esti` (live API jest już źródłem prawdy)
      priorytet: średni
      po co: codzienny FTP + zamrożony snapshot to ruchome części, które mogą serwować stare dane. Jeden mechanizm zamiast trzech.
      status: nowy

- [ ] [OBRAZY], kompresja źródeł zdjęć przy syncu ofert, żeby móc bezpiecznie wrócić do Vercel Image Optimization
      priorytet: średni
      po co: dziś `images.unoptimized: true`, bo optymalizacja przekroczyła płatny limit transformacji. Kompresja u źródła odblokowuje auto-WebP/resize bez kosztu.
      status: nowy

- [ ] [CZYSTOŚĆ], zweryfikować `components/forms/newsletter-form.tsx` (jedyne odwołanie do Supabase, reszta kodu nie używa) — działa czy martwy kod
      priorytet: średni
      po co: potwierdzić, że zapis newslettera działa, albo usunąć martwy kod, żeby nie mylił.
      status: nowy

## PRIORYTET NISKI

- [ ] [DOKUMENTACJA], zaktualizować README/pamięć do rzeczywistości (README mówi Supabase/Resend/Sanity; realnie nodemailer/SMTP IQ, własny panel admin GitHub, live API)
      priorytet: niski
      po co: nieaktualny README wprowadza w błąd przy kolejnych sesjach.
      status: nowy

- [ ] [MONITORING], rozważyć drugą warstwę: hit `/api/health/offers` na Vercel Cron obok GitHub Actions
      priorytet: niski
      po co: niezależne, drugie wykrywanie rozjazdu ESTI↔strona.
      status: nowy

---

## RYZYKA / PUŁAPKI (nie zadania — do świadomości)

- 🔴 NIE ruszać MX/SPF/DKIM/DMARC `starnawska.pl` (dyrektywa Darka 08.06) — DMARC `p=none` celowo, trzyma maile Joli poza spamem.
- 🔴 NIE zmieniać hasła FTP konta `starnawska_esti` (panel IQ nadpisuje, nie pokazuje — zepsuje wtyczkę ESTI na starym WP).
- Problemy z ofertami → sprawdzać NAJPIERW live API `/offer/list`, NIE FTP (FTP to historyczne źródło awarii).
- „Obrazki znikają" na Vercel = limit optymalizacji, nie brakujące pliki (`curl -sI .../_next/image | grep x-vercel-error`).

## CZEKA NA OK WŁAŚCICIELA (skrót)

1. Decyzja o wyłączeniu crona FTP (czy zostawiamy jako zapas, czy tniemy).
