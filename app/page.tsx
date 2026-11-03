"use client"
import Intro from "@/components/Intro"
import Navbar from "@/components/Navbar"
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

  return (
    <div className="flex flex-col min-h-screen flex-1 items-center justify-center relative z-10">
      <Navbar activeSection={activeSection} />
      <Intro />
      <main className="portfolio-content flex flex-1 w-full max-w-5xl mx-auto flex-col items-center justify-between py-16 px-6 sm:px-16 sm:items-start">
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
