"use client"

import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"

const roles = ["Software engineer", "Writer & reporter", "Customer experience analyst", "AI operations specialist"]

export default function Intro() {
  const [role, setRole] = useState(0)

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
          <span className="masthead-word">Laila</span>{" "}
          <span className="masthead-word">El Attar</span>
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
