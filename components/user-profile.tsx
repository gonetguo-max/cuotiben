"use client"

import { useState } from "react"
import {
  User,
  Edit,
  Camera,
  Award,
  TrendingUp,
  BookOpen,
  Calendar,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Save,
  X,
} from "lucide-react"
import { ModernCard } from "@/components/ui/modern-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { AchievementBadge } from "@/components/ui/achievement-badge"
import { StatsCard } from "@/components/ui/stats-card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "小明",
    email: "xiaoming@example.com",
    phone: "138****8888",
    grade: "初中二年级",
    school: "北京市第一中学",
    subjects: ["数学", "物理", "化学"],
    bio: "热爱学习，希望通过错题本提升成绩！",
    avatar: "/placeholder.svg?height=120&width=120&text=小明",
    joinDate: "2024-01-01",
    location: "北京市",
  })

  const [editForm, setEditForm] = useState(userInfo)

  const userStats = {
    totalMistakes: 156,
    masteredMistakes: 118,
    studyDays: 45,
    studyHours: 89,
    currentStreak: 7,
    longestStreak: 15,
    averageAccuracy: 85,
    improvementRate: 23,
  }

  const recentAchievements = [
    {
      title: "学习达人",
      description: "连续学习30天",
      icon: "zap" as const,
      color: "gold" as const,
      unlocked: true,
      date: "2024-01-20",
    },
    {
      title: "数学专家",
      description: "数学错题掌握率达到90%",
      icon: "trophy" as const,
      color: "blue" as const,
      unlocked: true,
      date: "2024-01-18",
    },
    {
      title: "坚持不懈",
      description: "连续学习7天",
      icon: "target" as const,
      color: "emerald" as const,
      unlocked: true,
      date: "2024-01-15",
    },
  ]

  const learningHistory = [
    { date: "2024-01-20", subject: "数学", mistakes: 3, mastered: 2, timeSpent: 45 },
    { date: "2024-01-19", subject: "物理", mistakes: 2, mastered: 2, timeSpent: 30 },
    { date: "2024-01-18", subject: "化学", mistakes: 4, mastered: 3, timeSpent: 50 },
    { date: "2024-01-17", subject: "数学", mistakes: 5, mastered: 4, timeSpent: 60 },
    { date: "2024-01-16", subject: "物理", mistakes: 1, mastered: 1, timeSpent: 25 },
  ]

  const handleSave = () => {
    setUserInfo(editForm)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm(userInfo)
    setIsEditing(false)
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 backdrop-blur-sm" />
        <div className="relative max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl shadow-blue-500/25">
                <User className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                  个人资料
                </h1>
                <p className="text-gray-600">管理你的个人信息和学习数据 👤</p>
              </div>
            </div>
            {!isEditing && (
              <GradientButton
                variant="primary"
                size="lg"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2"
              >
                <Edit className="w-5 h-5" />
                编辑资料
              </GradientButton>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧个人信息 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 头像和基本信息 */}
            <ModernCard variant="glass">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-24 h-24 mx-auto shadow-xl">
                    <AvatarImage src={userInfo.avatar || "/placeholder.svg"} alt={userInfo.name} />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                      {userInfo.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-300">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">姓名</Label>
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">个人简介</Label>
                      <Textarea
                        id="bio"
                        value={editForm.bio}
                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{userInfo.name}</h2>
                    <p className="text-gray-600 mb-4">{userInfo.bio}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {userInfo.subjects.map((subject) => (
                        <Badge key={subject} className={`bg-gradient-to-r ${getSubjectColor(subject)} text-white`}>
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ModernCard>

            {/* 联系信息 */}
            <ModernCard variant="glass">
              <h3 className="text-lg font-bold text-gray-900 mb-4">联系信息</h3>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">邮箱</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">手机号</Label>
                    <Input
                      id="phone"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">所在地</Label>
                    <Input
                      id="location"
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{userInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{userInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{userInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">加入于 {userInfo.joinDate}</span>
                  </div>
                </div>
              )}
            </ModernCard>

            {/* 学习信息 */}
            <ModernCard variant="glass">
              <h3 className="text-lg font-bold text-gray-900 mb-4">学习信息</h3>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="grade">年级</Label>
                    <Select
                      value={editForm.grade}
                      onValueChange={(value) => setEditForm({ ...editForm, grade: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="小学三年级">小学三年级</SelectItem>
                        <SelectItem value="小学四年级">小学四年级</SelectItem>
                        <SelectItem value="小学五年级">小学五年级</SelectItem>
                        <SelectItem value="小学六年级">小学六年级</SelectItem>
                        <SelectItem value="初中一年级">初中一年级</SelectItem>
                        <SelectItem value="初中二年级">初中二年级</SelectItem>
                        <SelectItem value="初中三年级">初中三年级</SelectItem>
                        <SelectItem value="高中一年级">高中一年级</SelectItem>
                        <SelectItem value="高中二年级">高中二年级</SelectItem>
                        <SelectItem value="高中三年级">高中三年级</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="school">学校</Label>
                    <Input
                      id="school"
                      value={editForm.school}
                      onChange={(e) => setEditForm({ ...editForm, school: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{userInfo.grade}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{userInfo.school}</span>
                  </div>
                </div>
              )}
            </ModernCard>

            {/* 编辑按钮 */}
            {isEditing && (
              <div className="flex gap-3">
                <GradientButton variant="success" onClick={handleSave} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  保存
                </GradientButton>
                <GradientButton variant="secondary" onClick={handleCancel} className="flex-1">
                  <X className="w-4 h-4 mr-2" />
                  取消
                </GradientButton>
              </div>
            )}
          </div>

          {/* 右侧详细信息 */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="stats" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 h-14 bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-2">
                <TabsTrigger
                  value="stats"
                  className="rounded-xl text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
                >
                  📊 学习统计
                </TabsTrigger>
                <TabsTrigger
                  value="achievements"
                  className="rounded-xl text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
                >
                  🏆 成就徽章
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="rounded-xl text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
                >
                  📚 学习历史
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stats" className="space-y-6">
                {/* 核心统计数据 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatsCard
                    title="总错题数"
                    value={userStats.totalMistakes}
                    icon={<BookOpen className="w-5 h-5 text-white" />}
                    color="blue"
                    trend="up"
                  />
                  <StatsCard
                    title="已掌握"
                    value={userStats.masteredMistakes}
                    icon={<Award className="w-5 h-5 text-white" />}
                    color="emerald"
                    trend="up"
                  />
                  <StatsCard
                    title="学习天数"
                    value={userStats.studyDays}
                    icon={<Calendar className="w-5 h-5 text-white" />}
                    color="indigo"
                    trend="up"
                  />
                  <StatsCard
                    title="学习时长"
                    value={`${userStats.studyHours}h`}
                    icon={<TrendingUp className="w-5 h-5 text-white" />}
                    color="amber"
                    trend="up"
                  />
                </div>

                {/* 详细统计 */}
                <ModernCard variant="gradient">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">学习表现分析</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-white/80 backdrop-blur-xl rounded-xl border border-white/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600">掌握率</span>
                          <span className="text-2xl font-bold text-green-600">
                            {Math.round((userStats.masteredMistakes / userStats.totalMistakes) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000"
                            style={{ width: `${(userStats.masteredMistakes / userStats.totalMistakes) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="p-4 bg-white/80 backdrop-blur-xl rounded-xl border border-white/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600">平均正确率</span>
                          <span className="text-2xl font-bold text-blue-600">{userStats.averageAccuracy}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000"
                            style={{ width: `${userStats.averageAccuracy}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-white/80 backdrop-blur-xl rounded-xl border border-white/30">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-orange-600 mb-1">{userStats.currentStreak}</div>
                          <div className="text-sm text-gray-600">当前连续学习天数</div>
                          <div className="text-xs text-gray-500 mt-1">最长记录: {userStats.longestStreak}天</div>
                        </div>
                      </div>

                      <div className="p-4 bg-white/80 backdrop-blur-xl rounded-xl border border-white/30">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600 mb-1">+{userStats.improvementRate}%</div>
                          <div className="text-sm text-gray-600">本月提升率</div>
                          <div className="text-xs text-gray-500 mt-1">相比上月表现</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ModernCard>

                {/* 学科分布 */}
                <ModernCard variant="glass">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">学科错题分布</h3>
                  <div className="space-y-4">
                    {userInfo.subjects.map((subject) => {
                      const subjectData = {
                        数学: { total: 68, mastered: 52, percentage: 76 },
                        物理: { total: 45, mastered: 38, percentage: 84 },
                        化学: { total: 43, mastered: 28, percentage: 65 },
                      }[subject] || { total: 0, mastered: 0, percentage: 0 }

                      return (
                        <div key={subject} className="p-4 bg-white/60 rounded-xl border border-white/30">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getSubjectColor(subject)} flex items-center justify-center text-white font-bold`}
                              >
                                {subject[0]}
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900">{subject}</h4>
                                <p className="text-sm text-gray-500">
                                  {subjectData.mastered}/{subjectData.total} 已掌握
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-gray-900">{subjectData.percentage}%</div>
                              <div className="text-sm text-gray-500">掌握率</div>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r ${getSubjectColor(subject)} transition-all duration-1000`}
                              style={{ width: `${subjectData.percentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ModernCard>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <ModernCard variant="glass">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">最近获得的成就</h3>
                  </div>

                  <div className="space-y-4">
                    {recentAchievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-white/30"
                      >
                        <AchievementBadge {...achievement} />
                        <div className="text-right text-sm text-gray-500">获得于 {achievement.date}</div>
                      </div>
                    ))}
                  </div>
                </ModernCard>

                <ModernCard variant="gradient">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">成就进度</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AchievementBadge
                      title="错题终结者"
                      description="掌握100道错题"
                      icon="trophy"
                      color="gold"
                      unlocked={false}
                      progress={75}
                    />
                    <AchievementBadge
                      title="学习马拉松"
                      description="连续学习30天"
                      icon="zap"
                      color="blue"
                      unlocked={false}
                      progress={50}
                    />
                    <AchievementBadge
                      title="全科学霸"
                      description="所有学科掌握率达到80%"
                      icon="crown"
                      color="indigo"
                      unlocked={false}
                      progress={85}
                    />
                    <AchievementBadge
                      title="时间管理大师"
                      description="单月学习时长达到50小时"
                      icon="target"
                      color="emerald"
                      unlocked={false}
                      progress={60}
                    />
                  </div>
                </ModernCard>
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <ModernCard variant="glass">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">最近学习记录</h3>
                  <div className="space-y-3">
                    {learningHistory.map((record, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-white/30 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getSubjectColor(record.subject)} flex items-center justify-center text-white font-bold shadow-lg`}
                          >
                            {record.subject[0]}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{record.subject}</div>
                            <div className="text-sm text-gray-500">{record.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <div className="text-center">
                            <div className="font-bold text-blue-600">{record.mistakes}</div>
                            <div className="text-gray-500">错题数</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-green-600">{record.mastered}</div>
                            <div className="text-gray-500">已掌握</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-purple-600">{record.timeSpent}min</div>
                            <div className="text-gray-500">学习时长</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ModernCard>

                <ModernCard variant="gradient">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">学习趋势图表</h3>
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                        <TrendingUp className="w-10 h-10 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">学习趋势分析</h4>
                      <p className="text-gray-600">（此处可集成图表库显示学习数据趋势）</p>
                    </div>
                  </div>
                </ModernCard>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
