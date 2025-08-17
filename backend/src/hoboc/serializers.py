from rest_framework import serializers

class TestSerializer(serializers.Serializer):
    message = serializers.CharField()

class SubscriberDashboardInputSerializer(serializers.Serializer):
    start_time = serializers.DateTimeField()
    end_time = serializers.DateTimeField()
    GW = serializers.CharField()
    Site = serializers.CharField()
    Region = serializers.CharField()
    Province = serializers.CharField()
    City = serializers.CharField()
    Top_n = serializers.IntegerField()


class SubscriberSerializer(serializers.Serializer):
    MSISDN = serializers.IntegerField()
    IMSI = serializers.CharField(max_length=20)
    Device_Brand = serializers.CharField(max_length=50)
    Uplink_Traffic = serializers.IntegerField()
    Downlink_Traffic = serializers.IntegerField()
    Total_Traffic = serializers.IntegerField()
    Total_Session = serializers.IntegerField()


from .models import (
    PostCategory,
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



class PostCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PostCategory
        fields = '__all__'

class CoursesTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoursesTopicModel
        fields = '__all__'

class CoursesTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoursesTagModel
        fields = '__all__'

class CoursesInstructorSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # Shows the string representation of the user
    name = serializers.SerializerMethodField()
    class Meta:
        model = CoursesInstructorModel
        fields = '__all__'
    def get_name(self, obj):
        return obj.name
    
class CoursesLessonSerializer(serializers.ModelSerializer):
    topic = serializers.StringRelatedField()
    instructor = CoursesInstructorSerializer(read_only=True)
    tags = CoursesTagSerializer(many=True, read_only=True)
    
    class Meta:
        model = CoursesLessonModel
        fields = '__all__'



class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUsModel
        fields = '__all__'


class ProjectFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectFile
        fields = ['file']

class ProjectOrderSerializer(serializers.ModelSerializer):
    files = ProjectFileSerializer(many=True, required=False)
    
    class Meta:
        model = ProjectOrderModel
        fields = '__all__'

    def create(self, validated_data):
        files_data = self.context.get('request').FILES
        project = ProjectOrderModel.objects.create(**validated_data)
        
        for file_data in files_data.getlist('files'):
            ProjectFile.objects.create(project=project, file=file_data)
            
        return project

class ResumeSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeSubmissionModel
        fields = '__all__'

    def validate_resume_file(self, value):
        if value:
            if value.content_type != 'application/pdf':
                raise serializers.ValidationError("فقط فایل PDF مجاز است.")
            if value.size > 5 * 1024 * 1024:
                raise serializers.ValidationError("حداکثر حجم فایل ۵ مگابایت است.")
        return value


# Blog  Serializers



class BlogTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogTopicModel
        fields = '__all__'


class BlogTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogTagModel
        fields = '__all__'


class BlogWriterSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    name = serializers.SerializerMethodField()

    class Meta:
        model = BlogWriterModel
        fields = '__all__'

    def get_name(self, obj):
        return obj.name


class BlogPostSerializer(serializers.ModelSerializer):
    topic = serializers.StringRelatedField()
    writer = BlogWriterSerializer(read_only=True)
    tags = BlogTagSerializer(many=True, read_only=True)

    class Meta:
        model = BlogPostModel
        fields = '__all__'



class NotificationSubscriptionSerializer(serializers.ModelSerializer):
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


class RoadmapResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoadmapResource
        fields = ['id', 'title', 'url', 'order']

class RoadmapItemSerializer(serializers.ModelSerializer):
    resources = RoadmapResourceSerializer(many=True, read_only=True)
    
    class Meta:
        model = RoadmapItem
        fields = ['id', 'title', 'description', 'level', 'status', 'order', 'resources']


class PodcastEpisodeSerializer(serializers.ModelSerializer):
    audio = serializers.SerializerMethodField()

    class Meta:
        model = PodcastEpisodeModel
        fields = "__all__"

    def get_audio(self, obj):
        return {
            "src": obj.audio_src,
            "type": "audio/mpeg"  # default, or detect by extension if you want
        }
