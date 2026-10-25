import { MetadataRoute } from 'next'
import { getActiveProductSitemapEntries } from '@/lib/products'

const BASE = 'https://onbalon.pl'

// lastModified only where there is a real date: products use their DB
// updatedAt; static pages have none, so they omit it rather than claim
// "changed at build time".
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getActiveProductSitemapEntries()
  const productUrls: MetadataRoute.Sitemap = products.map(p => ({
    url: `${BASE}/product/${p.id}`,
    lastModified: p.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    { url: BASE,                              changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/o-nas`,                   changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/polityka-prywatnosci`,    changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/regulamin-zwrotow`,       changeFrequency: 'yearly',  priority: 0.2 },
    ...productUrls,
  ]
}
