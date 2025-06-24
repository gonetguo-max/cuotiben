// 环境变量类型定义和验证
interface EnvConfig {
  // 基础配置
  NODE_ENV: "development" | "production" | "test"
  NEXT_PUBLIC_APP_URL: string

  // 数据库配置
  DATABASE_URL: string

  // 认证配置
  NEXTAUTH_SECRET: string
  NEXTAUTH_URL: string

  // AI服务配置
  OPENAI_API_KEY: string
  GOOGLE_VISION_API_KEY?: string

  // 文件存储配置
  VERCEL_BLOB_READ_WRITE_TOKEN?: string
  CLOUDINARY_CLOUD_NAME?: string
  CLOUDINARY_API_KEY?: string
  CLOUDINARY_API_SECRET?: string

  // 邮件服务配置
  RESEND_API_KEY?: string
  SENDGRID_API_KEY?: string

  // 支付配置
  STRIPE_SECRET_KEY?: string
  STRIPE_WEBHOOK_SECRET?: string
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?: string

  // 监控配置
  SENTRY_DSN?: string
  VERCEL_ANALYTICS_ID?: string
}

function getEnvVar(key: keyof EnvConfig, defaultValue?: string): string {
  const value = process.env[key] || defaultValue

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }

  return value
}

function getOptionalEnvVar(key: keyof EnvConfig, defaultValue?: string): string | undefined {
  return process.env[key] || defaultValue
}

// 验证必需的环境变量
function validateEnv(): EnvConfig {
  return {
    NODE_ENV: getEnvVar("NODE_ENV", "development") as EnvConfig["NODE_ENV"],
    NEXT_PUBLIC_APP_URL: getEnvVar("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),

    DATABASE_URL: getEnvVar("DATABASE_URL"),

    NEXTAUTH_SECRET: getEnvVar("NEXTAUTH_SECRET"),
    NEXTAUTH_URL: getEnvVar("NEXTAUTH_URL", "http://localhost:3000"),

    OPENAI_API_KEY: getEnvVar("OPENAI_API_KEY"),
    GOOGLE_VISION_API_KEY: getOptionalEnvVar("GOOGLE_VISION_API_KEY"),

    VERCEL_BLOB_READ_WRITE_TOKEN: getOptionalEnvVar("VERCEL_BLOB_READ_WRITE_TOKEN"),
    CLOUDINARY_CLOUD_NAME: getOptionalEnvVar("CLOUDINARY_CLOUD_NAME"),
    CLOUDINARY_API_KEY: getOptionalEnvVar("CLOUDINARY_API_KEY"),
    CLOUDINARY_API_SECRET: getOptionalEnvVar("CLOUDINARY_API_SECRET"),

    RESEND_API_KEY: getOptionalEnvVar("RESEND_API_KEY"),
    SENDGRID_API_KEY: getOptionalEnvVar("SENDGRID_API_KEY"),

    STRIPE_SECRET_KEY: getOptionalEnvVar("STRIPE_SECRET_KEY"),
    STRIPE_WEBHOOK_SECRET: getOptionalEnvVar("STRIPE_WEBHOOK_SECRET"),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: getOptionalEnvVar("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"),

    SENTRY_DSN: getOptionalEnvVar("SENTRY_DSN"),
    VERCEL_ANALYTICS_ID: getOptionalEnvVar("VERCEL_ANALYTICS_ID"),
  }
}

// 导出验证后的环境变量
export const env = validateEnv()

// 环境检查工具
export const isDevelopment = env.NODE_ENV === "development"
export const isProduction = env.NODE_ENV === "production"
export const isTest = env.NODE_ENV === "test"

// 功能开关（基于环境变量）
export const features = {
  // AI功能
  aiAnalysis: !!env.OPENAI_API_KEY,
  ocrRecognition: !!env.GOOGLE_VISION_API_KEY,

  // 文件存储
  fileUpload: !!(env.VERCEL_BLOB_READ_WRITE_TOKEN || env.CLOUDINARY_CLOUD_NAME),

  // 邮件服务
  emailNotifications: !!(env.RESEND_API_KEY || env.SENDGRID_API_KEY),

  // 支付功能
  payments: !!env.STRIPE_SECRET_KEY,

  // 监控功能
  errorTracking: !!env.SENTRY_DSN,
  analytics: !!env.VERCEL_ANALYTICS_ID,
} as const

// 配置验证函数
export function checkRequiredFeatures(): void {
  const requiredFeatures = [
    { name: "AI分析", enabled: features.aiAnalysis },
    { name: "文件上传", enabled: features.fileUpload },
  ]

  const missingFeatures = requiredFeatures.filter((f) => !f.enabled)

  if (missingFeatures.length > 0) {
    console.warn("以下功能因缺少环境变量而被禁用:", missingFeatures.map((f) => f.name).join(", "))
  }
}

// 开发环境下检查配置
if (isDevelopment) {
  checkRequiredFeatures()
}
