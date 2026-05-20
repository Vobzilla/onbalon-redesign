import { NextRequest, NextResponse } from 'next/server'

type OrderItem = {
  product: { name: string; price: number; image: string }
  qty: number
}

export async function POST(req: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return NextResponse.json({ error: 'Bot not configured' }, { status: 500 })
  }

  const { name, contact, address, date, notes, items, totalPrice } = await req.json()

  function toViewableUrl(url?: string): string {
    if (!url) return ''
    return url
      .replace(/\/upload\/[^/]+\//, '/upload/')
      .replace(/(\.[a-z]+)?$/, '.jpg')
  }

  const itemLines = (items as OrderItem[])
    .map(({ product, qty }) => {
      const imgUrl = toViewableUrl(product.image)
      const imgLine = imgUrl ? `\n    🖼 ${imgUrl}` : ''
      return `  • ${product.name} × ${qty} = ${product.price * qty} zł${imgLine}`
    })
    .join('\n')

  const deliveryDate = new Date(date).toLocaleString('pl-PL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const message = [
    '🛒 <b>Nowe zamówienie!</b>',
    '',
    `👤 <b>Klient:</b> ${name}`,
    `📱 <b>Kontakt:</b> ${contact}`,
    `📍 <b>Adres:</b> ${address}`,
    `🕐 <b>Dostawa:</b> ${deliveryDate}`,
    notes ? `📝 <b>Uwagi:</b> ${notes}` : null,
    '',
    '<b>Zamówione produkty:</b>',
    itemLines,
    '',
    `💰 <b>Łącznie: ${totalPrice} zł</b>`,
  ]
    .filter(l => l !== null)
    .join('\n')

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Telegram error:', err)
    return NextResponse.json({ error: err }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
