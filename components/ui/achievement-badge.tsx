"use client"

import { Trophy, Star, Zap, Target, Award, Crown } from "lucide-react"

interface AchievementBadgeProps {
  title: string
  description: string
  icon?: "trophy" | "star" | "zap" | "target" | "award" | "crown"
  color?: "gold" | "silver" | "bronze" | "blue" | "indigo" | "emerald"
  unlocked?: boolean
  progress?: number
}

export function AchievementBadge({
  title,
  description,
  icon = "star",
  color = "blue",
  unlocked = true,
  progress,
}: AchievementBadgeProps) {
  const icons = {
    trophy: Trophy,
    star: Star,
    zap: Zap,
    target: Target,
    award: Award,
    crown: Crown,
  }

  const colors = {
    gold: "from-yellow-500 via-amber-500 to-orange-500",
    silver: "from-gray-400 via-slate-400 to-gray-500",
    bronze: "from-orange-500 via-amber-600 to-yellow-600",
    blue: "from-blue-500 via-indigo-500 to-purple-500",
    indigo: "from-indigo-500 via-blue-500 to-cyan-500",
    emerald: "from-emerald-500 via-green-500 to-teal-500",
  }

  const Icon = icons[icon]

  return (
    <div
      className={`relative p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
        unlocked ? "opacity-100" : "opacity-60"
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colors[color]} rounded-xl opacity-10`} />

      {/* 专业发光效果 */}
      {unlocked && (
        <div className={`absolute inset-0 bg-gradient-to-br ${colors[color]} rounded-xl opacity-15 blur-lg`} />
      )}

      <div className="relative flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors[color]} flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
          {progress !== undefined && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${colors[color]} transition-all duration-500`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{progress}% 完成</p>
            </div>
          )}
        </div>
      </div>

      {unlocked && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white text-xs font-bold">✓</span>
        </div>
      )}
    </div>
  )
}
