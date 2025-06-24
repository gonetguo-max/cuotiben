"use client"

import { useState } from "react"
import { Camera, BookOpen, TrendingUp, FileText, Zap, Star } from "lucide-react"
import { ModernCard } from "@/components/ui/modern-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { AchievementBadge } from "@/components/ui/achievement-badge"
import { ProgressRing } from "@/components/ui/progress-ring"
import { motion } from "framer-motion"

export default function ModernHomePage() {
  const [selectedTheme, setSelectedTheme] = useState("gradient")

  const achievements = [
    { title: "学习新手", description: "完成第一次拍照识别", icon: "star" as const, color: "bronze" as const },
    { title: "坚持不懈", description: "连续学习7天", icon: "zap" as const, color: "gold" as const },
    { title: "错题克星", description: "掌握50道错题", icon: "trophy" as const, color: "rainbow" as const },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* 现代化头部 */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm" />
        <div className="relative px-4 py-6">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  智能错题本
                </h1>
                <p className="text-sm text-gray-600">AI学习助手 ✨</p>
              </div>
            </div>

            {/* 主题切换 */}
            <div className="flex gap-2">
              {["glass", "gradient", "neon"].map((theme) => (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedTheme === theme ? "border-purple-500 scale-110" : "border-gray-300"
                  }`}
                  style={{
                    background:
                      theme === "glass"
                        ? "rgba(255,255,255,0.3)"
                        : theme === "gradient"
                          ? "linear-gradient(45deg, #667eea, #764ba2)"
                          : "#1a1a2e",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* 学习统计 - 现代化设计 */}
        <ModernCard variant={selectedTheme as any} className="text-center">
          <motion.div
            className="flex justify-center mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ProgressRing progress={75} color="#667eea" />
          </motion.div>

          <h2 className="text-xl font-bold text-gray-900 mb-2">本周学习进度</h2>
          <p className="text-gray-600 mb-4">你已经掌握了18道错题，继续加油！🎉</p>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">24</div>
              <div className="text-sm text-gray-500">错题数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">18</div>
              <div className="text-sm text-gray-500">已掌握</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">6</div>
              <div className="text-sm text-gray-500">待复习</div>
            </div>
          </div>
        </ModernCard>

        {/* 快速操作 - 渐变按钮 */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <ModernCard variant={selectedTheme as any} className="text-center cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">拍照识别</h3>
              <p className="text-sm text-gray-600">AI智能批改 📸</p>
            </ModernCard>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <ModernCard variant={selectedTheme as any} className="text-center cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">生成试卷</h3>
              <p className="text-sm text-gray-600">个性化练习 📝</p>
            </ModernCard>
          </motion.div>
        </div>

        {/* 成就系统 */}
        <ModernCard variant={selectedTheme as any}>
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-500" />
            <h2 className="text-lg font-bold text-gray-900">我的成就</h2>
          </div>

          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AchievementBadge {...achievement} />
              </motion.div>
            ))}
          </div>
        </ModernCard>

        {/* 现代化操作按钮 */}
        <div className="space-y-3">
          <GradientButton variant="primary" size="lg" className="w-full">
            <Zap className="w-5 h-5 mr-2" />
            开始今日学习
          </GradientButton>

          <div className="grid grid-cols-2 gap-3">
            <GradientButton variant="secondary" size="md">
              <TrendingUp className="w-4 h-4 mr-2" />
              学习报告
            </GradientButton>
            <GradientButton variant="cute" size="md">
              <BookOpen className="w-4 h-4 mr-2" />
              错题本
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
  )
}
