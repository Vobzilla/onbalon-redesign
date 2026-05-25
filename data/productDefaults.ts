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

const DESCRIPTIONS: Record<Category, string> = {
  "Roczek":             "Pierwszy rok — wyjątkowy powód do świętowania. Zestaw balonów z helem na roczek w Szczecinie, który zachwyci gości i stworzy niezapomniane wspomnienia.",
  "18-tka":             "Osiemnastka zdarza się tylko raz — niech będzie spektakularna. Zestaw balonów z helem na 18-tkę w Szczecinie z dostawą lub odbiorem osobistym.",
  "Dla niej":           "Najpiękniejszy prezent zaczyna się od balonów. Zestaw balonów z helem dla niej — na urodziny, imieniny lub każdą wyjątkową chwilę. Szczecin i okolice.",
  "Dla niego":          "Zaskocz go czymś, czego się nie spodziewał. Zestaw balonów z helem dla niego — na urodziny, imieniny lub niespodziankę. Szczecin i okolice.",
  "Dla dziecka":        "Balony, które wywołają największy uśmiech w dniu urodzin. Zestaw balonów z helem dla dzieci — z ulubionymi postaciami, cyframi i konfetti. Szczecin i okolice.",
  "Małe Zestawy":       "Mały zestaw, wielka radość. Zestaw balonów z helem jako prezent lub miły gest — gotowy na każdą okazję. Szczecin i okolice.",
  "Hello Baby":         "Przywitaj nowego członka rodziny wyjątkowo. Zestaw balonów z helem na narodziny dziecka — dostępny w wersji dla chłopca i dziewczynki. Dostawa pod wskazany adres w Szczecinie.",
  "Dekoracje balonowe": "Profesjonalne dekoracje balonowe w Szczecinie na każdą okazję — urodziny, wesele, chrzciny, event firmowy. Girlandy, łuki, ściany balonowe. Wycena indywidualna w ciągu 15 minut.",
};

const INCLUDES: Record<Category, Record<ProductType, string[]>> = {
  "Roczek":             { bukiet: BUKIET_INCLUDES,    dekoracja: DEKORACJA_INCLUDES },
  "18-tka":             { bukiet: BUKIET_INCLUDES,    dekoracja: DEKORACJA_INCLUDES },
  "Dla niej":           { bukiet: BUKIET_INCLUDES,    dekoracja: DEKORACJA_INCLUDES },
  "Dla niego":          { bukiet: BUKIET_INCLUDES,    dekoracja: DEKORACJA_INCLUDES },
  "Dla dziecka":        { bukiet: BUKIET_INCLUDES,    dekoracja: DEKORACJA_INCLUDES },
  "Małe Zestawy":       { bukiet: BUKIET_INCLUDES,    dekoracja: BUKIET_INCLUDES    },
  "Hello Baby":         { bukiet: BUKIET_INCLUDES,    dekoracja: DEKORACJA_INCLUDES },
  "Dekoracje balonowe": { bukiet: DEKORACJA_INCLUDES, dekoracja: DEKORACJA_INCLUDES },
};

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
  return {
    description: product.description ?? DESCRIPTIONS[product.category],
    contents:    product.contents   ?? [],
    includes:    product.includes   ?? INCLUDES[product.category][type],
  };
}
