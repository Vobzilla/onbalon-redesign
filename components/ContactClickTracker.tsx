'use client'

import { useEffect } from 'react'
import { track } from '@/lib/track'

// One delegated listener instead of an onClick on every contact link (header
// dropdown, footer, About page, policy pages). Customers who call or message
// instead of using the form show up as contact_click in GA4.
function contactMethod(href: string): string | null {
  if (href.startsWith('tel:')) return 'phone'
  if (href.startsWith('mailto:')) return 'email'
  if (/^https?:\/\/(www\.)?t\.me\//.test(href)) return 'telegram'
  if (/^https?:\/\/(www\.)?(m\.me|messenger\.com)\//.test(href)) return 'messenger'
  if (/^https?:\/\/(www\.)?(wa\.me|api\.whatsapp\.com)\//.test(href)) return 'whatsapp'
  if (/^https?:\/\/(www\.)?facebook\.com\//.test(href)) return 'facebook'
  if (/^https?:\/\/(www\.)?instagram\.com\//.test(href)) return 'instagram'
  return null
}

export default function ContactClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      try {
        const link = (e.target as Element | null)?.closest?.('a[href]')
        const method = link ? contactMethod(link.getAttribute('href') ?? '') : null
        if (!method) return
        const where = link?.closest('header') ? 'header' : link?.closest('footer') ? 'footer' : 'page'
        track('contact_click', { method, location: where, page_path: window.location.pathname })
      } catch {
        // tracking must not affect the click
      }
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return null
}
