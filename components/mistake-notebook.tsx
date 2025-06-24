"use client"

import { useState } from "react"
import { BookOpen, Search, Calendar, Tag, TrendingUp, FileText, Play, Filter, Star } from "lucide-react"
import { ModernCard } from "@/components/ui/modern-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { StatsCard } from "@/components/ui/stats-card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MistakeNotebook() {
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const mistakes = [
    {
      id: 1,
      subject: "数学",
      topic: "二次函数",
      question: "求函数 f(x) = x² - 4x + 3 的最小值",
      studentAnswer: "最小值为 1",
      correctAnswer: "最小值为 -1",
      errorType: "计算错误",
      difficulty: "中等",
      date: "2024-01-15",
      mastered: false,
      reviewCount: 2,
    },
    {
      id: 2,
      subject: "物理",
      topic: "牛顿第二定律",
      question: "质量为2kg的物体受到10N的力，求加速度",
      studentAnswer: "a = 20 m/s²",
      correctAnswer: "a = 5 m/s²",
      errorType: "公式应用错误",
      difficulty: "简单",
      date: "2024-01-14",
      mastered: true,
      reviewCount: 3,
    },
    {
      id: 3,
      subject: "化学",
      topic: "化学方程式配平",
      question: "配平方程式：Al + HCl → AlCl₃ + H₂",
      studentAnswer: "Al + 3HCl → AlCl₃ + H₂",
      correctAnswer: "2Al + 6HCl → 2AlCl₃ + 3H₂",
      errorType: "配平错误",
      difficulty: "困难",
      date: "2024-01-13",
      mastered: false,
      reviewCount: 1,
    },
  ]

  const filteredMistakes = mistakes.filter((mistake) => {
    const matchesSubject = selectedSubject === "all" || mistake.subject === selectedSubject
    const matchesDifficulty = selectedDifficulty === "all" || mistake.difficulty === selectedDifficulty
    const matchesSearch =
      searchQuery === "" ||
      mistake.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mistake.question.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSubject && matchesDifficulty && matchesSearch
  })

  const subjectStats = {
    数学: { total: 12, mastered: 8, pending: 4 },
    物理: { total: 8, mastered: 6, pending: 2 },
    化学: { total: 6, mastered: 3, pending: 3 },
    英语: { total: 4, mastered: 2, pending: 2 },
  }

  const getSubjectColor = (subject: string) => {
    const colors = {
      数学: "from-blue-500 to-cyan-500",
      物理: "from-purple-500 to-indigo-500",
      化学: "from-green-500 to-emerald-500",
      英语: "from-orange-500 to-red-500",
    }
    return colors[subject as keyof typeof colors] || "from-gray-500 to-gray-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-pink-600/10 to-purple-600/10 backdrop-blur-sm" />
        <div className="relative max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl shadow-red-500/25">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  智能错题本
                </h1>
                <p className="text-gray-600">管理和复习你的错题 📚</p>
              </div>
            </div>
            <GradientButton variant="primary" size="lg">
              <FileText className="w-5 h-5 mr-2" />
              导出试卷 ✨
            </GradientButton>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Tabs defaultValue="mistakes" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 h-14 bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-2">
            <TabsTrigger
              value="mistakes"
              className="rounded-xl text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              📝 错题列表
            </TabsTrigger>
            <TabsTrigger
              value="statistics"
              className="rounded-xl text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              📊 学习统计
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mistakes" className="space-y-8">
            {/* Filters */}
            <ModernCard variant="glass">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Filter className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">筛选条件</h3>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="搜索题目或知识点... 🔍"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 rounded-2xl bg-white/70 border-white/20 text-base"
                    />
                  </div>
                </div>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-full md:w-40 rounded-2xl bg-white/70 border-white/20">
                    <SelectValue placeholder="学科" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部学科</SelectItem>
                    <SelectItem value="数学">📐 数学</SelectItem>
                    <SelectItem value="物理">⚡ 物理</SelectItem>
                    <SelectItem value="化学">🧪 化学</SelectItem>
                    <SelectItem value="英语">🌍 英语</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-full md:w-40 rounded-2xl bg-white/70 border-white/20">
                    <SelectValue placeholder="难度" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部难度</SelectItem>
                    <SelectItem value="简单">🟢 简单</SelectItem>
                    <SelectItem value="中等">🟡 中等</SelectItem>
                    <SelectItem value="困难">🔴 困难</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </ModernCard>

            {/* Mistakes List */}
            <div className="space-y-6">
              {filteredMistakes.map((mistake) => (
                <ModernCard
                  key={mistake.id}
                  variant="glass"
                  className={`transition-all hover:shadow-2xl ${mistake.mastered ? "bg-green-50/50 border-green-200/50" : ""}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white shadow-lg bg-gradient-to-br ${getSubjectColor(mistake.subject)}`}
                      >
                        {mistake.subject[0]}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{mistake.topic}</h3>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge variant="outline" className="text-sm bg-white/70 border-purple-200">
                            {mistake.subject}
                          </Badge>
                          <Badge
                            variant={
                              mistake.difficulty === "困难"
                                ? "destructive"
                                : mistake.difficulty === "中等"
                                  ? "default"
                                  : "secondary"
                            }
                            className="text-sm"
                          >
                            {mistake.difficulty}
                          </Badge>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {mistake.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {mistake.mastered && (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">✅ 已掌握</Badge>
                      )}
                      <span className="text-sm text-gray-500 bg-white/70 px-3 py-1 rounded-full">
                        复习 {mistake.reviewCount} 次
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-white/70 rounded-2xl border border-white/30">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">📝 题目</h4>
                      <p className="text-gray-900 leading-relaxed">{mistake.question}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-red-50 rounded-2xl border border-red-200">
                        <h4 className="text-sm font-semibold text-red-700 mb-2">❌ 我的答案</h4>
                        <p className="text-red-600">{mistake.studentAnswer}</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-2xl border border-green-200">
                        <h4 className="text-sm font-semibold text-green-700 mb-2">✅ 正确答案</h4>
                        <p className="text-green-600">{mistake.correctAnswer}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/30">
                      <Badge variant="destructive" className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                        <Tag className="w-3 h-3 mr-1" />
                        {mistake.errorType}
                      </Badge>
                      <div className="flex gap-3">
                        <GradientButton size="sm" variant="secondary">
                          <Play className="w-4 h-4 mr-1" />
                          详细讲解
                        </GradientButton>
                        <GradientButton size="sm" variant="neon">
                          🎯 生成相似题
                        </GradientButton>
                        <GradientButton size="sm" variant={mistake.mastered ? "success" : "primary"}>
                          {mistake.mastered ? "✅ 已掌握" : "📚 标记掌握"}
                        </GradientButton>
                      </div>
                    </div>
                  </div>
                </ModernCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-8">
            {/* Subject Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(subjectStats).map(([subject, stats]) => (
                <ModernCard key={subject} variant="glass">
                  <div className="text-center">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getSubjectColor(subject)} flex items-center justify-center mx-auto mb-4 shadow-xl`}
                    >
                      <span className="text-white text-2xl font-bold">{subject[0]}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{subject}</h3>

                    <div className="space-y-3">
                      <StatsCard title="总错题数" value={stats.total} color="purple" />
                      <StatsCard title="已掌握" value={stats.mastered} color="green" trend="up" />
                      <StatsCard title="待复习" value={stats.pending} color="orange" trend="down" />

                      <div className="pt-3">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">掌握率</span>
                          <span className="font-bold">{Math.round((stats.mastered / stats.total) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full bg-gradient-to-r ${getSubjectColor(subject)} transition-all duration-1000 ease-out`}
                            style={{ width: `${(stats.mastered / stats.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ModernCard>
              ))}
            </div>

            {/* Learning Trends */}
            <ModernCard variant="gradient">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">学习趋势</h2>
                  <p className="text-gray-600">最近30天的错题和掌握情况</p>
                </div>
              </div>

              <div className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <TrendingUp className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">学习趋势图表</h3>
                  <p className="text-gray-600">（此处可集成图表库显示详细数据）</p>
                  <GradientButton variant="primary" size="lg" className="mt-4">
                    <Star className="w-5 h-5 mr-2" />
                    查看详细报告
                  </GradientButton>
                </div>
              </div>
            </ModernCard>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
