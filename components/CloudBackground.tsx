"use client"

import { useEffect, useRef } from "react"

export default function CloudBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H

    interface Star { x: number; y: number; r: number; phase: number; speed: number }
    interface Cloud { x: number; y: number; scaleX: number; scaleY: number; speed: number; opacity: number; hue: number }
    interface Shoot { x: number; y: number; vx: number; vy: number; life: number; max: number }

    let stars: Star[] = []
    const mkStars = () => {
      stars = Array.from({ length: 220 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.3 + Math.random() * 1.6,
        phase: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.04,
      }))
    }
    mkStars()

    // Clouds: purplish/blue nebula wisps — high opacity so they show
    const clouds: Cloud[] = [
      { x: W * 0.15, y: H * 0.18, scaleX: 2.8, scaleY: 1.4, speed: 0.09, opacity: 0.28, hue: 245 },
      { x: W * 0.7,  y: H * 0.08, scaleX: 3.2, scaleY: 1.2, speed: 0.07, opacity: 0.22, hue: 260 },
      { x: W * 0.45, y: H * 0.35, scaleX: 2.4, scaleY: 1.0, speed: 0.11, opacity: 0.18, hue: 220 },
      { x: W * 0.85, y: H * 0.55, scaleX: 2.0, scaleY: 1.3, speed: 0.08, opacity: 0.20, hue: 250 },
      { x: W * 0.25, y: H * 0.65, scaleX: 2.6, scaleY: 1.1, speed: 0.10, opacity: 0.16, hue: 235 },
    ]

    let shoots: Shoot[] = []
    let nextShoot = 180 + Math.random() * 240

    const spawn = () => shoots.push({
      x: Math.random() * W * 0.8, y: Math.random() * H * 0.4,
      vx: 5 + Math.random() * 6, vy: 1 + Math.random() * 3,
      life: 0, max: 55,
    })

    const drawCloud = (c: Cloud, t: number) => {
      // Multiple overlapping ellipse blobs per cloud
      const blobs = [
        [0, 0, 110, 55],
        [-90, 20, 80, 40],
        [90, 15, 75, 38],
        [-45, -25, 65, 32],
        [45, -20, 60, 30],
        [-130, 25, 55, 28],
        [130, 22, 50, 26],
      ] as [number, number, number, number][]

      blobs.forEach(([dx, dy, rx, ry]) => {
        const bx = c.x + dx * c.scaleX
        const by = c.y + dy * c.scaleY
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, rx * c.scaleX)
        const hsl = `hsla(${c.hue}, 55%, 70%,`
        g.addColorStop(0,   `${hsl}${c.opacity})`)
        g.addColorStop(0.4, `${hsl}${c.opacity * 0.6})`)
        g.addColorStop(1,   `${hsl}0)`)
        ctx.fillStyle = g
        ctx.save()
        ctx.scale(1, ry / rx)
        ctx.beginPath()
        ctx.arc(bx, by * (rx / ry), rx * c.scaleX, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
    }

    // Nebula glow patches — large, very soft, always visible
    const drawNebula = () => {
      const patches = [
        { x: W * 0.2,  y: H * 0.25, r: 300, color: "rgba(80, 60, 140, 0.10)" },
        { x: W * 0.75, y: H * 0.15, r: 260, color: "rgba(60, 80, 160, 0.09)" },
        { x: W * 0.5,  y: H * 0.6,  r: 340, color: "rgba(100, 60, 130, 0.07)" },
        { x: W * 0.9,  y: H * 0.8,  r: 220, color: "rgba(70, 90, 150, 0.08)" },
      ]
      patches.forEach(({ x, y, r, color }) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r)
        g.addColorStop(0, color)
        g.addColorStop(1, "rgba(0,0,0,0)")
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    let t = 0
    let raf: number

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      t++

      // Nebula first (deepest)
      drawNebula()

      // Stars
      stars.forEach(s => {
        const a = 0.5 + 0.5 * Math.sin(t * s.speed + s.phase)
        ctx.fillStyle = `rgba(230, 228, 255, ${a * 0.9})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
        // Tiny cross sparkle on bigger stars
        if (s.r > 1.1 && a > 0.7) {
          ctx.strokeStyle = `rgba(230, 228, 255, ${a * 0.4})`
          ctx.lineWidth = 0.5
          ctx.beginPath(); ctx.moveTo(s.x - s.r * 2.5, s.y); ctx.lineTo(s.x + s.r * 2.5, s.y); ctx.stroke()
          ctx.beginPath(); ctx.moveTo(s.x, s.y - s.r * 2.5); ctx.lineTo(s.x, s.y + s.r * 2.5); ctx.stroke()
        }
      })

      // Shooting stars
      nextShoot--
      if (nextShoot <= 0) { spawn(); nextShoot = 200 + Math.random() * 300 }
      shoots = shoots.filter(s => s.life < s.max)
      shoots.forEach(s => {
        const a = (1 - s.life / s.max) * 0.9
        const g = ctx.createLinearGradient(s.x - s.vx * 12, s.y - s.vy * 12, s.x, s.y)
        g.addColorStop(0, "rgba(210,210,255,0)")
        g.addColorStop(1, `rgba(210,210,255,${a})`)
        ctx.strokeStyle = g; ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(s.x - s.vx * 12, s.y - s.vy * 12)
        ctx.lineTo(s.x, s.y)
        ctx.stroke()
        s.x += s.vx; s.y += s.vy; s.life++
      })

      // Drifting clouds (on top of stars for depth)
      clouds.forEach((c, i) => {
        c.x += c.speed
        if (c.x - 300 * c.scaleX > W) c.x = -300 * c.scaleX
        drawCloud(c, t)
      })

      raf = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W; canvas.height = H
      mkStars()
    }
    window.addEventListener("resize", onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: -1,  // always behind everything
      }}
    />
  )
}