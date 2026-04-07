import { Building2, ClipboardList, Route, Ruler } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { services } from '@/lib/data'

const serviceIcons = {
  building2: Building2,
  road: Route,
  drafting: Ruler,
  clipboard: ClipboardList,
}

export const metadata = {
  title: 'Services - PHIJETH KONSTRUCTION',
  description: 'Civil engineering and construction services from PHIJETH KONSTRUCTION.',
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Services"
        title="Professional civil engineering services delivered with structure and accountability."
        description="Our service offering covers the core construction and engineering disciplines clients rely on for safe, efficient, and professionally managed project delivery."
      />

      <section className="section-pad">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Service List"
            title="Core engineering and construction capabilities."
            description="Each service is delivered with close attention to planning, coordination, and quality control."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon as keyof typeof serviceIcons]

              return (
                <article key={service.id} className="shell p-8 md:p-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-6 font-heading text-3xl font-bold text-primary">{service.title}</h2>
                  <p className="mt-4 text-base leading-8 text-muted-foreground">{service.description}</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {service.highlights.map((item) => (
                      <div key={item} className="rounded-[1.25rem] bg-muted p-4 text-sm font-medium text-foreground">
                        {item}
                      </div>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
