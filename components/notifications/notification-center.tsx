"use client"

import { useState } from "react"
import { Bell, Check, X, Clock, AlertCircle, Info, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "reminder",
      title: "复习提醒",
      content: "你有3道数学错题需要复习",
      time: "2小时前",
      read: false,
      icon: Clock,
      color: "text-orange-500",
    },
    {
      id: 2,
      type: "report",
      title: "学习报告",
      content: "本周学习报告已生成，掌握率提升了15%",
      time: "1天前",
      read: true,
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      id: 3,
      type: "system",
      title: "功能更新",
      content: "新增AI语音讲解功能，快来体验吧！",
      time: "2天前",
      read: false,
      icon: Info,
      color: "text-blue-500",
    },
    {
      id: 4,
      type: "achievement",
      title: "学习成就",
      content: "恭喜！你已连续学习7天",
      time: "3天前",
      read: true,
      icon: CheckCircle,
      color: "text-purple-500",
    },
    {
      id: 5,
      type: "alert",
      title: "订阅提醒",
      content: "你的标准版会员将在3天后到期",
      time: "1周前",
      read: false,
      icon: AlertCircle,
      color: "text-red-500",
    },
  ])

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length
  const todayNotifications = notifications.filter((n) => n.time.includes("小时前") || n.time.includes("分钟前"))
  const earlierNotifications = notifications.filter((n) => !n.time.includes("小时前") && !n.time.includes("分钟前"))

  const NotificationItem = ({ notification }: { notification: any }) => {
    const Icon = notification.icon
    return (
      <Card className={`mb-3 ${!notification.read ? "border-blue-200 bg-blue-50" : ""}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-4 h-4 ${notification.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}>
                    {notification.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">{notification.content}</p>
                  <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  {!notification.read && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => markAsRead(notification.id)}
                      className="h-6 w-6 p-0"
                    >
                      <Check className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteNotification(notification.id)}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            <h2 className="text-lg font-semibold">通知中心</h2>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button size="sm" variant="outline" onClick={markAllAsRead}>
              全部已读
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="unread">未读</TabsTrigger>
            <TabsTrigger value="system">系统</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="all" className="h-full mt-4">
            <ScrollArea className="h-full px-4">
              {todayNotifications.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">今天</h3>
                  {todayNotifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </div>
              )}

              {earlierNotifications.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">更早</h3>
                  {earlierNotifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="unread" className="h-full mt-4">
            <ScrollArea className="h-full px-4">
              {notifications.filter((n) => !n.read).length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">没有未读通知</p>
                </div>
              ) : (
                notifications
                  .filter((n) => !n.read)
                  .map((notification) => <NotificationItem key={notification.id} notification={notification} />)
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="system" className="h-full mt-4">
            <ScrollArea className="h-full px-4">
              {notifications
                .filter((n) => n.type === "system")
                .map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
