#/src/core/setting.py

from pathlib import Path
import os
from django.conf.locale.en import formats
from .logging_config import LOGGING
import logging
import logging.config


# develop locally
''' 
    uncomment two next line for import env from .env file along the source folder. if you dont runserver will use from local sqlite db. 
    if you do it will use from defined database (docker compose db service) based on .env. 
    consider this: you must expose docker compose db port servise on special local port. so uncomment related part at db service
'''
# from dotenv import load_dotenv
# load_dotenv()

# Ensure to load logging settings after importing them
logging.config.dictConfig(LOGGING)


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-t$u)y^064*t8cx=95e!gr6mo2bghag=e1o$mu=tcfz$1xmb(%#'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv("DEBUG", "True").lower() in ("true", "1", "t")
LOG_LEVEL = os.getenv("LOG_LEVEL")
LOG_SERVER = os.getenv("LOG_SERVER")
LOG_INDEX = os.getenv("LOG_INDEX")
ALLOWED_HOSTS = ["*"]
SYNC_SIZE_LIMIT = os.getenv("SYNC_SIZE_LIMIT")



# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # # Added apps  (after creating)
    "accounts.apps.AccountsConfig",
    'hoboc.apps.HobocConfig',

    # 3rd-party apps
    'django_extensions',
    'rest_framework',
    'django_filters',
    'admin_auto_filters',
    'django_admin_listfilter_dropdown',
    'drf_yasg',
    "rest_framework.authtoken",
    "dj_rest_auth",
    'netfields',
    'corsheaders',

]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # 🔹 ADD THIS LINE FIRST
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',  # Keep this AFTER CorsMiddleware
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CORS CONFIGURATION
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
]

# Optional: If you're using cookies and credentials (e.g., login)
CORS_ALLOW_CREDENTIALS = True


ROOT_URLCONF = 'core.urls'

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

WSGI_APPLICATION = 'core.wsgi.application'



DATABASES = {
    'default': {
    'ENGINE': os.getenv('POSTGRES_ENGINE', 'django.db.backends.postgresql_psycopg2'),
    'NAME': os.getenv('POSTGRES_NAME', 'hoboc'),
    'USER': os.getenv('POSTGRES_USER', 'hobocadmin'),
    'PASSWORD': os.getenv('POSTGRES_PASSWORD', 'hobocpassword'),
    'HOST': os.getenv('POSTGRES_HOST', 'localhost'),
    'PORT': os.getenv('POSTGRES_PORT', '54322'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

formats.DATETIME_FORMAT = 'Y-m-d H:i:s'
formats.FIRST_DAY_OF_WEEK = 6


TIME_ZONE = 'Asia/Tehran'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

STATIC_ROOT = os.path.join(BASE_DIR, "static/")
STATIC_URL = '/hoboc/static/'
MEDIA_URL = '/hoboc/media/'
WEB_URL = '/hoboc/web/'

# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR, 'static'),
# ]


# STATIC_ROOT = os.path.join(BASE_DIR, "static")
MEDIA_ROOT = os.getenv("MEDIA_ROOT", os.path.join(BASE_DIR, "media/"))

# WEB_ROOT = os.path.join(BASE_DIR, "web/")
LOGIN_URL = '/hoboc/api-auth/login/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


REST_FRAMEWORK = {
"DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.TokenAuthentication",
    ],
'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
    ],
'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20  

}


DATA_UPLOAD_MAX_MEMORY_SIZE = 50857600

AUTH_USER_MODEL = "accounts.CustomUser"