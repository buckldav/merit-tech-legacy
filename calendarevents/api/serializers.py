from rest_framework import serializers

from calendarevents.models import CalendarEvent 

class CalendarEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarEvent
        fields = ('id', 'date', 'text', 'course')