"use client"

import React from "react"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    SelectGroup,
    SelectLabel,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface User {
    id: number
    username: string
}

interface UserMultiSelectProps {
    allUsers: User[]
    selectedUserIds: number[]
    onChange: (newIds: number[]) => void
}

const UserMultiSelect: React.FC<UserMultiSelectProps> = ({
    allUsers,
    selectedUserIds,
    onChange,
}) => {
    const handleAddUser = (value: string) => {
        const id = Number(value)
        if (!selectedUserIds.includes(id)) {
            onChange([...selectedUserIds, id])
        }
    }

    const handleRemoveUser = (id: number) => {
        onChange(selectedUserIds.filter((uid) => uid !== id))
    }

    const availableUsers = allUsers.filter((user) => !selectedUserIds.includes(user.id))

    return (
        <div className="w-full">
            <Label htmlFor="shared_with" className="label">
                Compartilhar com
            </Label>

            <Select onValueChange={handleAddUser}>
                <SelectTrigger>
                    <SelectValue placeholder="Selecione os usuários" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Usuários</SelectLabel>
                        {availableUsers.length === 0 ? (
                            <div className="px-4 py-2 text-sm text-gray-500">
                                Todos os usuários já foram selecionados.
                            </div>
                        ) : (
                            availableUsers.map((user) => (
                                <SelectItem key={user.id} value={String(user.id)}>
                                    {user.username}
                                </SelectItem>
                            ))
                        )}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {selectedUserIds.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {selectedUserIds.map((id) => {
                        const user = allUsers.find((u) => u.id === id)
                        return (
                            <span
                                key={id}
                                className="bg-gray-100 text-sm text-gray-800 px-2 py-1 rounded flex items-center gap-1"
                            >
                                {user?.username || `ID ${id}`}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveUser(id)}
                                    className="ml-1 text-red-500 hover:text-red-700"
                                    aria-label="Remover usuário"
                                >
                                    ×
                                </button>
                            </span>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default UserMultiSelect
