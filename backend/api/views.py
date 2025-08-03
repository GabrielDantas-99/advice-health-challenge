from django.shortcuts import render

from .serializers import UserSerializer, TaskSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from rest_framework import generics
from .models import Task
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.db.models.functions import Coalesce
from datetime import datetime

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class TaskListCreate(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(author=user).order_by(
        Coalesce('deadline', datetime.max)
    )
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
            
class TaskUpdate(generics.RetrieveUpdateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(author=self.request.user)
    
class TaskComplete(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            task = Task.objects.get(pk=pk, author=request.user)
        except Task.DoesNotExist:
            return Response({"detail": "Task not found."}, status=status.HTTP_404_NOT_FOUND)

        task.completed = True
        task.save()
        return Response({"detail": "Task marked as completed."}, status=status.HTTP_200_OK)
        
class TaskDelete(generics.DestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(author=user)