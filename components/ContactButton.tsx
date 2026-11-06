'use client'

// «Skontaktuj się» that opens the header's contact menu — the same event the
// home page's Hero and FAQ buttons send (Header listens for it).
export default function ContactButton({ className }: { className: string }) {
  return (
    <a
      href="#"
      className={className}
      data-keep-clear
      onClick={e => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-contact-dropdown')) }}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>
      </svg>
      Skontaktuj się
    </a>
  )
}
