"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Camera, Upload, X, RotateCw, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import MobileLayout from "@/components/mobile-layout"

export default function MobilePhotoUpload() {
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
    <MobileLayout currentPage="camera">
      {/* Mobile-First Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 py-3 md:px-6 md:py-4">
          <h1 className="text-lg md:text-xl font-bold text-gray-900">拍照批改</h1>
          <p className="text-xs md:text-sm text-gray-500">上传作业照片，AI智能识别错题</p>
        </div>
      </header>

      <div className="px-4 py-4 md:px-6 md:py-6 space-y-4 md:space-y-6 md:ml-64">
        {/* Mobile-Optimized Upload Area */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg">上传作业照片</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-8 text-center hover:border-blue-400 transition-colors">
              <div className="space-y-4">
                <div className="flex justify-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Camera className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                  </div>
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Upload className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">选择上传方式</h3>
                  <p className="text-sm md:text-base text-gray-500 mb-4">支持拍照或从相册选择，最多上传5张图片</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => fileInputRef.current?.click()} className="w-full sm:w-auto" size="lg">
                    <Upload className="w-4 h-4 mr-2" />
                    选择图片
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto" size="lg">
                    <Camera className="w-4 h-4 mr-2" />
                    拍照
                  </Button>
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
          </CardContent>
        </Card>

        {/* Mobile Tips */}
        <Alert className="md:hidden">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">拍照时请确保光线充足，字迹清晰，避免反光和阴影</AlertDescription>
        </Alert>

        {/* Mobile-Optimized Uploaded Images */}
        {uploadedImages.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg">已上传图片 ({uploadedImages.length}/5)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`上传的图片 ${index + 1}`}
                      className="w-full h-32 md:h-40 object-cover rounded-lg border"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 flex gap-2">
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                          <RotateCw className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeImage(index)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={simulateProcessing} disabled={isProcessing} className="w-full" size="lg">
                {isProcessing ? "正在分析..." : "开始AI分析"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Mobile-Optimized Processing */}
        {isProcessing && (
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <div className="w-6 h-6 md:w-8 md:h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-medium text-gray-900">AI正在分析中...</h3>
                  <p className="text-sm md:text-base text-gray-500">正在识别题目和判断答案正确性</p>
                </div>
                <div className="max-w-xs mx-auto">
                  <Progress value={processingProgress} className="h-2" />
                  <p className="text-sm text-gray-500 mt-2">{processingProgress}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mobile-Optimized Analysis Results */}
        {analysisResults.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg">分析结果</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysisResults.map((result) => (
                <div key={result.id} className="border rounded-lg p-3 md:p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 mb-1 text-sm md:text-base">题目 {result.id}</h4>
                      <p className="text-gray-700 text-sm md:text-base">{result.question}</p>
                    </div>
                    <Badge variant={result.isCorrect ? "default" : "destructive"} className="ml-2 flex-shrink-0">
                      {result.isCorrect ? "正确" : "错误"}
                    </Badge>
                  </div>

                  <div className="space-y-3 text-sm md:text-base">
                    <div>
                      <span className="font-medium text-gray-600">学生答案：</span>
                      <span className={result.isCorrect ? "text-green-600" : "text-red-600"}>
                        {result.studentAnswer}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">正确答案：</span>
                      <span className="text-green-600">{result.correctAnswer}</span>
                    </div>
                  </div>

                  {!result.isCorrect && (
                    <div className="mt-3 p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="destructive" className="text-xs">
                          {result.errorType}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{result.explanation}</p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          详细讲解
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          生成相似题
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Check className="w-4 h-4 mr-1" />
                          加入错题本
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </MobileLayout>
  )
}
