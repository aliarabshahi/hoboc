from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import TestSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import GenericAPIView
from datetime import datetime
import os
import logging
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import TestSerializer, SubscriberDashboardInputSerializer, SubscriberSerializer

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
    PostCategory,
    CoursesTopicModel,
    CoursesTagModel,
    CoursesInstructorModel,
    CoursesLessonModel
)
from .serializers import (
    PostCategorySerializer,
    CoursesTopicSerializer,
    CoursesTagSerializer,
    CoursesInstructorSerializer,
    CoursesLessonSerializer
)
from hoboc.views import BaseCustomGenericApiView, DashboardPagination

class PostCategoryViewSet(viewsets.ModelViewSet):
    queryset = PostCategory.objects.all()
    serializer_class = PostCategorySerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

class CoursesTopicViewSet(viewsets.ModelViewSet):
    queryset = CoursesTopicModel.objects.filter(is_published=True)  
    serializer_class = CoursesTopicSerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

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

    def get_queryset(self):
        queryset = super().get_queryset()
        topic_slug = self.request.query_params.get('topic')
        is_published = self.request.query_params.get('is_published')
        
        if topic_slug:
            queryset = queryset.filter(topic__slug=topic_slug)
        if is_published:
            queryset = queryset.filter(is_published=is_published.lower() == 'true')
            
        return queryset