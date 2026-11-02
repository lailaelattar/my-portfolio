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
    <div className="flex flex-col min-h-screen flex-1 items-center justify-center relative z-10">
      <Navbar activeSection={activeSection} />
      <main className="flex flex-1 w-full max-w-6xl mx-auto flex-col items-center justify-between pt-40 pb-12 px-6 sm:pt-48 sm:px-12 sm:items-start">
        {/* Hero */}
        <section id="hero" className="w-full">
          <p className="notebook-label text-center mb-5">Research · Build · Learn</p>
          <div className="w-full max-w-4xl mx-auto text-center">
            <p className="text-base text-muted-foreground">
              Hey, I&apos;m Laila.
            </p>
            <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight text-foreground mt-6 leading-tight">
              I connect the dots to build{" "}
              <span className="hero-underline">products that help people</span>.
            </h1>
            <p className="mt-6 mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
              I bring together user research, data, and hands-on building to understand
              problems, test ideas, and turn what I learn into useful products.
            </p>
          </div>
          <p className="margin-note text-center mt-8 text-xl">A few things I’ve built, and what I’m learning along the way.</p>
          <div className="flex w-full flex-col items-center py-16 px-6">
            <Button
              variant="outline"
              size="icon"
              aria-label="Read about Laila"
              className="transition-transform hover:translate-y-1"
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
