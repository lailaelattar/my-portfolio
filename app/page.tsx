"use client"
import Navbar from "@/components/Navbar"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import MyWork from "@/components/MyWork"
import Experience from "@/components/Experience"
import Contact from "@/components/Contact"
import About from "@/components/About"
import Footer from "@/components/Footer"

function useActiveSection(ids: string[]) {
  const [activeSection, setActiveSection] = useState<string>("")
  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.3, rootMargin: "-80px 0px -20% 0px" }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [ids])
  return activeSection
}

export default function Home() {
  const activeSection = useActiveSection(["about-me", "experience", "work", "contact"])

  const scrollToAbout = () => {
    document.getElementById("about-me")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    // No bg classes — let the canvas show through
    <div className="flex flex-col min-h-screen flex-1 items-center justify-center relative z-10">
      <Navbar activeSection={activeSection} />
      <main className="flex flex-1 w-full max-w-5xl mx-auto flex-col items-center justify-between py-45 px-16 sm:items-start">
        {/* Hero */}
        <section id="hero" className="w-full">
          <div className="w-full text-center">
            <p className="text-2xl text-zinc-400">
              Hey, I&apos;m Laila! 👋 AI Operations Specialist at Opendoor
            </p>
            <h1 className="text-6xl font-semibold tracking-tight text-zinc-50 mt-4">
              I turn complex data into{" "}
              <span className="hero-underline">AI workflows that work</span>.
            </h1>
            <p className="mt-6 mx-auto max-w-2xl text-lg leading-relaxed text-zinc-400">
              From Python and Snowflake detection systems to automated operational
              workflows, I connect engineering, analytics, and real human needs.
            </p>
          </div>
          <div className="flex w-full flex-col items-center py-35 px-16">
            <Button
              variant="outline"
              size="icon"
              className="animate-bounce transition-transform hover:scale-110"
              onClick={scrollToAbout}
            >
              <ChevronDown />
            </Button>
          </div>
        </section>
        
        <About />
        <Experience />
        <MyWork />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}
