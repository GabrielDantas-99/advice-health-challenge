"use client"

// Presentation Layer - Home Page
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import Link from "next/link"
import Layout from "@/components/Layout"
import { CircleCheck, Clock, FileCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/tasks")
    }
  }, [isAuthenticated, router])

  if (isAuthenticated) {
    return null // Will redirect to /tasks
  }

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <div className="w-20 h-20 bg-orange rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-3xl">T</span>
            </div>
            <h1 className="text-5xl font-bold text-dark-blue mb-4">
              TaskManager
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Organize suas tarefas de forma simples e eficiente
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileCheck size={48} />
              </div>
              <h3 className="text-lg font-semibold text-dark-blue mb-2">Organize</h3>
              <p className="text-gray-600">Crie e organize suas tarefas com facilidade</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock size={48} />
              </div>
              <h3 className="text-lg font-semibold text-dark-blue mb-2">Priorize</h3>
              <p className="text-gray-600">Defina prioridades e prazos para suas tarefas</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-dark-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                <CircleCheck size={48} />
              </div>
              <h3 className="text-lg font-semibold text-dark-blue mb-2">Complete</h3>
              <p className="text-gray-600">Acompanhe seu progresso e conquiste seus objetivos</p>
            </div>
          </div>

          <div className="space-x-4">
            <Link href="/register" className="btn-primary text-lg px-8 py-3">
              <Button variant="outline">
                Começar Agora
              </Button>
            </Link>
            <Link href="/login" className="btn-outline text-lg px-8 py-3">
              <Button variant="default">
                Fazer Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
