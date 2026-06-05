from rest_framework import serializers
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


class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ('id', 'image', 'caption', 'order')


class ProjectVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectVideo
        fields = ('id', 'url', 'file', 'caption', 'order')


class ProjectSerializer(serializers.ModelSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)
    videos = ProjectVideoSerializer(many=True, read_only=True)
    category = serializers.CharField(source='project_type')

    # Return a URL reliably across storage backends (Cloudinary or filesystem).
    image = serializers.SerializerMethodField()

    tags = serializers.SerializerMethodField()

    def get_image(self, obj):
        field = getattr(obj, 'main_image', None)
        if not field:
            return None
        try:
            return field.url
        except ValueError:
            return None


    class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'category',
            'location',
            'year',
            'description',
            'result',
            'palette',
            'image',
            'client_name',
            'start_date',
            'end_date',
            'status',
            'budget',
            'tags',
            'featured',
            'images',
            'videos',
            'created_at',
            'updated_at',
        ]

    def get_tags(self, obj):
        if not obj.tags or not isinstance(obj.tags, str):
            return []
        return [tag.strip() for tag in obj.tags.split(',') if tag.strip()]


class ServiceSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='service_name')
    highlights = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = ('id', 'title', 'description', 'icon', 'highlights', 'featured')

    def get_highlights(self, obj):
        if not obj.highlights or not isinstance(obj.highlights, str):
            return []
        return [item.strip() for item in obj.highlights.split(',') if item.strip()]


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ('id', 'client_name', 'company', 'message', 'image', 'rating', 'created_at')


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ('id', 'full_name', 'role', 'bio', 'image', 'certifications', 'created_at')


class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ('id', 'title', 'content', 'cover_image', 'author', 'publish_date', 'category', 'created_at', 'updated_at')


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ('id', 'name', 'email', 'message', 'date_received')
        read_only_fields = ('date_received',)


class SiteSettingsSerializer(serializers.ModelSerializer):
    companyInfo = serializers.SerializerMethodField()
    siteImages = serializers.SerializerMethodField()

    class Meta:
        model = SiteSettings
        fields = ('companyInfo', 'siteImages')

    def get_companyInfo(self, obj):
        return {
            'shortName': obj.short_name,
            'fullName': obj.full_name,
            'tagline': obj.tagline,
            'phoneDisplay': obj.phone_display,
            'phoneHref': obj.phone_href,
            'secondaryPhoneDisplay': obj.secondary_phone_display,
            'secondaryPhoneHref': obj.secondary_phone_href,
            'email': obj.email,
            'addressLine1': obj.address_line1,
            'addressLine2': obj.address_line2,
            'serviceArea': obj.service_area,
            'hours': obj.hours,
        }

    def get_siteImages(self, obj):
        request = self.context.get('request')
        def get_url(field):
            return request.build_absolute_uri(field.url) if field else None
            
        def get_absolute_path(path):
            if not path or not request:
                return path
            return request.build_absolute_uri(path)

        return {
            'logo': get_url(obj.logo),
            'hero': get_url(obj.hero),
            'heroSlides': [get_absolute_path(slide) for slide in (obj.hero_slides or [])],
            'about': get_url(obj.about),
            'services': get_url(obj.services),
            'projects': get_url(obj.projects),
            'contact': get_url(obj.contact),
            'team': get_url(obj.team),
            'structural': get_url(obj.structural),
        }
