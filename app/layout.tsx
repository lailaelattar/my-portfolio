import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

const jost = localFont({ src: "../public/fonts/news/Jost.ttf", variable: "--font-jost", weight: "100 900", display: "swap" })
const cormorant = localFont({
  src: [
    { path: "../public/fonts/news/CormorantGaramond.ttf", weight: "300 700", style: "normal" },
    { path: "../public/fonts/news/CormorantGaramond-Italic.ttf", weight: "300 700", style: "italic" },
  ], variable: "--font-cormorant", display: "swap", preload: false,
})

const newsMasthead = localFont({ src: "../public/fonts/news/UnifrakturMaguntia-Book.ttf", variable: "--font-news-masthead", display: "swap" })
const newsHeadline = localFont({ src: "../public/fonts/news/ArchivoBlack-Regular.ttf", variable: "--font-news-headline", display: "swap" })

export const metadata: Metadata = {
  title: "Laila El Attar — Portfolio",
  description: "Connecting user research, data, and hands-on building to create useful products. Explore Laila El Attar’s work in software, customer experience, and AI operations.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${cormorant.variable} ${newsMasthead.variable} ${newsHeadline.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
