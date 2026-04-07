'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { SectionHeading } from '@/components/section-heading'

type PageHeroProps = {
  eyebrow: string
  title: string
  description: string
  imageSrc?: string
  imageAlt?: string
}

export function PageHero({ eyebrow, title, description, imageSrc, imageAlt }: PageHeroProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground md:py-24">
      {imageSrc ? (
        <>
          <motion.div
            animate={reduceMotion ? undefined : { scale: 1.08 }}
            transition={{ duration: 8, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={imageSrc}
              alt={imageAlt ?? title}
              fill
              priority
              className="hero-slide opacity-100 object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,31,59,0.88),rgba(11,31,59,0.68))]" />
        </>
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,111,235,0.18),transparent_35%)]" />
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 30 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="container hero-content relative z-10 mx-auto px-4 sm:px-6 lg:px-8"
      >
        <SectionHeading eyebrow={eyebrow} title={title} description={description} light />
      </motion.div>
    </section>
  )
}
