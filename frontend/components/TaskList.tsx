"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { useToast } from "@/contexts/ToastContext"
import TaskForm from "./TaskForm"
import { CreateTaskDTO, Task } from "@/models/Task"
import { Button } from "./ui/button"
import { taskService } from "@/services/TaskService"
import { ClipboardList } from "lucide-react"
import TaskCard from "./TaskCard"
import Pagination from "./Pagination"
import TaskFilters from "./TaskFilters"

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [filter, setFilter] = useState<"all" | "pending" | "completed">("all")
    const { showToast } = useToast()
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(6)

    const [searchTerm, setSearchTerm] = useState("")
    const [priorityFilter, setPriorityFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const matchesSearch =
                task.title.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesPriority = priorityFilter === "all" || task.priority === Number(priorityFilter)

            const matchesStatus =
                statusFilter === "all" ||
                (statusFilter === "completed" && task.completed) ||
                (statusFilter === "pending" && !task.completed)

            return matchesSearch && matchesPriority && matchesStatus
        })
    }, [tasks, searchTerm, priorityFilter, statusFilter])

    useEffect(() => {
        loadTasks()
    }, [])

    const loadTasks = async () => {
        try {
            setIsLoading(true)
            const tasksData = await taskService.getTasks()
            setTasks(tasksData)
        } catch (error) {
            showToast("Erro ao carregar tarefas", "error")
        } finally {
            setIsLoading(false)
        }
    }

    const handleCreateTask = async (taskData: CreateTaskDTO) => {
        console.log(taskData)
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

    const handleToggleComplete = async (id: number, completed: boolean) => {
        try {
            const updatedTask = await taskService.toggleTaskCompletion(id, completed)
            setTasks((prev) => prev.map((task) => (task.id === id ? updatedTask : task)))
            showToast(completed ? "Tarefa marcada como concluída!" : "Tarefa marcada como pendente!", "success")
        } catch (error) {
            showToast("Erro ao atualizar tarefa", "error")
        }
    }

    const handleDeleteTask = async (id: number) => {
        if (!confirm("Tem certeza que deseja excluir esta tarefa?")) return

        try {
            await taskService.deleteTask(id)
            setTasks((prev) => prev.filter((task) => task.id !== id))
            showToast("Tarefa excluída com sucesso!", "success")
        } catch (error) {
            showToast("Erro ao excluir tarefa", "error")
        }
    }

    const totalPages = Math.ceil(filteredTasks.length / itemsPerPage)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage)
        setCurrentPage(1)
    }

    const paginatedTasks = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        return filteredTasks.slice(startIndex, startIndex + itemsPerPage)
    }, [filteredTasks, currentPage, itemsPerPage])

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

            <TaskFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                priorityFilter={priorityFilter}
                onPriorityFilterChange={setPriorityFilter}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
            />
            {/* Task List */}
            {filteredTasks.length === 0 ? (
                <div className="text-center w-96 mx-auto py-12">
                    <ClipboardList className="mx-auto mb-2" size={64} strokeWidth="1" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {filter === "all"
                            ? "Nenhuma tarefa encontrada"
                            : filter === "pending"
                                ? "Nenhuma tarefa pendente"
                                : "Nenhuma tarefa concluída"}
                    </h3>
                    <p className="text-gray-500">
                        {filter === "all"
                            ? "Comece criando sua primeira tarefa!"
                            : filter === "pending"
                                ? "Todas as suas tarefas estão concluídas!"
                                : "Você ainda não concluiu nenhuma tarefa."}
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {paginatedTasks.map((task) => (
                            <TaskCard key={task.id} task={task} onToggleComplete={handleToggleComplete} onDelete={handleDeleteTask} />
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        itemsPerPage={itemsPerPage}
                        totalItems={filteredTasks.length}
                        onPageChange={handlePageChange}
                        onItemsPerPageChange={handleItemsPerPageChange}
                    />
                </>

            )}
        </div>
    )
}

export default TaskList
