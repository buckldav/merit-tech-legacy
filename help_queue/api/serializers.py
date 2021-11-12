from rest_framework import serializers
from help_queue.models import HelpQueue


class CreateHelpQueueSerializer(serializers.ModelSerializer):

    class Meta:
        model = HelpQueue
        fields = ('name', 'question')


class HelpQueueSerializer(serializers.ModelSerializer):

    class Meta:
        model = HelpQueue
        fields = '__all__'
