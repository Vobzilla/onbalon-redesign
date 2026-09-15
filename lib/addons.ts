import { unstable_cache } from "next/cache";
import { revalidateTag } from "next/cache";
import { prisma } from "./db";

// Global add-on products (postcard, confetti popper, etc.) offered on every
// product page. Deliberately not linked to specific products/categories —
// see the brief: that's an explicit out-of-scope for the first version.
export type Addon = {
  id: number;
  name: string;
  price: number;
  imageUrl: string | null;
  isActive: boolean;
  sortOrder: number;
};

function toAddon(row: {
  id: number;
  name: string;
  price: number;
  imageUrl: string | null;
  isActive: boolean;
  sortOrder: number;
}): Addon {
  return {
    id: row.id,
    name: row.name,
    price: row.price,
    imageUrl: row.imageUrl,
    isActive: row.isActive,
    sortOrder: row.sortOrder,
  };
}

// Rendered on every public product page, so cached like the product data
// itself (see lib/products.ts) — invalidated via revalidateTag('addons-list')
// from the admin API right after a save.
export const listActiveAddons = async (): Promise<Addon[]> => {
  const rows = await unstable_cache(
    async () => prisma.addon.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } }),
    ["addons-list"],
    { tags: ["addons-list"], revalidate: 3600 }
  )();
  return rows.map(toAddon);
};

// Unlike the public list, the admin list includes deactivated addons.
export async function listAllAddons(): Promise<Addon[]> {
  const rows = await prisma.addon.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map(toAddon);
}

export async function getAddon(id: number): Promise<Addon | null> {
  const row = await prisma.addon.findUnique({ where: { id } });
  return row ? toAddon(row) : null;
}

export type AddonInput = { name: string; price: number; imageUrl: string | null; isActive: boolean };

function revalidateAddons(): void {
  revalidateTag("addons-list");
}

export async function createAddon(input: AddonInput): Promise<Addon> {
  const last = await prisma.addon.findFirst({ orderBy: { sortOrder: "desc" } });
  const row = await prisma.addon.create({
    data: { ...input, sortOrder: (last?.sortOrder ?? -1) + 1 },
  });
  revalidateAddons();
  return toAddon(row);
}

export async function updateAddon(id: number, input: AddonInput): Promise<Addon> {
  const row = await prisma.addon.update({ where: { id }, data: input });
  revalidateAddons();
  return toAddon(row);
}

export type ValidationResult = { ok: true; value: AddonInput } | { ok: false; error: string };

// The form already restricts these, but the API is a trust boundary.
export function validateAddonInput(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null) return { ok: false, error: "Nieprawidłowe dane" };
  const raw = body as Record<string, unknown>;

  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  if (!name) return { ok: false, error: "Nazwa jest wymagana" };

  const price = Number(raw.price);
  if (!Number.isInteger(price) || price < 0) {
    return { ok: false, error: "Cena musi być liczbą całkowitą" };
  }

  const imageUrl = typeof raw.imageUrl === "string" ? raw.imageUrl.trim() : "";

  return {
    ok: true,
    value: {
      name,
      price,
      imageUrl: imageUrl || null,
      isActive: raw.isActive !== false,
    },
  };
}
