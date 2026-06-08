from django.db import models

try:
    from cloudinary_storage.storage import VideoMediaCloudinaryStorage
    from cloudinary_storage.validators import validate_video
except ImportError:
    VideoMediaCloudinaryStorage = None

    def validate_video(value):
        return None


project_video_file_options = {
    'upload_to': 'projects/videos/',
    'blank': True,
    'null': True,
}
if VideoMediaCloudinaryStorage:
    project_video_file_options.update(
        storage=VideoMediaCloudinaryStorage(),
        validators=[validate_video],
    )


class Project(models.Model):
    class Status(models.TextChoices):
        ONGOING = 'ongoing', 'Ongoing'
        COMPLETED = 'completed', 'Completed'
        PLANNED = 'planned', 'Planned'

    class Palette(models.TextChoices):
        BLUE = 'blue', 'Blue'
        GREEN = 'green', 'Green'
        ORANGE = 'orange', 'Orange'
        RED = 'red', 'Red'
        GRAY = 'gray', 'Gray'
        BLACK = 'black', 'Black'
        SLATE = 'slate', 'Slate'
        STEEL = 'steel', 'Steel'

    title = models.CharField(max_length=200)
    project_type = models.CharField(max_length=100)
    category = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=200)
    year = models.CharField(max_length=10, blank=True)
    client_name = models.CharField(max_length=200, blank=True)
    description = models.TextField()
    result = models.TextField(blank=True)
    palette = models.CharField(max_length=50, choices=Palette.choices, default=Palette.BLUE)
    main_image = models.FileField(upload_to='projects/images/', blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PLANNED)
    budget = models.DecimalField(max_digits=14, decimal_places=2, blank=True, null=True)
    tags = models.CharField(max_length=255, blank=True, help_text='Comma-separated tags')
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-featured', '-start_date', '-title']

    def __str__(self):
        return self.title


class ProjectImage(models.Model):
    project = models.ForeignKey(Project, related_name='images', on_delete=models.CASCADE)
    image = models.FileField(upload_to='projects/images/')
    caption = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'Image for {self.project.title}'


class ProjectVideo(models.Model):
    project = models.ForeignKey(Project, related_name='videos', on_delete=models.CASCADE)
    url = models.URLField(blank=True)
    file = models.FileField(**project_video_file_options)
    caption = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'Video for {self.project.title}'


class Service(models.Model):
    service_name = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=100, blank=True, null=True, help_text='Icon keyword for the frontend')
    highlights = models.TextField(blank=True, help_text='Comma-separated highlights')
    featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['service_name']

    def __str__(self):
        return self.service_name


class Testimonial(models.Model):
    client_name = models.CharField(max_length=200)
    company = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    image = models.FileField(upload_to='testimonials/', blank=True, null=True)
    rating = models.PositiveSmallIntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.client_name} - {self.company or "Testimonial"}'


class TeamMember(models.Model):
    full_name = models.CharField(max_length=200)
    role = models.CharField(max_length=150)
    bio = models.TextField(blank=True)
    image = models.FileField(upload_to='team/', blank=True, null=True)
    certifications = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['full_name']

    def __str__(self):
        return self.full_name


class BlogPost(models.Model):
    CATEGORY_CHOICES = [
        ('engineering insights', 'Engineering Insights'),
        ('updates', 'Updates'),
        ('tips', 'Tips'),
    ]

    title = models.CharField(max_length=250)
    content = models.TextField()
    cover_image = models.FileField(upload_to='blog/covers/', blank=True, null=True)
    author = models.CharField(max_length=150)
    publish_date = models.DateField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='engineering insights')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-publish_date', '-created_at']

    def __str__(self):
        return self.title


class BlogImage(models.Model):
    post = models.ForeignKey(BlogPost, related_name='images', on_delete=models.CASCADE)
    image = models.FileField(upload_to='blog/images/')
    caption = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'Image for {self.post.title}'


class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=50, blank=True)
    email = models.EmailField()
    message = models.TextField()
    date_received = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date_received']

    def __str__(self):
        return f'Message from {self.name} ({self.email})'


class SiteSettings(models.Model):
    short_name = models.CharField(max_length=100, blank=True)
    full_name = models.CharField(max_length=200, blank=True)
    tagline = models.TextField(blank=True)
    phone_display = models.CharField(max_length=50, blank=True)
    phone_href = models.CharField(max_length=50, blank=True)
    secondary_phone_display = models.CharField(max_length=50, blank=True)
    secondary_phone_href = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)
    address_line1 = models.CharField(max_length=255, blank=True)
    address_line2 = models.CharField(max_length=255, blank=True)
    service_area = models.TextField(blank=True)
    hours = models.CharField(max_length=100, blank=True)

    logo = models.FileField(upload_to='site/', blank=True, null=True)
    hero = models.FileField(upload_to='site/', blank=True, null=True)
    hero_slides = models.JSONField(default=list, blank=True)
    about = models.FileField(upload_to='site/', blank=True, null=True)
    services = models.FileField(upload_to='site/', blank=True, null=True)
    projects = models.FileField(upload_to='site/', blank=True, null=True)
    contact = models.FileField(upload_to='site/', blank=True, null=True)
    team = models.FileField(upload_to='site/', blank=True, null=True)
    structural = models.FileField(upload_to='site/', blank=True, null=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Site Settings'
        verbose_name_plural = 'Site Settings'

    def __str__(self):
        return self.full_name or self.short_name or 'Site Settings'
