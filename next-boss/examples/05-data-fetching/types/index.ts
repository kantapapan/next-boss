/**
 * データフェッチング例で使用する型定義
 * 
 * 外部APIから取得するデータの型を定義します。
 * TypeScriptの型安全性を活用して、データの構造を明確にします。
 */

// JSONPlaceholder APIのユーザー型
export interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

// JSONPlaceholder APIの投稿型
export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

// JSONPlaceholder APIのコメント型
export interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

// JSONPlaceholder APIの写真型
export interface Photo {
  id: number
  albumId: number
  title: string
  url: string
  thumbnailUrl: string
}

// JSONPlaceholder APIのアルバム型
export interface Album {
  id: number
  userId: number
  title: string
}

// JSONPlaceholder APIのTodo型
export interface Todo {
  id: number
  userId: number
  title: string
  completed: boolean
}

// API応答の共通型
export interface ApiResponse<T> {
  data: T
  status: 'success' | 'error'
  message?: string
}

// ページネーション用の型
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// ローディング状態の型
export interface LoadingState {
  isLoading: boolean
  error: string | null
}

// フェッチ設定の型
export interface FetchConfig {
  cache?: RequestCache
  revalidate?: number
  tags?: string[]
}

// リアルタイムデータの型（模擬）
export interface RealTimeData {
  timestamp: string
  value: number
  status: 'online' | 'offline'
  metrics: {
    cpu: number
    memory: number
    requests: number
  }
}