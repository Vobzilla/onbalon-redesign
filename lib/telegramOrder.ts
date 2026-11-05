// Builds the Telegram message for /api/order. Kept out of the route file so it
// can be imported (and checked) on its own; route files may only export handlers.

export type OrderItem = {
  product: { name: string; price: number; image: string }
  qty: number
  selectedColor?: string
  selectedAddons?: { name: string; price: number; qty: number }[]
}

export type OrderBody = {
  name: string
  contact: string
  // The form sends 'delivery' or 'pickup'; for pickup it sends a fixed
  // address text, but the address is only required for delivery.
  deliveryType?: 'delivery' | 'pickup' | string
  address?: string
  date: string
  notes?: string
  items: OrderItem[]
  totalPrice: number
}

// Telegram's HTML parse mode rejects the whole message if user text contains a
// bare <, > or & — so everything that isn't our own markup is escaped.
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function toViewableUrl(url?: string): string {
  if (!url) return ''
  return url
    .replace('/upload/', '/upload/f_auto,q_auto:good,w_800/')
    .replace(/(\.[a-z]+)?$/i, '.jpg')
}

// Checks exactly what the order form itself requires (name, phone, date, and
// an address only for delivery) — never more, so an order the form lets
// through is not rejected here. Returns null when a required field is missing.
export function parseOrderBody(body: unknown): OrderBody | null {
  if (typeof body !== 'object' || body === null) return null
  const b = body as Record<string, unknown>
  const text = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

  const name = text(b.name)
  const contact = text(b.contact)
  const date = text(b.date)
  const address = text(b.address)
  const deliveryType = typeof b.deliveryType === 'string' ? b.deliveryType : undefined

  if (!name || !contact || !date) return null
  if (deliveryType === 'delivery' && !address) return null

  // The form doesn't validate the cart, so neither do we: a malformed or empty
  // cart still reaches Telegram rather than losing the customer's contact.
  const items = (Array.isArray(b.items) ? b.items : []).filter(
    (i): i is OrderItem => typeof i === 'object' && i !== null &&
      typeof (i as OrderItem).product === 'object' && (i as OrderItem).product !== null
  )

  return {
    name,
    contact,
    deliveryType,
    address: address || undefined,
    date,
    notes: text(b.notes) || undefined,
    items,
    totalPrice: Number(b.totalPrice),
  }
}

export function buildOrderMessage({ name, contact, deliveryType, address, date, notes, items, totalPrice }: OrderBody): string {
  const itemLines = items.length === 0
    ? '  • (brak produktów w koszyku — zapytaj klienta)'
    : items
      .map(({ product, qty, selectedColor, selectedAddons }) => {
        const imgUrl = toViewableUrl(product.image)
        const imgLine = imgUrl ? `\n    🖼 ${escapeHtml(imgUrl)}` : ''
        const colorLine = selectedColor ? `\n    🎨 Kolor: ${escapeHtml(selectedColor)}` : ''
        const addonsLine = Array.isArray(selectedAddons) && selectedAddons.length > 0
          ? '\n' + selectedAddons
            .map(a => `    ➕ ${escapeHtml(a.name)}${a.qty > 1 ? ` × ${Number(a.qty)}` : ''} = ${Number(a.price) * Number(a.qty)} zł`)
            .join('\n')
          : ''
        return `  • ${escapeHtml(product.name)} × ${Number(qty)} = ${Number(product.price) * Number(qty)} zł${colorLine}${addonsLine}${imgLine}`
      })
      .join('\n')

  const parsedDate = new Date(date)
  const when = Number.isNaN(parsedDate.getTime())
    ? date
    : parsedDate.toLocaleString('pl-PL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  const pickup = deliveryType === 'pickup'
  const addressLine = pickup
    ? '🏠 <b>Odbiór osobisty</b>'
    : address ? `📍 <b>Adres:</b> ${escapeHtml(address)}` : null

  return [
    '🛒 <b>Nowe zamówienie!</b>',
    '',
    `👤 <b>Klient:</b> ${escapeHtml(name)}`,
    `📱 <b>Kontakt:</b> ${escapeHtml(contact)}`,
    addressLine,
    `🕐 <b>${pickup ? 'Odbiór' : 'Dostawa'}:</b> ${escapeHtml(when)}`,
    notes ? `📝 <b>Uwagi:</b> ${escapeHtml(notes)}` : null,
    '',
    '<b>Zamówione produkty:</b>',
    itemLines,
    '',
    `💰 <b>Łącznie: ${Number.isFinite(totalPrice) ? totalPrice : '?'} zł</b>`,
  ]
    .filter(l => l !== null)
    .join('\n')
}
