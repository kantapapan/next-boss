/**
 * 共通型定義ファイル
 * 
 * このファイルでは、アプリケーション全体で使用される
 * 共通の型定義を管理します。
 */

// ユーザー情報の型定義
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'guest'
  createdAt: string
}

// ブログ記事の型定義
export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: User
  publishedAt: string
  tags: string[]
  featured: boolean
  imageUrl?: string
}

// 商品情報の型定義
export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  inStock: boolean
  rating: number
  reviewCount: number
}

// ナビゲーションアイテムの型定義
export interface NavigationItem {
  id: string
  label: string
  href: string
  icon?: string
  children?: NavigationItem[]
}

// 通知の型定義
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: string
  read: boolean
}

// フォームフィールドの型定義
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox'
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
}

// APIレスポンスの型定義
export interface ApiResponse<T> {
  data: T
  message?: string
  error?: string
  status: 'success' | 'error'
}

// ページネーションの型定義
export interface Pagination {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNext: boolean
  hasPrevious: boolean
}

// コンポーネントの共通Props
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
  id?: string
}

// ボタンのバリアント型
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

// カラーテーマ型
export type ColorTheme = 'light' | 'dark' | 'auto'

// レスポンシブブレークポイント型
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'