"use client"

import { useState } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const projects = [
  {
    id: 1,
    title: "Lens Calculator — IO Industries",
    note: "01 / Shipped tool",
    description: "A live lens compatibility calculator used by hundreds of customers each month, addressing a frustration cited in 30%+ of support inquiries.",
    tags: ["React.js", "Node.js"],
    image: "/IOI.png",
    link: "https://www.ioindustries.com/calculator/cameras",
  },
  {
    id: 2,
    title: "MSA Website — Western University",
    note: "02 / Community",
    description: "A website for Western University's Muslim Students' Association, displaying events, prayer times, and more",
    tags: ["JavaScript", "MongoDB", "Figma"],
    image: "/Western MSA.png",
    link: "https://western-msa.com",
  },
  {
    id: 3,
    title: "Triage Track — Hackathon",
    note: "03 / Hackathon",
    description: "Emergency triage management tool built in 72 hours with AI voice intake",
    tags: ["JavaScript", "VoiceFlow", "Claude 2.0", "Figma"],
    image: "/Triage Track.png",
    link: "/TriageTrackVideo.mov",
  },
  {
    id: 4,
    title: "LitLab — UX Project",
    note: "04 / Product exploration",
    description: "A media literacy app prototype designed to combat misinformation through habit-building",
    tags: ["Figma"],
    image: "/LitLab.png",
    link: "/LitLab",
  },
]

const creative = [
  { id: 1, title: "Low-Fidelity Prototype of a Mobile App", description: "Designed for a class project named LitLab", image: "Lo-fi.png" },
  { id: 2, title: "High-Fidelity Prototype of a Mobile App", description: "Designed for a class project named LitLab", image: "Hi-fi.png" },
  { id: 3, title: "Ramadan Planner", description: "Designed planner for the Islamic Holy Month Ramadan for the London Muslim Mosque's Youth Conference", image: "RamadanPlanner.png" },
  { id: 4, title: "Graphics", description: "A few graphics I created for events using Canva", image: "Graphics.png" },
]

const writing = [
  {
    id: 1,
    title: "Blog Editor",
    org: "Women in Technology Society",
    image: "/WITS.png",
    link: "https://medium.com/@wits-uwo/women-in-tech-spotlight-grace-hopper-3b2e725d872b",
  },
  {
    id: 2,
    title: "Reporter",
    org: "The Peninsula Qatar",
    image: "/The Peninsula Qatar.png",
    link: "https://thepeninsulaqatar.com/news/search?q=Laila+el+attar&duration=all",
  },
  {
    id: 3,
    title: "News Intern",
    org: "The Western Gazette",
    image: "/The Western Gazette.png",
    link: "https://westerngazette.ca/search/?l=25&sort=relevance&f=html&t=article%2Ccollection&app=editorial&q=Laila+el+attar",
  },
]

export default function MyWork() {
  const [workTab, setWorkTab] = useState<"projects" | "creative" | "writing">("projects")
  const [carouselIndex, setCarouselIndex] = useState(0)

  const selectTab = (tab: typeof workTab) => {
    setWorkTab(tab)
    setCarouselIndex(0)
  }

  return (
    <section id="work" className="w-full flex flex-col items-center py-20 border-t border-border">
      <h2 className="w-full text-center text-4xl sm:text-5xl font-semibold mb-8">
        My Work
      </h2>

      <ButtonGroup className="mb-8">
        <Button variant={workTab === "projects" ? "default" : "outline"} onClick={() => selectTab("projects")}>
          Projects
        </Button>
        <Button variant={workTab === "creative" ? "default" : "outline"} onClick={() => selectTab("creative")}>
          Creative
        </Button>
        <Button variant={workTab === "writing" ? "default" : "outline"} onClick={() => selectTab("writing")}>
          Writing
        </Button>
      </ButtonGroup>

      {/* PROJECTS */}
      {workTab === "projects" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {projects.map((item) => (
            <Card key={item.id} className="pt-0 flex flex-col">
              <div className="aspect-video w-full overflow-hidden rounded-t-xl">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <CardHeader className="flex-1">
                <p className="notebook-label mb-2">{item.note}</p>
                <CardTitle>{item.title}</CardTitle>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <a
                  href={item.link}
                  target={item.link.startsWith("http") || item.link.endsWith(".mov") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button className="w-full flex items-center gap-1 transition-transform hover:scale-105">
                    View Project <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* CREATIVE — carousel */}
      {workTab === "creative" && (
        <div className="relative w-full max-w-3xl overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
          >
            {creative.map((item) => (
              <div key={item.id} className="min-w-full">
                <Card className="pt-0">
                  <div className="aspect-video w-full overflow-hidden rounded-t-xl bg-muted flex items-center justify-center">
                    {item.image
                      ? <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      : <span className="text-muted-foreground text-sm">Coming soon</span>
                    }
                  </div>
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>

          <button
            aria-label="Previous creative project"
            onClick={() => setCarouselIndex((i) => Math.max(i - 1, 0))}
            disabled={carouselIndex === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80  rounded-full shadow disabled:opacity-30 z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            aria-label="Next creative project"
            onClick={() => setCarouselIndex((i) => Math.min(i + 1, creative.length - 1))}
            disabled={carouselIndex === creative.length - 1}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80  rounded-full shadow disabled:opacity-30 z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="flex justify-center gap-2 mt-4">
            {creative.map((_, i) => (
              <button
                key={i}
                onClick={() => setCarouselIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === carouselIndex ? "bg-primary" : "bg-zinc-300"}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* WRITING */}
      {workTab === "writing" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          {writing.map((item) => (
            <Card key={item.id} className="pt-0 flex flex-col">
              <div className="aspect-video w-full overflow-hidden rounded-t-xl">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <CardHeader className="flex-1">
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.org}</CardDescription>
              </CardHeader>
              <CardFooter>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button className="w-full flex items-center gap-1 transition-transform hover:scale-105">
                    Read My Bylines <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}
