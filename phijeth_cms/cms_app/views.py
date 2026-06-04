from rest_framework import viewsets, mixins
from .models import (
    Project,
    Service,
    Testimonial,
    TeamMember,
    BlogPost,
    ContactMessage,
)
from .serializers import (
    ProjectSerializer,
    ServiceSerializer,
    TestimonialSerializer,
    TeamMemberSerializer,
    BlogPostSerializer,
    ContactMessageSerializer,
    SiteSettingsSerializer,
)
from .permissions import ReadOnlyOrAdmin, ContactMessagePermission
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import SiteSettings


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.prefetch_related('images', 'videos').all()
    serializer_class = ProjectSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ['project_type', 'status', 'featured']
    search_fields = ['title', 'location', 'client_name', 'tags']


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [ReadOnlyOrAdmin]
    search_fields = ['service_name']


class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [ReadOnlyOrAdmin]


class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [ReadOnlyOrAdmin]


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ['category']
    search_fields = ['title', 'author', 'content']


class ContactMessageViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [ContactMessagePermission]
    filterset_fields = ['email', 'date_received']


class SiteSettingsView(APIView):
    """Return a single JSON object with `companyInfo` and `siteImages`.

    This keeps the frontend shape consistent with `lib/data.ts` so the
    client can use the data directly (or fall back to static defaults).
    """
    permission_classes = [ReadOnlyOrAdmin]

    def get(self, request):
        settings = SiteSettings.objects.order_by('-id').first()
        if not settings:
            return Response({'companyInfo': {}, 'siteImages': {}})
        serializer = SiteSettingsSerializer(settings, context={'request': request})
        return Response(serializer.data)
