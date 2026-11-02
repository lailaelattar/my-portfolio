"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowUpRight, ArrowRight } from "lucide-react"
export default function About() {
    return(
         <section id="about-me" className="w-full py-20 border-t border-border">
          <h2 className="w-full text-center text-4xl sm:text-5xl font-semibold mb-8">
            About Me
          </h2>
          <div className="flex flex-col gap-10 items-center text-base md:flex-row">
            <div className="flex-1 flex flex-col gap-5">
              <p className="text-lg leading-relaxed text-foreground">
                I’m Laila—a builder with a background in software, research, and AI operations. I like understanding what people need and turning messy problems into useful products.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Currently at Opendoor. Outside work, you’ll find me exploring coffee shops or planning my next trip. ✈️
              </p>
              <div className="flex gap-2">
                <Button variant="outline"   className="w-fit flex items-center gap-1 transition-transform hover:scale-110">
                  <a href="/Laila El attar Resume.pdf" target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-1"> Resume <ArrowUpRight className="w-4 h-4"/> </a> 
                </Button>
                <Button variant="outline" className= "flex items-center gap-1 transition-transform hover:scale-110">
                    <a href="mailto:laylaattar@live.com" className="flex items-center gap-1"> Say Hello <ArrowRight className="w-4 h-4"/> </a>
                </Button>
              </div>
            </div>
            <div className="w-full max-w-xs shrink-0 paper-card p-3 rotate-2">
              <Image
                className="rounded-lg object-cover aspect-[4/5] w-full"
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
