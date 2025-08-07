/**
 * 完全なブログアプリケーションの型定義
 * 
 * これまでの学習内容を統合したブログアプリケーションで使用する
 * 全ての型を定義します。
 */

// ユーザー関連の型
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  avatar?: string;
  bio?: string;
}

// ブログ投稿関連の型
export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  authorId: string;
  author?: User;
  categoryId: string;
  category?: Category;
  tags: string[];
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  authorId: string;
  categoryId: string;
  tags: string[];
  published?: boolean;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  excerpt?: string;
  coverImage?: string;
  categoryId?: string;
  tags?: string[];
  published?: boolean;
}

// カテゴリ関連の型
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  color: string;
}

// コメント関連の型
export interface Comment {
  id: string;
  content: string;
  authorName: string;
  authorEmail: string;
  postId: string;
  parentId?: string;
  replies?: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentRequest {
  content: string;
  authorName: string;
  authorEmail: string;
  postId: string;
  parentId?: string;
}

// API レスポンス関連の型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// フォーム関連の型
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}

// 検索関連の型
export interface SearchParams {
  query?: string;
  category?: string;
  tag?: string;
  author?: string;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'publishedAt' | 'viewCount' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResult {
  posts: Post[];
  totalCount: number;
  pagination: PaginationInfo;
  filters: {
    categories: Category[];
    tags: string[];
    authors: User[];
  };
}

// ナビゲーション関連の型
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

// テーマ関連の型
export type Theme = 'light' | 'dark';

// エラー関連の型
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// 統計情報の型
export interface BlogStats {
  totalPosts: number;
  totalUsers: number;
  totalCategories: number;
  totalViews: number;
  popularPosts: Post[];
  recentPosts: Post[];
}