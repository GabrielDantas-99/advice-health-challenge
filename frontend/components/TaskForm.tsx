"use client"

import { CreateTaskDTO, TaskPriority } from "@/models/Task"
import type React from "react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import validateForm from "@/validation/validateTaskForm"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface TaskFormProps {
    onSubmit: (taskData: CreateTaskDTO) => Promise<void>
    onCancel: () => void
    isLoading?: boolean
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, isLoading = false }) => {
    const [formData, setFormData] = useState<CreateTaskDTO>({
        title: "",
        description: "",
        deadline: "",
        priority: TaskPriority.LOW,
    })
    const [errors, setErrors] = useState<Partial<CreateTaskDTO>>({})

    const handleValidateForm = (): boolean => {
        const newErrors = validateForm(formData)
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!handleValidateForm()) return
        try {
            await onSubmit({
                ...formData,
                description: formData.description || undefined,
                deadline: formData.deadline || undefined,
            })
            setFormData({
                title: "",
                description: "",
                deadline: "",
                priority: TaskPriority.LOW,
            })
        } catch (error) {
            console.error("Error submitting task:", error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: name === "priority" ? Number.parseInt(value) : value,
        }))

        if (errors[name as keyof CreateTaskDTO]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }))
        }
    }

    function handlePriorityChange(value: string): void {
        setFormData({ ...formData, priority: Number(value) })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Nova Tarefa</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="title" className="label">
                            Título *
                        </Label>
                        <Input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            maxLength={100}
                            className={`${errors.title ? "border-red-500" : ""}`}
                            placeholder="Digite o título da tarefa"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        <p className="text-gray-500 text-xs mt-1">{formData.title.length}/100 caracteres</p>
                    </div>

                    <div>
                        <Label htmlFor="description" className="label">
                            Descrição
                        </Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            maxLength={255}
                            rows={3}
                            className={`${errors.description ? "border-red-500" : ""
                                }`}
                            placeholder="Digite a descrição da tarefa (opcional)"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        <p className="text-gray-500 text-xs mt-1">{(formData.description || "").length}/255 caracteres</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="w-full">
                            <Label htmlFor="priority" className="label">
                                Prioridade
                            </Label>
                            <Select onValueChange={(value) => handlePriorityChange(value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione uma Prioridade" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Prioridades:</SelectLabel>
                                        <SelectItem value={'1'}>Baixa</SelectItem>
                                        <SelectItem value={'2'}>Média</SelectItem>
                                        <SelectItem value={'3'}>Alta</SelectItem>
                                        <SelectItem value={'4'}>Urgente</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="deadline" className="label">
                                Prazo
                            </Label>
                            <Input
                                type="datetime-local"
                                id="deadline"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <Button
                            type="button"
                            onClick={onCancel}
                            variant="outline"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            variant="default"
                        >
                            {isLoading ? "Salvando..." : "Salvar Tarefa"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>

    )
}

export default TaskForm
