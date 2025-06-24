"use client"

import { useState } from "react"
import { Lightbulb, RefreshCw, Check, Clock, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function SimilarQuestions() {
  const [questionCount, setQuestionCount] = useState([3])
  const [difficulty, setDifficulty] = useState("standard")
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [showResults, setShowResults] = useState(false)

  const originalMistake = {
    subject: "数学",
    topic: "二次函数",
    question: "求函数 f(x) = x² - 4x + 3 的最小值",
    correctAnswer: "最小值为 -1",
    explanation: "将函数配方得 f(x) = (x-2)² - 1，所以最小值为 -1",
  }

  const generatedQuestions = [
    {
      id: 1,
      question: "求函数 f(x) = x² - 6x + 5 的最小值",
      options: ["A. -4", "B. -3", "C. -2", "D. -1"],
      correctAnswer: "A",
      explanation: "配方得 f(x) = (x-3)² - 4，最小值为 -4",
    },
    {
      id: 2,
      question: "函数 g(x) = 2x² - 8x + 6 的最小值是多少？",
      options: ["A. -2", "B. -1", "C. 0", "D. 1"],
      correctAnswer: "A",
      explanation: "g(x) = 2(x-2)² - 2，最小值为 -2",
    },
    {
      id: 3,
      question: "求函数 h(x) = x² + 2x - 3 的最小值",
      options: ["A. -5", "B. -4", "C. -3", "D. -2"],
      correctAnswer: "B",
      explanation: "配方得 h(x) = (x+1)² - 4，最小值为 -4",
    },
  ]

  const generateQuestions = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
    }, 2000)
  }

  const submitAnswer = () => {
    if (currentQuestion < generatedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const getResults = () => {
    let correct = 0
    generatedQuestions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correct++
      }
    })
    return { correct, total: generatedQuestions.length }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">相似题目练习</h1>
              <p className="text-sm text-gray-500">基于错题生成相似练习题</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Original Mistake */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-red-500" />
              原错题
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{originalMistake.subject}</Badge>
                <Badge variant="secondary">{originalMistake.topic}</Badge>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-1">题目</h4>
                <p className="text-gray-900">{originalMistake.question}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-1">正确答案</h4>
                <p className="text-green-600">{originalMistake.correctAnswer}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-1">解题思路</h4>
                <p className="text-gray-600 text-sm">{originalMistake.explanation}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generation Settings */}
        {!isGenerating && generatedQuestions.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>生成设置</CardTitle>
              <CardDescription>自定义相似题目的数量和难度</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-medium">题目数量: {questionCount[0]} 道</Label>
                <div className="mt-2">
                  <Slider
                    value={questionCount}
                    onValueChange={setQuestionCount}
                    max={10}
                    min={3}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>3道</span>
                    <span>10道</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">难度调整</Label>
                <RadioGroup value={difficulty} onValueChange={setDifficulty}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="easy" id="easy" />
                    <Label htmlFor="easy">简单 - 降低难度，更基础的题目</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard">标准 - 与原题难度相当</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hard" id="hard" />
                    <Label htmlFor="hard">困难 - 提高难度，更有挑战性</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button onClick={generateQuestions} className="w-full">
                <Lightbulb className="w-4 h-4 mr-2" />
                生成相似题目
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Generating */}
        {isGenerating && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">AI正在生成相似题目...</h3>
              <p className="text-gray-500">根据原题的知识点和难度生成 {questionCount[0]} 道练习题</p>
            </CardContent>
          </Card>
        )}

        {/* Practice Questions */}
        {!isGenerating && generatedQuestions.length > 0 && !showResults && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  题目 {currentQuestion + 1} / {generatedQuestions.length}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>不限时</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {generatedQuestions[currentQuestion].question}
                </h3>
                <RadioGroup
                  value={answers[currentQuestion] || ""}
                  onValueChange={(value) => setAnswers({ ...answers, [currentQuestion]: value })}
                >
                  {generatedQuestions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={option[0]} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                >
                  上一题
                </Button>
                <Button onClick={submitAnswer} disabled={!answers[currentQuestion]}>
                  {currentQuestion === generatedQuestions.length - 1 ? "提交答案" : "下一题"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {showResults && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                练习结果
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {getResults().correct} / {getResults().total}
                </div>
                <p className="text-gray-600">
                  正确率: {Math.round((getResults().correct / getResults().total) * 100)}%
                </p>
              </div>

              <div className="space-y-4">
                {generatedQuestions.map((question, index) => {
                  const isCorrect = answers[index] === question.correctAnswer
                  return (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-gray-900">题目 {index + 1}</h4>
                        <Badge variant={isCorrect ? "default" : "destructive"}>{isCorrect ? "正确" : "错误"}</Badge>
                      </div>
                      <p className="text-gray-700 mb-3">{question.question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">你的答案: </span>
                          <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                            {answers[index] || "未作答"}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">正确答案: </span>
                          <span className="text-green-600">{question.correctAnswer}</span>
                        </div>
                      </div>
                      {!isCorrect && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-700">{question.explanation}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setCurrentQuestion(0)
                    setAnswers({})
                    setShowResults(false)
                  }}
                  variant="outline"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  重新练习
                </Button>
                <Button>生成新题目</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
