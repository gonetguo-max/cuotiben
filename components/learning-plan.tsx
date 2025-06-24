"use client"

import { useState } from "react"
import { Calendar, Target, Clock, TrendingUp, Plus, Edit, CheckCircle, BookOpen, Zap } from "lucide-react"
import { ModernCard } from "@/components/ui/modern-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LearningPlan() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newPlan, setNewPlan] = useState({
    title: "",
    description: "",
    duration: "7",
    difficulty: "medium",
    subjects: [] as string[],
  })

  const currentPlans = [
    {
      id: "1",
      title: "二次函数专项突破",
      description: "针对二次函数相关错题，制定7天强化训练计划",
      duration: 7,
      progress: 65,
      status: "active",
      subjects: ["数学"],
      difficulty: "medium",
      startDate: "2024-01-15",
      endDate: "2024-01-22",
      dailyTasks: [
        { day: 1, task: "复习二次函数基本概念", completed: true, timeSpent: 45 },
        { day: 2, task: "练习配方法", completed: true, timeSpent: 50 },
        { day: 3, task: "掌握顶点式转换", completed: true, timeSpent: 40 },
        { day: 4, task: "求最值问题练习", completed: true, timeSpent: 55 },
        { day: 5, task: "图像性质分析", completed: false, timeSpent: 0 },
        { day: 6, task: "综合应用题", completed: false, timeSpent: 0 },
        { day: 7, task: "模拟测试", completed: false, timeSpent: 0 },
      ],
      targetMistakes: 12,
      masteredMistakes: 8,
    },
    {
      id: "2",
      title: "化学方程式配平训练",
      description: "系统学习化学方程式配平方法和技巧",
      duration: 5,
      progress: 20,
      status: "active",
      subjects: ["化学"],
      difficulty: "easy",
      startDate: "2024-01-18",
      endDate: "2024-01-23",
      dailyTasks: [
        { day: 1, task: "理解配平原理", completed: true, timeSpent: 30 },
        { day: 2, task: "简单配平练习", completed: false, timeSpent: 0 },
        { day: 3, task: "复杂方程式配平", completed: false, timeSpent: 0 },
        { day: 4, task: "氧化还原反应", completed: false, timeSpent: 0 },
        { day: 5, task: "综合测试", completed: false, timeSpent: 0 },
      ],
      targetMistakes: 8,
      masteredMistakes: 2,
    },
  ]

  const completedPlans = [
    {
      id: "3",
      title: "物理力学基础",
      description: "牛顿定律和力的分析专项训练",
      duration: 10,
      progress: 100,
      status: "completed",
      subjects: ["物理"],
      difficulty: "hard",
      completedDate: "2024-01-10",
      totalTimeSpent: 480,
      masteredMistakes: 15,
      rating: 4.5,
    },
  ]

  const aiRecommendations = [
    {
      title: "电路分析专项",
      reason: "你在电路相关题目上错误率较高",
      estimatedDuration: 6,
      difficulty: "medium",
      subjects: ["物理"],
      expectedImprovement: "提升30%正确率",
    },
    {
      title: "有机化学命名",
      reason: "有机化学命名规则需要加强",
      estimatedDuration: 4,
      difficulty: "easy",
      subjects: ["化学"],
      expectedImprovement: "掌握基本命名规则",
    },
  ]

  const handleCreatePlan = () => {
    // 创建新计划的逻辑
    console.log("Creating new plan:", newPlan)
    setShowCreateForm(false)
    setNewPlan({
      title: "",
      description: "",
      duration: "7",
      difficulty: "medium",
      subjects: [],
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "from-green-500 to-emerald-500"
      case "medium":
        return "from-yellow-500 to-orange-500"
      case "hard":
        return "from-red-500 to-pink-500"
      default:
        return "from-blue-500 to-indigo-500"
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "简单"
      case "medium":
        return "中等"
      case "hard":
        return "困难"
      default:
        return "未知"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-indigo-600/10 backdrop-blur-sm" />
        <div className="relative max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-xl shadow-purple-500/25">
                <Target className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-700 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  个性化学习计划
                </h1>
                <p className="text-gray-600">AI定制学习路径，高效提升成绩 🎯</p>
              </div>
            </div>
            <GradientButton
              variant="primary"
              size="lg"
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              创建新计划
            </GradientButton>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Tabs defaultValue="current" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 h-14 bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-2">
            <TabsTrigger
              value="current"
              className="rounded-xl text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
            >
              📚 进行中
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="rounded-xl text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
            >
              ✅ 已完成
            </TabsTrigger>
            <TabsTrigger
              value="ai-recommend"
              className="rounded-xl text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
            >
              🤖 AI推荐
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="rounded-xl text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
            >
              📊 学习分析
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {currentPlans.map((plan) => (
                <ModernCard
                  key={plan.id}
                  variant="glass"
                  className="cursor-pointer hover:scale-[1.02]"
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{plan.title}</h3>
                        <Badge className={`bg-gradient-to-r ${getDifficultyColor(plan.difficulty)} text-white`}>
                          {getDifficultyLabel(plan.difficulty)}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{plan.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {plan.duration}天计划
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {plan.subjects.join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{plan.progress}%</div>
                      <div className="text-sm text-gray-500">完成度</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">学习进度</span>
                        <span className="font-medium">
                          {plan.masteredMistakes}/{plan.targetMistakes} 道题
                        </span>
                      </div>
                      <Progress value={plan.progress} className="h-3" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-xl">
                        <div className="text-lg font-bold text-blue-600">
                          {plan.dailyTasks.filter((t) => t.completed).length}
                        </div>
                        <div className="text-sm text-blue-500">已完成任务</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-xl">
                        <div className="text-lg font-bold text-green-600">
                          {plan.dailyTasks.reduce((sum, t) => sum + t.timeSpent, 0)}
                        </div>
                        <div className="text-sm text-green-500">学习时长(分钟)</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <GradientButton variant="primary" size="sm" className="flex-1">
                        继续学习
                      </GradientButton>
                      <GradientButton variant="secondary" size="sm">
                        <Edit className="w-4 h-4" />
                      </GradientButton>
                    </div>
                  </div>
                </ModernCard>
              ))}
            </div>

            {/* 详细计划视图 */}
            {selectedPlan && (
              <ModernCard variant="gradient">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">每日学习任务</h2>
                  <GradientButton variant="secondary" onClick={() => setSelectedPlan(null)}>
                    收起详情
                  </GradientButton>
                </div>

                <div className="space-y-4">
                  {currentPlans
                    .find((p) => p.id === selectedPlan)
                    ?.dailyTasks.map((task, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          task.completed
                            ? "bg-green-50 border-green-200"
                            : index ===
                                currentPlans
                                  .find((p) => p.id === selectedPlan)
                                  ?.dailyTasks.findIndex((t) => !t.completed)
                              ? "bg-blue-50 border-blue-300 shadow-lg"
                              : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                                task.completed
                                  ? "bg-green-500 text-white"
                                  : index ===
                                      currentPlans
                                        .find((p) => p.id === selectedPlan)
                                        ?.dailyTasks.findIndex((t) => !t.completed)
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-300 text-gray-600"
                              }`}
                            >
                              {task.completed ? <CheckCircle className="w-5 h-5" /> : `D${task.day}`}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                第{task.day}天：{task.task}
                              </h4>
                              <div className="flex items-center gap-3 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {task.timeSpent > 0 ? `${task.timeSpent}分钟` : "预计45分钟"}
                                </span>
                                {task.completed && (
                                  <Badge variant="default" className="bg-green-100 text-green-700">
                                    已完成
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          {!task.completed &&
                            index ===
                              currentPlans
                                .find((p) => p.id === selectedPlan)
                                ?.dailyTasks.findIndex((t) => !t.completed) && (
                              <GradientButton variant="primary" size="sm">
                                开始学习
                              </GradientButton>
                            )}
                        </div>
                      </div>
                    ))}
                </div>
              </ModernCard>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {completedPlans.map((plan) => (
                <ModernCard key={plan.id} variant="glass" className="border-2 border-green-200 bg-green-50/30">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{plan.title}</h3>
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">已完成</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{plan.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          完成于 {plan.completedDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {Math.floor(plan.totalTimeSpent / 60)}小时{plan.totalTimeSpent % 60}分钟
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">100%</div>
                      <div className="text-sm text-gray-500">已完成</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-xl">
                        <div className="text-lg font-bold text-green-600">{plan.masteredMistakes}</div>
                        <div className="text-sm text-green-500">掌握题目</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-xl">
                        <div className="text-lg font-bold text-blue-600">{plan.duration}</div>
                        <div className="text-sm text-blue-500">学习天数</div>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-xl">
                        <div className="text-lg font-bold text-yellow-600">{plan.rating}</div>
                        <div className="text-sm text-yellow-500">学习评分</div>
                      </div>
                    </div>

                    <GradientButton variant="success" size="sm" className="w-full">
                      查看学习报告
                    </GradientButton>
                  </div>
                </ModernCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ai-recommend" className="space-y-6">
            <ModernCard variant="gradient">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">AI智能推荐</h2>
                  <p className="text-gray-600">基于你的学习数据，AI为你推荐最适合的学习计划</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {aiRecommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/30 shadow-lg"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{rec.title}</h3>
                        <p className="text-gray-600 mb-3">{rec.reason}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {rec.estimatedDuration}天
                          </span>
                          <Badge className={`bg-gradient-to-r ${getDifficultyColor(rec.difficulty)} text-white`}>
                            {getDifficultyLabel(rec.difficulty)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-xl">
                        <div className="text-sm font-medium text-blue-700 mb-1">预期效果</div>
                        <div className="text-blue-600">{rec.expectedImprovement}</div>
                      </div>

                      <div className="flex gap-2">
                        <GradientButton variant="primary" size="sm" className="flex-1">
                          采用此计划
                        </GradientButton>
                        <GradientButton variant="secondary" size="sm">
                          自定义
                        </GradientButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ModernCard>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ModernCard variant="glass" className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">总计划数</h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
                <div className="text-sm text-gray-500">3个进行中，2个已完成</div>
              </ModernCard>

              <ModernCard variant="glass" className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">完成率</h3>
                <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                <div className="text-sm text-gray-500">高于平均水平</div>
              </ModernCard>

              <ModernCard variant="glass" className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">学习时长</h3>
                <div className="text-3xl font-bold text-purple-600 mb-2">24h</div>
                <div className="text-sm text-gray-500">本月累计</div>
              </ModernCard>
            </div>

            <ModernCard variant="gradient">
              <h3 className="text-xl font-bold text-gray-900 mb-6">学习效果分析</h3>
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">学习效果图表</h4>
                  <p className="text-gray-600">（此处可集成图表库显示学习趋势）</p>
                </div>
              </div>
            </ModernCard>
          </TabsContent>
        </Tabs>

        {/* 创建新计划表单 */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <ModernCard variant="glass" className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">创建学习计划</h2>
                <GradientButton variant="secondary" onClick={() => setShowCreateForm(false)}>
                  取消
                </GradientButton>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="title">计划标题</Label>
                  <Input
                    id="title"
                    value={newPlan.title}
                    onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
                    placeholder="例如：三角函数专项训练"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">计划描述</Label>
                  <Textarea
                    id="description"
                    value={newPlan.description}
                    onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                    placeholder="描述这个学习计划的目标和内容..."
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">学习天数</Label>
                    <Select
                      value={newPlan.duration}
                      onValueChange={(value) => setNewPlan({ ...newPlan, duration: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3天</SelectItem>
                        <SelectItem value="5">5天</SelectItem>
                        <SelectItem value="7">7天</SelectItem>
                        <SelectItem value="10">10天</SelectItem>
                        <SelectItem value="14">14天</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="difficulty">难度等级</Label>
                    <Select
                      value={newPlan.difficulty}
                      onValueChange={(value) => setNewPlan({ ...newPlan, difficulty: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">简单</SelectItem>
                        <SelectItem value="medium">中等</SelectItem>
                        <SelectItem value="hard">困难</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <GradientButton variant="primary" onClick={handleCreatePlan} className="flex-1">
                    创建计划
                  </GradientButton>
                  <GradientButton variant="secondary" onClick={() => setShowCreateForm(false)}>
                    取消
                  </GradientButton>
                </div>
              </div>
            </ModernCard>
          </div>
        )}
      </main>
    </div>
  )
}
