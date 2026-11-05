import { NextRequest, NextResponse } from 'next/server'
import { ORDER_FAILED_MESSAGE } from '@/lib/orderMessages'
import { buildOrderMessage, generateOrderId, parseOrderBody } from '@/lib/telegramOrder'

// Every failure answers with the same shape, so the form can always show `message`.
function fail(status: number, error: string) {
  return NextResponse.json({ ok: false, error, message: ORDER_FAILED_MESSAGE }, { status })
}

export async function POST(req: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.error('Order error: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set')
    return fail(500, 'not_configured')
  }

  let body: unknown
  try {
    body = await req.json()
  } catch (err) {
    console.error('Order error: invalid JSON body', err)
    return fail(400, 'invalid_json')
  }

  const order = parseOrderBody(body)
  if (!order) {
    // Field names only — the values are the customer's personal data.
    const keys = typeof body === 'object' && body !== null ? Object.keys(body) : typeof body
    console.error('Order error: missing required fields, got', keys)
    return fail(400, 'invalid_order')
  }

  const orderId = generateOrderId()

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildOrderMessage(order, orderId),
        parse_mode: 'HTML',
      }),
    })

    if (!res.ok) {
      console.error('Telegram error:', res.status, await res.text())
      return fail(502, 'telegram_failed')
    }

    return NextResponse.json({ ok: true, orderId })
  } catch (err) {
    console.error('Order error: could not send to Telegram', err)
    return fail(502, 'telegram_unreachable')
  }
}
