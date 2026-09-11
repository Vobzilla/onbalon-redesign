import Link from 'next/link'
import { getActiveProductById, getActiveProductIds } from '@/lib/products'
import ProductPageClient from '@/components/ProductPageClient'

// Statically generated and cached; the admin API triggers an on-demand
// revalidation via revalidateTag(`product-${id}`) right after a save/delete,
// so this is a fallback for anything that misses that (e.g. a direct DB edit).
export const revalidate = 3600

// Required for a dynamic segment to be eligible for ISR at all — without it
// Next.js 13 renders /product/[id] on every request, ignoring `revalidate`.
// Pre-builds every active product page; a product added later (not in this
// list) still works via the default dynamicParams=true — rendered on its
// first visit, then cached like the rest.
//
// Uses the plain getActiveProductIds() (not the cached getActiveProducts())
// — calling the unstable_cache-wrapped version from here made `next build`
// fail with ECONNRESET on the home page and sitemap.
export async function generateStaticParams() {
  const ids = await getActiveProductIds()
  return ids.map((id) => ({ id: String(id) }))
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getActiveProductById(Number(params.id))

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

  return <ProductPageClient product={product} />
}
