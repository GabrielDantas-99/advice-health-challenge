"use client"

import type React from "react"
import { type Task, getPriorityLabel, getPriorityColor } from "@/models/Task"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Trash2 } from "lucide-react"

interface TaskCardProps {
    task: Task
    onToggleComplete: (id: number, completed: boolean) => void
    onDelete: (id: number) => void
    isLoading?: boolean
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick, onToggleComplete, onDelete, isLoading = false }) => {
    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: ptBR })
        } catch {
            return "Data inválida"
        }
    }

    const isOverdue = task.deadline && new Date(task.deadline) < new Date() && !task.completed

    return (
        <div
            onClick={onClick}
            className={`overflow-x-hidden bg-white rounded-lg shadow-md p-4 border-l-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${task.completed ? "border-green-500 bg-green-50" : isOverdue ? "border-red-500" : "border-orange"
                }`}
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={(e) => {
                            e.stopPropagation()
                            onToggleComplete(task.id, e.target.checked)
                        }}
                        disabled={isLoading || (task.deadline && new Date(task.deadline) < new Date() && !task.completed)}
                        className="w-5 h-5 text-orange focus:ring-orange border-gray-300 rounded"
                    />
                    <div className="block max-w-60">
                        <h3
                            className={`font-semibold truncate max-w-full ${task.completed ? "line-through text-gray-500" : "text-gray-900"
                                }`}
                        >
                            {task.title}
                        </h3>
                        <span
                            className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                                task.priority
                            )}`}
                        >
                            {getPriorityLabel(task.priority)}
                        </span>
                    </div>
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onDelete(task.id)
                    }}
                    disabled={isLoading}
                    className="text-red-500 hover:text-red-700 disabled:opacity-50 p-1"
                    title="Excluir tarefa"
                >
                    <Trash2 />
                </button>
            </div>

            {task.description && (
                <p className={`text-sm mb-3 truncate ${task.completed ? "text-gray-400" : "text-gray-600"}`}>
                    {task.description}
                </p>
            )}

            <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Criado em: {formatDate(task.created_at)}</span>
                {task.deadline && (
                    <span className={isOverdue ? "text-red-500 font-medium" : ""}>
                        Prazo: {formatDate(task.deadline)}
                    </span>
                )}
            </div>

            {isOverdue && <div className="mt-2 text-xs text-red-600 font-medium">⚠️ Tarefa em atraso</div>}
        </div>
    )
}

export default TaskCard
