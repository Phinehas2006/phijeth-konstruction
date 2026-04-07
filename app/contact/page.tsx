'use client'

import { useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { companyInfo } from '@/lib/data'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Contact"
        title="Talk to our team about your next civil engineering or construction project."
        description="Send us a message and we will respond with the next practical step for your project requirements."
      />

      <section className="section-pad">
        <div className="container mx-auto grid gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="shell p-8 md:p-10">
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
              <div>
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
                  className="mt-2 w-full rounded-2xl border border-input bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="Your full name"
                />
              </div>
              <div>
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
                  className="mt-2 w-full rounded-2xl border border-input bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="name@example.com"
                />
              </div>
              <div>
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
                  className="mt-2 w-full rounded-[1.5rem] border border-input bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="Tell us about your project and what support you need."
                />
              </div>
              <button
                type="submit"
                className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-[#E66E00]"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="shell p-8 md:p-10">
              <SectionHeading
                eyebrow="Contact Info"
                title="Company address and direct contact details."
              />
              <div className="mt-8 space-y-5 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary" />
                  <div>
                    <p>{companyInfo.addressLine1}</p>
                    <p>{companyInfo.addressLine2}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary" />
                  <a href={companyInfo.phoneHref} className="hover:text-secondary">
                    {companyInfo.phoneDisplay}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary" />
                  <a href={`mailto:${companyInfo.email}`} className="hover:text-secondary">
                    {companyInfo.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-primary p-8 text-primary-foreground shadow-[0_16px_48px_rgba(11,31,59,0.14)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Working Hours</p>
              <p className="mt-4 font-heading text-2xl font-bold">{companyInfo.hours}</p>
              <p className="mt-3 text-sm leading-7 text-white/75">{companyInfo.serviceArea}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
