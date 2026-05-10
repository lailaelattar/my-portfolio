"use client"

import { ButtonGroup } from "./ui/button-group"
import { Button } from "./ui/button"
import { useState, useEffect, useRef } from "react"

const workExperience = [
  {
    id: 1,
    company: "Western Technology Services - Western University",
    date: "Sept. 2025 - April 2025",
    title: "Tech Lead & Digital Media Designer",
    bullets: ["Designed accessible, audience-tailored digital learning assets using Adobe Creative Suite and structured course content on Brightspace LMS, shaping the learning experience for hundreds of students"],
  },
  {
    id: 2,
    company: "Hydro One",
    date: "Jan. 2025 - August 2025",
    title: "Customer Experience Analyst Intern",
    bullets: ["Analyzed 30,000+ customer records to surface UX friction points in the myEnergy Rewards program, translating findings into actionable recommendations and Power BI dashboards that directly informed roadmap decisions"],
  },
  {
    id: 3,
    company: "IO Industries",
    date: "May 2024 - Dec. 2024",
    title: "Software Engineer Intern",
    bullets: ["Built tools using C++ and JavaScript (React.js, Node.js) to resolved top customer pain points, serving hundreds of users monthly"],
  },
  {
    id: 4,
    company: "The Peninsula Qatar",
    date: "June 2023 - August 2023",
    title: "Reporter",
    bullets: ["Reported and wrote news features for one of Qatar's leading English-language daily newspapers, covering culture, society, and general news"],
  },
  {
    id: 5,
    company: "The Western Gazette - Western University",
    date: "Jan. 2023 - May 2023",
    title: "News Intern",
    bullets: ["Reported and wrote news pieces for Western University's independent student newspaper, covering campus news and student life"],
  },
]

const extracurricular = [
  {
    id: 1,
    company: "Muslim Student Association - Western University",
    date: "Sept. 2025 - April 2025",
    title: "Public Relations Director",
    bullets: ["Led a team of graphic designers and video editors to produce, edit, and post Islamic educational content on the Big Things MSA Instagram page, growing the account from 300 to 1K+ followers in 6 months"],
  },
  {
    id: 2,
    company: "Muslim Student Association - Western University",
    date: "Jan. 2025 - August 2025",
    title: "Technology Developer",
    bullets: ["Helped develop Western's MSA website, working end-to-end to develop prototype into a working website for 2000+ Muslims on campus"],
  },
  {
    id: 3,
    company: "Women in Technology Society - Western University",
    date: "May 2024 - Dec. 2024",
    title: "Blog Editor",
    bullets: ["Edited and published blog content for Western's WITS, covering topics at the intersection of tech, society, and equity"],
  },
]

function TimelineItem({ item, index }: { item: typeof workExperience[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
    return (
    <div
      ref={ref}
      className="flex gap-6 items-start"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`,
      }}
    >
      <div className="flex flex-col items-center w-40 shrink-0 pt-1">
        <div className="text-right w-full pr-4">
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{item.company}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.date}</p>
        </div>
      </div>
      <div className="flex flex-col items-center shrink-0">
        <div className="w-3 h-3 rounded-full bg-zinc-400 dark:bg-zinc-500 mt-1.5 shrink-0" />
        <div className="w-px flex-1 bg-zinc-200 dark:bg-zinc-700 min-h-[80px]" />
      </div>
      <div className="flex-1 pb-10">
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-black dark:text-white mb-3">{item.title}</h3>
          <ul className="space-y-1.5">
            {item.bullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}


export default function Experience() {
    const [activeTab, setActiveTab] = useState<"work" | "extra">("work")
    const items = activeTab === "work" ? workExperience : extracurricular
    return (
        <section id="experience" className="w-full flex flex-col items-center py-20 px-16">
            <ButtonGroup className="mb-8">
                <Button variant={activeTab === "work" ? "default" : "outline"} onClick={() => setActiveTab("work")}>
                Work Experience
                </Button>
                <Button variant={activeTab === "extra" ? "default" : "outline"} onClick={() => setActiveTab("extra")}>
                Extracurriculars
                </Button>
            </ButtonGroup>
            <h2 className="w-full text-center text-6xl font-semibold mb-8">
                {activeTab === "work" ? "Work Experience" : "Extracurriculars"}
            </h2>
            <div className="w-full">
                {items.map((item, index) => (
                <TimelineItem key={`${activeTab}-${item.id}`} item={item} index={index} />
                ))}
            </div>
            </section>
    )
}