from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='category',
            field=models.CharField(blank=True, default='', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='project',
            name='year',
            field=models.CharField(blank=True, default='', max_length=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='project',
            name='result',
            field=models.TextField(blank=True, default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='project',
            name='palette',
            field=models.CharField(default='blue', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='project',
            name='main_image',
            field=models.ImageField(blank=True, null=True, upload_to='projects/images/'),
        ),
        migrations.AlterField(
            model_name='service',
            name='icon',
            field=models.CharField(blank=True, help_text='Icon keyword for the frontend', max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='service',
            name='highlights',
            field=models.TextField(blank=True, default='', help_text='Comma-separated highlights'),
            preserve_default=False,
        ),
    ]
