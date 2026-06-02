# PHIJETH CMS

This directory contains the Django-based CMS backend for the PHIJETH KONSTRUCTION website.

## What is included

- Django project: `phijeth_cms`
- CMS app: `cms_app`
- REST API endpoints for projects, services, gallery, testimonials, team, blog, and contact messages
- Django Admin configuration for non-technical content editors
- Media handling for uploaded images and videos
- CORS support for a separate Next.js frontend

## Installation

1. Create or activate your Python virtual environment.
2. Install dependencies:

```bash
python -m pip install -r requirements.txt
```

3. Copy the environment example:

```bash
copy .env.example .env
```

4. Update `.env` values, especially `DJANGO_SECRET_KEY`.

5. Run migrations:

```bash
python manage.py migrate
```

6. Create a superuser for Django Admin:

```bash
python manage.py createsuperuser
```

7. Start the development server:

```bash
python manage.py runserver
```

On this Windows/MSYS setup, the working local command is:

```powershell
..\.venv-msys\bin\python.exe manage.py runserver
```

## Local development

Once the server is running, the admin dashboard is available at:

- `http://127.0.0.1:8000/admin/`

The API root is available at:

- `http://127.0.0.1:8000/api/`

## Core API endpoints

- `GET /api/projects/`
- `GET /api/services/`
- `GET /api/gallery/`
- `GET /api/testimonials/`
- `GET /api/team/`
- `GET /api/blog/`
- `POST /api/contact/`

## Media files

Uploaded image and video files are stored in the `media/` folder locally.
In production, update `MEDIA_ROOT` and `MEDIA_URL` to use cloud storage such as S3.

## Production notes

- Use a secure `DJANGO_SECRET_KEY`
- Set `DJANGO_DEBUG=False`
- Set `DJANGO_ALLOWED_HOSTS` to your deployed backend domain
- Configure CORS origins for your frontend URL
- Use a production-grade database (PostgreSQL is recommended)
- Use cloud media storage for images/videos if volume grows
