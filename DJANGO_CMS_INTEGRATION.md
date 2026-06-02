# Django CMS Integration for PHIJETH KONSTRUCTION

This document explains how the new Django backend connects to your existing Next.js frontend.

## Backend structure

- `phijeth_cms/` - Django backend project
- `phijeth_cms/cms_app/` - Django app for CMS models and API layer
- `phijeth_cms/cms_app/models.py` - Content models for Projects, Services, Gallery, Testimonials, Team, Blog, Contact messages
- `phijeth_cms/cms_app/serializers.py` - Django REST Framework serializers
- `phijeth_cms/cms_app/views.py` - DRF viewsets
- `phijeth_cms/cms_app/urls.py` - API routes for the frontend
- `phijeth_cms/phijeth_cms/settings.py` - Django settings with CORS and media

## API endpoints

Use the Django backend as the content source for the Next.js website.

| Endpoint | Purpose |
|---|---|
| `/api/projects/` | List and manage construction projects |
| `/api/services/` | List services offered |
| `/api/gallery/` | Engineering gallery images and videos |
| `/api/testimonials/` | Client feedback entries |
| `/api/team/` | Team member profiles |
| `/api/blog/` | Engineering articles and news |
| `/api/contact/` | Accept contact form submissions |

### Example endpoint response shapes

#### Projects
- `id`
- `title`
- `project_type`
- `location`
- `client_name`
- `description`
- `start_date`
- `end_date`
- `status`
- `budget`
- `tags`
- `featured`
- `images` (nested list)
- `videos` (nested list)

#### Gallery
- `id`
- `media_type`
- `file`
- `category`
- `title`
- `description`
- `created_at`

## Next.js integration pattern

### Environment variable

Add to your Next.js environment configuration:

```env
NEXT_PUBLIC_CMS_API_BASE_URL=http://localhost:8000
```

### Example fetch helper

Create a helper in `lib/api.ts` or a similar util:

```ts
const API_BASE = process.env.NEXT_PUBLIC_CMS_API_BASE_URL

export async function fetchFromCms(path: string) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`CMS request failed: ${response.status}`)
  }

  return response.json()
}
```

### Example page-level data fetching

```tsx
import { fetchFromCms } from '@/lib/api'

export default async function ProjectsPage() {
  const projects = await fetchFromCms('/api/projects/')

  return (
    <div>
      {projects.map((project: any) => (
        <div key={project.id}>{project.title}</div>
      ))}
    </div>
  )
}
```

### Example server component for homepage data

```tsx
const apiBase = process.env.NEXT_PUBLIC_CMS_API_BASE_URL

async function getHomeData() {
  const [services, featuredProjects, testimonials, team] = await Promise.all([
    fetch(`${apiBase}/api/services/`).then((res) => res.json()),
    fetch(`${apiBase}/api/projects/?featured=true`).then((res) => res.json()),
    fetch(`${apiBase}/api/testimonials/`).then((res) => res.json()),
    fetch(`${apiBase}/api/team/`).then((res) => res.json()),
  ])
  return { services, featuredProjects, testimonials, team }
}

export default async function HomePage() {
  const { services, featuredProjects, testimonials, team } = await getHomeData()

  return (
    <main>
      <HomeFeatures services={services} />
      <FeaturedProjects projects={featuredProjects} />
      <HomeTestimonials testimonials={testimonials} />
      <TeamSection members={team} />
    </main>
  )
}
```

## Authentication & security

- Django Admin is secured by staff user credentials.
- API read operations are public by default.
- Write operations are restricted to authenticated staff users using `ReadOnlyOrAdmin`.
- Contact form POSTs are open to all, while listing messages requires staff access.
- Configure `DJANGO_ALLOWED_ORIGINS` for the Next.js frontend domain.

## Deployment guidance

### Backend
- Host the Django backend separately using Render, Railway, or a VPS.
- Use PostgreSQL for production.
- Use cloud storage for media (S3, Cloudinary, etc.) in production.
- Set environment variables:
  - `DJANGO_SECRET_KEY`
  - `DJANGO_DEBUG=False`
  - `DJANGO_ALLOWED_HOSTS`
  - `DJANGO_ALLOWED_ORIGINS`

### Frontend
- Keep the existing Next.js design.
- Replace static imports from `lib/data.ts` with API fetches to Django.
- Use `NEXT_PUBLIC_CMS_API_BASE_URL` for the API base URL.
- Deploy on Vercel and point to the backend URL.

## Best practices

- Keep the Django backend and Next.js frontend separate.
- Use a strong secret key and disable DEBUG in production.
- Use HTTPS on both frontend and backend.
- Enable backups for the database and media storage.
- Use `django-environ` or environment variables for all configuration.
- Add monitoring and alerting for the backend service.
