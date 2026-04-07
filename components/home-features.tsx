import Link from 'next/link'
import { ArrowRight, Building2, ClipboardList, Route, Ruler } from 'lucide-react'
import { featuredProjects, homeStats, services } from '@/lib/data'
import { ProjectCard } from '@/components/project-card'
import { SectionHeading } from '@/components/section-heading'

const serviceIcons = {
  building2: Building2,
  road: Route,
  drafting: Ruler,
  clipboard: ClipboardList,
}

export function HomeFeatures() {
  return (
    <>
      <section className="section-pad bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Services"
            title="Professional civil engineering services tailored to project needs."
            description="We provide practical engineering and construction support across the core disciplines clients rely on most."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon as keyof typeof serviceIcons]

              return (
                <article key={service.id} className="shell p-7">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-heading text-2xl font-bold text-primary">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{service.description}</p>
                  <div className="mt-5 space-y-2">
                    {service.highlights.map((item) => (
                      <p key={item} className="text-sm font-medium text-foreground">
                        {item}
                      </p>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Featured Projects"
              title="Selected works demonstrating engineering capability and delivery standards."
              description="A few examples of how our team approaches civil engineering and construction work in live project environments."
            />
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-accent">
              Explore all projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Trust and Experience"
            title="A construction partner clients can trust with serious work."
            description="Our work is grounded in professional project control, dependable delivery, and a commitment to safety and quality."
            light
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {homeStats.map((stat) => (
              <div key={stat.label} className="rounded-[1.5rem] border border-white/[0.12] bg-white/[0.06] p-7 text-center">
                <p className="font-heading text-4xl font-bold text-white">{stat.value}</p>
                <p className="mt-2 text-sm text-white/75">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
