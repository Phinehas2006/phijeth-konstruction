import { NextResponse } from 'next/server'
import { CMS_API_BASE } from '@/lib/api'

type RouteContext = {
  params: Promise<{
    path?: string[]
  }>
}

const mediaKeys = new Set([
  'image',
  'cover_image',
  'main_image',
  'file',
  'logo',
  'hero',
  'about',
  'services',
  'projects',
  'contact',
  'team',
  'structural',
])

function cleanText(value: unknown) {
  return typeof value === 'string' ? value.trim() : value
}

function toMediaProxyUrl(value?: string | null) {
  if (!value) return value
  if (/^(data:|blob:)/i.test(value)) return value

  try {
    const url = new URL(value)

    if (url.pathname.startsWith('/media/')) {
      return `/api/cms-media/${url.pathname.replace(/^\/media\/+/, '')}`
    }

    return value
  } catch {
    if (value.startsWith('/media/')) {
      return `/api/cms-media/${value.replace(/^\/media\/+/, '')}`
    }

    return value
  }
}

function normalizeItem(value: any): any {
  if (Array.isArray(value)) {
    return value.map(normalizeItem)
  }

  if (!value || typeof value !== 'object') {
    return value
  }

  const next: Record<string, any> = {}

  for (const [key, rawValue] of Object.entries(value)) {
    if (mediaKeys.has(key)) {
      next[key] = toMediaProxyUrl(cleanText(rawValue) as string | null)
    } else if (key === 'heroSlides' && Array.isArray(rawValue)) {
      next[key] = rawValue.map((slide) => toMediaProxyUrl(cleanText(slide) as string | null)).filter(Boolean)
    } else {
      next[key] = normalizeItem(rawValue)
    }
  }

  if (typeof next.full_name === 'string' && !next.name) {
    next.name = next.full_name
  }

  if (typeof next.client_name === 'string' && !next.name) {
    next.name = next.client_name
  }

  if (typeof next.company === 'string' && !next.role) {
    next.role = next.company
  }

  if (typeof next.project_type === 'string' && !next.category) {
    next.category = next.project_type
  }

  if (next.main_image && !next.image) {
    next.image = next.main_image
  }

  return next
}

function buildCmsUrl(path: string[], search: string) {
  const cleanPath = path.map(encodeURIComponent).join('/')
  const suffix = search ? `?${search}` : ''
  return `${CMS_API_BASE.replace(/\/+$/, '')}/api/${cleanPath}/${suffix}`
}

async function proxyCmsRequest(request: Request, context: RouteContext) {
  const { path = [] } = await context.params
  const requestUrl = new URL(request.url)
  const response = await fetch(buildCmsUrl(path, requestUrl.searchParams.toString()), {
    method: request.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: request.method === 'GET' || request.method === 'HEAD' ? undefined : await request.text(),
    cache: 'no-store',
  })

  const text = await response.text()
  const contentType = response.headers.get('content-type') ?? ''

  if (!contentType.includes('application/json')) {
    return new NextResponse(text, {
      status: response.status,
      headers: { 'Content-Type': contentType || 'text/plain' },
    })
  }

  const data = text ? normalizeItem(JSON.parse(text)) : null

  return NextResponse.json(data, { status: response.status })
}

export async function GET(request: Request, context: RouteContext) {
  return proxyCmsRequest(request, context)
}

export async function POST(request: Request, context: RouteContext) {
  return proxyCmsRequest(request, context)
}

export async function PUT(request: Request, context: RouteContext) {
  return proxyCmsRequest(request, context)
}

export async function PATCH(request: Request, context: RouteContext) {
  return proxyCmsRequest(request, context)
}
