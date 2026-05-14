const BASE = 'https://raw.githubusercontent.com/Vobzilla/on.balon/main/img'

export type Category =
  | 'Roczek'
  | '18-ka'
  | 'Urodziny'
  | 'Dla niej'
  | 'Dla niego'
  | 'Chrzest & Komunia'
  | 'Biznes'

export type Product = {
  id: number
  name: string
  category: Category
  price: number
  image: string
}

export const CATEGORIES: Category[] = [
  'Roczek',
  '18-ka',
  'Urodziny',
  'Dla niej',
  'Dla niego',
  'Chrzest & Komunia',
  'Biznes',
]

export const products: Product[] = [
  // ── Roczek – balony ──────────────────────────────────────────────────────
  { id: 1,  name: 'Balony na Roczek Biało-Różowe',         category: 'Roczek', price: 129, image: `${BASE}/hel/one/balony-1-bialo-rozowy.webp` },
  { id: 2,  name: 'Balony na Roczek Boss Baby',             category: 'Roczek', price: 149, image: `${BASE}/hel/one/balony-1-boss-baby.webp` },
  { id: 3,  name: 'Balony na Roczek Chmurka Białe',        category: 'Roczek', price: 119, image: `${BASE}/hel/one/balony-1-chmurka-biale.webp` },
  { id: 4,  name: 'Balony na Roczek Dino Złote',           category: 'Roczek', price: 139, image: `${BASE}/hel/one/balony-1-dino-zloty.webp` },
  { id: 5,  name: 'Balony na Roczek Miś Srebrny',          category: 'Roczek', price: 129, image: `${BASE}/hel/one/balony-1-mis-srebrny.webp` },
  { id: 6,  name: 'Balony na Roczek Miś Złoto-Serduszka',  category: 'Roczek', price: 139, image: `${BASE}/hel/one/balony-1-mis-zloto-serca.webp` },
  { id: 7,  name: 'Balony na Roczek Miś Złoty',            category: 'Roczek', price: 129, image: `${BASE}/hel/one/balony-1-mis-zloty.webp` },
  { id: 8,  name: 'Balony na Roczek Niebiesko-Zielone',    category: 'Roczek', price: 129, image: `${BASE}/hel/one/balony-1-niebiesko-zielone.webp` },
  { id: 9,  name: 'Balony na Roczek Olivia Różowe',        category: 'Roczek', price: 139, image: `${BASE}/hel/one/balony-1-olivia-rozowe.webp` },
  { id: 10, name: 'Balony na Roczek Różowo-Białe',         category: 'Roczek', price: 119, image: `${BASE}/hel/one/balony-1-rozowo-biale.webp` },
  { id: 11, name: 'Balony na Roczek Różowo-Złote',         category: 'Roczek', price: 139, image: `${BASE}/hel/one/balony-1-rozowo-zloty.webp` },
  { id: 12, name: 'Balony na Roczek Serce Białe',          category: 'Roczek', price: 129, image: `${BASE}/hel/one/balony-1-serce-biale.webp` },
  { id: 13, name: 'Balony na Roczek z Myszką',             category: 'Roczek', price: 149, image: `${BASE}/hel/one/balony-1-z-myszka.webp` },

  // ── Roczek – dekoracje ───────────────────────────────────────────────────
  { id: 14, name: 'Dekoracja Roczek Baby Boss',            category: 'Roczek', price: 189, image: `${BASE}/deko/one/dekoracja-baby-boss.webp` },
  { id: 15, name: 'Dekoracja Roczek Brązowo-Biała',        category: 'Roczek', price: 179, image: `${BASE}/deko/one/dekoracja-brazowo-biala-na-roczek.webp` },
  { id: 16, name: 'Dekoracja Roczek Miętowa',              category: 'Roczek', price: 179, image: `${BASE}/deko/one/dekoracja-mietowa-na-roczek.webp` },
  { id: 17, name: 'Dekoracja Roczek Niebieska',            category: 'Roczek', price: 179, image: `${BASE}/deko/one/dekoracja-niebieska-na-roczek.webp` },
  { id: 18, name: 'Dekoracja Roczek Niebiesko-Srebrna',    category: 'Roczek', price: 189, image: `${BASE}/deko/one/dekoracja-niebiesko-srebrna-na-roczek.webp` },
  { id: 19, name: 'Dekoracja Roczek Niebiesko-Szaro-Srebrna', category: 'Roczek', price: 199, image: `${BASE}/deko/one/dekoracja-niebiesko-szaro-srebrna-na-roczek.webp` },
  { id: 20, name: 'Dekoracja Roczek Niebiesko-Złota',      category: 'Roczek', price: 199, image: `${BASE}/deko/one/dekoracja-niebiesko-zlota-na-roczek.webp` },
  { id: 21, name: 'Dekoracja Roczek Różowa',               category: 'Roczek', price: 179, image: `${BASE}/deko/one/dekoracja-rozowa-na-roczek.webp` },
  { id: 22, name: 'Dekoracja Roczek Różowo-Fioletowa',     category: 'Roczek', price: 189, image: `${BASE}/deko/one/dekoracja-rozowo-fioletowa-na-roczek.webp` },
  { id: 23, name: 'Dekoracja Roczek Różowo-Szara',         category: 'Roczek', price: 179, image: `${BASE}/deko/one/dekoracja-rozowo-szara-na-roczek.webp` },
  { id: 24, name: 'Dekoracja Roczek z Jednorożcem',        category: 'Roczek', price: 199, image: `${BASE}/deko/one/dekoracja-z-jednorożcem-na-roczek.webp` },

  // ── 18-ka – balony ───────────────────────────────────────────────────────
  { id: 25, name: 'Balony 18-tka Różowo-Złote',            category: '18-ka', price: 149, image: `${BASE}/hel/18-ka/balony-18-lat-rozowe-zloto.webp` },
  { id: 26, name: 'Balony 18-tka Srebrne',                 category: '18-ka', price: 139, image: `${BASE}/hel/18-ka/balony-18-lat-srebrne.webp` },
  { id: 27, name: 'Balony 18-tka Różowo-Złote Premium',    category: '18-ka', price: 159, image: `${BASE}/hel/18-ka/balony-na-18-urodziny-rozowe-zloto.webp` },
  { id: 28, name: 'Balony 18-tka Złoto-Czarne',            category: '18-ka', price: 149, image: `${BASE}/hel/18-ka/balony-na-18-urodziny-zlote-czarne.webp` },
  { id: 29, name: 'Balony 18-tka Złoto-Czarne Deluxe',     category: '18-ka', price: 159, image: `${BASE}/hel/18-ka/balony-na-18-urodziny-zloto-czarne.webp` },

  // ── 18-ka – dekoracje ────────────────────────────────────────────────────
  { id: 30, name: 'Dekoracja 18-tka Fioletowo-Biała',      category: '18-ka', price: 199, image: `${BASE}/deko/18-ka/deko-18-fioletowy-biały.webp` },
  { id: 31, name: 'Dekoracja 18-tka Minionki',             category: '18-ka', price: 199, image: `${BASE}/deko/18-ka/deko-18-minionki.webp` },
  { id: 32, name: 'Dekoracja 18-tka Złoto-Biała',          category: '18-ka', price: 209, image: `${BASE}/deko/18-ka/deko-18-złoty-biały.webp` },
  { id: 33, name: 'Dekoracja 18-tka Złoto-Pastel',         category: '18-ka', price: 219, image: `${BASE}/deko/18-ka/dekor-18-złoty-pastel.webp` },

  // ── Urodziny dzieci ──────────────────────────────────────────────────────
  { id: 34, name: 'Balony Cyfra 3',                        category: 'Urodziny', price: 119, image: `${BASE}/hel/children/cyfra-3.webp` },
  { id: 35, name: 'Balony Cyfra 4 Czarna',                 category: 'Urodziny', price: 119, image: `${BASE}/hel/children/cyfra-4-czarna.webp` },
  { id: 36, name: 'Balony Cyfra 5 Auto',                   category: 'Urodziny', price: 129, image: `${BASE}/hel/children/cyfra-5-auto.webp` },
  { id: 37, name: 'Balony Chase',                          category: 'Urodziny', price: 149, image: `${BASE}/hel/children/czejs.webp` },
  { id: 38, name: 'Balony Gekson',                         category: 'Urodziny', price: 149, image: `${BASE}/hel/children/gekson.webp` },
  { id: 39, name: 'Balony Harry Potter',                   category: 'Urodziny', price: 149, image: `${BASE}/hel/children/harry-potter.webp` },
  { id: 40, name: 'Balony Koparka Cyfra 3',                category: 'Urodziny', price: 139, image: `${BASE}/hel/children/koparka-cyfra-3.webp` },
  { id: 41, name: 'Balony Koparka',                        category: 'Urodziny', price: 139, image: `${BASE}/hel/children/koparka.webp` },
  { id: 42, name: 'Balony Marszał',                        category: 'Urodziny', price: 149, image: `${BASE}/hel/children/marszal.webp` },
  { id: 43, name: 'Balony Mickey Mouse',                   category: 'Urodziny', price: 149, image: `${BASE}/hel/children/mickey-mouse.webp` },
  { id: 44, name: 'Balony Narodziny',                      category: 'Urodziny', price: 129, image: `${BASE}/hel/children/narodziny.webp` },
  { id: 45, name: 'Balony Pikachu',                        category: 'Urodziny', price: 149, image: `${BASE}/hel/children/pikachu.webp` },
  { id: 46, name: 'Balony Psi Patrol',                     category: 'Urodziny', price: 149, image: `${BASE}/hel/children/psi-patrol.webp` },
  { id: 47, name: 'Balony Zestaw Różowy z Cyfrą 2',        category: 'Urodziny', price: 129, image: `${BASE}/hel/children/różowy-zestaw-balonów-z-cyfrą-2.webp` },
  { id: 48, name: 'Balony Sky 10 szt.',                    category: 'Urodziny', price: 139, image: `${BASE}/hel/children/sky-10szt.webp` },
  { id: 49, name: 'Balony Sky',                            category: 'Urodziny', price: 119, image: `${BASE}/hel/children/sky.webp` },

  // ── Urodziny – dekoracje ─────────────────────────────────────────────────
  { id: 50, name: 'Dekoracja Beżowo-Zielona na 2 Urodziny',category: 'Urodziny', price: 179, image: `${BASE}/deko/birthday/dekoracja-beżowo-zielona-na-2-urodziny.webp` },
  { id: 51, name: 'Dekoracja Biało-Srebrna na Urodziny',   category: 'Urodziny', price: 169, image: `${BASE}/deko/birthday/dekoracja-biało-srebrna-na-urodziny.webp` },
  { id: 52, name: 'Dekoracja Czarno-Zielona na 30',        category: 'Urodziny', price: 189, image: `${BASE}/deko/birthday/dekoracja-czarno-zielona-na-30-urodziny.webp` },
  { id: 53, name: 'Dekoracja Czarno-Złota na 50',          category: 'Urodziny', price: 199, image: `${BASE}/deko/birthday/dekoracja-czarno-złota-na-50-urodziny.webp` },
  { id: 54, name: 'Dekoracja Czarno-Złota na Urodziny',    category: 'Urodziny', price: 189, image: `${BASE}/deko/birthday/dekoracja-czarno-złota-na-urodziny.webp` },
  { id: 55, name: 'Dekoracja Niebiesko-Beżowa na Urodziny',category: 'Urodziny', price: 179, image: `${BASE}/deko/birthday/dekoracja-niebiesko-beżowa-na-urodziny.webp` },
  { id: 56, name: 'Dekoracja Różowa na Urodziny',          category: 'Urodziny', price: 169, image: `${BASE}/deko/birthday/dekoracja-różowa-na-urodziny.webp` },
  { id: 57, name: 'Dekoracja Różowo-Złota na Urodziny',    category: 'Urodziny', price: 179, image: `${BASE}/deko/birthday/dekoracja-różowo-złota-na-urodziny.webp` },
  { id: 58, name: 'Dekoracja Zielono-Złota na Urodziny',   category: 'Urodziny', price: 179, image: `${BASE}/deko/birthday/dekoracja-zielono-złota-na-urodziny.webp` },
  { id: 59, name: 'Dekoracja Złota na 60 Urodziny',        category: 'Urodziny', price: 209, image: `${BASE}/deko/birthday/dekoracja-złota-na-60-urodziny.webp` },
  { id: 60, name: 'Dekoracja Złoto-Czarna na 30 Urodziny', category: 'Urodziny', price: 199, image: `${BASE}/deko/birthday/dekoracja-złoto-czarna-na-30-urodziny.webp` },

  // ── Dla niej ─────────────────────────────────────────────────────────────
  { id: 61, name: 'Balony 14-tka Złoto-Zielone',           category: 'Dla niej', price: 139, image: `${BASE}/hel/woman/balony-14-zlote-zielone.webp` },
  { id: 62, name: 'Balony 15-tka Różowo-Złote',            category: 'Dla niej', price: 139, image: `${BASE}/hel/woman/balony-15-rozowe-zloto.webp` },
  { id: 63, name: 'Balony 16-tka Różowe',                  category: 'Dla niej', price: 139, image: `${BASE}/hel/woman/balony-16-rozowe.webp` },
  { id: 64, name: 'Balony 29-tka Srebrne',                 category: 'Dla niej', price: 149, image: `${BASE}/hel/woman/balony-29-srebrne.webp` },
  { id: 65, name: 'Balony 29-tka Złoto-Białe',             category: 'Dla niej', price: 149, image: `${BASE}/hel/woman/balony-29-zlote-biale.webp` },
  { id: 66, name: 'Balony 30-tka Różowo-Białe',            category: 'Dla niej', price: 159, image: `${BASE}/hel/woman/balony-30-rozowo-biale.webp` },
  { id: 67, name: 'Balony 40-tka Różowo-Złote',            category: 'Dla niej', price: 169, image: `${BASE}/hel/woman/balony-40-rozowe-zloto.webp` },
  { id: 68, name: 'Balony 40-tka Różowo-Fioletowe',        category: 'Dla niej', price: 169, image: `${BASE}/hel/woman/balony-40-rozowo-fioletowe.webp` },
  { id: 69, name: 'Balony Kotek Różowo-Białe',             category: 'Dla niej', price: 149, image: `${BASE}/hel/woman/balony-kotek-rozowe-biale.webp` },
  { id: 70, name: 'Balony Sister Różowo-Białe',            category: 'Dla niej', price: 149, image: `${BASE}/hel/woman/balony-sister-rozowe-biale.webp` },

  // ── Dla niego ────────────────────────────────────────────────────────────
  { id: 71, name: 'Balony 12-tka Srebrno-Niebieskie',      category: 'Dla niego', price: 139, image: `${BASE}/hel/men/balony-12-srebrno-niebieskie.webp` },
  { id: 72, name: 'Balony 16-tka Srebrno-Czarne',          category: 'Dla niego', price: 139, image: `${BASE}/hel/men/balony-16-srebrno-czarne.webp` },
  { id: 73, name: 'Balony 24-tka Złoto-Czarne',            category: 'Dla niego', price: 149, image: `${BASE}/hel/men/balony-24-zlote-czarne.webp` },
  { id: 74, name: 'Balony 26-tka Różowo-Złote',            category: 'Dla niego', price: 149, image: `${BASE}/hel/men/balony-26-rozowo-zlote.webp` },
  { id: 75, name: 'Balony 30-tka Butelka Czarno-Srebrne',  category: 'Dla niego', price: 169, image: `${BASE}/hel/men/balony-30-butelka-czarne-srebrne.webp` },
  { id: 76, name: 'Balony 30-tka Srebrno-Czarne',          category: 'Dla niego', price: 159, image: `${BASE}/hel/men/balony-30-srebrne-czarne.webp` },
  { id: 77, name: 'Balony 34-tka Pantera Czarne',          category: 'Dla niego', price: 159, image: `${BASE}/hel/men/balony-34-pantera-czarne.webp` },
  { id: 78, name: 'Balony Butelka Alkohol Czarno-Srebrne',  category: 'Dla niego', price: 169, image: `${BASE}/hel/men/balony-butelka-alkohol-czarne-srebrne.webp` },
  { id: 79, name: 'Balony Butelka Alkohol Złote',          category: 'Dla niego', price: 169, image: `${BASE}/hel/men/balony-butelka-alkohol-zlote.webp` },
  { id: 80, name: 'Balony Happy Beer Day',                 category: 'Dla niego', price: 149, image: `${BASE}/hel/men/balony-happy-beer-day.webp` },
  { id: 81, name: 'Balony Happy Birthday Czarno-Białe',    category: 'Dla niego', price: 149, image: `${BASE}/hel/men/balony-happy-birthday-czarno-biale.webp` },

  // ── Chrzest & Komunia ────────────────────────────────────────────────────
  { id: 82, name: 'Dekoracja Komunia Złoto-Biała',         category: 'Chrzest & Komunia', price: 199, image: `${BASE}/deko/chrzest/dekoracj-komunia–złoto-biała.webp` },
  { id: 83, name: 'Dekoracja Chrzest Fioletowa',           category: 'Chrzest & Komunia', price: 189, image: `${BASE}/deko/chrzest/dekoracja-chrzest-fioletowa.webp` },
  { id: 84, name: 'Dekoracja Chrzest Błękitno-Biała z Napisem', category: 'Chrzest & Komunia', price: 209, image: `${BASE}/deko/chrzest/dekoracja-chrzest–błękitno-biała-napis.webp` },
  { id: 85, name: 'Dekoracja Chrzest Błękitno-Biała',      category: 'Chrzest & Komunia', price: 189, image: `${BASE}/deko/chrzest/dekoracja-chrzest–błękitno-biała.webp` },
  { id: 86, name: 'Dekoracja Chrzest Złoto-Biała z Okręgiem', category: 'Chrzest & Komunia', price: 219, image: `${BASE}/deko/chrzest/dekoracja-chrzest–złoto-biała-okręgiem.webp` },
  { id: 87, name: 'Dekoracja Chrzest Złoto-Biała',         category: 'Chrzest & Komunia', price: 199, image: `${BASE}/deko/chrzest/dekoracja-chrzest–złoto-biała.webp` },
  { id: 88, name: 'Dekoracja Komunia Złoto-Biała II',      category: 'Chrzest & Komunia', price: 199, image: `${BASE}/deko/chrzest/dekoracja-komunia–złoto-biała-2.webp` },
  { id: 89, name: 'Dekoracja Komunia Złoto-Biała III',     category: 'Chrzest & Komunia', price: 209, image: `${BASE}/deko/chrzest/dekoracja-komunia–złoto-biała.webp` },

  // ── Biznes ───────────────────────────────────────────────────────────────
  { id: 90, name: 'Dekoracja Czerwono-Biała',              category: 'Biznes', price: 249, image: `${BASE}/deko/business/dekoracja-balonowa-czerwono-biała.webp` },
  { id: 91, name: 'Dekoracja Czarno-Złota',                category: 'Biznes', price: 269, image: `${BASE}/deko/business/dekoracja-czarna-złota.webp` },
  { id: 92, name: 'Dekoracja Czerwono-Fioletowa',          category: 'Biznes', price: 259, image: `${BASE}/deko/business/dekoracja-czerwono-fioletowa.webp` },
  { id: 93, name: 'Dekoracja Czerwono-Złota',              category: 'Biznes', price: 259, image: `${BASE}/deko/business/dekoracja-czerwono-złota.webp` },
  { id: 94, name: 'Dekoracja Fioletowa',                   category: 'Biznes', price: 249, image: `${BASE}/deko/business/dekoracja-fioletowa.webp` },
  { id: 95, name: 'Dekoracja Fioletowo-Biała',             category: 'Biznes', price: 249, image: `${BASE}/deko/business/dekoracja-fioletowo-biała.webp` },
  { id: 96, name: 'Dekoracja Granatowo-Różowa',            category: 'Biznes', price: 259, image: `${BASE}/deko/business/dekoracja-granotowo-różowa.webp` },
  { id: 97, name: 'Dekoracja Różowo-Fioletowa',            category: 'Biznes', price: 249, image: `${BASE}/deko/business/dekoracja-różowo-fioletow.webp` },
  { id: 98, name: 'Dekoracja Turkusowo-Różowa',            category: 'Biznes', price: 259, image: `${BASE}/deko/business/dekoracja-turkusowo-różowa.webp` },
  { id: 99, name: 'Dekoracja Zielono-Biała',               category: 'Biznes', price: 249, image: `${BASE}/deko/business/dekoracja-zielono-biała.webp` },
]
