/**
 * API ユーティリティ関数
 * 
 * API Routesで共通して使用するヘルパー関数を定義します。
 * レスポンスの統一化やエラーハンドリングを簡単にします。
 */

import { NextResponse } from 'next/server';
import { ApiResponse, ApiError } from '@/types';

/**
 * 成功レスポンスを作成
 * @param data レスポンスデータ
 * @param message オプションのメッセージ
 * @param status HTTPステータスコード（デフォルト: 200）
 */
export function createSuccessResponse<T>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status }
  );
}

/**
 * エラーレスポンスを作成
 * @param error エラーメッセージ
 * @param message 詳細メッセージ
 * @param status HTTPステータスコード（デフォルト: 400）
 */
export function createErrorResponse(
  error: string,
  message: string,
  status: number = 400
): NextResponse<ApiError> {
  return NextResponse.json(
    {
      success: false,
      error,
      message,
      statusCode: status,
    },
    { status }
  );
}

/**
 * HTTPメソッドが許可されていない場合のレスポンス
 * @param allowedMethods 許可されているHTTPメソッドの配列
 */
export function createMethodNotAllowedResponse(
  allowedMethods: string[]
): NextResponse<ApiError> {
  return NextResponse.json(
    {
      success: false,
      error: 'Method Not Allowed',
      message: `許可されているメソッド: ${allowedMethods.join(', ')}`,
      statusCode: 405,
    },
    { 
      status: 405,
      headers: {
        'Allow': allowedMethods.join(', ')
      }
    }
  );
}

/**
 * リクエストボディのJSONパースを安全に行う
 * @param request Request オブジェクト
 * @returns パースされたデータまたはnull
 */
export async function parseRequestBody<T = any>(
  request: Request
): Promise<T | null> {
  try {
    const body = await request.json();
    return body as T;
  } catch (error) {
    console.error('JSON parse error:', error);
    return null;
  }
}

/**
 * バリデーション関数の型
 */
export type ValidationRule<T> = {
  field: keyof T;
  required?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'email';
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
};

/**
 * 簡単なバリデーション関数
 * @param data バリデーション対象のデータ
 * @param rules バリデーションルール
 * @returns バリデーション結果
 */
export function validateData<T extends Record<string, any>>(
  data: T,
  rules: ValidationRule<T>[]
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const rule of rules) {
    const value = data[rule.field];
    const fieldName = String(rule.field);

    // 必須チェック
    if (rule.required && (value === undefined || value === null || value === '')) {
      errors.push(`${fieldName}は必須です`);
      continue;
    }

    // 値が存在しない場合はスキップ
    if (value === undefined || value === null) continue;

    // 型チェック
    if (rule.type) {
      switch (rule.type) {
        case 'string':
          if (typeof value !== 'string') {
            errors.push(`${fieldName}は文字列である必要があります`);
          }
          break;
        case 'number':
          if (typeof value !== 'number') {
            errors.push(`${fieldName}は数値である必要があります`);
          }
          break;
        case 'boolean':
          if (typeof value !== 'boolean') {
            errors.push(`${fieldName}は真偽値である必要があります`);
          }
          break;
        case 'email':
          if (typeof value === 'string') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
              errors.push(`${fieldName}は有効なメールアドレスである必要があります`);
            }
          }
          break;
      }
    }

    // 文字列の長さチェック
    if (typeof value === 'string') {
      if (rule.minLength && value.length < rule.minLength) {
        errors.push(`${fieldName}は${rule.minLength}文字以上である必要があります`);
      }
      if (rule.maxLength && value.length > rule.maxLength) {
        errors.push(`${fieldName}は${rule.maxLength}文字以下である必要があります`);
      }
    }

    // パターンマッチング
    if (rule.pattern && typeof value === 'string') {
      if (!rule.pattern.test(value)) {
        errors.push(`${fieldName}の形式が正しくありません`);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}