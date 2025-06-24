"use client"

import { useState } from "react"
import { Eye, EyeOff, Phone, Mail, Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginType, setLoginType] = useState("phone")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    // 模拟登录
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">欢迎使用智能错题本</CardTitle>
          <CardDescription>登录后开始你的学习之旅</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={loginType} onValueChange={setLoginType} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="phone">手机登录</TabsTrigger>
              <TabsTrigger value="email">邮箱登录</TabsTrigger>
            </TabsList>

            <TabsContent value="phone" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">手机号</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input id="phone" placeholder="请输入手机号" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">验证码</Label>
                <div className="flex gap-2">
                  <Input id="code" placeholder="请输入验证码" />
                  <Button variant="outline" className="whitespace-nowrap">
                    获取验证码
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="email" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">邮箱</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input id="email" type="email" placeholder="请输入邮箱" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">密码</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="请输入密码"
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm">
                记住我
              </Label>
            </div>
            <Button variant="link" className="text-sm p-0">
              忘记密码？
            </Button>
          </div>

          <Button onClick={handleLogin} disabled={isLoading} className="w-full mt-6">
            {isLoading ? "登录中..." : "登录"}
          </Button>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">还没有账号？</span>
            <Button variant="link" className="text-sm p-0 ml-1">
              立即注册
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
