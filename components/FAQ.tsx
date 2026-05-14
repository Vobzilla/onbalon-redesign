'use client'

import { useState } from 'react'

const FAQS = [
  { q: 'Jak szybko dostarczacie balony?',          a: 'Dowozimy balony 24/7 na terenie Szczecina. Standardowy czas dostawy to 2–3 godziny od złożenia zamówienia. W pilnych przypadkach — skontaktuj się z nami bezpośrednio.' },
  { q: 'Czy balony z helem długo wytrzymują?',     a: 'Balony lateksowe z helem wytrzymują 8–12 godzin, foliowe (Mylar) od 3 do 7 dni. Na imprezę jednodniową zawsze wystarczą z zapasem!' },
  { q: 'Jaki jest obszar dostawy?',                a: 'Dostarczamy na terenie Szczecina i okolic (do 15 km od centrum). Przy większej odległości skontaktuj się z nami — ustalimy szczegóły.' },
  { q: 'Jak przebiega potwierdzenie zamówienia?',  a: 'Po złożeniu zamówienia skontaktujemy się z Tobą w ciągu 15 minut wybranym kanałem — telefonicznie lub przez wybraną platformę.' },
  { q: 'Czy mogę zamówić niestandardowe dekoracje?', a: 'Tak! Opisz swoje potrzeby i skontaktuj się z nami — przygotujemy indywidualną wycenę i projekt dopasowany do Twojej okazji.' },
  { q: 'Jak dokonać płatności?',                   a: 'Płatność ustalamy podczas potwierdzenia zamówienia — gotówką przy dostawie lub przelewem. Szczegóły zawsze uzgadniamy indywidualnie.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="faq" id="faq">
      <div className="faq-inner">
        <div className="faq-left">
          <p className="eyebrow">FAQ</p>
          <h2 className="section-title">
            Masz <em>pytania?</em><br />Mamy odpowiedzi.
          </h2>
          <p className="faq-sub">
            Nie znalazłeś odpowiedzi? Skontaktuj się z nami — chętnie
            pomożemy dobrać idealny zestaw na Twoją uroczystość.
          </p>
          <a href="https://t.me/vobzilla_bot" target="_blank" className="btn-primary">
            📞 Skontaktuj się z nami
          </a>
        </div>

        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                <span>{f.q}</span>
                <span className="faq-icon">{open === i ? '×' : '+'}</span>
              </button>
              <div className="faq-a">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
