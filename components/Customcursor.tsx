"use client"

import { useEffect, useRef } from "react"

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const trail2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = 0, my = 0
    let r1x = 0, r1y = 0
    let r2x = 0, r2y = 0
    let raf: number
    let isHovering = false

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`
        dotRef.current.style.top = `${my}px`
      }
    }

    const tick = () => {
      r1x += (mx - r1x) * 0.14; r1y += (my - r1y) * 0.14
      r2x += (r1x - r2x) * 0.1; r2y += (r1y - r2y) * 0.1
      if (trailRef.current) { trailRef.current.style.left = `${r1x}px`; trailRef.current.style.top = `${r1y}px` }
      if (trail2Ref.current) { trail2Ref.current.style.left = `${r2x}px`; trail2Ref.current.style.top = `${r2y}px` }
      raf = requestAnimationFrame(tick)
    }

    const onEnter = () => {
      isHovering = true
      if (dotRef.current) {
        dotRef.current.style.width = "44px"; dotRef.current.style.height = "44px"
        dotRef.current.style.background = "rgba(200, 200, 160, 0.18)"
        dotRef.current.style.border = "1.5px solid rgba(220, 210, 160, 0.5)"
      }
    }
    const onLeave = () => {
      isHovering = false
      if (dotRef.current) {
        dotRef.current.style.width = "10px"; dotRef.current.style.height = "10px"
        dotRef.current.style.background = "rgba(220, 210, 165, 0.95)"
        dotRef.current.style.border = "none"
      }
    }

    window.addEventListener("mousemove", onMove)
    raf = requestAnimationFrame(tick)

    const attach = () => {
      document.querySelectorAll("a, button, [role='button'], input, label").forEach(el => {
        el.addEventListener("mouseenter", onEnter)
        el.addEventListener("mouseleave", onLeave)
      })
    }
    attach()
    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  const base: React.CSSProperties = { position: "fixed", borderRadius: "50%", pointerEvents: "none", transform: "translate(-50%, -50%)" }

  return (
    <>
      {/* Dot — moon-like */}
      <div ref={dotRef} style={{
        ...base, zIndex: 99999, width: 10, height: 10,
        background: "rgba(220, 210, 165, 0.95)",
        boxShadow: "0 0 6px 2px rgba(220, 210, 140, 0.6)",
        transition: "width 0.22s ease, height 0.22s ease, background 0.22s ease",
      }} />
      {/* Close trail */}
      <div ref={trailRef} style={{
        ...base, zIndex: 99997, width: 22, height: 22,
        background: "rgba(200, 190, 155, 0.12)",
        border: "1px solid rgba(210, 200, 155, 0.25)",
      }} />
      {/* Far trail */}
      <div ref={trail2Ref} style={{
        ...base, zIndex: 99996, width: 38, height: 38,
        background: "rgba(180, 170, 140, 0.05)",
        border: "1px solid rgba(190, 180, 145, 0.12)",
      }} />
    </>
  )
}