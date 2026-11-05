// GA4 event helper for the shop funnel. Tracking must never affect an order:
// track() swallows every error, returns nothing and never waits.
//
// gtag.js is loaded with next/script lazyOnload, so window.gtag may not exist
// yet when an early event fires (e.g. view_item right after an ad click).
// Pushing such an event straight into dataLayer would put it before the
// 'config' commands, where gtag drops it — so it is held here and replayed
// through window.gtag once that exists. If gtag never loads (blocked), the
// queue is simply given up after a while.

type Params = Record<string, unknown>
type GtagWindow = Window & { gtag?: (...args: unknown[]) => void }

const QUEUE_LIMIT = 50
const FLUSH_INTERVAL_MS = 500
const FLUSH_GIVE_UP_MS = 30_000

const queue: [string, Params][] = []
let flushTimer: ReturnType<typeof setInterval> | null = null
let flushStarted = 0

// Lets the funnel be checked in GA4 DebugView: open any page with ?ga_debug=1
// once; it lasts for the browser tab's session.
function debugMode(): boolean {
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
  const gtag = (window as GtagWindow).gtag
  if (typeof gtag !== 'function') return false
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

// Test orders (name starting with "TEST — ") must not reach GA4, Ads or Meta.
export const TEST_ORDER_PREFIX = 'TEST — '
export function isTestOrder(name: string): boolean {
  return name.startsWith(TEST_ORDER_PREFIX)
}
