"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import Layout from "@/components/Layout"
import LoginForm from "@/components/LoginForm"
import { useEffect } from "react"

export default function LoginPage() {
    const router = useRouter()
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/tasks")
        }
    }, [isAuthenticated, router])

    const handleLoginSuccess = () => {
        router.push("/tasks")
    }

    if (isAuthenticated) {
        return null
    }

    return (
        <Layout>
            <div className="min-h-[80vh] flex items-center justify-center">
                <LoginForm onSuccess={handleLoginSuccess} />
            </div>
        </Layout>
    )
}
