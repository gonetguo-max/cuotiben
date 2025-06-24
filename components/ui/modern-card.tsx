"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface ModernCardProps {
  children: React.ReactNode
  className?: string
  variant?: "glass" | "gradient" | "neon" | "soft"
  hover?: boolean
}

export function ModernCard({ children, className, variant = "glass", hover = true }: ModernCardProps) {
  const variants = {
    glass: "bg-white/80 backdrop-blur-xl border border-white/30 shadow-xl shadow-blue-100/25",
    gradient:
      "bg-gradient-to-br from-blue-500/8 via-indigo-500/8 to-purple-500/8 border border-blue-200/30 shadow-lg shadow-blue-200/25",
    neon: "bg-gray-900/95 border border-blue-400/50 shadow-lg shadow-blue-400/25",
    soft: "bg-white shadow-xl shadow-blue-100/50 border border-blue-100/50",
  }

  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-500 ease-out",
        variants[variant],
        hover && "hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-1",
        "active:scale-[0.98] active:transition-transform active:duration-100",
        className,
      )}
    >
      {children}
    </div>
  )
}
