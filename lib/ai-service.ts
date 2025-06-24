// AI服务抽象层，支持多种AI提供商

// AI分析结果接口
export interface AnalysisResult {
  isCorrect: boolean
  correctAnswer: string
  errorType?: string
  explanation: string
  difficulty: 'simple' | 'medium' | 'hard'
  topic: string
  suggestions: string
  confidence?: number
}

// 题目信息接口
export interface Problem {
  question: string
  subject: string
  grade: string
  studentAnswer?: string
  correctAnswer?: string
  topic?: string
  difficulty?: string
}

// 相似题目接口
export interface SimilarQuestion {
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
  difficulty: string
  topic: string
}

// AI服务提供商接口
export interface AIProvider {
  analyzeProblem(problem: Problem): Promise<AnalysisResult>
  generateSimilarQuestions(problem: Problem, count: number): Promise<SimilarQuestion[]>
  explainConcept(concept: string, grade: string): Promise<string>
}

// 年级配置
export const gradeConfigs = {
  '小学一年级': { level: '小学', complexity: 1, vocabulary: 'simple', mathLevel: 'basic' },
  '小学二年级': { level: '小学', complexity: 1, vocabulary: 'simple', mathLevel: 'basic' },
  '小学三年级': { level: '小学', complexity: 2, vocabulary: 'simple', mathLevel: 'basic' },
  '小学四年级': { level: '小学', complexity: 2, vocabulary: 'simple', mathLevel: 'basic' },
  '小学五年级': { level: '小学', complexity: 3, vocabulary: 'simple', mathLevel: 'basic' },
  '小学六年级': { level: '小学', complexity: 3, vocabulary: 'simple', mathLevel: 'basic' },
  '初中一年级': { level: '初中', complexity: 4, vocabulary: 'standard', mathLevel: 'intermediate' },
  '初中二年级': { level: '初中', complexity: 5, vocabulary: 'standard', mathLevel: 'intermediate' },
  '初中三年级': { level: '初中', complexity: 6, vocabulary: 'standard', mathLevel: 'intermediate' },
  '高中一年级': { level: '高中', complexity: 7, vocabulary: 'advanced', mathLevel: 'advanced' },
  '高中二年级': { level: '高中', complexity: 8, vocabulary: 'advanced', mathLevel: 'advanced' },
  '高中三年级': { level: '高中', complexity: 9, vocabulary: 'advanced', mathLevel: 'advanced' },
}

// 获取年级配置
export function getGradeConfig(grade: string) {
  return gradeConfigs[grade as keyof typeof gradeConfigs] || gradeConfigs['初中二年级']
}

// 根据年级适配prompt
export function adaptPromptForGrade(basePrompt: string, grade: string): string {
  const config = getGradeConfig(grade)
  
  const gradePrompts = {
    '小学': '请用小学生能理解的简单语言和生活例子来解释',
    '初中': '请用初中生的知识水平，结合实际例子来详细解释', 
    '高中': '请用高中生的知识水平，可以使用更深入的概念来解释'
  }
  
  const gradePrefix = gradePrompts[config.level as keyof typeof gradePrompts]
  return `${gradePrefix}。${basePrompt}`
}

// DeepSeek AI 提供商实现
export class DeepSeekProvider implements AIProvider {
  private apiKey: string
  private baseUrl = 'https://api.deepseek.com/v1'
  
  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.DEEPSEEK_API_KEY || ''
    if (!this.apiKey) {
      throw new Error('DeepSeek API key is required')
    }
  }
  
  private async callAPI(messages: Array<{role: string, content: string}>, temperature = 0.3): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages,
          temperature,
          max_tokens: 2000,
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(`DeepSeek API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`)
      }
      
      const result = await response.json()
      
      if (!result.choices || !result.choices[0] || !result.choices[0].message) {
        throw new Error('Invalid response format from DeepSeek API')
      }
      
      return result.choices[0].message.content
    } catch (error) {
      console.error('DeepSeek API call failed:', error)
      throw error
    }
  }
  
  async analyzeProblem(problem: Problem): Promise<AnalysisResult> {
    const gradeConfig = getGradeConfig(problem.grade)
    
    const prompt = adaptPromptForGrade(`
你是一位专业的${problem.grade}${problem.subject}老师。请分析以下题目：

题目：${problem.question}
学生答案：${problem.studentAnswer || '未提供'}
年级：${problem.grade}
学科：${problem.subject}

请按以下JSON格式返回分析结果：
{
  "isCorrect": boolean,
  "correctAnswer": "正确答案",
  "errorType": "错误类型（如果有错误）",
  "explanation": "详细解题步骤和思路",
  "difficulty": "题目难度（simple/medium/hard）",
  "topic": "知识点",
  "suggestions": "改进建议",
  "confidence": 0.95
}

要求：
1. 语言适合${problem.grade}学生理解
2. 解释要详细且有条理
3. 如果学生答错，要指出具体错在哪里
4. 提供有针对性的学习建议
    `, problem.grade)
    
    const messages = [
      {
        role: 'system',
        content: '你是一个专业的教学AI，擅长分析学生作业并提供个性化指导。'
      },
      {
        role: 'user',
        content: prompt
      }
    ]
    
    try {
      const response = await this.callAPI(messages)
      const analysis = JSON.parse(response)
      
      // 验证响应格式
      if (!analysis.hasOwnProperty('isCorrect') || !analysis.explanation) {
        throw new Error('Invalid analysis response format')
      }
      
      return analysis as AnalysisResult
    } catch (error) {
      console.error('Error analyzing problem:', error)
      throw new Error('AI分析失败，请重试')
    }
  }
  
  async generateSimilarQuestions(problem: Problem, count: number = 3): Promise<SimilarQuestion[]> {
    const prompt = adaptPromptForGrade(`
基于以下题目信息，生成${count}道相似的练习题：

原题目：${problem.question}
知识点：${problem.topic || '请自动识别'}
难度：${problem.difficulty || '中等'}
学科：${problem.subject}
年级：${problem.grade}

要求：
1. 保持相同的知识点和难度
2. 变换题目的数值、背景或表达方式
3. 提供标准答案和详细解析
4. 确保题目质量和教学价值

请按以下JSON格式返回：
{
  "questions": [
    {
      "question": "题目内容",
      "options": ["A选项", "B选项", "C选项", "D选项"],
      "correctAnswer": "正确答案",
      "explanation": "详细解析",
      "difficulty": "simple/medium/hard",
      "topic": "知识点"
    }
  ]
}
    `, problem.grade)
    
    const messages = [
      {
        role: 'system',
        content: '你是一个专业的出题AI，擅长根据已有题目生成高质量的相似练习题。'
      },
      {
        role: 'user',
        content: prompt
      }
    ]
    
    try {
      const response = await this.callAPI(messages, 0.7)
      const result = JSON.parse(response)
      
      if (!result.questions || !Array.isArray(result.questions)) {
        throw new Error('Invalid similar questions response format')
      }
      
      return result.questions as SimilarQuestion[]
    } catch (error) {
      console.error('Error generating similar questions:', error)
      throw new Error('生成相似题目失败，请重试')
    }
  }
  
  async explainConcept(concept: string, grade: string): Promise<string> {
    const prompt = adaptPromptForGrade(`
请详细解释以下概念：${concept}

要求：
1. 用通俗易懂的语言解释
2. 提供具体例子
3. 说明在实际学习中的应用
4. 给出学习建议
    `, grade)
    
    const messages = [
      {
        role: 'system',
        content: '你是一个专业的教学AI，擅长解释复杂概念并提供个性化教学指导。'
      },
      {
        role: 'user',
        content: prompt
      }
    ]
    
    try {
      const response = await this.callAPI(messages)
      return response
    } catch (error) {
      console.error('Error explaining concept:', error)
      throw new Error('概念解释失败，请重试')
    }
  }
}

// 智谱AI提供商（备用）
export class ZhipuProvider implements AIProvider {
  private apiKey: string
  private baseUrl = 'https://open.bigmodel.cn/api/paas/v4'
  
  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.ZHIPU_API_KEY || ''
  }
  
  async analyzeProblem(problem: Problem): Promise<AnalysisResult> {
    // 智谱AI实现 - 暂时抛出错误提示用户使用DeepSeek
    throw new Error('智谱AI集成开发中，请使用DeepSeek')
  }
  
  async generateSimilarQuestions(problem: Problem, count: number): Promise<SimilarQuestion[]> {
    throw new Error('智谱AI集成开发中，请使用DeepSeek')
  }
  
  async explainConcept(concept: string, grade: string): Promise<string> {
    throw new Error('智谱AI集成开发中，请使用DeepSeek')
  }
}

// AI服务工厂
export class AIServiceFactory {
  static createProvider(type: 'deepseek' | 'zhipu' = 'deepseek'): AIProvider {
    switch (type) {
      case 'deepseek':
        return new DeepSeekProvider()
      case 'zhipu':
        return new ZhipuProvider()
      default:
        throw new Error(`Unsupported AI provider: ${type}`)
    }
  }
  
  static getDefaultProvider(): AIProvider {
    // 默认使用DeepSeek
    return new DeepSeekProvider()
  }
}

// 导出默认AI服务实例
export const aiService = AIServiceFactory.getDefaultProvider()

// 实用工具函数
export class AIUtils {
  // 解析AI响应中的JSON
  static parseAIResponse<T>(response: string): T {
    try {
      // 清理响应中可能的markdown代码块标记
      const cleanedResponse = response
        .replace(/```json\s*/g, '')
        .replace(/```\s*/g, '')
        .trim()
      
      return JSON.parse(cleanedResponse)
    } catch (error) {
      console.error('Failed to parse AI response:', response)
      throw new Error('AI响应格式错误')
    }
  }
  
  // 验证分析结果格式
  static validateAnalysisResult(result: any): result is AnalysisResult {
    return (
      typeof result === 'object' &&
      typeof result.isCorrect === 'boolean' &&
      typeof result.correctAnswer === 'string' &&
      typeof result.explanation === 'string' &&
      typeof result.difficulty === 'string' &&
      typeof result.topic === 'string' &&
      typeof result.suggestions === 'string'
    )
  }
  
  // 获取错误类型的中文描述
  static getErrorTypeDescription(errorType: string): string {
    const descriptions: Record<string, string> = {
      'calculation': '计算错误',
      'concept': '概念理解错误',
      'method': '方法选择错误',
      'careless': '粗心大意',
      'incomplete': '答案不完整',
      'format': '格式错误',
      'logic': '逻辑错误'
    }
    
    return descriptions[errorType] || errorType
  }
}

// 错误处理类
export class AIServiceError extends Error {
  constructor(
    message: string,
    public provider: string,
    public originalError?: Error
  ) {
    super(message)
    this.name = 'AIServiceError'
  }
}

// AI服务状态检查
export async function checkAIServiceHealth(): Promise<{
  deepseek: boolean
  zhipu: boolean
}> {
  const results = {
    deepseek: false,
    zhipu: false
  }
  
  // 检查DeepSeek
  try {
    const deepseekProvider = new DeepSeekProvider()
    await deepseekProvider.explainConcept('测试', '初中二年级')
    results.deepseek = true
  } catch (error) {
    console.warn('DeepSeek service check failed:', error)
  }
  
  // 检查智谱AI（暂时跳过）
  // try {
  //   const zhipuProvider = new ZhipuProvider()
  //   await zhipuProvider.explainConcept('测试', '初中二年级')
  //   results.zhipu = true
  // } catch (error) {
  //   console.warn('Zhipu service check failed:', error)
  // }
  
  return results
} 