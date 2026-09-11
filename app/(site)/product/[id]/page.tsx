import Link from 'next/link'
import { getActiveProductById } from '@/lib/products'
import ProductPageClient from '@/components/ProductPageClient'

// Always read the current DB state (products can change in Postgres without a redeploy).
export const dynamic = 'force-dynamic'

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
