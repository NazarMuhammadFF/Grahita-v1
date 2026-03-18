"use client"

import { ReactLenis, useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { ReactNode, useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

function LenisGSAPBridge() {
  const lenisInstance = useRef<any>(null)

  // useLenis callback fires every Lenis scroll frame — capture the instance
  useLenis((lenis) => {
    lenisInstance.current = lenis
  })

  useEffect(() => {
    gsap.ticker.lagSmoothing(0)

    // Drive Lenis from GSAP's ticker so both update in the exact same frame
    const tickerCallback = (time: number) => {
      lenisInstance.current?.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 300)

    return () => {
      gsap.ticker.remove(tickerCallback)
      clearTimeout(timeout)
    }
  }, [])

  return null
}

export default function SmoothScroller({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
        infinite: false,
        autoRaf: false,
      }}
    >
      <LenisGSAPBridge />
      {children}
    </ReactLenis>
  )
}
