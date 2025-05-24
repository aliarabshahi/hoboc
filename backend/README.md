# Hoboc Backend

This is the **Django backend** for the **Hoboc** website. It is containerized with Docker and designed to be run easily in development and production environments.

---

## 🚀 Quick Start (Using Docker)

### 1. Build the Docker image

```bash
docker build -t hoboc_web:latest .
```

### 2. Run the containers

```bash
docker compose up --build
```



## 📁 Project Structure

```

├── docker-compose.yml
├── Dockerfile
├── etc
│   ├── docker-compose.prod.yml
│   ├── env-sample
│   ├── nginx
│   │   ├── Dockerfile
│   │   └── nginx.conf
│   └── web
│       └── gunicorn_sample.py
├── gunicorn.py
├── README.md
├── requirements.txt
└── src
    ├── accounts
    │   ├── __init__.py
    │   ├── admin.py
    │   ├── apps.py
    │   ├── forms.py
    │   ├── migrations
    │   │   ├── __init__.py
    │   │   └── ...
    │   ├── models.py
    │   ├── tests.py
    │   └── views.py
    ├── core
    │   ├── __init__.py
    │   ├── asgi.py
    │   ├── logging_config.py
    │   ├── settings.py
    │   ├── urls.py
    │   └── wsgi.py
    ├── hoboc
    │   ├── __init__.py
    │   ├── admin.py
    │   ├── apps.py
    │   ├── migrations
    │   │   ├── __init__.py
    │   │   └── ...
    │   ├── models.py
    │   ├── serializers.py
    │   ├── tests.py
    │   ├── urls.py
    │   └── views.py
    ├── manage.py
    └── static

```
## 🛠️ Local Development Setup (Without Docker)

**Required Python Version:** `3.11.9`

## ✅ Notes

- Be sure to configure your `.env` file correctly (you can copy from `.env.example`).
- For **production use**, make sure to update:
  - `DEBUG = False`
  - `ALLOWED_HOSTS` (add your domain or server IP)
  - Database credentials and other sensitive settings
