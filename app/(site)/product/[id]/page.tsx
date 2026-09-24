import Link from 'next/link'
import { getActiveProductById } from '@/lib/products'
import { listActiveAddons } from '@/lib/addons'
import ProductPageClient from '@/components/ProductPageClient'

// No ISR/Full Route Cache for this route — that layer is what kept serving
// stale/empty (304, no body) responses from Netlify's Durable cache. The
// underlying data (getActiveProductById/listActiveAddons) is still cached
// via unstable_cache (Data Cache, a separate layer) — see lib/products.ts /
// lib/addons.ts, both untouched by this change.
export const dynamic = 'force-dynamic'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const [product, addons] = await Promise.all([
    getActiveProductById(Number(params.id)),
    listActiveAddons(),
  ])

  if (!product) {
    return (
      <div style={{ padding: '140px 24px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: 16 }}>Produkt nie znaleziony</h2>
        <Link href="/" style={{ color: 'var(--accent)', fontWeight: 600 }}>
          ← Wróć do strony głównej
        </Link>
      </div>
    )
  }

  return <ProductPageClient product={product} addons={addons} />
}
