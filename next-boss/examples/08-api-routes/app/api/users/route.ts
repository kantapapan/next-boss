/**
 * Users API Route
 * 
 * このファイルは /api/users エンドポイントを定義します。
 * Next.js 13+ のApp Routerでは、route.tsファイルでAPI Routesを作成します。
 * 
 * 対応するHTTPメソッド:
 * - GET: 全ユーザーの取得
 * - POST: 新しいユーザーの作成
 */

import { NextRequest } from 'next/server';
import { userStore } from '@/lib/data';
import { 
  createSuccessResponse, 
  createErrorResponse, 
  createMethodNotAllowedResponse,
  parseRequestBody,
  validateData
} from '@/lib/api-utils';
import { CreateUserRequest } from '@/types';

/**
 * GET /api/users
 * 全ユーザーを取得します
 */
export async function GET() {
  try {
    // データストアから全ユーザーを取得
    const users = userStore.getAll();
    
    // 成功レスポンスを返す
    return createSuccessResponse(
      users,
      `${users.length}人のユーザーを取得しました`
    );
  } catch (error) {
    console.error('GET /api/users error:', error);
    return createErrorResponse(
      'Internal Server Error',
      'ユーザーの取得中にエラーが発生しました',
      500
    );
  }
}

/**
 * POST /api/users
 * 新しいユーザーを作成します
 */
export async function POST(request: NextRequest) {
  try {
    // リクエストボディをパース
    const body = await parseRequestBody<CreateUserRequest>(request);
    
    if (!body) {
      return createErrorResponse(
        'Invalid JSON',
        'リクエストボディが正しいJSON形式ではありません',
        400
      );
    }

    // バリデーション
    const validation = validateData(body, [
      { field: 'name', required: true, type: 'string', minLength: 1, maxLength: 100 },
      { field: 'email', required: true, type: 'email', maxLength: 255 }
    ]);

    if (!validation.isValid) {
      return createErrorResponse(
        'Validation Error',
        validation.errors.join(', '),
        400
      );
    }

    // 既存のメールアドレスチェック
    const existingUser = userStore.getAll().find(user => user.email === body.email);
    if (existingUser) {
      return createErrorResponse(
        'Conflict',
        'このメールアドレスは既に使用されています',
        409
      );
    }

    // 新しいユーザーを作成
    const newUser = userStore.create({
      name: body.name,
      email: body.email,
    });

    // 作成成功レスポンスを返す
    return createSuccessResponse(
      newUser,
      'ユーザーが正常に作成されました',
      201
    );
  } catch (error) {
    console.error('POST /api/users error:', error);
    return createErrorResponse(
      'Internal Server Error',
      'ユーザーの作成中にエラーが発生しました',
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