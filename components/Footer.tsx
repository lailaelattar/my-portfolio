"use client"

import { ArrowUpRight } from "lucide-react"

const links = [
  { label: "LinkedIn", href: "https://linkedin.com/in/laila-el-attar" },
  { label: "Resume", href:"/Laila El attar Resume.pdf" },
  { label: "Email", href: "mailto:lelattar@uwo.ca" },
]

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 mt-20 py-5 px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-zinc-400 dark:text-zinc-500">
        © {new Date().getFullYear()} Laila El Attar — Designed & built by me
      </p>

      <div className="flex items-center gap-6">
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="flex items-center gap-0.5 text-sm text-zinc-500 hover:text-black dark:hover:text-white transition-colors group"
          >
            {label}
            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
          </a>
        ))}
      </div>

      <button
        onClick={scrollToTop}
        className="text-sm text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
      >
        Back to top ↑
      </button>
    </footer>
  )
}