from django.contrib import admin
from .models import (
    Project,
    ProjectImage,
    ProjectVideo,
    Service,
    Testimonial,
    TeamMember,
    BlogPost,
    ContactMessage,
    SiteSettings,
)


class ProjectImageInline(admin.StackedInline):
    model = ProjectImage
    extra = 1
    max_num = 10
    fields = ('image', 'caption', 'order')
    ordering = ['order']


class ProjectVideoInline(admin.StackedInline):
    model = ProjectVideo
    extra = 1
    max_num = 5
    fields = ('url', 'file', 'caption', 'order')
    ordering = ['order']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'project_type', 'location', 'status', 'featured', 'start_date', 'end_date')
    list_filter = ('status', 'project_type', 'featured')
    search_fields = ('title', 'location', 'client_name', 'tags')
    inlines = [ProjectImageInline, ProjectVideoInline]


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('service_name', 'featured')
    search_fields = ('service_name',)


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'company', 'rating', 'created_at')
    search_fields = ('client_name', 'company', 'message')


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'role')
    search_fields = ('full_name', 'role', 'certifications')


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'publish_date', 'category')
    list_filter = ('category', 'publish_date')
    search_fields = ('title', 'author', 'content')


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'date_received')
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('name', 'email', 'message', 'date_received')


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Company Info', {
            'fields': (
                'short_name',
                'full_name',
                'tagline',
                'phone_display',
                'phone_href',
                'secondary_phone_display',
                'secondary_phone_href',
                'email',
                'address_line1',
                'address_line2',
                'service_area',
                'hours',
            )
        }),
        ('Images', {
            'fields': (
                'logo',
                'hero',
                'hero_slides',
                'about',
                'services',
                'projects',
                'contact',
                'team',
                'structural',
            )
        }),
    )
