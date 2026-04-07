type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  light?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && (
        <p className={`text-sm font-semibold uppercase tracking-[0.22em] ${light ? 'text-accent' : 'text-secondary'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-3 font-heading text-3xl font-bold leading-tight md:text-4xl ${light ? 'text-white' : 'text-primary'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-8 ${light ? 'text-white/80' : 'text-muted-foreground'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
