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
    image = serializers.ImageField(source='main_image', allow_null=True)

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

    def validate_images(self, value):
        """Limit to 10 images per project"""
        if len(value) > 10:
            raise serializers.ValidationError("A project can have a maximum of 10 images.")
        return value

    def validate_videos(self, value):
        """Limit to 5 videos per project"""
        if len(value) > 5:
            raise serializers.ValidationError("A project can have a maximum of 5 videos.")
        return value


class ServiceSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='service_name')
    highlights = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = ('id', 'title', 'description', 'icon', 'highlights', 'featured')

    def get_highlights(self, obj):
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
