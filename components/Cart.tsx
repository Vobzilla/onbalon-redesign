'use client'

import Image from 'next/image'
import { useCart } from '@/context/CartContext'

type Props = { onCheckout: () => void }

export default function Cart({ onCheckout }: Props) {
  const { items, totalPrice, isOpen, closeCart, changeQty } = useCart()

  return (
    <>
      <div className={`cart-overlay${isOpen ? ' open' : ''}`} onClick={closeCart} />
      <aside className={`cart-sidebar${isOpen ? ' open' : ''}`}>
        <div className="cart-head">
          <h2 className="cart-title">Koszyk</h2>
          <button className="cart-close" onClick={closeCart} aria-label="Zamknij">
            <CloseIcon />
          </button>
        </div>

        <div className="cart-body" tabIndex={0}>
          {items.length === 0 ? (
            <div className="cart-empty">
              <p>Koszyk jest pusty.</p>
              <p className="cart-empty-sub">Dodaj produkty z katalogu.</p>
            </div>
          ) : (
            items.map(({ product, qty }) => (
              <div key={product.id} className="cart-item">
                <div className="ci-img-wrap">
                  <Image src={product.image} alt={product.name} fill className="ci-img" sizes="64px" />
                </div>
                <div className="ci-info">
                  <p className="ci-name">{product.name}</p>
                  <p className="ci-price">{product.price * qty} zł</p>
                </div>
                <div className="ci-qty">
                  <button className="qty-btn" onClick={() => changeQty(product.id, -1)}>−</button>
                  <span className="qty-n">{qty}</span>
                  <button className="qty-btn" onClick={() => changeQty(product.id, 1)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-foot">
            <div className="cart-total">
              <span>Razem</span>
              <span className="cart-total-price">{totalPrice} zł</span>
            </div>
            <button className="btn-primary btn-full" onClick={() => { closeCart(); onCheckout() }}>
              Złóż zamówienie
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}
