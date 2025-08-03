"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"

interface TaskFiltersProps {
    searchTerm: string
    onSearchChange: (value: string) => void
    priorityFilter: string
    onPriorityFilterChange: (value: string) => void
    statusFilter: string
    onStatusFilterChange: (value: string) => void
}

export default function TaskFilters({
    searchTerm,
    onSearchChange,
    priorityFilter,
    onPriorityFilterChange,
    statusFilter,
    onStatusFilterChange,
}: TaskFiltersProps) {
    return (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <Label className="label" htmlFor="search">Buscar tarefas</Label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            id="search"
                            placeholder="Buscar por título ou prioridade..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                <div>
                    <Label className="label" htmlFor="priority-filter">Filtrar por Prioridade</Label>
                    <Select value={priorityFilter} onValueChange={onPriorityFilterChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Todas as Prioridades" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas as Prioridades</SelectItem>
                            <SelectItem value="1">Baixa</SelectItem>
                            <SelectItem value="2">Média</SelectItem>
                            <SelectItem value="3">Alta</SelectItem>
                            <SelectItem value="4">Urgente</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label className="label" htmlFor="status-filter">Filtrar por Status</Label>
                    <Select value={statusFilter} onValueChange={onStatusFilterChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="All statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas</SelectItem>
                            <SelectItem value="pending">A Fazer</SelectItem>
                            <SelectItem value="completed">Concluída</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}
