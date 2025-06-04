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
    CoursesLessonModel
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
    
    class Meta:
        model = CoursesInstructorModel
        fields = '__all__'

class CoursesLessonSerializer(serializers.ModelSerializer):
    topic = serializers.StringRelatedField()
    instructor = CoursesInstructorSerializer(read_only=True)
    tags = CoursesTagSerializer(many=True, read_only=True)
    
    class Meta:
        model = CoursesLessonModel
        fields = '__all__'
