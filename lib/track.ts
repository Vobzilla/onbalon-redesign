// GA4 event helper for the shop funnel. Tracking must never affect an order:
// track() swallows every error, returns nothing and never waits.
//
// Our gtag('config') runs after hydration (next/script afterInteractive), so
// an early event (e.g. view_item right after an ad click) can fire before it.
// Pushed into dataLayer before 'config', gtag drops the event — so it is held
// here and replayed once our inline script has run both configs and set
// window.__obGtagReady (app/(site)/layout.tsx). window.gtag alone is not
// enough: the Cloudflare tag gateway defines it earlier. If the flag never
// appears (gtag blocked), the queue is simply given up after a while.

type Params = Record<string, unknown>
type GtagWindow = Window & { gtag?: (...args: unknown[]) => void; __obGtagReady?: boolean }

const QUEUE_LIMIT = 50
const FLUSH_INTERVAL_MS = 500
const FLUSH_GIVE_UP_MS = 30_000

const queue: [string, Params][] = []
let flushTimer: ReturnType<typeof setInterval> | null = null
let flushStarted = 0

// Lets the funnel be checked in GA4 DebugView: open any page with ?ga_debug=1
// once; it lasts for the browser tab's session. Called on every page load
// (see ContactClickTracker) as well as from track(), so the flag is kept even
// when the landing page itself sends no event of ours.
export function debugMode(): boolean {
  try {
    if (new URLSearchParams(window.location.search).get('ga_debug') === '1') {
      sessionStorage.setItem('onbalon_ga_debug', '1')
    }
    return sessionStorage.getItem('onbalon_ga_debug') === '1'
  } catch {
    return false
  }
}

function send(name: string, params: Params): boolean {
  const w = window as GtagWindow
  const gtag = w.gtag
  if (w.__obGtagReady !== true || typeof gtag !== 'function') return false
  gtag('event', name, params)
  return true
}

function flush(): void {
  try {
    while (queue.length > 0 && send(...queue[0])) queue.shift()
    if (queue.length === 0 || Date.now() - flushStarted > FLUSH_GIVE_UP_MS) {
      queue.length = 0
      if (flushTimer) clearInterval(flushTimer)
      flushTimer = null
    }
  } catch {
    // never let tracking surface an error
  }
}

export function track(name: string, params: Params = {}): void {
  try {
    if (typeof window === 'undefined') return
    const p = debugMode() ? { ...params, debug_mode: true } : params
    if (queue.length === 0 && send(name, p)) return
    if (queue.length < QUEUE_LIMIT) queue.push([name, p])
    if (!flushTimer) {
      flushStarted = Date.now()
      flushTimer = setInterval(flush, FLUSH_INTERVAL_MS)
    }
  } catch {
    // never let tracking surface an error
  }
}

type CartLike = {
  product: { id: number; name: string; category?: string; price: number }
  qty: number
  selectedColor?: string
}

// GA4 ecommerce `items`. Product data only — never customer details.
// Called while building track() arguments, so it must not throw either
// (a cart saved by an older version of the site may have an odd shape).
export function gaItems(items: CartLike[]) {
  try {
    return items.map(({ product, qty, selectedColor }) => ({
      item_id: String(product.id),
      item_name: product.name,
      item_category: product.category,
      item_variant: selectedColor,
      price: product.price,
      quantity: qty,
    }))
  } catch {
    return []
  }
}

// ─── Meta Pixel ─────────────────────────────────────────────────────────────
// Standard Meta events next to the GA4 ones, with the same guarantees as
// track(): never throws, returns nothing, never waits. The Pixel is set up in
// app/(site)/layout.tsx (afterInteractive), so an early event — ViewContent
// right after hydration — is held until that script has run init and set
// window.__obFbqReady, and then replayed in order after the PageView. Consent
// is the Pixel's own: while revoked it doesn't send anything.

type MetaWindow = Window & { fbq?: (...args: unknown[]) => void; __obFbqReady?: boolean }

const metaQueue: [string, Params][] = []
let metaTimer: ReturnType<typeof setInterval> | null = null
let metaStarted = 0

function sendMeta(name: string, params: Params): boolean {
  const w = window as MetaWindow
  if (w.__obFbqReady !== true || typeof w.fbq !== 'function') return false
  w.fbq('track', name, params)
  return true
}

function flushMeta(): void {
  try {
    while (metaQueue.length > 0 && sendMeta(...metaQueue[0])) metaQueue.shift()
    if (metaQueue.length === 0 || Date.now() - metaStarted > FLUSH_GIVE_UP_MS) {
      metaQueue.length = 0
      if (metaTimer) clearInterval(metaTimer)
      metaTimer = null
    }
  } catch {
    // never let tracking surface an error
  }
}

export function trackMeta(name: string, params: Params = {}): void {
  try {
    if (typeof window === 'undefined') return
    if (metaQueue.length === 0 && sendMeta(name, params)) return
    if (metaQueue.length < QUEUE_LIMIT) metaQueue.push([name, params])
    if (!metaTimer) {
      metaStarted = Date.now()
      metaTimer = setInterval(flushMeta, FLUSH_INTERVAL_MS)
    }
  } catch {
    // never let tracking surface an error
  }
}

// Meta's content parameters for the same cart lines gaItems() takes.
export function metaContents(items: CartLike[]) {
  try {
    return {
      content_ids: items.map(i => String(i.product.id)),
      contents: items.map(i => ({ id: String(i.product.id), quantity: i.qty })),
      content_type: 'product',
      num_items: items.reduce((s, i) => s + i.qty, 0),
    }
  } catch {
    return {}
  }
}

// Test orders (name starting with "TEST — ") must not reach GA4, Ads or Meta.
export const TEST_ORDER_PREFIX = 'TEST — '
export function isTestOrder(name: string): boolean {
  return name.startsWith(TEST_ORDER_PREFIX)
}
