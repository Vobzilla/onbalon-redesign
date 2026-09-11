import { NextResponse, type NextRequest } from "next/server";
import { deleteProduct, updateProduct, validateProductInput } from "@/lib/adminProducts";

type Params = { params: { id: string } };

export async function PUT(req: NextRequest, { params }: Params) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "Nieprawidłowy identyfikator" }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  const parsed = validateProductInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  await updateProduct(id, parsed.value);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "Nieprawidłowy identyfikator" }, { status: 400 });
  }

  await deleteProduct(id);
  return NextResponse.json({ ok: true });
}
