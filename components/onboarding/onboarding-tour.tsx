"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X, Camera, BookOpen, FileText, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface OnboardingTourProps {
  onComplete: () => void
}

export default function OnboardingTour({ onComplete }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "欢迎使用智能错题本！",
      description: "让AI帮助你更高效地学习，告别重复犯错",
      icon: BookOpen,
      content: "智能错题本是一款基于AI技术的学习助手，能够自动识别你的错题，提供个性化的讲解和练习。",
    },
    {
      title: "拍照识别错题",
      description: "只需拍照上传，AI自动识别对错",
      icon: Camera,
      content: "使用手机拍摄作业照片，我们的AI会自动识别题目内容，判断答案正确性，并标记出错误的题目。",
    },
    {
      title: "智能错题管理",
      description: "自动整理错题，按知识点分类",
      icon: BookOpen,
      content: "所有错题会自动保存到错题本中，按学科、知识点、难度等维度分类，方便你随时复习。",
    },
    {
      title: "个性化学习报告",
      description: "了解学习进度，发现薄弱环节",
      icon: TrendingUp,
      content: "系统会生成详细的学习报告，分析你的学习情况，识别薄弱知识点，提供针对性的学习建议。",
    },
    {
      title: "导出练习试卷",
      description: "根据错题生成专属练习卷",
      icon: FileText,
      content: "基于你的错题和相似题目，自动生成个性化的练习试卷，支持PDF、Word等格式导出。",
    },
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skip = () => {
    onComplete()
  }

  const currentStepData = steps[currentStep]
  const Icon = currentStepData.icon

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <Button variant="ghost" size="icon" onClick={skip} className="absolute right-0 top-0">
            <X className="w-4 h-4" />
          </Button>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-xl">{currentStepData.title}</CardTitle>
            <CardDescription className="mt-2">{currentStepData.description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-gray-600 text-center leading-relaxed">{currentStepData.content}</p>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>进度</span>
              <span>
                {currentStep + 1} / {steps.length}
              </span>
            </div>
            <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              上一步
            </Button>
            <Button onClick={nextStep} className="flex items-center gap-2">
              {currentStep === steps.length - 1 ? "开始使用" : "下一步"}
              {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>

          {/* Skip */}
          <div className="text-center">
            <Button variant="link" onClick={skip} className="text-xs text-gray-500">
              跳过引导
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
