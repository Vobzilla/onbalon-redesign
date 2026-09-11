import type { Category } from "@/data/products";

// Balloon decorations are priced individually ("od X zł") and have no fixed set
// composition — none of the existing ones list one, and the product page hides
// the "Zestaw" section when it's empty. Every other category always has one.
export function requiresContents(category: Category): boolean {
  return category !== "Dekoracje balonowe";
}
