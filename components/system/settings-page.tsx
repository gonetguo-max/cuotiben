"use client"

import { useState } from "react"
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Download,
  HelpCircle,
  MessageSquare,
  LogOut,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    sms: false,
    mistakes: true,
    reports: true,
  })

  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    analytics: true,
    parentAccess: false,
    teacherAccess: false,
  })

  const settingSections = [
    {
      title: "账户设置",
      icon: User,
      items: [
        { label: "个人资料", description: "编辑姓名、头像等信息", action: "edit" },
        { label: "年级设置", description: "当前：初中二年级", action: "edit" },
        { label: "学科偏好", description: "数学、物理、化学", action: "edit" },
        { label: "密码安全", description: "修改密码、绑定手机", action: "edit" },
      ],
    },
    {
      title: "学习设置",
      icon: Settings,
      items: [
        { label: "错题提醒", description: "定时复习提醒", action: "toggle", value: true },
        { label: "难度适配", description: "自动调整题目难度", action: "toggle", value: true },
        { label: "语音讲解", description: "开启AI语音解答", action: "toggle", value: false, premium: true },
        { label: "学习计划", description: "个性化学习安排", action: "edit", premium: true },
      ],
    },
    {
      title: "隐私权限",
      icon: Shield,
      items: [
        { label: "数据分享", description: "允许匿名数据用于改进服务", action: "toggle", value: privacy.dataSharing },
        { label: "使用分析", description: "帮助我们改进产品体验", action: "toggle", value: privacy.analytics },
        { label: "家长访问", description: "允许家长查看学习数据", action: "toggle", value: privacy.parentAccess },
        { label: "教师访问", description: "允许教师查看学习数据", action: "toggle", value: privacy.teacherAccess },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">设置</h1>
              <p className="text-sm text-gray-500">管理你的账户和偏好设置</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* User Info Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">小明</h3>
                <p className="text-gray-500">初中二年级 • 标准版会员</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="default">数学</Badge>
                  <Badge variant="default">物理</Badge>
                  <Badge variant="default">化学</Badge>
                </div>
              </div>
              <Button variant="outline">编辑资料</Button>
            </div>
          </CardContent>
        </Card>

        {/* Settings Sections */}
        {settingSections.map((section) => {
          const Icon = section.icon
          return (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className="w-5 h-5" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.items.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Label className="font-medium">{item.label}</Label>
                          {item.premium && (
                            <Badge variant="secondary" className="text-xs">
                              高级版
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.action === "toggle" ? (
                          <Switch checked={item.value} disabled={item.premium} />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                    {index < section.items.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          )
        })}

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              通知设置
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: "push", label: "推送通知", description: "接收应用推送消息" },
              { key: "email", label: "邮件通知", description: "接收邮件提醒" },
              { key: "mistakes", label: "错题提醒", description: "定期提醒复习错题" },
              { key: "reports", label: "学习报告", description: "每周学习总结报告" },
            ].map((item, index) => (
              <div key={item.key}>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label className="font-medium">{item.label}</Label>
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                  />
                </div>
                {index < 3 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Other Settings */}
        <Card>
          <CardContent className="p-0">
            {[
              { icon: Palette, label: "主题设置", description: "深色模式、字体大小", action: "navigate" },
              { icon: Download, label: "数据导出", description: "导出学习数据和错题", action: "navigate" },
              { icon: HelpCircle, label: "帮助中心", description: "使用教程和常见问题", action: "navigate" },
              { icon: MessageSquare, label: "意见反馈", description: "提交建议和问题反馈", action: "navigate" },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index}>
                  <div className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.label}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                  {index < 3 && <Separator />}
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">账户管理</CardTitle>
            <CardDescription>这些操作不可逆，请谨慎操作</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-2" />
              退出登录
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
              删除账户
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
