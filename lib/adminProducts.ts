import { revalidatePath } from "next/cache";
import { prisma } from "./db";
import { slugify } from "./slugify";
import { CATEGORIES, type Category } from "@/data/products";
import { getProductDetails } from "@/data/productDefaults";
import { requiresContents } from "./productRules";

// The public catalog (/) and product pages are cached (ISR) for speed — this
// is what makes admin edits show up in seconds instead of waiting for the
// next scheduled revalidation.
function revalidateProduct(id: number): void {
  revalidatePath("/");
  revalidatePath(`/product/${id}`);
}

export type ProductInput = {
  name: string;
  category: Category;
  price: number;
  description: string;
  image: string;
  isActive: boolean;
  contents: { name: string; detail: string; qty: number }[];
  includes: string[];
};

export type AdminProduct = ProductInput & { id: number; slug: string };

const productInclude = {
  contents: { orderBy: { sortOrder: "asc" } },
  includes: { orderBy: { sortOrder: "asc" } },
} as const;

type ProductRow = {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  isActive: boolean;
  contents: { name: string; detail: string; qty: number }[];
  includes: { text: string }[];
};

function toAdminProduct(row: ProductRow): AdminProduct {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category as Category,
    price: row.price,
    description: row.description,
    image: row.imageUrl,
    isActive: row.isActive,
    contents: row.contents.map((c) => ({ name: c.name, detail: c.detail, qty: c.qty })),
    includes: row.includes.map((i) => i.text),
  };
}

// Unlike the public catalog, the admin list includes hidden products.
export async function listAllProducts(): Promise<AdminProduct[]> {
  const rows = await prisma.product.findMany({
    orderBy: { sortOrder: "asc" },
    include: productInclude,
  });
  return rows.map(toAdminProduct);
}

export async function getProductForAdmin(id: number): Promise<AdminProduct | null> {
  const row = await prisma.product.findUnique({ where: { id }, include: productInclude });
  return row ? toAdminProduct(row) : null;
}

// Empty description/includes fall back to the category defaults — the same
// ones the 171 migrated products were built from. The resolved text is written
// into the row, so editing data/productDefaults.ts later never rewrites
// products that were already saved.
function withCategoryDefaults(input: ProductInput): ProductInput {
  const defaults = getProductDetails({
    name: input.name,
    category: input.category,
    description: input.description || undefined,
    includes: input.includes.length > 0 ? input.includes : undefined,
  });

  return { ...input, description: defaults.description, includes: defaults.includes };
}

async function uniqueSlug(name: string, excludeId?: number): Promise<string> {
  const base = slugify(name) || "produkt";
  let candidate = base;

  for (let suffix = 2; ; suffix++) {
    const clash = await prisma.product.findUnique({ where: { slug: candidate } });
    if (!clash || clash.id === excludeId) return candidate;
    candidate = `${base}-${suffix}`;
  }
}

export async function createProduct(rawInput: ProductInput): Promise<AdminProduct> {
  const input = withCategoryDefaults(rawInput);
  const slug = await uniqueSlug(input.name);
  const last = await prisma.product.findFirst({ orderBy: { sortOrder: "desc" } });

  const row = await prisma.product.create({
    data: {
      name: input.name,
      slug,
      category: input.category,
      price: input.price,
      description: input.description,
      imageUrl: input.image,
      isActive: input.isActive,
      sortOrder: (last?.sortOrder ?? -1) + 1,
      contents: {
        create: input.contents.map((item, index) => ({ ...item, sortOrder: index })),
      },
      includes: {
        create: input.includes.map((text, index) => ({ text, sortOrder: index })),
      },
    },
    include: productInclude,
  });
  revalidateProduct(row.id);
  return toAdminProduct(row);
}

export async function updateProduct(id: number, rawInput: ProductInput): Promise<AdminProduct> {
  const input = withCategoryDefaults(rawInput);
  const slug = await uniqueSlug(input.name, id);

  // contents/includes are ordered lists owned by the product, so replacing them
  // wholesale is simpler and safer than diffing rows.
  const [, , row] = await prisma.$transaction([
    prisma.productContent.deleteMany({ where: { productId: id } }),
    prisma.productInclude.deleteMany({ where: { productId: id } }),
    prisma.product.update({
      where: { id },
      data: {
        name: input.name,
        slug,
        category: input.category,
        price: input.price,
        description: input.description,
        imageUrl: input.image,
        isActive: input.isActive,
        contents: {
          create: input.contents.map((item, index) => ({ ...item, sortOrder: index })),
        },
        includes: {
          create: input.includes.map((text, index) => ({ text, sortOrder: index })),
        },
      },
      include: productInclude,
    }),
  ]);

  revalidateProduct(row.id);
  return toAdminProduct(row);
}

export async function deleteProduct(id: number): Promise<void> {
  await prisma.product.delete({ where: { id } });
  revalidateProduct(id);
}

export type ValidationResult = { ok: true; value: ProductInput } | { ok: false; error: string };

// The form already restricts these, but the API is a trust boundary.
export function validateProductInput(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null) return { ok: false, error: "Nieprawidłowe dane" };
  const raw = body as Record<string, unknown>;

  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  if (!name) return { ok: false, error: "Nazwa jest wymagana" };

  const category = raw.category;
  if (typeof category !== "string" || !CATEGORIES.includes(category as Category)) {
    return { ok: false, error: "Nieprawidłowa kategoria" };
  }

  const price = Number(raw.price);
  if (!Number.isInteger(price) || price < 0) {
    return { ok: false, error: "Cena musi być liczbą całkowitą" };
  }

  // Empty is allowed — the category default is filled in before saving.
  const description = typeof raw.description === "string" ? raw.description.trim() : "";

  const image = typeof raw.image === "string" ? raw.image.trim() : "";
  if (!image) return { ok: false, error: "Zdjęcie jest wymagane" };

  const contentsRaw = Array.isArray(raw.contents) ? raw.contents : [];
  const contents: ProductInput["contents"] = [];
  for (const item of contentsRaw) {
    if (typeof item !== "object" || item === null) continue;
    const entry = item as Record<string, unknown>;
    const itemName = typeof entry.name === "string" ? entry.name.trim() : "";
    if (!itemName) continue;
    const qty = Number(entry.qty);
    if (!Number.isInteger(qty) || qty < 1) {
      return { ok: false, error: `Nieprawidłowa ilość dla "${itemName}"` };
    }
    contents.push({
      name: itemName,
      detail: typeof entry.detail === "string" ? entry.detail.trim() : "",
      qty,
    });
  }

  // Unlike description/includes there is no default for the set composition,
  // so it's required — except for decorations, which don't have one at all.
  if (contents.length === 0 && requiresContents(category as Category)) {
    return { ok: false, error: "Dodaj przynajmniej jedną pozycję w „Zestaw zawiera”" };
  }

  const includesRaw = Array.isArray(raw.includes) ? raw.includes : [];
  const includes = includesRaw
    .filter((text): text is string => typeof text === "string")
    .map((text) => text.trim())
    .filter(Boolean);

  return {
    ok: true,
    value: {
      name,
      category: category as Category,
      price,
      description,
      image,
      isActive: raw.isActive !== false,
      contents,
      includes,
    },
  };
}
