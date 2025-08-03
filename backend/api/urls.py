from django.urls import path
from . import views

urlpatterns = [
    path("tasks/", views.TaskListCreate.as_view(), name="task-list-create"),
    path("tasks/<int:pk>/", views.TaskUpdate.as_view(), name="task-update"),
    path("tasks/delete/<int:pk>/", views.TaskDelete.as_view(), name="delete-task"),
    path("tasks/complete/<int:pk>/", views.TaskComplete.as_view(), name="complete-task"),
]