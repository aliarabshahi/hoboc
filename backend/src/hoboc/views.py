from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, viewsets, filters
from .serializers import (
    PodcastEpisodeSerializer, ResourceSerializer, RoadmapItemSerializer,
    TestSerializer, 
    CoursesTopicSerializer,
    CoursesTagSerializer, CoursesInstructorSerializer, CoursesLessonSerializer,
    ContactUsSerializer, ProjectOrderSerializer, ResumeSubmissionSerializer,
    BlogWriterSerializer, BlogTopicSerializer, BlogTagSerializer, BlogPostSerializer,
    NotificationSubscriptionSerializer
)
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import GenericAPIView
from datetime import datetime
import os
import logging
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import (
    PodcastEpisodeModel, CoursesTopicModel, CoursesTagModel,
    CoursesInstructorModel, CoursesLessonModel, ContactUsModel, ProjectOrderModel, ResourceModel,
    ResumeSubmissionModel, BlogWriterModel, BlogTopicModel, BlogTagModel, BlogPostModel,
    NotificationSubscription, RoadmapItem
)
import threading
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.permissions import AllowAny


# ---------------------------------------------------------------------
# Email Sender
# ---------------------------------------------------------------------
def send_email_async_safe(subject, message, from_email, recipient_list):
    """Send email in background without raising errors."""
    def _send():
        try:
            send_mail(subject, message, from_email, recipient_list, fail_silently=True)
        except Exception as e:
            logging.warning(f"[AsyncEmail] Sending failed: {e}")
    threading.Thread(target=_send, daemon=True).start()
# This is how you can use it: send_email_async_safe(subject, message, settings.DEFAULT_FROM_EMAIL, [settings.ADMIN_EMAIL])


# ---------------------------------------------------------------------
# Health Check Endpoint
# ---------------------------------------------------------------------
@api_view(["GET"])
@permission_classes([])  
def health_check(request):
    """
    Health check API to verify DB connection.
    Returns:
        200: {"status": "ok"} if DB is reachable.
        503: {"status": "error", "message": "..."} if DB is not reachable.
    """
    try:
        from django.db import connections
        connections['default'].cursor()
        return Response({"status": "ok"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {"status": "error", "message": str(e)},
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )


# ---------------------------------------------------------------------
# Test API - Simple response
# ---------------------------------------------------------------------
class TestViewSet(viewsets.ViewSet):
    """
    Simple test API endpoint.
    """
    def list(self, request, *args, **kwargs):
        return Response({"message": "Hello, World!"})

    def get_serializer_class(self):
        """Return serializer for testing."""
        return TestSerializer


# ---------------------------------------------------------------------
# Pagination Classes
# ---------------------------------------------------------------------
MAX_RESULTS = os.getenv("MAX_RESULTS", 100)
PAGE_SIZE = 10


class DashboardPagination(PageNumberPagination):
    """Custom pagination with default and max page size limits."""
    page_size = PAGE_SIZE
    page_size_query_param = 'page_size'
    max_page_size = int(MAX_RESULTS)


# ---------------------------------------------------------------------
# Base API View with Logging
# ---------------------------------------------------------------------
class BaseCustomGenericApiView(GenericAPIView):
    """
    Base API class with custom logging configuration.
    All dashboard APIs inherit from this to have pagination & structured logging.
    """
    pagination_class = DashboardPagination

    # Default log variables
    log_variables_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_variables_user_name = "UNKNOWN"
    log_variables_dashboard_name = ""
    log_variables_connect_to_clickhouse = "NOT_OK"
    log_variables_query_succeed = "FAILED"
    log_variables_number_of_outputs = 0
    log_variables_query_response_time_milisec = 0

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Configure logger
        log_file_path = os.path.join('/var/log/hoboc/backend/django/', 'hoboc.log')
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)

        # Avoid duplicate handlers
        if not self.logger.handlers:
            file_handler = logging.FileHandler(log_file_path, mode='a')
            file_handler.setLevel(logging.INFO)
            formatter = logging.Formatter('%(message)s')
            file_handler.setFormatter(formatter)
            self.logger.addHandler(file_handler)

    def log_final(self):
        """Log the final structured log entry."""
        self.logger.info(
            f"{{'date': '{self.log_variables_date}', "
            f"'user_name': {self.log_variables_user_name}, "
            f"'connect_to_clickhouse': {self.log_variables_connect_to_clickhouse}, "
            f"'dashboard_name': {self.log_variables_dashboard_name}, "
            f"'query_succeed': {self.log_variables_query_succeed}, "
            f"'query_response_time_milisec': {self.log_variables_query_response_time_milisec}, "
            f"'number_of_outputs': {self.log_variables_number_of_outputs}}}"
        )

    def get_queryset(self):
        return None


# ---------------------------------------------------------------------
# Courses Management ViewSets
# ---------------------------------------------------------------------
class CoursesTopicViewSet(viewsets.ModelViewSet):
    """Manage Published Course Topics."""
    queryset = CoursesTopicModel.objects.filter(is_published=True).order_by('priority')
    serializer_class = CoursesTopicSerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        topic_slug = self.request.query_params.get('topic-slug')
        if topic_slug:
            queryset = queryset.filter(slug=topic_slug)
        return queryset


class CoursesTagViewSet(viewsets.ModelViewSet):
    """Manage Course Tags."""
    queryset = CoursesTagModel.objects.all()
    serializer_class = CoursesTagSerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]


class CoursesInstructorViewSet(viewsets.ModelViewSet):
    """Manage Course Instructors."""
    queryset = CoursesInstructorModel.objects.all()
    serializer_class = CoursesInstructorSerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]


class CoursesLessonViewSet(viewsets.ModelViewSet):
    """Manage Published Course Lessons with ordering/filter."""
    queryset = CoursesLessonModel.objects.filter(is_published=True)
    serializer_class = CoursesLessonSerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at', 'updated_at', 'title', 'duration']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = super().get_queryset()
        topic_slug = self.request.query_params.get('topic-slug')
        lesson_slug = self.request.query_params.get('lesson-slug')
        is_published = self.request.query_params.get('is_published')

        if topic_slug:
            queryset = queryset.filter(topic__slug=topic_slug)
        if lesson_slug:
            queryset = queryset.filter(slug=lesson_slug)
        if is_published:
            queryset = queryset.filter(is_published=is_published.lower() == 'true')
        return queryset


class ContactUsViewSet(viewsets.ModelViewSet):
    """Manage Contact Us messages (store + async email)."""
    queryset = ContactUsModel.objects.all()
    serializer_class = ContactUsSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [AllowAny]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at']
    ordering = ['-created_at']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        instance = serializer.save()

        subject = "پیام جدید از فرم تماس با ما هوبوک"
        message = (
            f"نام: {instance.full_name}\n"
            f"ایمیل: {instance.email}\n"
            f"تلفن: {instance.phone_number}\n"
            "----------------------------------------\n\n"
            f"پیام:\n{instance.message}\n"
        )

        # Send email asynchronously, without blocking or raising errors
        send_email_async_safe(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [settings.ADMIN_EMAIL],
        )

        # Return the normal success response (unchanged)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ProjectOrderViewSet(viewsets.ModelViewSet):
    """Manage Project Orders (store + async email)."""
    queryset = ProjectOrderModel.objects.all()
    serializer_class = ProjectOrderSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at']
    ordering = ['-created_at']

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        instance = serializer.save()

        subject = "سفارش جدید پروژه در هوبوک"
        message = (
            f"نام: {instance.full_name}\n"
            f"ایمیل: {instance.email}\n"
            f"تلفن: {instance.phone_number}\n"
            "----------------------------------------\n\n"
            f"توضیحات پروژه:\n{instance.project_description}\n\n"
            f"بودجه پیشنهادی: {instance.budget or 'ذکر نشده'}\n"
            f"ددلاین تقریبی: {instance.deadline or 'ذکر نشده'}\n"
        )

        # Send email asynchronously, without blocking or raising errors
        send_email_async_safe(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [settings.ADMIN_EMAIL],
        )

        # Return the normal success response (unchanged)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ResumeSubmissionViewSet(viewsets.ModelViewSet):
    """Manage Resume Submissions (store + async email)."""
    queryset = ResumeSubmissionModel.objects.all()
    serializer_class = ResumeSubmissionSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at']
    ordering = ['-created_at']

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        instance = serializer.save()

        subject = "ارسال جدید رزومه در هوبوک"
        message = (
            f"نام: {instance.full_name}\n"
            f"ایمیل: {instance.email}\n"
            f"تلفن: {instance.phone_number}\n"
            "----------------------------------------\n\n"
            f"لینکدین: {instance.linkedin_profile or 'ثبت نشده'}\n"
            f"گیت‌هاب: {instance.github_profile or 'ثبت نشده'}\n"
            f"فایل رزومه: "
            f"{instance.resume_file.url if instance.resume_file else 'آپلود نشده'}\n\n"
            f"متن کاور لتر:\n{instance.cover_letter or '—'}\n"
        )

        # Send email asynchronously, without blocking or raising errors
        send_email_async_safe(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [settings.ADMIN_EMAIL],
        )

        # Return the normal success response (unchanged)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)



# ---------------------------------------------------------------------
# Blog Management ViewSets
# ---------------------------------------------------------------------
class BlogTopicViewSet(viewsets.ModelViewSet):
    """Manage published blog topics."""
    queryset = BlogTopicModel.objects.filter(is_published=True)
    serializer_class = BlogTopicSerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['priority', 'created_at', 'updated_at']
    ordering = ['priority']

    def get_queryset(self):
        queryset = super().get_queryset()
        topic_slug = self.request.query_params.get('topic-slug')
        if topic_slug:
            queryset = queryset.filter(slug=topic_slug)
        return queryset


class BlogTagViewSet(viewsets.ModelViewSet):
    """Manage Blog Tags."""
    queryset = BlogTagModel.objects.all()
    serializer_class = BlogTagSerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]


class BlogWriterViewSet(viewsets.ModelViewSet):
    """Manage Blog Writers."""
    queryset = BlogWriterModel.objects.all()
    serializer_class = BlogWriterSerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]


class BlogPostViewSet(viewsets.ModelViewSet):
    """Manage published blog posts."""
    queryset = BlogPostModel.objects.filter(is_published=True)
    serializer_class = BlogPostSerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = super().get_queryset()
        topic_slug = self.request.query_params.get('topic-slug')
        post_slug = self.request.query_params.get('post-slug')
        is_published = self.request.query_params.get('is_published')

        if topic_slug:
            queryset = queryset.filter(topic__slug=topic_slug)
        if post_slug:
            queryset = queryset.filter(slug=post_slug)
        if is_published is not None:
            queryset = queryset.filter(is_published=is_published.lower() == 'true')
        return queryset


# ---------------------------------------------------------------------
# Notifications
# ---------------------------------------------------------------------
class NotificationSubscriptionViewSet(viewsets.ModelViewSet):
    """Manage Notification Subscriptions (store + async email)."""
    queryset = NotificationSubscription.objects.filter(is_active=True)
    serializer_class = NotificationSubscriptionSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']

    def perform_create(self, serializer):
        mobile = serializer.validated_data.get('mobile')
        new_topics = serializer.validated_data.get('topics', [])

        # Get or create subscription (without topics first)
        subscription, created = NotificationSubscription.objects.get_or_create(
            mobile=mobile,
            defaults={
                'email': serializer.validated_data.get('email'),
                'full_name': serializer.validated_data.get('full_name'),
            }
        )

        # If exists, update details
        if not created:
            if 'email' in serializer.validated_data:
                subscription.email = serializer.validated_data['email']
            if 'full_name' in serializer.validated_data:
                subscription.full_name = serializer.validated_data['full_name']
            subscription.save()

        # Merge existing + new topics (avoid duplicates)
        existing_topics = subscription.topics.all()
        combined_topics = list(set(existing_topics) | set(new_topics))
        subscription.topics.set(combined_topics)

        # Prepare and send notification email asynchronously
        subject = "اشتراک جدید در اطلاع‌رسانی‌های هوبوک"
        topic_titles = [t.title for t in subscription.topics.all()]
        message = (
            f"نام: {subscription.full_name or 'ثبت نشده'}\n"
            f"موبایل: {subscription.mobile}\n"
            f"ایمیل: {subscription.email or 'ثبت نشده'}\n"
            "----------------------------------------\n\n"
            f"موضوعات اشتراک:\n- " + "\n- ".join(topic_titles) + "\n\n"
            f"وضعیت اشتراک: {'فعال' if subscription.is_active else 'غیرفعال'}\n"
        )

        send_email_async_safe(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [settings.ADMIN_EMAIL],
        )


# ---------------------------------------------------------------------
# Roadmap Items
# ---------------------------------------------------------------------
class RoadmapItemViewSet(viewsets.ModelViewSet):
    """Manage Roadmap Items."""
    queryset = RoadmapItem.objects.all().prefetch_related('resources').order_by('order')
    serializer_class = RoadmapItemSerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        status_param = self.request.query_params.get('status')
        level_param = self.request.query_params.get('level')

        if status_param:
            queryset = queryset.filter(status=status_param)
        if level_param:
            queryset = queryset.filter(level=level_param)
        return queryset


# ---------------------------------------------------------------------
# Podcast Episodes
# ---------------------------------------------------------------------
class PodcastEpisodeViewSet(viewsets.ModelViewSet):
    """Manage published podcast episodes."""
    queryset = PodcastEpisodeModel.objects.filter(is_published=True)
    serializer_class = PodcastEpisodeSerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["published_at", "created_at", "title"]
    ordering = ["-published_at"]

    def get_queryset(self):
        queryset = super().get_queryset()
        slug_param = self.request.query_params.get("slug")
        if slug_param:
            queryset = queryset.filter(slug=slug_param)
        return queryset

# ---------------------------------------------------------------------
# Resource Items
# ---------------------------------------------------------------------
class ResourceViewSet(viewsets.ModelViewSet):
    """Manage Resource Items."""
    queryset = ResourceModel.objects.all().order_by('order')
    serializer_class = ResourceSerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        type_param = self.request.query_params.get('type')

        if type_param:
            queryset = queryset.filter(type=type_param)

        return queryset
