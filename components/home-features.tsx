'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Building2, ClipboardList, Route, Ruler, Users } from 'lucide-react'
import { featuredProjects, homeStats, services, siteImages, team } from '@/lib/data'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/viewport'
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
          <Reveal>
            <SectionHeading
              eyebrow="Services"
              title="Professional civil engineering services tailored to project needs."
              description="We provide practical engineering and construction support across the core disciplines clients rely on most."
              align="center"
            />
          </Reveal>
          <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon as keyof typeof serviceIcons]

              return (
                <StaggerItem key={service.id}>
                  <motion.article className="shell border-[#d8e6fb] bg-[linear-gradient(180deg,#eef5ff_0%,#e4eefc_100%)] p-7">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_12px_28px_rgba(11,31,59,0.16)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-heading text-2xl font-bold text-primary">{service.title}</h3>
                  <div className="mt-3 rounded-[1.25rem] bg-[#EAF2FF] p-4">
                    <p className="text-sm leading-7 text-muted-foreground">{service.description}</p>
                  </div>
                  <div className="mt-5 space-y-2">
                    {service.highlights.map((item) => (
                      <p key={item} className="rounded-2xl bg-[#FFF4E8] px-4 py-3 text-sm font-medium text-foreground shadow-[inset_0_0_0_1px_rgba(255,122,0,0.10)]">
                        {item}
                      </p>
                    ))}
                  </div>
                  </motion.article>
                </StaggerItem>
              )
            })}
          </StaggerGroup>
        </div>
      </section>

      <section className="section-pad">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <div className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] shadow-[0_16px_48px_rgba(11,31,59,0.10)]">
              <Image
                src={siteImages.about}
                alt="Active structural construction site"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,31,59,0.20),rgba(11,31,59,0.45))]" />
              </div>
            </Reveal>
            <Reveal>
              <div className="shell border-[#d8e6fb] bg-[linear-gradient(180deg,#eef5ff_0%,#e4eefc_100%)] p-8 md:p-10">
              <SectionHeading
                eyebrow="Company Strength"
                title="Construction delivery supported by real field experience."
                description="We combine practical engineering coordination, site supervision, and disciplined project management to keep work progressing with fewer surprises."
              />
              <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
                <p>
                  Our team works across building construction, roadworks, and structural delivery with a focus on safe execution and dependable client communication.
                </p>
                <p>
                  Whether the project involves foundations, reinforced concrete, site access, or civil coordination, we approach the work with professional standards and clear reporting.
                </p>
              </div>
              <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-accent">
                Learn more about us
                <ArrowRight className="h-4 w-4" />
              </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
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
          </Reveal>
          <StaggerGroup className="mt-12 grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <StaggerItem key={project.id}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="section-pad bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Trust and Experience"
              title="A construction partner clients can trust with serious work."
              description="Our work is grounded in professional project control, dependable delivery, and a commitment to safety and quality."
              light
              align="center"
            />
          </Reveal>
          <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {homeStats.map((stat) => (
              <StaggerItem key={stat.label}>
                <motion.div className="rounded-[1.5rem] border border-white/[0.12] bg-white/[0.06] p-7 text-center">
                <p className="font-heading text-4xl font-bold text-white">{stat.value}</p>
                <p className="mt-2 text-sm text-white/75">{stat.label}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="section-pad bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Our Team"
              title="The people supporting engineering quality and project coordination."
              description="Our leadership and project teams help maintain professionalism, communication, and delivery standards across the full project cycle."
              align="center"
            />
          </Reveal>
          <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {team.map((member) => (
              <StaggerItem key={member.id}>
                <motion.article className="overflow-hidden rounded-[1.75rem] border border-[#d8e6fb] bg-[linear-gradient(180deg,#edf4ff_0%,#e4eefc_100%)] shadow-[0_14px_40px_rgba(11,31,59,0.08)]">
                <div className="relative flex h-64 items-center justify-center bg-gradient-to-br from-primary to-[#163D76]">
                  {member.image ? (
                    <>
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,31,59,0.10),rgba(11,31,59,0.50))]" />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />
                      <div className="relative z-10 text-center text-white">
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/30 bg-white/10">
                          <Users className="h-10 w-10" />
                        </div>
                        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
                          Team Member
                        </p>
                      </div>
                    </>
                  )}
                  <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-primary shadow-md">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="font-heading text-2xl font-bold text-primary">{member.name}</h3>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                    {member.role}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{member.bio}</p>
                </div>
                </motion.article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  )
}
