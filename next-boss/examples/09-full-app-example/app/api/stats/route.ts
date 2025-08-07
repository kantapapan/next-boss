/**
 * Stats API Route
 * 
 * ブログの統計情報を取得します。
 */

import { NextResponse } from 'next/server';
import { getStats } from '@/lib/data';

export async function GET() {
  try {
    const stats = getStats();
    
    return NextResponse.json({
      success: true,
      data: stats,
      message: '統計情報を取得しました',
    });
  } catch (error) {
    console.error('GET /api/stats error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
        message: '統計情報の取得中にエラーが発生しました',
      },
      { status: 500 }
    );
  }
}