import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Polityka prywatności Starnawska & Boleńska Nieruchomości. Zasady przetwarzania danych osobowych zgodnie z RODO.",
};

export default function Page() {
  return (
    <LegalPage
      title="Polityka prywatności"
      lastUpdated="13 maja 2026"
      intro="Dbamy o Twoją prywatność. Poniżej znajdziesz informacje o tym, jakie dane zbieramy, w jakim celu i jakie prawa Ci przysługują."
    >
      <h2>1. Administrator danych</h2>
      <p>
        Administratorem Twoich danych osobowych jest <strong>{siteConfig.name}</strong>{" "}
        z siedzibą w {siteConfig.address.city}, przy {siteConfig.address.street},{" "}
        {siteConfig.address.postalCode} {siteConfig.address.city} (dalej: „Administrator"
        lub „my").
      </p>
      <p>
        W sprawach dotyczących przetwarzania danych osobowych można skontaktować się
        z nami pisemnie na adres siedziby lub elektronicznie:{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
      </p>

      <h2>2. Cele i podstawy prawne przetwarzania</h2>
      <p>Przetwarzamy Twoje dane osobowe w następujących celach:</p>
      <ul>
        <li>
          <strong>Obsługa zapytań i konsultacji</strong> wysłanych przez formularz
          kontaktowy — na podstawie Twojej zgody (art. 6 ust. 1 lit. a RODO) oraz
          w celu podjęcia działań na żądanie osoby przed zawarciem umowy (art. 6
          ust. 1 lit. b RODO).
        </li>
        <li>
          <strong>Realizacja umów pośrednictwa</strong> w obrocie nieruchomościami —
          na podstawie zawartej umowy (art. 6 ust. 1 lit. b RODO).
        </li>
        <li>
          <strong>Wypełnianie obowiązków prawnych</strong> ciążących na Administratorze,
          w tym podatkowych i księgowych (art. 6 ust. 1 lit. c RODO).
        </li>
        <li>
          <strong>Marketing własnych usług</strong>, w tym przesyłanie informacji
          o nowych ofertach — wyłącznie po wyrażeniu odrębnej zgody (art. 6 ust. 1
          lit. a RODO).
        </li>
        <li>
          <strong>Ustalanie, dochodzenie lub obrona roszczeń</strong> — na podstawie
          prawnie uzasadnionego interesu Administratora (art. 6 ust. 1 lit. f RODO).
        </li>
      </ul>

      <h2>3. Zakres przetwarzanych danych</h2>
      <p>W zależności od celu, przetwarzamy następujące dane:</p>
      <ul>
        <li>Imię i nazwisko, dane kontaktowe (telefon, e-mail).</li>
        <li>
          Dane dotyczące nieruchomości (adres, parametry techniczne, status prawny) —
          jeśli zlecasz nam sprzedaż, kupno lub najem.
        </li>
        <li>
          W przypadku zawarcia umowy: PESEL, adres zamieszkania, numer dowodu
          osobistego (w zakresie wymaganym przez prawo).
        </li>
        <li>
          Dane techniczne związane z korzystaniem ze strony: adres IP, typ
          przeglądarki, urządzenie — zbierane automatycznie (więcej w polityce
          plików cookies).
        </li>
      </ul>

      <h2>4. Odbiorcy danych</h2>
      <p>Twoje dane możemy przekazać:</p>
      <ul>
        <li>
          Podmiotom świadczącym dla nas usługi (kancelarie notarialne, biura
          rachunkowe, dostawcy oprogramowania, hosting, marketing) — na podstawie
          umów powierzenia przetwarzania danych.
        </li>
        <li>
          Drugiej stronie transakcji — w zakresie niezbędnym do zawarcia umowy
          (np. dane kupującego dla sprzedającego po podpisaniu umowy
          przedwstępnej).
        </li>
        <li>
          Organom państwowym, jeśli wynika to z przepisów prawa (sądy, urzędy
          skarbowe, organy ścigania).
        </li>
      </ul>

      <h2>5. Okres przechowywania danych</h2>
      <ul>
        <li>
          Zapytania z formularza: do 12 miesięcy od ostatniego kontaktu, chyba że
          dojdzie do zawarcia umowy.
        </li>
        <li>
          Dane z umów pośrednictwa: przez czas obowiązywania umowy i 6 lat po
          jej zakończeniu (terminy przedawnienia roszczeń).
        </li>
        <li>
          Dane do celów księgowych i podatkowych: 5 lat od końca roku
          podatkowego, w którym zawarto umowę.
        </li>
        <li>
          Dane marketingowe (zgoda): do momentu wycofania zgody.
        </li>
      </ul>

      <h2>6. Twoje prawa</h2>
      <p>W związku z przetwarzaniem danych przysługują Ci następujące prawa:</p>
      <ul>
        <li>Prawo dostępu do swoich danych i otrzymania ich kopii.</li>
        <li>Prawo sprostowania (poprawiania) danych.</li>
        <li>
          Prawo do usunięcia danych („prawo do bycia zapomnianym") — w zakresie,
          w jakim przetwarzanie nie jest niezbędne do realizacji obowiązków
          prawnych lub ustalenia roszczeń.
        </li>
        <li>Prawo ograniczenia przetwarzania danych.</li>
        <li>Prawo przenoszenia danych do innego administratora.</li>
        <li>
          Prawo wniesienia sprzeciwu wobec przetwarzania danych na podstawie
          prawnie uzasadnionego interesu lub w celach marketingowych.
        </li>
        <li>
          Prawo cofnięcia zgody w dowolnym momencie (cofnięcie nie wpływa na
          legalność przetwarzania przed jego dokonaniem).
        </li>
        <li>
          Prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych
          (PUODO), ul. Stawki 2, 00-193 Warszawa.
        </li>
      </ul>

      <h2>7. Przekazywanie danych poza EOG</h2>
      <p>
        Niektórzy z naszych dostawców usług (np. hosting, narzędzia analityczne)
        mogą przetwarzać dane poza Europejskim Obszarem Gospodarczym. W takich
        przypadkach zapewniamy odpowiednie zabezpieczenia, w tym standardowe
        klauzule umowne zatwierdzone przez Komisję Europejską.
      </p>

      <h2>8. Profilowanie i decyzje automatyczne</h2>
      <p>
        Nie podejmujemy zautomatyzowanych decyzji w oparciu o profilowanie. Możemy
        natomiast wykorzystywać podstawowe narzędzia analityczne do zrozumienia,
        jak użytkownicy korzystają z naszej strony — w celu jej ulepszania.
      </p>

      <h2>9. Pliki cookies</h2>
      <p>
        Szczegółowe informacje o plikach cookies znajdziesz w naszej{" "}
        <a href="/polityka-cookies">polityce plików cookies</a>.
      </p>

      <h2>10. Zmiany polityki prywatności</h2>
      <p>
        Zastrzegamy sobie prawo do zmiany niniejszej polityki. Każdą zmianę
        opublikujemy na tej stronie, wskazując datę ostatniej aktualizacji.
        W przypadku istotnych zmian poinformujemy Cię e-mailem (jeśli mamy Twój
        adres) lub poprzez komunikat na stronie.
      </p>
    </LegalPage>
  );
}
