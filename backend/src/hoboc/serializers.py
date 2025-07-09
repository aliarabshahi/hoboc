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
    ProjectOrderModel,
    ResumeSubmissionModel
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


class ProjectOrderSerializer(serializers.ModelSerializer):  
    class Meta:
        model = ProjectOrderModel
        fields = '__all__'


class ResumeSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeSubmissionModel
        fields = '__all__'
        
    def validate_resume_file(self, value):
        if value.content_type != 'application/pdf':
            raise serializers.ValidationError("فقط فایل PDF مجاز است.")
        if value.size > 5 * 1024 * 1024:
            raise serializers.ValidationError("حداکثر حجم فایل ۵ مگابایت است.")
        return value
