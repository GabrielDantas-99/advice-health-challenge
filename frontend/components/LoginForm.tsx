"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import type { LoginDTO } from "@/models/User"
import Link from "next/link"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface LoginFormProps {
    onSuccess?: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState<LoginDTO>({
        username: "",
        password: "",
    })
    const [errors, setErrors] = useState<Partial<LoginDTO>>({})
    const { login, isLoading } = useAuth()

    const validateForm = (): boolean => {
        const newErrors: Partial<LoginDTO> = {}

        if (!formData.username.trim()) {
            newErrors.username = "Nome de usuário é obrigatório"
        }

        if (!formData.password) {
            newErrors.password = "Senha é obrigatória"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        const success = await login(formData)
        if (success && onSuccess) {
            onSuccess()
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        if (errors[name as keyof LoginDTO]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }))
        }
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <div className=" mb-6">
                <h2 className="text-2xl font-semibold text-primary">
                    Acessar
                </h2>
                <small className="text-secondary-foreground mt-2">
                    Preencha os campos abaixo para acessar.
                </small>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome de usuário
                    </Label>
                    <Input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange ${errors.username ? "border-red-500" : "border-gray-300"
                            }`}
                        placeholder="Digite seu nome de usuário"
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                </div>

                <div>
                    <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Senha
                    </Label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange ${errors.password ? "border-red-500" : "border-gray-300"
                            }`}
                        placeholder="Digite sua senha"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Entrando..." : "Entrar"}
                </Button>
            </form>

            <div className="text-center mt-4">
                <p className="text-gray-600">
                    Não tem uma conta?{" "}
                    <Link href="/register" className="text-orange hover:underline font-medium">
                        Cadastre-se
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginForm
