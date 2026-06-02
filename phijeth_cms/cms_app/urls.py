from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProjectViewSet,
    ServiceViewSet,
    TestimonialViewSet,
    TeamMemberViewSet,
    BlogPostViewSet,
    ContactMessageViewSet,
    SiteSettingsView,
)

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')
router.register(r'team', TeamMemberViewSet, basename='team')
router.register(r'blog', BlogPostViewSet, basename='blog')
router.register(r'contact', ContactMessageViewSet, basename='contact')

urlpatterns = [
    path('', include(router.urls)),
    path('site/', SiteSettingsView.as_view(), name='site-settings'),
]
