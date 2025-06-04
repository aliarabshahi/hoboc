from django.urls import path, include
from hoboc import views
from hoboc.views import TestViewSet, SubscriberViewSet
from rest_framework.routers import SimpleRouter
from .views import (
    PostCategoryViewSet,
    CoursesTopicViewSet,
    CoursesTagViewSet,
    CoursesInstructorViewSet,
    CoursesLessonViewSet
)


router = SimpleRouter()
router.register(r'test', TestViewSet, basename='test')
router.register(r'post-categories', PostCategoryViewSet, basename='post-categories')
router.register(r'course-topics', CoursesTopicViewSet, basename='course-topics')
router.register(r'course-tags', CoursesTagViewSet, basename='course-tags')
router.register(r'course-instructors', CoursesInstructorViewSet, basename='course-instructors')
router.register(r'course-lessons', CoursesLessonViewSet, basename='course-lessons')

urlpatterns = [
    path('', include(router.urls)), 
    path('subscriber/', SubscriberViewSet.as_view()), 

]