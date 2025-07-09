from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import (
    PostCategoryViewSet,
    CoursesTopicViewSet,
    CoursesTagViewSet,
    CoursesInstructorViewSet,
    CoursesLessonViewSet,
    ContactUsViewSet,
    ProjectOrderViewSet,
    ResumeSubmissionViewSet,
)
from hoboc.views import TestViewSet, SubscriberViewSet


router = SimpleRouter()
router.register(r'test', TestViewSet, basename='test')
router.register(r'post-categories', PostCategoryViewSet, basename='post-categories')
router.register(r'course-topics', CoursesTopicViewSet, basename='course-topics')
router.register(r'course-tags', CoursesTagViewSet, basename='course-tags')
router.register(r'course-instructors', CoursesInstructorViewSet, basename='course-instructors')
router.register(r'course-lessons', CoursesLessonViewSet, basename='course-lessons')

# Register new form APIs
router.register(r'contact-us', ContactUsViewSet, basename='contact-us')
router.register(r'project-orders', ProjectOrderViewSet, basename='project-orders')
router.register(r'resume-submissions', ResumeSubmissionViewSet, basename='resume-submissions')


urlpatterns = [
    path('', include(router.urls)),
    path('subscriber/', SubscriberViewSet.as_view()),
]
