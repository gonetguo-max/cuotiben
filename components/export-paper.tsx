"use client"

import { useState } from "react"
import { FileText, Download, Printer, Settings, Eye, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function ExportPaper() {
  const [selectedMistakes, setSelectedMistakes] = useState<number[]>([1, 2, 3])
  const [paperTitle, setPaperTitle] = useState("数学错题练习卷")
  const [includeAnswers, setIncludeAnswers] = useState(true)
  const [includeExplanations, setIncludeExplanations] = useState(false)
  const [paperFormat, setPaperFormat] = useState("pdf")
  const [questionLayout, setQuestionLayout] = useState("standard")

  const availableMistakes = [
    {
      id: 1,
      subject: "数学",
      topic: "二次函数",
      question: "求函数 f(x) = x² - 4x + 3 的最小值",
      difficulty: "中等",
      date: "2024-01-15",
    },
    {
      id: 2,
      subject: "物理",
      topic: "牛顿第二定律",
      question: "质量为2kg的物体受到10N的力，求加速度",
      difficulty: "简单",
      date: "2024-01-14",
    },
    {
      id: 3,
      subject: "化学",
      topic: "化学方程式配平",
      question: "配平方程式：Al + HCl → AlCl₃ + H₂",
      difficulty: "困难",
      date: "2024-01-13",
    },
    {
      id: 4,
      subject: "数学",
      topic: "三角函数",
      question: "求sin(30°) + cos(60°)的值",
      difficulty: "简单",
      date: "2024-01-12",
    },
    {
      id: 5,
      subject: "物理",
      topic: "电路分析",
      question: "串联电路中总电阻的计算",
      difficulty: "中等",
      date: "2024-01-11",
    },
  ]

  const toggleMistakeSelection = (id: number) => {
    if (selectedMistakes.includes(id)) {
      setSelectedMistakes(selectedMistakes.filter((mistakeId) => mistakeId !== id))
    } else {
      setSelectedMistakes([...selectedMistakes, id])
    }
  }

  const selectAllBySubject = (subject: string) => {
    const subjectMistakes = availableMistakes
      .filter((mistake) => mistake.subject === subject)
      .map((mistake) => mistake.id)

    const newSelection = [...new Set([...selectedMistakes, ...subjectMistakes])]
    setSelectedMistakes(newSelection)
  }

  const generatePreview = () => {
    const selectedQuestions = availableMistakes.filter((mistake) => selectedMistakes.includes(mistake.id))

    return selectedQuestions
  }

  const exportPaper = () => {
    // 模拟导出功能
    alert(`正在导出${paperFormat.toUpperCase()}格式的试卷...`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">导出试卷</h1>
                <p className="text-sm text-gray-500">将错题和相似题目组合成练习试卷</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                预览
              </Button>
              <Button onClick={exportPaper}>
                <Download className="w-4 h-4 mr-2" />
                导出试卷
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Question Selection */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>选择题目</CardTitle>
                <CardDescription>从错题本中选择要包含在试卷中的题目</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="all">全部</TabsTrigger>
                    <TabsTrigger value="数学">数学</TabsTrigger>
                    <TabsTrigger value="物理">物理</TabsTrigger>
                    <TabsTrigger value="化学">化学</TabsTrigger>
                    <TabsTrigger value="英语">英语</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">已选择 {selectedMistakes.length} 道题目</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setSelectedMistakes([])}>
                          清空选择
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedMistakes(availableMistakes.map((m) => m.id))}
                        >
                          全选
                        </Button>
                      </div>
                    </div>
                    {availableMistakes.map((mistake) => (
                      <div
                        key={mistake.id}
                        className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <Checkbox
                          checked={selectedMistakes.includes(mistake.id)}
                          onCheckedChange={() => toggleMistakeSelection(mistake.id)}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline">{mistake.subject}</Badge>
                            <Badge
                              variant={
                                mistake.difficulty === "困难"
                                  ? "destructive"
                                  : mistake.difficulty === "中等"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {mistake.difficulty}
                            </Badge>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {mistake.date}
                            </span>
                          </div>
                          <p className="text-sm text-gray-900">{mistake.question}</p>
                          <p className="text-xs text-gray-500 mt-1">{mistake.topic}</p>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  {["数学", "物理", "化学", "英语"].map((subject) => (
                    <TabsContent key={subject} value={subject} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          {subject}题目 ({availableMistakes.filter((m) => m.subject === subject).length} 道)
                        </span>
                        <Button size="sm" variant="outline" onClick={() => selectAllBySubject(subject)}>
                          全选{subject}
                        </Button>
                      </div>
                      {availableMistakes
                        .filter((mistake) => mistake.subject === subject)
                        .map((mistake) => (
                          <div
                            key={mistake.id}
                            className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                          >
                            <Checkbox
                              checked={selectedMistakes.includes(mistake.id)}
                              onCheckedChange={() => toggleMistakeSelection(mistake.id)}
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge
                                  variant={
                                    mistake.difficulty === "困难"
                                      ? "destructive"
                                      : mistake.difficulty === "中等"
                                        ? "default"
                                        : "secondary"
                                  }
                                >
                                  {mistake.difficulty}
                                </Badge>
                                <span className="text-xs text-gray-500">{mistake.date}</span>
                              </div>
                              <p className="text-sm text-gray-900">{mistake.question}</p>
                              <p className="text-xs text-gray-500 mt-1">{mistake.topic}</p>
                            </div>
                          </div>
                        ))}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  试卷设置
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="paperTitle">试卷标题</Label>
                  <Input
                    id="paperTitle"
                    value={paperTitle}
                    onChange={(e) => setPaperTitle(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>导出格式</Label>
                  <Select value={paperFormat} onValueChange={setPaperFormat}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF (推荐打印)</SelectItem>
                      <SelectItem value="word">Word (可编辑)</SelectItem>
                      <SelectItem value="image">图片 (移动端友好)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>题目布局</Label>
                  <Select value={questionLayout} onValueChange={setQuestionLayout}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">标准布局</SelectItem>
                      <SelectItem value="compact">紧凑布局</SelectItem>
                      <SelectItem value="spacious">宽松布局</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>附加选项</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="includeAnswers" checked={includeAnswers} onCheckedChange={setIncludeAnswers} />
                      <Label htmlFor="includeAnswers" className="text-sm">
                        包含答案
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeExplanations"
                        checked={includeExplanations}
                        onCheckedChange={setIncludeExplanations}
                      />
                      <Label htmlFor="includeExplanations" className="text-sm">
                        包含详细解析
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>试卷预览</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
                    <h3 className="font-bold text-lg">{paperTitle}</h3>
                    <p className="text-sm text-gray-500 mt-1">共 {selectedMistakes.length} 道题目</p>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {generatePreview().map((question, index) => (
                      <div key={question.id} className="p-2 bg-gray-50 rounded text-xs">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{index + 1}.</span>
                          <Badge variant="outline" className="text-xs">
                            {question.subject}
                          </Badge>
                        </div>
                        <p className="text-gray-700 truncate">{question.question}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>格式: {paperFormat.toUpperCase()}</span>
                      <span>布局: {questionLayout}</span>
                    </div>
                    <div className="flex gap-1 mt-1">
                      {includeAnswers && (
                        <Badge variant="secondary" className="text-xs">
                          含答案
                        </Badge>
                      )}
                      {includeExplanations && (
                        <Badge variant="secondary" className="text-xs">
                          含解析
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Export Actions */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <Button onClick={exportPaper} className="w-full" disabled={selectedMistakes.length === 0}>
                    <Download className="w-4 h-4 mr-2" />
                    导出试卷
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Printer className="w-4 h-4 mr-2" />
                    直接打印
                  </Button>
                  <p className="text-xs text-gray-500 text-center">导出后可保存到本地或直接打印使用</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
