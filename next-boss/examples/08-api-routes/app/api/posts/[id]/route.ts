/**
 * Individual Post API Route
 * 
 * このファイルは /api/posts/[id] エンドポイントを定義します。
 * 特定の投稿に対する操作を行います。
 * 
 * 対応するHTTPメソッド:
 * - GET: 特定の投稿の取得
 * - PUT: 投稿の更新
 * - DELETE: 投稿の削除
 */

import { NextRequest } from 'next/server';
import { postStore } from '@/lib/data';
import { 
  createSuccessResponse, 
  createErrorResponse, 
  createMethodNotAllowedResponse,
  parseRequestBody,
  validateData
} from '@/lib/api-utils';
import { UpdatePostRequest } from '@/types';

/**
 * ルートパラメータの型定義
 */
interface RouteParams {
  params: {
    id: string;
  };
}

/**
 * GET /api/posts/[id]
 * 特定の投稿を取得します
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    // 投稿を検索
    const post = postStore.getById(id);
    
    if (!post) {
      return createErrorResponse(
        'Not Found',
        `ID: ${id} の投稿が見つかりません`,
        404
      );
    }

    return createSuccessResponse(
      post,
      '投稿を取得しました'
    );
  } catch (error) {
    console.error(`GET /api/posts/${(await params).id} error:`, error);
    return createErrorResponse(
      'Internal Server Error',
      '投稿の取得中にエラーが発生しました',
      500
    );
  }
}

/**
 * PUT /api/posts/[id]
 * 投稿を更新します
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    // 投稿の存在確認
    const existingPost = postStore.getById(id);
    if (!existingPost) {
      return createErrorResponse(
        'Not Found',
        `ID: ${id} の投稿が見つかりません`,
        404
      );
    }

    // リクエストボディをパース
    const body = await parseRequestBody<UpdatePostRequest>(request);
    
    if (!body) {
      return createErrorResponse(
        'Invalid JSON',
        'リクエストボディが正しいJSON形式ではありません',
        400
      );
    }

    // 更新するフィールドがない場合
    if (!body.title && !body.content && body.published === undefined) {
      return createErrorResponse(
        'Bad Request',
        '更新するフィールドが指定されていません',
        400
      );
    }

    // バリデーション
    const validationRules = [];
    if (body.title !== undefined) {
      validationRules.push({ field: 'title' as keyof UpdatePostRequest, type: 'string' as const, minLength: 1, maxLength: 200 });
    }
    if (body.content !== undefined) {
      validationRules.push({ field: 'content' as keyof UpdatePostRequest, type: 'string' as const, minLength: 1 });
    }
    if (body.published !== undefined) {
      validationRules.push({ field: 'published' as keyof UpdatePostRequest, type: 'boolean' as const });
    }

    const validation = validateData(body, validationRules);
    if (!validation.isValid) {
      return createErrorResponse(
        'Validation Error',
        validation.errors.join(', '),
        400
      );
    }

    // 投稿を更新
    const updatedPost = postStore.update(id, body);
    
    if (!updatedPost) {
      return createErrorResponse(
        'Internal Server Error',
        '投稿の更新に失敗しました',
        500
      );
    }

    return createSuccessResponse(
      updatedPost,
      '投稿が正常に更新されました'
    );
  } catch (error) {
    console.error(`PUT /api/posts/${(await params).id} error:`, error);
    return createErrorResponse(
      'Internal Server Error',
      '投稿の更新中にエラーが発生しました',
      500
    );
  }
}

/**
 * DELETE /api/posts/[id]
 * 投稿を削除します
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    // 投稿の存在確認
    const existingPost = postStore.getById(id);
    if (!existingPost) {
      return createErrorResponse(
        'Not Found',
        `ID: ${id} の投稿が見つかりません`,
        404
      );
    }

    // 投稿を削除
    const deleted = postStore.delete(id);
    
    if (!deleted) {
      return createErrorResponse(
        'Internal Server Error',
        '投稿の削除に失敗しました',
        500
      );
    }

    return createSuccessResponse(
      { id, deleted: true },
      '投稿が正常に削除されました'
    );
  } catch (error) {
    console.error(`DELETE /api/posts/${(await params).id} error:`, error);
    return createErrorResponse(
      'Internal Server Error',
      '投稿の削除中にエラーが発生しました',
      500
    );
  }
}

/**
 * その他のHTTPメソッドは許可されていません
 */
export async function POST() {
  return createMethodNotAllowedResponse(['GET', 'PUT', 'DELETE']);
}

export async function PATCH() {
  return createMethodNotAllowedResponse(['GET', 'PUT', 'DELETE']);
}