"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Layout } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function TasksPage() {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login")
        }
    }, [isAuthenticated, isLoading, router])
    return (
        <Layout>
            <p>Tasks</p>
        </Layout>
    )
}