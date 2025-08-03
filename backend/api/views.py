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
from django.db.models import Q

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class UserListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = User.objects.exclude(id=request.user.id)
        data = [{"id": user.id, "username": user.username} for user in users]
        return Response(data)

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({"id": user.id, "username": user.username})
    
class TaskListCreate(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(
            Q(author=user) | Q(shared_with=user)
        ).distinct().order_by(
            'completed',
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
    
class ShareTaskView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            task = Task.objects.get(pk=pk, author=request.user)
        except Task.DoesNotExist:
            return Response({"detail": "Tarefa não encontrada."}, status=status.HTTP_404_NOT_FOUND)

        user_ids = request.data.get("user_ids", [])
        users = User.objects.filter(id__in=user_ids)

        if not users:
            return Response({"detail": "Usuários não encontrados."}, status=status.HTTP_400_BAD_REQUEST)

        task.shared_with.add(*users)
        return Response({"detail": "Tarefa compartilhada com sucesso."}, status=status.HTTP_200_OK)