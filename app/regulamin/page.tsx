import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Regulamin serwisu",
  description:
    "Regulamin korzystania ze strony Starnawska & Boleńska Nieruchomości.",
};

export default function Page() {
  return (
    <LegalPage
      title="Regulamin serwisu"
      lastUpdated="13 maja 2026"
      intro="Zasady korzystania ze strony internetowej Starnawska & Boleńska Nieruchomości."
    >
      <h2>§1. Postanowienia ogólne</h2>
      <ol>
        <li>
          Niniejszy regulamin określa zasady korzystania ze strony internetowej
          dostępnej pod adresem {siteConfig.url} (dalej: „Serwis").
        </li>
        <li>
          Właścicielem i operatorem Serwisu jest <strong>{siteConfig.name}</strong>,
          z siedzibą w {siteConfig.address.city}, przy {siteConfig.address.street},{" "}
          {siteConfig.address.postalCode} {siteConfig.address.city}.
        </li>
        <li>
          Korzystanie z Serwisu oznacza akceptację niniejszego regulaminu oraz{" "}
          <a href="/polityka-prywatnosci">polityki prywatności</a>.
        </li>
      </ol>

      <h2>§2. Zakres usług</h2>
      <ol>
        <li>Serwis świadczy usługi informacyjne dotyczące:</li>
        <ul>
          <li>oferty pośrednictwa w obrocie nieruchomościami,</li>
          <li>aktualnych ofert sprzedaży, kupna i najmu nieruchomości,</li>
          <li>doradztwa kredytowego, home stagingu i innych usług dodatkowych,</li>
          <li>informacji o zespole i metodyce pracy.</li>
        </ul>
        <li>
          Serwis udostępnia formularz kontaktowy umożliwiający przesłanie
          zapytania, które jest następnie obsługiwane przez pracowników biura
          drogą telefoniczną lub mailową.
        </li>
        <li>
          Prezentowane oferty mają charakter informacyjny i nie stanowią oferty
          w rozumieniu art. 66 § 1 Kodeksu cywilnego. Szczegóły transakcji
          ustalane są indywidualnie po kontakcie z biurem.
        </li>
      </ol>

      <h2>§3. Wymagania techniczne</h2>
      <p>
        Korzystanie z Serwisu wymaga: dostępu do internetu, przeglądarki
        internetowej w aktualnej wersji (Chrome, Firefox, Safari, Edge),
        włączonej obsługi JavaScript i akceptacji niezbędnych plików cookies.
      </p>

      <h2>§4. Prawa autorskie</h2>
      <ol>
        <li>
          Wszystkie treści zamieszczone w Serwisie, w tym teksty, zdjęcia,
          grafiki, logo, układ i kompozycja stron, stanowią przedmiot praw
          autorskich należących do {siteConfig.name} lub osób upoważnionych.
        </li>
        <li>
          Kopiowanie, modyfikowanie, dystrybucja lub komercyjne wykorzystanie
          jakichkolwiek elementów Serwisu wymaga wcześniejszej pisemnej zgody.
        </li>
        <li>
          Wykorzystanie zdjęć nieruchomości jest dozwolone wyłącznie po
          podpisaniu umowy pośrednictwa.
        </li>
      </ol>

      <h2>§5. Odpowiedzialność</h2>
      <ol>
        <li>
          Dokładamy wszelkich starań, by informacje zamieszczone w Serwisie
          były aktualne i prawdziwe. Nie ponosimy jednak odpowiedzialności za
          szkody wynikające z wykorzystania informacji w sposób inny niż
          informacyjny.
        </li>
        <li>
          Nie ponosimy odpowiedzialności za czasowe przerwy w dostępności
          Serwisu wynikające z przyczyn technicznych lub działania siły
          wyższej.
        </li>
        <li>
          Linki do zewnętrznych stron są udostępniane wyłącznie dla wygody
          użytkowników. Nie ponosimy odpowiedzialności za treści ani polityki
          podmiotów trzecich.
        </li>
      </ol>

      <h2>§6. Reklamacje</h2>
      <p>
        Wszelkie uwagi dotyczące funkcjonowania Serwisu można zgłaszać na adres
        e-mail:{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>
       . Reklamacje rozpatrujemy w terminie 14 dni roboczych od daty
        otrzymania.
      </p>

      <h2>§7. Postanowienia końcowe</h2>
      <ol>
        <li>
          Regulamin może ulec zmianie. O każdej zmianie poinformujemy poprzez
          publikację nowej wersji w Serwisie oraz wskazanie daty ostatniej
          aktualizacji.
        </li>
        <li>
          W sprawach nieuregulowanych niniejszym regulaminem zastosowanie mają
          przepisy prawa polskiego, w szczególności Kodeksu cywilnego oraz
          ustawy o świadczeniu usług drogą elektroniczną.
        </li>
        <li>
          Spory wynikające z korzystania z Serwisu rozstrzygane będą przez sąd
          właściwy dla siedziby {siteConfig.name}.
        </li>
      </ol>
    </LegalPage>
  );
}
