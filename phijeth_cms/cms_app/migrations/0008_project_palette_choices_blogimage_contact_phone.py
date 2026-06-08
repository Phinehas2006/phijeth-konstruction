from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cms_app', '0007_projectvideo_file_video_storage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='palette',
            field=models.CharField(
                choices=[
                    ('blue', 'Blue'),
                    ('green', 'Green'),
                    ('orange', 'Orange'),
                    ('red', 'Red'),
                    ('gray', 'Gray'),
                    ('black', 'Black'),
                    ('slate', 'Slate'),
                    ('steel', 'Steel'),
                ],
                default='blue',
                max_length=50,
            ),
        ),
        migrations.AddField(
            model_name='contactmessage',
            name='phone',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.CreateModel(
            name='BlogImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.FileField(upload_to='blog/images/')),
                ('caption', models.CharField(blank=True, max_length=255)),
                ('order', models.PositiveIntegerField(default=0)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='cms_app.blogpost')),
            ],
            options={
                'ordering': ['order'],
            },
        ),
    ]
