"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useToast } from "@/contexts/ToastContext"
import TaskForm from "./TaskForm"
import { CreateTaskDTO, Task } from "@/models/Task"
import { Button } from "./ui/button"
import { taskService } from "@/services/TaskService"

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const { showToast } = useToast()

    const handleCreateTask = async (taskData: CreateTaskDTO) => {
        try {
            setIsSubmitting(true)
            const newTask = await taskService.createTask(taskData)
            setTasks((prev) => [newTask, ...prev])
            setShowForm(false)
            showToast("Tarefa criada com sucesso!", "success")
        } catch (error) {
            showToast("Erro ao criar tarefa", "error")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-bold text-primary">
                    Gerenciador de Tarefas
                </h1>

                <Button onClick={() => setShowForm(!showForm)} variant={showForm ? "outline" : "default"}>
                    {showForm ? "Cancelar" : "Nova Tarefa"}
                </Button>
            </div>

            {showForm && (
                <TaskForm onSubmit={handleCreateTask} onCancel={() => setShowForm(false)} isLoading={isSubmitting} />
            )}

        </div>
    )
}

export default TaskList
