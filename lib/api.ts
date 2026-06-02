export const CMS_API_BASE =
  process.env.CMS_API_BASE_URL ||
  process.env.NEXT_PUBLIC_CMS_API_BASE_URL ||
  'http://localhost:8000'

const CMS_PROXY_BASE = '/api/cms'

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, '')
}

function withLeadingSlash(value: string) {
  return value.startsWith('/') ? value : `/${value}`
}

export function toCmsAbsoluteUrl(value?: string | null) {
  if (!value) return value
  if (/^(https?:|data:|blob:)/i.test(value)) return value
  return `${trimTrailingSlash(CMS_API_BASE)}${withLeadingSlash(value)}`
}

function getRequestUrl(path: string) {
  const normalizedPath = withLeadingSlash(path)

  if (typeof window === 'undefined') {
    return `${trimTrailingSlash(CMS_API_BASE)}${normalizedPath}`
  }

  const proxyPath = normalizedPath.replace(/^\/api\/?/, '/').replace(/\/+$/, '')
  return `${CMS_PROXY_BASE}${proxyPath}`
}

export async function fetchCms<T = any>(path: string) {
  const response = await fetch(getRequestUrl(path), {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`CMS request failed (${response.status}): ${errorText}`)
  }

  return (await response.json()) as T
}
