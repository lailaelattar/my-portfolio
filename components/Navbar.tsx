"use client"
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

const links = [
  { label: "About", id: "about-me" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "work" },
  { label: "Certificates", id: "certifications" },
  { label: "Contact", id: "contact" },
]

export default function Navbar({ activeSection }: { activeSection?: string }) {
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleNavClick = (id: string) => {
    if (pathname === "/") {
      // Already on home — just scroll
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    } else {
      // On another page — go home then scroll to section
      router.push(`/#${id}`)
    }
  }

  return (
    <nav className={`portfolio-nav fixed top-0 left-0 right-0 z-50 flex flex-wrap items-center justify-between gap-2 px-4 sm:px-8 py-2 transition-all duration-300
      ${scrolled ? "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
    >
      <div className="flex items-center gap-2">
        <span
          className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 cursor-pointer"
          onClick={() => pathname === "/" ? window.scrollTo({ top: 0, behavior: "smooth" }) : router.push("/")}
        >
          Laila El Attar
        </span>
      </div>
      <NavigationMenu className="w-full max-w-none sm:w-auto sm:max-w-max min-w-0 overflow-x-auto">
        <NavigationMenuList>
          {links.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`relative px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium font-sans transition-colors
                ${activeSection === id ? "text-black dark:text-white" : "text-zinc-500 hover:text-black dark:hover:text-white"}
                group`}
            >
              {label}
              <span className={`absolute bottom-0 left-0 h-px bg-black dark:bg-white transition-all duration-300
                ${activeSection === id ? "w-full" : "w-0"}`}
              />
            </button>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}