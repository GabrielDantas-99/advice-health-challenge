"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, LoginDTO, RegisterDTO } from "@/models/User"
import { authService } from "@/services/AuthService"
import { useToast } from "./ToastContext"
import { AuthContextType } from "@/interfaces/AuthContextType"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const { showToast } = useToast()

    const isAuthenticated = authService.isAuthenticated()

    useEffect(() => {

        const checkAuth = async () => {
            try {
                if (isAuthenticated) {
                    // TODO: Implementar busca de usuario
                    // const userData = await userService.getCurrentUser();
                    // setUser(userData);
                }
            } catch (error) {
                console.error("Auth check failed:", error)
                authService.logout()
            } finally {
                setIsLoading(false)
            }
        }

        checkAuth()
    }, [isAuthenticated])

    const login = async (credentials: LoginDTO): Promise<boolean> => {
        try {
            setIsLoading(true)
            const response = await authService.login(credentials)

            if (response.user) {
                setUser(response.user)
            }

            showToast("Login realizado com sucesso!", "success")
            return true
        } catch (error: any) {
            const message = error.response?.data?.detail || "Erro ao fazer login"
            showToast(message, "error")
            return false
        } finally {
            setIsLoading(false)
        }
    }

    const register = async (userData: RegisterDTO): Promise<boolean> => {
        try {
            setIsLoading(true)
            await authService.register(userData)
            showToast("Usuário cadastrado com sucesso!", "success")
            return true
        } catch (error: any) {
            const message = error.response?.data?.message || "Erro ao cadastrar usuário"
            showToast(message, "error")
            return false
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        authService.logout()
        setUser(null)
        showToast("Logout realizado com sucesso!", "success")
    }

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
