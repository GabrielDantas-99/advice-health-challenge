import { api } from "./api";
import type { Task, CreateTaskDTO, UpdateTaskDTO } from "@/models/Task";

export class TaskService {
  async getTasks(): Promise<Task[]> {
    const response = await api.get<Task[]>("/api/tasks/");
    return response.data;
  }

  async createTask(taskData: CreateTaskDTO): Promise<Task> {
    const response = await api.post<Task>("/api/tasks/", taskData);
    return response.data;
  }

  async updateTask(id: number, taskData: UpdateTaskDTO): Promise<Task> {
    const response = await api.put<Task>(`/api/tasks/${id}/`, taskData);
    return response.data;
  }

  async deleteTask(id: number): Promise<void> {
    await api.delete(`/api/tasks/delete/${id}/`);
  }

  async toggleTaskCompletion(id: number, completed: boolean): Promise<Task> {
    const response = await api.patch<Task>(`/api/tasks/${id}/`, { completed });
    return response.data;
  }
}

export const taskService = new TaskService();
