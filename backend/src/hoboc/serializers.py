from rest_framework import serializers

# ---------------------------------------------------------------------
# Basic Test Serializer (Non-Model)
# ---------------------------------------------------------------------
class TestSerializer(serializers.Serializer):
    """Serializer for simple test message output."""
    message = serializers.CharField()


# ---------------------------------------------------------------------
# Model Imports
# ---------------------------------------------------------------------
from .models import (
    CoursesTopicModel,
    CoursesTagModel,
    CoursesInstructorModel,
    CoursesLessonModel,
    ContactUsModel,
    ProjectFile,
    ProjectOrderModel,
    ResumeSubmissionModel,
    BlogWriterModel,
    BlogTopicModel,
    BlogTagModel,
    BlogPostModel,
    NotificationSubscription,
    RoadmapItem,
    RoadmapResource,
    PodcastEpisodeModel,
)


# ---------------------------------------------------------------------
# Courses Model Serializers
# ---------------------------------------------------------------------
class CoursesTopicSerializer(serializers.ModelSerializer):
    """Serializer for CoursesTopic model."""
    class Meta:
        model = CoursesTopicModel
        fields = '__all__'


class CoursesTagSerializer(serializers.ModelSerializer):
    """Serializer for CoursesTag model."""
    class Meta:
        model = CoursesTagModel
        fields = '__all__'


class CoursesInstructorSerializer(serializers.ModelSerializer):
    """Serializer for CoursesInstructor model with related user."""
    user = serializers.StringRelatedField()  # String representation of user
    name = serializers.SerializerMethodField()

    class Meta:
        model = CoursesInstructorModel
        fields = '__all__'

    def get_name(self, obj):
        """Return instructor's name."""
        return obj.name


class CoursesLessonSerializer(serializers.ModelSerializer):
    """Serializer for CoursesLesson model with related fields."""
    topic = serializers.StringRelatedField()  # Topic title
    topic_slug = serializers.SlugRelatedField(
        source='topic',
        read_only=True,
        slug_field='slug'
    )
    instructor = CoursesInstructorSerializer(read_only=True)
    tags = CoursesTagSerializer(many=True, read_only=True)

    class Meta:
        model = CoursesLessonModel
        fields = '__all__'


# ---------------------------------------------------------------------
# Contact & Project Serializers
# ---------------------------------------------------------------------
class ContactUsSerializer(serializers.ModelSerializer):
    """Serializer for ContactUs model."""
    class Meta:
        model = ContactUsModel
        fields = '__all__'


class ProjectFileSerializer(serializers.ModelSerializer):
    """Serializer for uploaded project files."""
    class Meta:
        model = ProjectFile
        fields = ['file']


class ProjectOrderSerializer(serializers.ModelSerializer):
    """Serializer for ProjectOrder model with file uploads."""
    files = ProjectFileSerializer(many=True, required=False)

    class Meta:
        model = ProjectOrderModel
        fields = '__all__'

    def create(self, validated_data):
        """Handle creation along with multiple file uploads."""
        files_data = self.context.get('request').FILES
        project = ProjectOrderModel.objects.create(**validated_data)

        for file_data in files_data.getlist('files'):
            ProjectFile.objects.create(project=project, file=file_data)

        return project


class ResumeSubmissionSerializer(serializers.ModelSerializer):
    """Serializer for resume submissions with PDF validation."""
    class Meta:
        model = ResumeSubmissionModel
        fields = '__all__'

    def validate_resume_file(self, value):
        """Validate uploaded resume file format and size."""
        if value:
            if value.content_type != 'application/pdf':
                raise serializers.ValidationError("فقط فایل PDF مجاز است.")
            if value.size > 5 * 1024 * 1024:
                raise serializers.ValidationError("حداکثر حجم فایل ۵ مگابایت است.")
        return value


# ---------------------------------------------------------------------
# Blog Serializers
# ---------------------------------------------------------------------
class BlogTopicSerializer(serializers.ModelSerializer):
    """Serializer for BlogTopic model."""
    class Meta:
        model = BlogTopicModel
        fields = '__all__'


class BlogTagSerializer(serializers.ModelSerializer):
    """Serializer for BlogTag model."""
    class Meta:
        model = BlogTagModel
        fields = '__all__'


class BlogWriterSerializer(serializers.ModelSerializer):
    """Serializer for BlogWriter model with user details."""
    user = serializers.StringRelatedField()
    name = serializers.SerializerMethodField()

    class Meta:
        model = BlogWriterModel
        fields = '__all__'

    def get_name(self, obj):
        """Get writer's name."""
        return obj.name


class BlogPostSerializer(serializers.ModelSerializer):
    """Serializer for BlogPost model with related topic, writer, and tags."""
    topic = serializers.StringRelatedField()
    topic_slug = serializers.SlugRelatedField(
        source='topic',
        slug_field='slug',
        read_only=True
    )
    writer = BlogWriterSerializer(read_only=True)
    tags = BlogTagSerializer(many=True, read_only=True)

    class Meta:
        model = BlogPostModel
        fields = '__all__'


# ---------------------------------------------------------------------
# Notification Serializer
# ---------------------------------------------------------------------
class NotificationSubscriptionSerializer(serializers.ModelSerializer):
    """Serializer for NotificationSubscription model with topic validation."""
    topics = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=CoursesTopicModel.objects.filter(is_published=True),
        required=True
    )

    class Meta:
        model = NotificationSubscription
        fields = '__all__'
        extra_kwargs = {
            'mobile': {'required': True},
            'is_active': {'read_only': True},
        }


# ---------------------------------------------------------------------
# Roadmap Serializers
# ---------------------------------------------------------------------
class RoadmapResourceSerializer(serializers.ModelSerializer):
    """Serializer for RoadmapResource model."""
    class Meta:
        model = RoadmapResource
        fields = ['id', 'title', 'url', 'order']


class RoadmapItemSerializer(serializers.ModelSerializer):
    """Serializer for RoadmapItem model including related resources."""
    resources = RoadmapResourceSerializer(many=True, read_only=True)

    class Meta:
        model = RoadmapItem
        fields = ['id', 'title', 'description', 'level', 'status', 'order', 'resources']


# ---------------------------------------------------------------------
# Podcast Serializer
# ---------------------------------------------------------------------
class PodcastEpisodeSerializer(serializers.ModelSerializer):
    """Serializer for PodcastEpisode model with custom audio field."""
    audio = serializers.SerializerMethodField()

    class Meta:
        model = PodcastEpisodeModel
        fields = "__all__"

    def get_audio(self, obj):
        """Return audio src and type."""
        return {
            "src": obj.audio_src,
            "type": "audio/mpeg"  # default value, could be dynamic
        }
