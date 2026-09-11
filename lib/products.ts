import { cache } from "react";
import { prisma } from "./db";
import type { Category, ContentItem } from "@/data/products";

// Server-only data access — the public frontend now reads products from
// Postgres (via Prisma) instead of the hardcoded data/products.ts array.
// description/contents/includes come straight from the DB already "frozen"
// by the migration script, so no defaults system needs to run here.
export type ProductWithDetails = {
  id: number;
  name: string;
  category: Category;
  price: number;
  image: string;
  description: string;
  contents: ContentItem[];
  includes: string[];
};

function toProduct(row: {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
  contents: { name: string; detail: string; qty: number }[];
  includes: { text: string }[];
}): ProductWithDetails {
  return {
    id: row.id,
    name: row.name,
    category: row.category as Category,
    price: row.price,
    image: row.imageUrl,
    description: row.description,
    contents: row.contents.map((c) => ({ name: c.name, detail: c.detail, qty: c.qty })),
    includes: row.includes.map((i) => i.text),
  };
}

// Same order as the original data/products.ts array (grouped by category in
// file order), preserved via the `sortOrder` column set during migration.
export const getActiveProducts = cache(async (): Promise<ProductWithDetails[]> => {
  const rows = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: {
      contents: { orderBy: { sortOrder: "asc" } },
      includes: { orderBy: { sortOrder: "asc" } },
    },
  });
  return rows.map(toProduct);
});

export const getActiveProductById = cache(
  async (id: number): Promise<ProductWithDetails | null> => {
    const row = await prisma.product.findFirst({
      where: { id, isActive: true },
      include: {
        contents: { orderBy: { sortOrder: "asc" } },
        includes: { orderBy: { sortOrder: "asc" } },
      },
    });
    return row ? toProduct(row) : null;
  }
);
