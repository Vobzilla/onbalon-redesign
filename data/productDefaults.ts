/** @format */

import type { Category, ContentItem } from "./products";

export type { ContentItem };

export type ProductDetails = {
  description: string;
  contents: ContentItem[];
  includes: string[];
};

type ProductType = "bukiet" | "dekoracja";

const DEFAULTS: Record<Category, Record<ProductType, ProductDetails>> = {
  Roczek: {
    bukiet: {
      description:
        "Kolorowy bukiet balonowy na pierwsze urodziny — wypełniony helem, gotowy do odbioru lub z dostawą. Idealna niespodzianka na ten wyjątkowy dzień.",
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
      includes: [
        "Balony napełnione helem",
        "Balony lateksowe zabezpieczone uszczelniaczem Hi-Float dla dłuższego unoszenia",
        "Eleganckie ciężarki do balonów",
      ],
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
      includes: [
        "Profesjonalny montaż w miejscu imprezy",
        "Dostawa na terenie Szczecina",
        "Projekt i dobór kolorów",
        "Demontaż po imprezie (opcjonalnie)",
      ],
    },
  },

  "18-ka": {
    bukiet: {
      description:
        "Spektakularny bukiet na osiemnastkę — duże cyfry foliowe i kolorowe balony lateksowe wypełnione helem. Gotowy do odbioru lub z dostawą.",
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
      includes: [
        "Hel do napełnienia wszystkich balonów",
        "Wstążki dekoracyjne",
        "Personalizacja",
        "Karta z życzeniami",
      ],
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
      includes: [
        "Profesjonalny montaż w miejscu imprezy",
        "Dostawa na terenie Szczecina",
        "Projekt i dobór kolorów",
        "Neon / personalizacja w cenie",
      ],
    },
  },

  "Dla niej": {
    bukiet: {
      description:
        "Romantyczny bukiet balonowy w odcieniach różu i złota — idealny prezent na urodziny, imieniny lub każdą wyjątkową chwilę.",
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
      includes: [
        "Hel do napełnienia wszystkich balonów",
        "Wstążki dekoracyjne",
        "Karta z życzeniami",
      ],
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
      includes: [
        "Profesjonalny montaż w miejscu imprezy",
        "Dostawa na terenie Szczecina",
        "Projekt i dobór kolorów",
      ],
    },
  },

  "Dla niego": {
    bukiet: {
      description:
        "Elegancki bukiet balonowy dla niego — granatowe, srebrne lub czarne balony tworzą stylową, nowoczesną kompozycję. Z dostawą lub do odbioru.",
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
      includes: [
        "Hel do napełnienia wszystkich balonów",
        "Wstążki dekoracyjne",
        "Karta z życzeniami",
      ],
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
      includes: [
        "Profesjonalny montaż w miejscu imprezy",
        "Dostawa na terenie Szczecina",
        "Projekt i dobór kolorów",
      ],
    },
  },

  "Dla dziecka": {
    bukiet: {
      description:
        "Kolorowy bukiet balonowy z ulubionym bohaterem Twojego dziecka. Niespodzianka, która wywoła uśmiech — dostawa pod drzwi w 2–3 godziny!",
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
      includes: [
        "Hel do napełnienia wszystkich balonów",
        "Wstążki dekoracyjne",
        "Karta z życzeniami",
      ],
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
      includes: [
        "Profesjonalny montaż w miejscu imprezy",
        "Dostawa na terenie Szczecina",
        "Projekt i dobór kolorów",
      ],
    },
  },

  "Dekoracje balonowe": {
    bukiet: {
      description:
        "Profesjonalna dekoracja balonowa — girlanda, ściana, łuk lub brama balonowa. Tworzy spektakularne tło na każde wydarzenie.",
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
      includes: [
        "Profesjonalny montaż w miejscu imprezy",
        "Dostawa na terenie Szczecina",
        "Projekt i dobór kolorów",
        "Demontaż po imprezie (opcjonalnie)",
      ],
    },
    dekoracja: {
      description:
        "Profesjonalna dekoracja balonowa — girlanda, ściana, łuk lub brama balonowa. Tworzy spektakularne tło na każde wydarzenie.",
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
      includes: [
        "Profesjonalny montaż w miejscu imprezy",
        "Dostawa na terenie Szczecina",
        "Projekt i dobór kolorów",
        "Demontaż po imprezie (opcjonalnie)",
      ],
    },
  },

  "Hello Baby": {
    bukiet: {
      description:
        "Wyjątkowy bukiet balonowy na narodziny dziecka lub baby shower. Pastelowe kolory i napis Hello Baby tworzą magiczną pamiątkę na ten wyjątkowy moment.",
      contents: [
        {
          name: "Balon foliowy „It's a Boy/Girl",
          detail: "Niebieski lub różowy, Ø 45 cm",
          qty: 1,
        },
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
      includes: [
        "Hel do napełnienia wszystkich balonów",
        "Wstążki dekoracyjne",
        "Karta z życzeniami",
      ],
    },
    dekoracja: {
      description:
        "Bajeczna dekoracja balonowa na baby shower lub powitanie nowego członka rodziny. Pastelowe kolory i personalizacja tworzą niezapomniane wspomnienie.",
      contents: [
        {
          name: "Balony lateksowe pastelowe",
          detail: "Ø 12–36 cm, mix kolorów",
          qty: 80,
        },
        {
          name: "Balony foliowe z napisem",
          detail: '"Hello Baby" lub "It\'s a Boy/Girl"',
          qty: 2,
        },
        {
          name: "Balony organiczne / teksturowane",
          detail: "Różne rozmiary",
          qty: 15,
        },
        {
          name: "Elementy dekoracyjne",
          detail: "Gwiazdki, chmurki, serduszka",
          qty: 1,
        },
      ],
      includes: [
        "Profesjonalny montaż w miejscu imprezy",
        "Dostawa na terenie Szczecina",
        "Projekt i dobór kolorów",
      ],
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
