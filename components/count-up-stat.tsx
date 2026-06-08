'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

type CountUpStatProps = {
  value: string
  label: string
}

export function CountUpStat({ value, label }: CountUpStatProps) {
  const [displayValue, setDisplayValue] = useState('0')
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!isInView) return

    // Extract numeric part and suffix (e.g., "25+" -> { num: 25, suffix: "+" })
    const match = value.match(/^(\d+)(.*)$/)
    if (!match) {
      setDisplayValue(value)
      return
    }

    const finalNumber = parseInt(match[1], 10)
    const suffix = match[2] || ''

    if (reduceMotion) {
      setDisplayValue(`${finalNumber}${suffix}`)
      return
    }

    let currentValue = 0
    const increment = Math.ceil(finalNumber / 50) // Animate over ~50 steps
    const interval = 30 // ms per step

    const timer = setInterval(() => {
      currentValue += increment
      if (currentValue >= finalNumber) {
        setDisplayValue(`${finalNumber}${suffix}`)
        clearInterval(timer)
      } else {
        setDisplayValue(`${currentValue}${suffix}`)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isInView, reduceMotion, value])

  return (
    <p ref={ref} className="font-heading text-4xl font-bold text-white">{displayValue}</p>
  )
}
