'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { companyInfo } from '@/lib/data'

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

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/[0.95] backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[78px] items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-sm font-bold tracking-[0.18em] text-primary-foreground">
              PK
            </div>
            <div>
              <p className="font-heading text-lg font-bold tracking-tight text-primary">
                {companyInfo.fullName}
              </p>
              <p className="hidden text-xs text-muted-foreground lg:block">
                Civil engineering and construction solutions
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-semibold transition-colors ${
                    isActive ? 'text-secondary' : 'text-foreground hover:text-secondary'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-0.5 w-full origin-center rounded-full bg-accent transition-transform ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </Link>
              )
            })}
          </nav>

          <Link
            href="/contact"
            className="hidden rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-[#E66E00] md:inline-flex"
          >
            Request a Quote
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button className="inline-flex items-center justify-center rounded-xl border border-border bg-card p-2 text-foreground">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white">
              <div className="mt-8">
                <p className="font-heading text-xl font-bold text-primary">{companyInfo.fullName}</p>
                <p className="mt-2 text-sm text-muted-foreground">{companyInfo.serviceArea}</p>
              </div>
              <nav className="mt-8 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
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
    </header>
  )
}
