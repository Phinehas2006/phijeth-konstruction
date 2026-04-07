import { HomeHero } from '@/components/home-hero'
import { HomeFeatures } from '@/components/home-features'
import { HomeTestimonials } from '@/components/home-testimonials'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HomeHero />
      <HomeFeatures />
      <HomeTestimonials />
    </div>
  )
}
