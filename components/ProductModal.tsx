'use client'

import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { Product } from '@/data/products'
import { useState } from 'react'

type Props = {
  product: Product | null
  onClose: () => void
}

export default function ProductModal({ product, onClose }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  if (!product) return null

  function handleAdd() {
    addItem(product!)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <div className="pm-overlay" onClick={onClose}>
      <div className="pm-sheet" onClick={e => e.stopPropagation()}>
        <button className="pm-close" onClick={onClose} aria-label="Zamknij">✕</button>

        <div className="pm-img-wrap">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 560px"
            style={{ objectFit: 'cover' }}
          />
          <span className="pm-category">{product.category}</span>
        </div>

        <div className="pm-body">
          <h2 className="pm-name">{product.name}</h2>
          <p className="pm-price">{product.price} <small>zł</small></p>
          <p className="pm-desc">
            Profesjonalna dekoracja balonowa z dostawą dopasowaną do Twojego terminu na terenie Szczecina.
            Po złożeniu zamówienia potwierdzimy szczegóły w ciągu 15 minut.
          </p>
          <button
            className={`btn-primary btn-full pm-add-btn${added ? ' added' : ''}`}
            onClick={handleAdd}
            style={added ? { background: '#2d7a3a' } : {}}
          >
            {added ? '✓ Dodano do koszyka!' : '🛒 Dodaj do koszyka'}
          </button>
        </div>
      </div>
    </div>
  )
}
