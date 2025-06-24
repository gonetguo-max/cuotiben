"use client"

import type React from "react"

import { useState } from "react"
import { Home, Camera, BookOpen, FileText, User, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileLayoutProps {
  children: React.ReactNode
  currentPage?: string
}

export default function MobileLayout({ children, currentPage = "home" }: MobileLayoutProps) {
  const [activeTab, setActiveTab] = useState(currentPage)

  const navItems = [
    { id: "home", label: "首页", icon: Home },
    { id: "camera", label: "拍照", icon: Camera },
    { id: "notebook", label: "错题本", icon: BookOpen },
    { id: "export", label: "试卷", icon: FileText },
    { id: "profile", label: "我的", icon: User },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Main Content */}
      <main className="relative">{children}</main>

      {/* Floating Action Button - Mobile Only */}
      <div className="fixed bottom-24 right-4 md:hidden">
        <Button size="lg" className="rounded-full w-14 h-14 shadow-lg">
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                  isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : ""}`} />
                <span className={`text-xs ${isActive ? "text-blue-600 font-medium" : ""}`}>{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Desktop Sidebar - Hidden on Mobile */}
      <aside className="hidden md:fixed md:left-0 md:top-0 md:h-full md:w-64 md:bg-white md:border-r md:border-gray-200 md:flex md:flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">智能错题本</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </aside>
    </div>
  )
}
