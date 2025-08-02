"use client"

// Presentation Layer - Register Page
import { useRouter } from "next/navigation"
import Layout from "@/components/Layout"
import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
    return (
        <Layout>
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="max-w-md  bg-white rounded-lg shadow-md p-6">
                    <div className=" mb-6">
                        <h2 className="text-2xl font-semibold text-primary">
                            Cadastrar
                        </h2>
                        <small className="text-secondary-foreground mt-2">
                            Preencha os campos abaixo para se cadastrar
                        </small>
                    </div>

                    <form className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                Nome de usuário *
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange `}
                                placeholder="Digite seu nome de usuário"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Senha *
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange `}
                                placeholder="Digite sua senha"
                            />
                            <Button
                                type="submit"
                                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                            >
                                Cadastrar
                            </Button>
                        </div>
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
            </div>
        </Layout>
    )
}
