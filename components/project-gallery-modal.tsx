'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ImageIcon, Play, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

type ProjectMedia = {
  id?: number
  image?: string
  url?: string
  file?: string
  caption?: string
  order?: number
}

type ProjectGalleryModalProps = {
  project: {
    id: number
    title: string
    category: string
    location: string
    year: string
    description: string
    result?: string
    palette?: string
    image?: string | null
    images?: ProjectMedia[]
    videos?: ProjectMedia[]
  } | null
  onClose: () => void
}

const palettePanelClasses: Record<string, string> = {
  blue: 'from-[#0B4BA8] to-[#1F6FEB]',
  green: 'from-[#166534] to-[#22A05A]',
  orange: 'from-[#C75400] to-[#FF7A00]',
  red: 'from-[#991B1B] to-[#E03535]',
  gray: 'from-[#4B5563] to-[#9CA3AF]',
  black: 'from-[#050505] to-[#262626]',
  slate: 'from-[#31435D] to-[#4A6285]',
  steel: 'from-[#475569] to-[#1F6FEB]',
}

const paletteSoftClasses: Record<string, string> = {
  blue: 'bg-[#EAF2FF] text-[#0B4BA8]',
  green: 'bg-[#EAF8EF] text-[#166534]',
  orange: 'bg-[#FFF4E8] text-[#C75400]',
  red: 'bg-[#FFF0F0] text-[#991B1B]',
  gray: 'bg-[#F3F4F6] text-[#374151]',
  black: 'bg-[#EFEFEF] text-[#111111]',
  slate: 'bg-[#EEF2F7] text-[#31435D]',
  steel: 'bg-[#EDF4FF] text-[#1F6FEB]',
}

type GalleryItem = {
  key: string
  type: 'image' | 'video'
  src: string
  caption: string
}

function isVideoFile(src: string) {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src)
}

function toEmbedUrl(src: string) {
  try {
    const url = new URL(src)

    if (url.hostname.includes('youtube.com')) {
      const videoId = url.searchParams.get('v')
      return videoId ? `https://www.youtube.com/embed/${videoId}` : src
    }

    if (url.hostname.includes('youtu.be')) {
      const videoId = url.pathname.replace('/', '')
      return videoId ? `https://www.youtube.com/embed/${videoId}` : src
    }

    if (url.hostname.includes('vimeo.com')) {
      const videoId = url.pathname.split('/').filter(Boolean).at(-1)
      return videoId ? `https://player.vimeo.com/video/${videoId}` : src
    }
  } catch {
    return src
  }

  return src
}

export function ProjectGalleryModal({ project, onClose }: ProjectGalleryModalProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)

  const allMedia = useMemo<GalleryItem[]>(() => {
    if (!project) return []

    const gallery: GalleryItem[] = []

    if (project.image) {
      gallery.push({
        key: `main-${project.id}`,
        type: 'image',
        src: project.image,
        caption: 'Main project image',
      })
    }

    ;[...(project.images ?? [])]
      .filter((item) => item.image)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .forEach((item, index) => {
        gallery.push({
          key: `image-${item.id ?? index}-${item.image}`,
          type: 'image',
          src: item.image as string,
          caption: item.caption || `Project image ${index + 1}`,
        })
      })

    ;[...(project.videos ?? [])]
      .map((item) => ({ ...item, src: item.file || item.url || '' }))
      .filter((item) => item.src)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .forEach((item, index) => {
        gallery.push({
          key: `video-${item.id ?? index}-${item.src}`,
          type: 'video',
          src: item.src,
          caption: item.caption || `Project video ${index + 1}`,
        })
      })

    return gallery
  }, [project])

  const currentMedia = allMedia[currentMediaIndex] ?? null
  const palette = project?.palette || 'blue'
  const paletteClass = palettePanelClasses[palette] ?? palettePanelClasses.blue
  const paletteSoftClass = paletteSoftClasses[palette] ?? paletteSoftClasses.blue

  function previousMedia() {
    if (allMedia.length < 2) return
    setCurrentMediaIndex((current) => (current - 1 + allMedia.length) % allMedia.length)
  }

  function nextMedia() {
    if (allMedia.length < 2) return
    setCurrentMediaIndex((current) => (current + 1) % allMedia.length)
  }

  useEffect(() => {
    setCurrentMediaIndex(0)
  }, [project?.id])

  useEffect(() => {
    if (!project) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') previousMedia()
      if (event.key === 'ArrowRight') nextMedia()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  useEffect(() => {
    if (!project) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [project])

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[140] flex items-stretch justify-center overflow-y-auto bg-[#081425]/75 backdrop-blur-md sm:items-center sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-dvh w-full max-w-6xl overflow-y-auto bg-white shadow-[0_24px_80px_rgba(8,20,37,0.35)] sm:my-8 sm:min-h-0 sm:max-h-[92vh] sm:overflow-hidden sm:rounded-[1.5rem] sm:border sm:border-white/10"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close project gallery"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-primary shadow-lg transition-colors hover:bg-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
              <div className="relative min-h-[300px] overflow-hidden bg-[#07111f] sm:min-h-[520px] lg:min-h-[680px]">
                {currentMedia ? (
                  <motion.div
                    key={currentMedia.key}
                    drag={allMedia.length > 1 ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.18}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -80) nextMedia()
                      if (info.offset.x > 80) previousMedia()
                    }}
                    initial={{ opacity: 0.85, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                  >
                    {currentMedia.type === 'image' ? (
                      <Image
                        src={currentMedia.src}
                        alt={currentMedia.caption || project.title}
                        fill
                        priority
                        sizes="(min-width: 1024px) 70vw, 100vw"
                        className="object-contain"
                      />
                    ) : isVideoFile(currentMedia.src) ? (
                      <video
                        src={currentMedia.src}
                        controls
                        playsInline
                        className="h-full w-full bg-black object-contain"
                      />
                    ) : (
                      <iframe
                        src={toEmbedUrl(currentMedia.src)}
                        title={currentMedia.caption || project.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full bg-black"
                      />
                    )}
                  </motion.div>
                ) : (
                  <div className="flex h-full min-h-[340px] items-center justify-center text-white/70">
                    <ImageIcon className="h-10 w-10" />
                  </div>
                )}

                {allMedia.length > 1 ? (
                  <>
                    <button
                      type="button"
                      aria-label="Previous media"
                      onClick={previousMedia}
                      className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition hover:bg-white"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next media"
                      onClick={nextMedia}
                      className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition hover:bg-white"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                ) : null}
              </div>

              <aside className="flex flex-col overflow-y-auto p-5 pb-8 sm:max-h-[92vh] sm:p-8">
                <div className={`-mx-2 -mt-2 rounded-[1.25rem] bg-gradient-to-br ${paletteClass} p-5 text-white`}>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
                  {project.category}
                </p>
                <h2 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">
                  {project.title}
                </h2>
                <p className="mt-3 text-sm font-medium text-white/75">
                  {project.location} / {project.year}
                </p>
                </div>
                <p className="mt-6 text-base leading-8 text-muted-foreground">
                  {project.description}
                </p>

                {project.result ? (
                  <div className={`mt-6 rounded-[1.25rem] p-5 ${paletteSoftClass}`}>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-80">
                      Outcome
                    </p>
                    <p className="mt-3 text-sm font-medium leading-7">{project.result}</p>
                  </div>
                ) : null}

                {allMedia.length > 0 ? (
                  <div className="mt-6 border-t border-border pt-6">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        Media {currentMediaIndex + 1} of {allMedia.length}
                      </p>
                      {currentMedia?.type === 'video' ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF2FF] px-3 py-1 text-xs font-semibold text-secondary">
                          <Play className="h-3 w-3" />
                          Video
                        </span>
                      ) : null}
                    </div>
                    {currentMedia?.caption ? (
                      <p className="mt-3 text-sm font-medium text-foreground">{currentMedia.caption}</p>
                    ) : null}

                    <div className="mt-5 grid grid-cols-4 gap-2">
                      {allMedia.map((item, index) => (
                        <button
                          type="button"
                          key={item.key}
                          aria-label={`View media ${index + 1}`}
                          onClick={() => setCurrentMediaIndex(index)}
                          className={`relative aspect-square overflow-hidden rounded-md border transition ${
                            index === currentMediaIndex
                              ? 'border-secondary ring-2 ring-secondary/30'
                              : 'border-border opacity-75 hover:opacity-100'
                          }`}
                        >
                          {item.type === 'image' ? (
                            <Image src={item.src} alt="" fill sizes="96px" className="object-cover" />
                          ) : (
                            <span className="flex h-full w-full items-center justify-center bg-primary text-white">
                              <Play className="h-5 w-5" />
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </aside>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
