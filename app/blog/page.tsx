'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Clock3, User } from 'lucide-react'
import { fetchCms } from '@/lib/api'
import { siteImages as fallbackSiteImages } from '@/lib/data'
import { getSiteData } from '@/lib/site'
import { PageHero } from '@/components/page-hero'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/viewport'
import { SectionHeading } from '@/components/section-heading'

type BlogPost = {
  id: number
  title: string
  content: string
  cover_image?: string
  author: string
  publish_date: string
  category: string
  reading_time?: number
  created_at: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [siteImages, setSiteImages] = useState(fallbackSiteImages)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let mounted = true

    fetchCms<BlogPost[]>('/api/blog/')
      .then((data) => {
        if (!mounted) return
        setPosts(data)
        setFilteredPosts(data)
        setErrorMessage('')
      })
      .catch((error) => {
        console.error('Failed to load blog posts:', error)
        if (mounted) {
          setErrorMessage('Blog posts could not be loaded. Make sure the CMS server is running.')
        }
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
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

  useEffect(() => {
    setFilteredPosts(
      selectedCategory ? posts.filter((post) => post.category === selectedCategory) : posts,
    )
  }, [selectedCategory, posts])

  const categories = [...new Set(posts.map((post) => post.category).filter(Boolean))]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Blog"
        title="Engineering insights, project updates, and industry knowledge."
        description="Stay informed with articles on civil engineering, construction best practices, and project delivery excellence."
        imageSrc={siteImages.projects}
        imageAlt="Construction site blog banner"
      />

      <section className="section-pad">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="All Articles"
              title="Explore our knowledge base."
              description="Filter by category to find articles most relevant to your interests."
            />
          </Reveal>

          {categories.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  selectedCategory === null
                    ? 'bg-secondary text-white'
                    : 'border border-border bg-white text-foreground hover:border-secondary'
                }`}
              >
                All Articles
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-secondary text-white'
                      : 'border border-border bg-white text-foreground hover:border-secondary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-[420px] animate-pulse rounded-[1.75rem] border border-[#d8e6fb] bg-muted" />
              ))}
            </div>
          ) : errorMessage ? (
            <div className="mt-12 rounded-[1.5rem] border border-dashed border-border bg-muted p-12 text-center">
              <p className="text-lg font-semibold text-muted-foreground">{errorMessage}</p>
            </div>
          ) : (
            <StaggerGroup className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <StaggerItem key={post.id}>
                  <motion.article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#d8e6fb] bg-white shadow-[0_8px_32px_rgba(11,31,59,0.08)] transition hover:shadow-[0_16px_48px_rgba(11,31,59,0.12)]">
                    <Link href={`/blog/${post.id}`}>
                      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                        {post.cover_image ? (
                          <Image
                            src={post.cover_image}
                            alt={post.title || 'Blog post cover'}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary to-secondary/80">
                            <Calendar className="h-12 w-12 text-white/60" />
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="flex flex-1 flex-col p-7">
                      <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(post.publish_date)}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3.5 w-3.5" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock3 className="h-3.5 w-3.5" />
                          {post.reading_time ?? 1} min read
                        </div>
                        <span className="rounded-full bg-[#EAF2FF] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-secondary">
                          {post.category}
                        </span>
                      </div>
                      <Link href={`/blog/${post.id}`}>
                        <h3 className="mt-4 font-heading text-xl font-bold text-primary transition group-hover:text-secondary">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="mt-3 flex-1 line-clamp-3 text-sm leading-6 text-muted-foreground">
                        {post.content}
                      </p>
                      <Link
                        href={`/blog/${post.id}`}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-secondary transition hover:text-accent"
                      >
                        Read full article
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}

          {!loading && !errorMessage && filteredPosts.length === 0 && (
            <div className="mt-12 rounded-[1.5rem] border border-dashed border-border bg-muted p-12 text-center">
              <p className="text-lg font-semibold text-muted-foreground">No articles found in this category.</p>
              <button
                onClick={() => setSelectedCategory(null)}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-accent"
              >
                View all articles
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
