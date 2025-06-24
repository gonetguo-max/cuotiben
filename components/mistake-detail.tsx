"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  Lightbulb,
  Target,
  CheckCircle,
  Volume2,
  VolumeX,
} from "lucide-react"
import { ModernCard } from "@/components/ui/modern-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MistakeDetailProps {
  mistakeId: number
  onBack?: () => void
}

export default function MistakeDetail({ mistakeId, onBack }: MistakeDetailProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [understood, setUnderstood] = useState(false)

  // 模拟错题数据
  const mistake = {
    id: mistakeId,
    subject: "数学",
    topic: "二次函数",
    difficulty: "中等",
    question: "求函数 f(x) = x² - 4x + 3 的最小值",
    studentAnswer: "最小值为 1",
    correctAnswer: "最小值为 -1",
    errorType: "配方法应用错误",
    date: "2024-01-15",
    reviewCount: 2,
  }

  const explanationSteps = [
    {
      title: "理解题目",
      content: "这是一个求二次函数最值的问题。我们需要找到函数 f(x) = x² - 4x + 3 的最小值。",
      keyPoint: "二次函数开口向上，存在最小值",
      visual: "📊 函数图像开口向上",
    },
    {
      title: "选择方法",
      content: "对于二次函数求最值，我们可以使用配方法将其转化为顶点式。",
      keyPoint: "配方法：ax² + bx + c = a(x + b/2a)² + (c - b²/4a)",
      visual: "🔧 配方法公式",
    },
    {
      title: "配方过程",
      content: "f(x) = x² - 4x + 3\n= x² - 4x + 4 - 4 + 3\n= (x - 2)² - 1",
      keyPoint: "关键：提取完全平方式",
      visual: "✏️ 逐步配方",
    },
    {
      title: "找到最值",
      content: "从 f(x) = (x - 2)² - 1 可以看出：\n当 x = 2 时，(x - 2)² = 0（最小值）\n所以 f(x) 的最小值为 -1",
      keyPoint: "顶点坐标 (2, -1)，最小值为 -1",
      visual: "🎯 确定最值",
    },
    {
      title: "验证答案",
      content: "验证：f(2) = 2² - 4×2 + 3 = 4 - 8 + 3 = -1 ✓",
      keyPoint: "代入验证确保答案正确",
      visual: "✅ 验证结果",
    },
  ]

  const commonErrors = [
    {
      error: "配方时符号错误",
      correction: "注意 x² - 4x 配方时是 (x-2)²，不是 (x+2)²",
      tip: "记住：x² + bx 的配方是 (x + b/2)²",
    },
    {
      error: "忘记减去多加的常数",
      correction: "配方 x² - 4x + 4 时，要减去多加的 4",
      tip: "配方法的关键是保持等式平衡",
    },
    {
      error: "最值判断错误",
      correction: "开口向上的抛物线有最小值，开口向下的有最大值",
      tip: "看二次项系数：正数向上，负数向下",
    },
  ]

  const similarQuestions = [
    {
      question: "求函数 g(x) = x² - 6x + 5 的最小值",
      difficulty: "简单",
      hint: "同样使用配方法",
    },
    {
      question: "求函数 h(x) = 2x² - 8x + 6 的最小值",
      difficulty: "中等",
      hint: "先提取二次项系数",
    },
    {
      question: "求函数 k(x) = -x² + 4x - 3 的最大值",
      difficulty: "中等",
      hint: "注意这次是求最大值",
    },
  ]

  const nextStep = () => {
    if (currentStep < explanationSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled)
    if (isPlaying) {
      setIsPlaying(false)
    }
  }

  const togglePlayback = () => {
    if (audioEnabled) {
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 backdrop-blur-sm" />
        <div className="relative max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <GradientButton
              variant="secondary"
              size="md"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              返回
            </GradientButton>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                    错题详细讲解
                  </h1>
                  <p className="text-gray-600">AI智能讲解，逐步理解 🤖</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                  {mistake.subject}
                </Badge>
                <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-700">
                  {mistake.topic}
                </Badge>
                <Badge 
                  variant={mistake.difficulty === "困难" ? "destructive" : mistake.difficulty === "中等" ? "default" : "secondary"}
                >
                  {mistake.difficulty}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleAudio}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  audioEnabled 
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg" 
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {audioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              
              <button
                onClick={togglePlayback}
                disabled={!audioEnabled}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  audioEnabled 
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg hover:scale-110" 
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* 题目展示 */}
        <ModernCard variant="glass">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                原题目
              </h3>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-gray-900 text-lg leading-relaxed">{mistake.question}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">答案对比</h3>
              <div className="space-y-3">
                <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                  <div className="text-sm font-medium text-red-700 mb-1">❌ 你的答案</div>
                  <p className="text-red-600">{mistake.studentAnswer}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="text-sm font-medium text-green-700 mb-1">✅ 正确答案</div>
                  <p className="text-green-600">{mistake.correctAnswer}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-orange-600" />
              <span className="font-medium text-orange-700">错误类型</span>
            </div>
            <p className="text-orange-600">{mistake.errorType}</p>
          </div>
        </ModernCard>

        {/* 逐步讲解 */}
        <ModernCard variant="gradient">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">逐步讲解</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>步骤 {currentStep + 1} / {explanationSteps.length}</span>
            </div>
          </div>

          <div className="mb-6">
            <Progress value={((currentStep + 1) / explanationSteps.length) * 100} className="h-3" />
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                {currentStep + 1}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{explanationSteps[currentStep].title}</h3>
              <span className="text-2xl">{explanationSteps[currentStep].visual}</span>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <pre className="text-gray-900 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {explanationSteps[currentStep].content}
                </pre>
              </div>

              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-yellow-600" />
                  <span className="font-medium text-yellow-700">关键点</span>
                </div>
                <p className="text-yellow-700">{explanationSteps[currentStep].keyPoint}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <GradientButton
              variant="secondary"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              上一步
            </GradientButton>

            <div className="flex gap-3">
              {currentStep === explanationSteps.length - 1 ? (
                <GradientButton
                  variant="success"
                  onClick={() => setUnderstood(true)}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  我理解了
                </GradientButton>
              ) : (
                <GradientButton
                  variant="primary"
                  onClick={nextStep}
                  className="flex items-center gap-2"
                >
                  下一步
                  <Play className="w-4 h-4" />
                </GradientButton>
              )}
            </div>
          </div>
        </ModernCard>

        {/* 标签页内容 */}
        <Tabs defaultValue="errors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-14 bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-2">
            <TabsTrigger value="errors" className="rounded-xl text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              🚫 常见错误
            </TabsTrigger>
            <TabsTrigger value="similar" className="rounded-xl text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">
              🎯 相似题目
            </TabsTrigger>
            <TabsTrigger value="summary" className="rounded-xl text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">
              📝 知识总结
            </TabsTrigger>
          </TabsList>

          <TabsContent value="errors">
            <ModernCard variant="glass">
              <h3 className="text-xl font-bold text-gray-900 mb-6">常见错误分析</h3>
              <div className="space-y-4">
                {commonErrors.map((item, index) => (
                  <div key={index} className="p-4 border border-red-200 rounded-xl bg-red-50/50">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div>
                          <span className="font-medium text-red-700">错误：</span>
                          <span className="text-red-600 ml-2">{item.error}</span>
                        </div>
                        <div>
                          <span className="font-medium text-green-700">纠正：</span>
                          <span className="text-green-600 ml-2">{item.correction}</span>
                        </div>
                        <div className="p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                          <span className="font-medium text-yellow-700">💡 小贴士：</span>
                          <span className="text-yellow-600 ml-2">{item.tip}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ModernCard>
          </TabsContent>

          <TabsContent value="similar">
            <ModernCard variant="glass">
              <h3 className="text-xl font-bold text-gray-900 mb-6">相似题目练习</h3>
              <div className="space-y-4">
                {similarQuestions.map((item, index) => (
                  <div key={index} className="p-4 border border-blue-200 rounded-xl bg-blue-50/50 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold text-blue-700">题目 {index + 1}</span>
                          <Badge variant={item.difficulty === "困难" ? "destructive" : item.difficulty === "中等" ? "default" : "secondary"}>
                            {item.difficulty}
                          </Badge>
                        </div>
                        <p className="text-gray-900 mb-2">{item.question}</p>
                        <p className="text-sm text-blue-600">💡 提示：{item.hint}</p>
                      </div>
                      <GradientButton size="sm" variant="primary">
                        开始练习
                      </GradientButton>
                    </div>
                  </div>
                ))}
              </div>
            </ModernCard>
          </TabsContent>

          <TabsContent value="summary">
            <ModernCard variant="glass">
              <h3 className="text-xl font-bold text-gray-900 mb-6">知识点总结</h3>
              <div className="space-y-6">
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <h4 className="font-bold text-green-700 mb-3">🎯 核心知识点</h4>
                  <ul className="space-y-2 text-green-600">
                    <li>• 二次函数的标准形式：f(x) = ax² + bx + c</li>
                    <li>• 配方法：将二次函数转化为顶点式</li>
                    <li>• 顶点式：f(x) = a(x - h)² + k，顶点为(h, k)</li>
                    <li>• 最值判断：a > 0时有最小值，a < 0时有最大值</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-bold text-blue-700 mb-3">📐 解题步骤</h4>
                  <ol className="space-y-2 text-blue-600">
                    <li>1. 识别二次函数的形式</li>
                    <li>2. 使用配方法转化为顶点式</li>
                    <li>3. 从顶点式读出顶点坐标</li>
                    <li>4. 根据开口方向确定最值</li>
                    <li>5. 验证答案的正确性</li>
                  </ol>
                </div>

                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <h4 className="font-bold text-purple-700 mb-3">🔍 易错提醒</h4>
                  <ul className="space-y-2 text-purple-600">
                    <li>• 配方时注意符号变化</li>
                    <li>• 记得减去多加的常数项</li>
                    <li>• 区分最大值和最小值</li>
                    <li>• 验证计算结果&lt;</li>
                  </ul>
                </div>
              </div>
            </ModernCard>
          </TabsContent>
        </Tabs>

        {/* 完成状态 */}
        {understood && (
          <ModernCard variant="gradient" className="text-center border-2 border-green-300 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">太棒了！🎉</h3>
            <p className="text-gray-600 mb-6">你已经掌握了这道错题的解法</p>
            <div className="flex gap-4 justify-center">
              <GradientButton variant="success" size="lg">
                标记为已掌握
              </GradientButton>
              <GradientButton variant="primary" size="lg">
                练习相似题目
              </GradientButton>
            </div>
          </ModernCard>
        )}
      </main>
    </div>
  )
}
