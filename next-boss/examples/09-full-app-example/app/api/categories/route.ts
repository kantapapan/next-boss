/**
 * Categories API Route
 * 
 * カテゴリ一覧を取得します。
 */

import { NextResponse } from 'next/server';
import { categoryStore } from '@/lib/data';

export async function GET() {
  try {
    const categories = categoryStore.getAll();
    
    return NextResponse.json({
      success: true,
      data: categories,
      message: `${categories.length}個のカテゴリを取得しました`,
    });
  } catch (error) {
    console.error('GET /api/categories error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
        message: 'カテゴリの取得中にエラーが発生しました',
      },
      { status: 500 }
    );
  }
}