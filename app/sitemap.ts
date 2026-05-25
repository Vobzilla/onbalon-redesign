import { MetadataRoute } from 'next'
import { products } from '@/data/products'

const BASE = 'https://onbalon.pl'

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls: MetadataRoute.Sitemap = products.map(p => ({
    url: `${BASE}/product/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    { url: BASE,                              lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/o-nas`,                   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/polityka-prywatnosci`,    lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
    ...productUrls,
  ]
}
