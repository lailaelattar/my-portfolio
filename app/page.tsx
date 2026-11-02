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
import Certifications from "@/components/Certifications"

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
  const activeSection = useActiveSection(["about-me", "experience", "work", "certifications", "contact"])

  const scrollToAbout = () => {
    document.getElementById("about-me")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    // No bg classes — let the canvas show through
    <div className="flex flex-col min-h-screen flex-1 items-center justify-center relative z-10">
      <Navbar activeSection={activeSection} />
      <main className="flex flex-1 w-full max-w-5xl mx-auto flex-col items-center justify-between py-32 px-6 sm:py-45 sm:px-16 sm:items-start">
        {/* Hero */}
        <section id="hero" className="w-full">
          <div className="w-full text-center">
            <p className="text-2xl text-zinc-400">
              Hey, I&apos;m Laila! 👋 Curious about people. Driven to build.
            </p>
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-zinc-50 mt-4">
              I connect the dots to build{" "}
              <span className="hero-underline">products that help people</span>.
            </h1>
            <p className="mt-6 mx-auto max-w-2xl text-lg leading-relaxed text-zinc-400">
              I bring together user research, data, and hands-on building to understand
              problems, test ideas, and turn what I learn into useful products.
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
        <Certifications />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}
