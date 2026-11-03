"use client"

import { useEffect, useId, useState } from "react"
import { ArrowDown } from "lucide-react"
import { signaturePaths } from "./signature-paths"

const roles = ["Software engineer", "Writer & reporter", "Customer experience analyst", "AI operations specialist"]

export default function Intro() {
  const [role, setRole] = useState(0)
  const gradientId = useId()

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    let timer: ReturnType<typeof setInterval> | undefined
    const start = () => {
      clearInterval(timer)
      if (!media.matches) timer = setInterval(() => setRole(current => (current + 1) % roles.length), 3600)
    }
    start()
    media.addEventListener("change", start)
    return () => { clearInterval(timer); media.removeEventListener("change", start) }
  }, [])

  return (
    <section id="hero" className="media-intro" aria-label="Introducing Laila El Attar">
      <div className="intro-composition">
        <h1 className="intro-name" aria-label="Laila El Attar">
          <svg viewBox="0 0 1000 330" aria-hidden="true" className="intro-signature">
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2=".15" y2="1">
                <stop stopColor="#776174" />
                <stop offset=".32" stopColor="#493747" />
                <stop offset=".62" stopColor="#302630" />
                <stop offset=".84" stopColor="#685064" />
                <stop offset="1" stopColor="#3c2d3b" />
              </linearGradient>
            </defs>
            <g className="signature-lettering">
              {signaturePaths.map((d, index) => (
                <g key={index} className="signature-letter" style={{ animationDelay: `${.3 + index * .18}s` }}>
                  <path d={d} transform="translate(0 3)" className="ink-depth" />
                  <path d={d} transform="translate(0 1.5)" className="ink-edge" />
                  <path d={d} fill={`url(#${gradientId})`} className="ink-face" pathLength="1" />
                </g>
              ))}
            </g>
          </svg>
        </h1>
        <div className="intro-roles" aria-label="Roles I have held">
          <span className="sr-only">{roles.join(", ")}</span>
          <span className="intro-role rotating-role" key={role} aria-hidden="true">{roles[role]}</span>
        </div>
      </div>
      <a href="#about-me" className="intro-explore">Explore <ArrowDown size={15} aria-hidden="true" /></a>
    </section>
  )
}
