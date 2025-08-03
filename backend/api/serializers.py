from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Task

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'author', 'title', 'description', 'created_at', 'updated_at', 'completed', 'deadline', 'priority']
        extra_kwargs = {
            'author': {'read_only': True},
        }
    
    def create(self, validated_data):
        return Task.objects.create(**validated_data)