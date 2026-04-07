import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { companyInfo, siteImages } from '@/lib/data'

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
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white">
                <Image
                  src={siteImages.logo}
                  alt={`${companyInfo.fullName} logo`}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <p className="font-heading text-xl font-bold sm:text-2xl">{companyInfo.fullName}</p>
            </div>
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
                <div>
                  <a href={companyInfo.phoneHref} className="block hover:text-accent">
                    {companyInfo.phoneDisplay}
                  </a>
                  <a href={companyInfo.secondaryPhoneHref} className="mt-1 block hover:text-accent">
                    {companyInfo.secondaryPhoneDisplay}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <a href={`mailto:${companyInfo.email}`} className="break-all hover:text-accent">
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

        <div className="mt-10 border-t border-white/10 pt-5 text-sm leading-6 text-primary-foreground/60">
          &copy; {currentYear} {companyInfo.fullName}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
