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
}

export const CATEGORY_PAGES: CategoryPage[] = [
  {
    slug: 'balony-na-roczek',
    category: 'Roczek',
    title: 'Balony na roczek Szczecin — zestawy z dostawą | On.balon',
    description: 'Zestawy balonów z helem na roczek z cyfrą 1 i napisem. Dostawa w Szczecinie i okolicach, potwierdzenie zamówienia w 15 minut.',
    h1: 'Balony na roczek — Szczecin',
    intro: 'Gotowe zestawy balonów z helem na pierwsze urodziny: z cyfrą 1, imieniem dziecka i w wybranych kolorach. Dowozimy pod drzwi w Szczecinie i okolicach.',
  },
  {
    slug: 'balony-na-18',
    category: '18-tka',
    title: 'Balony na 18 urodziny Szczecin — z dostawą | On.balon',
    description: 'Zestawy balonów z helem na 18-tkę z cyframi 18 i napisem. Dostawa w Szczecinie i okolicach, potwierdzenie zamówienia w 15 minut.',
    h1: 'Balony na 18 urodziny — Szczecin',
    intro: 'Zestawy balonów z helem na osiemnastkę: z dużymi cyframi 18, napisem i w eleganckich kolorach. Na przyjęcie w domu, w restauracji albo jako niespodzianka pod drzwiami.',
  },
  {
    slug: 'balony-dla-niej',
    category: 'Dla niej',
    title: 'Balony dla niej Szczecin — prezent z dostawą | On.balon',
    description: 'Balony z helem na prezent dla niej: urodziny, rocznica, niespodzianka. Dostawa pod drzwi w Szczecinie, potwierdzenie w 15 minut.',
    h1: 'Balony dla niej — prezent z dostawą w Szczecinie',
    intro: 'Zestawy balonów z helem na prezent dla żony, dziewczyny, mamy czy przyjaciółki. Dowieziemy je pod wskazany adres w Szczecinie — także jako niespodziankę.',
  },
  {
    slug: 'balony-dla-niego',
    category: 'Dla niego',
    title: 'Balony dla niego Szczecin — urodziny z dostawą | On.balon',
    description: 'Balony z helem dla mężczyzny na urodziny i rocznicę: cyfry, napisy, eleganckie kolory. Dostawa w Szczecinie, potwierdzenie w 15 minut.',
    h1: 'Balony dla niego — Szczecin',
    intro: 'Zestawy balonów z helem na urodziny męża, chłopaka, taty albo przyjaciela. Cyfry z wiekiem, napisy i stonowane kolory: czerń, granat, złoto, srebro.',
  },
  {
    slug: 'balony-dla-dziecka',
    category: 'Dla dziecka',
    title: 'Balony dla dziecka Szczecin — na urodziny | On.balon',
    description: 'Kolorowe balony z helem na urodziny dziecka z cyfrą wieku. Dostawa w Szczecinie i okolicach, potwierdzenie zamówienia w 15 minut.',
    h1: 'Balony dla dziecka — urodziny z dostawą w Szczecinie',
    intro: 'Zestawy balonów z helem na urodziny dziecka: z cyfrą wieku, w ulubionych kolorach i motywach. Dowozimy do domu, sali zabaw lub restauracji w Szczecinie i okolicach.',
  },
  {
    slug: 'balony-na-powitanie-dziecka',
    category: 'Hello Baby',
    title: 'Balony na baby shower i powitanie dziecka | On.balon',
    description: 'Balony z helem na baby shower i powitanie maluszka w domu. Pastelowe kolory, napisy i imię dziecka. Dostawa w Szczecinie.',
    h1: 'Balony na powitanie dziecka i baby shower — Szczecin',
    intro: 'Zestawy balonów z helem na baby shower i na powitanie maluszka w domu. W delikatnych pastelowych kolorach, z napisem i imieniem dziecka.',
  },
  {
    slug: 'dekoracje-balonowe',
    category: 'Dekoracje balonowe',
    title: 'Dekoracje balonowe Szczecin — girlandy i ścianki | On.balon',
    description: 'Girlandy, ścianki i dekoracje balonowe na urodziny, komunię, wesele i eventy firmowe w Szczecinie. Potwierdzenie w 15 minut.',
    h1: 'Dekoracje balonowe — Szczecin',
    intro: 'Girlandy balonowe, ścianki i fotościanki na urodziny, komunię, wesele i eventy firmowe. Przygotowujemy je w Szczecinie i okolicach pod Twoją salę i kolorystykę.',
  },
  {
    slug: 'male-zestawy-balonow',
    category: 'Małe Zestawy',
    title: 'Małe zestawy balonów z helem Szczecin | On.balon',
    description: 'Niewielkie zestawy i bukiety balonów z helem na drobny prezent lub niespodziankę. Dostawa w Szczecinie, potwierdzenie w 15 minut.',
    h1: 'Małe zestawy balonów z helem — Szczecin',
    intro: 'Kilka balonów z helem na drobny prezent, przeprosiny albo niespodziankę bez okazji. Szybko, prosto i z dostawą pod drzwi w Szczecinie.',
  },
]

export function getCategoryPage(slug: string): CategoryPage | undefined {
  return CATEGORY_PAGES.find(c => c.slug === slug)
}

export function categoryPagePath(category: string): string | null {
  const page = CATEGORY_PAGES.find(c => c.category === category)
  return page ? `/${page.slug}` : null
}
