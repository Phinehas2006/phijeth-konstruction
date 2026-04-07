'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion, useScroll, useSpring } from 'framer-motion'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { companyInfo, siteImages } from '@/lib/data'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const navOpacity = useSpring(isScrolled ? 0.82 : 0.96, {
    stiffness: 120,
    damping: 20,
  })

  useEffect(() => {
    return scrollY.on('change', (value) => {
      setIsScrolled(value > 24)
    })
  }, [scrollY])

  return (
    <motion.header
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: `rgba(255,255,255,${navOpacity.get()})`,
      }}
      className={`sticky top-0 z-50 border-b border-border/70 backdrop-blur-xl transition-shadow duration-500 ${
        isScrolled ? 'shadow-[0_18px_42px_rgba(11,31,59,0.10)]' : ''
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[72px] items-center justify-between gap-3 sm:min-h-[78px] sm:gap-6">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-border sm:h-11 sm:w-11">
              <Image
                src={siteImages.logo}
                alt={`${companyInfo.fullName} logo`}
                fill
                sizes="44px"
                className="object-cover"
                priority
              />
            </div>
            <div className="min-w-0">
              <p className="brand-title truncate text-base text-primary sm:text-xl lg:text-2xl">
                {companyInfo.fullName}
              </p>
              <p className="hidden text-xs text-muted-foreground xl:block">
                Civil engineering and construction solutions
              </p>
            </div>
          </Link>

          <LayoutGroup>
            <nav className="hidden items-center gap-7 md:flex">
              {navLinks.map((link) => {
                const isActive = pathname === link.href

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative pb-1 text-base font-bold transition-colors duration-300 ${
                      isActive ? 'text-secondary' : 'text-foreground hover:text-secondary'
                    }`}
                  >
                    {link.label}
                    <AnimatePresence>
                      {isActive ? (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-accent"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      ) : null}
                    </AnimatePresence>
                  </Link>
                )
              })}
            </nav>
          </LayoutGroup>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.92 }}
                className="inline-flex items-center justify-center rounded-xl border border-border bg-card p-2 text-foreground"
              >
                <Menu className="h-6 w-6" />
              </motion.button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-[320px] bg-white">
              <div className="mt-8">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white ring-1 ring-border">
                    <Image
                      src={siteImages.logo}
                      alt={`${companyInfo.fullName} logo`}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <p className="brand-title text-2xl text-primary">{companyInfo.fullName}</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{companyInfo.serviceArea}</p>
              </div>
              <nav className="mt-8 flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.45 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                        pathname === link.href
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-6 inline-flex rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground"
              >
                Request a Quote
              </Link>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
