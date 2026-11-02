"use client"
import { Users, Laptop, Rocket } from "lucide-react"

const options = [
  {
    icon: <Laptop className="w-7 h-7 text-zinc-500" />,
    title: "LinkedIn",
    href: "https://linkedin.com/in/laila-el-attar",
  },
  {
    icon: <Rocket className="w-7 h-7 text-zinc-500" />,
    title: "Resume",
    href: "/Laila El attar Resume.pdf",
  },
  {
    icon: <Users className="w-7 h-7 text-zinc-500" />,
    title: "Email",
    href: "mailto:laylaattar@live.com",
  }
]

export default function Contact() {
  return (
    <section id="contact" className="w-full py-15">
      <h1 className="w-full text-center text-6xl font-semibold mb-12 text-black dark:text-zinc-50">
        Contact
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 place-items-center">
        {options.map((opt) => (
          <a
          
            key={opt.title}
            href={opt.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 group cursor-pointer"
          >
            <div className="w-20 h-20 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center
              transition-transform group-hover:scale-110">
              {opt.icon}
            </div>
            <p className="font-semibold text-base text-black dark:text-zinc-50">{opt.title}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
