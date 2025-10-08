from pathlib import Path
import os
import logging
import logging.config

from django.conf.locale.en import formats

from .logging_config import LOGGING

# ---------------------------------------------------------------------
# Logging Configuration
# ---------------------------------------------------------------------
# Ensure to load logging settings after importing them
logging.config.dictConfig(LOGGING)

# ---------------------------------------------------------------------
# Local Development Environment (Optional)
# ---------------------------------------------------------------------
"""
Uncomment the next two lines to load environment variables from a local `.env` file
if you're developing locally without Docker.
This will override database settings to use the local SQLite/Postgres 
based on `.env` configuration.

⚠ NOTE:
If using Docker, ensure DB service port is exposed and matching the defined values in `.env`.
"""
# from dotenv import load_dotenv
# load_dotenv()

# ---------------------------------------------------------------------
# Paths & Core Settings
# ---------------------------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-t$u)y^064*t8cx=95e!gr6mo2bghag=e1o$mu=tcfz$1xmb(%#'
DEBUG = os.getenv("DEBUG", "True").lower() in ("true", "1", "t")

LOG_LEVEL = os.getenv("LOG_LEVEL")
LOG_SERVER = os.getenv("LOG_SERVER")
LOG_INDEX = os.getenv("LOG_INDEX")
ALLOWED_HOSTS = ["*"]
SYNC_SIZE_LIMIT = os.getenv("SYNC_SIZE_LIMIT")

# ---------------------------------------------------------------------
# Installed Apps
# ---------------------------------------------------------------------
INSTALLED_APPS = [
    # Default Django apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Local apps
    "accounts.apps.AccountsConfig",
    'hoboc.apps.HobocConfig',

    # 3rd-party apps
    'django_extensions',
    'rest_framework',
    'django_filters',
    'admin_auto_filters',
    'django_admin_listfilter_dropdown',
    'drf_yasg',
    'rest_framework.authtoken',
    'dj_rest_auth',
    'netfields',
    'corsheaders',
    'admin_reorder',

]

# ---------------------------------------------------------------------
# Middleware
# ---------------------------------------------------------------------
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',   
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',  
    'admin_reorder.middleware.ModelAdminReorder',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ADMIN_REORDER = [
    # 1. Accounts section (custom user model)
    {'app': 'accounts', 'label': 'Accounts', 'models': [
        'accounts.CustomUser',  # replace with your actual user model class name if different
    ]},

    # 2. Auth Token section
    {'app': 'authtoken', 'label': 'Auth Token', 'models': [
        'authtoken.Token',
    ]},

    # 3. Built-in Django Auth section
    {'app': 'auth', 'label': 'Authentication and Authorization', 'models': [
        'auth.Group',
        'auth.Permission',
    ]},

    # 4. Courses
    {'app': 'hoboc', 'label': 'Courses', 'models': [
        'hoboc.CoursesLessonModel',
        'hoboc.CoursesTopicModel',
        'hoboc.CoursesTagModel',
        'hoboc.CoursesInstructorModel',
    ]},

    # 5. Blog
    {'app': 'hoboc', 'label': 'Blog', 'models': [
        'hoboc.BlogPostModel',
        'hoboc.BlogTopicModel',
        'hoboc.BlogTagModel',
        'hoboc.BlogWriterModel',
    ]},

    # 6. Podcast
    {'app': 'hoboc', 'label': 'Podcast', 'models': [
        'hoboc.PodcastEpisodeModel',
    ]},

    # 7. Roadmap
    {'app': 'hoboc', 'label': 'Roadmap', 'models': [
        'hoboc.RoadmapItem',
    ]},

    # 8. Resources
    {'app': 'hoboc', 'label': 'Resource', 'models': [
        'hoboc.ResourceModel',
    ]},

    # 9. Forms
    {'app': 'hoboc', 'label': 'Forms', 'models': [
        'hoboc.ContactUsModel',
        'hoboc.ProjectOrderModel',
        'hoboc.ResumeSubmissionModel',
        'hoboc.NotificationSubscription',
    ]},
]


# ---------------------------------------------------------------------
# CORS Configuration
# ---------------------------------------------------------------------
CORS_ALLOWED_ORIGINS = [
    "http://hoboc.ir",
    "https://hoboc.ir",
    "http://easytg.ir",
    "https://easytg.ir",
    "http://localhost",
    "http://185.204.168.255",  
    "http://103.130.147.37",    
    "http://localhost:3000", 
    "http://127.0.0.1:3000", 
    "http://nginx:80",
    "http://localhost:80",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:3002",
    "http://127.0.0.1:3003",
    "http://hoboc_frontend:3000",
    "http://frontend:3000",
]
CSRF_TRUSTED_ORIGINS = [
    "http://hoboc.ir",
    "https://hoboc.ir",
    "http://easytg.ir",
    "https://easytg.ir",
    "http://185.204.168.255",
    "http://103.130.147.37",
    "http://localhost",       
    "http://localhost:3000", 
    "http://127.0.0.1:3000",  
    "http://nginx:80",
    "http://localhost:80",
    "http://localhost:3000",
    "http://frontend:3000",
    "http://hoboc_frontend:3000",
]

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True  # For cookies/credentials
X_FRAME_OPTIONS = 'SAMEORIGIN'
# CORS_URLS_REGEX = r'^/hoboc/media/.*$'

# ---------------------------------------------------------------------
# URL & WSGI
# ---------------------------------------------------------------------
ROOT_URLCONF = 'core.urls'
WSGI_APPLICATION = 'core.wsgi.application'

# ---------------------------------------------------------------------
# Templates
# ---------------------------------------------------------------------
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# ---------------------------------------------------------------------
# Database Configuration
# ---------------------------------------------------------------------
DATABASES = {
    'default': {
        'ENGINE': os.getenv(
            'POSTGRES_ENGINE', 'django.db.backends.postgresql_psycopg2'
        ),
        'NAME': os.getenv('POSTGRES_NAME', 'hoboc'),
        'USER': os.getenv('POSTGRES_USER', 'hobocadmin'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD', 'hobocpassword'),
        'HOST': os.getenv('POSTGRES_HOST', 'localhost'),
        'PORT': os.getenv('POSTGRES_PORT', '54322'),
    }
}

# ---------------------------------------------------------------------
# Password Validation
# ---------------------------------------------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ---------------------------------------------------------------------
# Internationalization
# ---------------------------------------------------------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Tehran'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Custom date & localization formats
formats.DATETIME_FORMAT = 'Y-m-d H:i:s'
formats.FIRST_DAY_OF_WEEK = 6

# ---------------------------------------------------------------------
# Static / Media Files
# ---------------------------------------------------------------------
STATIC_URL = '/hoboc/static/'
STATIC_ROOT = os.path.join(BASE_DIR, "static/")
MEDIA_URL = '/hoboc/media/'
MEDIA_ROOT = os.getenv("MEDIA_ROOT", os.path.join(BASE_DIR, "media/"))
WEB_URL = '/hoboc/web/'

# ---------------------------------------------------------------------
# Authentication
# ---------------------------------------------------------------------
LOGIN_URL = '/hoboc/api-auth/login/'
AUTH_USER_MODEL = "accounts.CustomUser"

# ---------------------------------------------------------------------
# Django REST Framework Configuration
# ---------------------------------------------------------------------
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.TokenAuthentication",
    ],
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 20,
}


# ---------------------------------------------------------------------
# Upload Settings
# ---------------------------------------------------------------------
DATA_UPLOAD_MAX_MEMORY_SIZE = 50_857_600  # ~50 MB

# ---------------------------------------------------------------------
# Default Primary Key Field Type
# ---------------------------------------------------------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ---------------------------------------------------------------------
# Make Https Insted Of Http For Deployment      (ONLY FOR DEVELOPMENT)
# ---------------------------------------------------------------------
# SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
# SECURE_SSL_REDIRECT = True
