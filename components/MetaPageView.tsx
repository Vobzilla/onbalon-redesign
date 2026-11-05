'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackMeta } from '@/lib/track'

// One Meta PageView per client-side route change. The first page of a visit
// is already counted by the Pixel's own init script (app/(site)/layout.tsx),
// so the first pathname is skipped; the Pixel's automatic history tracking is
// off (disablePushState), so there is no second PageView for the same change.
// Only the path counts: a #hash or query change is not a new page.
export default function MetaPageView() {
  const pathname = usePathname()
  const last = useRef<string | null>(null)

  useEffect(() => {
    if (last.current === null) {
      last.current = pathname
      return
    }
    if (pathname === last.current) return
    last.current = pathname
    trackMeta('PageView')
  }, [pathname])

  return null
}
