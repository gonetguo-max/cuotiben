"use client"

import type React from "react"
import { useState } from "react"
import { Home, Camera, BookOpen, FileText, User, Settings, TrendingUp, GraduationCap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { GradientButton } from "@/components/ui/gradient-button"

interface MobileLayoutProps {
  children: React.ReactNode
  currentPage?: string
}

export default function MobileLayout({ children, currentPage = "home" }: MobileLayoutProps) {
  const [activeTab, setActiveTab] = useState(currentPage)

  const navItems = [
    { id: "home", label: "首页", icon: Home, color: "from-blue-600 to-indigo-600" },
    { id: "camera", label: "拍照", icon: Camera, color: "from-indigo-600 to-purple-600" },
    { id: "notebook", label: "错题本", icon: BookOpen, color: "from-red-500 to-orange-500" },
    { id: "export", label: "试卷", icon: FileText, color: "from-emerald-600 to-green-600" },
    { id: "profile", label: "我的", icon: User, color: "from-slate-600 to-gray-600" },
  ]

  const sidebarItems = [
    { id: "home", label: "首页", icon: Home, color: "from-blue-600 to-indigo-600" },
    { id: "camera", label: "拍照批改", icon: Camera, color: "from-indigo-600 to-purple-600" },
    { id: "notebook", label: "错题本", icon: BookOpen, color: "from-red-500 to-orange-500" },
    { id: "export", label: "试卷导出", icon: FileText, color: "from-emerald-600 to-green-600" },
    { id: "reports", label: "学习报告", icon: TrendingUp, color: "from-amber-600 to-orange-600" },
    { id: "settings", label: "设置", icon: Settings, color: "from-slate-600 to-gray-600" },
    { id: "profile", label: "个人中心", icon: User, color: "from-slate-600 to-gray-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pb-20 md:pb-0">
      {/* Main Content */}
      <main className="relative md:ml-64">{children}</main>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-white/30 md:hidden z-30 shadow-2xl">
        <div className="grid grid-cols-5 h-20 px-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center space-y-1 transition-all duration-300 rounded-xl mx-1 my-2 ${
                  isActive ? "bg-gradient-to-br from-blue-500/10 to-indigo-500/10 scale-105" : "hover:bg-gray-100/50"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActive ? `bg-gradient-to-br ${item.color} shadow-lg` : "bg-gray-100"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-600"}`} />
                </div>
                <span
                  className={`text-xs font-medium ${
                    isActive
                      ? "bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent"
                      : "text-gray-600"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Desktop Sidebar - Hidden on Mobile */}
      <aside className="hidden md:fixed md:left-0 md:top-0 md:h-full md:w-64 md:bg-white/90 md:backdrop-blur-xl md:border-r md:border-white/30 md:flex md:flex-col z-20 md:shadow-2xl">
        <div className="p-6 border-b border-white/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-xl">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                智能错题本
              </h1>
              <p className="text-xs text-gray-500">专业学习助手 📚</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-white/30">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold">小</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">小明同学</p>
              <p className="text-xs text-gray-500">初中二年级</p>
            </div>
            <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs border-0">专业版</Badge>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-left group ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500/10 to-indigo-500/10 shadow-lg scale-105"
                    : "hover:bg-gray-100/50 hover:scale-102"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    isActive ? `bg-gradient-to-br ${item.color} shadow-lg` : "bg-gray-100 group-hover:bg-gray-200"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-600"}`} />
                </div>
                <span
                  className={`font-medium truncate ${
                    isActive
                      ? "bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent"
                      : "text-gray-700"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </nav>

        {/* Upgrade Prompt */}
        <div className="p-4 border-t border-white/30">
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl p-4 text-white shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-xs">🎓</span>
              </div>
              <h3 className="text-sm font-bold">升级到高级版</h3>
            </div>
            <p className="text-xs opacity-90 mb-3">解锁AI语音讲解、个性化学习计划等专业功能</p>
            <GradientButton
              size="sm"
              className="w-full bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
            >
              立即升级 🚀
            </GradientButton>
          </div>
        </div>
      </aside>
    </div>
  )
}
