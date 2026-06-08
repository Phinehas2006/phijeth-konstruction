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
  blue: 'from-[#0B4BA8] to-[#1F6FEB]',
  green: 'from-[#166534] to-[#22A05A]',
  orange: 'from-[#C75400] to-[#FF7A00]',
  red: 'from-[#991B1B] to-[#E03535]',
  gray: 'from-[#4B5563] to-[#9CA3AF]',
  black: 'from-[#050505] to-[#262626]',
  slate: 'from-[#31435D] to-[#4A6285]',
  steel: 'from-[#475569] to-[#1F6FEB]',
}

const paletteAccentClasses: Record<string, string> = {
  blue: 'bg-[#EAF2FF] text-[#0B4BA8]',
  green: 'bg-[#EAF8EF] text-[#166534]',
  orange: 'bg-[#FFF4E8] text-[#C75400]',
  red: 'bg-[#FFF0F0] text-[#991B1B]',
  gray: 'bg-[#F3F4F6] text-[#374151]',
  black: 'bg-[#EFEFEF] text-[#111111]',
  slate: 'bg-[#EEF2F7] text-[#31435D]',
  steel: 'bg-[#EDF4FF] text-[#1F6FEB]',
}

export function ProjectCard({ project, onView, compact = false }: ProjectCardProps) {
  const reduceMotion = useReducedMotion()
  const palette = project.palette || 'blue'
  const gradientClass = paletteClasses[palette] ?? paletteClasses.blue
  const accentClass = paletteAccentClasses[palette] ?? paletteAccentClasses.blue

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
      <div className={`h-56 bg-gradient-to-br ${gradientClass} p-6 text-white`}>
        <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1.25rem] border border-white/[0.15] bg-black/10 p-5">
          {project.image && (
            <>
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.08 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image src={project.image} alt={project.title ?? 'Project image'} fill className="object-cover" />
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
        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ${accentClass}`}>
          <MapPin className="h-4 w-4" />
          {project.location}
        </div>
        <div className="mt-4 rounded-[1.25rem] bg-white/85 p-4 shadow-[inset_0_0_0_1px_rgba(31,111,235,0.08)]">
          <p className="text-sm leading-7 text-muted-foreground">{project.description}</p>
        </div>
        <div className={`mt-5 rounded-[1.25rem] p-4 ${accentClass} ${compact ? '' : ''}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.16em]">Outcome</p>
          <p className="mt-2 text-sm leading-7 text-foreground">{project.result}</p>
        </div>
        <motion.button
          type="button"
          whileHover={reduceMotion ? undefined : { x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={onView}
          className={`mt-5 inline-flex items-center gap-2 text-sm font-bold transition-colors ${accentClass} rounded-full px-4 py-2 hover:opacity-85`}
        >
          View project details
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.article>
  )
}
