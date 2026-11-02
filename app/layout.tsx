import type { Metadata } from "next"
import { Cormorant_Garamond, Jost } from "next/font/google"
import "./globals.css"
import CustomCursor from "@/components/Customcursor"
import CloudBackground from "@/components/CloudBackground"

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
})

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: "Laila El Attar — Portfolio",
  description: "AI Operations Specialist at Opendoor. I build reliable AI workflows, Python and Snowflake detection systems, and data-driven products.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${cormorant.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#080818] text-zinc-50">
        <CloudBackground />
        {children}
        <CustomCursor />
      </body>
    </html>
  )
}
