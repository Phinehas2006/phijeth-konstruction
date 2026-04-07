import Image from 'next/image'
import { ShieldCheck, Target, Users } from 'lucide-react'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/viewport'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { companyValues, siteImages, team } from '@/lib/data'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="About"
        title="A civil engineering company committed to quality, safety, and dependable execution."
        description="PHIJETH KONSTRUCTION supports clients with disciplined construction delivery, practical engineering coordination, and professional project management."
        imageSrc={siteImages.about}
        imageAlt="Construction site with cranes and buildings"
      />

      <section className="section-pad">
        <div className="container mx-auto grid gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="shell border-[#d8e6fb] bg-[linear-gradient(180deg,#eef5ff_0%,#e4eefc_100%)] p-8 md:p-10">
            <SectionHeading
              eyebrow="Company Story"
              title="Built on practical experience and responsible project delivery."
              description="We have grown by helping clients deliver construction and civil works projects with clearer planning, stronger site coordination, and reliable follow-through."
            />
            <div className="mt-6 space-y-4 rounded-[1.5rem] bg-white/75 p-5 text-base leading-8 text-muted-foreground">
              <p>
                Our company works across building construction, road construction, structural design, and project management with an approach grounded in professionalism and engineering discipline.
              </p>
              <p>
                We understand that clients need more than execution alone. They need a team that can manage complexity, communicate clearly, and maintain quality throughout the full project lifecycle.
              </p>
            </div>
            </div>
          </Reveal>

          <StaggerGroup className="grid gap-6">
            <StaggerItem>
            <div className="relative min-h-[240px] overflow-hidden rounded-[1.75rem] shadow-[0_16px_48px_rgba(11,31,59,0.10)]">
              <Image
                src={siteImages.structural}
                alt="Structural engineering work"
                fill
                className="object-cover"
              />
            </div>
            </StaggerItem>
            <StaggerItem>
              <article className="shell border-[#d8e6fb] bg-[linear-gradient(180deg,#edf4ff_0%,#e3edfb_100%)] p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-heading text-2xl font-bold text-primary">Mission</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                To deliver civil engineering and construction solutions with professionalism, safety, technical competence, and long-term value for our clients.
              </p>
              </article>
            </StaggerItem>
            <StaggerItem>
              <article className="shell border-[#d8e6fb] bg-[linear-gradient(180deg,#edf7ff_0%,#e1eefb_100%)] p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-heading text-2xl font-bold text-primary">Vision</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                To be recognized as a trusted civil engineering and construction partner known for quality delivery, responsible project control, and professional integrity.
              </p>
              </article>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>

      <section className="section-pad bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Our Team"
              title="Experienced professionals supporting each stage of project delivery."
              description="Our team structure combines leadership, project coordination, and engineering support to keep work moving efficiently."
              align="center"
            />
          </Reveal>
          <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {team.map((member) => (
              <StaggerItem key={member.id}>
                <article className="overflow-hidden rounded-[1.75rem] border border-[#d8e6fb] bg-[linear-gradient(180deg,#edf4ff_0%,#e4eefc_100%)] shadow-[0_14px_40px_rgba(11,31,59,0.08)]">
                <div className="relative flex h-60 items-center justify-center bg-gradient-to-br from-primary to-[#163D76]">
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
                    <div className="text-center text-white">
                      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/30 bg-white/10">
                        <Users className="h-10 w-10" />
                      </div>
                      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
                        Team Member
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <h3 className="font-heading text-2xl font-bold text-primary">{member.name}</h3>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                    {member.role}
                  </p>
                  <div className="mt-4 rounded-[1.25rem] bg-[#F6F9FF] p-4">
                    <p className="text-sm leading-7 text-muted-foreground">{member.bio}</p>
                  </div>
                </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="section-pad">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Values"
              title="Core principles that shape how we work."
              description="These values guide our decisions on site, in meetings, and throughout project delivery."
              align="center"
            />
          </Reveal>
          <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {companyValues.map((value) => (
              <StaggerItem key={value.title}>
                <article className="shell border-[#f0dcc7] bg-[linear-gradient(180deg,#fff2e3_0%,#f8e8d6_100%)] p-8">
                <h3 className="font-heading text-2xl font-bold text-primary">{value.title}</h3>
                <div className="mt-4 rounded-[1.25rem] bg-white/80 p-4">
                  <p className="text-sm leading-7 text-muted-foreground">{value.description}</p>
                </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </div>
  )
}
