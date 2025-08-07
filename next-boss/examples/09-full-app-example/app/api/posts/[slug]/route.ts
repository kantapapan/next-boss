/**
 * Individual Post API Route
 * 
 * 特定のブログ投稿を取得します。
 */

import { NextRequest, NextResponse } from 'next/server';
import { postStore } from '@/lib/data';

interface RouteParams {
  params: {
    slug: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = await params;
    
    // スラッグで投稿を検索
    const post = postStore.getBySlug(slug);
    
    if (!post) {
      return NextResponse.json(
        {
          success: false,
          error: 'Not Found',
          message: `スラッグ "${slug}" の投稿が見つかりません`,
        },
        { status: 404 }
      );
    }
    
    if (!post.published) {
      return NextResponse.json(
        {
          success: false,
          error: 'Not Found',
          message: 'この投稿は公開されていません',
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: post,
      message: '投稿を取得しました',
    });
  } catch (error) {
    console.error(`GET /api/posts/${(await params).slug} error:`, error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
        message: '投稿の取得中にエラーが発生しました',
      },
      { status: 500 }
    );
  }
}