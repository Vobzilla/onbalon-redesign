type LoaderParams = { src: string; width: number; quality?: number }

export default function cloudinaryLoader({ src, width }: LoaderParams): string {
  // Only transform Cloudinary URLs
  if (src.includes('res.cloudinary.com') && src.includes('/upload/')) {
    return src.replace('/upload/', `/upload/f_auto,q_auto:good,dpr_auto,w_${width}/`)
  }
  // For all other URLs (GitHub, etc.) — return as-is
  return src
}
