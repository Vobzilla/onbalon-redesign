import { NextResponse, type NextRequest } from "next/server";
import { createCommonContentItem, validateCommonContentItemInput } from "@/lib/commonContentItems";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = validateCommonContentItemInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const item = await createCommonContentItem(parsed.value);
  return NextResponse.json({ ok: true, id: item.id });
}
