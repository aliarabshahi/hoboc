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
