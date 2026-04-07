import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { companyInfo } from '@/lib/data'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr]">
          <div>
            <p className="font-heading text-2xl font-bold">{companyInfo.fullName}</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-primary-foreground/80">
              {companyInfo.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
              Quick Links
            </h4>
            <div className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-primary-foreground/85 hover:text-accent">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
              Contact Info
            </h4>
            <div className="mt-4 space-y-4 text-sm text-primary-foreground/85">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <a href={companyInfo.phoneHref} className="hover:text-accent">
                  {companyInfo.phoneDisplay}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <a href={`mailto:${companyInfo.email}`} className="hover:text-accent">
                  {companyInfo.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <div>
                  <p>{companyInfo.addressLine1}</p>
                  <p>{companyInfo.addressLine2}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-5 text-sm text-primary-foreground/60">
          &copy; {currentYear} {companyInfo.fullName}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
