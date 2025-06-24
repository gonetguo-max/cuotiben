"use client"

import type React from "react"
import { Plus } from "lucide-react"

interface FloatingActionButtonProps {
  onClick?: () => void
  icon?: React.ReactNode
  className?: string
}

export function FloatingActionButton({ onClick, icon, className }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-24 right-4 md:bottom-8 md:right-8 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl shadow-purple-500/25 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 z-50 ${className}`}
    >
      {icon || <Plus className="w-8 h-8 text-white" />}

      {/* 脉冲动画 */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-ping opacity-20" />
    </button>
  )
}
