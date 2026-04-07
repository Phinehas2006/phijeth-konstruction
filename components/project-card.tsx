import { ArrowRight, MapPin } from 'lucide-react'

type ProjectCardProps = {
  project: {
    title: string
    category: string
    location: string
    year: string
    description: string
    result: string
    palette: string
  }
}

const paletteClasses: Record<string, string> = {
  blue: 'from-primary to-[#163D76]',
  orange: 'from-accent to-[#E76700]',
  slate: 'from-[#31435D] to-[#4A6285]',
  steel: 'from-[#475569] to-[#1F6FEB]',
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-[0_14px_40px_rgba(11,31,59,0.08)]">
      <div className={`h-56 bg-gradient-to-br ${paletteClasses[project.palette] ?? paletteClasses.blue} p-6 text-white`}>
        <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-white/[0.15] bg-black/10 p-5">
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-full border border-white/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
              {project.category}
            </span>
            <span className="text-sm text-white/80">{project.year}</span>
          </div>
          <div>
            <p className="text-sm text-white/75">Completed work</p>
            <h3 className="mt-2 font-heading text-2xl font-bold">{project.title}</h3>
          </div>
        </div>
      </div>
      <div className="p-6 md:p-7">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-secondary" />
          {project.location}
        </div>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">{project.description}</p>
        <div className="mt-5 rounded-[1.25rem] bg-[#F5F7FA] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Outcome</p>
          <p className="mt-2 text-sm leading-7 text-foreground">{project.result}</p>
        </div>
        <button className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-accent">
          View project details
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  )
}
