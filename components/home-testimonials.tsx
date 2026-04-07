import { Quote } from 'lucide-react'
import { testimonials } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'

export function HomeTestimonials() {
  return (
    <section className="section-pad bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Clients Choose Us"
          title="Professional delivery, clear communication, and dependable results."
          description="Client feedback reflects the standards we bring to construction coordination, engineering support, and project management."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <article key={testimonial.id} className="shell p-8">
              <Quote className="h-10 w-10 text-secondary" />
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                &quot;{testimonial.message}&quot;
              </p>
              <div className="mt-6 border-t border-border pt-5">
                <p className="font-semibold text-primary">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
