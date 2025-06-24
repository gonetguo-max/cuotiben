"use client"

import { useState } from "react"
import { GraduationCap, User, Save, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function GradeSettings() {
  const [selectedGrade, setSelectedGrade] = useState("初中二年级")
  const [userName, setUserName] = useState("小明")
  const [selectedSubjects, setSelectedSubjects] = useState(["数学", "物理", "化学"])

  const gradeOptions = [
    { value: "小学三年级", label: "小学三年级", level: "小学" },
    { value: "小学四年级", label: "小学四年级", level: "小学" },
    { value: "小学五年级", label: "小学五年级", level: "小学" },
    { value: "小学六年级", label: "小学六年级", level: "小学" },
    { value: "初中一年级", label: "初中一年级", level: "初中" },
    { value: "初中二年级", label: "初中二年级", level: "初中" },
    { value: "初中三年级", label: "初中三年级", level: "初中" },
    { value: "高中一年级", label: "高中一年级", level: "高中" },
    { value: "高中二年级", label: "高中二年级", level: "高中" },
    { value: "高中三年级", label: "高中三年级", level: "高中" },
  ]

  const subjectsByLevel = {
    小学: ["数学", "语文", "英语"],
    初中: ["数学", "物理", "化学", "语文", "英语", "生物", "地理", "历史"],
    高中: ["数学", "物理", "化学", "语文", "英语", "生物", "地理", "历史", "政治"],
  }

  const getCurrentLevel = () => {
    const grade = gradeOptions.find((g) => g.value === selectedGrade)
    return grade?.level || "初中"
  }

  const getAvailableSubjects = () => {
    return subjectsByLevel[getCurrentLevel() as keyof typeof subjectsByLevel] || []
  }

  const toggleSubject = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject))
    } else {
      setSelectedSubjects([...selectedSubjects, subject])
    }
  }

  const getAdaptationInfo = () => {
    const level = getCurrentLevel()
    const adaptations = {
      小学: {
        language: "使用简单易懂的词汇，图文并茂的解释",
        depth: "基础概念讲解，步骤详细分解",
        examples: "生活化的例子和直观的图形",
      },
      初中: {
        language: "引入概念解释，逻辑推理训练",
        depth: "知识点关联，方法总结归纳",
        examples: "典型例题分析，解题技巧指导",
      },
      高中: {
        language: "深度分析，多种解法对比",
        depth: "拓展知识，综合应用能力",
        examples: "复杂问题分解，思维方法训练",
      },
    }
    return adaptations[level as keyof typeof adaptations]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">年级设置</h1>
              <p className="text-sm text-gray-500">设置你的年级信息，获得个性化学习体验</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* User Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              基本信息
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="userName">昵称</Label>
              <Input
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="请输入你的昵称"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="grade">年级</Label>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="选择你的年级" />
                </SelectTrigger>
                <SelectContent>
                  {gradeOptions.map((grade) => (
                    <SelectItem key={grade.value} value={grade.value}>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {grade.level}
                        </Badge>
                        {grade.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Subject Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              学科选择
            </CardTitle>
            <CardDescription>选择你需要使用错题本的学科（当前年级: {getCurrentLevel()}）</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {getAvailableSubjects().map((subject) => (
                <div
                  key={subject}
                  onClick={() => toggleSubject(subject)}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all text-center ${
                    selectedSubjects.includes(subject)
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-medium">{subject}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">已选择:</span>
              {selectedSubjects.map((subject) => (
                <Badge key={subject} variant="default">
                  {subject}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Adaptation Preview */}
        <Card>
          <CardHeader>
            <CardTitle>个性化适配预览</CardTitle>
            <CardDescription>根据你的年级，系统将提供以下个性化服务</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">语言表达</h4>
                  <p className="text-sm text-blue-700">{getAdaptationInfo().language}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">内容深度</h4>
                  <p className="text-sm text-green-700">{getAdaptationInfo().depth}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">举例方式</h4>
                  <p className="text-sm text-purple-700">{getAdaptationInfo().examples}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Example Adaptation */}
        <Card>
          <CardHeader>
            <CardTitle>讲解示例对比</CardTitle>
            <CardDescription>同一道题目在不同年级的讲解方式对比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">题目: 求解方程 2x + 6 = 14</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <Badge variant="outline" className="mb-2">
                    小学
                  </Badge>
                  <p className="text-sm text-gray-700">
                    我们要找到x的值。首先，两边都减去6：2x = 8。然后两边都除以2：x = 4。 检验：2×4 + 6 = 14 ✓
                  </p>
                </div>
                <div className="p-4 border rounded-lg border-blue-200 bg-blue-50">
                  <Badge variant="default" className="mb-2">
                    初中（当前）
                  </Badge>
                  <p className="text-sm text-gray-700">
                    移项法：2x = 14 - 6 = 8，所以 x = 4。 这是一元一次方程的标准解法，注意移项要变号。
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <Badge variant="outline" className="mb-2">
                    高中
                  </Badge>
                  <p className="text-sm text-gray-700">
                    线性方程 2x + 6 = 14，解得 x = 4。 可扩展到更复杂的线性方程组和不等式求解。
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-center">
          <Button size="lg" className="px-8">
            <Save className="w-4 h-4 mr-2" />
            保存设置
          </Button>
        </div>
      </main>
    </div>
  )
}
