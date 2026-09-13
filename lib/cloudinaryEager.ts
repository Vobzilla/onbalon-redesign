// Shared between the admin upload widget (client) and the one-time backfill
// script (prisma/warm-cloudinary-eager.ts) — both need the exact same eager
// transformation list, or warming would generate derived assets that don't
// match what the site actually requests.

// Mirrors next.config.js `images.deviceSizes`. next/image (`fill` layout)
// draws its srcset candidates from that array, so these are the real widths
// a visitor's browser can end up requesting — keep the two in sync.
export const EAGER_WIDTHS = [384, 640, 828, 1200, 1920] as const;

// Must produce the exact same transformation string lib/cloudinaryLoader.ts
// builds for delivery — Cloudinary caches by the literal transformation
// string, not by resolved output format. An eager entry for `f_webp,...`
// and a delivery request for `f_auto,...` are different cache keys even
// when f_auto happens to negotiate to webp bytes — confirmed via Admin
// API's resource() derived list showing both as separate entries. That's
// why the previous f_auto (then f_webp+f_jpg) eager attempts never actually
// warmed what real delivery requests. The loader now hardcodes f_webp too,
// so this string and the delivery URL are identical, not just same-format.
export function buildEagerParam(): string {
  return EAGER_WIDTHS.map((w) => `f_webp,q_auto:good,dpr_auto,w_${w}`).join("|");
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
