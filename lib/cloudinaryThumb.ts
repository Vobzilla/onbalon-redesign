// Small square preview for the admin UI. The admin tables/forms use plain
// <img> (not next/image), so the Cloudinary transform is applied here.
export function thumbUrl(src: string, size = 96): string {
  if (src.includes("res.cloudinary.com") && src.includes("/upload/")) {
    return src.replace("/upload/", `/upload/f_auto,q_auto,c_fill,w_${size},h_${size}/`);
  }
  return src;
}
