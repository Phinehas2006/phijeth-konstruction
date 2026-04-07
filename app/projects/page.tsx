import { PageHero } from '@/components/page-hero'
import { ProjectCard } from '@/components/project-card'
import { SectionHeading } from '@/components/section-heading'
import { projects } from '@/lib/data'

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Projects"
        title="Completed works presented in a clean gallery-style layout."
        description="A selection of completed projects showing our range across construction, civil works, and engineering delivery."
      />

      <section className="section-pad">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Completed Works"
            title="Recent projects delivered with professionalism and attention to detail."
            description="These examples reflect our approach to planning, execution, and finished project quality."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
