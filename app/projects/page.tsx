'use client'

import { useEffect, useState } from 'react'
import { PageHero } from '@/components/page-hero'
import { ProjectCard } from '@/components/project-card'
import { ProjectGalleryModal } from '@/components/project-gallery-modal'
import { SectionHeading } from '@/components/section-heading'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/viewport'
import { fetchCms } from '@/lib/api'
import { getSiteData } from '@/lib/site'
import { siteImages as fallbackSiteImages } from '@/lib/data'

type Project = {
  id: number
  title: string
  category: string
  location: string
  year: string
  description: string
  result: string
  palette: string
  image?: string | null
  images?: Array<{ id: number; image: string; caption: string; order: number }>
  videos?: Array<{ id: number; url?: string; file?: string; caption: string; order: number }>
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const [siteImages, setSiteImages] = useState(fallbackSiteImages)
  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? null

  useEffect(() => {
    fetchCms<Project[]>('/api/projects/')
      .then((data) => setProjects(data))
      .catch((error) => console.error('Failed to load projects:', error))

    let mounted = true
    getSiteData()
      .then((s) => {
        if (mounted) setSiteImages(s.siteImages)
      })
      .catch(() => {})

    return () => {
      mounted = false
    }
  }, [])

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
            <h2 className="mb-8 max-w-4xl font-heading text-4xl font-black uppercase leading-tight text-primary sm:text-5xl lg:text-6xl">
              Explore Our Recent Projects
            </h2>
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

      <ProjectGalleryModal project={selectedProject} onClose={() => setSelectedProjectId(null)} />
    </div>
  )
}
