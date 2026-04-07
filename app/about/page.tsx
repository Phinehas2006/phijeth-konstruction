import { ShieldCheck, Target, Users } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { companyValues, team } from '@/lib/data'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="About"
        title="A civil engineering company committed to quality, safety, and dependable execution."
        description="PHIJETH KONSTRUCTION supports clients with disciplined construction delivery, practical engineering coordination, and professional project management."
      />

      <section className="section-pad">
        <div className="container mx-auto grid gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="shell p-8 md:p-10">
            <SectionHeading
              eyebrow="Company Story"
              title="Built on practical experience and responsible project delivery."
              description="We have grown by helping clients deliver construction and civil works projects with clearer planning, stronger site coordination, and reliable follow-through."
            />
            <div className="mt-6 space-y-4 text-base leading-8 text-muted-foreground">
              <p>
                Our company works across building construction, road construction, structural design, and project management with an approach grounded in professionalism and engineering discipline.
              </p>
              <p>
                We understand that clients need more than execution alone. They need a team that can manage complexity, communicate clearly, and maintain quality throughout the full project lifecycle.
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            <article className="shell p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-heading text-2xl font-bold text-primary">Mission</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                To deliver civil engineering and construction solutions with professionalism, safety, technical competence, and long-term value for our clients.
              </p>
            </article>
            <article className="shell p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-heading text-2xl font-bold text-primary">Vision</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                To be recognized as a trusted civil engineering and construction partner known for quality delivery, responsible project control, and professional integrity.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-pad bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Team"
            title="Experienced professionals supporting each stage of project delivery."
            description="Our team structure combines leadership, project coordination, and engineering support to keep work moving efficiently."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {team.map((member) => (
              <article key={member.id} className="shell p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-heading text-2xl font-bold text-primary">{member.name}</h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                  {member.role}
                </p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{member.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Values"
            title="Core principles that shape how we work."
            description="These values guide our decisions on site, in meetings, and throughout project delivery."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {companyValues.map((value) => (
              <article key={value.title} className="shell p-8">
                <h3 className="font-heading text-2xl font-bold text-primary">{value.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
