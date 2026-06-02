from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cms_app', '0004_delete_gallerymedia'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='blogpost',
            options={'ordering': ['-publish_date', '-created_at']},
        ),
    ]
