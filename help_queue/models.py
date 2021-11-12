import uuid
from django.db import models


class HelpQueue(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100)
    question = models.TextField()

    def __str__(self):
        return f"{self.name} {self.timestamp.__str__()}"
