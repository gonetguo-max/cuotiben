"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Camera, Upload, X, RotateCw, Crop, Check, Sparkles, Zap } from "lucide-react"
import { ModernCard } from "@/components/ui/modern-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function PhotoUpload() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [analysisResults, setAnalysisResults] = useState<any[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages: string[] = []
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string)
            if (newImages.length === files.length) {
              setUploadedImages((prev) => [...prev, ...newImages])
            }
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const simulateProcessing = () => {
    setIsProcessing(true)
    setProcessingProgress(0)

    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsProcessing(false)
          setAnalysisResults([
            {
              id: 1,
              question: "计算 2x + 3 = 7 中 x 的值",
              studentAnswer: "x = 3",
              correctAnswer: "x = 2",
              isCorrect: false,
              errorType: "计算错误",
              explanation: "解题步骤：2x + 3 = 7，两边同时减3得到 2x = 4，两边同时除以2得到 x = 2",
            },
            {
              id: 2,
              question: "求函数 f(x) = x² - 4x + 3 的最小值",
              studentAnswer: "最小值为 -1",
              correctAnswer: "最小值为 -1",
              isCorrect: true,
              errorType: null,
              explanation: null,
            },
          ])
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 backdrop-blur-sm" />
        <div className="relative max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-xl shadow-blue-500/25">
              <Camera className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                AI拍照批改
              </h1>
              <p className="text-gray-600">上传作业照片，AI智能识别错题 ✨</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Upload Area */}
        <ModernCard variant="gradient">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">上传作业照片</h2>
            <p className="text-gray-600 mb-6">支持多种格式，AI秒速识别 🚀</p>
          </div>

          <div className="border-2 border-dashed border-purple-300/50 rounded-3xl p-8 text-center hover:border-purple-400/70 transition-all duration-300 bg-gradient-to-br from-white/50 to-purple-50/50">
            <div className="space-y-6">
              <div className="flex justify-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-xl shadow-blue-500/25 hover:scale-110 transition-all duration-300">
                  <Camera className="w-10 h-10 text-white" />
                </div>
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center shadow-xl shadow-green-500/25 hover:scale-110 transition-all duration-300">
                  <Upload className="w-10 h-10 text-white" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">选择上传方式</h3>
                <p className="text-gray-600 mb-6">支持拍照或从相册选择，最多上传5张图片</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GradientButton
                  variant="secondary"
                  size="lg"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-lg py-4 px-8"
                >
                  <Upload className="w-5 h-5 mr-3" />
                  选择图片
                </GradientButton>
                <GradientButton variant="primary" size="lg" className="text-lg py-4 px-8">
                  <Camera className="w-5 h-5 mr-3" />
                  立即拍照
                </GradientButton>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
        </ModernCard>

        {/* Uploaded Images */}
        {uploadedImages.length > 0 && (
          <ModernCard variant="glass">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">已上传图片</h2>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                {uploadedImages.length}/5
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`上传的图片 ${index + 1}`}
                    className="w-full h-40 object-cover rounded-2xl border-2 border-white/50 shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all rounded-2xl flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 flex gap-3">
                      <button className="w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-200">
                        <RotateCw className="w-5 h-5 text-gray-700" />
                      </button>
                      <button className="w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-200">
                        <Crop className="w-5 h-5 text-gray-700" />
                      </button>
                      <button
                        className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-200"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <GradientButton
              onClick={simulateProcessing}
              disabled={isProcessing}
              variant="primary"
              size="lg"
              className="w-full text-lg py-4"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                  AI正在分析中...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-3" />
                  开始AI智能分析 ✨
                </>
              )}
            </GradientButton>
          </ModernCard>
        )}

        {/* Processing */}
        {isProcessing && (
          <ModernCard variant="gradient">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
                <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>

              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  AI正在分析中...
                </h3>
                <p className="text-gray-600">正在识别题目和判断答案正确性 🤖</p>
              </div>

              <div className="max-w-md mx-auto">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>分析进度</span>
                  <span>{processingProgress}%</span>
                </div>
                <Progress value={processingProgress} className="h-3 bg-gray-200" />
              </div>
            </div>
          </ModernCard>
        )}

        {/* Analysis Results */}
        {analysisResults.length > 0 && (
          <ModernCard variant="glass">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">AI分析结果</h2>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">识别完成</Badge>
            </div>

            <div className="space-y-6">
              {analysisResults.map((result) => (
                <div
                  key={result.id}
                  className="border-2 border-white/50 rounded-2xl p-6 bg-gradient-to-br from-white/50 to-gray-50/50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-gray-900">题目 {result.id}</h4>
                        <Badge
                          variant={result.isCorrect ? "default" : "destructive"}
                          className={
                            result.isCorrect
                              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                              : "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                          }
                        >
                          {result.isCorrect ? "✅ 正确" : "❌ 错误"}
                        </Badge>
                      </div>
                      <p className="text-gray-700 text-base leading-relaxed">{result.question}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                      <span className="font-semibold text-red-700">学生答案：</span>
                      <span className="text-red-600 ml-2">{result.studentAnswer}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                      <span className="font-semibold text-green-700">正确答案：</span>
                      <span className="text-green-600 ml-2">{result.correctAnswer}</span>
                    </div>
                  </div>

                  {!result.isCorrect && (
                    <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm">
                          {result.errorType}
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">{result.explanation}</p>
                      <div className="flex flex-wrap gap-3">
                        <GradientButton size="sm" variant="secondary">
                          📖 详细讲解
                        </GradientButton>
                        <GradientButton size="sm" variant="neon">
                          🎯 生成相似题
                        </GradientButton>
                        <GradientButton size="sm" variant="success">
                          <Check className="w-4 h-4 mr-1" />
                          加入错题本
                        </GradientButton>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ModernCard>
        )}
      </main>
    </div>
  )
}
