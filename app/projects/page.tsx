'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { ProjectCard } from '@/components/project-card'
import { SectionHeading } from '@/components/section-heading'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/viewport'
import { projects, siteImages } from '@/lib/data'

export default function ProjectsPage() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? null

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Projects"
        title="Completed works presented in a clean gallery-style layout."
        description="A selection of completed projects showing our range across construction, civil works, and engineering delivery."
        imageSrc={siteImages.projects}
        imageAlt="Civil engineering project with roadway and bridge works"
      />

      <section className="section-pad">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Completed Works"
              title="Recent projects delivered with professionalism and attention to detail."
              description="These examples reflect our approach to planning, execution, and finished project quality."
            />
          </Reveal>
          <StaggerGroup className="mt-12 columns-1 gap-6 space-y-6 lg:columns-2">
            {projects.map((project) => (
              <StaggerItem key={project.id} className="break-inside-avoid">
                <ProjectCard project={project} onView={() => setSelectedProjectId(project.id)} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-[#081425]/75 p-3 sm:p-4 backdrop-blur-md"
            onClick={() => setSelectedProjectId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative my-8 w-full max-w-4xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-white shadow-[0_24px_80px_rgba(8,20,37,0.35)] sm:max-h-[90vh] sm:rounded-[2rem]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedProjectId(null)}
                className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition-colors hover:bg-white sm:right-5 sm:top-5 sm:h-11 sm:w-11"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                <div className="relative min-h-[320px] lg:min-h-[560px]">
                  {selectedProject.image ? (
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,31,59,0.10),rgba(11,31,59,0.46))]" />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-secondary">
                    {selectedProject.category}
                  </p>
                  <h2 className="mt-4 font-heading text-2xl font-bold text-primary sm:text-3xl">
                    {selectedProject.title}
                  </h2>
                  <p className="mt-3 text-sm font-medium text-muted-foreground">
                    {selectedProject.location} • {selectedProject.year}
                  </p>
                  <p className="mt-6 text-base leading-8 text-muted-foreground">
                    {selectedProject.description}
                  </p>
                  <div className="mt-6 rounded-[1.5rem] bg-muted p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                      Outcome
                    </p>
                    <p className="mt-3 text-sm leading-7 text-foreground">{selectedProject.result}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
