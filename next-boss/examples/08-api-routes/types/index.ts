/**
 * API Routes学習用の型定義
 * 
 * このファイルでは、API Routesで使用するデータ型を定義します。
 * TypeScriptを使用することで、型安全なAPIを構築できます。
 */

// ユーザー情報の型定義
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// ユーザー作成時のリクエストボディ型
export interface CreateUserRequest {
  name: string;
  email: string;
}

// ユーザー更新時のリクエストボディ型
export interface UpdateUserRequest {
  name?: string;
  email?: string;
}

// ブログ投稿の型定義
export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// ブログ投稿作成時のリクエストボディ型
export interface CreatePostRequest {
  title: string;
  content: string;
  authorId: string;
  published?: boolean;
}

// ブログ投稿更新時のリクエストボディ型
export interface UpdatePostRequest {
  title?: string;
  content?: string;
  published?: boolean;
}

// API レスポンスの共通型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// エラーレスポンスの型
export interface ApiError {
  success: false;
  error: string;
  message: string;
  statusCode: number;
}