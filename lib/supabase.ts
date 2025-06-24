import { createClient } from '@supabase/supabase-js'

// Supabase配置
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// 创建Supabase客户端
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// 数据库类型定义
export interface User {
  id: string
  name: string
  grade: string
  subjects: string[]
  points: number
  settings?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface Mistake {
  id: string
  user_id: string
  subject: string
  topic?: string
  question: string
  student_answer?: string
  correct_answer?: string
  explanation?: string
  ai_analysis?: Record<string, any>
  image_url?: string
  difficulty: 'simple' | 'medium' | 'hard'
  mastered: boolean
  review_count: number
  last_reviewed?: string
  created_at: string
  updated_at: string
}

export interface SimilarQuestion {
  id: string
  original_mistake_id: string
  question: string
  options?: string[]
  correct_answer: string
  explanation: string
  difficulty: string
  created_at: string
}

export interface LearningSession {
  id: string
  user_id: string
  mistake_id: string
  action: 'review' | 'practice' | 'master'
  time_spent?: number
  score?: number
  created_at: string
}

export interface PointsTransaction {
  id: string
  user_id: string
  points: number
  action: string
  description: string
  created_at: string
}

// 数据库表名常量
export const TABLES = {
  USERS: 'users',
  MISTAKES: 'mistakes', 
  SIMILAR_QUESTIONS: 'similar_questions',
  LEARNING_SESSIONS: 'learning_sessions',
  POINTS_TRANSACTIONS: 'points_transactions'
} as const

// Supabase 实用工具函数
export class SupabaseUtils {
  // 检查连接状态
  static async checkConnection(): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .select('count')
        .limit(1)
      
      return !error
    } catch (error) {
      console.error('Supabase connection check failed:', error)
      return false
    }
  }

  // 创建用户
  static async createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .insert(userData)
        .select()
        .single()

      if (error) {
        console.error('Error creating user:', error)
        return null
      }

      return data as User
    } catch (error) {
      console.error('Error creating user:', error)
      return null
    }
  }

  // 获取用户
  static async getUser(userId: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching user:', error)
        return null
      }

      return data as User
    } catch (error) {
      console.error('Error fetching user:', error)
      return null
    }
  }

  // 保存错题
  static async saveMistake(mistakeData: Omit<Mistake, 'id' | 'created_at' | 'updated_at'>): Promise<Mistake | null> {
    try {
      const { data, error } = await supabase
        .from(TABLES.MISTAKES)
        .insert(mistakeData)
        .select()
        .single()

      if (error) {
        console.error('Error saving mistake:', error)
        return null
      }

      return data as Mistake
    } catch (error) {
      console.error('Error saving mistake:', error)
      return null
    }
  }

  // 获取用户错题列表
  static async getUserMistakes(
    userId: string, 
    filters?: {
      subject?: string
      difficulty?: string
      mastered?: boolean
      limit?: number
      offset?: number
    }
  ): Promise<Mistake[]> {
    try {
      let query = supabase
        .from(TABLES.MISTAKES)
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (filters?.subject && filters.subject !== 'all') {
        query = query.eq('subject', filters.subject)
      }

      if (filters?.difficulty && filters.difficulty !== 'all') {
        query = query.eq('difficulty', filters.difficulty)
      }

      if (filters?.mastered !== undefined) {
        query = query.eq('mastered', filters.mastered)
      }

      if (filters?.limit) {
        query = query.limit(filters.limit)
      }

      if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching mistakes:', error)
        return []
      }

      return data as Mistake[]
    } catch (error) {
      console.error('Error fetching mistakes:', error)
      return []
    }
  }

  // 更新错题掌握状态
  static async updateMistakeStatus(mistakeId: string, mastered: boolean): Promise<boolean> {
    try {
      const { error } = await supabase
        .from(TABLES.MISTAKES)
        .update({ 
          mastered,
          review_count: supabase.sql`review_count + 1`,
          last_reviewed: new Date().toISOString()
        })
        .eq('id', mistakeId)

      if (error) {
        console.error('Error updating mistake status:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error updating mistake status:', error)
      return false
    }
  }

  // 保存相似题目
  static async saveSimilarQuestions(questions: Omit<SimilarQuestion, 'id' | 'created_at'>[]): Promise<SimilarQuestion[]> {
    try {
      const { data, error } = await supabase
        .from(TABLES.SIMILAR_QUESTIONS)
        .insert(questions)
        .select()

      if (error) {
        console.error('Error saving similar questions:', error)
        return []
      }

      return data as SimilarQuestion[]
    } catch (error) {
      console.error('Error saving similar questions:', error)
      return []
    }
  }

  // 更新用户积分
  static async updateUserPoints(userId: string, points: number, action: string, description: string): Promise<boolean> {
    try {
      // 更新用户积分
      const { error: userError } = await supabase
        .from(TABLES.USERS)
        .update({ 
          points: supabase.sql`points + ${points}`,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)

      if (userError) {
        console.error('Error updating user points:', userError)
        return false
      }

      // 记录积分变动
      const { error: transactionError } = await supabase
        .from(TABLES.POINTS_TRANSACTIONS)
        .insert({
          user_id: userId,
          points,
          action,
          description
        })

      if (transactionError) {
        console.error('Error recording points transaction:', transactionError)
        return false
      }

      return true
    } catch (error) {
      console.error('Error updating user points:', error)
      return false
    }
  }
} 