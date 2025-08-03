"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import Layout from "@/components/Layout"
import RegisterForm from "@/components/RegisterForm"
import { useEffect } from "react"

export default function RegisterPage() {
    const router = useRouter()
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/tasks")
        }
    }, [isAuthenticated, router])

    const handleRegisterSuccess = () => {
        router.push("/login")
    }

    if (isAuthenticated) {
        return null
    }

    return (
        <Layout>
            <div className="min-h-[80vh] flex items-center justify-center">
                <RegisterForm onSuccess={handleRegisterSuccess} />
            </div>
        </Layout>
    )
}
