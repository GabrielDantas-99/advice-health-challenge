"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

type ToastType = "success" | "error" | "warning" | "info"

interface Toast {
    id: string
    message: string
    type: ToastType
}

interface ToastContextType {
    toasts: Toast[]
    showToast: (message: string, type: ToastType) => void
    removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
    const context = useContext(ToastContext)
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider")
    }
    return context
}

interface ToastProviderProps {
    children: ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = (message: string, type: ToastType) => {
        const id = Math.random().toString(36).substr(2, 9)
        const newToast: Toast = { id, message, type }

        setToasts((prev) => [...prev, newToast])

        setTimeout(() => {
            removeToast(id)
        }, 5000)
    }

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }

    const value: ToastContextType = {
        toasts,
        showToast,
        removeToast,
    }

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    )
}

interface ToastContainerProps {
    toasts: Toast[]
    onRemove: (id: string) => void
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
    if (toasts.length === 0) return null

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`p-4 rounded-lg shadow-lg max-w-sm transition-all duration-300 ${toast.type === "success"
                        ? "bg-green-500 text-white"
                        : toast.type === "error"
                            ? "bg-red-500 text-white"
                            : toast.type === "warning"
                                ? "bg-yellow-500 text-white"
                                : "bg-blue-500 text-white"
                        }`}
                >
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">{toast.message}</p>
                        <button onClick={() => onRemove(toast.id)} className="ml-4 text-white hover:text-gray-200">
                            ×
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
