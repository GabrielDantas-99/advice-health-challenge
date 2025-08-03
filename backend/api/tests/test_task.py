import pytest
from api.models import Task
from django.utils import timezone
from datetime import timedelta
import json
from api.tests.conftest import user

@pytest.mark.django_db
def test_create_task(auth_client):
    data = {"title": "Test Task"}
    response = auth_client.post("/api/tasks/", data)
    assert response.status_code == 201
    assert Task.objects.filter(title="Test Task").exists()

@pytest.mark.django_db
def test_list_tasks(auth_client, user):
    Task.objects.create(
        title="T1",
        author=user,
        deadline=timezone.now() + timedelta(days=7)
    )
    response = auth_client.get("/api/tasks/")
    assert response.status_code == 200
    assert len(response.data) == 1

@pytest.mark.django_db
def test_update_task(auth_client):
    task = Task.objects.create(title="Old", author=auth_client.handler._force_user)
    url = f"/api/tasks/{task.id}/"
    payload = {"title": "New", "completed": False}
    response = auth_client.put(url, data=json.dumps(payload), content_type="application/json")
    assert response.status_code == 200
    task.refresh_from_db()
    assert task.title == "New"

@pytest.mark.django_db
def test_complete_task(auth_client):
    task = Task.objects.create(title="To complete", author=auth_client.handler._force_user)
    url = f"/api/tasks/complete/{task.id}/"  
    response = auth_client.patch(url, data={}, content_type="application/json")
    assert response.status_code == 200
    task.refresh_from_db()
    assert task.completed is True

@pytest.mark.django_db
def test_delete_task(auth_client):
    task = Task.objects.create(title="To delete", author=auth_client.handler._force_user)
    url = f"/api/tasks/delete/{task.id}/" 
    response = auth_client.delete(url)
    assert response.status_code == 204
    assert not Task.objects.filter(id=task.id).exists()

@pytest.mark.django_db
def test_share_task(auth_client, user2):
    task = Task.objects.create(title="Share", author=auth_client.handler._force_user)
    url = f"/api/tasks/{task.id}/share/"
    payload = {"user_ids": [user2.id]}
    response = auth_client.post(url, data=json.dumps(payload), content_type="application/json")
    assert response.status_code == 200
    task.refresh_from_db()
    assert user2 in task.shared_with.all()