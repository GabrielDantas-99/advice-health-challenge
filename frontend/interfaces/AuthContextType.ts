import { LoginDTO, RegisterDTO, User } from "@/models/User";

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginDTO) => Promise<boolean>;
  register: (userData: RegisterDTO) => Promise<boolean>;
  logout: () => void;
}
