/** @format */

"use client";

import { Category } from "@/data/products";

const CATEGORY_META: Record<Category, { label: string; sub: string }> = {
  Roczek: { label: "Roczek", sub: "Pierwsze urodziny" },
  "18-ka": { label: "18-ka", sub: "Osiemnastka" },
  "Dla niej": { label: "Dla niej", sub: "Kobiece zestawy" },
  "Dla niego": { label: "Dla niego", sub: "Męskie zestawy" },
  "Dla dziecka": { label: "Dla dziecka", sub: "Postacie & charaktery" },
  "Dekoracje balonowe": { label: "Dekoracje balonowe", sub: "Girlandy & ściany" },
  "Hello Baby": { label: "Hello Baby", sub: "Narodziny & baby shower" },
};

type Props = { onFilter: (cat: Category | null) => void };

export default function CategorySection({ onFilter }: Props) {
  return (
    <section className="categories" id="categories">
      <div className="section-inner">
        <div className="section-header">
          <p className="eyebrow">Kategorie</p>
          <h2 className="section-title">
            Każda okazja zasługuje
            <br />
            na <em>piękne</em> balony
          </h2>
        </div>
        <div className="cat-grid">
          {(
            Object.entries(CATEGORY_META) as [
              Category,
              { label: string; sub: string },
            ][]
          ).map(([cat, { label, sub }]) => (
            <button
              key={cat}
              className="cat-card"
              onClick={() => {
                onFilter(cat);
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}>
              <span className="cat-label">{label}</span>
              <span className="cat-sub">{sub}</span>
              <span className="cat-arrow">→</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
