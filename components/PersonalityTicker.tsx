"use client"

const labels = ["Designer", "Builder", "Writer", "Interviewer", "Matcha enthusiast", "Crochet lover", "Hiker"]

export default function PersonalityTicker() {
  return (
    <div className="news-personality" tabIndex={0} aria-label="Interests. Hover or focus to pause scrolling.">
      <div className="news-ticker-window">
        <span className="sr-only">{labels.join(", ")}</span>
        <div className="news-ticker-track" aria-hidden="true">
          {[0, 1].map(copy => <div className="news-ticker-group" key={copy}>
            {labels.map(label => <span key={label}>{label}<span className="news-ticker-dot">✦</span></span>)}
          </div>)}
        </div>
      </div>
    </div>
  )
}
