const STEPS = [
  { n: '01', title: 'Wybierz zestaw',  desc: 'Przeglądaj katalog i dodawaj gotowe zestawy do koszyka. Każdy zestaw to skompletowana dekoracja.' },
  { n: '02', title: 'Podaj dane',      desc: 'Adres dostawy, data i godzina — formularz zajmuje 30 sekund. Musisz dopisać coś.' },
  { n: '03', title: 'Potwierdzamy',    desc: 'Skontaktujemy się z Tobą w ciągu 15 minut z potwierdzeniem zamówienia i godziną dostawy.' },
  { n: '04', title: 'Dostarczamy',     desc: 'Balony trafiają prosto do Ciebie — 24 godziny na dobę, na terenie Szczecina i okolic.' },
]

export default function HowItWorks() {
  return (
    <section className="how" id="how">
      <div className="how-inner">
        <div className="how-top">
          <div>
            <p className="eyebrow">Jak to działa</p>
            <h2 className="section-title">
              Zamawianie jest
              <em>proste i szybkie</em>
            </h2>
          </div>
          <p className="how-desc">
            Cały proces od wyboru zestawu do dostawy zajmuje kilka minut.
            Ty się cieszysz — my zajmujemy się resztą.
          </p>
        </div>
        <div className="steps">
          {STEPS.map(s => (
            <div key={s.n} className="step">
              <div className="step-num-circle">{s.n}</div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
