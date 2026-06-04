from django.apps import AppConfig


class CmsAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'cms_app'
    verbose_name = 'PHIJETH CMS'

    def ready(self):
        import os
        import sys

        if 'runserver' not in sys.argv and 'gunicorn' not in sys.argv[0]:
            return

        username = os.getenv('DJANGO_SUPERUSER_USERNAME')
        password = os.getenv('DJANGO_SUPERUSER_PASSWORD')
        email = os.getenv('DJANGO_SUPERUSER_EMAIL', '')
        if not username or not password:
            return

        try:
            from django.contrib.auth import get_user_model
            User = get_user_model()
            user, _created = User.objects.get_or_create(username=username)
            user.email = email
            user.is_staff = True
            user.is_superuser = True
            user.set_password(password)
            user.save()
        except Exception:
            pass
