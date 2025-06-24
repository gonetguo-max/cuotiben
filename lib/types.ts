import type React from "react"
// 用户相关类型
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  grade: string
  school?: string
  subjects: string[]
  createdAt: Date
  updatedAt: Date
}

// 错题相关类型
export interface Mistake {
  id: string
  userId: string
  subject: string
  topic: string
  question: string
  studentAnswer: string
  correctAnswer: string
  explanation?: string
  errorType: string
  difficulty: "easy" | "medium" | "hard"
  imageUrl?: string
  mastered: boolean
  reviewCount: number
  createdAt: Date
  updatedAt: Date
}

// 学习计划类型
export interface LearningPlan {
  id: string
  userId: string
  title: string
  description: string
  duration: number
  difficulty: "easy" | "medium" | "hard"
  subjects: string[]
  status: "active" | "completed" | "paused"
  progress: number
  targetMistakes: number
  masteredMistakes: number
  startDate: Date
  endDate: Date
  createdAt: Date
  updatedAt: Date
}

// 学习任务类型
export interface LearningTask {
  id: string
  planId: string
  day: number
  task: string
  completed: boolean
  timeSpent: number
  createdAt: Date
  updatedAt: Date
}

// API响应类型
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// 分页类型
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// 文件上传类型
export interface UploadResponse {
  url: string
  filename: string
  size: number
  type: string
}

// OCR识别结果类型
export interface OCRResult {
  text: string
  confidence: number
  boundingBox: {
    x: number
    y: number
    width: number
    height: number
  }
}

// AI分析结果类型
export interface AIAnalysisResult {
  questionId: string
  question: string
  studentAnswer: string
  correctAnswer: string
  isCorrect: boolean
  errorType?: string
  explanation?: string
  confidence: number
  suggestions?: string[]
}

// 学习统计类型
export interface LearningStats {
  totalMistakes: number
  masteredMistakes: number
  studyDays: number
  studyHours: number
  currentStreak: number
  longestStreak: number
  averageAccuracy: number
  improvementRate: number
  subjectStats: Record<
    string,
    {
      total: number
      mastered: number
      accuracy: number
    }
  >
}

// 成就类型
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  color: string
  unlocked: boolean
  unlockedAt?: Date
  progress?: number
  maxProgress?: number
}

// 订阅类型
export interface Subscription {
  id: string
  userId: string
  plan: "free" | "standard" | "premium"
  status: "active" | "canceled" | "expired"
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  createdAt: Date
  updatedAt: Date
}

// 表单验证类型
export interface FormErrors {
  [key: string]: string | undefined
}

// 组件Props类型
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

// 模态框Props类型
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
}

// 表格列定义类型
export interface TableColumn<T = any> {
  key: keyof T
  title: string
  render?: (value: any, record: T) => React.ReactNode
  sortable?: boolean
  width?: string | number
}

// 筛选器类型
export interface Filter {
  key: string
  label: string
  type: "select" | "date" | "text" | "number"
  options?: { label: string; value: string }[]
  value?: any
}

// 通知类型
export interface Notification {
  id: string
  userId: string
  title: string
  content: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: Date
}

// 导出配置类型
export interface ExportConfig {
  format: "pdf" | "word" | "image"
  includeAnswers: boolean
  includeExplanations: boolean
  layout: "standard" | "compact" | "spacious"
  mistakeIds: string[]
}
