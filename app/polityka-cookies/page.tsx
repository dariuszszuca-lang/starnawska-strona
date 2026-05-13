import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Polityka plików cookies",
  description:
    "Polityka plików cookies Starnawska & Boleńska Nieruchomości. Jakie cookies zbieramy i jak nimi zarządzać.",
};

export default function Page() {
  return (
    <LegalPage
      title="Polityka plików cookies"
      lastUpdated="13 maja 2026"
      intro="Używamy plików cookies, żeby strona działała poprawnie i żeby lepiej rozumieć, czego potrzebują nasi użytkownicy. Tutaj wyjaśniamy, co to znaczy."
    >
      <h2>1. Czym są pliki cookies</h2>
      <p>
        Pliki cookies („ciasteczka") to niewielkie pliki tekstowe zapisywane przez
        przeglądarkę na Twoim urządzeniu (komputer, telefon, tablet) podczas
        odwiedzania stron internetowych. Pozwalają stronom rozpoznać Twoje
        urządzenie i np. zapamiętać Twoje preferencje.
      </p>

      <h2>2. Jakie cookies stosujemy</h2>
      <p>
        Na stronie {siteConfig.url} stosujemy następujące kategorie plików cookies:
      </p>

      <h3>Niezbędne (zawsze aktywne)</h3>
      <p>
        Konieczne do prawidłowego działania strony. Bez nich nie zadziałają
        formularze, sesje, ani podstawowe funkcjonalności. Nie wymagają zgody.
      </p>
      <ul>
        <li>Zapamiętywanie Twoich preferencji cookies (np. tej polityki).</li>
        <li>Sesja podczas wypełniania formularza konsultacji.</li>
        <li>Ochrona przed automatycznymi zapytaniami (CSRF, rate limiting).</li>
      </ul>

      <h3>Analityczne (opcjonalne, za zgodą)</h3>
      <p>
        Pomagają nam zrozumieć, jak użytkownicy korzystają ze strony. Dane są
        anonimowe (zagregowane).
      </p>
      <ul>
        <li>Vercel Analytics — anonimowe statystyki ruchu (bez cookies śledzących).</li>
      </ul>

      <h3>Marketingowe (opcjonalne, za zgodą)</h3>
      <p>
        Pozwalają nam dostosowywać reklamy do Twoich zainteresowań (remarketing).
        Stosujemy je tylko wtedy, gdy wyrazisz zgodę.
      </p>

      <h2>3. Jak zarządzać cookies</h2>
      <p>Możesz zarządzać preferencjami cookies na trzy sposoby:</p>
      <ul>
        <li>
          <strong>Banner cookies</strong> — przy pierwszej wizycie zobaczysz okno,
          w którym możesz wybrać, na które cookies się zgadzasz. Po wyborze
          decyzję możesz w każdej chwili zmienić, klikając ikonę tarczy w lewym
          dolnym rogu strony.
        </li>
        <li>
          <strong>Ustawienia przeglądarki</strong> — większość przeglądarek
          pozwala blokować lub usuwać cookies. Sprawdź dokumentację swojej
          przeglądarki (Chrome, Firefox, Safari, Edge).
        </li>
        <li>
          <strong>Wycofanie zgody</strong> — możesz w każdym momencie wycofać
          udzieloną zgodę. Cofnięcie nie wpływa na zgodność z prawem
          przetwarzania przed wycofaniem.
        </li>
      </ul>

      <h2>4. Konsekwencje zablokowania cookies</h2>
      <p>
        Zablokowanie niezbędnych cookies może spowodować, że niektóre funkcje
        strony przestaną działać poprawnie (np. formularz konsultacji,
        zapamiętywanie preferencji). Zablokowanie cookies analitycznych nie
        wpływa na działanie strony.
      </p>

      <h2>5. Cookies podmiotów trzecich</h2>
      <p>
        Niektóre cookies mogą być ustawiane przez podmioty trzecie (np. dostawca
        hostingu i analityki). W takich przypadkach przetwarzanie regulują
        polityki tych podmiotów.
      </p>

      <h2>6. Kontakt</h2>
      <p>
        Jeśli masz pytania dotyczące cookies lub przetwarzania danych
        osobowych, skontaktuj się z nami:{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>
        .
      </p>
    </LegalPage>
  );
}
