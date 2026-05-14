'use client'

import { useState, FormEvent } from 'react'
import { useCart } from '@/context/CartContext'

type Props = { isOpen: boolean; onClose: () => void }

export default function OrderModal({ isOpen, onClose }: Props) {
  const { items, totalPrice, clear } = useCart()
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const fd = new FormData(e.currentTarget)
    const name    = (fd.get('name')  as string).trim()
    const contact = (fd.get('contact') as string).trim()
    const address = (fd.get('address') as string).trim()
    const date    = (fd.get('date')  as string).trim()
    const notes   = (fd.get('notes') as string).trim()

    if (!name || !contact || !address || !date) {
      setError('Proszę wypełnić wszystkie wymagane pola.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, address, date, notes, items, totalPrice }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
      clear()
    } catch {
      setError('Nie udało się wysłać zamówienia. Spróbuj ponownie lub napisz na Telegram.')
    } finally {
      setLoading(false)
    }
  }

  function handleClose() {
    onClose()
    setTimeout(() => { setSent(false); setError('') }, 300)
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose} aria-label="Zamknij">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {sent ? (
          <div className="modal-success">
            <div className="success-icon">✓</div>
            <h2>Zamówienie przyjęte!</h2>
            <p>Skontaktujemy się z Tobą w ciągu 15 minut przez Telegram, aby potwierdzić szczegóły dostawy.</p>
            <button className="btn-primary" onClick={handleClose} style={{ marginTop: '24px' }}>
              Zamknij
            </button>
          </div>
        ) : (
          <>
            <h2 className="modal-title">Złóż zamówienie</h2>
            <p className="modal-sub">Wypełnij formularz — odpiszemy w 15 minut.</p>

            <div className="order-summary">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="summary-line">
                  <span>{product.name} × {qty}</span>
                  <span>{product.price * qty} zł</span>
                </div>
              ))}
              <div className="summary-total">
                <span>Razem</span>
                <span>{totalPrice} zł</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <label>
                  Imię i nazwisko *
                  <input name="name" type="text" placeholder="Anna Kowalska" required />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Telefon lub Telegram *
                  <input name="contact" type="text" placeholder="+48 500 123 456 lub @username" required />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Adres dostawy *
                  <input name="address" type="text" placeholder="ul. Przykładowa 1, Szczecin" required />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Data i godzina dostawy *
                  <input name="date" type="datetime-local" required />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Uwagi
                  <textarea name="notes" placeholder="Kod domofonu, dodatkowe życzenia…" rows={3} />
                </label>
              </div>

              {error && <p className="form-error">{error}</p>}

              <div className="modal-actions">
                <button type="button" className="btn-ghost" onClick={handleClose}>Anuluj</button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Wysyłanie…' : 'Wyślij zamówienie'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
