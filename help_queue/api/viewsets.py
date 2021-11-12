from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from help_queue.models import HelpQueue
from help_queue.api.serializers import CreateHelpQueueSerializer, HelpQueueSerializer


class HelpQueueViewset(viewsets.ModelViewSet):
    serializer_class = HelpQueueSerializer
    queryset = HelpQueue.objects.all()
    permission_classes = [permissions.AllowAny]

    def create(self, request):
        serializer = CreateHelpQueueSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        obj = serializer.save()
        return Response(self.get_serializer(obj).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'])
    def get_queue_position(self, request, pk=None):
        obj = get_object_or_404(self.queryset, pk=pk)
        in_line_ahead = self.queryset.filter(timestamp__lte=obj.timestamp)
        return Response({
            "position": len(in_line_ahead)
        }, status=status.HTTP_200_OK)
