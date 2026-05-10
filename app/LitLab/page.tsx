"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const steps = ["Research", "Ideate", "Prototype", "Feedback"]
import Image from "next/image"

function Carousel({ images, caption }: { images: string[]; caption: string }) {
  const [index, setIndex] = useState(0)
  return (
    <div className="my-8">
      <div className="relative bg-zinc-100 dark:bg-zinc-800 rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
        {images[index] ? (
          <img src={images[index]} alt={caption} className="w-full h-full object-cover" />
        ) : (
          <span className="text-sm text-zinc-400">{caption}</span>
        )}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setIndex((i) => Math.max(i - 1, 0))}
              disabled={index === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-zinc-700/80 rounded-full shadow disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIndex((i) => Math.min(i + 1, images.length - 1))}
              disabled={index === images.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-zinc-700/80 rounded-full shadow disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
      <p className="text-center text-xs text-zinc-400 mt-2">{caption}</p>
    </div>
  )
}

function SectionAnchor({ id }: { id: string }) {
  return <div id={id} className="-mt-24 pt-24" />
}

export default function LitLabPage() {
  const [activeStep, setActiveStep] = useState(-1)
  const [stepperVisible, setStepperVisible] = useState(false)

  useEffect(() => {
    // Show/hide stepper based on whether we've scrolled past the hero
    const stepperTrigger = document.getElementById("research")
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setStepperVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0)
      },
      { threshold: 0 }
    )
    if (stepperTrigger) heroObserver.observe(stepperTrigger)

    // Track which section is active
    const sectionObservers = steps.map((step, i) => {
      const el = document.getElementById(step.toLowerCase())
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveStep(i)
        },
        { threshold: 0.2, rootMargin: "-80px 0px -40% 0px" }
      )
      obs.observe(el)
      return obs
    })

    return () => {
      heroObserver.disconnect()
      sectionObservers.forEach((o) => o?.disconnect())
    }
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex flex-col min-h-screen relative z-10">
      {/* Your site's Navbar — no activeSection needed here */}
      <Navbar />

      {/* Sticky process stepper — only visible after scrolling past hero */}
      <div
        className={`fixed top-14 left-0 right-0 z-40 transition-all duration-300 ${
          stepperVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 px-8 py-3">
          <div className="max-w-3xl mx-auto flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-px bg-zinc-200 dark:bg-zinc-700 z-0" />
            {steps.map((step, i) => (
              <button
                key={step}
                onClick={() => scrollTo(step.toLowerCase())}
                className="flex flex-col items-center gap-1.5 z-10"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    activeStep === i
                      ? "bg-[#555674] text-white"
                      : "bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-300"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`text-xs font-medium transition-colors ${
                    activeStep === i ? "text-black dark:text-white font-semibold" : "text-zinc-400"
                  }`}
                >
                  {step}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-24 w-full">

        {/* Back button — small and left-aligned */}
        <Button
          variant="ghost"
          size="sm"
          className="mb-8 flex items-center gap-1.5 text-zinc-500 hover:text-black dark:hover:text-white"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {/* Hero */}
        <div className="mb-16">
          <Badge variant="secondary" className="mb-4">Case Study</Badge>
          <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white mb-4">LitLab</h1>
          <p className="text-xl text-zinc-500 dark:text-white mb-2 leading-relaxed mb-8">
            A media literacy app designed to combat misinformation through critical thinking and habit-building
          </p>

          <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-xs text-zinc-400">
                <Image
                className="rounded-2xl object-cover"
                src="/LitLab Images/Hero.png"
                alt="Laila's Portfolio Picture"
                width={700}
                height={200}
                priority
                />
                </div>
        </div>

        {/* Meta table */}
        <div className="grid grid-cols-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden mb-16">
          {[
            { label: "Role", value: "UI/UX Designer" },
            { label: "Scope", value: "UI Design, UX Flow, Prototyping" },
            { label: "Type", value: "Academic Product Concept" },
            { label: "Tools", value: "Figma, FigJam" },
          ].map(({ label, value }) => (
            <div key={label} className="p-5 border-r border-zinc-200 dark:border-zinc-700 last:border-r-0">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">{label}</p>
              <p className="text-sm font-medium text-black dark:text-white">{value}</p>
            </div>
          ))}
        </div>

        {/* Overview */}
        <div className="mb-16 grid sm:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-semibold text-black dark:text-white mb-2">Overview</h2>
          </div>
          <div className="sm:col-span-2">
            <p className="text-zinc-600 dark:text-white mb-2 leading-relaxed">
              LitLab is designed to help users critically evaluate online information through guided prompts, interactive modules, and practical toolkits that support habit-building and reflection
            </p>
          </div>
        </div>

        {/* Problem / Solution */}
        <div className="grid sm:grid-cols-2 gap-8 mb-16">
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6">
            <h3 className="text-base font-semibold text-white dark:text-white mb-2">The Problem</h3>
            <ul className="space-y-2 text-sm text-zinc-600  dark:text-white mb-2">
              <li className="flex gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" />Students frequently encounter fast-moving, unverified information online.</li>
              <li className="flex gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" />AI-generated content has made credibility harder to assess at a glance.</li>
              <li className="flex gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" />Students lack accessible, habit-forming tools to pause, reflect, and evaluate information.</li>
            </ul>
          </div>
          <div className="bg-[#555674]/10 dark:bg-[#555674]/20 rounded-2xl p-6">
            <h3 className="text-base font-semibold text-black dark:text-white mb-3">The Solution</h3>
            <ul className="space-y-2 text-sm text-zinc-600  dark:text-white mb-2">
              <li className="flex gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#555674] shrink-0" />Empower users with guided evaluation prompts to critically question media content.</li>
              <li className="flex gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#555674] shrink-0" />Offer interactive media literacy learning experiences.</li>
              <li className="flex gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#555674] shrink-0" />Build reflection into everyday media consumption through habit-forming features.</li>
            </ul>
          </div>
        </div>

        {/* Static stepper (in-page, before sticky kicks in) */}
        <div className="flex items-center justify-between mb-16 relative">
          <div className="absolute top-5 left-0 right-0 h-px bg-zinc-200 dark:bg-zinc-700 z-0" />
          {steps.map((step, i) => (
            <button
              key={step}
              onClick={() => scrollTo(step.toLowerCase())}
              className="flex flex-col items-center gap-2 z-10"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${activeStep === i ? "bg-[#555674] text-white" : "bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300"}`}>
                {i + 1}
              </div>
              <span className={`text-xs font-medium ${activeStep === i ? "text-black dark:text-white font-semibold" : "text-zinc-400"}`}>{step}</span>
            </button>
          ))}
        </div>

        {/* ── RESEARCH ── */}
        <SectionAnchor id="research" />
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-1">Research</h2>
          <p className=" dark:text-white mb-2 text-sm mb-8">Understanding users before designing solutions</p>
          <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Empathy Mapping</h3>
          <p className="text-zinc-600  dark:text-white mb-2 leading-relaxed mb-4">
            To better understand how people engage with online information, I conducted three user interviews and synthesized the insights into two core personas: Max Wilson and Carrie Ann.
          </p>
          <p className="text-zinc-600 dark:text-white mb-3 leading-relaxed mb-6">
            Mapping each persona's actions, thoughts, and emotions helped surface key frustrations, motivations, and opportunities that directly informed the product's direction.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-xs text-zinc-400">
                <Image
                className="rounded-2xl object-cover"
                src="/LitLab Images/MaxEmpathy.png"
                alt="Laila's Portfolio Picture"
                width={600}
                height={200}
                priority
                />
                </div>
            <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-xs text-zinc-400">
                <Image
                className="rounded-2xl object-cover"
                src="/LitLab Images/CarrieEmpathy.png"
                alt="Laila's Portfolio Picture"
                width={600}
                height={200}
                priority
                />
                </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center mb-10">
            <p className="text-xs text-zinc-400">Max Wilson's Empathy Map</p>
            <p className="text-xs text-zinc-400">Carrie Ann's Empathy Map</p>
          </div>
          <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Personas</h3>
          <p className="text-zinc-600 dark:text-white mb-3 leading-relaxed mb-6">
            I translated the empathy maps into two personas representing distinct ways people encounter and evaluate online information
          </p>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-xl ring-2 ring-[#555674] flex items-center justify-center text-xs text-zinc-400">
                <Image 
                className="rounded-2xl object-cover"
                src="/LitLab Images/MaxPersona.png"
                alt="Laila's Portfolio Picture"
                width={600}
                height={200}
                priority
                />
                </div>
            <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-xs text-zinc-400">
                <Image
                className="rounded-2xl object-cover"
                src="/LitLab Images/CarriePersona.png"
                alt="Laila's Portfolio Picture"
                width={600}
                height={200}
                priority
                />
                </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center mb-10">
            <p className="text-xs text-zinc-400">Max Wilson's Persona</p>
            <p className="text-xs text-zinc-400">Carrie Ann's Persona</p>
          </div>
        </div>

        {/* ── IDEATE ── */}
        <SectionAnchor id="ideate" />
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-1">Ideate</h2>
          <p className="text-zinc-400 text-sm mb-8 dark:text-white mb-3">Turning Pain Points Into Solutions</p>
          <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Mind Mapping</h3>
          <p className="text-zinc-600 dark:text-white mb-3 leading-relaxed mb-6">
            To explore the app's core ideas, I used mind mapping to visualize potential features, learning modules, and quick-action tools
          </p>
          <Image
                className="rounded-2xl object-cover mb-6"
                src="/LitLab Images/MindMap.png"
                alt="Laila's Portfolio Picture"
                width={1200}
                height={800}
                priority
                />
          <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Card Sorting</h3>
          <p className="text-zinc-600 dark:text-white mb-3 leading-relaxed mb-6">
            I used card sorting to group related features into clear pages and sections
          </p>
          <Image
                className="rounded-2xl object-cover mb-6"
                src="/LitLab Images/CardSorting.png"
                alt="Laila's Portfolio Picture"
                width={1200}
                height={800}
                priority
                />
          <h3 className="text-lg font-semibold text-black dark:text-white mb-6">Design Decisions and Outcomes</h3>
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm font-semibold text-zinc-500 mb-3 dark:text-white mb-3">What Didn't Work</p>
              <ul className="space-y-1.5 text-sm text-zinc-600 dark:text-white mb-3">
                {["Overwhelming onboarding with too many prompts", "Long-form articles users wouldn't read in-app"].map(t => (
                  <li key={t} className="flex gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#555674] shrink-0" />{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-500 mb-3 dark:text-white mb-3">What Was Improved</p>
              <ul className="space-y-1.5 text-sm text-zinc-600 dark:text-white mb-3">
                {["Streamlined to 3 core actions on home screen", "Micro-prompts replace long articles"].map(t => (
                  <li key={t} className="flex gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#555674] shrink-0" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6">
            <p className="text-sm font-semibold dark:text-white mb-6 mb-3">What Made It to the Prototype</p>
            <ul className="space-y-1.5 text-sm text-zinc-600 dark:text-white mb-6">
              {["Daily media check-in prompts", "Credibility rating tool with guided questions", "Habit tracker with streak system", "Modular learning cards"].map(t => (
                <li key={t} className="flex gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#555674] shrink-0" />{t}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── PROTOTYPE ── */}
        <SectionAnchor id="prototype" />
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-1">Prototype</h2>
          <p className="text-zinc-400 text-sm mb-8 dark:text-white mb-6">From structure to interaction</p>
          <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Sketches</h3>
          <p className="text-zinc-600 dark:text-white mb-6 leading-relaxed mb-6">
            I began by sketching each screen on paper using the card-sorted structure as a foundation for navigation and layout
          </p>
              <Image
                className="rounded-2xl object-cover mb-6"
                src="/LitLab Images/Sketches.png"
                alt="Laila's Portfolio Picture"
                width={1200}
                height={800}
                priority
                />

          <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Low-Fidelity Prototype</h3>
          <p className="text-zinc-600 dark:text-white mb-6 leading-relaxed mb-6">
            I translated the sketches into a low-fidelity prototype and gathered early feedback from peers, AI-assisted usability analysis, and instructor input
          </p>
              <Image
                className="rounded-2xl object-cover mb-6"
                src="/LitLab Images/Lo-fi.png"
                alt="Laila's Portfolio Picture"
                width={1200}
                height={800}
                priority
                />
          <h3 className="text-lg font-semibold text-black dark:text-white mb-3">High-Fidelity Prototype</h3>
          <p className="text-zinc-600 dark:text-white mb-6 leading-relaxed mb-6">
            The high-fidelity prototype refined LitLab's visual design, interactions, and user flow based on earlier feedback and testing
          </p>
              <Image
                className="rounded-2xl object-cover mb-6"
                src="/LitLab Images/Hi-fi.png"
                alt="Laila's Portfolio Picture"
                width={1200}
                height={800}
                priority
                />
        </div>

        {/* ── FEEDBACK ── */}
        <SectionAnchor id="feedback" />
        <div>
          <h2 className="text-3xl font-bold text-black dark:text-white mb-1">Feedback</h2>
          <p className="text-zinc-400 text-sm mb-8 dark:text-white mb-6">What I Learned Through Iterations</p>
          <p className="text-zinc-600 dark:text-white mb-6leading-relaxed mb-4">
            LitLab challenged me to think critically about clarity, scope, and user attention, especially within the constraints of mobile design.
          </p>
          <p className="text-zinc-600 dark:text-white mb-6 leading-relaxed">
            This process strengthened my understanding of iterative design, visual hierarchy, and balancing meaningful content with usability.
          </p>
        </div>

      </main>

      <Footer />
    </div>
  )
}