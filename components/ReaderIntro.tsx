"use client"

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react"
import Image from "next/image"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import NewsPortfolio from "./NewsPortfolio"
import { sections } from "./news-data"

const subscribeReady = () => () => {}
const readySnapshot = () => true
const serverSnapshot = () => false
const motionSnapshot = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
const subscribeMotion = (listener: () => void) => {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)")
  media.addEventListener("change", listener)
  return () => media.removeEventListener("change", listener)
}
const clamp = (value: number) => Math.min(Math.max(value, 0), 1)
const smooth = (value: number) => value * value * (3 - 2 * value)

export default function ReaderIntro() {
  const ready = useSyncExternalStore(subscribeReady, readySnapshot, serverSnapshot)
  const reduced = useSyncExternalStore(subscribeMotion, motionSnapshot, serverSnapshot)
  const [entered, setEntered] = useState(false)
  const journey = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const portfolio = useRef<HTMLDivElement>(null)
  const enteredRef = useRef(false)

  const skip = useCallback(() => {
    if (!journey.current) return
    window.scrollTo({ top: journey.current.offsetTop + journey.current.offsetHeight - window.innerHeight, behavior: "instant" })
    requestAnimationFrame(() => requestAnimationFrame(() => portfolio.current?.querySelector<HTMLAnchorElement>(".news-name")?.focus({ preventScroll: true })))
  }, [])
  const returnToReader = useCallback(() => {
    window.scrollTo({ top: journey.current?.offsetTop ?? 0, behavior: reduced ? "instant" : "smooth" })
    requestAnimationFrame(() => journey.current?.querySelector<HTMLButtonElement>(".reader-skip")?.focus({ preventScroll: true }))
  }, [reduced])

  useEffect(() => {
    if (!ready || !journey.current) return
    let frame = 0
    const host = journey.current
    const update = () => {
      frame = 0
      const width = window.innerWidth
      const height = window.innerHeight
      const range = Math.max(host.offsetHeight - height, 0)
      const progress = reduced || range === 0 ? 1 : clamp((window.scrollY - host.offsetTop) / range)
      const eased = smooth(progress)
      const stageWidth = stage.current?.offsetWidth ?? width * .43
      const stageHeight = stage.current?.offsetHeight ?? stageWidth * 1145 / 1374
      // Aim at the front page in the approved comic illustration.
      const focusX = width / 2 + stageWidth * .06
      const focusY = height / 2 - stageHeight * .205
      const finalZoom = Math.max(width / (stageWidth * .23), height / (stageHeight * .3)) * 1.1
      const blend = smooth(clamp((progress - .72) / .24))
      host.style.setProperty("--reader-zoom", String(Math.pow(finalZoom, eased)))
      host.style.setProperty("--reader-focus-x", `${focusX}px`)
      host.style.setProperty("--reader-focus-y", `${focusY}px`)
      host.style.setProperty("--reader-x", `${(width / 2 - focusX) * eased}px`)
      host.style.setProperty("--reader-y", `${(height / 2 - focusY) * eased}px`)
      host.style.setProperty("--reader-angle", `${12 * eased}deg`)
      host.style.setProperty("--reader-art-opacity", String(1 - blend))
      host.style.setProperty("--reader-page-opacity", String(blend))
      host.style.setProperty("--reader-page-scale", String(1 + .06 * (1 - blend)))
      host.style.setProperty("--reader-hint-opacity", String(1 - smooth(clamp(progress / .2))))
      host.dataset.moving = String(progress > .01)
      host.dataset.progress = progress.toFixed(3)
      const nextEntered = progress >= .995
      if (nextEntered !== enteredRef.current) {
        enteredRef.current = nextEntered
        setEntered(nextEntered)
      }
    }
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update) }
    const validDeepLink = sections.some(section => window.location.hash === `#${section.id}`)
    if (reduced || validDeepLink || new URLSearchParams(window.location.search).get("intro") === "skip") {
      window.scrollTo({ top: host.offsetTop + host.offsetHeight - window.innerHeight, behavior: "instant" })
    }
    requestUpdate()
    const onHashChange = () => {
      if (!enteredRef.current && sections.some(section => window.location.hash === `#${section.id}`)) {
        window.scrollTo({ top: host.offsetTop + host.offsetHeight - window.innerHeight, behavior: "instant" })
        requestUpdate()
      }
    }
    window.addEventListener("hashchange", onHashChange)
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate, { passive: true })
    // At a column's top, an upward wheel gesture returns to the scroll scene.
    const onWheel = (event: WheelEvent) => {
      if (reduced || !enteredRef.current || event.deltaY >= 0 || event.ctrlKey || !event.cancelable) return
      const target = event.target instanceof Element ? event.target : null
      const column = target?.closest<HTMLElement>(window.matchMedia("(max-width: 760px)").matches ? ".news-workspace" : ".news-article, .news-story-list, .news-topics")
      if (column && column.scrollTop <= 1) {
        event.preventDefault()
        const distance = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1)
        window.scrollBy({ top: distance, behavior: "instant" })
      }
    }
    window.addEventListener("wheel", onWheel, { passive: false })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("hashchange", onHashChange)
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
      window.removeEventListener("wheel", onWheel)
    }
  }, [ready, reduced])

  const introActive = ready && !entered && !reduced
  return (
    <div className="reader-journey" ref={journey} data-entered={entered || reduced}>
      <div className="reader-pin">
        <div className="reader-visual" aria-hidden="true">
          <div className="reader-camera">
            <div className="reader-stage" ref={stage}>
              <Image src="/illustrations/newspaper-reader.png" alt="" width={1374} height={1145} priority sizes="(max-width: 760px) 90vw, 760px" quality={85} />
              <div className="reader-breath"><Image src="/illustrations/newspaper-reader.png" alt="" width={1374} height={1145} sizes="(max-width: 760px) 90vw, 760px" quality={85} /></div>
            </div>
          </div>
        </div>
        <div className="reader-intro-controls" inert={ready && (entered || reduced)} aria-hidden={entered || reduced}>
          <h1 className="reader-wordmark">Laila El Attar</h1>
          <button type="button" className="reader-skip" onClick={skip}>Skip intro <ArrowUpRight size={14} aria-hidden="true" /></button>
          <div className="reader-invitation"><p>Take a closer look.</p><span>Scroll to open the newspaper</span><ArrowDown size={18} aria-hidden="true" /></div>
        </div>
        <div className="reader-portfolio" ref={portfolio} inert={introActive} aria-hidden={introActive}>
          <NewsPortfolio onReturnToIntro={reduced ? undefined : returnToReader} />
        </div>
      </div>
      <noscript><style>{`.reader-journey{height:auto}.reader-pin{position:relative;height:auto;overflow:visible}.reader-visual,.reader-intro-controls,.news-return-intro{display:none}.reader-portfolio{position:relative;opacity:1;transform:none;pointer-events:auto}`}</style></noscript>
    </div>
  )
}
