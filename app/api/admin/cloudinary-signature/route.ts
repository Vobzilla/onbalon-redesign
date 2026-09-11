import { NextResponse, type NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "dnyevlhh7";

// The widget needs the cloud name + API key (both public) to start.
export async function GET() {
  const apiKey = process.env.CLOUDINARY_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Cloudinary nie jest skonfigurowany" }, { status: 500 });
  }
  return NextResponse.json({ cloudName: CLOUD_NAME, apiKey });
}

// The widget asks the server to sign each upload; only the secret stays here.
export async function POST(req: NextRequest) {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!apiSecret) {
    return NextResponse.json({ error: "Cloudinary nie jest skonfigurowany" }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  const paramsToSign = body?.paramsToSign;
  if (typeof paramsToSign !== "object" || paramsToSign === null) {
    return NextResponse.json({ error: "Brak parametrów do podpisania" }, { status: 400 });
  }

  const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);
  return NextResponse.json({ signature });
}
