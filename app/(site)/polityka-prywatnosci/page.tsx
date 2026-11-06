/** @format */

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Polityka prywatności i cookies — On.balon",
  description: "Polityka prywatności serwisu onbalon.pl",
  alternates: { canonical: "/polityka-prywatnosci" },
};

const EMAIL = "on.balon2022@gmail.com";

export default function PolitykaPrywatnosci() {
  return (
    <>
      <Header />
      <main className="privacy-page">
        <div className="section-inner">
          <h1>Polityka prywatności i plików cookies</h1>

          <p>Ostatnia aktualizacja: 6 listopada 2026</p>

          <h2>Kto jest administratorem danych</h2>
          <p>
            Administratorem Twoich danych osobowych jest BARON PARTY SPÓŁKA Z
            OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ, NIP 8513281178, Ks. Hugona Kołłątaja
            14 / U2, 71-525 Szczecin, Polska, prowadzący sklep On.balon przy ul.
            Księdza Hugona Kołłątaja 14/u2, 71-525 Szczecin (dalej: „On.balon”,
            „my”). W sprawach dotyczących danych osobowych możesz się z nami
            kontaktować pod adresem e-mail{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a> lub telefonicznie: +48 732
            977 561.
          </p>

          <h2>Jakie dane zbieramy</h2>
          <ul>
            <li>
              Dane z formularza zamówienia: imię i nazwisko, numer telefonu,
              adres dostawy, data i godzina dostawy, treść uwag do zamówienia
              oraz zamówione produkty.
            </li>
            <li>
              Dane potrzebne do faktury, jeśli o nią poprosisz (np. nazwa firmy
              i NIP).
            </li>
            <li>
              Dane z kontaktu z nami: telefonicznie, przez WhatsApp, Messenger,
              Telegram, Instagram lub e-mail — w zakresie, w jakim nam je
              przekażesz.
            </li>
            <li>
              Dane o korzystaniu ze strony, zbierane za pomocą plików cookies i
              podobnych technologii — szczegóły w sekcji „Pliki cookies”.
            </li>
          </ul>

          <h2>W jakim celu i na jakiej podstawie</h2>
          <ul>
            <li>
              Realizacja zamówienia: potwierdzenie, przygotowanie i dostawa
              balonów lub odbiór osobisty — art. 6 ust. 1 lit. b RODO (umowa).
            </li>
            <li>
              Wystawienie faktury i prowadzenie księgowości — art. 6 ust. 1 lit.
              c RODO (obowiązek prawny).
            </li>
            <li>
              Kontakt w sprawie zamówienia i odpowiedzi na pytania — art. 6 ust.
              1 lit. b lub f RODO (umowa lub nasz uzasadniony interes).
            </li>
            <li>
              Obsługa reklamacji i dochodzenie lub obrona roszczeń — art. 6 ust.
              1 lit. f RODO.
            </li>
            <li>
              Statystyki odwiedzin, mierzenie skuteczności reklam i wyświetlanie
              reklam osobom, które odwiedziły naszą stronę — art. 6 ust. 1 lit.
              a RODO (Twoja zgoda wyrażona w banerze cookies).
            </li>
            <li>
              Zapewnienie bezpieczeństwa i prawidłowego działania strony — art.
              6 ust. 1 lit. f RODO.
            </li>
          </ul>

          <h2>Komu przekazujemy dane</h2>
          <p>
            Twoje dane mogą otrzymać wyłącznie podmioty, które pomagają nam
            prowadzić sklep:
          </p>
          <ul>
            <li>Netlify, Inc. — hosting strony internetowej;</li>
            <li>
              Cloudflare, Inc. — sieć dostarczania treści i ochrona strony;
            </li>
            <li>
              Supabase, Inc. — baza danych katalogu produktów (serwery w Unii
              Europejskiej);
            </li>
            <li>
              Telegram — komunikator, w którym otrzymujemy powiadomienia o
              nowych zamówieniach wraz z danymi z formularza;
            </li>
            <li>
              Google Ireland Limited — Google Analytics i Google Ads (tylko po
              wyrażeniu zgody na cookies);
            </li>
            <li>
              Meta Platforms Ireland Limited — Meta Pixel (tylko po wyrażeniu
              zgody na cookies);
            </li>
            <li>
              osoby realizujące dostawę oraz biuro rachunkowe — w zakresie
              potrzebnym do dostawy i rozliczeń.
            </li>
          </ul>
          <p>Nie sprzedajemy Twoich danych.</p>

          <h2>Przekazywanie danych poza Europejski Obszar Gospodarczy</h2>
          <p>
            Część z wymienionych dostawców (m.in. Netlify, Cloudflare, Google,
            Meta i Telegram) może przetwarzać dane na serwerach poza EOG, w tym
            w Stanach Zjednoczonych. W takich przypadkach przekazanie odbywa się
            na podstawie decyzji Komisji Europejskiej stwierdzającej odpowiedni
            stopień ochrony (np. EU-U.S. Data Privacy Framework) lub
            standardowych klauzul umownych zatwierdzonych przez Komisję
            Europejską.
          </p>

          <h2>Jak długo przechowujemy dane</h2>
          <ul>
            <li>
              Dane zamówienia — przez czas potrzebny do jego realizacji, a
              następnie do upływu terminu przedawnienia ewentualnych roszczeń.
            </li>
            <li>
              Dane na fakturach — przez 5 lat od końca roku, w którym upłynął
              termin płatności podatku.
            </li>
            <li>
              Dane z kontaktu — do czasu zakończenia sprawy, a potem do upływu
              terminu przedawnienia roszczeń.
            </li>
            <li>
              Dane z plików cookies — przez okres podany w sekcji „Pliki
              cookies” lub do wycofania zgody.
            </li>
          </ul>

          <h2>Twoje prawa</h2>
          <p>
            Masz prawo do dostępu do swoich danych, ich sprostowania, usunięcia,
            ograniczenia przetwarzania, przenoszenia danych oraz wniesienia
            sprzeciwu wobec przetwarzania opartego na naszym uzasadnionym
            interesie. Jeśli przetwarzamy dane na podstawie zgody, możesz ją w
            każdej chwili wycofać — nie wpływa to na zgodność z prawem
            przetwarzania przed jej wycofaniem. Aby skorzystać ze swoich praw,
            napisz do nas na <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Masz też
            prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych (ul.
            Stawki 2, 00-193 Warszawa).
          </p>

          <h2>Czy musisz podać dane</h2>
          <p>
            Podanie danych w formularzu zamówienia jest dobrowolne, ale
            niezbędne do przyjęcia i realizacji zamówienia. Bez numeru telefonu
            nie możemy potwierdzić zamówienia, a bez adresu — dostarczyć
            balonów.
          </p>

          <h2>Pliki cookies</h2>
          <p>
            Pliki cookies to niewielkie pliki zapisywane w Twojej przeglądarce.
            Korzystamy z nich w następujący sposób:
          </p>
          <ul>
            <li>
              Niezbędne — zapamiętują zawartość koszyka i Twój wybór w banerze
              cookies (dane zapisane w pamięci przeglądarki). Nie wymagają
              zgody.
            </li>
            <li>
              Analityczne — Google Analytics (_ga, _ga_*), do 2 lat. Pozwalają
              nam sprawdzić, jak korzystasz ze strony.
            </li>
            <li>
              Reklamowe — Google Ads (_gcl_au, _gcl_aw, do 90 dni) oraz Meta
              Pixel (_fbp, _fbc, do 90 dni). Pozwalają mierzyć skuteczność
              reklam i wyświetlać reklamy osobom, które odwiedziły naszą stronę.
            </li>
          </ul>
          <p>
            Cookies analityczne i reklamowe zapisujemy wyłącznie po kliknięciu
            „Akceptuję” w banerze. Bez zgody Google otrzymuje jedynie anonimowe
            sygnały bez plików cookies (tzw. tryb zgody Google). Jeśli wyrazisz
            zgodę, Google może porównywać zaszyfrowany (zahaszowany) numer
            telefonu z formularza zamówienia ze swoimi danymi, aby dokładniej
            mierzyć skuteczność reklam.
          </p>
          <p>
            Swój wybór możesz w każdej chwili zmienić w{" "}
            {/* Opens the cookie banner, like the footer link (CookieBanner). */}
            <a href="#cookie-settings" data-cookie-settings>
              Ustawienia cookies
            </a>{" "}
            (link również w stopce strony). Możesz też usunąć cookies w
            ustawieniach przeglądarki.
          </p>

          <h2>Zmiany polityki</h2>
          <p>
            Możemy aktualizować tę politykę, np. gdy zmienimy dostawców usług.
            Aktualna wersja jest zawsze dostępna na tej stronie, a datę
            ostatniej zmiany podajemy na górze.
          </p>

          <p>
            Informacje o zwrotach i reklamacjach znajdziesz w regulaminie
            zwrotów: <a href="/regulamin-zwrotow">/regulamin-zwrotow</a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
