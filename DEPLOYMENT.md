# Deployment Plan - PHIJETH KONSTRUCTION

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Setup](#environment-setup)
3. [Backend Deployment (Django)](#backend-deployment-django)
4. [Frontend Deployment (Next.js)](#frontend-deployment-nextjs)
5. [Database & Migrations](#database--migrations)
6. [Post-Deployment Verification](#post-deployment-verification)

---

## Pre-Deployment Checklist

### Code Review
- [ ] All TypeScript files have zero errors
- [ ] All Django Python files validated
- [ ] All secrets removed from codebase
- [ ] `.env` variables documented
- [ ] Git history cleaned (no sensitive data)

### Testing
- [ ] Blog section working (homepage + listing + detail pages)
- [ ] Project media carousel functional (images + videos)
- [ ] Count-up animations smooth
- [ ] Featured project modals responsive
- [ ] Image alt text complete on all pages
- [ ] API endpoints tested (projects, blog, services, team, testimonials)
- [ ] Contact form tested (email delivery)

### Infrastructure Decisions
- [ ] Choose hosting platform (Vercel, AWS, DigitalOcean, Heroku, etc.)
- [ ] Choose database (PostgreSQL recommended over SQLite for production)
- [ ] Choose storage for media files (AWS S3, Cloudinary, etc.)
- [ ] Domain registered and DNS configured
- [ ] SSL certificate obtained

---

## Environment Setup

### 1. Production Environment Variables

**Backend (.env in `phijeth_cms/`):**
```env
# Django Settings
DEBUG=False
SECRET_KEY=<generate-strong-secret>
DJANGO_ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

# Database (switch from SQLite to PostgreSQL)
DATABASE_URL=postgresql://user:password@host:5432/phijeth_db

# CORS Settings
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Optional: Email Configuration
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=<app-specific-password>
```

**Frontend (.env.local in root):**
```env
NEXT_PUBLIC_CMS_API_BASE_URL=https://api.yourdomain.com
# or if backend is on same domain:
NEXT_PUBLIC_CMS_API_BASE_URL=https://yourdomain.com/api
```

### 2. Generate Django Secret Key
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### 3. Database Migration (SQLite → PostgreSQL)

**Install PostgreSQL driver:**
```bash
pip install psycopg2-binary
```

**Create production database:**
```bash
# In PostgreSQL
createdb phijeth_db
```

---

## Backend Deployment (Django)

### Option 1: Vercel (Recommended for Full-Stack)
1. Install Vercel CLI
2. Configure serverless functions for Django (or use Railway for backend)
3. Set environment variables in Vercel dashboard
4. Deploy with: `vercel deploy`

### Option 2: DigitalOcean / AWS / Heroku

**1. Create Virtual Environment**
```bash
cd phijeth_cms
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

**2. Install Production Server**
```bash
pip install gunicorn whitenoise
```

**3. Collect Static Files**
```bash
python manage.py collectstatic --no-input
```

**4. Run Migrations**
```bash
python manage.py migrate
```

**5. Create Superuser**
```bash
python manage.py createsuperuser
```

**6. Test Production Settings**
```bash
python manage.py check --deploy
```

**7. Start Gunicorn Server**
```bash
gunicorn phijeth_cms.wsgi:application --bind 0.0.0.0:8000 --workers 4
```

**8. Configure Nginx (Reverse Proxy)**
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static/ {
        alias /path/to/phijeth_cms/staticfiles/;
    }

    location /media/ {
        alias /path/to/phijeth_cms/media/;
    }
}
```

**9. Set Up SSL with Let's Encrypt**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

**10. Configure systemd Service** (for automatic restart)
Create `/etc/systemd/system/phijeth-django.service`:
```ini
[Unit]
Description=PHIJETH Django Application
After=network.target

[Service]
Type=notify
User=www-data
WorkingDirectory=/path/to/phijeth_cms
ExecStart=/path/to/venv/bin/gunicorn phijeth_cms.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 4
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl enable phijeth-django
sudo systemctl start phijeth-django
```

---

## Frontend Deployment (Next.js)

### Option 1: Vercel (Easiest for Next.js)
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_CMS_API_BASE_URL=https://api.yourdomain.com`
4. Vercel auto-deploys on push

**Performance Optimization:**
- Enable Image Optimization (default in Vercel)
- Set caching headers for static assets
- Enable Edge Functions for dynamic routes

### Option 2: Self-Hosted (DigitalOcean / AWS)

**1. Build Next.js**
```bash
npm run build
```

**2. Install Dependencies in Production**
```bash
npm install --production
```

**3. Start Production Server**
```bash
npm start
```

**4. Configure Nginx for Next.js**
```nginx
upstream nextjs_upstream {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://nextjs_upstream;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Cache static assets
    location /_next/static/ {
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    location /public/ {
        expires 365d;
        add_header Cache-Control "public, immutable";
    }
}
```

**5. Use PM2 for Process Management**
```bash
npm install -g pm2
pm2 start "npm start" --name "phijeth-frontend"
pm2 startup
pm2 save
```

---

## Database & Migrations

### 1. Apply Migrations
```bash
cd phijeth_cms
python manage.py migrate
```

This will:
- Create all tables (Project, ProjectImage, ProjectVideo, BlogPost, etc.)
- Apply the GalleryMedia deletion migration
- Set up Django admin tables

### 2. Backup Strategy
```bash
# PostgreSQL backup
pg_dump phijeth_db > backup.sql

# Automated daily backups (cron job)
0 2 * * * pg_dump phijeth_db > /backups/phijeth_db_$(date +\%Y\%m\%d).sql
```

### 3. Media Files Storage

**Option 1: Local File System**
- Store in `phijeth_cms/media/` directory
- Ensure proper permissions: `chmod 755 media/`

**Option 2: AWS S3 (Recommended for Scale)**
```bash
pip install django-storages boto3
```

Update `settings.py`:
```python
if not DEBUG:
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    AWS_STORAGE_BUCKET_NAME = 'your-bucket'
    AWS_S3_REGION_NAME = 'us-east-1'
    AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
```

---

## Post-Deployment Verification

### 1. API Endpoint Tests
```bash
# Test each endpoint
curl https://yourdomain.com/api/projects/
curl https://yourdomain.com/api/blog/
curl https://yourdomain.com/api/services/
curl https://yourdomain.com/api/team/
curl https://yourdomain.com/api/testimonials/
curl https://yourdomain.com/api/contact/
curl https://yourdomain.com/api/site/
```

### 2. Django Admin Access
```
https://yourdomain.com/admin/
- Login with superuser credentials
- Verify all models appear correctly
- Check that GalleryMedia model is removed
```

### 3. Frontend Verification
```
https://yourdomain.com/
- [ ] Homepage loads correctly
- [ ] Blog section displays (3 featured posts)
- [ ] Projects section with carousel working
- [ ] Services, team, testimonials display
- [ ] Navigation links work
- [ ] Contact form submits successfully
- [ ] Images load properly
- [ ] Animations smooth (count-up, modals)
```

### 4. Browser Dev Tools
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Network requests to API successful
- [ ] Images optimized (Next.js Image component)
- [ ] No mixed content warnings (all HTTPS)

### 5. Mobile Responsiveness
- [ ] Test on iOS/Android
- [ ] All layouts responsive
- [ ] Touch interactions work
- [ ] Images display correctly

### 6. Performance Testing
```bash
# Google Lighthouse
# Check: Performance, Accessibility, Best Practices, SEO
```

---

## SSL/TLS Certificate Setup

### Using Let's Encrypt (Free)
```bash
# If using Nginx + Certbot
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal cron
0 3 * * * certbot renew --quiet
```

### Certificate Renewal
- Let's Encrypt certificates valid for 90 days
- Auto-renewal set up by default with Vercel/managed hosts
- Manual renewal: `certbot renew`

---

## Monitoring & Maintenance

### 1. Error Logging
- **Django**: Configure Sentry for error tracking
```bash
pip install sentry-sdk
```

- **Next.js**: Use Vercel Analytics or similar

### 2. Database Backups
- Daily automated backups (3 months retention)
- Test restore procedure monthly

### 3. Updates
- Monthly security patches
- Quarterly Django/Next.js updates
- Review dependencies: `pip list --outdated`

### 4. Performance Monitoring
- Monitor API response times
- Track database query performance
- Monitor frontend bundle size

### 5. Health Check Endpoint
```bash
curl https://yourdomain.com/api/site/
# Should return 200 with site settings
```

---

## Rollback Plan

### If Issues Occur:
1. **Frontend**: Vercel keeps previous deployments; rollback with one click
2. **Backend**: 
   ```bash
   git revert <commit-hash>
   git push
   # Re-deploy via CI/CD or manual restart
   ```
3. **Database**: Restore from backup
   ```bash
   psql phijeth_db < backup.sql
   ```

---

## Estimated Timeline

| Phase | Duration | Tasks |
|-------|----------|-------|
| **Pre-Deployment** | 1-2 days | Environment setup, testing, documentation |
| **Backend Deployment** | 2-4 hours | Django setup, database migration, SSL |
| **Frontend Deployment** | 1-2 hours | Next.js build, Vercel deployment |
| **Verification** | 2-4 hours | Testing all features, performance check |
| **Go-Live** | 1 hour | DNS switch, final verification |
| **Post-Launch** | 24 hours | Monitor errors, user feedback |

**Total: 2-3 days to production-ready**

---

## Support & Rollback Contacts
- Hosting Provider Support: [Your provider]
- Domain Registrar: [Your registrar]
- Database Admin: [Your contact]
- Emergency Contact: [Your contact]

---

## Deployment Checklist (Final)

- [ ] All code committed and pushed
- [ ] Environment variables configured
- [ ] Database backups tested
- [ ] SSL certificates ready
- [ ] DNS records prepared
- [ ] Team notified of deployment window
- [ ] Rollback plan understood by team
- [ ] Monitoring setup complete
- [ ] Support contacts documented
- [ ] Post-deployment testing plan ready

**Ready to deploy!** ✅
