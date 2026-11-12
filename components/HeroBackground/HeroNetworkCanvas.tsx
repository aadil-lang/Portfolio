'use client'

import React, { useEffect, useRef, useState } from 'react'

interface NodePoint {
  x: number
  y: number
  baseX: number
  baseY: number
  radius: number
  vx: number
  vy: number
  depth: number
  alpha: number
  pulseSpeed: number
  pulseOffset: number
}

interface SignalPacket {
  startNode: number
  endNode: number
  progress: number
  speed: number
  color: string
}

export function HeroNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(motionQuery.matches)

    const onMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    motionQuery.addEventListener('change', onMotionChange)
    return () => motionQuery.removeEventListener('change', onMotionChange)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth)
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650)

    let mouseX = width / 2
    let mouseY = height / 2
    let targetParallaxX = 0
    let targetParallaxY = 0
    let currentParallaxX = 0
    let currentParallaxY = 0

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    // Generate balanced network nodes (35 points across the hero field)
    const nodeCount = width < 768 ? 18 : 36
    const nodes: NodePoint[] = []

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      nodes.push({
        x,
        y,
        baseX: x,
        baseY: y,
        radius: Math.random() * 1.5 + 1.2,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        depth: Math.random() * 0.6 + 0.4,
        alpha: Math.random() * 0.45 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2
      })
    }

    // Pre-calculate nearest connections
    const connections: [number, number][] = []
    const maxDistance = width < 768 ? 120 : 160

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].baseX - nodes[j].baseX
        const dy = nodes[i].baseY - nodes[j].baseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < maxDistance) {
          connections.push([i, j])
        }
      }
    }

    // Active digital signal packets traveling across network lines
    const signals: SignalPacket[] = []
    const maxSignals = width < 768 ? 3 : 7

    for (let i = 0; i < maxSignals; i++) {
      if (connections.length > 0) {
        const connIndex = Math.floor(Math.random() * connections.length)
        signals.push({
          startNode: connections[connIndex][0],
          endNode: connections[connIndex][1],
          progress: Math.random(),
          speed: Math.random() * 0.007 + 0.004,
          color: Math.random() > 0.4 ? '#5A9A78' : '#78C29A'
        })
      }
    }

    const onPointerMove = (e: MouseEvent) => {
      if (isTouch) return
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      targetParallaxX = ((mouseX - width / 2) / (width / 2)) * 14
      targetParallaxY = ((mouseY - height / 2) / (height / 2)) * 14
    }

    const onResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
      height = canvas.height = canvas.parentElement?.clientHeight || 650
    }

    window.addEventListener('resize', onResize)
    if (!isTouch) {
      window.addEventListener('mousemove', onPointerMove, { passive: true })
    }

    let time = 0

    const render = () => {
      time++
      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.05
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.05

      ctx.clearRect(0, 0, width, height)

      // 1. Draw connecting network lines
      for (const [i, j] of connections) {
        const n1 = nodes[i]
        const n2 = nodes[j]

        const p1x = n1.x + currentParallaxX * n1.depth
        const p1y = n1.y + currentParallaxY * n1.depth
        const p2x = n2.x + currentParallaxX * n2.depth
        const p2y = n2.y + currentParallaxY * n2.depth

        const dx = p1x - p2x
        const dy = p1y - p2y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.18
          ctx.beginPath()
          ctx.moveTo(p1x, p1y)
          ctx.lineTo(p2x, p2y)
          ctx.strokeStyle = `rgba(90, 154, 120, ${alpha})`
          ctx.lineWidth = 0.85
          ctx.stroke()
        }
      }

      // 2. Draw & update signal packets
      for (const sig of signals) {
        sig.progress += sig.speed
        if (sig.progress >= 1) {
          sig.progress = 0
          if (connections.length > 0) {
            const connIndex = Math.floor(Math.random() * connections.length)
            sig.startNode = connections[connIndex][0]
            sig.endNode = connections[connIndex][1]
          }
        }

        const n1 = nodes[sig.startNode]
        const n2 = nodes[sig.endNode]
        if (!n1 || !n2) continue

        const p1x = n1.x + currentParallaxX * n1.depth
        const p1y = n1.y + currentParallaxY * n1.depth
        const p2x = n2.x + currentParallaxX * n2.depth
        const p2y = n2.y + currentParallaxY * n2.depth

        const sx = p1x + (p2x - p1x) * sig.progress
        const sy = p1y + (p2y - p1y) * sig.progress

        // Packet head glow
        ctx.beginPath()
        ctx.arc(sx, sy, 2.2, 0, Math.PI * 2)
        ctx.fillStyle = sig.color
        ctx.shadowColor = sig.color
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // 3. Draw nodes
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy

        // Gentle bounds bounce
        if (node.x < 10 || node.x > width - 10) node.vx *= -1
        if (node.y < 10 || node.y > height - 10) node.vy *= -1

        const px = node.x + currentParallaxX * node.depth
        const py = node.y + currentParallaxY * node.depth

        const pulse = Math.sin(time * node.pulseSpeed + node.pulseOffset) * 0.25 + 0.75
        const finalAlpha = node.alpha * pulse

        ctx.beginPath()
        ctx.arc(px, py, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(120, 194, 154, ${finalAlpha})`
        ctx.fill()

        // Subtle core point
        ctx.beginPath()
        ctx.arc(px, py, node.radius * 0.4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
        ctx.fill()
      }

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', onResize)
      if (!isTouch) {
        window.removeEventListener('mousemove', onPointerMove)
      }
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none w-full h-full z-0 opacity-75"
    />
  )
}

