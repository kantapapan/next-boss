/**
 * Health Check API Route
 * 
 * このファイルは /api/health エンドポイントを定義します。
 * APIサーバーの稼働状況を確認するためのシンプルなヘルスチェック機能です。
 * 
 * 対応するHTTPメソッド:
 * - GET: サーバーの稼働状況を取得
 */

import { createSuccessResponse, createMethodNotAllowedResponse } from '@/lib/api-utils';

/**
 * GET /api/health
 * サーバーの稼働状況を返します
 */
export async function GET() {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  };

  return createSuccessResponse(
    healthData,
    'サーバーは正常に稼働しています'
  );
}

/**
 * その他のHTTPメソッドは許可されていません
 */
export async function POST() {
  return createMethodNotAllowedResponse(['GET']);
}

export async function PUT() {
  return createMethodNotAllowedResponse(['GET']);
}

export async function DELETE() {
  return createMethodNotAllowedResponse(['GET']);
}

export async function PATCH() {
  return createMethodNotAllowedResponse(['GET']);
}