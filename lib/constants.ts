// 应用配置常量
export const APP_CONFIG = {
  name: "智能错题本",
  description: "AI驱动的个性化学习助手",
  version: "1.0.0",
  author: "Smart Learning Team",
  website: "https://mistake-notebook.vercel.app",
  supportEmail: "support@mistake-notebook.com",
} as const

// 年级配置
export const GRADES = [
  { value: "小学三年级", label: "小学三年级", level: "小学" },
  { value: "小学四年级", label: "小学四年级", level: "小学" },
  { value: "小学五年级", label: "小学五年级", level: "小学" },
  { value: "小学六年级", label: "小学六年级", level: "小学" },
  { value: "初中一年级", label: "初中一年级", level: "初中" },
  { value: "初中二年级", label: "初中二年级", level: "初中" },
  { value: "初中三年级", label: "初中三年级", level: "初中" },
  { value: "高中一年级", label: "高中一年级", level: "高中" },
  { value: "高中二年级", label: "高中二年级", level: "高中" },
  { value: "高中三年级", label: "高中三年级", level: "高中" },
] as const

// 学科配置
export const SUBJECTS = {
  小学: ["数学", "语文", "英语"],
  初中: ["数学", "物理", "化学", "语文", "英语", "生物", "地理", "历史"],
  高中: ["数学", "物理", "化学", "语文", "英语", "生物", "地理", "历史", "政治"],
} as const

// 难度等级
export const DIFFICULTY_LEVELS = [
  { value: "easy", label: "简单", color: "green" },
  { value: "medium", label: "中等", color: "yellow" },
  { value: "hard", label: "困难", color: "red" },
] as const

// 错误类型
export const ERROR_TYPES = [
  "计算错误",
  "概念理解错误",
  "公式应用错误",
  "逻辑推理错误",
  "审题不仔细",
  "方法选择错误",
  "步骤遗漏",
  "符号错误",
  "单位错误",
  "其他",
] as const

// 文件配置
export const FILE_CONFIG = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  allowedExtensions: [".jpg", ".jpeg", ".png", ".webp"],
} as const

// API配置
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
} as const

// 分页配置
export const PAGINATION_CONFIG = {
  defaultPageSize: 10,
  pageSizeOptions: [10, 20, 50, 100],
  maxPageSize: 100,
} as const

// 主题配置
export const THEME_CONFIG = {
  colors: {
    primary: {
      50: "#eff6ff",
      100: "#dbeafe",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      900: "#1e3a8a",
    },
    success: {
      50: "#f0fdf4",
      100: "#dcfce7",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      900: "#14532d",
    },
    warning: {
      50: "#fffbeb",
      100: "#fef3c7",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      900: "#78350f",
    },
    error: {
      50: "#fef2f2",
      100: "#fee2e2",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      900: "#7f1d1d",
    },
  },
  borderRadius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
  },
} as const

// 动画配置
export const ANIMATION_CONFIG = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const

// 本地存储键名
export const STORAGE_KEYS = {
  user: "mistake-notebook-user",
  theme: "mistake-notebook-theme",
  settings: "mistake-notebook-settings",
  drafts: "mistake-notebook-drafts",
  cache: "mistake-notebook-cache",
} as const

// 路由配置
export const ROUTES = {
  home: "/",
  login: "/auth/login",
  register: "/auth/register",
  dashboard: "/dashboard",
  mistakes: "/mistakes",
  upload: "/upload",
  plans: "/plans",
  reports: "/reports",
  settings: "/settings",
  profile: "/profile",
  admin: "/admin",
} as const

// 订阅计划配置
export const SUBSCRIPTION_PLANS = {
  free: {
    name: "免费版",
    price: 0,
    features: ["每月10次拍照识别", "基础错题本功能", "简单对错判断", "基础年级设置"],
    limitations: ["无详细讲解", "无相似题目生成", "无试卷导出", "无学习报告"],
  },
  standard: {
    name: "标准版",
    price: 29,
    features: [
      "无限次拍照识别",
      "详细错题讲解",
      "相似题目生成",
      "试卷导出功能",
      "学习报告分析",
      "多角色权限",
      "优先客服支持",
    ],
  },
  premium: {
    name: "高级版",
    price: 59,
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
  },
} as const

// 成就配置
export const ACHIEVEMENTS = [
  {
    id: "first_upload",
    title: "学习新手",
    description: "完成第一次拍照识别",
    icon: "star",
    color: "bronze",
    condition: { type: "upload_count", value: 1 },
  },
  {
    id: "streak_7",
    title: "坚持不懈",
    description: "连续学习7天",
    icon: "zap",
    color: "gold",
    condition: { type: "streak_days", value: 7 },
  },
  {
    id: "mastered_50",
    title: "错题克星",
    description: "掌握50道错题",
    icon: "trophy",
    color: "blue",
    condition: { type: "mastered_count", value: 50 },
  },
  {
    id: "study_time_40h",
    title: "学霸之路",
    description: "月度学习时长达到40小时",
    icon: "crown",
    color: "indigo",
    condition: { type: "monthly_study_time", value: 2400 }, // 40小时 = 2400分钟
  },
] as const

// 通知类型
export const NOTIFICATION_TYPES = {
  info: { icon: "info", color: "blue" },
  success: { icon: "check", color: "green" },
  warning: { icon: "alert", color: "yellow" },
  error: { icon: "x", color: "red" },
} as const

// 正则表达式
export const REGEX = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^1[3-9]\d{9}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
} as const

// 错误消息
export const ERROR_MESSAGES = {
  required: "此字段为必填项",
  invalidEmail: "请输入有效的邮箱地址",
  invalidPhone: "请输入有效的手机号码",
  passwordTooShort: "密码至少需要8个字符",
  passwordTooWeak: "密码需要包含大小写字母和数字",
  fileTooLarge: "文件大小不能超过10MB",
  invalidFileType: "不支持的文件类型",
  networkError: "网络连接失败，请检查网络设置",
  serverError: "服务器错误，请稍后重试",
  unauthorized: "未授权访问，请先登录",
  forbidden: "权限不足，无法执行此操作",
  notFound: "请求的资源不存在",
  rateLimited: "请求过于频繁，请稍后重试",
} as const
