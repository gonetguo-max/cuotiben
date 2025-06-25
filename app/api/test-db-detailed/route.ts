import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('Testing database connection...')
    
    // 测试1: 基本连接测试
    const { data: connectionTest, error: connectionError } = await supabase
      .from('users')
      .select('count')
      .limit(1)
    
    if (connectionError) {
      console.error('Connection test failed:', connectionError)
      return NextResponse.json({
        status: 'error',
        message: 'Database connection failed',
        error: connectionError.message,
        code: connectionError.code,
        details: connectionError.details,
        hint: connectionError.hint,
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }

    // 测试2: 检查表结构 (简化版)
    let tablesInfo = null
    try {
      const { data: tables, error: tablesError } = await supabase
        .rpc('get_tables')
      tablesInfo = { success: !tablesError, data: tables, error: tablesError }
    } catch (e) {
      tablesInfo = { success: false, error: 'RPC function not available' }
    }

    // 测试3: 尝试简单的查询
    const { data: simpleQuery, error: queryError } = await supabase
      .from('users')
      .select('id')
      .limit(1)

    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
             tests: {
         connectionTest: {
           success: !connectionError,
           data: connectionTest,
           error: connectionError
         },
         tablesInfo,
         simpleQuery: {
           success: !queryError,
           data: simpleQuery,
           error: queryError
         }
       },
      environment: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        keyPrefix: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...'
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 