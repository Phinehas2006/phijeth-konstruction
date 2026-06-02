'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, User } from 'lucide-react'
import { fetchCms } from '@/lib/api'
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
  created_at: string
}

export function HomeBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    fetchCms<BlogPost[]>('/api/blog/')
      .then((data) => {
        if (mounted) {
          // Limit to 3 most recent posts
          setPosts(data.slice(0, 3))
        }
      })
      .catch((error) => {
        console.error('Failed to load blog posts:', error)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  if (loading || posts.length === 0) {
    return null
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  return (
    <section className="section-pad bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Latest Insights"
              title="Engineering updates and industry insights."
              description="Stay informed with the latest articles on construction, civil engineering, and project delivery."
            />
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-accent">
              Read all articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.id}>
              <motion.article className="group overflow-hidden rounded-[1.75rem] border border-[#d8e6fb] bg-white shadow-[0_8px_32px_rgba(11,31,59,0.08)] transition hover:shadow-[0_16px_48px_rgba(11,31,59,0.12)]">
                <Link href={`/blog/${post.id}`}>
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                    {post.cover_image ? (
                      <Image
                        src={post.cover_image}
                        alt={post.title || 'Blog post cover'}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary to-secondary/80">
                        <span className="text-4xl font-bold text-white/20">📰</span>
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(post.publish_date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {post.author}
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
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {post.content}
                  </p>
                  <Link
                    href={`/blog/${post.id}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-secondary transition hover:text-accent"
                  >
                    Read more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
