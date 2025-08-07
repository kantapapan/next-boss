/**
 * Individual User API Route
 * 
 * このファイルは /api/users/[id] エンドポイントを定義します。
 * [id]は動的ルートパラメータで、特定のユーザーに対する操作を行います。
 * 
 * 対応するHTTPメソッド:
 * - GET: 特定のユーザーの取得
 * - PUT: ユーザー情報の更新
 * - DELETE: ユーザーの削除
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
import { UpdateUserRequest } from '@/types';

/**
 * ルートパラメータの型定義
 */
interface RouteParams {
  params: {
    id: string;
  };
}

/**
 * GET /api/users/[id]
 * 特定のユーザーを取得します
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    // ユーザーを検索
    const user = userStore.getById(id);
    
    if (!user) {
      return createErrorResponse(
        'Not Found',
        `ID: ${id} のユーザーが見つかりません`,
        404
      );
    }

    return createSuccessResponse(
      user,
      'ユーザー情報を取得しました'
    );
  } catch (error) {
    console.error(`GET /api/users/${(await params).id} error:`, error);
    return createErrorResponse(
      'Internal Server Error',
      'ユーザーの取得中にエラーが発生しました',
      500
    );
  }
}

/**
 * PUT /api/users/[id]
 * ユーザー情報を更新します
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    // ユーザーの存在確認
    const existingUser = userStore.getById(id);
    if (!existingUser) {
      return createErrorResponse(
        'Not Found',
        `ID: ${id} のユーザーが見つかりません`,
        404
      );
    }

    // リクエストボディをパース
    const body = await parseRequestBody<UpdateUserRequest>(request);
    
    if (!body) {
      return createErrorResponse(
        'Invalid JSON',
        'リクエストボディが正しいJSON形式ではありません',
        400
      );
    }

    // 更新するフィールドがない場合
    if (!body.name && !body.email) {
      return createErrorResponse(
        'Bad Request',
        '更新するフィールドが指定されていません',
        400
      );
    }

    // バリデーション
    const validationRules = [];
    if (body.name !== undefined) {
      validationRules.push({ field: 'name' as keyof UpdateUserRequest, type: 'string' as const, minLength: 1, maxLength: 100 });
    }
    if (body.email !== undefined) {
      validationRules.push({ field: 'email' as keyof UpdateUserRequest, type: 'email' as const, maxLength: 255 });
    }

    const validation = validateData(body, validationRules);
    if (!validation.isValid) {
      return createErrorResponse(
        'Validation Error',
        validation.errors.join(', '),
        400
      );
    }

    // メールアドレスの重複チェック（変更する場合のみ）
    if (body.email && body.email !== existingUser.email) {
      const duplicateUser = userStore.getAll().find(user => user.email === body.email);
      if (duplicateUser) {
        return createErrorResponse(
          'Conflict',
          'このメールアドレスは既に使用されています',
          409
        );
      }
    }

    // ユーザー情報を更新
    const updatedUser = userStore.update(id, body);
    
    if (!updatedUser) {
      return createErrorResponse(
        'Internal Server Error',
        'ユーザーの更新に失敗しました',
        500
      );
    }

    return createSuccessResponse(
      updatedUser,
      'ユーザー情報が正常に更新されました'
    );
  } catch (error) {
    console.error(`PUT /api/users/${(await params).id} error:`, error);
    return createErrorResponse(
      'Internal Server Error',
      'ユーザーの更新中にエラーが発生しました',
      500
    );
  }
}

/**
 * DELETE /api/users/[id]
 * ユーザーを削除します
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    // ユーザーの存在確認
    const existingUser = userStore.getById(id);
    if (!existingUser) {
      return createErrorResponse(
        'Not Found',
        `ID: ${id} のユーザーが見つかりません`,
        404
      );
    }

    // ユーザーを削除
    const deleted = userStore.delete(id);
    
    if (!deleted) {
      return createErrorResponse(
        'Internal Server Error',
        'ユーザーの削除に失敗しました',
        500
      );
    }

    return createSuccessResponse(
      { id, deleted: true },
      'ユーザーが正常に削除されました'
    );
  } catch (error) {
    console.error(`DELETE /api/users/${(await params).id} error:`, error);
    return createErrorResponse(
      'Internal Server Error',
      'ユーザーの削除中にエラーが発生しました',
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