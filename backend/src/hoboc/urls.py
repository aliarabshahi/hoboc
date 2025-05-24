from django.urls import path, include
from hoboc import views
from hoboc.views import TestViewSet, SubscriberViewSet
from rest_framework.routers import SimpleRouter


router = SimpleRouter()
router.register(r'test', TestViewSet, basename='test')

urlpatterns = [
    path('', include(router.urls)), 
    path('subscriber/', SubscriberViewSet.as_view()), 

]