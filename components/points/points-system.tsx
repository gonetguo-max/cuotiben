"use client"

import { useState } from "react"
import { Coins, Upload, Users, Calendar, Trophy, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PointsSystem() {
  const [currentPoints, setCurrentPoints] = useState(1250)
  const [totalEarned, setTotalEarned] = useState(3480)

  const pointsHistory = [
    { id: 1, action: "上传题目", points: 10, date: "2024-01-15", type: "earn" },
    { id: 2, action: "错题讲解", points: -5, date: "2024-01-15", type: "spend" },
    { id: 3, action: "每日签到", points: 5, date: "2024-01-14", type: "earn" },
    { id: 4, action: "生成相似题", points: -10, date: "2024-01-14", type: "spend" },
    { id: 5, action: "上传试卷", points: 50, date: "2024-01-13", type: "earn" },
  ]

  const earnTasks = [
    {
      title: "每日签到",
      description: "每天登录应用",
      points: 5,
      icon: Calendar,
      completed: true,
    },
    {
      title: "上传题目",
      description: "上传1道标准题目+答案",
      points: 10,
      icon: Upload,
      completed: false,
    },
    {
      title: "上传试卷",
      description: "上传1套完整试卷+答案",
      points: 50,
      icon: Upload,
      completed: false,
    },
    {
      title: "邀请好友",
      description: "邀请1位好友注册",
      points: 100,
      icon: Users,
      completed: false,
    },
  ]

  const redeemItems = [
    {
      title: "错题详细讲解",
      description: "获得1次AI详细讲解",
      points: 5,
      icon: Star,
      available: true,
    },
    {
      title: "相似题目生成",
      description: "生成1次相似练习题",
      points: 10,
      icon: Star,
      available: true,
    },
    {
      title: "试卷导出",
      description: "导出1份练习试卷",
      points: 15,
      icon: Star,
      available: true,
    },
    {
      title: "学习报告",
      description: "生成1份详细学习报告",
      points: 20,
      icon: Star,
      available: true,
    },
    {
      title: "高级版体验",
      description: "7天高级版功能体验",
      points: 200,
      icon: Trophy,
      available: currentPoints >= 200,
    },
  ]

  const nextLevelPoints = 1500
  const progressToNext = (currentPoints / nextLevelPoints) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Coins className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">积分中心</h1>
              <p className="text-sm text-gray-500">通过学习和贡献获得积分，兑换高级功能</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Points Overview */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">{currentPoints.toLocaleString()}</h2>
                <p className="text-blue-100">当前积分</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">{totalEarned.toLocaleString()}</p>
                <p className="text-blue-100">累计获得</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>距离下一等级</span>
                <span>{nextLevelPoints - currentPoints} 积分</span>
              </div>
              <Progress value={progressToNext} className="h-2 bg-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="earn" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="earn">赚取积分</TabsTrigger>
            <TabsTrigger value="redeem">兑换功能</TabsTrigger>
            <TabsTrigger value="history">积分记录</TabsTrigger>
          </TabsList>

          <TabsContent value="earn" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>每日任务</CardTitle>
                <CardDescription>完成任务获得积分奖励</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {earnTasks.map((task, index) => {
                  const Icon = task.icon
                  return (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            task.completed ? "bg-green-100" : "bg-gray-100"
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${task.completed ? "text-green-600" : "text-gray-600"}`} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{task.title}</h4>
                          <p className="text-sm text-gray-500">{task.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={task.completed ? "default" : "secondary"}>+{task.points} 积分</Badge>
                        {task.completed ? (
                          <Badge variant="default" className="bg-green-100 text-green-700">
                            已完成
                          </Badge>
                        ) : (
                          <Button size="sm">去完成</Button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Bonus Activities */}
            <Card>
              <CardHeader>
                <CardTitle>额外奖励</CardTitle>
                <CardDescription>特殊活动和成就奖励</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-yellow-900">连续签到奖励</h4>
                      <p className="text-sm text-yellow-700">连续签到7天额外获得50积分</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">进行中 (3/7)</Badge>
                  </div>
                </div>

                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-purple-900">内容贡献奖</h4>
                      <p className="text-sm text-purple-700">本月上传题目数量前10名获得额外奖励</p>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">排名: 第5名</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="redeem" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {redeemItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <Card key={index} className={`${!item.available ? "opacity-50" : ""}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-orange-600 border-orange-200">
                              {item.points} 积分
                            </Badge>
                            <Button
                              size="sm"
                              disabled={!item.available}
                              variant={item.available ? "default" : "outline"}
                            >
                              {item.available ? "立即兑换" : "积分不足"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>积分记录</CardTitle>
                <CardDescription>查看你的积分获得和消费记录</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pointsHistory.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-3 border-b last:border-b-0">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            record.type === "earn" ? "bg-green-100" : "bg-red-100"
                          }`}
                        >
                          {record.type === "earn" ? (
                            <span className="text-green-600 text-sm">+</span>
                          ) : (
                            <span className="text-red-600 text-sm">-</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{record.action}</h4>
                          <p className="text-sm text-gray-500">{record.date}</p>
                        </div>
                      </div>
                      <div className={`font-medium ${record.type === "earn" ? "text-green-600" : "text-red-600"}`}>
                        {record.type === "earn" ? "+" : ""}
                        {record.points}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
