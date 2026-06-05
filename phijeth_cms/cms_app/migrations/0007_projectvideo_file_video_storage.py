import cloudinary_storage.storage
import cloudinary_storage.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms_app', '0006_sitesettings'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectvideo',
            name='file',
            field=models.FileField(
                blank=True,
                null=True,
                storage=cloudinary_storage.storage.VideoMediaCloudinaryStorage(),
                upload_to='projects/videos/',
                validators=[cloudinary_storage.validators.validate_video],
            ),
        ),
    ]
