// Builds the Telegram message for /api/order. Kept out of the route file so it
// can be imported (and checked) on its own; route files may only export handlers.

import { isEarlierThanAllowed } from './orderTime'

export type OrderAddon = { name: string; price: number; qty: number }

export type OrderItem = {
  product: { name: string; price: number; image: string }
  qty: number
  selectedColor?: string
  // The chosen colour's photo; comes from the client, see ownColorImage().
  selectedColorImage?: string
  // Old cart format only (a tab opened before add-ons moved to the cart):
  // add-ons inside the product. parseOrderBody moves them to `addons`.
  selectedAddons?: OrderAddon[]
}

export type OrderBody = {
  name: string
  contact: string
  // The form sends 'delivery' or 'pickup'; for pickup it sends a fixed
  // address text, but the address is only required for delivery.
  deliveryType?: 'delivery' | 'pickup' | string
  address?: string
  // Delivery only. "70-001" when valid, otherwise exactly as the customer
  // typed it; never a reason to reject the order, only flagged in Telegram.
  postalCode?: string
  // Another person receives the delivery (optional, delivery only).
  recipientName?: string
  recipientPhone?: string
  date: string
  notes?: string
  items: OrderItem[]
  // Add-ons as their own lines, not tied to a product.
  addons: OrderAddon[]
  totalPrice: number
}

function toAddons(list: unknown): OrderAddon[] {
  if (!Array.isArray(list)) return []
  return list.flatMap(a => {
    if (typeof a !== 'object' || a === null) return []
    const { name, price, qty } = a as Record<string, unknown>
    if (typeof name !== 'string' || !name.trim()) return []
    return [{ name: name.trim(), price: Number(price), qty: Number(qty) }]
  })
}

// Server-side total: products × qty + add-ons × qty, the same rule as the
// cart. NaN when a price or quantity isn't a number.
export function computeOrderTotal(items: OrderItem[], addons: OrderAddon[]): number {
  return items.reduce((s, i) => s + Number(i.product.price) * Number(i.qty), 0) +
    addons.reduce((s, a) => s + a.price * a.qty, 0)
}

// Short order number shown to the customer and in Telegram, e.g. "OB-7K3FQ".
// No look-alike characters (0/O, 1/I) so it can be read out over the phone.
// 32^5 ≈ 33.5M combinations: random is enough without a database, given a
// handful of orders a week.
const ORDER_ID_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
const ORDER_ID_LENGTH = 5

export function generateOrderId(): string {
  const bytes = new Uint8Array(ORDER_ID_LENGTH)
  globalThis.crypto.getRandomValues(bytes)
  // 256 is a multiple of the 32-letter alphabet, so % keeps it uniform.
  return 'OB-' + Array.from(bytes, b => ORDER_ID_ALPHABET[b % ORDER_ID_ALPHABET.length]).join('')
}

// Telegram's HTML parse mode rejects the whole message if user text contains a
// bare <, > or & — so everything that isn't our own markup is escaped.
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

const CLOUDINARY_ORIGIN = 'https://res.cloudinary.com'
const CLOUDINARY_UPLOAD_PATH = '/dnyevlhh7/image/upload/'

// The colour photo is sent by the client, so it is used only when it points to
// our own Cloudinary account: a full https://res.cloudinary.com/dnyevlhh7/
// image/upload/… URL, or a bare public_id. Anything else gives undefined and
// the product's main photo is used instead.
export function ownColorImage(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const v = value.trim()
  if (!v) return undefined
  if (/^[a-z][a-z0-9+.-]*:/i.test(v)) {
    let url: URL
    try { url = new URL(v) } catch { return undefined }
    if (url.protocol !== 'https:' || url.hostname !== 'res.cloudinary.com' || url.port) return undefined
    if (!url.pathname.startsWith(CLOUDINARY_UPLOAD_PATH)) return undefined
    return CLOUDINARY_ORIGIN + url.pathname
  }
  // public_id: path segments of plain characters, no host, no "..".
  if (/^[\w-]+(\/[\w.-]+)*$/.test(v) && !v.split('/').includes('..')) {
    return CLOUDINARY_ORIGIN + CLOUDINARY_UPLOAD_PATH + v
  }
  return undefined
}

function toViewableUrl(url?: string): string {
  if (!url) return ''
  return url
    .replace('/upload/', '/upload/f_auto,q_auto:good,w_800/')
    .replace(/(\.[a-z]+)?$/i, '.jpg')
}

const POSTAL_CODE = /^\d{2}-\d{3}$/

// "70001", "70 001" and " 70-001 " all become "70-001". Anything that still
// doesn't match XX-XXX is returned trimmed, as the customer typed it.
export function normalizePostalCode(value: unknown): string {
  if (typeof value !== 'string') return ''
  const compact = value.replace(/\s+/g, '')
  if (/^\d{5}$/.test(compact)) return `${compact.slice(0, 2)}-${compact.slice(2)}`
  return POSTAL_CODE.test(compact) ? compact : value.trim()
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

  // New format: a top-level `addons` list. Old format: selectedAddons inside
  // each product, summed by name (as the cart's own migration does).
  let addons = toAddons(b.addons)
  if (!Array.isArray(b.addons)) {
    for (const a of items.flatMap(i => toAddons(i.selectedAddons))) {
      const same = addons.find(x => x.name === a.name)
      if (same) same.qty += a.qty
      else addons = [...addons, { ...a }]
    }
  }

  return {
    name,
    contact,
    deliveryType,
    address: address || undefined,
    // Never required: a missing or malformed code is only flagged in Telegram.
    postalCode: deliveryType === 'pickup' ? undefined : normalizePostalCode(b.postalCode) || undefined,
    // Optional: an order without them is fine. Never kept for pickup.
    recipientName: deliveryType === 'pickup' ? undefined : text(b.recipientName) || undefined,
    recipientPhone: deliveryType === 'pickup' ? undefined : text(b.recipientPhone) || undefined,
    date,
    notes: text(b.notes) || undefined,
    items,
    addons,
    totalPrice: Number(b.totalPrice),
  }
}

export function buildOrderMessage(
  { name, contact, deliveryType, address, postalCode, recipientName, recipientPhone, date, notes, items, addons = [], totalPrice }: OrderBody,
  orderId: string,
  now: number = Date.now()
): string {
  const itemLines = items.length === 0
    ? '  • (brak produktów w koszyku — zapytaj klienta)'
    : items
      .map(({ product, qty, selectedColor, selectedColorImage }) => {
        const colorImage = selectedColor ? ownColorImage(selectedColorImage) : undefined
        const imgUrl = toViewableUrl(colorImage ?? product.image)
        const imgLine = imgUrl ? `\n    🖼 ${escapeHtml(imgUrl)}` : ''
        const colorLine = selectedColor ? `\n    🎨 Kolor: ${escapeHtml(selectedColor)}` : ''
        return `  • ${escapeHtml(product.name)} × ${Number(qty)} = ${Number(product.price) * Number(qty)} zł${colorLine}${imgLine}`
      })
      .join('\n')

  const addonLines = addons
    .map(a => `  ➕ ${escapeHtml(a.name)} × ${a.qty} = ${a.price * a.qty} zł`)
    .join('\n')

  // The total shown is the customer's; a different server-side sum is only
  // flagged, never a reason to reject the order.
  const computed = computeOrderTotal(items, addons)
  const totalMismatch = !Number.isFinite(totalPrice) || !Number.isFinite(computed) || totalPrice !== computed
  const fmt = (n: number) => (Number.isFinite(n) ? String(n) : '?')

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
  const addressText = [address, postalCode].filter(Boolean).map(escapeHtml).join(', ')
  const addressLine = pickup
    ? '🏠 <b>Odbiór osobisty</b>'
    : addressText ? `📍 <b>Adres:</b> ${addressText}` : null

  // Same street names exist in different parts of Szczecin, so the postal
  // code is what tells them apart. Flagged only, the order always goes through.
  const postalCodeLine = pickup
    ? null
    : !postalCode
      ? '⚠️ Brak kodu pocztowego — zadzwoń do klienta'
      : !POSTAL_CODE.test(postalCode)
        ? '⚠️ Nieprawidłowy kod pocztowy — sprawdź adres'
        : !/^7[01]-/.test(postalCode)
          ? '⚠️ Kod spoza Szczecina — sprawdź adres'
          : null

  const recipient = [recipientName, recipientPhone].filter(Boolean).map(escapeHtml).join(', ')
  const recipientLine = !pickup && recipient ? `🎁 <b>Odbiorca:</b> ${recipient}` : null

  // The order is never rejected for its time, only flagged for a call.
  const tooEarlyLine = isEarlierThanAllowed(date, pickup ? 'pickup' : 'delivery', now)
    ? '⚠️ Termin wcześniejszy niż dopuszczalny — zadzwoń do klienta'
    : null

  return [
    '🛒 <b>Nowe zamówienie!</b>',
    `🧾 <b>Nr:</b> ${escapeHtml(orderId)}`,
    '',
    `👤 <b>Klient:</b> ${escapeHtml(name)}`,
    `📱 <b>Kontakt:</b> ${escapeHtml(contact)}`,
    addressLine,
    postalCodeLine,
    recipientLine,
    tooEarlyLine,
    `🕐 <b>${pickup ? 'Odbiór' : 'Dostawa'}:</b> ${escapeHtml(when)}`,
    notes ? `📝 <b>Uwagi:</b> ${escapeHtml(notes)}` : null,
    '',
    '<b>Zamówione produkty:</b>',
    itemLines,
    addonLines ? '' : null,
    addonLines ? '<b>Dodatki:</b>' : null,
    addonLines || null,
    '',
    `💰 <b>Łącznie: ${Number.isFinite(totalPrice) ? totalPrice : '?'} zł</b>`,
    totalMismatch ? `⚠️ Suma się nie zgadza: klient ${fmt(totalPrice)} zł, wyliczona ${fmt(computed)} zł` : null,
  ]
    .filter(l => l !== null)
    .join('\n')
}
