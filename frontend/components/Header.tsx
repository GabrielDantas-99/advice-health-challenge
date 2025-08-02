"use client"

// Presentation Layer - Header Component
import type React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import Image from "next/image"

const Header: React.FC = () => {
    const router = useRouter()

    const handleLogout = () => {
        router.push("/login")
    }

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Image src={'/logo-adv-health.png'} width={768} height={768} className="h-48 w-fit" alt="Logo Adivice Health" />

                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/login" className="text-gray-700 hover:text-orange transition-colors font-medium">
                            <Button variant={"link"} >
                                Entrar
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button variant={"default"} >
                                Cadastrar
                            </Button>
                        </Link>
                    </nav>

                    <div className="md:hidden">
                        <button className="text-gray-700 hover:text-orange">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
