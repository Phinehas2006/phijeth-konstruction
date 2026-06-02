import { HomeHero } from '@/components/home-hero'
import { HomeFeatures } from '@/components/home-features'
import { HomeBlog } from '@/components/home-blog'
import { HomeTestimonials } from '@/components/home-testimonials'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HomeHero />
      <HomeFeatures />
      <HomeBlog />
      <HomeTestimonials />
    </div>
  )
}
