import { fetchCms } from '@/lib/api'
import { companyInfo as fallbackCompany, siteImages as fallbackImages } from '@/lib/data'

export type SiteData = {
  companyInfo: typeof fallbackCompany
  siteImages: typeof fallbackImages
}

function mergeDefined<T extends Record<string, any>>(fallback: T, incoming?: Partial<T>) {
  const merged = { ...fallback }

  for (const [key, value] of Object.entries(incoming ?? {})) {
    if (value === null || value === undefined || value === '') {
      continue
    }

    if (Array.isArray(value) && value.length === 0) {
      continue
    }

    merged[key as keyof T] = value as T[keyof T]
  }

  return merged
}

/**
 * getSiteData
 * - Try to fetch site-level data from the CMS at `/api/site/`.
 * - If the endpoint or network is unavailable, fall back to the static defaults in `lib/data.ts`.
 * This is intentionally tolerant and safe so frontend remains working if the backend isn't present.
 */
export async function getSiteData(): Promise<SiteData> {
  try {
    const data = await fetchCms<any>('/api/site/')

    return {
      companyInfo: mergeDefined(fallbackCompany, data?.companyInfo),
      siteImages: mergeDefined(fallbackImages, data?.siteImages),
    }
  } catch (err) {
    return {
      companyInfo: fallbackCompany,
      siteImages: fallbackImages,
    }
  }
}

export default getSiteData
