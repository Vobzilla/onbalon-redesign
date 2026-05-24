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

type DefaultEntry = { includes: string[] };

const DEFAULTS: Record<Category, Record<ProductType, DefaultEntry>> = {
  Roczek:              { bukiet: { includes: BUKIET_INCLUDES },    dekoracja: { includes: DEKORACJA_INCLUDES } },
  "18-tka":            { bukiet: { includes: BUKIET_INCLUDES },    dekoracja: { includes: DEKORACJA_INCLUDES } },
  "Dla niej":          { bukiet: { includes: BUKIET_INCLUDES },    dekoracja: { includes: DEKORACJA_INCLUDES } },
  "Dla niego":         { bukiet: { includes: BUKIET_INCLUDES },    dekoracja: { includes: DEKORACJA_INCLUDES } },
  "Dla dziecka":       { bukiet: { includes: BUKIET_INCLUDES },    dekoracja: { includes: DEKORACJA_INCLUDES } },
  "Dekoracje balonowe":{ bukiet: { includes: DEKORACJA_INCLUDES }, dekoracja: { includes: DEKORACJA_INCLUDES } },
  "Małe Zestawy":      { bukiet: { includes: BUKIET_INCLUDES },    dekoracja: { includes: BUKIET_INCLUDES } },
  "Hello Baby":        { bukiet: { includes: BUKIET_INCLUDES },    dekoracja: { includes: DEKORACJA_INCLUDES } },
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
  const d = DEFAULTS[product.category][type];
  return {
    description: product.description ?? "",
    contents: product.contents ?? [],
    includes: product.includes ?? d.includes,
  };
}
