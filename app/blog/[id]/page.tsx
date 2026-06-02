'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { fetchCms } from '@/lib/api'

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

export default function BlogPostPage() {
  const params = useParams()
  const id = params.id as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) return

    fetchCms<BlogPost>(`/api/blog/${id}/`)
      .then((data) => {
        setPost(data)
      })
      .catch((error) => {
        console.error('Failed to load blog post:', error)
        setNotFound(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold text-primary">Article not found</h1>
          <p className="mt-2 text-muted-foreground">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link href="/blog" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-accent">
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {post.cover_image && (
        <div className="relative h-96 w-full overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 md:h-[500px]">
          <Image
            src={post.cover_image}
            alt={post.title || 'Blog post cover'}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,31,59,0.20),rgba(11,31,59,0.50))]" />
        </div>
      )}

      <article className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-accent">
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(post.publish_date)}
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </div>
              <span className="rounded-full bg-[#EAF2FF] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-secondary">
                {post.category}
              </span>
            </div>

            <h1 className="mt-6 font-heading text-4xl font-bold text-primary md:text-5xl">
              {post.title}
            </h1>

            <div className="prose prose-sm max-w-none text-base leading-8 text-foreground sm:prose-base md:prose-lg">
              <div className="mt-10 space-y-6">
                {post.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-base leading-8 text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 rounded-[1.5rem] border border-border bg-muted p-8"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Written by</p>
                  <p className="mt-1 font-semibold text-primary">{post.author}</p>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-accent"
                >
                  Browse more articles
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </article>
    </div>
  )
}
