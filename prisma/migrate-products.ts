/**
 * One-time migration: copy the hardcoded `products` array from data/products.ts
 * into Supabase Postgres via Prisma.
 *
 * - For each product, description/includes are computed with the SAME logic
 *   the site currently uses (getProductDetails from data/productDefaults.ts)
 *   and written to the DB as-is ("frozen defaults") — no defaults system is
 *   migrated, just its output per product.
 * - contents[] and includes[] become rows in product_contents / product_includes.
 * - Original numeric `id`s are preserved as the DB primary key, so
 *   /product/{id} URLs keep working once the frontend is later switched to the DB.
 * - Safe to re-run: it wipes the products table (cascades to contents/includes)
 *   before inserting, so running it twice doesn't create duplicates.
 *
 * Run with: npm run migrate:products
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { products } from "../data/products";
import { getProductDetails } from "../data/productDefaults";

const prisma = new PrismaClient();

const POLISH_MAP: Record<string, string> = {
  ą: "a", ć: "c", ę: "e", ł: "l", ń: "n", ó: "o", ś: "s", ź: "z", ż: "z",
  Ą: "a", Ć: "c", Ę: "e", Ł: "l", Ń: "n", Ó: "o", Ś: "s", Ź: "z", Ż: "z",
};

function slugify(input: string): string {
  const withoutDiacritics = input
    .split("")
    .map((ch) => POLISH_MAP[ch] ?? ch)
    .join("");

  // Any remaining non-ascii/non-alnum char (incl. stray diacritics) collapses to "-".
  return withoutDiacritics
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function uniqueSlugFor(product: { id: number; name: string }, used: Set<string>): string {
  const base = slugify(product.name) || `product-${product.id}`;
  if (!used.has(base)) {
    used.add(base);
    return base;
  }
  const withId = `${base}-${product.id}`;
  used.add(withId);
  return withId;
}

async function main() {
  console.log(`Source: ${products.length} products in data/products.ts\n`);

  // Wipe first so the script is safely re-runnable (contents/includes cascade).
  await prisma.product.deleteMany();

  const usedSlugs = new Set<string>();
  const failures: { id: number; name: string; error: string }[] = [];
  let migrated = 0;

  for (const [index, product] of products.entries()) {
    const details = getProductDetails(product); // frozen description/contents/includes
    const slug = uniqueSlugFor(product, usedSlugs);

    try {
      await prisma.product.create({
        data: {
          id: product.id,
          name: product.name,
          slug,
          category: product.category,
          price: product.price,
          description: details.description,
          imageUrl: product.image,
          isActive: true,
          hasColorVariants: false,
          // Preserves the exact display order from data/products.ts (category
          // blocks in file order), which isn't reproducible by sorting on id.
          sortOrder: index,
          contents: {
            create: details.contents.map((item, index) => ({
              name: item.name,
              detail: item.detail,
              qty: item.qty,
              sortOrder: index,
            })),
          },
          includes: {
            create: details.includes.map((text, index) => ({
              text,
              sortOrder: index,
            })),
          },
        },
      });
      migrated++;
    } catch (err) {
      failures.push({
        id: product.id,
        name: product.name,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  const dbCount = await prisma.product.count();

  console.log(`Migrated: ${migrated} / ${products.length}`);
  console.log(`Rows now in "products" table: ${dbCount}`);

  if (failures.length > 0) {
    console.log(`\nFailed (${failures.length}):`);
    for (const f of failures) {
      console.log(`  - #${f.id} "${f.name}": ${f.error}`);
    }
  } else {
    console.log("No failures.");
  }

  // Sample check: mix of default-description product, custom-includes product,
  // and a plain product with multiple contents rows.
  const sampleIds = [1, 18, 154];
  const samples = await prisma.product.findMany({
    where: { id: { in: sampleIds } },
    include: { contents: true, includes: true },
    orderBy: { id: "asc" },
  });

  console.log("\nSample products:");
  for (const p of samples) {
    console.log(`\n#${p.id} ${p.name} [${p.category}] — ${p.price} zł`);
    console.log(`  slug: ${p.slug}`);
    console.log(`  image: ${p.imageUrl}`);
    console.log(`  description: ${p.description}`);
    console.log(`  contents (${p.contents.length}):`);
    for (const c of p.contents) {
      console.log(`    - ${c.name} (${c.detail}) x${c.qty}`);
    }
    console.log(`  includes (${p.includes.length}):`);
    for (const i of p.includes) {
      console.log(`    - ${i.text}`);
    }
  }
}

main()
  .catch((err) => {
    console.error("Migration failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
