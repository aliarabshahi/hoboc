from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from dj_rest_auth.views import LoginView, LogoutView

# ---------------------------------------------------------------------
# API Schema View Configuration (Swagger)
# ---------------------------------------------------------------------
schema_view = get_schema_view(
    openapi.Info(
        title="Hoboc API",
        default_version='v1',
    ),
    public=True,
)

# ---------------------------------------------------------------------
# URL Patterns
# ---------------------------------------------------------------------
urlpatterns = [

    # Admin Panel
    path('hoboc/admin/', admin.site.urls),

    # API Schema Documentation (Swagger UI)
    path(
        'hoboc/api/schema/',
        schema_view.with_ui('swagger', cache_timeout=0),
        name='schema'
    ),

    # Django REST Framework Browsable API Login/Logout
    path('hoboc/api-auth/', include("rest_framework.urls")),

    # Authentication Endpoints using dj-rest-auth
    path(
        'hoboc/api/login/',
        LoginView.as_view(),
        name='api-token_login_create'
    ),
    path(
        'hoboc/api/logout/',
        LogoutView.as_view(),
        name='api-token_logout_create'
    ),

    # Main Hoboc Application API Endpoints
    path('hoboc/api/', include('hoboc.urls')),
]

# ---------------------------------------------------------------------
# Static & Media Files (for development mode)
# ---------------------------------------------------------------------
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
