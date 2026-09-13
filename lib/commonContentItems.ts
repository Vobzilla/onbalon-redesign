import { prisma } from "./db";

// Purely a pick-list to speed up filling "Zestaw zawiera" in the product
// form — no relation to product_contents. Picking an item just copies its
// name/detail into an editable row, same as the manual "Dodaj pozycję" row.
export type CommonContentItem = {
  id: number;
  name: string;
  detail: string;
  isActive: boolean;
  sortOrder: number;
};

function toItem(row: {
  id: number;
  name: string;
  detail: string;
  isActive: boolean;
  sortOrder: number;
}): CommonContentItem {
  return {
    id: row.id,
    name: row.name,
    detail: row.detail,
    isActive: row.isActive,
    sortOrder: row.sortOrder,
  };
}

// For the product form's quick-add dropdown.
export async function listActiveCommonContentItems(): Promise<CommonContentItem[]> {
  const rows = await prisma.commonContentItem.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
  return rows.map(toItem);
}

// For the /admin/content-items management list — includes deactivated items.
export async function listAllCommonContentItems(): Promise<CommonContentItem[]> {
  const rows = await prisma.commonContentItem.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map(toItem);
}

export async function getCommonContentItem(id: number): Promise<CommonContentItem | null> {
  const row = await prisma.commonContentItem.findUnique({ where: { id } });
  return row ? toItem(row) : null;
}

export type CommonContentItemInput = { name: string; detail: string; isActive: boolean };

export async function createCommonContentItem(
  input: CommonContentItemInput
): Promise<CommonContentItem> {
  const last = await prisma.commonContentItem.findFirst({ orderBy: { sortOrder: "desc" } });
  const row = await prisma.commonContentItem.create({
    data: { ...input, sortOrder: (last?.sortOrder ?? -1) + 1 },
  });
  return toItem(row);
}

export async function updateCommonContentItem(
  id: number,
  input: CommonContentItemInput
): Promise<CommonContentItem> {
  const row = await prisma.commonContentItem.update({ where: { id }, data: input });
  return toItem(row);
}

export type ValidationResult =
  | { ok: true; value: CommonContentItemInput }
  | { ok: false; error: string };

// The form already restricts these, but the API is a trust boundary.
export function validateCommonContentItemInput(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null) return { ok: false, error: "Nieprawidłowe dane" };
  const raw = body as Record<string, unknown>;

  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  if (!name) return { ok: false, error: "Nazwa jest wymagana" };

  const detail = typeof raw.detail === "string" ? raw.detail.trim() : "";

  return {
    ok: true,
    value: { name, detail, isActive: raw.isActive !== false },
  };
}
