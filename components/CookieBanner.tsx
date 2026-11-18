'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

type ConsentWindow = Window & {
  gtag?: (...args: unknown[]) => void
  dataLayer?: unknown[]
  fbq?: (...args: unknown[]) => void
  __obGtagReady?: boolean
}

const CONSENT_KEY = 'cookie_consent'

function readChoice(): string | null {
  try {
    return localStorage.getItem(CONSENT_KEY)
  } catch {
    return null
  }
}

// Consent Mode v2: everything starts denied (app/layout.tsx <head>) and a
// saved 'accepted' is applied there on every page load. Here we only apply a
// change the visitor makes now. Wrapped in try/catch: the banner must keep
// working (and never affect an order) when gtag or the Pixel is blocked.
function applyConsent(granted: boolean) {
  try {
    const w = window as ConsentWindow
    const state = granted ? 'granted' : 'denied'
    const update = { ad_storage: state, ad_user_data: state, ad_personalization: state, analytics_storage: state }
    // Normally window.gtag exists (Cloudflare's tag and ours define it); if
    // not, do what gtag() does: dataLayer.push(arguments).
    const gtag = typeof w.gtag === 'function'
      ? w.gtag
      : function () { (w.dataLayer = w.dataLayer || []).push(arguments) } as (...args: unknown[]) => void
    gtag('consent', 'update', update)
  } catch {
    // never let consent handling surface an error
  }
  try {
    const w = window as ConsentWindow
    if (typeof w.fbq === 'function') w.fbq('consent', granted ? 'grant' : 'revoke')
  } catch {
    // ditto
  }
}

// Whether consent was already granted when this page was loaded (a saved
// 'accepted' is applied in <head> before our gtag config). Read once, on the
// banner's first mount; the banner lives in the (site) layout, so it stays
// mounted across client-side navigation.
let loadedGranted: boolean | null = null
let consentPageViewSent = false

// Ad/campaign params of the landing URL, read on the same first mount and
// kept in memory only: before consent nothing may be written to the device.
// Client-side navigation drops them from the URL, so a visitor who accepts on
// a later page would otherwise send a page_view without gclid/utm and lose
// the google / cpc attribution.
const LANDING_PARAM_KEYS = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
let landingParams: [string, string][] | null = null

function readLandingParams(): [string, string][] {
  try {
    return Array.from(new URLSearchParams(window.location.search).entries())
      .filter(([k, v]) => LANDING_PARAM_KEYS.includes(k) && v !== '')
  } catch {
    return []
  }
}

// Current URL (current path) plus the landing params it doesn't already have.
function consentPageLocation(): string {
  try {
    if (!landingParams || landingParams.length === 0) return window.location.href
    const url = new URL(window.location.href)
    for (const [k, v] of landingParams) {
      if (!url.searchParams.has(k)) url.searchParams.append(k, v)
    }
    return url.toString()
  } catch {
    return window.location.href
  }
}

// The page_view our gtag config sent at load went out as a cookieless ping
// (denied), so after a fresh «Akceptuję» GA4 has no cookie session with the
// landing URL (gclid/utm). Send one page_view now, right after the consent
// update. Not when consent was already granted at load (that config page_view
// was a full one), not twice per page load, and not before our config has
// run: then config is still queued behind the update and sends a granted
// page_view itself.
function sendConsentPageView() {
  try {
    const w = window as ConsentWindow
    if (loadedGranted !== false || consentPageViewSent) return
    if (w.__obGtagReady !== true || typeof w.gtag !== 'function') return
    consentPageViewSent = true
    w.gtag('event', 'page_view', { page_location: consentPageLocation(), page_title: document.title })
  } catch {
    // never let consent handling surface an error
  }
}

// The banner never hides while it waits for an answer. Instead, the page gets
// room for it: a spacer of the banner's real height (+ its bottom offset and
// a small gap) at the end of the page, so any button — «Dodaj do koszyka»
// included — can be scrolled above it, and --cookie-banner-space, which lifts
// the fixed scroll-to-top button over it. Both go away with the banner.
const BANNER_GAP_PX = 8

function useBannerSpace(banner: React.RefObject<HTMLDivElement>, visible: boolean) {
  const [space, setSpace] = useState(0)

  useEffect(() => {
    const root = document.documentElement
    if (!visible) {
      setSpace(0)
      return
    }
    // offsetHeight + bottom, not getBoundingClientRect: layout size, so the
    // slide-in animation's transform doesn't skew it.
    const measure = () => {
      try {
        const b = banner.current
        if (!b) return
        const px = Math.ceil(b.offsetHeight + (parseFloat(getComputedStyle(b).bottom) || 0)) + BANNER_GAP_PX
        setSpace(px)
        root.style.setProperty('--cookie-banner-space', `${px}px`)
      } catch {
        // without a measurement the banner simply has no spacer
      }
    }
    measure()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    if (ro && banner.current) ro.observe(banner.current)
    window.addEventListener('resize', measure)
    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', measure)
      root.style.removeProperty('--cookie-banner-space')
    }
  }, [visible, banner])

  return space
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const bannerRef = useRef<HTMLDivElement>(null)
  const space = useBannerSpace(bannerRef, visible)

  useEffect(() => {
    const choice = readChoice()
    if (loadedGranted === null) loadedGranted = choice === 'accepted'
    if (landingParams === null) landingParams = readLandingParams()
    if (!choice) {
      setVisible(true)
    }

    // «Ustawienia cookies» in the footer (any element with
    // data-cookie-settings) opens the banner again to change the choice.
    function onClick(e: MouseEvent) {
      try {
        const el = (e.target as Element | null)?.closest?.('[data-cookie-settings]')
        if (!el) return
        e.preventDefault()
        setVisible(true)
      } catch {
        // ignore
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  function accept() {
    try { localStorage.setItem(CONSENT_KEY, 'accepted') } catch { }
    applyConsent(true)
    sendConsentPageView()
    setVisible(false)
  }

  function decline() {
    // Denied is already the default; only an earlier «Akceptuję» has to be
    // taken back.
    const wasAccepted = readChoice() === 'accepted'
    try { localStorage.setItem(CONSENT_KEY, 'declined') } catch { }
    if (wasAccepted) applyConsent(false)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <>
      {space > 0 && <div className="cookie-banner-spacer" aria-hidden="true" style={{ height: space }} />}
      <div ref={bannerRef} className="cookie-banner">
        <p className="cookie-text">
          Używamy cookies do analizy ruchu i reklam (Google, Meta).{' '}
          <Link href="/polityka-prywatnosci">Szczegóły</Link>
        </p>
        {/* Same size and colour for both; «Odrzuć» first. */}
        <div className="cookie-actions">
          <button className="cookie-btn-decline" onClick={decline}>Odrzuć</button>
          <button className="cookie-btn-accept" onClick={accept}>Akceptuję</button>
        </div>
      </div>
    </>
  )
}
