import { NextResponse } from 'next/server'
import { getSiteData } from '@/lib/site'
import { companyInfo as fallbackCompany } from '@/lib/data'

type ContactPayload = {
  name?: string
  email?: string
  message?: string
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload
  const name = body.name?.trim() || ''
  const email = body.email?.trim() || ''
  const message = body.message?.trim() || ''

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Please complete your name, email, and message.' },
      { status: 400 },
    )
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 },
    )
  }

  const resendApiKey = process.env.RESEND_API_KEY
  const resendFromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
  const resendFrom = resendFromEmail.includes('<')
    ? resendFromEmail
    : `Phijeth Konstruction <${resendFromEmail}>`

  // Resolve contact recipient: env var preferred, then site settings, then fallback static data
  let contactEmail = process.env.CONTACT_EMAIL
  if (!contactEmail) {
    try {
      const site = await getSiteData()
      contactEmail = site.companyInfo?.email ?? fallbackCompany.email
    } catch (err) {
      contactEmail = fallbackCompany.email
    }
  }

  if (!resendApiKey) {
    return NextResponse.json(
      { error: 'Email service is not configured yet. Add RESEND_API_KEY first.' },
      { status: 500 },
    )
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: resendFrom,
      to: [contactEmail],
      reply_to: email,
      subject: 'Phijeth Konstruction',
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        'Message:',
        message,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0b1f3b;">
          <h2 style="margin-bottom: 16px;">New Website Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-line;">${message}</p>
        </div>
      `,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Resend error:', errorText)

    return NextResponse.json(
      { error: 'We could not send your message right now. Please try again.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ success: true })
}
