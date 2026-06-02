# Generated migration to remove GalleryMedia model

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cms_app', '0003_alter_blogpost_cover_image_alter_project_main_image_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='GalleryMedia',
        ),
    ]
