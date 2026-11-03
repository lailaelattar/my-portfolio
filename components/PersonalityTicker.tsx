"use client"

import { useState } from "react"
import { Pause, Play } from "lucide-react"

const labels = ["Designer", "Builder", "Writer", "Matcha enthusiast", "Crochet lover", "Hiker"]

export default function PersonalityTicker() {
  const [paused, setPaused] = useState(false)

  return (
    <div className="news-personality" data-paused={paused}>
      <div className="news-ticker-window">
        <span className="sr-only">{labels.join(", ")}</span>
        <div className="news-ticker-track" aria-hidden="true">
          {[0, 1].map(copy => <div className="news-ticker-group" key={copy}>
            {labels.map(label => <span key={label}>{label}<span className="news-ticker-dot">✦</span></span>)}
          </div>)}
        </div>
      </div>
      <button type="button" className="news-ticker-toggle" aria-label={paused ? "Resume scrolling interests" : "Pause scrolling interests"} aria-pressed={paused} onClick={() => setPaused(!paused)}>
        {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
      </button>
    </div>
  )
}
