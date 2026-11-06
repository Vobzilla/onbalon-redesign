'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Category } from '@/data/products'
import type { ProductWithDetails } from '@/lib/products'
import { useCart } from '@/context/CartContext'
import { track, gaItems, trackMeta, metaContents } from '@/lib/track'

// One catalog card with its «Dodaj do koszyka» button — shared by the home
// page catalog (ProductsSection) and the category pages, so both look and
// track the same way.

const PILL_CLASS: Record<Category, string> = {
  'Roczek':               'pill-roczek',
  '18-tka':               'pill-18-ka',
  'Dla niej':             'pill-dla-niej',
  'Dla niego':            'pill-dla-niego',
  'Dla dziecka':          'pill-dziecka',
  'Dekoracje balonowe':   'pill-dekoracje',
  'Hello Baby':           'pill-hello-baby',
  'Małe Zestawy':         'pill-male-zestawy',
}

// `sizes` for the card photo = the card's real width at each breakpoint of
// .prod-grid (1 column up to 580px, 2 up to 1100px, 3 above; the container
// stops growing at ~380px per card), measured on the live pages and rounded
// slightly up so photos never get blurry. The home catalog and the category
// pages have different side padding, hence two strings.
export const CARD_SIZES_HOME =
  '(max-width: 580px) calc(100vw - 96px), (max-width: 900px) calc((100vw - 80px) / 2), ' +
  '(max-width: 1100px) calc((100vw - 200px) / 2), (max-width: 1350px) calc((100vw - 214px) / 3), 380px'
export const CARD_SIZES_CATEGORY =
  '(max-width: 580px) calc(100vw - 48px), (max-width: 900px) calc((100vw - 60px) / 2), ' +
  '(max-width: 1100px) calc((100vw - 110px) / 2), (max-width: 1300px) calc((100vw - 140px) / 3), 380px'

// Adds a product to the cart and reports add_to_cart (GA4) / AddToCart (Meta)
// with the given source; `added` drives the check mark on the button.
export function useAddToCart(source: 'catalog' | 'category') {
  const [added, setAdded] = useState<number | null>(null)
  const { addItem } = useCart()

  function handleAdd(e: React.MouseEvent, product: ProductWithDetails) {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    track('add_to_cart', { currency: 'PLN', value: product.price, items: gaItems([{ product, qty: 1 }]), source })
    trackMeta('AddToCart', { ...metaContents([{ product, qty: 1 }]), content_name: product.name, currency: 'PLN', value: product.price, source })
    setAdded(product.id)
    setTimeout(() => setAdded(null), 1400)
  }

  return { added, handleAdd }
}

type Props = {
  product: ProductWithDetails
  added: boolean
  onAdd: (e: React.MouseEvent, product: ProductWithDetails) => void
  onOpen?: () => void
  // Load eagerly with high priority (next/image `priority`): for the cards
  // that are the page's largest image above the fold.
  priority?: boolean
  sizes: string
}

export default function ProductCard({ product, added, onAdd, onOpen, priority = false, sizes }: Props) {
  return (
    <Link href={`/product/${product.id}`} className="prod-card-link" onClick={onOpen}>
      <article className="prod-card">
        <div className="prod-img-wrap">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes={sizes}
            className="prod-img"
            priority={priority}
          />
          <span className={`prod-category-pill ${PILL_CLASS[product.category]}`}>
            {product.category}
          </span>
        </div>
        <div className="prod-body">
          <p className="prod-cat-label">{product.category}</p>
          <h3 className="prod-name">{product.name}</h3>
          <div className="prod-foot">
            <span className="prod-price">
              {product.category === 'Dekoracje balonowe' && <small>od </small>}
              {product.price} <small>zł</small>
            </span>
            <div className="prod-btns">
              <span className="detail-btn">Szczegóły →</span>
              <button
                data-keep-clear
                className={`add-cart-btn${added ? ' added' : ''}`}
                onClick={e => onAdd(e, product)}
                title="Dodaj do koszyka"
                aria-label="Dodaj do koszyka"
              >
                {added
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                }
              </button>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
