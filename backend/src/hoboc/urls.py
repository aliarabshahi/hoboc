from django.urls import path, include
from rest_framework.routers import SimpleRouter

from .views import (
    BlogWriterViewSet,
    NotificationSubscriptionViewSet,
    CoursesTopicViewSet,
    CoursesTagViewSet,
    CoursesInstructorViewSet,
    CoursesLessonViewSet,
    ContactUsViewSet,
    ProjectOrderViewSet,
    ResumeSubmissionViewSet,
    BlogPostViewSet,
    BlogTopicViewSet,
    BlogTagViewSet,
    RoadmapItemViewSet,
    PodcastEpisodeViewSet,
    health_check,
)
from hoboc.views import TestViewSet


# ---------------------------------------------------------------------
# Router Configuration
# ---------------------------------------------------------------------
router = SimpleRouter()

# Test API
router.register(r'test', TestViewSet, basename='test')

# Courses Management
router.register(r'course-topics', CoursesTopicViewSet, basename='course-topics')
router.register(r'course-tags', CoursesTagViewSet, basename='course-tags')
router.register(r'course-instructors', CoursesInstructorViewSet, basename='course-instructors')
router.register(r'course-lessons', CoursesLessonViewSet, basename='course-lessons')

# Forms & User Input APIs
router.register(r'contact-us', ContactUsViewSet, basename='contact-us')
router.register(r'project-orders', ProjectOrderViewSet, basename='project-orders')
router.register(r'resume-submissions', ResumeSubmissionViewSet, basename='resume-submissions')
router.register(r'notification-subscriptions', NotificationSubscriptionViewSet, basename='notification-subscriptions')

# Blog APIs
router.register(r'blog-posts', BlogPostViewSet, basename='blog-posts')
router.register(r'blog-topics', BlogTopicViewSet, basename='blog-topics')
router.register(r'blog-tags', BlogTagViewSet, basename='blog-tags')
router.register(r'blog-writers', BlogWriterViewSet, basename='blog-writers')

# Roadmap APIs
router.register(r'roadmap-items', RoadmapItemViewSet, basename='roadmap-items')

# Podcast APIs
router.register(r'podcast-episodes', PodcastEpisodeViewSet, basename='podcast-episodes')


# ---------------------------------------------------------------------
# URL Patterns
# ---------------------------------------------------------------------
urlpatterns = [
    path('', include(router.urls)),              # All router registered endpoints
    path("health/", health_check),               # Health check endpoint
]
