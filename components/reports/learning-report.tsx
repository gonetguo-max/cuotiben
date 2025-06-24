"use client"

import { useState } from "react"
import { TrendingUp, Target, Award, BookOpen, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LearningReport() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")

  const weeklyStats = {
    totalMistakes: 24,
    masteredMistakes: 18,
    studyTime: 320, // minutes
    subjects: {
      数学: { mistakes: 12, mastered: 9, accuracy: 75 },
      物理: { mistakes: 8, mastered: 6, accuracy: 75 },
      化学: { mistakes: 4, mastered: 3, accuracy: 75 },
    },
    dailyProgress: [
      { day: "周一", mistakes: 5, mastered: 3 },
      { day: "周二", mistakes: 3, mastered: 2 },
      { day: "周三", mistakes: 4, mastered: 4 },
      { day: "周四", mistakes: 6, mastered: 4 },
      { day: "周五", mistakes: 3, mastered: 2 },
      { day: "周六", mistakes: 2, mastered: 2 },
      { day: "周日", mistakes: 1, mastered: 1 },
    ],
    weakPoints: [
      { topic: "二次函数", subject: "数学", mistakes: 5, difficulty: "中等" },
      { topic: "电路分析", subject: "物理", mistakes: 3, difficulty: "困难" },
      { topic: "化学方程式", subject: "化学", mistakes: 2, difficulty: "简单" },
    ],
    achievements: [
      { title: "连续学习7天", description: "坚持每天学习", icon: "🔥" },
      { title: "数学进步奖", description: "数学掌握率提升20%", icon: "📈" },
      { title: "错题清零", description: "本周新增错题全部掌握", icon: "✅" },
    ],
  }

  const masteryRate = Math.round((weeklyStats.masteredMistakes / weeklyStats.totalMistakes) * 100)
  const studyHours = Math.floor(weeklyStats.studyTime / 60)
  const studyMinutes = weeklyStats.studyTime % 60

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">学习报告</h1>
                <p className="text-sm text-gray-500">了解你的学习进度和成长轨迹</p>
              </div>
            </div>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">本周</SelectItem>
                <SelectItem value="month">本月</SelectItem>
                <SelectItem value="semester">本学期</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">总错题数</p>
                  <p className="text-2xl font-bold text-gray-900">{weeklyStats.totalMistakes}</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">已掌握</p>
                  <p className="text-2xl font-bold text-green-600">{weeklyStats.masteredMistakes}</p>
                </div>
                <Target className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">掌握率</p>
                  <p className="text-2xl font-bold text-purple-600">{masteryRate}%</p>
                </div>
                <Award className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">学习时长</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {studyHours}h{studyMinutes}m
                  </p>
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">总览</TabsTrigger>
            <TabsTrigger value="subjects">学科分析</TabsTrigger>
            <TabsTrigger value="progress">进度追踪</TabsTrigger>
            <TabsTrigger value="suggestions">学习建议</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Subject Performance */}
            <Card>
              <CardHeader>
                <CardTitle>学科表现</CardTitle>
                <CardDescription>各学科错题掌握情况</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(weeklyStats.subjects).map(([subject, data]) => (
                  <div key={subject} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{subject}</span>
                      <span className="text-sm text-gray-500">
                        {data.mastered}/{data.mistakes} ({data.accuracy}%)
                      </span>
                    </div>
                    <Progress value={data.accuracy} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>本周成就</CardTitle>
                <CardDescription>你的学习成果</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {weeklyStats.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"
                    >
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subjects" className="space-y-6">
            {/* Weak Points Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>薄弱知识点</CardTitle>
                <CardDescription>需要重点关注的知识点</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weeklyStats.weakPoints.map((point, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 text-sm font-medium">{point.subject[0]}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{point.topic}</h4>
                          <p className="text-sm text-gray-500">
                            {point.subject} • {point.mistakes}道错题
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            point.difficulty === "困难"
                              ? "destructive"
                              : point.difficulty === "中等"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {point.difficulty}
                        </Badge>
                        <Button size="sm" variant="outline">
                          专项练习
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            {/* Daily Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle>每日学习进度</CardTitle>
                <CardDescription>本周每日错题和掌握情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyStats.dailyProgress.map((day, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 text-sm text-gray-600">{day.day}</div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(day.mistakes / 6) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500 w-16">{day.mistakes}道错题</span>
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${(day.mastered / 4) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500 w-16">{day.mastered}道掌握</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-6">
            {/* AI Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle>AI学习建议</CardTitle>
                <CardDescription>基于你的学习数据生成的个性化建议</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-medium text-blue-900 mb-2">📚 学习重点</h4>
                  <p className="text-blue-800 text-sm">
                    建议重点复习"二次函数"相关知识点，这是你本周错误最多的知识点。可以通过做相似题目来加强理解。
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-medium text-green-900 mb-2">⏰ 学习时间</h4>
                  <p className="text-green-800 text-sm">
                    你的学习时间分布很均匀，建议保持每天30-45分钟的学习节奏，这样有助于知识的巩固。
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-medium text-purple-900 mb-2">🎯 学习方法</h4>
                  <p className="text-purple-800 text-sm">
                    你在物理学科的掌握率较高，可以尝试将物理的学习方法应用到数学学习中，注重理解概念的本质。
                  </p>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-medium text-orange-900 mb-2">📈 进步空间</h4>
                  <p className="text-orange-800 text-sm">
                    化学是你的优势学科，可以考虑挑战更高难度的题目，或者帮助同学解答化学问题来巩固知识。
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
