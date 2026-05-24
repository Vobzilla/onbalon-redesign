/** @format */

import type { Category, ContentItem } from "./products";

export type { ContentItem };

export type ProductDetails = {
  description: string;
  contents: ContentItem[];
  includes: string[];
};

type ProductType = "bukiet" | "dekoracja";

const BUKIET_INCLUDES = [
  "Balony napełnione helem",
  "Balony lateksowe zabezpieczone Hi-Float dla dłuższego unoszenia",
  "Ciężarki do balonów",
  "Wstążki dekoracyjne",
];

const DEKORACJA_INCLUDES = [
  "Profesjonalny montaż w miejscu imprezy",
  "Projekt i dobór kolorów",
  "Demontaż po imprezie",
];

const DEFAULTS: Record<Category, Record<ProductType, ProductDetails>> = {
  Roczek: {
    bukiet: {
      description:
        "Wyjątkowy zestaw balonowy na pierwsze urodziny — wypełniony helem z Hi-Float dla dłuższego unoszenia. Eleganckie ciężarki w zestawie. Gotowy do odbioru lub z dostawą po Szczecinie.",
      contents: [
        { name: "Balony lateksowe kolorowe", detail: "Ø 30 cm", qty: 6 },
        {
          name: 'Balon foliowy cyfra „1"',
          detail: "Niebieski lub różowy, Ø 80 cm",
          qty: 1,
        },
        { name: "Balony konfetti", detail: "Ø 30 cm, przezroczyste", qty: 3 },
        {
          name: "Balony gwiazdki foliowe",
          detail: "Złote i srebrne, Ø 45 cm",
          qty: 2,
        },
      ],
      includes: BUKIET_INCLUDES,
    },
    dekoracja: {
      description:
        "Efektowna dekoracja balonowa na roczek — girlanda, ściana lub łuk balonowy, które zachwycą gości i stworzą idealne tło do zdjęć.",
      contents: [
        {
          name: "Balony lateksowe różnych rozmiarów",
          detail: "Ø 12–36 cm, mix kolorów",
          qty: 80,
        },
        { name: 'Balon foliowy cyfra „1"', detail: "Ø 80 cm", qty: 1 },
        {
          name: "Balony organiczne / teksturowane",
          detail: "Różne rozmiary",
          qty: 15,
        },
        {
          name: "Elementy dekoracyjne",
          detail: "Wstążki, kwiaty, motylki",
          qty: 1,
        },
      ],
      includes: DEKORACJA_INCLUDES,
    },
  },

  "18-tka": {
    bukiet: {
      description:
        "Efektowny zestaw balonowy na osiemnastkę — bo ten dzień zasługuje na coś wyjątkowego. Wypełniony helem z Hi-Float. Gotowy do odbioru lub z dostawą po Szczecinie.",
      contents: [
        { name: "Balony lateksowe", detail: "Ø 30 cm, kolorowe", qty: 10 },
        {
          name: 'Balon foliowy cyfra „1"',
          detail: "Złoty lub srebrny, Ø 80 cm",
          qty: 1,
        },
        {
          name: 'Balon foliowy cyfra „8"',
          detail: "Złoty lub srebrny, Ø 80 cm",
          qty: 1,
        },
        { name: "Balony konfetti", detail: "Ø 30 cm, przezroczyste", qty: 3 },
      ],
      includes: BUKIET_INCLUDES,
    },
    dekoracja: {
      description:
        "Imponująca dekoracja na osiemnastkę — girlanda lub ściana balonowa, często z neonem lub personalizacją. Robi wrażenie na każdym gościu.",
      contents: [
        {
          name: "Balony lateksowe różnych rozmiarów",
          detail: "Ø 12–36 cm, mix kolorów",
          qty: 100,
        },
        { name: 'Balony foliowe cyfry „18"', detail: "Ø 80 cm każda", qty: 2 },
        {
          name: "Neon LED lub personalizacja",
          detail: "Na zamówienie",
          qty: 1,
        },
        {
          name: "Balony organiczne / teksturowane",
          detail: "Różne rozmiary",
          qty: 20,
        },
      ],
      includes: DEKORACJA_INCLUDES,
    },
  },

  "Dla niej": {
    bukiet: {
      description:
        "Piękny zestaw balonowy dla niej — na urodziny, imieniny lub każdą wyjątkową okazję. Wypełniony helem z Hi-Float dla dłuższego unoszenia. Dostawa prosto pod drzwi.",
      contents: [
        {
          name: "Balony lateksowe różowe",
          detail: "Ø 30 cm, pastelowy róż",
          qty: 8,
        },
        {
          name: "Balony serduszka foliowe",
          detail: "Różowe i złote, Ø 45 cm",
          qty: 2,
        },
        { name: "Balony gwiazdki foliowe", detail: "Złote, Ø 45 cm", qty: 3 },
        { name: "Balony konfetti", detail: "Ø 30 cm, przezroczyste", qty: 2 },
      ],
      includes: BUKIET_INCLUDES,
    },
    dekoracja: {
      description:
        "Elegancka dekoracja balonowa dla niej — girlanda lub ściana w kobiecych kolorach. Idealne tło do zdjęć na każdą wyjątkową okazję.",
      contents: [
        {
          name: "Balony lateksowe różnych rozmiarów",
          detail: "Ø 12–36 cm, odcienie różu i złota",
          qty: 80,
        },
        {
          name: "Balony foliowe z cyfrą lub napisem",
          detail: "Ø 80 cm",
          qty: 1,
        },
        {
          name: "Balony organiczne / teksturowane",
          detail: "Różne rozmiary",
          qty: 15,
        },
        { name: "Elementy dekoracyjne", detail: "Kwiaty, wstążki", qty: 1 },
      ],
      includes: DEKORACJA_INCLUDES,
    },
  },

  "Dla niego": {
    bukiet: {
      description:
        "Efektowny zestaw balonowy dla niego — idealny na urodziny, imieniny lub niespodziankę. Wypełniony helem z Hi-Float. Gotowy do odbioru lub z dostawą po Szczecinie.",
      contents: [
        { name: "Balony lateksowe granatowe", detail: "Ø 30 cm", qty: 8 },
        {
          name: "Balony lateksowe srebrne",
          detail: "Ø 30 cm, chromowane",
          qty: 4,
        },
        { name: "Balony konfetti", detail: "Ø 30 cm, przezroczyste", qty: 2 },
        { name: "Balon foliowy gwiazdka", detail: "Srebrna, Ø 45 cm", qty: 2 },
      ],
      includes: BUKIET_INCLUDES,
    },
    dekoracja: {
      description:
        "Stylowa dekoracja balonowa dla niego — girlanda lub ściana w męskich kolorach. Idealna na urodziny, imprezy tematyczne i eventy.",
      contents: [
        {
          name: "Balony lateksowe różnych rozmiarów",
          detail: "Ø 12–36 cm, ciemne kolory",
          qty: 80,
        },
        {
          name: "Balony foliowe z cyfrą lub napisem",
          detail: "Ø 80 cm",
          qty: 1,
        },
        {
          name: "Balony organiczne / teksturowane",
          detail: "Różne rozmiary",
          qty: 15,
        },
        { name: "Elementy dekoracyjne", detail: "Wstążki, konfetti", qty: 1 },
      ],
      includes: DEKORACJA_INCLUDES,
    },
  },

  "Dla dziecka": {
    bukiet: {
      description:
        "Kolorowy zestaw balonowy, który zachwyci każde dziecko. Wypełniony helem z Hi-Float dla dłuższego unoszenia. Idealny na urodziny lub niespodziankę — dostawa prosto do domu.",
      contents: [
        {
          name: "Balon foliowy cyfra",
          detail: "Złoty lub kolorowy, Ø 80 cm",
          qty: 1,
        },
        {
          name: "Balon foliowy z bohaterem",
          detail: "Ulubiona postać, Ø 60–80 cm",
          qty: 1,
        },
        { name: "Balony lateksowe kolorowe", detail: "Ø 30 cm", qty: 6 },
        { name: "Balony konfetti", detail: "Ø 30 cm, przezroczyste", qty: 2 },
      ],
      includes: BUKIET_INCLUDES,
    },
    dekoracja: {
      description:
        "Bajkowa dekoracja balonowa dla dzieci — girlanda lub ściana z ulubionymi postaciami. Tworzy magiczną atmosferę na każde urodziny.",
      contents: [
        {
          name: "Balony lateksowe różnych rozmiarów",
          detail: "Ø 12–36 cm, żywe kolory",
          qty: 80,
        },
        {
          name: "Balony foliowe z postaciami",
          detail: "Ulubiony bohater, Ø 60–80 cm",
          qty: 2,
        },
        { name: "Balon foliowy cyfra", detail: "Ø 80 cm", qty: 1 },
        {
          name: "Elementy tematyczne",
          detail: "Gwiazdki, serduszka, konfetti",
          qty: 1,
        },
      ],
      includes: DEKORACJA_INCLUDES,
    },
  },

  "Dekoracje balonowe": {
    bukiet: {
      description:
        "Profesjonalna dekoracja balonowa na każdą okazję — urodziny, wesele, event firmowy. Wykonana przez nasz zespół na miejscu. Szczegóły i wycenę ustalamy indywidualnie w ciągu 15 minut.",
      contents: [
        {
          name: "Balony lateksowe różnych rozmiarów",
          detail: "Ø 12–36 cm, mix kolorów",
          qty: 100,
        },
        {
          name: "Balony organiczne / teksturowane",
          detail: "Różne rozmiary",
          qty: 20,
        },
        {
          name: "Elementy dekoracyjne",
          detail: "Kwiaty, wstążki, konfetti",
          qty: 1,
        },
      ],
      includes: DEKORACJA_INCLUDES,
    },
    dekoracja: {
      description:
        "Profesjonalna dekoracja balonowa na każdą okazję — urodziny, wesele, event firmowy. Wykonana przez nasz zespół na miejscu. Szczegóły i wycenę ustalamy indywidualnie w ciągu 15 minut.",
      contents: [
        {
          name: "Balony lateksowe różnych rozmiarów",
          detail: "Ø 12–36 cm, mix kolorów",
          qty: 100,
        },
        {
          name: "Balony organiczne / teksturowane",
          detail: "Różne rozmiary",
          qty: 20,
        },
        {
          name: "Elementy dekoracyjne",
          detail: "Kwiaty, wstążki, konfetti",
          qty: 1,
        },
      ],
      includes: DEKORACJA_INCLUDES,
    },
  },

  "Małe Zestawy": {
    bukiet: {
      description:
        "Mały zestaw, wielka radość — idealny jako szybki prezent lub dodatek do prezentu. Wypełniony helem, gotowy do odbioru lub z dostawą w Szczecinie.",
      contents: [
        { name: "Balony lateksowe kolorowe", detail: "Ø 30 cm", qty: 3 },
        { name: "Balon foliowy", detail: "Ø 45 cm", qty: 1 },
      ],
      includes: BUKIET_INCLUDES,
    },
    dekoracja: {
      description:
        "Mały zestaw, wielka radość — idealny jako szybki prezent lub dodatek do prezentu. Wypełniony helem, gotowy do odbioru lub z dostawą w Szczecinie.",
      contents: [
        { name: "Balony lateksowe kolorowe", detail: "Ø 30 cm", qty: 3 },
        { name: "Balon foliowy", detail: "Ø 45 cm", qty: 1 },
      ],
      includes: BUKIET_INCLUDES,
    },
  },

  "Hello Baby": {
    bukiet: {
      description:
        "Wyjątkowy zestaw balonowy na powitanie nowego członka rodziny. Wypełniony helem z Hi-Float. Każdy zestaw dostępny w wersji dla chłopca i dla dziewczynki. Dostawa pod wskazany adres w Szczecinie.",
      contents: [
        {
          name: "Balony lateksowe pastelowe",
          detail: "Ø 30 cm, miętowe lub różowe",
          qty: 6,
        },
        { name: "Balony konfetti", detail: "Ø 30 cm, przezroczyste", qty: 2 },
        {
          name: "Balony gwiazdki foliowe",
          detail: "Złote i pastelowe, Ø 45 cm",
          qty: 2,
        },
      ],
      includes: BUKIET_INCLUDES,
    },
    dekoracja: {
      description:
        "Bajeczna dekoracja balonowa na baby shower lub powitanie nowego członka rodziny. Pastelowe kolory i personalizacja tworzą niezapomniane wspomnienie.",
      contents: [
        {
          name: "Balony lateksowe pastelowe",
          detail: "Ø 30 cm, mix kolorów",
          qty: 7,
        },
        {
          name: "Balony foliowe z napisem",
          detail: '"Hello Baby" lub "It\'s a Boy/Girl"',
          qty: 2,
        },
      ],
      includes: DEKORACJA_INCLUDES,
    },
  },
};

// Detects product type by name prefix
function detectType(name: string): ProductType {
  return /^(Girlanda|Dekoracja|Brama|Kolumna|Ściana|Łuk|Arch)/.test(name)
    ? "dekoracja"
    : "bukiet";
}

export function getProductDetails(product: {
  name: string;
  category: Category;
  description?: string;
  contents?: ContentItem[];
  includes?: string[];
}): ProductDetails {
  const type = detectType(product.name);
  const d = DEFAULTS[product.category][type];
  return {
    description: product.description ?? d.description,
    contents: product.contents ?? d.contents,
    includes: product.includes ?? d.includes,
  };
}
