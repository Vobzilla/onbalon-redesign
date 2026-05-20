/** @format */

export default function AnnounceBanner() {
  return (
    <div className="announce">
      {/* Desktop: static */}
      <span className="announce-static">
        Dostawa <strong>dopasowana</strong> do Twojego terminu na terenie Szczecina
        <span className="announce-sep">·</span>
        Potwierdzamy w <strong>15 minut</strong>
      </span>
      {/* Mobile: marquee */}
      <span className="announce-marquee" aria-hidden="true">
        <span>
          Dostawa <strong>dopasowana</strong> do Twojego terminu&nbsp;&nbsp;·&nbsp;&nbsp;
          Potwierdzamy w <strong>15 minut</strong>&nbsp;&nbsp;·&nbsp;&nbsp;
          Dostawa <strong>dopasowana</strong> do Twojego terminu&nbsp;&nbsp;·&nbsp;&nbsp;
          Potwierdzamy w <strong>15 minut</strong>
        </span>
      </span>
    </div>
  )
}
