import { NextResponse } from "next/server";

// Values come from next.config.js's `env` block, which Next.js inlines as
// literal strings into the bundle during `next build` — not a runtime
// process.env lookup. That's deliberate: Netlify sets COMMIT_REF/DEPLOY_ID
// for the build step only, and a deployed function invocation isn't
// guaranteed to see them at request time.
//
// force-dynamic + Cache-Control: no-store so this endpoint is never served
// from Next's static/ISR output or any CDN layer — the whole point is to
// let a curl confirm what's actually live right now, cache included.
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      commit: process.env.COMMIT_REF || "local",
      deployId: process.env.DEPLOY_ID || null,
      builtAt: process.env.BUILT_AT || null,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
