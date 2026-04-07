import { Quote } from 'lucide-react'
import { testimonials } from '@/lib/data'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/viewport'
import { SectionHeading } from '@/components/section-heading'

export function HomeTestimonials() {
  return (
    <section className="section-pad bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Why Clients Choose Us"
            title="Professional delivery, clear communication, and dependable results."
            description="Client feedback reflects the standards we bring to construction coordination, engineering support, and project management."
            align="center"
          />
        </Reveal>
        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <article className="shell border-[#d8e6fb] bg-[linear-gradient(180deg,#eef5ff_0%,#e4eefc_100%)] p-8">
              <Quote className="h-10 w-10 text-secondary" />
              <div className="mt-5 rounded-[1.5rem] bg-white/80 p-5">
                <p className="text-base leading-8 text-muted-foreground">
                  &quot;{testimonial.message}&quot;
                </p>
              </div>
              <div className="mt-6 rounded-[1.25rem] bg-[#FFF4E8] p-5">
                <p className="font-semibold text-primary">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
