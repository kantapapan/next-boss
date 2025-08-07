# 実践活用ガイド

このガイドでは、完全なブログアプリケーション例で学んだ概念を実際のプロジェクトでどのように活用するかを詳しく説明します。

## 🎯 実プロジェクトへの適用

### 1. アーキテクチャパターンの活用

#### ディレクトリ構造の標準化
```
your-project/
├── app/                    # Next.js App Router
│   ├── (auth)/            # ルートグループ（認証関連）
│   ├── (dashboard)/       # ルートグループ（ダッシュボード）
│   ├── api/               # API Routes
│   ├── globals.css        # グローバルスタイル
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # ホームページ
├── components/            # コンポーネント
│   ├── ui/               # 汎用UIコンポーネント
│   ├── forms/            # フォームコンポーネント
│   ├── layout/           # レイアウトコンポーネント
│   └── features/         # 機能別コンポーネント
├── lib/                  # ユーティリティ
│   ├── auth.ts           # 認証関連
│   ├── db.ts             # データベース接続
│   ├── utils.ts          # ヘルパー関数
│   └── validations.ts    # バリデーション
├── types/                # 型定義
├── hooks/                # カスタムフック
└── constants/            # 定数
```

#### コンポーネント設計原則
```tsx
// ❌ 悪い例：責任が多すぎる
const BlogPost = ({ postId }: { postId: string }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // データフェッチ、状態管理、UI表示が混在
  useEffect(() => {
    fetchPost(postId).then(setPost);
    fetchComments(postId).then(setComments);
    setIsLoading(false);
  }, [postId]);
  
  return (
    <div>
      {/* 複雑なJSX */}
    </div>
  );
};

// ✅ 良い例：責任を分離
const BlogPostPage = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <BlogPostHeader slug={params.slug} />
      <BlogPostContent slug={params.slug} />
      <BlogPostComments slug={params.slug} />
    </div>
  );
};
```

### 2. データ管理の実装

#### データベース統合（Prisma例）
```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// lib/posts.ts
export async function getPosts(options: {
  page?: number;
  limit?: number;
  category?: string;
}) {
  const { page = 1, limit = 10, category } = options;
  
  return await prisma.post.findMany({
    where: category ? { category: { slug: category } } : undefined,
    include: {
      author: true,
      category: true,
      _count: { select: { comments: true } },
    },
    orderBy: { publishedAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  });
}
```##
## 状態管理（Zustand例）
```typescript
// lib/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  setUser: (user: User | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      theme: 'light',
      setUser: (user) => set({ user }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'app-storage',
    }
  )
);
```

### 3. 認証システムの実装

#### NextAuth.js統合
```typescript
// lib/auth.ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './db';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});

// middleware.ts
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAuthPage = nextUrl.pathname.startsWith('/auth');
  const isProtectedRoute = nextUrl.pathname.startsWith('/dashboard');

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/signin', nextUrl));
  }

  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

### 4. フォーム処理とバリデーション

#### React Hook Form + Zod
```typescript
// lib/validations.ts
import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(100, 'タイトルは100文字以内で入力してください'),
  content: z.string().min(10, '本文は10文字以上で入力してください'),
  excerpt: z.string().max(200, '要約は200文字以内で入力してください'),
  categoryId: z.string().min(1, 'カテゴリを選択してください'),
  tags: z.array(z.string()).max(5, 'タグは5個まで設定できます'),
  published: z.boolean().default(false),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;

// components/forms/CreatePostForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function CreatePostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
  });

  const onSubmit = async (data: CreatePostInput) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('投稿の作成に失敗しました');
      
      // 成功処理
    } catch (error) {
      // エラー処理
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">タイトル</label>
        <input
          id="title"
          {...register('title')}
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '投稿中...' : '投稿する'}
      </button>
    </form>
  );
}
```

### 5. API設計とエラーハンドリング

#### 統一されたAPIレスポンス
```typescript
// lib/api-utils.ts
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function createApiResponse<T>(
  data?: T,
  message?: string,
  pagination?: PaginationInfo
) {
  return {
    success: true,
    data,
    message,
    pagination,
  };
}

export function createApiError(
  message: string,
  statusCode: number = 500,
  code?: string
) {
  return {
    success: false,
    error: message,
    code,
  };
}

// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createApiResponse, createApiError, ApiError } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const posts = await getPosts({ page, limit });
    const total = await getPostsCount();

    return NextResponse.json(
      createApiResponse(posts, undefined, {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      })
    );
  } catch (error) {
    console.error('Posts API Error:', error);
    
    if (error instanceof ApiError) {
      return NextResponse.json(
        createApiError(error.message, error.statusCode, error.code),
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      createApiError('Internal Server Error'),
      { status: 500 }
    );
  }
}
```

### 6. パフォーマンス最適化

#### 画像最適化
```tsx
// components/OptimizedImage.tsx
import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}
```

#### コード分割とレイジーローディング
```tsx
// 動的インポートによるコード分割
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CommentSection = dynamic(
  () => import('@/components/CommentSection'),
  {
    loading: () => <CommentSkeleton />,
    ssr: false, // クライアントサイドでのみ読み込み
  }
);

const RichTextEditor = dynamic(
  () => import('@/components/RichTextEditor'),
  { ssr: false }
);

export function BlogPostPage({ post }: { post: Post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
      
      <Suspense fallback={<CommentSkeleton />}>
        <CommentSection postId={post.id} />
      </Suspense>
    </article>
  );
}
```

### 7. SEO最適化

#### メタデータとOGタグ
```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | My Blog`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: post.coverImage ? [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

// 構造化データの追加
export default async function BlogPost({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: post.coverImage,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        {/* 記事コンテンツ */}
      </article>
    </>
  );
}
```

### 8. テスト戦略

#### 単体テスト（Jest + Testing Library）
```typescript
// __tests__/components/PostCard.test.tsx
import { render, screen } from '@testing-library/react';
import { PostCard } from '@/components/PostCard';

const mockPost = {
  id: '1',
  title: 'Test Post',
  excerpt: 'This is a test post',
  slug: 'test-post',
  author: { name: 'Test Author' },
  publishedAt: '2024-01-01T00:00:00Z',
};

describe('PostCard', () => {
  it('renders post information correctly', () => {
    render(<PostCard post={mockPost} />);
    
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('This is a test post')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
  });

  it('links to the correct post URL', () => {
    render(<PostCard post={mockPost} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/blog/test-post');
  });
});
```

#### E2Eテスト（Playwright）
```typescript
// e2e/blog.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Blog functionality', () => {
  test('should display blog posts on homepage', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('h1')).toContainText('Next.js Blog');
    await expect(page.locator('[data-testid="post-card"]')).toHaveCount(6);
  });

  test('should navigate to post detail page', async ({ page }) => {
    await page.goto('/');
    
    const firstPost = page.locator('[data-testid="post-card"]').first();
    await firstPost.click();
    
    await expect(page).toHaveURL(/\/blog\/.+/);
    await expect(page.locator('article h1')).toBeVisible();
  });

  test('should submit comment successfully', async ({ page }) => {
    await page.goto('/blog/test-post');
    
    await page.fill('[data-testid="comment-name"]', 'Test User');
    await page.fill('[data-testid="comment-email"]', 'test@example.com');
    await page.fill('[data-testid="comment-content"]', 'Great post!');
    
    await page.click('[data-testid="submit-comment"]');
    
    await expect(page.locator('[data-testid="comment-success"]')).toBeVisible();
  });
});
```

## 🚀 デプロイメント戦略

### Vercel デプロイ
```bash
# Vercel CLI のインストール
npm i -g vercel

# プロジェクトのデプロイ
vercel

# 環境変数の設定
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add GOOGLE_CLIENT_ID
vercel env add GOOGLE_CLIENT_SECRET
```

### Docker デプロイ
```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

## 📊 監視とログ

### エラー監視（Sentry）
```typescript
// lib/sentry.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});

// app/global-error.tsx
'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
```

### パフォーマンス監視
```typescript
// lib/analytics.ts
export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
}

export function trackEvent(action: string, category: string, label?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
}
```

## 🔧 開発ツールとワークフロー

### ESLint設定
```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error",
    "no-console": "warn"
  }
}
```

### GitHub Actions CI/CD
```yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

このガイドを参考に、学習したNext.jsの概念を実際のプロジェクトで効果的に活用してください。各セクションは独立しているため、プロジェクトの要件に応じて必要な部分を選択して実装できます。