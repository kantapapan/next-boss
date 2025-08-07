/**
 * Posts API Route
 * 
 * このファイルは /api/posts エンドポイントを定義します。
 * ブログ投稿の一覧取得と新規作成を行います。
 * 
 * 対応するHTTPメソッド:
 * - GET: 投稿一覧の取得（クエリパラメータで絞り込み可能）
 * - POST: 新しい投稿の作成
 */

import { NextRequest } from 'next/server';
import { postStore, userStore } from '@/lib/data';
import { 
  createSuccessResponse, 
  createErrorResponse, 
  createMethodNotAllowedResponse,
  parseRequestBody,
  validateData
} from '@/lib/api-utils';
import { CreatePostRequest } from '@/types';

/**
 * GET /api/posts
 * 投稿一覧を取得します
 * 
 * クエリパラメータ:
 * - published: true/false (公開状態で絞り込み)
 * - authorId: string (著者IDで絞り込み)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedParam = searchParams.get('published');
    const authorId = searchParams.get('authorId');

    let posts = postStore.getAll();

    // 公開状態で絞り込み
    if (publishedParam !== null) {
      const isPublished = publishedParam === 'true';
      posts = posts.filter(post => post.published === isPublished);
    }

    // 著者IDで絞り込み
    if (authorId) {
      posts = posts.filter(post => post.authorId === authorId);
    }

    // 作成日時の降順でソート
    posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return createSuccessResponse(
      posts,
      `${posts.length}件の投稿を取得しました`
    );
  } catch (error) {
    console.error('GET /api/posts error:', error);
    return createErrorResponse(
      'Internal Server Error',
      '投稿の取得中にエラーが発生しました',
      500
    );
  }
}

/**
 * POST /api/posts
 * 新しい投稿を作成します
 */
export async function POST(request: NextRequest) {
  try {
    // リクエストボディをパース
    const body = await parseRequestBody<CreatePostRequest>(request);
    
    if (!body) {
      return createErrorResponse(
        'Invalid JSON',
        'リクエストボディが正しいJSON形式ではありません',
        400
      );
    }

    // バリデーション
    const validation = validateData(body, [
      { field: 'title', required: true, type: 'string', minLength: 1, maxLength: 200 },
      { field: 'content', required: true, type: 'string', minLength: 1 },
      { field: 'authorId', required: true, type: 'string' }
    ]);

    if (!validation.isValid) {
      return createErrorResponse(
        'Validation Error',
        validation.errors.join(', '),
        400
      );
    }

    // 著者の存在確認
    const author = userStore.getById(body.authorId);
    if (!author) {
      return createErrorResponse(
        'Bad Request',
        '指定された著者IDのユーザーが存在しません',
        400
      );
    }

    // 新しい投稿を作成
    const newPost = postStore.create({
      title: body.title,
      content: body.content,
      authorId: body.authorId,
      published: body.published ?? false, // デフォルトは非公開
    });

    return createSuccessResponse(
      newPost,
      '投稿が正常に作成されました',
      201
    );
  } catch (error) {
    console.error('POST /api/posts error:', error);
    return createErrorResponse(
      'Internal Server Error',
      '投稿の作成中にエラーが発生しました',
      500
    );
  }
}

/**
 * その他のHTTPメソッドは許可されていません
 */
export async function PUT() {
  return createMethodNotAllowedResponse(['GET', 'POST']);
}

export async function DELETE() {
  return createMethodNotAllowedResponse(['GET', 'POST']);
}

export async function PATCH() {
  return createMethodNotAllowedResponse(['GET', 'POST']);
}