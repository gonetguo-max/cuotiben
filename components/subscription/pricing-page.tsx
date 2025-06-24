"use client"

import { useState } from "react"
import { Check, Crown, Zap, Star, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  const plans = [
    {
      name: "免费版",
      price: { monthly: 0, yearly: 0 },
      description: "基础功能，适合轻度使用",
      features: ["每月10次拍照识别", "基础错题本功能", "简单对错判断", "基础年级设置", "数学公式编辑器"],
      limitations: ["无详细讲解", "无相似题目生成", "无试卷导出", "无学习报告"],
      buttonText: "当前计划",
      popular: false,
      icon: Gift,
    },
    {
      name: "标准版",
      price: { monthly: 29, yearly: 199 },
      description: "完整功能，适合日常学习",
      features: [
        "无限次拍照识别",
        "详细错题讲解",
        "相似题目生成",
        "试卷导出功能",
        "学习报告分析",
        "多角色权限",
        "优先客服支持",
      ],
      buttonText: "立即订阅",
      popular: true,
      icon: Star,
    },
    {
      name: "高级版",
      price: { monthly: 59, yearly: 399 },
      description: "专业功能，适合深度学习",
      features: [
        "标准版所有功能",
        "AI语音讲解",
        "个性化学习计划",
        "班级管理功能",
        "家长监督面板",
        "数据深度分析",
        "专属客服支持",
        "优先新功能体验",
      ],
      buttonText: "立即订阅",
      popular: false,
      icon: Crown,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">选择适合你的计划</h1>
            <p className="text-gray-600">解锁更多功能，提升学习效率</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Label htmlFor="billing-toggle" className={!isYearly ? "font-medium" : ""}>
            按月付费
          </Label>
          <Switch id="billing-toggle" checked={isYearly} onCheckedChange={setIsYearly} />
          <Label htmlFor="billing-toggle" className={isYearly ? "font-medium" : ""}>
            按年付费
            <Badge variant="secondary" className="ml-2">
              省43%
            </Badge>
          </Label>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon
            const price = isYearly ? plan.price.yearly : plan.price.monthly
            const monthlyPrice = isYearly ? Math.round(plan.price.yearly / 12) : plan.price.monthly

            return (
              <Card key={plan.name} className={`relative ${plan.popular ? "border-blue-500 shadow-lg scale-105" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-3 py-1">
                      <Zap className="w-3 h-3 mr-1" />
                      最受欢迎
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <div className="text-3xl font-bold text-gray-900">
                      ¥{price}
                      {price > 0 && (
                        <span className="text-lg font-normal text-gray-500">/{isYearly ? "年" : "月"}</span>
                      )}
                    </div>
                    {isYearly && price > 0 && <div className="text-sm text-gray-500">相当于 ¥{monthlyPrice}/月</div>}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {plan.limitations && (
                    <div className="space-y-2 pt-2 border-t">
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-gray-200 flex-shrink-0"></div>
                          <span className="text-sm text-gray-500">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Button
                    className={`w-full mt-6 ${plan.popular ? "bg-blue-500 hover:bg-blue-600" : ""}`}
                    variant={plan.name === "免费版" ? "outline" : "default"}
                    disabled={plan.name === "免费版"}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Features Comparison */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">功能对比</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      功能
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      免费版
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      标准版
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      高级版
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { feature: "拍照识别次数", free: "10次/月", standard: "无限", premium: "无限" },
                    { feature: "错题详细讲解", free: "❌", standard: "✅", premium: "✅" },
                    { feature: "相似题目生成", free: "❌", standard: "✅", premium: "✅" },
                    { feature: "试卷导出", free: "❌", standard: "✅", premium: "✅" },
                    { feature: "学习报告", free: "❌", standard: "✅", premium: "✅" },
                    { feature: "AI语音讲解", free: "❌", standard: "❌", premium: "✅" },
                    { feature: "班级管理", free: "❌", standard: "❌", premium: "✅" },
                    { feature: "家长监督", free: "❌", standard: "❌", premium: "✅" },
                  ].map((row, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.feature}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{row.free}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{row.standard}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
