// Earliest delivery / pickup time for the order form and the Telegram message.
// Always computed on the Warsaw clock, whatever the time zone of the customer's
// phone or of the server (Netlify runs in UTC). Times travel as the
// datetime-local string "YYYY-MM-DDTHH:mm", read as Warsaw wall-clock time.
// No libraries: Intl knows the Warsaw DST rules.

import { availability } from '../data/availability'

export const ORDER_TIME_ZONE = 'Europe/Warsaw'
// How much earlier than the earliest delivery time the server lets pass
// without a warning (the form may have been open for a while).
export const EARLIEST_TOLERANCE_MINUTES = 15

export type OrderTimeType = 'delivery' | 'pickup'

const MINUTE = 60_000
const HOUR = 60 * MINUTE

type Wall = { y: number; mo: number; d: number; h: number; mi: number }

const warsawFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: ORDER_TIME_ZONE,
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hourCycle: 'h23',
})

// Warsaw wall-clock time at an instant.
function wallAt(ms: number): Wall {
  const p: Record<string, number> = {}
  for (const { type, value } of warsawFormat.formatToParts(ms)) {
    if (type !== 'literal') p[type] = Number(value)
  }
  return { y: p.year, mo: p.month, d: p.day, h: p.hour % 24, mi: p.minute }
}

function wallAsUtc(w: Wall): number {
  return Date.UTC(w.y, w.mo - 1, w.d, w.h, w.mi)
}

// Instant of a Warsaw wall-clock time. The second pass settles times next to
// a DST switch.
function wallToMs(w: Wall): number {
  const asUtc = wallAsUtc(w)
  const offsetAt = (ms: number) => wallAsUtc(wallAt(ms)) - Math.floor(ms / MINUTE) * MINUTE
  const guess = asUtc - offsetAt(asUtc)
  return asUtc - offsetAt(guess)
}

const pad = (n: number) => String(n).padStart(2, '0')

function toInputValue(w: Wall): string {
  return `${w.y}-${pad(w.mo)}-${pad(w.d)}T${pad(w.h)}:${pad(w.mi)}`
}

function parseInputValue(value: string): Wall | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(value)
  if (!m) return null
  return { y: +m[1], mo: +m[2], d: +m[3], h: +m[4], mi: +m[5] }
}

// Earliest allowed time as a datetime-local value, on the Warsaw clock.
export function earliestOrderTime(type: OrderTimeType, now: number = Date.now()): string {
  const start = Math.floor(now / MINUTE) * MINUTE

  if (type === 'pickup') return toInputValue(wallAt(start + availability.pickupLeadHours * HOUR))

  const firstHour = availability.deliveryFirstHour
  const today = wallAt(start)
  if (today.h >= availability.deliveryLastOrderHour) {
    const next = new Date(Date.UTC(today.y, today.mo - 1, today.d + 1))
    return toInputValue({ y: next.getUTCFullYear(), mo: next.getUTCMonth() + 1, d: next.getUTCDate(), h: firstHour, mi: 0 })
  }

  // Warsaw is a whole number of hours off UTC, so rounding the instant to
  // 15 minutes rounds the Warsaw clock too.
  const step = availability.deliveryRoundMinutes * MINUTE
  const earliest = wallAt(Math.ceil((start + availability.deliveryLeadHours * HOUR) / step) * step)
  return earliest.h < firstHour ? toInputValue({ ...earliest, h: firstHour, mi: 0 }) : toInputValue(earliest)
}

// "18.11, 09:00" for the customer-facing error.
export function formatShortOrderTime(value: string): string {
  const w = parseInputValue(value)
  return w ? `${pad(w.d)}.${pad(w.mo)}, ${pad(w.h)}:${pad(w.mi)}` : value
}

// Server side: is the chosen time earlier than we can handle? Delivery: more
// than EARLIEST_TOLERANCE_MINUTES before the earliest time, or in the past.
// Pickup (or anything that isn't delivery-shaped): only in the past.
// An unreadable value is not flagged; it reaches Telegram as typed.
export function isEarlierThanAllowed(value: string, type: OrderTimeType, now: number = Date.now()): boolean {
  const chosen = parseInputValue(value)
  if (!chosen) return false
  const chosenMs = wallToMs(chosen)
  if (chosenMs < Math.floor(now / MINUTE) * MINUTE) return true
  if (type === 'pickup') return false
  const earliestMs = wallToMs(parseInputValue(earliestOrderTime('delivery', now))!)
  return chosenMs < earliestMs - EARLIEST_TOLERANCE_MINUTES * MINUTE
}
