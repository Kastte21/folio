import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const COLORS = ['#22d3ee', '#a78bfa', '#f472b6', '#34d399', '#f59e0b']

export const HoldConfetti = () => {
  const pressing = useRef(false)
  const rafId = useRef<number | null>(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const inHero = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false
      return Boolean(target.closest('#inicio'))
    }

    const spawn = () => {
      if (!pressing.current) return

      for (let i = 0; i < 5; i++) {
        const dot = document.createElement('div')
        dot.style.position = 'fixed'
        dot.style.left = `${mouse.current.x}px`
        dot.style.top = `${mouse.current.y}px`
        dot.style.width = '7px'
        dot.style.height = '7px'
        dot.style.borderRadius = '9999px'
        dot.style.pointerEvents = 'none'
        dot.style.zIndex = '9999'
        dot.style.background = COLORS[(Math.random() * COLORS.length) | 0]
        document.body.appendChild(dot)

        gsap.to(dot, {
          x: gsap.utils.random(-70, 70),
          y: gsap.utils.random(-70, 70),
          opacity: 0,
          scale: gsap.utils.random(0.5, 1.5),
          duration: gsap.utils.random(0.4, 0.9),
          ease: 'power2.out',
          onComplete: () => dot.remove(),
        })
      }

      rafId.current = requestAnimationFrame(spawn)
    }

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    const onDown = (e: MouseEvent) => {
      if (!inHero(e.target)) return
      pressing.current = true
      if (!rafId.current) rafId.current = requestAnimationFrame(spawn)
    }

    const stop = () => {
      pressing.current = false
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
        rafId.current = null
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', stop)
    window.addEventListener('mouseleave', stop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', stop)
      window.removeEventListener('mouseleave', stop)
      stop()
    }
  }, [])

  return null
}

