import { ArrowDown } from "lucide-react"

const roles = ["Software engineer", "Writer & reporter", "Customer experience analyst", "AI operations specialist"]

export default function Intro() {
  return (
    <section id="hero" className="media-intro" aria-label="Introducing Laila El Attar">
      <div className="intro-registration" aria-hidden="true"><span>LE / Portfolio</span><span>Technology × Media</span></div>
      <div className="intro-composition">
        <p className="intro-eyebrow">A little logic. A little imagination.</p>
        <h1 className="intro-name" aria-label="Laila El Attar">
          <svg viewBox="0 0 1000 255" aria-hidden="true" className="intro-signature">
            <text x="500" y="185" textAnchor="middle" className="signature-outline">Laila El Attar</text>
            <text x="500" y="185" textAnchor="middle" className="signature-ink">Laila El Attar</text>
          </svg>
          <svg className="signature-rule" viewBox="0 0 1000 36" fill="none" aria-hidden="true"><path pathLength="1" d="M65 23C245 4 590 7 936 18M734 29L936 18L912 33" /></svg>
        </h1>
        <div className="intro-roles" aria-label="Roles I have held">
          {roles.map((role, index) => (
            <span className="intro-role" style={{ animationDelay: `${1.9 + index * 0.18}s` }} key={role}>
              <span className="role-index" aria-hidden="true">0{index + 1}</span>{role}
            </span>
          ))}
        </div>
      </div>
      <div className="intro-footer"><span>Code, stories, and everything in between.</span><a href="#about-me" className="intro-explore">Explore my work <ArrowDown size={16} aria-hidden="true" /></a></div>
    </section>
  )
}
