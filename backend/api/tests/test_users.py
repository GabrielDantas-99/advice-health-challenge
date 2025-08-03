import pytest

@pytest.mark.django_db
def test_create_user(api_client):
    response = api_client.post("/api/user/register/", {
        "username": "newuser",
        "password": "securepass"
    })
    assert response.status_code == 201

@pytest.mark.django_db
def test_user_list_excludes_current(auth_client, user2):
    response = auth_client.get("/api/users/")
    assert response.status_code == 200
    usernames = [u["username"] for u in response.data]
    assert "john" not in usernames
    assert "jane" in usernames

@pytest.mark.django_db
def test_current_user(auth_client):
    response = auth_client.get("/api/me/")
    assert response.status_code == 200
    assert response.data["username"] == "john"
