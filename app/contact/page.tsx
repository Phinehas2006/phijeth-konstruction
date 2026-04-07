'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/viewport'
import { SectionHeading } from '@/components/section-heading'
import { companyInfo, siteImages } from '@/lib/data'

const whatsappMessage = encodeURIComponent(
  "Hello PHIJETH KONSTRUCTION, I am interested in your civil engineering and construction services. I would like to discuss my project and get a quote.",
)

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M19.11 17.41c-.3-.15-1.77-.87-2.05-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.41-1.5-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.12-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.08-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.09 3.2 5.06 4.48.71.31 1.27.5 1.7.64.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
      <path d="M16.02 3.2c-7.08 0-12.8 5.7-12.8 12.74 0 2.25.59 4.44 1.71 6.36L3.1 28.8l6.72-1.76a12.87 12.87 0 0 0 6.2 1.58h.01c7.07 0 12.8-5.7 12.8-12.74 0-3.39-1.32-6.57-3.73-8.97a12.84 12.84 0 0 0-9.08-3.71Zm0 23.28h-.01a10.7 10.7 0 0 1-5.46-1.49l-.39-.23-3.99 1.04 1.07-3.88-.25-.4a10.58 10.58 0 0 1-1.63-5.61c0-5.88 4.79-10.66 10.68-10.66 2.85 0 5.52 1.1 7.53 3.1a10.58 10.58 0 0 1 3.13 7.56c0 5.88-4.8 10.67-10.68 10.67Z" />
    </svg>
  )
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    window.setTimeout(() => {
      setSubmitted(true)
      setIsSubmitting(false)
      setFormData({ name: '', email: '', message: '' })
      window.setTimeout(() => setSubmitted(false), 5000)
    }, 1200)
  }

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Contact"
        title="Talk to our team about your next civil engineering or construction project."
        description="Send us a message and we will respond with the next practical step for your project requirements."
        imageSrc={siteImages.contact}
        imageAlt="Structural construction site ready for client consultation"
      />

      <section className="section-pad">
        <div className="container mx-auto grid gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <Reveal>
            <div className="shell border-[#d8e6fb] bg-[linear-gradient(180deg,#eef5ff_0%,#e4eefc_100%)] p-8 md:p-10">
            <SectionHeading
              eyebrow="Contact Form"
              title="Send a message"
              description="This form is ready for backend integration. For now it provides a polished front-end experience."
            />

            {submitted && (
              <div className="mt-6 rounded-[1.25rem] border border-[#CDE7D5] bg-[#EDF9F1] p-4 text-sm text-[#1F6B38]">
                Your message has been captured in this demo form and the fields have been reset.
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <motion.div whileFocus={{ scale: 1.01 }}>
                <label htmlFor="name" className="block text-sm font-semibold text-foreground">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-2xl border border-input bg-white px-4 py-3 text-foreground transition-all duration-300 focus:border-secondary focus:shadow-[0_0_0_4px_rgba(31,111,235,0.16)] focus:outline-none"
                  placeholder="Your full name"
                />
              </motion.div>
              <motion.div whileFocus={{ scale: 1.01 }}>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-2xl border border-input bg-white px-4 py-3 text-foreground transition-all duration-300 focus:border-secondary focus:shadow-[0_0_0_4px_rgba(31,111,235,0.16)] focus:outline-none"
                  placeholder="name@example.com"
                />
              </motion.div>
              <motion.div whileFocus={{ scale: 1.01 }}>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={7}
                  className="mt-2 w-full rounded-[1.5rem] border border-input bg-white px-4 py-3 text-foreground transition-all duration-300 focus:border-secondary focus:shadow-[0_0_0_4px_rgba(31,111,235,0.16)] focus:outline-none"
                  placeholder="Tell us about your project and what support you need."
                />
              </motion.div>
              <motion.button
                type="submit"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="inline-flex min-w-[170px] items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:bg-[#E66E00] hover:shadow-[0_16px_28px_rgba(255,122,0,0.28)] disabled:cursor-not-allowed disabled:opacity-90"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                      className="h-4 w-4 rounded-full border-2 border-white/35 border-t-white"
                    />
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </form>
            </div>
          </Reveal>

          <StaggerGroup className="space-y-6">
            <StaggerItem>
              <div className="shell border-[#d8e6fb] bg-[linear-gradient(180deg,#eef6ff_0%,#e5effd_100%)] p-8 md:p-10">
              <SectionHeading
                eyebrow="Contact Info"
                title="Company address and direct contact details."
              />
              <div className="mt-8 space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary" />
                  <div className="flex-1 rounded-[1.25rem] bg-white/80 p-4">
                    <p>{companyInfo.addressLine1}</p>
                    <p>{companyInfo.addressLine2}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary" />
                  <div className="flex-1 rounded-[1.25rem] bg-white/80 p-4">
                    <a href={companyInfo.phoneHref} className="block hover:text-secondary">
                      {companyInfo.phoneDisplay}
                    </a>
                    <a href={companyInfo.secondaryPhoneHref} className="mt-1 block hover:text-secondary">
                      {companyInfo.secondaryPhoneDisplay}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary" />
                  <div className="flex-1 rounded-[1.25rem] bg-white/80 p-4">
                    <a href={`mailto:${companyInfo.email}`} className="hover:text-secondary">
                      {companyInfo.email}
                    </a>
                  </div>
                </div>
              </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="rounded-[1.75rem] bg-primary p-8 text-primary-foreground shadow-[0_16px_48px_rgba(11,31,59,0.14)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Working Hours</p>
              <p className="mt-4 font-heading text-2xl font-bold">{companyInfo.hours}</p>
              <p className="mt-3 text-sm leading-7 text-white/75">{companyInfo.serviceArea}</p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="rounded-[1.75rem] bg-[#25D366] p-8 text-white shadow-[0_18px_52px_rgba(37,211,102,0.28)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">WhatsApp</p>
              <h3 className="mt-4 font-heading text-2xl font-bold">
                Get a fast response about your project on WhatsApp.
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/85">
                Send us a message now and let&apos;s talk through your construction needs, timeline, and quotation.
              </p>
              <motion.a
                href={`https://wa.me/237678620953?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#128C4A] transition-all duration-300 hover:bg-[#F4FFF8] hover:shadow-[0_16px_28px_rgba(18,140,74,0.22)]"
              >
                <WhatsAppIcon />
                Chat on WhatsApp
              </motion.a>
              </div>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>
    </div>
  )
}
