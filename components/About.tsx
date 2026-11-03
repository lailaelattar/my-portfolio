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
                My background spans software engineering, customer research, and AI operations, with degrees in Computer Science and Media &amp; Communication Studies from Western University.
              </p>
              <p className="max-w-150 text-1xl tracking-tight text-black dark:text-zinc-50">
                I like getting close to a problem: listening to the people experiencing it, finding patterns in the data, and working with others to figure out what would make things better. At Hydro One, that meant investigating enrollment friction and helping carry a fix through to implementation.
              </p>
              <p className="max-w-150 text-1xl tracking-tight text-black dark:text-zinc-50">
                At IO Industries, I built a tool that helps customers choose compatible lenses. Now, as an AI Operations Specialist at Opendoor, I build detection systems and automated workflows that help teams catch issues early. Across those roles, I enjoy turning an unclear problem into something concrete, learning from feedback, and improving it.
              </p>
              <p className="max-w-150 text-1xl tracking-tight text-black dark:text-zinc-50">
                In my free time, I love exploring new coffee shops and planning my next trip abroad ✈️
              </p>
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
