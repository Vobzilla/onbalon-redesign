import { NextRequest, NextResponse } from 'next/server'

type OrderItem = {
  product: { name: string; price: number }
  qty: number
}

export async function POST(req: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return NextResponse.json({ error: 'Bot not configured' }, { status: 500 })
  }

  const { name, contact, address, date, notes, items, totalPrice } = await req.json()

  const itemLines = (items as OrderItem[])
    .map(({ product, qty }) => `  • ${product.name} × ${qty} = ${product.price * qty} zł`)
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
    '🛒 *Nowe zamówienie!*',
    '',
    `👤 *Klient:* ${name}`,
    `📱 *Kontakt:* ${contact}`,
    `📍 *Adres:* ${address}`,
    `🕐 *Dostawa:* ${deliveryDate}`,
    notes ? `📝 *Uwagi:* ${notes}` : null,
    '',
    '*Zamówione produkty:*',
    itemLines,
    '',
    `💰 *Łącznie: ${totalPrice} zł*`,
  ]
    .filter(l => l !== null)
    .join('\n')

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown',
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Telegram error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
