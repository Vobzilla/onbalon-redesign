type LoaderParams = { src: string; width: number; quality?: number }

export default function cloudinaryLoader({ src, width }: LoaderParams): string {
  // Only transform Cloudinary URLs
  if (src.includes('res.cloudinary.com') && src.includes('/upload/')) {
    // Always q_auto:best — no quality loss, only the pixel dimensions scale
    // down per breakpoint so small previews don't download full-size files.
    return src.replace('/upload/', `/upload/f_auto,q_auto:best,w_${width}/`)
  }
  // For all other URLs (GitHub, etc.) — return as-is
  return src
}
