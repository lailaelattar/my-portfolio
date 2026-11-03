"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown } from "lucide-react"

const roles = ["Software engineer", "Writer & reporter", "Customer experience analyst", "AI operations specialist"]

// Original single-line letterforms. The pen and revealed ink use the same paths.
const letters = [
  { x: 0, d: "M59 39C43 24 17 71 18 110C19 138 36 150 66 137M4 137C26 131 47 130 78 136" },
  { x: 75, d: "M39 105C23 85 5 111 10 131C15 150 38 122 40 108C35 129 36 146 52 130" },
  { x: 122, d: "M12 106C6 124 4 147 26 129M16 87L17 85" },
  { x: 149, d: "M7 126C36 94 43 40 29 43C14 48 1 122 12 137C17 144 26 139 34 129" },
  { x: 182, d: "M39 105C23 85 5 111 10 131C15 150 38 122 40 108C35 129 36 146 52 130" },
  { x: 260, d: "M57 49C22 33 8 65 23 83C34 97 48 93 40 89C18 79 -1 112 12 132C22 147 48 142 65 125" },
  { x: 326, d: "M7 126C36 94 43 40 29 43C14 48 1 122 12 137C17 144 26 139 34 129" },
  { x: 391, d: "M-2 140C17 119 31 60 52 43C58 65 42 126 59 138M13 111C27 105 44 104 58 108" },
  { x: 452, d: "M22 71C16 97 3 134 14 140C20 143 29 136 35 128M2 101L36 98" },
  { x: 489, d: "M22 71C16 97 3 134 14 140C20 143 29 136 35 128M2 101L36 98" },
  { x: 525, d: "M39 105C23 85 5 111 10 131C15 150 38 122 40 108C35 129 36 146 52 130" },
  { x: 573, d: "M2 134C11 119 17 106 16 101C15 111 28 112 35 104C24 122 22 145 46 131" },
]

export default function Intro() {
  const signature = useRef<SVGGElement>(null)
  const pen = useRef<SVGGElement>(null)
  const [role, setRole] = useState(0)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0
    let timer: ReturnType<typeof setInterval> | undefined
    const paths = Array.from(signature.current?.querySelectorAll<SVGPathElement>(".signature-stroke") ?? [])
    const lengths = paths.map(path => path.getTotalLength())
    const total = lengths.reduce((sum, length) => sum + length, 0)

    const start = () => {
      cancelAnimationFrame(frame)
      clearInterval(timer)
      if (media.matches) {
        paths.forEach(path => { path.style.strokeDashoffset = "0"; path.style.opacity = "1" })
        if (pen.current) pen.current.style.opacity = "0"
        return
      }
      const began = performance.now()
      const draw = (now: number) => {
        const progress = Math.min(Math.max((now - began - 350) / 5200, 0), 1)
        let remaining = progress * total
        let active = 0
        let distance = 0
        paths.forEach((path, index) => {
          const amount = Math.min(Math.max(remaining, 0), lengths[index])
          path.style.strokeDashoffset = String(1 - amount / lengths[index])
          path.style.opacity = amount > 0 ? "1" : "0"
          if (remaining >= 0) { active = index; distance = amount }
          remaining -= lengths[index]
        })
        const point = paths[active]?.getPointAtLength(distance)
        if (point && pen.current) {
          pen.current.setAttribute("transform", `translate(${letters[active].x + point.x} ${point.y})`)
          pen.current.style.opacity = progress < 1 ? "1" : "0"
        }
        if (progress < 1) frame = requestAnimationFrame(draw)
      }
      frame = requestAnimationFrame(draw)
      timer = setInterval(() => setRole(current => (current + 1) % roles.length), 3200)
    }
    start()
    media.addEventListener("change", start)
    return () => { cancelAnimationFrame(frame); clearInterval(timer); media.removeEventListener("change", start) }
  }, [])

  return (
    <section id="hero" className="media-intro" aria-label="Introducing Laila El Attar">
      <div className="intro-registration" aria-hidden="true"><span>LE / Portfolio</span><span>Technology × Media</span></div>
      <div className="intro-composition">
        <p className="intro-eyebrow">A little logic. A little imagination.</p>
        <h1 className="intro-name" aria-label="Laila El Attar">
          <svg viewBox="0 0 1000 300" aria-hidden="true" className="intro-signature">
            <defs>
              <linearGradient id="pen-barrel" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#17141f"/><stop offset=".45" stopColor="#73617a"/><stop offset=".65" stopColor="#3c3049"/><stop offset="1" stopColor="#17141f"/></linearGradient>
              <linearGradient id="pen-nib"><stop stopColor="#b29b72"/><stop offset=".5" stopColor="#f4e6c7"/><stop offset="1" stopColor="#b29b72"/></linearGradient>
            </defs>
            <g transform="translate(64 15) scale(1.4)" ref={signature}>
              {letters.map((letter, index) => <path key={index} className="signature-stroke" pathLength="1" transform={`translate(${letter.x} 0)`} d={letter.d} />)}
              <g ref={pen} className="writing-pen" style={{ opacity: 0 }}>
                <g transform="rotate(35)">
                  <ellipse cx="13" cy="-38" rx="11" ry="53" fill="#302739" opacity=".2" className="pen-shadow" />
                  <path d="M0 0L-5-18L5-18Z" fill="url(#pen-nib)" stroke="#8c7655" strokeWidth=".5" />
                  <path d="M0-2V-16" stroke="#5a4739" strokeWidth=".6" />
                  <rect x="-5.5" y="-104" width="11" height="87" rx="4" fill="url(#pen-barrel)" />
                  <path d="M-5-21H5M-5-27H5M-5-91H5" stroke="#d6bd8b" strokeWidth="2" />
                  <path d="M3-94V-66" stroke="#ddcba4" strokeWidth="1.4" />
                </g>
              </g>
            </g>
          </svg>
          <svg className="signature-rule" viewBox="0 0 1000 36" fill="none" aria-hidden="true"><path pathLength="1" d="M65 23C245 4 590 7 936 18M734 29L936 18L912 33" /></svg>
        </h1>
        <div className="intro-roles" aria-label="Roles I have held">
          <span className="sr-only">{roles.join(", ")}</span>
          <span className="intro-role rotating-role" key={role} aria-hidden="true">{roles[role]}</span>
        </div>
      </div>
      <div className="intro-footer"><a href="#about-me" className="intro-explore">Explore my work <ArrowDown size={16} aria-hidden="true" /></a></div>
    </section>
  )
}
