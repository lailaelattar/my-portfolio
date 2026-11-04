"use client"

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react"
import Image from "next/image"
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
const smooth = (value: number) => value * value * value * (value * (value * 6 - 15) + 10)

export default function ReaderIntro() {
  const ready = useSyncExternalStore(subscribeReady, readySnapshot, serverSnapshot)
  const reduced = useSyncExternalStore(subscribeMotion, motionSnapshot, serverSnapshot)
  const [entered, setEntered] = useState(false)
  const journey = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const enteredRef = useRef(false)

  const returnToReader = useCallback(() => {
    window.scrollTo({ top: journey.current?.offsetTop ?? 0, behavior: reduced ? "instant" : "smooth" })
    requestAnimationFrame(() => journey.current?.focus({ preventScroll: true }))
  }, [reduced])

  useEffect(() => {
    if (!ready || !journey.current) return
    let frame = 0
    let visualProgress: number | undefined
    let lastFrame = performance.now()
    let immediate = false
    const host = journey.current
    const update = (now: number) => {
      frame = 0
      const width = window.innerWidth
      const height = window.innerHeight
      const range = Math.max(host.offsetHeight - height, 0)
      const target = reduced || range === 0 ? 1 : clamp((window.scrollY - host.offsetTop) / range)
      const elapsed = Math.min(Math.max(now - lastFrame, 1), 64)
      lastFrame = now
      if (visualProgress === undefined || reduced || immediate) visualProgress = target
      else visualProgress += (target - visualProgress) * (1 - Math.exp(-elapsed / 85))
      immediate = false
      if (Math.abs(target - visualProgress) < .0004) visualProgress = target
      const progress = visualProgress
      const eased = smooth(progress)
      const stageWidth = stage.current?.offsetWidth ?? width * .18
      const stageHeight = stage.current?.offsetHeight ?? stageWidth * 1145 / 1374
      // Aim at the front page in the approved comic illustration.
      const focusX = width / 2 + stageWidth * .06
      const focusY = height / 2 - stageHeight * .205
      const finalZoom = Math.max(width / (stageWidth * .23), height / (stageHeight * .3)) * 1.1
      const blend = smooth(clamp((progress - .67) / .31))
      host.style.setProperty("--reader-zoom", String(Math.pow(finalZoom, eased)))
      host.style.setProperty("--reader-focus-x", `${focusX}px`)
      host.style.setProperty("--reader-focus-y", `${focusY}px`)
      host.style.setProperty("--reader-x", `${(width / 2 - focusX) * eased}px`)
      host.style.setProperty("--reader-y", `${(height / 2 - focusY) * eased}px`)
      host.style.setProperty("--reader-angle", `${9 * eased}deg`)
      host.style.setProperty("--reader-art-opacity", String(1 - blend))
      host.style.setProperty("--reader-page-opacity", String(blend))
      host.style.setProperty("--reader-page-scale", String(1 + .025 * (1 - blend)))
      host.style.setProperty("--reader-page-turn-opacity", String(1 - smooth(clamp(progress / .12))))
      host.dataset.moving = String(progress > .01)
      host.dataset.progress = progress.toFixed(3)
      const nextEntered = progress >= .995
      if (nextEntered !== enteredRef.current) {
        enteredRef.current = nextEntered
        setEntered(nextEntered)
      }
      if (visualProgress !== target) frame = requestAnimationFrame(update)
    }
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update) }
    const validDeepLink = sections.some(section => window.location.hash === `#${section.id}`)
    if (reduced || validDeepLink || new URLSearchParams(window.location.search).get("intro") === "skip") {
      immediate = true
      window.scrollTo({ top: host.offsetTop + host.offsetHeight - window.innerHeight, behavior: "instant" })
    }
    requestUpdate()
    const onHashChange = () => {
      if (!enteredRef.current && sections.some(section => window.location.hash === `#${section.id}`)) {
        immediate = true
        window.scrollTo({ top: host.offsetTop + host.offsetHeight - window.innerHeight, behavior: "instant" })
        requestUpdate()
      }
    }
    window.addEventListener("hashchange", onHashChange)
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate, { passive: true })
    // At a column's top, an upward wheel gesture returns to the scroll scene.
    const onWheel = (event: WheelEvent) => {
      if (reduced || !enteredRef.current || event.deltaY >= 0 || Math.abs(event.deltaY) <= Math.abs(event.deltaX) || event.ctrlKey || !event.cancelable) return
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
    <div className="reader-journey" ref={journey} tabIndex={-1} data-entered={entered || reduced}>
      <div className="reader-pin">
        <div className="reader-visual" aria-hidden="true">
          <div className="reader-camera">
            <div className="reader-stage" ref={stage}>
              <div className="reader-cast-shadow" />
              <Image src="/illustrations/newspaper-reader-cartoon.png" alt="" width={1374} height={1145} priority sizes="(max-width: 760px) 90vw, 760px" quality={85} />
              <div className="reader-breath"><Image src="/illustrations/newspaper-reader-cartoon.png" alt="" width={1374} height={1145} sizes="(max-width: 760px) 90vw, 760px" quality={85} /></div>
              <div className="reader-pages">
                <div className="reader-paper-turn">
                  <svg viewBox="0 0 1374 1145" fill="none">
                    <path d="M665 254L896 145L860 472L653 525Z" fill="#e9ddc8" stroke="#463c30" strokeWidth="2" />
                    <path d="M695 262L872 183M690 280L868 201M686 297L865 220" stroke="#786b5c" strokeWidth="5" />
                    <path d="M682 315L860 240L854 265L680 339Z" fill="#8e7e6a" />
                    <path d="M679 350L754 317L743 411L675 439Z" fill="#c1b39d" />
                    <path d="M768 311L850 276M767 330L848 296M765 350L846 316M763 370L844 337M761 390L842 357M674 454L838 384M672 473L836 406M670 492L834 427" stroke="#a99a84" strokeWidth="4" />
                    <path d="M660 266L653 518" stroke="#c7b89f" strokeWidth="6" />
                  </svg>
                </div>
              </div>
              <div className="reader-grip"><Image src="/illustrations/newspaper-reader-cartoon.png" alt="" width={1374} height={1145} sizes="(max-width: 760px) 90vw, 760px" quality={85} /></div>
            </div>
          </div>
        </div>
        <h1 className="sr-only" aria-hidden={entered || reduced}>Laila El Attar — scroll down to enter the portfolio</h1>
        <div className="reader-portfolio" inert={introActive} aria-hidden={introActive}>
          <NewsPortfolio onReturnToIntro={reduced ? undefined : returnToReader} />
        </div>
      </div>
      <noscript><style>{`.reader-journey{height:auto}.reader-pin{position:relative;height:auto;overflow:visible}.reader-visual,.news-return-intro{display:none}.reader-portfolio{position:relative;opacity:1;transform:none;pointer-events:auto}`}</style></noscript>
    </div>
  )
}
