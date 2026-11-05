'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useCart } from '@/context/CartContext'
import Confetti from './Confetti'
import { availability } from '@/data/availability'
import { ORDER_FAILED_MESSAGE } from '@/lib/orderMessages'
import { track, gaItems, isTestOrder, trackMeta, metaContents } from '@/lib/track'

// ─── Conversion IDs ───────────────────────────────────────────────────────────
// Після КРОКУ 1: замінити на реальні значення з Google Ads
const GOOGLE_ADS_CONVERSION = 'AW-16531023419/EEdkCPqEjLMcELvMzco9'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

// `source` only labels the begin_checkout event: where the form was opened from.
type Props = { isOpen: boolean; onClose: () => void; source?: 'cart' | 'product_page' }
type DeliveryType = 'delivery' | 'pickup'

function getMinDateTime() {
  const d = new Date(Date.now() + 5 * 60 * 60 * 1000)
  // format: YYYY-MM-DDTHH:MM
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export default function OrderModal({ isOpen, onClose, source = 'cart' }: Props) {
  const { items, totalPrice, clear } = useCart()
  const [sent, setSent]               = useState(false)
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState('')
  const [phoneError, setPhoneError]   = useState('')
  const [dateError, setDateError]     = useState('')
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('delivery')
  const [orderId, setOrderId]         = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) return
    track('begin_checkout', { currency: 'PLN', value: totalPrice, items: gaItems(items), source })
    trackMeta('InitiateCheckout', { ...metaContents(items), currency: 'PLN', value: totalPrice })
    // Only when the form opens, not on every cart change while it is open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  function formError(errorType: string) {
    track('order_form_error', { error_type: errorType, delivery_type: deliveryType })
  }

  // Ads/Meta conversions + GA4 purchase, after the order is already accepted.
  // Wrapped on its own so a tracking error can never turn a sent order into
  // an error message for the customer.
  // transaction_id = the server's order number, so GA4 and Google Ads count an
  // order once even if the event is sent twice (e.g. by both Ads tags on the
  // page). Without a number the events still go, just without it.
  function trackPurchase(value: number, orderItems: typeof items, id: string | null) {
    try {
      const transaction = id ? { transaction_id: id } : {}
      track('purchase', { currency: 'PLN', value, items: gaItems(orderItems), delivery_type: deliveryType, ...transaction })
      // Meta Pixel — Lead
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', {
          content_name: 'Zamówienie balony',
          currency: 'PLN',
          value,
        })
      }
      // Google Ads — conversion
      if (
        typeof window.gtag === 'function' &&
        !GOOGLE_ADS_CONVERSION.includes('REPLACE')
      ) {
        window.gtag('event', 'conversion', {
          send_to: GOOGLE_ADS_CONVERSION,
          value,
          currency: 'PLN',
          ...transaction,
        })
      }
    } catch {
      // tracking must not affect the order
    }
  }

  function isDeliveryDateBlocked(dateStr: string): boolean {
    const { deliveryClosedFrom, deliveryClosedTo } = availability
    if (!deliveryClosedFrom || !deliveryClosedTo) return false
    const date = dateStr.slice(0, 10)
    return date >= deliveryClosedFrom && date <= deliveryClosedTo
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setPhoneError('')
    setDateError('')

    const fd      = new FormData(e.currentTarget)
    const name    = String(fd.get('name')    || '').trim()
    const contact = String(fd.get('contact') || '').trim()
    const address = deliveryType === 'delivery'
      ? String(fd.get('address') || '').trim()
      : 'Odbior osobisty'
    const date    = String(fd.get('date')    || '').trim()
    const notes   = String(fd.get('notes')   || '').trim()

    const phoneRegex = /^[+]?[\d\s\-().]{7,20}$/
    if (!name || !contact || !date) {
      setError('Proszę wypełnić wszystkie wymagane pola.')
      formError('missing_fields')
      return
    }
    if (!phoneRegex.test(contact)) {
      setPhoneError('Nieprawidłowy numer telefonu')
      formError('phone_invalid')
      return
    }
    if (deliveryType === 'delivery' && !address) {
      setError('Proszę podać adres dostawy.')
      formError('address_missing')
      return
    }
    if (deliveryType === 'delivery' && isDeliveryDateBlocked(date)) {
      const to = availability.deliveryClosedTo
      setDateError(`Dostawa niedostępna w tym terminie. Wybierz datę po ${to}.`)
      formError('date_blocked')
      return
    }

    // Test orders ("TEST — …") reach Telegram but no analytics or ad platform.
    const testOrder = isTestOrder(name)
    const orderValue = totalPrice
    const orderItems = items
    if (!testOrder) track('order_submit', { currency: 'PLN', value: orderValue, delivery_type: deliveryType })

    setLoading(true)
    let failCode = 'network'
    let httpStatus: number | undefined
    let newOrderId: string | null = null
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, address, date, notes, deliveryType, items, totalPrice }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        console.error('Order failed:', res.status, data.error)
        failCode = typeof data.error === 'string' ? data.error : `http_${res.status}`
        httpStatus = res.status
        throw new Error(typeof data.message === 'string' ? data.message : ORDER_FAILED_MESSAGE)
      }
      // The order is sent at this point; a missing or unreadable body only
      // means there is no number to show.
      const data = await res.json().catch(() => ({}))
      newOrderId = typeof data.orderId === 'string' ? data.orderId : null
      setOrderId(newOrderId)
      setSent(true)
      clear()
    } catch (err) {
      // Our own throw above carries a customer-facing message; fetch() rejecting
      // on a network error (TypeError "Failed to fetch") does not.
      setError(err instanceof Error && !(err instanceof TypeError) ? err.message : ORDER_FAILED_MESSAGE)
      if (!testOrder) track('order_failed', { error_code: failCode, http_status: httpStatus, delivery_type: deliveryType })
      return
    } finally {
      setLoading(false)
    }

    if (!testOrder) trackPurchase(orderValue, orderItems, newOrderId)
  }

  function handleClose() {
    onClose()
    setTimeout(() => { setSent(false); setError(''); setPhoneError(''); setDateError(''); setDeliveryType('delivery'); setOrderId(null) }, 300)
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

        {sent && <Confetti />}

        {sent ? (
          <div className="modal-success">
            <div className="success-icon">✓</div>
            <h2>Zamówienie przyjęte!</h2>
            {orderId && (
              <p className="order-number">Numer: <strong>{orderId}</strong></p>
            )}
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
              {items.map(({ product, qty, selectedColor, selectedAddons }) => (
                <div key={product.id}>
                  <div className="summary-line">
                    <span>
                      {product.name} × {qty}
                      {selectedColor ? ` (${selectedColor})` : ''}
                    </span>
                    <span>{product.price * qty} zł</span>
                  </div>
                  {selectedAddons?.map((addon, i) => (
                    <div key={i} className="summary-line summary-line-addon">
                      <span>+ {addon.name}{addon.qty > 1 ? ` × ${addon.qty}` : ''}</span>
                      <span>{addon.price * addon.qty} zł</span>
                    </div>
                  ))}
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
                  Numer telefonu *
                  <input
                    name="contact"
                    type="tel"
                    placeholder="+48 500 123 456"
                    required
                    onChange={() => setPhoneError('')}
                    style={phoneError ? { borderColor: '#e53e3e' } : undefined}
                  />
                  {phoneError && <span style={{ color: '#e53e3e', fontSize: '12px', marginTop: '4px', display: 'block' }}>{phoneError}</span>}
                </label>
              </div>

              {/* Delivery type toggle */}
              {availability.fullyClosed ? (
                <div className="availability-banner">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {availability.closedMessage || 'Tymczasowo nie przyjmujemy zamówień.'}
                </div>
              ) : (
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
              )}

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
                  <input
                    name="date"
                    type="datetime-local"
                    min={getMinDateTime()}
                    defaultValue={getMinDateTime()}
                    required
                    onChange={() => setDateError('')}
                    style={dateError ? { borderColor: '#e53e3e' } : undefined}
                  />
                  {dateError && <span style={{ color: '#e53e3e', fontSize: '12px', marginTop: '4px', display: 'block' }}>{dateError}</span>}
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
