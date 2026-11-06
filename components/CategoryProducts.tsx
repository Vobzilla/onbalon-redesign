'use client'

import type { ProductWithDetails } from '@/lib/products'
import ProductCard, { useAddToCart } from '@/components/ProductCard'

// The product grid of a category page: every active product of the category,
// same cards and cart button as the home catalog, tracked with source=category.
export default function CategoryProducts({ products }: { products: ProductWithDetails[] }) {
  const { added, handleAdd } = useAddToCart('category')

  return (
    <div className="prod-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          added={added === product.id}
          onAdd={handleAdd}
        />
      ))}
    </div>
  )
}
