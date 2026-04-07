import Link from 'next/link'
import { companyInfo } from '@/lib/data'

export function HomeHero() {
  return (
    <section className="hero-overlay relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,31,59,0.22),rgba(11,31,59,0.78))]" />
      <div className="container relative z-10 mx-auto px-4 py-24 sm:px-6 md:py-32 lg:px-8 lg:py-40">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Civil Engineering and Construction</p>
          <h1 className="mt-5 font-heading text-4xl font-bold leading-tight md:text-6xl">
            Building reliable civil engineering solutions for modern infrastructure.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/[0.82]">
            {companyInfo.fullName} delivers building construction, road construction, structural design, and project management with professionalism, safety, and technical discipline.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-[#E66E00]"
            >
              Request a Quote
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
