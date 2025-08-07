/**
 * Comments API Route
 * 
 * コメントの取得と作成を行います。
 */

import { NextRequest, NextResponse } from 'next/server';
import { commentStore } from '@/lib/data';
import { CreateCommentRequest } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');
    
    if (!postId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Bad Request',
          message: 'postIdパラメータが必要です',
        },
        { status: 400 }
      );
    }
    
    const comments = commentStore.getByPostId(postId);
    
    return NextResponse.json({
      success: true,
      data: comments,
      message: `${comments.length}件のコメントを取得しました`,
    });
  } catch (error) {
    console.error('GET /api/comments error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
        message: 'コメントの取得中にエラーが発生しました',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateCommentRequest = await request.json();
    
    // バリデーション
    if (!body.content || !body.authorName || !body.authorEmail || !body.postId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation Error',
          message: '必須フィールドが不足しています',
        },
        { status: 400 }
      );
    }
    
    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.authorEmail)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation Error',
          message: '有効なメールアドレスを入力してください',
        },
        { status: 400 }
      );
    }
    
    // コメントを作成
    const newComment = commentStore.create(body);
    
    return NextResponse.json(
      {
        success: true,
        data: newComment,
        message: 'コメントが投稿されました',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/comments error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
        message: 'コメントの投稿中にエラーが発生しました',
      },
      { status: 500 }
    );
  }
}