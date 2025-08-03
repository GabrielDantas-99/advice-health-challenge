"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import type { RegisterDTO } from "@/models/User"
import Link from "next/link"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

interface RegisterFormProps {
    onSuccess?: () => void
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState<RegisterDTO>({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
    })
    const [errors, setErrors] = useState<Partial<RegisterDTO>>({})
    const { register, isLoading } = useAuth()

    const validateForm = (): boolean => {
        const newErrors: Partial<RegisterDTO> = {}

        if (!formData.username.trim()) {
            newErrors.username = "Nome de usuário é obrigatório"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email é obrigatório"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email inválido"
        }

        if (!formData.password) {
            newErrors.password = "Senha é obrigatória"
        } else if (formData.password.length < 6) {
            newErrors.password = "Senha deve ter pelo menos 6 caracteres"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        const success = await register(formData)
        if (success && onSuccess) {
            onSuccess()
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        if (errors[name as keyof RegisterDTO]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }))
        }
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <div className=" mb-6">
                <h2 className="text-2xl font-semibold text-primary">
                    Cadastrar
                </h2>
                <small className="text-secondary-foreground mt-2">
                    Preencha os campos abaixo para se cadastrar
                </small>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nome
                        </Label>
                        <Input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name || ""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                            placeholder="Nome"
                        />
                    </div>

                    <div>
                        <Label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                            Sobrenome
                        </Label>
                        <Input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name || ""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                            placeholder="Sobrenome"
                        />
                    </div>
                </div>

                <div>
                    <Label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome de usuário *
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
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                    </Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange ${errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                        placeholder="Digite seu email"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                    <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Senha *
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
                    {isLoading ? "Cadastrando..." : "Cadastrar"}
                </Button>
            </form>

            <div className="text-center mt-4">
                <p className="text-gray-600">
                    Já tem uma conta?{" "}
                    <Link href="/login" className="text-orange hover:underline font-medium">
                        Entrar
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterForm
