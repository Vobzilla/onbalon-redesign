/** @format */

import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AnnounceBanner from '@/components/AnnounceBanner'

export const metadata: Metadata = {
  title: 'Regulamin zwrotów i reklamacji — On.balon',
  description:
    'Zasady zwrotów i reklamacji w sklepie On.balon. Informacje o wyjątkach od prawa odstąpienia od umowy dla towarów szybko psujących się.',
  openGraph: {
    title: 'Regulamin zwrotów i reklamacji — On.balon',
    url: 'https://onbalon.pl/regulamin-zwrotow',
  },
}

export default function RegulaMinZwrotow() {
  return (
    <>
      <AnnounceBanner />
      <Header />
      <main className="privacy-page">
        <div className="section-inner">
          <nav className="breadcrumb" style={{ marginBottom: 32 }}>
            <Link href="/">Strona główna</Link>
            <span className="breadcrumb-sep">›</span>
            <span>Regulamin zwrotów i reklamacji</span>
          </nav>

          <h1>Regulamin zwrotów i reklamacji</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>
            Obowiązuje od: 1 stycznia 2024 r.<br />
            Sprzedawca: BARON PARTY SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ,
            ul. Księdza Hugona Kołłątaja 14/U2, Szczecin, NIP 8513281178
          </p>

          <h2>1. Charakter sprzedawanych towarów</h2>
          <p>
            On.balon sprzedaje balony lateksowe i foliowe napełnione helem, zestawy balonowe oraz
            dekoracje balonowe wykonywane na indywidualne zamówienie Klienta. Towary te mają
            charakter artykułów szybko psujących się — hel stopniowo ucieka z balonu, a ich
            właściwości dekoracyjne ulegają pogorszeniu w ciągu kilku do kilkunastu dni od wydania.
          </p>

          <h2>2. Brak prawa odstąpienia od umowy</h2>
          <p>
            Zgodnie z art. 38 pkt 3 i pkt 4 ustawy z dnia 30 maja 2014 r. o prawach konsumenta
            (Dz.U. 2014 poz. 827 ze zm.) <strong>prawo do odstąpienia od umowy zawartej na odległość
            nie przysługuje</strong> Konsumentowi w przypadku:
          </p>
          <ul>
            <li>
              <strong>Art. 38 pkt 3</strong> — umowy, w której przedmiotem świadczenia jest
              rzecz nieprefabrykowana, wyprodukowana według specyfikacji konsumenta lub
              służąca zaspokojeniu jego zindywidualizowanych potrzeb (zestawy na zamówienie,
              wybór kolorystyki, cyfry, napisy na balonach);
            </li>
            <li>
              <strong>Art. 38 pkt 4</strong> — umowy, w której przedmiotem świadczenia jest
              rzecz ulegająca szybkiemu zepsuciu lub mająca krótki termin przydatności do
              użycia (balony napełnione helem tracą swoje właściwości w ciągu kilku dni).
            </li>
          </ul>
          <p>
            Składając zamówienie, Klient potwierdza, że zapoznał się z powyższymi ograniczeniami
            i akceptuje brak możliwości zwrotu towaru.
          </p>

          <h2>3. Reklamacja — wady towaru</h2>
          <p>
            Mimo braku prawa odstąpienia, Klientowi przysługują uprawnienia z tytułu
            rękojmi za wady fizyczne i prawne towaru (art. 556 i następne Kodeksu cywilnego).
            Reklamację należy zgłosić niezwłocznie po stwierdzeniu wady, nie później niż
            w dniu dostawy lub odbioru, ze względu na specyfikę towaru.
          </p>
          <p>Reklamację można złożyć:</p>
          <ul>
            <li>
              telefonicznie lub przez Telegram w dniu dostawy/odbioru
              — <strong>wymagane zdjęcie lub wideo dokumentujące wadę</strong>;
            </li>
            <li>
              mailowo na adres{' '}
              <a href="mailto:on.balon2022@gmail.com">on.balon2022@gmail.com</a>{' '}
              z tytułem „Reklamacja" oraz numerem i datą zamówienia.
            </li>
          </ul>
          <p>
            Sprzedawca rozpatruje reklamację w terminie 14 dni roboczych od jej otrzymania.
            W przypadku uznania reklamacji Klient otrzymuje zwrot zapłaconej kwoty lub
            wymianę towaru — według wyboru Sprzedawcy, z uwzględnieniem możliwości logistycznych.
          </p>

          <h2>4. Anulowanie zamówienia przed realizacją</h2>
          <p>
            Zamówienie można anulować <strong>do momentu przekazania go do realizacji</strong>,
            tj. zazwyczaj do dnia poprzedzającego datę dostawy/odbioru. W celu anulowania
            należy niezwłocznie skontaktować się ze Sprzedawcą telefonicznie lub przez Telegram.
            Po przekazaniu zamówienia do realizacji anulowanie nie jest możliwe.
          </p>

          <h2>5. Postanowienia końcowe</h2>
          <p>
            W sprawach nieuregulowanych niniejszym regulaminem stosuje się przepisy ustawy
            o prawach konsumenta, Kodeksu cywilnego oraz innych powszechnie obowiązujących
            przepisów prawa polskiego.
          </p>
          <p>
            Konsument ma prawo skorzystać z pozasądowych sposobów rozpatrywania reklamacji
            i dochodzenia roszczeń. Szczegółowe informacje dostępne są na stronie Urzędu
            Ochrony Konkurencji i Konsumentów:{' '}
            <a href="https://www.uokik.gov.pl" target="_blank" rel="noopener noreferrer">
              www.uokik.gov.pl
            </a>.
          </p>
          <p>
            Niniejszy regulamin jest dostępny bezpłatnie pod adresem{' '}
            <a href="https://onbalon.pl/regulamin-zwrotow">onbalon.pl/regulamin-zwrotow</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
