"use client"

import { ReactLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { ReactNode } from 'react'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

export default function SmoothScroller({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  )
}
