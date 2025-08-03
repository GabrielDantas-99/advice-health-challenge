import type { LoginDTO, RegisterDTO, AuthResponse } from "@/models/User";
import { api, apiService } from "./api";

export class AuthService {
  async login(credentials: LoginDTO): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/api/token/", credentials);

    if (response.data.access && response.data.refresh) {
      apiService.setAuthTokens(response.data.access, response.data.refresh);
    }

    return response.data;
  }

  async register(userData: RegisterDTO): Promise<void> {
    console.log(userData);
    await api.post("/api/user/register/", userData);
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/api/token/refresh/", {
      refresh: refreshToken,
    });
    return response.data;
  }

  logout(): void {
    apiService.clearAuthTokens();
  }

  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("access_token");
  }
}

export const authService = new AuthService();
