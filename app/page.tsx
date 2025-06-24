"use client"

import { useState } from "react"
import {
  Camera,
  BookOpen,
  TrendingUp,
  FileText,
  Upload,
  ChevronRight,
  Target,
  Bell,
  Search,
  Zap,
  Star,
  Trophy,
  Award,
  GraduationCap,
} from "lucide-react"
import { ModernCard } from "@/components/ui/modern-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { AchievementBadge } from "@/components/ui/achievement-badge"
import { ProgressRing } from "@/components/ui/progress-ring"
import { FloatingActionButton } from "@/components/ui/floating-action-button"
import { StatsCard } from "@/components/ui/stats-card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import MobileLayout from "@/components/layout/mobile-layout"
import { useToast } from "@/hooks/use-toast"

export default function HomePage() {
  const [selectedGrade, setSelectedGrade] = useState("初中二年级")
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const [recentMistakes] = useState([
    { id: 1, subject: "数学", topic: "二次函数", date: "2024-01-15", difficulty: "中等", status: "未掌握" },
    { id: 2, subject: "物理", topic: "力学", date: "2024-01-14", difficulty: "困难", status: "已掌握" },
    { id: 3, subject: "化学", topic: "化学方程式", date: "2024-01-13", difficulty: "简单", status: "复习中" },
  ])

  const [notifications] = useState([
    { id: 1, title: "复习提醒", content: "你有3道错题需要复习", time: "2小时前", read: false },
    { id: 2, title: "学习报告", content: "本周学习报告已生成", time: "1天前", read: true },
  ])

  const achievements = [
    {
      title: "学习新手",
      description: "完成第一次拍照识别",
      icon: "star" as const,
      color: "bronze" as const,
      unlocked: true,
    },
    {
      title: "坚持不懈",
      description: "连续学习7天",
      icon: "zap" as const,
      color: "gold" as const,
      unlocked: true,
    },
    {
      title: "错题克星",
      description: "掌握50道错题",
      icon: "trophy" as const,
      color: "blue" as const,
      unlocked: false,
      progress: 75,
    },
    {
      title: "学霸之路",
      description: "月度学习时长达到40小时",
      icon: "crown" as const,
      color: "indigo" as const,
      unlocked: false,
      progress: 60,
    },
  ]

  const handleQuickAction = (action: string) => {
    toast({
      title: "✨ 功能启动",
      description: `${action}功能已激活！`,
    })
  }

  return (
    <MobileLayout currentPage="home">
      {/* 专业渐变背景 */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* 专业化头部 */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/8 via-indigo-600/8 to-purple-600/8 backdrop-blur-sm" />
          <div className="relative px-4 py-6 md:px-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/25">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                    智能错题本
                  </h1>
                  <p className="text-sm text-gray-600 flex items-center gap-1">{selectedGrade} • 专业学习助手 📚</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="relative p-2 rounded-xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg hover:scale-110 transition-all duration-300">
                  <Bell className="w-5 h-5 text-gray-600" />
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-xs text-white flex items-center justify-center font-bold">
                      {notifications.filter((n) => !n.read).length}
                    </span>
                  )}
                </button>

                <button className="p-2 rounded-xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg hover:scale-110 transition-all duration-300">
                  <Target className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* 专业搜索栏 */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="搜索错题、知识点... 🔍"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 rounded-xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg text-base placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
              />
            </div>
          </div>
        </header>

        <div className="px-4 py-6 space-y-8 md:px-6 md:ml-64">
          {/* 通知卡片 */}
          {notifications.filter((n) => !n.read).length > 0 && (
            <ModernCard variant="gradient" className="border-l-4 border-l-blue-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{notifications.filter((n) => !n.read)[0].title}</h3>
                    <p className="text-sm text-gray-600">{notifications.filter((n) => !n.read)[0].content}</p>
                  </div>
                </div>
                <GradientButton size="sm" variant="primary">
                  查看详情
                </GradientButton>
              </div>
            </ModernCard>
          )}

          {/* 学习统计仪表盘 */}
          <ModernCard variant="glass" className="text-center">
            <div className="flex justify-center mb-6">
              <ProgressRing progress={75} colors={["#3b82f6", "#6366f1"]} size={140} strokeWidth={10} />
            </div>

            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-2">
              本周学习进度
            </h2>
            <p className="text-gray-600 mb-6">你已经掌握了18道错题，继续保持！📈</p>

            <div className="grid grid-cols-3 gap-4">
              <StatsCard
                title="错题总数"
                value="24"
                icon={<BookOpen className="w-5 h-5 text-white" />}
                color="blue"
                trend="up"
              />
              <StatsCard
                title="已掌握"
                value="18"
                icon={<Trophy className="w-5 h-5 text-white" />}
                color="emerald"
                trend="up"
              />
              <StatsCard
                title="待复习"
                value="6"
                icon={<Target className="w-5 h-5 text-white" />}
                color="amber"
                trend="down"
              />
            </div>
          </ModernCard>

          {/* 快速操作区域 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ModernCard variant="gradient" className="text-center cursor-pointer group" hover>
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-500/25 group-hover:scale-110 transition-all duration-300">
                <Camera className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">拍照识别</h3>
              <p className="text-gray-600 mb-4">AI智能批改，精准识别错题 📸</p>
              <GradientButton variant="professional" size="md" className="w-full">
                立即拍照
              </GradientButton>
            </ModernCard>

            <ModernCard variant="gradient" className="text-center cursor-pointer group" hover>
              <div className="w-20 h-20 bg-gradient-to-br from-slate-600 via-gray-600 to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-slate-500/25 group-hover:scale-110 transition-all duration-300">
                <Upload className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">相册选择</h3>
              <p className="text-gray-600 mb-4">从相册选择图片，批量处理 📁</p>
              <GradientButton variant="secondary" size="md" className="w-full">
                选择图片
              </GradientButton>
            </ModernCard>
          </div>

          {/* 成就系统 */}
          <ModernCard variant="glass">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">学习成就</h2>
              <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700">
                4/10 解锁
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <AchievementBadge key={index} {...achievement} />
              ))}
            </div>
          </ModernCard>

          {/* 最近错题 */}
          <ModernCard variant="glass">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">最近错题</h2>
              </div>
              <GradientButton variant="professional" size="sm">
                查看全部
                <ChevronRight className="w-4 h-4 ml-1" />
              </GradientButton>
            </div>

            <div className="space-y-4">
              {recentMistakes.map((mistake) => (
                <div
                  key={mistake.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-white/60 to-blue-50/60 rounded-xl border border-white/30 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white text-lg font-bold">{mistake.subject[0]}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-gray-900 text-lg truncate">{mistake.topic}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-3 mt-1">
                        <span>{mistake.date}</span>
                        <Badge
                          variant={
                            mistake.status === "已掌握"
                              ? "default"
                              : mistake.status === "复习中"
                                ? "secondary"
                                : "destructive"
                          }
                          className="text-xs"
                        >
                          {mistake.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={
                      mistake.difficulty === "困难"
                        ? "destructive"
                        : mistake.difficulty === "中等"
                          ? "default"
                          : "secondary"
                    }
                    className="text-sm flex-shrink-0 ml-2"
                  >
                    {mistake.difficulty}
                  </Badge>
                </div>
              ))}
            </div>
          </ModernCard>

          {/* 快速访问功能 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ModernCard variant="soft" className="text-center cursor-pointer group" hover>
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all duration-300">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div className="font-semibold text-gray-900 text-sm">导出试卷</div>
              <div className="text-xs text-gray-500 mt-1">生成练习</div>
            </ModernCard>

            <ModernCard variant="soft" className="text-center cursor-pointer group" hover>
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="font-semibold text-gray-900 text-sm">学习报告</div>
              <div className="text-xs text-gray-500 mt-1">进度分析</div>
            </ModernCard>

            <ModernCard variant="soft" className="text-center cursor-pointer group" hover>
              <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="font-semibold text-gray-900 text-sm">相似题目</div>
              <div className="text-xs text-gray-500 mt-1">智能练习</div>
            </ModernCard>

            <ModernCard variant="soft" className="text-center cursor-pointer group" hover>
              <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-gray-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all duration-300">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="font-semibold text-gray-900 text-sm">积分中心</div>
              <div className="text-xs text-gray-500 mt-1">学习奖励</div>
            </ModernCard>
          </div>

          {/* 主要操作按钮 */}
          <div className="space-y-4">
            <GradientButton variant="primary" size="lg" className="w-full text-lg py-5">
              <Zap className="w-6 h-6 mr-3" />
              开始今日学习 📚
            </GradientButton>

            <div className="grid grid-cols-2 gap-4">
              <GradientButton variant="professional" size="md" className="py-4">
                <TrendingUp className="w-5 h-5 mr-2" />
                查看学习报告
              </GradientButton>
              <GradientButton variant="success" size="md" className="py-4">
                <BookOpen className="w-5 h-5 mr-2" />
                进入错题本
              </GradientButton>
            </div>
          </div>
        </div>

        {/* 浮动操作按钮 */}
        <FloatingActionButton
          onClick={() => handleQuickAction("快速拍照")}
          icon={<Camera className="w-8 h-8 text-white" />}
          className="bg-gradient-to-r from-blue-600 to-indigo-600"
        />
      </div>
    </MobileLayout>
  )
}
