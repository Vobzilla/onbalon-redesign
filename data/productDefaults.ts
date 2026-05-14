import type { Category } from './products'

export type ContentItem = {
  name: string
  detail: string
  qty: number
}

export type ProductDetails = {
  description: string
  contents: ContentItem[]
  includes: string[]
}

const DEFAULTS: Record<Category, ProductDetails> = {
  'Roczek': {
    description:
      'Elegancki zestaw balonowy na pierwsze urodziny Twojego malucha. Kolorowa kompozycja z balonów lateksowych i foliowych tworzy niezapomniane wspomnienia.',
    contents: [
      { name: 'Balony lateksowe kolorowe',   detail: 'Ø 30 cm',                      qty: 6 },
      { name: 'Balon foliowy cyfra „1"',     detail: 'Niebieski lub różowy, Ø 80 cm', qty: 1 },
      { name: 'Balony konfetti',             detail: 'Ø 30 cm, przezroczyste',        qty: 3 },
      { name: 'Balony gwiazdki foliowe',     detail: 'Złote i srebrne, Ø 45 cm',      qty: 2 },
    ],
    includes: [
      'Hel do napełnienia wszystkich balonów',
      'Wstążki dekoracyjne',
      'Karta z życzeniami',
    ],
  },
  '18-ka': {
    description:
      'Spektakularny zestaw na osiemnaste urodziny. Olbrzymie balony foliowe z cyframi robią niesamowite wrażenie na każdym.',
    contents: [
      { name: 'Balony lateksowe',         detail: 'Ø 30 cm, kolorowe',             qty: 10 },
      { name: 'Balon foliowy cyfra „1"',  detail: 'Złoty lub srebrny, Ø 80 cm',    qty: 1  },
      { name: 'Balon foliowy cyfra „8"',  detail: 'Złoty lub srebrny, Ø 80 cm',    qty: 1  },
      { name: 'Balony konfetti',          detail: 'Ø 30 cm, przezroczyste',        qty: 3  },
    ],
    includes: [
      'Hel do napełnienia wszystkich balonów',
      'Wstążki dekoracyjne',
      'Personalizacja',
      'Karta z życzeniami',
    ],
  },
  'Urodziny': {
    description:
      'Kolorowa dekoracja balonowa na urodziny, pełna radości i zabawy. Sprawdzi się na każde urodzinowe przyjęcie, małe i duże.',
    contents: [
      { name: 'Balony lateksowe',           detail: 'Ø 30 cm, kolorowe',      qty: 10 },
      { name: 'Balony konfetti',            detail: 'Ø 30 cm, przezroczyste', qty: 3  },
      { name: 'Balon foliowy okrągły',      detail: 'Kolorowy, Ø 45 cm',      qty: 1  },
      { name: 'Balony gwiazdki foliowe',    detail: 'Złote, Ø 45 cm',         qty: 2  },
    ],
    includes: [
      'Hel do napełnienia wszystkich balonów',
      'Wstążki dekoracyjne',
      'Karta z życzeniami',
    ],
  },
  'Dla niej': {
    description:
      'Romantyczna kompozycja balonowa w odcieniach różu i złota. Idealna niespodzianka na każdą wyjątkową i radosną chwilę.',
    contents: [
      { name: 'Balony lateksowe różowe',    detail: 'Ø 30 cm, pastelowy róż', qty: 8 },
      { name: 'Balony serduszka foliowe',   detail: 'Różowe i złote, Ø 45 cm', qty: 2 },
      { name: 'Balony gwiazdki foliowe',    detail: 'Złote, Ø 45 cm',          qty: 3 },
      { name: 'Balony konfetti',            detail: 'Ø 30 cm, przezroczyste',  qty: 2 },
    ],
    includes: [
      'Hel do napełnienia wszystkich balonów',
      'Wstążki dekoracyjne',
      'Karta z życzeniami',
    ],
  },
  'Dla niego': {
    description:
      'Elegancka, minimalistyczna dekoracja balonowa dla niego. Granatowe i srebrne balony tworzą stylową, nowoczesną kompozycję.',
    contents: [
      { name: 'Balony lateksowe granatowe', detail: 'Ø 30 cm',                 qty: 8 },
      { name: 'Balony lateksowe srebrne',   detail: 'Ø 30 cm, chromowane',     qty: 4 },
      { name: 'Balony konfetti',            detail: 'Ø 30 cm, przezroczyste',  qty: 2 },
      { name: 'Balon foliowy gwiazdka',     detail: 'Srebrna, Ø 45 cm',        qty: 2 },
    ],
    includes: [
      'Hel do napełnienia wszystkich balonów',
      'Wstążki dekoracyjne',
      'Karta z życzeniami',
    ],
  },
  'Chrzest & Komunia': {
    description:
      'Elegancki, stonowany zestaw balonowy na chrzest lub komunię. Białe i złote akcenty podkreślają powagę i wyjątkowość tej chwili.',
    contents: [
      { name: 'Balony lateksowe białe',     detail: 'Ø 30 cm, perłowe',        qty: 8 },
      { name: 'Balony lateksowe złote',     detail: 'Ø 30 cm, chromowane',     qty: 4 },
      { name: 'Balon foliowy krzyż',        detail: 'Złoty, Ø 50 cm',          qty: 1 },
      { name: 'Balony gwiazdki foliowe',    detail: 'Złote i białe, Ø 45 cm',  qty: 2 },
    ],
    includes: [
      'Hel do napełnienia wszystkich balonów',
      'Wstążki dekoracyjne',
      'Personalizacja',
      'Karta okolicznościowa',
    ],
  },
  'Biznes': {
    description:
      'Profesjonalna dekoracja balonowa do przestrzeni firmowej. Idealna na otwarcia, targi, konferencje i wszelkiego rodzaju eventy.',
    contents: [
      { name: 'Balony lateksowe w barwach firmowych', detail: 'Ø 30 cm',          qty: 20 },
      { name: 'Balony foliowe gwiazdki',              detail: 'Ø 45 cm',           qty: 5  },
      { name: 'Elementy bramy balonowej',             detail: 'Różne rozmiary',    qty: 10 },
      { name: 'Balony z personalizacją',              detail: 'Ø 30 cm',           qty: 5  },
    ],
    includes: [
      'Hel do napełnienia wszystkich balonów',
      'Wstążki dekoracyjne',
      'Dostawa i montaż w cenie',
      'Projekt na zamówienie',
    ],
  },
}

export function getProductDetails(product: {
  category: Category
  description?: string
  contents?: ContentItem[]
  includes?: string[]
}): ProductDetails {
  const d = DEFAULTS[product.category]
  return {
    description: product.description ?? d.description,
    contents:    product.contents    ?? d.contents,
    includes:    product.includes    ?? d.includes,
  }
}
