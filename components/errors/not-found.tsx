"use client"

import { Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
          <CardTitle className="text-xl text-gray-900">页面未找到</CardTitle>
          <CardDescription>抱歉，你访问的页面不存在或已被移动</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">可能的原因：</p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• 页面链接已过期</li>
              <li>• 输入的网址有误</li>
              <li>• 页面正在维护中</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <Button onClick={() => window.history.back()} variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回上页
            </Button>
            <Button onClick={() => (window.location.href = "/")} className="w-full">
              <Home className="w-4 h-4 mr-2" />
              返回首页
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
