"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import Layout from "@/components/Layout"
import TaskList from "@/components/TaskList"

export default function TasksPage() {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login")
        }
    }, [isAuthenticated, isLoading, router])

    if (isLoading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange"></div>
                </div>
            </Layout>
        )
    }

    if (!isAuthenticated) return null

    return (
        <Layout>
            <TaskList />
        </Layout>
    )
}
