"use client"

interface ProgressRingProps {
  progress: number // 0-100
  size?: number
  strokeWidth?: number
  colors?: string[]
  showPercentage?: boolean
  animated?: boolean
}

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  colors = ["#3b82f6", "#6366f1"], // 专业蓝色渐变
  showPercentage = true,
  animated = true,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="relative">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* 背景圆环 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="opacity-30"
        />

        {/* 专业渐变定义 */}
        <defs>
          <linearGradient id="professionalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="100%" stopColor={colors[1]} />
          </linearGradient>
        </defs>

        {/* 进度圆环 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#professionalGradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={animated ? "transition-all duration-1000 ease-out" : ""}
          style={{
            filter: "drop-shadow(0 0 6px rgba(59, 130, 246, 0.3))",
          }}
        />
      </svg>

      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {progress}%
            </span>
            <div className="text-xs text-gray-500 mt-1">完成度</div>
          </div>
        </div>
      )}
    </div>
  )
}
