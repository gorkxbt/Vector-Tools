'use client'

import { useEffect, useRef } from 'react'

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      baseSize: number
      speedX: number
      speedY: number
      color: string
      alpha: number
      pulse: number
      pulseSpeed: number
      glowIntensity: number

      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth)
        this.y = Math.random() * (canvas?.height || window.innerHeight)
        this.baseSize = Math.random() * 4 + 0.5
        this.size = this.baseSize
        this.speedX = Math.random() * 1.2 - 0.6
        this.speedY = Math.random() * 1.2 - 0.6
        this.alpha = Math.random() * 0.5 + 0.2
        this.color = `rgba(255, 32, 32, ${this.alpha})`
        this.pulse = Math.random() * Math.PI * 2 // Random starting phase
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        this.glowIntensity = Math.random() * 0.5 + 0.5
      }

      update(mouseX?: number, mouseY?: number) {
        this.x += this.speedX
        this.y += this.speedY

        // Pulse effect for size and opacity
        this.pulse += this.pulseSpeed
        this.alpha = 0.2 + Math.sin(this.pulse) * 0.3
        this.size = this.baseSize + Math.sin(this.pulse) * 0.5
        this.color = `rgba(255, 32, 32, ${this.alpha})`

        // Boundary check
        if (this.x > (canvas?.width || 0)) this.x = 0
        if (this.x < 0) this.x = (canvas?.width || 0)
        if (this.y > (canvas?.height || 0)) this.y = 0
        if (this.y < 0) this.y = (canvas?.height || 0)

        // Interactive behavior with mouse
        if (mouseX !== undefined && mouseY !== undefined) {
          const dx = this.x - mouseX
          const dy = this.y - mouseY
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          // Repel particles from mouse
          if (distance < 100) {
            const force = (100 - distance) / 100
            this.speedX += dx * force * 0.02
            this.speedY += dy * force * 0.02
            
            // Add some friction so particles don't accelerate too much
            this.speedX *= 0.95
            this.speedY *= 0.95
          }
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        
        // Create glowing particles with variable intensity
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0, 
          this.x, this.y, this.size * 2.5
        )
        
        const innerAlpha = Math.min(1, this.alpha * 2)
        gradient.addColorStop(0, `rgba(255, 32, 32, ${innerAlpha})`)
        gradient.addColorStop(0.4, `rgba(255, 32, 32, ${this.alpha * this.glowIntensity})`)
        gradient.addColorStop(1, 'rgba(255, 32, 32, 0)')
        
        ctx.fillStyle = gradient
        ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particleCount = Math.min(150, Math.floor(window.innerWidth / 12))
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Mouse interaction
    let mouseX: number | undefined
    let mouseY: number | undefined

    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    })

    canvas.addEventListener('mouseleave', () => {
      mouseX = undefined
      mouseY = undefined
    })

    // Connection between particles
    const connectParticles = () => {
      const maxDistance = 160
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.5
            if (!ctx) return
            
            // Create gradient line based on particle colors
            const gradient = ctx.createLinearGradient(
              particles[i].x, 
              particles[i].y, 
              particles[j].x, 
              particles[j].y
            )
            
            gradient.addColorStop(0, `rgba(255, 32, 32, ${opacity * particles[i].alpha})`)
            gradient.addColorStop(1, `rgba(255, 32, 32, ${opacity * particles[j].alpha})`)
            
            ctx.strokeStyle = gradient
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return
      
      // Clear canvas with slight fade effect for trails
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(mouseX, mouseY)
        particles[i].draw()
      }

      connectParticles()
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', () => {})
      canvas.removeEventListener('mouseleave', () => {})
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -10,
        opacity: 0.6,
        pointerEvents: 'none'
      }}
    />
  )
}

export default ParticleBackground 