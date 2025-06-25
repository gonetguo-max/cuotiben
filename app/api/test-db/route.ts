import { NextRequest, NextResponse } from 'next/server'
import { supabase, SupabaseUtils } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // 测试数据库连接
    const isConnected = await SupabaseUtils.checkConnection()
    
    if (!isConnected) {
      return NextResponse.json({ 
        status: 'error',
        message: 'Database connection failed',
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }

    // 获取数据库状态信息
    const { data: healthCheck, error } = await supabase
      .from('users')
      .select('count')
      .limit(1)

    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      database: 'connected',
      timestamp: new Date().toISOString(),
      details: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/.*$/, '/***') || 'Not configured',
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        healthCheck: healthCheck || 'No data yet'
      }
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({ 
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 