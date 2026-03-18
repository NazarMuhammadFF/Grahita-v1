"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.4, ease: 'power3' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.4, ease: 'power3' })

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const onHover = () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.3, ease: 'power3' })
    }
    const onLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power3' })
    }

    window.addEventListener('mousemove', moveCursor)

    const interactables = document.querySelectorAll('a, button, .interactable')
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', onHover)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', onHover)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 border-2 border-[#84A59D] rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
    />
  )
}
