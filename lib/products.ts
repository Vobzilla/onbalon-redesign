import { cache } from "react";
import { unstable_cache } from "next/cache";
import { prisma } from "./db";
import type { Category, ContentItem } from "@/data/products";

// Server-only data access — the public frontend now reads products from
// Postgres (via Prisma) instead of the hardcoded data/products.ts array.
// description/contents/includes come straight from the DB already "frozen"
// by the migration script, so no defaults system needs to run here.
export type ColorVariant = { colorName: string; imageUrl: string };

export type ProductWithDetails = {
  id: number;
  name: string;
  category: Category;
  price: number;
  image: string;
  description: string;
  contents: ContentItem[];
  includes: string[];
  hasColorVariants: boolean;
  colorVariants: ColorVariant[];
};

function toProduct(row: {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
  hasColorVariants: boolean;
  contents: { name: string; detail: string; qty: number }[];
  includes: { text: string }[];
  colorVariants: { colorName: string; imageUrl: string }[];
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
    hasColorVariants: row.hasColorVariants,
    colorVariants: row.colorVariants.map((v) => ({ colorName: v.colorName, imageUrl: v.imageUrl })),
  };
}

// Same order as the original data/products.ts array (grouped by category in
// file order), preserved via the `sortOrder` column set during migration.
//
// Wrapped in unstable_cache (tagged 'products-list'), same reasoning as
// getActiveProductById below: the admin API needs to invalidate this via
// revalidateTag, not revalidatePath('/') — mixing revalidatePath and
// revalidateTag in one request turned out to make Netlify's adapter drop the
// revalidatePath signal (confirmed by diagnosis: worked locally, not on
// Netlify), so revalidateProduct() now uses tags exclusively for both.
export const getActiveProducts = cache(async (): Promise<ProductWithDetails[]> => {
  const rows = await unstable_cache(
    async () =>
      prisma.product.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
        include: {
          contents: { orderBy: { sortOrder: "asc" } },
          includes: { orderBy: { sortOrder: "asc" } },
          colorVariants: { orderBy: { sortOrder: "asc" } },
        },
      }),
    ["products-list"],
    { tags: ["products-list"], revalidate: 3600 }
  )();
  return rows.map(toProduct);
});

// Wrapped in unstable_cache (tagged `product-${id}`) because the data comes
// from Prisma, not fetch() — fetch's own cache tags don't apply here. This is
// what lets the admin API invalidate a single product's page on Netlify via
// revalidateTag instead of revalidatePath, which — per diagnosis — doesn't
// reliably purge Netlify's Durable cache for statically-generated dynamic
// routes. `revalidate: 3600` mirrors the page's own time-based fallback, so
// that fallback still refreshes actual data instead of re-rendering the same
// stale cache entry every hour.
export const getActiveProductById = cache(
  async (id: number): Promise<ProductWithDetails | null> => {
    const row = await unstable_cache(
      async () =>
        prisma.product.findFirst({
          where: { id, isActive: true },
          include: {
            contents: { orderBy: { sortOrder: "asc" } },
            includes: { orderBy: { sortOrder: "asc" } },
            colorVariants: { orderBy: { sortOrder: "asc" } },
          },
        }),
      [`product-${id}`],
      { tags: [`product-${id}`], revalidate: 3600 }
    )();
    return row ? toProduct(row) : null;
  }
);

// For generateStaticParams only — a plain, uncached query. Calling the
// unstable_cache-wrapped getActiveProducts() from generateStaticParams (a
// separate build-time phase from normal page rendering) is what caused
// `next build` to fail with ECONNRESET on the home page and sitemap: both
// call the SAME cache entry from the regular render phase, and that seems to
// race with generateStaticParams's own use of it. generateStaticParams runs
// once at build time anyway, so it never needed caching in the first place.
export async function getActiveProductIds(): Promise<number[]> {
  const rows = await prisma.product.findMany({
    where: { isActive: true },
    select: { id: true },
  });
  return rows.map((r) => r.id);
}
