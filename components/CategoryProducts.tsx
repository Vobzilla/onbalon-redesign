'use client'

import type { ProductWithDetails } from '@/lib/products'
import ProductCard, { useAddToCart } from '@/components/ProductCard'

// The product grid of a category page: every active product of the category,
// same cards and cart button as the home catalog, tracked with source=category.
export default function CategoryProducts({ products }: { products: ProductWithDetails[] }) {
  const { added, handleAdd } = useAddToCart('category')

  return (
    <div className="prod-grid">
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          // The first card is the LCP element on a phone; the second sits
          // next to it on wider screens.
          priority={i < 2}
          added={added === product.id}
          onAdd={handleAdd}
        />
      ))}
    </div>
  )
}
