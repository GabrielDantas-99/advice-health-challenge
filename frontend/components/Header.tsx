"use client"

import type React from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import { useEffect, useState } from "react"

const Header: React.FC = () => {
    const { isAuthenticated, logout } = useAuth()
    const router = useRouter()
    const [hasMounted, setHasMounted] = useState(false)
    useEffect(() => {
        setHasMounted(true)
    }, [])
    const handleLogout = () => {
        logout()
        router.push("/login")
    }
    if (!hasMounted) return null
    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image src={'/logo-adv-health.png'} width={768} height={768} className="h-48 w-fit" alt="Logo Adivice Health" priority />
                        </Link>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        {isAuthenticated ? (
                            <>
                                <Link href="/tasks" className="text-gray-700 hover:text-orange transition-colors font-medium">
                                    Tarefas
                                </Link>
                                <Link href="/about" className="text-gray-700 hover:text-orange transition-colors font-medium">
                                    Sobre Nós
                                </Link>
                                <Link href="/help" className="text-gray-700 hover:text-orange transition-colors font-medium">
                                    Ajuda
                                </Link>
                                <Button onClick={handleLogout} variant="destructive">
                                    Sair
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-gray-700 hover:text-orange transition-colors font-medium">
                                    Entrar
                                </Link>
                                <Link href="/register" className="btn-primary">
                                    Cadastrar
                                </Link>
                            </>
                        )}
                    </nav>

                    <div className="md:hidden">
                        <Button variant="outline" className="text-gray-700 hover:text-orange">
                            <Menu />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
