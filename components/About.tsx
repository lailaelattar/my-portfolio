"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowUpRight, ArrowRight } from "lucide-react"
export default function About() {
    return(
         <section id="about-me" className="w-full py-20">
          <h1 className="w-full text-center text-6xl font-semibold mb-8">
            About Me
          </h1>
          <div className="flex flex-col gap-4 items-center text-base font-medium sm:flex-row">
            <div className="flex flex-col gap-3">
              <p className="max-w-150 text-1xl tracking-tight text-black dark:text-zinc-50">
                I&apos;m an AI Operations Specialist at Opendoor, with degrees in Computer Science and Media &amp; Communication Studies from Western University.
              </p>
              <p className="max-w-150 text-1xl tracking-tight text-black dark:text-zinc-50">
                I build systems that help teams catch problems early and act with confidence. At Opendoor, I work across Python, Snowflake, and SQL to audit AI outputs, detect at-risk contracts, and organize reliable utility provider data.
              </p>
              <p className="max-w-150 text-1xl tracking-tight text-black dark:text-zinc-50">
                Using Gumloop, Parallel AI, and MCP-connected Claude, I turn manual monitoring into automated workflows. My background in software engineering, customer research, and UX keeps that work grounded in the people using it.
              </p>
              <p className="max-w-150 text-1xl tracking-tight text-black dark:text-zinc-50">
                In my free time, I love exploring new coffee shops and planning my next trip abroad ✈️
              </p>
              <div className="max-w-150 rounded-xl border border-zinc-700 bg-zinc-800/40 p-4">
                <h2 className="text-sm font-semibold text-zinc-400 mb-2">
                  Certifications
                </h2>
                <a
                  href="https://www.pendo.io/learninglab/certificates/cmvbmc2mz00122ylopk0rwmi8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm text-zinc-50 underline decoration-zinc-500 underline-offset-4 transition-colors hover:text-violet-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
                >
                  Pendo certification
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
              <p className="max-w-150 text-1xl tracking-tight text-black dark:text-zinc-50">
                Let&apos;s connect!
              </p>
              <div className="flex gap-2">
                <Button variant="outline"  style={{ borderColor: "#555674",backgroundColor: "#555674" }} className="w-fit flex items-center gap-1 transition-transform hover:scale-110">
                  <a href="/Laila El attar Resume.pdf" target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-1"> Resume <ArrowUpRight className="w-4 h-4"/> </a> 
                </Button>
                <Button variant="outline" className= "flex items-center gap-1 transition-transform hover:scale-110">
                    <a href="mailto:laylaattar@live.com" className="flex items-center gap-1"> Say Hello <ArrowRight className="w-4 h-4"/> </a>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                className="rounded-2xl object-cover"
                src="/laila-portfolio 2.png"
                alt="Laila's Portfolio Picture"
                width={600}
                height={600}
                priority
              />
            </div>
          </div>
        </section>
    )
}
