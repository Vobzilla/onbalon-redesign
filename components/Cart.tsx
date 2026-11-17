'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useCart, type AddonOption, type CartAddonLine } from '@/context/CartContext'
import { track, gaItems } from '@/lib/track'

type Props = { onCheckout: () => void; addons?: AddonOption[] }

type AddonRow = { key: string; addonId: number | null; name: string; price: number; qty: number }

export default function Cart({ onCheckout, addons: active = [] }: Props) {
  const { items, addons, totalPrice, isOpen, closeCart, changeQty, setAddonQty, syncAddons, loaded } = useCart()

  useEffect(() => {
    if (!isOpen) return
    track('view_cart', { currency: 'PLN', value: totalPrice, items: gaItems(items) })
    // Only when the cart opens, not on every quantity change while it is open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  // Lines from an old cart get their add-on id (and current name/price), once
  // the saved cart has been read.
  useEffect(() => {
    if (loaded && active.length > 0) syncAddons(active)
  }, [loaded, active, syncAddons])

  // Every active add-on (with its quantity in the cart, 0 if none), then any
  // add-on in the cart that is no longer active, so it can still be removed.
  const lineFor = (a: AddonOption) =>
    addons.find(l => (l.addonId !== null ? l.addonId === a.id : l.name === a.name))
  const rows: AddonRow[] = [
    ...active.map(a => ({ key: `a${a.id}`, addonId: a.id, name: a.name, price: a.price, qty: lineFor(a)?.qty ?? 0 })),
    ...addons
      .filter((l: CartAddonLine) => !active.some(a => (l.addonId !== null ? l.addonId === a.id : l.name === a.name)))
      .map(l => ({ key: `o${l.addonId ?? l.name}`, addonId: l.addonId, name: l.name, price: l.price, qty: l.qty })),
  ]
  const setQty = (r: AddonRow, qty: number) => setAddonQty({ addonId: r.addonId, name: r.name, price: r.price }, qty)

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
            <>
              {items.map(({ product, qty, selectedColor, selectedColorImage }) => (
                <div key={product.id} className="cart-item">
                  <div className="ci-img-wrap">
                    <Image src={selectedColorImage ?? product.image} alt={product.name} fill className="ci-img" sizes="64px" />
                  </div>
                  <div className="ci-info">
                    <p className="ci-name">{product.name}</p>
                    {selectedColor && <p className="ci-color">Kolor: {selectedColor}</p>}
                    <p className="ci-price">{product.price * qty} zł</p>
                  </div>
                  <div className="ci-qty">
                    <button className="qty-btn" onClick={() => changeQty(product.id, -1)}>−</button>
                    <span className="qty-n">{qty}</span>
                    <button className="qty-btn" onClick={() => changeQty(product.id, 1)}>+</button>
                  </div>
                </div>
              ))}

              {/* Add-ons: hidden while there are no products, but whatever is
                  in the cart stays there. */}
              {rows.length > 0 && (
                <div className="cart-addons">
                  <p className="prod-page-section-label">Dodaj do zamówienia</p>
                  {rows.map(r => (
                    <div key={r.key} className="cart-addon-row">
                      <div className="ci-info">
                        <p className="cart-addon-name">{r.name}</p>
                        <p className="ci-price">{r.qty > 0 ? `${r.price * r.qty} zł` : `${r.price} zł`}</p>
                      </div>
                      {r.qty > 0 ? (
                        <div className="ci-qty">
                          <button className="qty-btn" onClick={() => setQty(r, r.qty - 1)} aria-label={`Mniej: ${r.name}`}>−</button>
                          <span className="qty-n">{r.qty}</span>
                          <button className="qty-btn" onClick={() => setQty(r, r.qty + 1)} aria-label={`Więcej: ${r.name}`}>+</button>
                        </div>
                      ) : (
                        <button className="cart-addon-add" onClick={() => setQty(r, 1)}>+ Dodaj</button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
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
