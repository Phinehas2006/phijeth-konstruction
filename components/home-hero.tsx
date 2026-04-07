'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { companyInfo, siteImages } from '@/lib/data'

export function HomeHero() {
  const slides = siteImages.heroSlides ?? [siteImages.hero]
  const [activeSlide, setActiveSlide] = useState(0)
  const [rippleKey, setRippleKey] = useState(0)
  const reduceMotion = useReducedMotion()
  const headlineWords = useMemo(
    () => 'Building reliable civil engineering solutions for modern infrastructure.'.split(' '),
    [],
  )

  useEffect(() => {
    if (slides.length <= 1 || reduceMotion) {
      return
    }

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [reduceMotion, slides.length])

  return (
    <section className="relative overflow-hidden text-white">
      <AnimatePresence mode="sync">
        {slides.map((slide, index) => (
          <motion.div
            key={slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === activeSlide ? 1 : 0 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <motion.div
              animate={reduceMotion ? undefined : { scale: index === activeSlide ? 1.1 : 1.04 }}
              transition={{ duration: 5.8, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <Image
                src={slide}
                alt="Construction site background"
                fill
                priority={index === 0}
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,31,59,0.84),rgba(11,31,59,0.52))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,122,0,0.18),transparent_28%),radial-gradient(circle_at_78%_26%,rgba(31,111,235,0.24),transparent_32%)]" />
      <div className="container relative z-10 mx-auto px-4 py-20 sm:px-6 md:py-28 lg:px-8 lg:py-40">
        <motion.div
          initial={reduceMotion ? undefined : 'hidden'}
          animate={reduceMotion ? undefined : 'visible'}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
              },
            },
          }}
          className="hero-content max-w-3xl"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-accent sm:text-sm"
          >
            Civil Engineering and Construction
          </motion.p>
          <h1 className="mt-5 max-w-4xl font-heading text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            {headlineWords.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                variants={{
                  hidden: { opacity: 0, y: 34, filter: 'blur(10px)' },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="mr-[0.32em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
            className="mt-6 max-w-2xl text-base leading-7 text-white/[0.82] sm:text-lg sm:leading-8"
          >
            {companyInfo.fullName} delivers building construction, road construction, structural design, and project management with professionalism, safety, and technical discipline.
          </motion.p>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
              href="/contact"
              onClick={() => setRippleKey((current) => current + 1)}
              className="relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-all duration-500 hover:bg-[#E66E00] hover:shadow-[0_0_32px_rgba(255,122,0,0.45)] sm:w-auto"
              >
                <AnimatePresence>
                  <motion.span
                    key={rippleKey}
                    initial={{ scale: 0, opacity: 0.35 }}
                    animate={{ scale: 3.4, opacity: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-white/45"
                  />
                </AnimatePresence>
                <motion.span
                  animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.4 }}
                  className="relative z-10"
                >
                  Request a Quote
                </motion.span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
              href="/projects"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-500 hover:bg-white/10 hover:shadow-[0_18px_36px_rgba(11,31,59,0.28)] sm:w-auto"
              >
                View Projects
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-8 sm:gap-3">
        {slides.map((slide, index) => (
          <motion.span
            key={slide}
            className={`h-1.5 rounded-full transition-all duration-700 ${
              index === activeSlide ? 'w-10 bg-accent sm:w-12' : 'w-3 bg-white/40 sm:w-4'
            }`}
            animate={{ opacity: index === activeSlide ? 1 : 0.55 }}
          />
        ))}
      </div>
    </section>
  )
}
