import type { User } from "@/models/User";
import { api, apiService } from "./api";

export class UserService {
  async getUsers(): Promise<User[]> {
    const response = await api
      .get("/api/users/")
      .then((res) => res.data)
      .catch((err) => console.error("Erro ao buscar usuários", err));
    return response;
  }
}

export const userService = new UserService();
