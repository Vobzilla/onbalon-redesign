import { NextResponse, type NextRequest } from "next/server";
import { createAddon, validateAddonInput } from "@/lib/addons";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = validateAddonInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const addon = await createAddon(parsed.value);
  return NextResponse.json({ ok: true, id: addon.id });
}
