import { NextResponse } from 'next/server'
import { CMS_API_BASE } from '@/lib/api'

type RouteContext = {
  params: Promise<{
    path?: string[]
  }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { path = [] } = await context.params
  const mediaPath = path.map(encodeURIComponent).join('/')
  const mediaUrl = `${CMS_API_BASE.replace(/\/+$/, '')}/media/${mediaPath}`
  const response = await fetch(mediaUrl, { cache: 'no-store' })

  if (!response.ok) {
    return NextResponse.json(
      { error: `CMS media request failed with status ${response.status}` },
      { status: response.status },
    )
  }

  return new NextResponse(response.body, {
    status: response.status,
    headers: {
      'Content-Type': response.headers.get('content-type') ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
    },
  })
}
