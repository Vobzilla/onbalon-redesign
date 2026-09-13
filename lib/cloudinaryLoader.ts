type LoaderParams = { src: string; width: number; quality?: number }

// Fixed f_webp, not f_auto: Cloudinary treats f_auto and an explicit format
// as separate cache entries even when auto-negotiation resolves to the same
// bytes — confirmed via Admin API's resource() derived list showing both
// `f_auto,...` (format=jpg) and `f_webp,...` (format=webp) as distinct
// entries for the same image. That made eager-warming with an explicit
// format useless against real f_auto delivery requests, since they never
// shared a cache key. Pinning delivery to the exact string eager generates
// is what makes warming actually work. WebP has near-universal modern
// browser support — accepted as the final format, no per-client negotiation.
export default function cloudinaryLoader({ src, width }: LoaderParams): string {
  // Only transform Cloudinary URLs
  if (src.includes('res.cloudinary.com') && src.includes('/upload/')) {
    return src.replace('/upload/', `/upload/f_webp,q_auto:good,dpr_auto,w_${width}/`)
  }
  // For all other URLs (GitHub, etc.) — return as-is
  return src
}
