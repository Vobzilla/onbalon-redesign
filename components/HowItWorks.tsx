const STEPS = [
  {
    n: '01',
    title: 'Wybierz zestaw',
    desc: 'Przeglądaj katalog i dodaj gotowy zestaw do koszyka.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Podaj dane',
    desc: 'Adres, data i godzina — formularz zajmuje 30 sekund.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="2" width="6" height="4" rx="1"/>
        <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/>
        <line x1="8" y1="11" x2="16" y2="11"/>
        <line x1="8" y1="15" x2="13" y2="15"/>
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Potwierdzamy',
    desc: 'Oddzwaniamy w 15 minut i potwierdzamy wszystkie szczegóły.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>
      </svg>
    ),
  },
  {
    n: '04',
    title: 'Dostarczamy',
    desc: 'Balony trafiają prosto do Ciebie — o każdej porze.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.686 2 6 4.686 6 8c0 4.418 6 11 6 11s6-6.582 6-11c0-3.314-2.686-6-6-6z"/>
        <circle cx="12" cy="8" r="2"/>
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section className="how" id="how">
      <div className="section-inner">
        <div className="how-top">
          <div>
            <p className="eyebrow">Jak to działa</p>
            <h2 className="section-title">
              Zamawianie jest
              <em>proste i szybkie</em>
            </h2>
          </div>
          <p className="how-desc">
            Cały proces od wyboru zestawu do złożonego zamówienia
            zajmuje kilka minut. Ty się cieszysz — my zajmujemy się resztą.
          </p>
        </div>

        <div className="steps">
          {STEPS.map((s, i) => (
            <div key={s.n} className="step">
              <div className="step-icon">{s.icon}</div>
              <div className="step-num">{s.n}</div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
              {i < STEPS.length - 1 && (
                <div className="step-arrow">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
