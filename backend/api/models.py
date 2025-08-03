from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Task(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    shared_with = models.ManyToManyField(User, related_name='shared_tasks', blank=True)
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed = models.BooleanField(default=False)
    deadline = models.DateTimeField(blank=True, null=True)
    priority = models.IntegerField(default=0)

    def __str__(self):
        return self.title
