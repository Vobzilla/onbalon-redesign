import { NextResponse, type NextRequest } from "next/server";
import { createProduct, validateProductInput } from "@/lib/adminProducts";
import { requireAdmin } from "@/lib/adminSession";

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await req.json().catch(() => null);
  const parsed = validateProductInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const product = await createProduct(parsed.value);
  return NextResponse.json({ ok: true, id: product.id });
}
