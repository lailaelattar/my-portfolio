"use client"

import { ArrowUpRight } from "lucide-react"

const links = [
  { label: "LinkedIn", href: "https://linkedin.com/in/laila-el-attar" },
  { label: "Resume", href:"/Laila El attar Resume.pdf" },
  { label: "Email", href: "mailto:laylaattar@live.com" },
]

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <footer className="w-full border-t border-border  mt-20 py-6 px-0 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground ">
        © {new Date().getFullYear()} Laila El Attar — Designed & built by me
      </p>

      <div className="flex items-center gap-6">
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="flex items-center gap-0.5 text-sm text-muted-foreground hover:text-foreground  transition-colors group"
          >
            {label}
            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
          </a>
        ))}
      </div>

      <button
        onClick={scrollToTop}
        className="text-sm text-muted-foreground hover:text-foreground  transition-colors"
      >
        Back to top ↑
      </button>
    </footer>
  )
}
