"use client"
import { Users, Laptop, Rocket } from "lucide-react"

const options = [
  {
    icon: <Laptop className="w-7 h-7 text-muted-foreground" />,
    title: "LinkedIn",
    href: "https://linkedin.com/in/laila-el-attar",
  },
  {
    icon: <Rocket className="w-7 h-7 text-muted-foreground" />,
    title: "Resume",
    href: "/Laila El attar Resume.pdf",
  },
  {
    icon: <Users className="w-7 h-7 text-muted-foreground" />,
    title: "Email",
    href: "mailto:laylaattar@live.com",
  }
]

export default function Contact() {
  return (
    <section id="contact" className="w-full py-20 border-t border-border">
      <h2 className="w-full text-center text-4xl sm:text-5xl font-semibold mb-12 text-foreground ">
        Contact
      </h2>
      <div className="grid grid-cols-3 gap-4 place-items-center">
        {options.map((opt) => (
          <a
          
            key={opt.title}
            href={opt.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 group cursor-pointer"
          >
            <div className="w-20 h-20 rounded-2xl bg-muted  flex items-center justify-center
              transition-transform group-hover:scale-110">
              {opt.icon}
            </div>
            <p className="font-semibold text-base text-foreground ">{opt.title}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
