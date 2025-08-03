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
    shared_with = serializers.PrimaryKeyRelatedField(
        many=True, queryset=User.objects.all(), required=False
    )

    class Meta:
        model = Task
        fields = [
            'id', 'author', 'shared_with', 'title', 'description',
            'created_at', 'updated_at', 'completed', 'deadline', 'priority'
        ]
        extra_kwargs = {
            'author': {'read_only': True},
        }