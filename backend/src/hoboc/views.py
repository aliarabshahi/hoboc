from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import PodcastEpisodeSerializer, RoadmapItemSerializer, TestSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import GenericAPIView
from datetime import datetime
import os
import logging
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import TestSerializer, SubscriberDashboardInputSerializer, SubscriberSerializer
from rest_framework import filters


class TestViewSet(viewsets.ViewSet):
    def list(self, request, *args, **kwargs):
        return Response({"message": "Hello, World!"})
    
    # Specify the serializer class
    def get_serializer_class(self):
        return TestSerializer



MAX_RESULTS = os.getenv("MAX_RESULTS", 100)
PAGE_SIZE = 10

class DashboardPagination(PageNumberPagination):
    page_size = PAGE_SIZE  
    page_size_query_param = 'page_size'
    max_page_size = int(MAX_RESULTS)  


class BaseCustomGenericApiView(GenericAPIView):
    pagination_class = DashboardPagination

    # Define log variables:
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

        # Check if the file handler already exists to avoid duplicate handlers
        if not self.logger.handlers:
            file_handler = logging.FileHandler(log_file_path, mode='a')
            file_handler.setLevel(logging.INFO)

            # Create a custom formatter without timestamp, log level, and logger name
            formatter = logging.Formatter('%(message)s')

            file_handler.setFormatter(formatter)
            self.logger.addHandler(file_handler)


    def log_final(self):
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


class SubscriberViewSet(BaseCustomGenericApiView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]  
    permission_classes = [IsAuthenticated] 
    pagination_class = DashboardPagination
    serializer_class = SubscriberDashboardInputSerializer  # Use this for input validation

    def get(self, request):
        # Validate incoming data against SubscriberDashboardInputSerializer
        # serializer = self.serializer_class(data=request.data)
        # serializer.is_valid(raise_exception=True)

        # Sample data based on validated input
        sample_data = {
            "MSISDN": 123456789,
            "IMSI": "123456789012345",
            "Device_Brand": "Samsung",
            "Uplink_Traffic": 1000000,
            "Downlink_Traffic": 2000000,
            "Total_Traffic": 3000000,
            "Total_Session": 50
        }
        
        response_serializer = SubscriberSerializer(data=sample_data)
        response_serializer.is_valid(raise_exception=True)
        return Response(response_serializer.data, status=status.HTTP_200_OK)







from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import (
    PodcastEpisodeModel,
    PostCategory,
    CoursesTopicModel,
    CoursesTagModel,
    CoursesInstructorModel,
    CoursesLessonModel,
    ContactUsModel,
    ProjectOrderModel,
    ResumeSubmissionModel,
    BlogWriterModel,
    BlogTopicModel,
    BlogTagModel, BlogPostModel,
    NotificationSubscription,
    RoadmapItem,
)

from .serializers import (
    PostCategorySerializer,
    CoursesTopicSerializer,
    CoursesTagSerializer,
    CoursesInstructorSerializer,
    CoursesLessonSerializer,
    ContactUsSerializer,
    ProjectOrderSerializer,
    ResumeSubmissionSerializer,
    BlogWriterSerializer,
    BlogTopicSerializer,
    BlogTagSerializer,
    BlogPostSerializer,
    NotificationSubscriptionSerializer,
)

from hoboc.views import BaseCustomGenericApiView, DashboardPagination

class PostCategoryViewSet(viewsets.ModelViewSet):
    queryset = PostCategory.objects.all()
    serializer_class = PostCategorySerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

class CoursesTopicViewSet(viewsets.ModelViewSet):
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
    queryset = CoursesTagModel.objects.all()
    serializer_class = CoursesTagSerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

class CoursesInstructorViewSet(viewsets.ModelViewSet):
    queryset = CoursesInstructorModel.objects.all()
    serializer_class = CoursesInstructorSerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]


class CoursesLessonViewSet(viewsets.ModelViewSet):
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
    queryset = ContactUsModel.objects.all()
    serializer_class = ContactUsSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at']
    ordering = ['-created_at']

class ProjectOrderViewSet(viewsets.ModelViewSet):
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

class ResumeSubmissionViewSet(viewsets.ModelViewSet):
    queryset = ResumeSubmissionModel.objects.all()
    serializer_class = ResumeSubmissionSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at']
    ordering = ['-created_at']


# Blog ViewSet
class BlogTopicViewSet(viewsets.ModelViewSet):
    queryset = BlogTopicModel.objects.filter(is_published=True)
    serializer_class = BlogTopicSerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['priority', 'created_at', 'updated_at']  # Add all fields you want to allow ordering by
    ordering = ['priority']  # Default ordering if none specified

    def get_queryset(self):
        queryset = super().get_queryset()
        topic_slug = self.request.query_params.get('topic-slug')
        if topic_slug:
            queryset = queryset.filter(slug=topic_slug)
        return queryset


class BlogTagViewSet(viewsets.ModelViewSet):
    queryset = BlogTagModel.objects.all()
    serializer_class = BlogTagSerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]


class BlogWriterViewSet(viewsets.ModelViewSet):
    queryset = BlogWriterModel.objects.all()
    serializer_class = BlogWriterSerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]


class BlogPostViewSet(viewsets.ModelViewSet):
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



class NotificationSubscriptionViewSet(viewsets.ModelViewSet):
    queryset = NotificationSubscription.objects.filter(is_active=True)
    serializer_class = NotificationSubscriptionSerializer
    permission_classes = [IsAuthenticated] 
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']

    def perform_create(self, serializer):
        mobile = serializer.validated_data.get('mobile')
        new_topics = serializer.validated_data.get('topics', [])
        
        # Get or create the subscription (without topics first)
        subscription, created = NotificationSubscription.objects.get_or_create(
            mobile=mobile,
            defaults={
                'email': serializer.validated_data.get('email'),
                'full_name': serializer.validated_data.get('full_name'),
            }
        )
        
        # If subscription already exists, update email/full_name if provided
        if not created:
            if 'email' in serializer.validated_data:
                subscription.email = serializer.validated_data['email']
            if 'full_name' in serializer.validated_data:
                subscription.full_name = serializer.validated_data['full_name']
            subscription.save()
        
        # Get existing topics and merge with new ones (avoid duplicates)
        existing_topics = subscription.topics.all()
        combined_topics = list(set(existing_topics) | set(new_topics))
        
        # Update topics (add new ones without removing existing)
        subscription.topics.set(combined_topics)


class RoadmapItemViewSet(viewsets.ModelViewSet):
    queryset = RoadmapItem.objects.all().prefetch_related('resources').order_by('order')
    serializer_class = RoadmapItemSerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        # Add any filters you need
        status = self.request.query_params.get('status')
        level = self.request.query_params.get('level')
        
        if status:
            queryset = queryset.filter(status=status)
        if level:
            queryset = queryset.filter(level=level)
            
        return queryset
    

class PodcastEpisodeViewSet(viewsets.ModelViewSet):
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
        slug = self.request.query_params.get("slug")
        if slug:
            queryset = queryset.filter(slug=slug)
        return queryset
