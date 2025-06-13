"use client"

import { useEffect, useRef } from "react"

interface AnimatedGradientProps {
  className?: string
}

export default function AnimatedGradient({ className = "" }: AnimatedGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === canvas) {
          width = canvas.width = entry.contentRect.width
          height = canvas.height = entry.contentRect.height
        }
      }
    })

    resizeObserver.observe(canvas)

    // Create gradient points
    const points = [
      { x: width * 0.1, y: height * 0.2, vx: 0.3, vy: 0.2, radius: width * 0.15 },
      { x: width * 0.8, y: height * 0.5, vx: -0.2, vy: 0.1, radius: width * 0.2 },
      { x: width * 0.5, y: height * 0.8, vx: 0.1, vy: -0.3, radius: width * 0.25 },
    ]

    // Animation loop
    const animate = () => {
      // Clear canvas with a slight fade effect for trails
      ctx.fillStyle = "rgba(0, 0, 0, 0.03)"
      ctx.fillRect(0, 0, width, height)

      // Update and draw gradient points
      for (const point of points) {
        // Move points
        point.x += point.vx
        point.y += point.vy

        // Bounce off edges
        if (point.x < 0 || point.x > width) point.vx *= -1
        if (point.y < 0 || point.y > height) point.vy *= -1

        // Create gradient
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius)

        // Use the primary color (#62ba9b) with varying opacity
        gradient.addColorStop(0, "rgba(98, 186, 155, 0.15)")
        gradient.addColorStop(1, "rgba(98, 186, 155, 0)")

        // Draw gradient
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    let animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      resizeObserver.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className={`absolute inset-0 -z-10 ${className}`} />
}
