"use client"

import type React from "react"

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  color?: "blue" | "indigo" | "emerald" | "amber" | "slate"
  trend?: "up" | "down" | "neutral"
}

export function StatsCard({ title, value, subtitle, icon, color = "blue", trend }: StatsCardProps) {
  const colors = {
    blue: "from-blue-500 to-indigo-600",
    indigo: "from-indigo-500 to-purple-600",
    emerald: "from-emerald-500 to-green-600",
    amber: "from-amber-500 to-orange-600",
    slate: "from-slate-500 to-gray-600",
  }

  const trendColors = {
    up: "text-emerald-600",
    down: "text-red-500",
    neutral: "text-slate-500",
  }

  return (
    <div className="relative p-6 rounded-xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg hover:scale-105 transition-all duration-300">
      <div className={`absolute inset-0 bg-gradient-to-br ${colors[color]} opacity-5 rounded-xl`} />

      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          {icon && (
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors[color]} flex items-center justify-center`}>
              {icon}
            </div>
          )}
        </div>

        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-gray-900">{value}</span>
          {trend && (
            <span className={`text-sm font-medium ${trendColors[trend]}`}>
              {trend === "up" ? "↗" : trend === "down" ? "↘" : "→"}
            </span>
          )}
        </div>

        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  )
}
