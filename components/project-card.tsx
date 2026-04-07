'use client'

import Image from 'next/image'
import { ArrowRight, MapPin } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

type ProjectCardProps = {
  project: {
    id?: number
    title: string
    category: string
    location: string
    year: string
    description: string
    result: string
    palette: string
    image?: string
  }
  onView?: () => void
  compact?: boolean
}

const paletteClasses: Record<string, string> = {
  blue: 'from-primary to-[#163D76]',
  orange: 'from-accent to-[#E76700]',
  slate: 'from-[#31435D] to-[#4A6285]',
  steel: 'from-[#475569] to-[#1F6FEB]',
}

export function ProjectCard({ project, onView, compact = false }: ProjectCardProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      layout
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -10,
              rotateX: 3,
              rotateY: -3,
              boxShadow: '0 28px 60px rgba(11,31,59,0.16)',
            }
      }
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: 'preserve-3d' }}
      className="group overflow-hidden rounded-[1.75rem] border border-[#d8e6fb] bg-[linear-gradient(180deg,#eef5ff_0%,#e4eefc_100%)] shadow-[0_14px_40px_rgba(11,31,59,0.08)]"
    >
      <div className={`h-56 bg-gradient-to-br ${paletteClasses[project.palette] ?? paletteClasses.blue} p-6 text-white`}>
        <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1.25rem] border border-white/[0.15] bg-black/10 p-5">
          {project.image && (
            <>
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.08 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image src={project.image} alt={project.title} fill className="object-cover" />
              </motion.div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,31,59,0.30),rgba(11,31,59,0.58))]" />
            </>
          )}
          <div className="relative z-10 flex items-center justify-between gap-4">
            <span className="rounded-full border border-white/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
              {project.category}
            </span>
            <span className="text-sm text-white/80">{project.year}</span>
          </div>
          <div className="relative z-10">
            <p className="text-sm text-white/75">Completed work</p>
            <h3 className="mt-2 font-heading text-2xl font-bold">{project.title}</h3>
          </div>
        </div>
      </div>
      <div className="bg-transparent p-6 md:p-7">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#EDF4FF] px-3 py-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-secondary" />
          {project.location}
        </div>
        <div className="mt-4 rounded-[1.25rem] bg-white/85 p-4 shadow-[inset_0_0_0_1px_rgba(31,111,235,0.08)]">
          <p className="text-sm leading-7 text-muted-foreground">{project.description}</p>
        </div>
        <div className={`mt-5 rounded-[1.25rem] bg-[#FFF4E8] p-4 ${compact ? '' : ''}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Outcome</p>
          <p className="mt-2 text-sm leading-7 text-foreground">{project.result}</p>
        </div>
        <motion.button
          type="button"
          whileHover={reduceMotion ? undefined : { x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={onView}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-accent"
        >
          View project details
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.article>
  )
}
