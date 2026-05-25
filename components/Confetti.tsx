'use client'

import { useEffect, useState } from 'react'

const COLORS = ['#a855f7', '#ec4899', '#f59e0b', '#34d399', '#60a5fa', '#f97316', '#f43f5e', '#c084fc']

type Piece = {
  id: number
  x: number
  color: string
  delay: number
  duration: number
  width: number
  height: number
  borderRadius: string
  initRotation: number
}

export default function Confetti() {
  const [pieces, setPieces] = useState<Piece[]>([])

  useEffect(() => {
    const arr: Piece[] = Array.from({ length: 90 }, (_, i) => {
      const isCircle = Math.random() > 0.6
      const size = 6 + Math.random() * 8
      return {
        id: i,
        x: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 1.2,
        duration: 2.8 + Math.random() * 1.6,
        width: isCircle ? size : size * 0.55,
        height: isCircle ? size : size * 1.6,
        borderRadius: isCircle ? '50%' : '2px',
        initRotation: Math.random() * 360,
      }
    })
    setPieces(arr)
    const t = setTimeout(() => setPieces([]), 5500)
    return () => clearTimeout(t)
  }, [])

  if (pieces.length === 0) return null

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
      {pieces.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: '-16px',
            width: p.width,
            height: p.height,
            background: p.color,
            borderRadius: p.borderRadius,
            animation: `confetti-fall ${p.duration}s ${p.delay}s cubic-bezier(.25,.46,.45,.94) forwards`,
            transform: `rotate(${p.initRotation}deg)`,
          }}
        />
      ))}
    </div>
  )
}
