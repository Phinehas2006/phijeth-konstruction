'use client'

import { useEffect, useState } from 'react'
import { Building2, CheckCircle2, ClipboardList, Route, Ruler } from 'lucide-react'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/viewport'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { fetchCms } from '@/lib/api'
import { getSiteData } from '@/lib/site'
import { coreServices, siteImages as fallbackSiteImages } from '@/lib/data'

const serviceIcons = {
  building2: Building2,
  road: Route,
  drafting: Ruler,
  clipboard: ClipboardList,
}

type Service = {
  id: number
  title: string
  description: string
  highlights: string[]
  icon: string
}

export default function ServicesClient() {
  const [services, setServices] = useState<Service[]>([])
  const [siteImages, setSiteImages] = useState(fallbackSiteImages)

  useEffect(() => {
    fetchCms<Service[]>('/api/services/')
      .then((data) => setServices(data))
      .catch((error) => console.error('Failed to load services:', error))

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
        eyebrow="Services"
        title="Professional civil engineering services delivered with structure and accountability."
        description="Our service offering covers the core construction and engineering disciplines clients rely on for safe, efficient, and professionally managed project delivery."
        imageSrc={siteImages.services}
        imageAlt="Road and civil works construction team on site"
      />

      <section className="section-pad">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="mb-8 font-heading text-4xl font-black uppercase leading-tight text-primary sm:text-5xl lg:text-6xl">
              What We Offer
            </h2>
            <SectionHeading
              eyebrow="Service List"
              title="Core engineering and construction capabilities."
              description="Each service is delivered with close attention to planning, coordination, and quality control."
            />
          </Reveal>
          <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {coreServices.map((service) => (
              <StaggerItem key={service}>
                <div className="flex h-full items-start gap-3 rounded-[1.25rem] border border-[#d8e6fb] bg-white p-5 shadow-[0_12px_32px_rgba(11,31,59,0.08)]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                  <p className="text-base font-bold leading-6 text-primary">{service}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] ?? Building2

              return (
                <StaggerItem key={service.id}>
                  <article className="shell border-[#d8e6fb] bg-[linear-gradient(180deg,#eef5ff_0%,#e4eefc_100%)] p-8 md:p-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-6 font-heading text-3xl font-bold text-primary">{service.title}</h2>
                  <div className="mt-4 rounded-[1.25rem] bg-[#EAF2FF] p-5">
                    <p className="text-base leading-8 text-muted-foreground">{service.description}</p>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {service.highlights.map((item) => (
                      <div key={item} className="rounded-[1.25rem] bg-[#FFF4E8] p-4 text-sm font-medium text-foreground shadow-[inset_0_0_0_1px_rgba(255,122,0,0.10)]">
                        {item}
                      </div>
                    ))}
                  </div>
                  </article>
                </StaggerItem>
              )
            })}
          </StaggerGroup>
        </div>
      </section>
    </div>
  )
}
