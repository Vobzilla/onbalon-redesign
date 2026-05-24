'use client'

import { useState, FormEvent } from 'react'
import { useCart } from '@/context/CartContext'

type Props = { isOpen: boolean; onClose: () => void }
type DeliveryType = 'delivery' | 'pickup'

function getMinDateTime() {
  const d = new Date(Date.now() + 5 * 60 * 60 * 1000)
  // format: YYYY-MM-DDTHH:MM
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export default function OrderModal({ isOpen, onClose }: Props) {
  const { items, totalPrice, clear } = useCart()
  const [sent, setSent]               = useState(false)
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState('')
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('delivery')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const fd      = new FormData(e.currentTarget)
    const name    = String(fd.get('name')    || '').trim()
    const contact = String(fd.get('contact') || '').trim()
    const address = deliveryType === 'delivery'
      ? String(fd.get('address') || '').trim()
      : 'Odbior osobisty'
    const date    = String(fd.get('date')    || '').trim()
    const notes   = String(fd.get('notes')   || '').trim()

    if (!name || !contact || !date) {
      setError('Proszę wypełnić wszystkie wymagane pola.')
      return
    }
    if (deliveryType === 'delivery' && !address) {
      setError('Proszę podać adres dostawy.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, address, date, notes, deliveryType, items, totalPrice }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Unknown error')
      }
      setSent(true)
      clear()
    } catch (err) {
      setError(`Błąd: ${err instanceof Error ? err.message : 'Nieznany błąd'}`)
    } finally {
      setLoading(false)
    }
  }

  function handleClose() {
    onClose()
    setTimeout(() => { setSent(false); setError(''); setDeliveryType('delivery') }, 300)
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
            <p>
              {deliveryType === 'delivery'
                ? 'Skontaktujemy się z Tobą w ciągu 15 minut, aby potwierdzić szczegóły dostawy.'
                : 'Skontaktujemy się z Tobą w ciągu 15 minut, aby potwierdzić godzinę odbioru.'}
            </p>
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

              {/* Delivery type toggle */}
              <div className="form-row">
                <span className="form-label">Sposób odbioru *</span>
                <div className="delivery-toggle">
                  <button
                    type="button"
                    className={`delivery-opt${deliveryType === 'delivery' ? ' active' : ''}`}
                    onClick={() => setDeliveryType('delivery')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                    </svg>
                    Dostawa
                  </button>
                  <button
                    type="button"
                    className={`delivery-opt${deliveryType === 'pickup' ? ' active' : ''}`}
                    onClick={() => setDeliveryType('pickup')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                    Odbiór osobisty
                  </button>
                </div>
              </div>

              {/* Address — only for delivery */}
              {deliveryType === 'delivery' && (
                <div className="form-row">
                  <label>
                    Adres dostawy *
                    <input name="address" type="text" placeholder="ul. Przykładowa 1, Szczecin" required />
                    <span className="form-hint">Dostawa płatna od 20 zł — dokładny koszt podamy przy potwierdzeniu.</span>
                  </label>
                </div>
              )}

              {/* Pickup info */}
              {deliveryType === 'pickup' && (
                <div className="pickup-info">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  Odbiór w godz. pracy sklepu —{' '}<a href="https://maps.app.goo.gl/cbjatffpocY9LYQPA" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: 600 }}>grafik tutaj</a>.
                </div>
              )}

              <div className="form-row">
                <label>
                  {deliveryType === 'delivery' ? 'Data i godzina dostawy *' : 'Data i godzina odbioru *'}
                  <input name="date" type="datetime-local" min={getMinDateTime()} defaultValue={getMinDateTime()} required />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Uwagi
                  <textarea name="notes" placeholder="Kod domofonu, dodatkowe życzenia…" rows={3} />
                </label>
              </div>

              <div className="form-row">
                <label className="form-checkbox-label">
                  <input name="consent" type="checkbox" required />
                  <span>
                    Wyrażam zgodę na przetwarzanie moich danych osobowych przez On.balon w celu realizacji zamówienia, zgodnie z{' '}
                    <a href="/polityka-prywatnosci" target="_blank">Polityką prywatności</a>. *
                  </span>
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
