// Shared between the admin upload widget (client) and the one-time backfill
// script (prisma/warm-cloudinary-eager.ts) — both need the exact same eager
// transformation list, or warming would generate derived assets that don't
// match what the site actually requests.

// Mirrors next.config.js `images.deviceSizes`. next/image (`fill` layout)
// draws its srcset candidates from that array, so these are the real widths
// a visitor's browser can end up requesting — keep the two in sync.
export const EAGER_WIDTHS = [384, 640, 828, 1200, 1920] as const;

// `f_auto` cannot be used in eager transformations: it's resolved once at
// generation time (Cloudinary defaults to JPG with no requesting client to
// negotiate with), while real delivery requests negotiate a format per
// visitor's Accept header (WebP for basically all current browsers, JPG as
// the fallback for old/no-JS clients). Verified empirically — eager'd JPGs
// never matched what a real <img> load actually got serving via f_auto, so
// every real first visit still hit a cold miss despite "successful" warming.
// Generating both formats explicitly covers what real delivery actually
// negotiates. (AVIF isn't included: Cloudinary's f_auto negotiation for this
// account resolved to WebP even with AVIF present in the Accept header —
// confirmed by testing — so a third AVIF variant would just double eager
// costs for a format nothing here actually requests.)
//
// Same params as lib/cloudinaryLoader.ts otherwise, just varying `f_`/`w_`.
// Cloudinary's `eager` param takes a "|"-separated list of transformation
// strings — this exact format works for both the Upload API (widget) and
// the Admin API (`explicit`, used by the backfill script).
export function buildEagerParam(): string {
  const formats = ["webp", "jpg"] as const;
  return EAGER_WIDTHS.flatMap((w) =>
    formats.map((f) => `f_${f},q_auto:good,dpr_auto,w_${w}`)
  ).join("|");
}

// Our stored image URLs come in two shapes:
//   .../upload/onbalon/roczek/roczek-1                         (bulk-migrated, no version/ext)
//   .../upload/v1789122145/onbalon/panel/nwudr05j8sxs2bloug8x.jpg  (admin-uploaded)
// The Admin API's `explicit` needs the bare public_id — no version, no extension.
export function extractCloudinaryPublicId(url: string): string | null {
  const afterUpload = url.split("/upload/")[1];
  if (!afterUpload) return null;
  const withoutVersion = afterUpload.replace(/^v\d+\//, "");
  const withoutExt = withoutVersion.replace(/\.[a-z0-9]{2,4}$/i, "");
  return withoutExt || null;
}
