"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
    currentPage: number
    totalPages: number
    itemsPerPage: number
    totalItems: number
    onPageChange: (page: number) => void
    onItemsPerPageChange: (itemsPerPage: number) => void
}

export default function Pagination({
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    onPageChange,
    onItemsPerPageChange,
}: PaginationProps) {
    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Exibir</span>
                <Select value={itemsPerPage.toString()} onValueChange={(value) => onItemsPerPageChange(Number(value))}>
                    <SelectTrigger className="w-20">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="12">12</SelectItem>
                        <SelectItem value="24">24</SelectItem>
                        <SelectItem value="48">48</SelectItem>
                    </SelectContent>
                </Select>
                <span className="text-sm text-gray-700">por página</span>
            </div>

            <div className="text-sm text-gray-700">
                Exibindo {startItem} a {endItem} de {totalItems} resultados
            </div>

            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                </Button>

                <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                            key={page}
                            variant={page === currentPage ? "default" : "outline"}
                            size="sm"
                            onClick={() => onPageChange(page)}
                            className={page === currentPage ? "bg-[#004f8e] hover:bg-[#003d6b]" : ""}
                        >
                            {page}
                        </Button>
                    ))}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Próxima
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
