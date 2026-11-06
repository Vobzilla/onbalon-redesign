import { MetadataRoute } from 'next'
import { getActiveProductSitemapEntries } from '@/lib/products'
import { CATEGORY_PAGES } from '@/lib/categories'

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

  // Category pages: no lastModified, their text has no stored change date.
  const categoryUrls: MetadataRoute.Sitemap = CATEGORY_PAGES.map(c => ({
    url: `${BASE}/${c.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    { url: BASE,                              changeFrequency: 'weekly',  priority: 1.0 },
    ...categoryUrls,
    { url: `${BASE}/o-nas`,                   changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/polityka-prywatnosci`,    changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/regulamin-zwrotow`,       changeFrequency: 'yearly',  priority: 0.2 },
    ...productUrls,
  ]
}
