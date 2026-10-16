import { NextResponse, type NextRequest } from "next/server";
import { updateCommonContentItem, validateCommonContentItemInput } from "@/lib/commonContentItems";
import { requireAdmin } from "@/lib/adminSession";

type Params = { params: { id: string } };

export async function PUT(req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const id = Number(params.id);
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "Nieprawidłowy identyfikator" }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  const parsed = validateCommonContentItemInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  await updateCommonContentItem(id, parsed.value);
  return NextResponse.json({ ok: true });
}
