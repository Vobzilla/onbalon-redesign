import type { Category } from '@/data/products'

// Category landing pages (/balony-na-roczek etc.): one per value of the
// `category` column in the database. Extra pages for Google and ads — the
// catalog with filter tabs on the home page stays as it is.
export type CategoryPage = {
  slug: string
  category: Category
  title: string
  description: string
  h1: string
  intro: string
  body: string
}

export const CATEGORY_PAGES: CategoryPage[] = [
  {
    slug: 'balony-na-roczek',
    category: 'Roczek',
    title: 'Balony na roczek Szczecin — zestawy z dostawą | On.balon',
    description: 'Zestawy balonów z helem na roczek z cyfrą 1 i napisem. Dostawa w Szczecinie i okolicach, potwierdzenie zamówienia w 15 minut.',
    h1: 'Balony na roczek — Szczecin',
    intro: 'Gotowe zestawy balonów z helem na pierwsze urodziny: z cyfrą 1, imieniem dziecka i w wybranych kolorach. Dowozimy pod drzwi w Szczecinie i okolicach.',
    body: 'Najczęściej wybierane są zestawy z dużą foliową cyfrą 1 i kilkoma balonami lateksowymi w kolorach przyjęcia. Imię dziecka lub napis „Roczek” dodamy na życzenie — wpisz go w uwagach do zamówienia. Jeśli chcesz inne kolory niż na zdjęciu, napisz o tym w uwagach, a dopasujemy zestaw do dziewczynki lub chłopca. Balony lateksowe z helem utrzymują się minimum 1–2 dni, foliowe od 3 do 7 dni, więc spokojnie wystarczą na całe przyjęcie. Na weekend i godziny wieczorne najlepiej zamówić z wyprzedzeniem 2–3 dni. Balony możesz też odebrać osobiście w naszym sklepie przy ul. Kołłątaja.',
  },
  {
    slug: 'balony-na-18',
    category: '18-tka',
    title: 'Balony na 18 urodziny Szczecin — z dostawą | On.balon',
    description: 'Zestawy balonów z helem na 18-tkę z cyframi 18 i napisem. Dostawa w Szczecinie i okolicach, potwierdzenie zamówienia w 15 minut.',
    h1: 'Balony na 18 urodziny — Szczecin',
    intro: 'Zestawy balonów z helem na osiemnastkę: z dużymi cyframi 18, napisem i w eleganckich kolorach. Na przyjęcie w domu, w restauracji albo jako niespodzianka pod drzwiami.',
    body: 'Klasyka na 18-tkę to dwie duże foliowe cyfry w złocie, srebrze lub czerni, uzupełnione balonami lateksowymi. Imię solenizanta albo krótki napis dodamy na życzenie — wpisz go w uwagach do zamówienia. Balony możemy dowieźć bezpośrednio do lokalu na określoną godzinę, żeby czekały na gości przed rozpoczęciem przyjęcia. Jeśli impreza jest wieczorem lub w weekend, zamów z wyprzedzeniem 2–3 dni.',
  },
  {
    slug: 'balony-dla-niej',
    category: 'Dla niej',
    title: 'Balony dla niej Szczecin — prezent z dostawą | On.balon',
    description: 'Balony z helem na prezent dla niej: urodziny, rocznica, niespodzianka. Dostawa pod drzwi w Szczecinie, potwierdzenie w 15 minut.',
    h1: 'Balony dla niej — prezent z dostawą w Szczecinie',
    intro: 'Zestawy balonów z helem na prezent dla żony, dziewczyny, mamy czy przyjaciółki. Dowieziemy je pod wskazany adres w Szczecinie — także jako niespodziankę.',
    body: 'Balony dla niej zamawiane są najczęściej na urodziny, rocznicę, Dzień Kobiet, Walentynki albo po prostu bez okazji. W zestawach znajdziesz serca, cyfry, balony z napisem i bukiety w pastelowych, różowych i złotych kolorach. Do zamówienia możesz dodać bilecik z dedykacją — treść wpisz w uwagach. Jeśli to niespodzianka, napisz, o której osoba będzie w domu, a dostawę dopasujemy do Twojego terminu.',
  },
  {
    slug: 'balony-dla-niego',
    category: 'Dla niego',
    title: 'Balony dla niego Szczecin — urodziny z dostawą | On.balon',
    description: 'Balony z helem dla mężczyzny na urodziny i rocznicę: cyfry, napisy, eleganckie kolory. Dostawa w Szczecinie, potwierdzenie w 15 minut.',
    h1: 'Balony dla niego — Szczecin',
    intro: 'Zestawy balonów z helem na urodziny męża, chłopaka, taty albo przyjaciela. Cyfry z wiekiem, napisy i stonowane kolory: czerń, granat, złoto, srebro.',
    body: 'Najpopularniejsze są zestawy z cyframi okrągłych urodzin — 18, 30, 40, 50 — w połączeniu z balonami w czerni, granacie lub złocie. Cyfrę i napis dopasujemy do okazji: wystarczy wpisać je w uwagach do zamówienia. Balony dowieziemy do domu, biura albo restauracji, a do zestawu możesz dodać tubę strzelającą z konfetti.',
  },
  {
    slug: 'balony-dla-dziecka',
    category: 'Dla dziecka',
    title: 'Balony dla dziecka Szczecin — na urodziny | On.balon',
    description: 'Kolorowe balony z helem na urodziny dziecka z cyfrą wieku. Dostawa w Szczecinie i okolicach, potwierdzenie zamówienia w 15 minut.',
    h1: 'Balony dla dziecka — urodziny z dostawą w Szczecinie',
    intro: 'Zestawy balonów z helem na urodziny dziecka: z cyfrą wieku, w ulubionych kolorach i motywach. Dowozimy do domu, sali zabaw lub restauracji w Szczecinie i okolicach.',
    body: 'W tej kategorii znajdziesz zestawy dla dziewczynek i chłopców w różnym wieku. Cyfrę z wiekiem dziecka zmienimy na właściwą — wystarczy wpisać ją w uwagach do zamówienia. Balony lateksowe z helem utrzymują się minimum 1–2 dni, foliowe od 3 do 7 dni. Jeśli przyjęcie odbywa się w sali zabaw, podaj jej adres i godzinę, a dowieziemy balony przed przyjściem gości.',
  },
  {
    slug: 'balony-na-powitanie-dziecka',
    category: 'Hello Baby',
    title: 'Balony na baby shower i powitanie dziecka | On.balon',
    description: 'Balony z helem na baby shower i powitanie maluszka w domu. Pastelowe kolory, napisy i imię dziecka. Dostawa w Szczecinie.',
    h1: 'Balony na powitanie dziecka i baby shower — Szczecin',
    intro: 'Zestawy balonów z helem na baby shower i na powitanie maluszka w domu. W delikatnych pastelowych kolorach, z napisem i imieniem dziecka.',
    body: 'Balony na powitanie dziecka to piękna niespodzianka dla rodziców wracających ze szpitala. Możemy je dowieźć pod wskazany adres na konkretną godzinę, żeby czekały w domu. Na baby shower polecamy zestawy w bieli, beżu i pastelach, uzupełnione balonami z napisem. Imię dziecka lub dedykację dodamy na życzenie — wpisz je w uwagach do zamówienia.',
  },
  {
    slug: 'dekoracje-balonowe',
    category: 'Dekoracje balonowe',
    title: 'Dekoracje balonowe Szczecin — girlandy i ścianki | On.balon',
    description: 'Girlandy, ścianki i dekoracje balonowe na urodziny, komunię, wesele i eventy firmowe w Szczecinie. Potwierdzenie w 15 minut.',
    h1: 'Dekoracje balonowe — Szczecin',
    intro: 'Girlandy balonowe, ścianki i fotościanki na urodziny, komunię, wesele i eventy firmowe. Przygotowujemy je w Szczecinie i okolicach pod Twoją salę i kolorystykę.',
    body: 'Dekoracja balonowa to najszybszy sposób, żeby sala wyglądała odświętnie i dobrze wychodziła na zdjęciach. Każdą dekorację z katalogu możemy dopasować kolorystycznie do przyjęcia, a napis lub imię dodać na życzenie. Jeśli potrzebujesz czegoś innego niż w katalogu, opisz swoją okazję — przygotujemy indywidualną wycenę. Większe dekoracje i eventy najlepiej zamówić z wyprzedzeniem 2–3 dni.',
  },
  {
    slug: 'male-zestawy-balonow',
    category: 'Małe Zestawy',
    title: 'Małe zestawy balonów z helem Szczecin | On.balon',
    description: 'Niewielkie zestawy i bukiety balonów z helem na drobny prezent lub niespodziankę. Dostawa w Szczecinie, potwierdzenie w 15 minut.',
    h1: 'Małe zestawy balonów z helem — Szczecin',
    intro: 'Kilka balonów z helem na drobny prezent, przeprosiny albo niespodziankę bez okazji. Szybko, prosto i z dostawą pod drzwi w Szczecinie.',
    body: 'Małe zestawy to dobry wybór, gdy chcesz komuś sprawić przyjemność bez organizowania całego przyjęcia. Część zestawów jest dostępna w kilku wersjach kolorystycznych — kolor wybierzesz na stronie zestawu. Do zamówienia możesz dodać bilecik z dedykacją. Jeśli potrzebujesz tylko kilku pojedynczych balonów, możesz też wybrać je i odebrać osobiście w naszym sklepie przy ul. Kołłątaja.',
  },
]

export function getCategoryPage(slug: string): CategoryPage | undefined {
  return CATEGORY_PAGES.find(c => c.slug === slug)
}

export function categoryPagePath(category: string): string | null {
  const page = CATEGORY_PAGES.find(c => c.category === category)
  return page ? `/${page.slug}` : null
}
