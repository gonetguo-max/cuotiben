"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface GradientButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "success" | "warning" | "professional"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  disabled?: boolean
}

export function GradientButton({
  children,
  className,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
}: GradientButtonProps) {
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/25",
    secondary: "bg-gradient-to-r from-slate-600 via-gray-600 to-slate-700 text-white shadow-lg shadow-gray-500/25",
    success: "bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white shadow-lg shadow-emerald-400/25",
    warning: "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white shadow-lg shadow-amber-400/25",
    professional: "bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white shadow-lg shadow-indigo-500/25",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <button
      className={cn(
        "rounded-xl font-semibold transition-all duration-300 ease-out",
        "hover:shadow-xl hover:scale-105 active:scale-95",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        variants[variant],
        sizes[size],
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
