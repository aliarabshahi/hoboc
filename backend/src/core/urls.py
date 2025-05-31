from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from dj_rest_auth.views import LoginView, LogoutView
from django.conf.urls.static import static
from django.conf import settings



schema_view = get_schema_view(
    openapi.Info(
        title="Hoboc Api",
        default_version='v1',
    ),
    public=True,
)


urlpatterns = [
    path('hoboc/admin/', admin.site.urls),
    path('hoboc/api/schema/', schema_view.with_ui('swagger', cache_timeout=0), name='schema'),
    path('hoboc/api-auth/', include("rest_framework.urls")),
    path('hoboc/api/login/', LoginView.as_view(), name='api-token_login_create'),
    path('hoboc/api/logout/', LogoutView.as_view(), name='api-token_logout_create'),
    path('hoboc/api/', include('hoboc.urls')), 

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)