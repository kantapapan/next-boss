# 02. Next.jsルーティングシステム

Next.jsのApp Routerは、ファイルベースのルーティングシステムを採用しており、直感的で強力なルーティング機能を提供します。このドキュメントでは、App Routerの基本概念から高度な機能まで、実践的な例とともに詳しく解説します。

## 🎯 この章の学習目標

- App Routerの基本的な仕組みを理解する
- 静的ルートと動的ルートの違いを把握する
- ファイルベースルーティングの規則を学ぶ
- レイアウトの階層化とネストを理解する
- メタデータの動的生成方法を習得する
- エラーハンドリングとローディング状態の管理を学ぶ

## 📖 App Routerとは

App Routerは、Next.js 13で導入された新しいルーティングシステムです。従来のPages Routerと比べて、より柔軟で強力な機能を提供します。

### Pages Router vs App Router

#### Pages Router（従来）
```
pages/
├── index.js          # / ルート
├── about.js          # /about ルート
├── blog/
│   ├── index.js      # /blog ルート
│   └── [slug].js     # /blog/[slug] 動的ルート
└── _app.js           # アプリケーション全体のレイアウト
```

#### App Router（推奨）
```
app/
├── layout.tsx        # ルートレイアウト
├── page.tsx          # / ルート
├── about/
│   └── page.tsx      # /about ルート
└── blog/
    ├── layout.tsx    # /blog/* 共通レイアウト
    ├── page.tsx      # /blog ルート
    └── [slug]/
        └── page.tsx  # /blog/[slug] 動的ルート
```

### App Routerの主な利点

1. **レイアウトの階層化**: より柔軟なレイアウト管理
2. **Server Components**: サーバーサイドでのコンポーネントレンダリング
3. **ストリーミング**: 段階的なページロード
4. **並列ルート**: 複数のページを同時に表示
5. **インターセプティングルート**: モーダルなどの高度なUI

## 🏗️ ファイルベースルーティングの基本

### 基本的なファイル構造

App Routerでは、`app`ディレクトリ内のフォルダ構造がそのままURLになります。

```
app/
├── page.tsx                    # /
├── about/
│   └── page.tsx               # /about
├── products/
│   ├── page.tsx               # /products
│   ├── [id]/
│   │   └── page.tsx           # /products/[id]
│   └── category/
│       └── [slug]/
│           └── page.tsx       # /products/category/[slug]
└── dashboard/
    ├── layout.tsx             # /dashboard/* 共通レイアウト
    ├── page.tsx               # /dashboard
    ├── analytics/
    │   └── page.tsx           # /dashboard/analytics
    └── settings/
        └── page.tsx           # /dashboard/settings
```

### 特別なファイル名

App Routerでは、特定の機能を持つファイル名が予約されています：

| ファイル名 | 用途 | 説明 |
|-----------|------|------|
| `layout.tsx` | レイアウト | 共通レイアウトを定義 |
| `page.tsx` | ページ | そのルートのメインコンテンツ |
| `loading.tsx` | ローディング | ローディング状態のUI |
| `error.tsx` | エラー | エラー状態のUI |
| `not-found.tsx` | 404 | 404エラーページ |
| `route.tsx` | API | API Routeの定義 |

## 📄 静的ルート

静的ルートは、固定のURLパスを持つページです。

### 基本的な静的ルート

```typescript
// app/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: '私たちについて',
}

export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>私たちの会社について説明します。</p>
    </div>
  )
}
```

### ネストした静的ルート

```typescript
// app/company/team/page.tsx
export default function TeamPage() {
  return (
    <div>
      <h1>Our Team</h1>
      <p>チームメンバーを紹介します。</p>
    </div>
  )
}
```

この場合、`/company/team` URLでアクセス可能になります。

## 🔄 動的ルート

動的ルートは、URLパラメータを含む動的なページです。

### 基本的な動的ルート

角括弧 `[]` を使用してパラメータを定義します：

```typescript
// app/blog/[slug]/page.tsx
export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  return (
    <div>
      <h1>Blog Post: {slug}</h1>
      <p>記事の内容がここに表示されます。</p>
    </div>
  )
}
```

### 複数パラメータの動的ルート

```typescript
// app/shop/[category]/[product]/page.tsx
export default async function ProductPage({
  params
}: {
  params: Promise<{ category: string; product: string }>
}) {
  const { category, product } = await params
  
  return (
    <div>
      <h1>Category: {category}</h1>
      <h2>Product: {product}</h2>
    </div>
  )
}
```

URL例: `/shop/electronics/smartphone`

### キャッチオールルート

`[...slug]` を使用すると、複数のパスセグメントをキャッチできます：

```typescript
// app/docs/[...slug]/page.tsx
export default async function DocsPage({
  params
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  
  return (
    <div>
      <h1>Documentation</h1>
      <p>Path: {slug.join('/')}</p>
    </div>
  )
}
```

URL例: 
- `/docs/getting-started` → `slug = ['getting-started']`
- `/docs/api/authentication` → `slug = ['api', 'authentication']`

### オプショナルキャッチオールルート

`[[...slug]]` を使用すると、パラメータがない場合も含みます：

```typescript
// app/shop/[[...filters]]/page.tsx
export default async function ShopPage({
  params
}: {
  params: Promise<{ filters?: string[] }>
}) {
  const { filters } = await params
  
  return (
    <div>
      <h1>Shop</h1>
      {filters ? (
        <p>Filters: {filters.join(', ')}</p>
      ) : (
        <p>All products</p>
      )}
    </div>
  )
}
```

URL例:
- `/shop` → `filters = undefined`
- `/shop/electronics` → `filters = ['electronics']`
- `/shop/electronics/smartphones` → `filters = ['electronics', 'smartphones']`

## 🎨 レイアウトシステム

### ルートレイアウト

すべてのページで共通のレイアウトを定義します：

```typescript
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | My App',
    default: 'My App',
  },
  description: 'My awesome Next.js application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <header>
          <nav>
            {/* グローバルナビゲーション */}
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          {/* グローバルフッター */}
        </footer>
      </body>
    </html>
  )
}
```

### ネストしたレイアウト

特定のセクションに固有のレイアウトを定義できます：

```typescript
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard">
      <aside>
        {/* ダッシュボード用サイドバー */}
        <nav>
          <a href="/dashboard">Overview</a>
          <a href="/dashboard/analytics">Analytics</a>
          <a href="/dashboard/settings">Settings</a>
        </nav>
      </aside>
      <div className="content">
        {children}
      </div>
    </div>
  )
}
```

### レイアウトの継承

レイアウトは階層的に継承されます：

```
app/
├── layout.tsx          # ルートレイアウト（全ページ）
├── page.tsx           # ホームページ
└── dashboard/
    ├── layout.tsx     # ダッシュボードレイアウト
    ├── page.tsx       # /dashboard
    └── analytics/
        └── page.tsx   # /dashboard/analytics
```

`/dashboard/analytics` ページでは：
1. ルートレイアウト（`app/layout.tsx`）
2. ダッシュボードレイアウト（`app/dashboard/layout.tsx`）
3. ページコンテンツ（`app/dashboard/analytics/page.tsx`）

の順で適用されます。

## 🏷️ メタデータ管理

### 静的メタデータ

```typescript
// app/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: '私たちについて',
  keywords: ['会社概要', 'チーム', 'ミッション'],
  openGraph: {
    title: 'About Us',
    description: '私たちについて',
    images: ['/og-about.jpg'],
  },
}

export default function AboutPage() {
  return <div>About content</div>
}
```

### 動的メタデータ

```typescript
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
```

### メタデータの継承

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    template: '%s | My Blog',
    default: 'My Blog',
  },
  description: 'デフォルトの説明',
}

// app/blog/page.tsx
export const metadata: Metadata = {
  title: 'Blog Posts', // 結果: "Blog Posts | My Blog"
}
```

## ⚡ ローディングとエラーハンドリング

### ローディング状態

```typescript
// app/blog/loading.tsx
export default function Loading() {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>記事を読み込み中...</p>
    </div>
  )
}
```

### エラーハンドリング

```typescript
// app/blog/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="error">
      <h2>エラーが発生しました</h2>
      <p>{error.message}</p>
      <button onClick={reset}>再試行</button>
    </div>
  )
}
```

### 404ページ

```typescript
// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="not-found">
      <h2>ページが見つかりません</h2>
      <p>お探しのページは存在しません。</p>
      <Link href="/">ホームに戻る</Link>
    </div>
  )
}
```

## 🔗 ナビゲーション

### Linkコンポーネント

```typescript
import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/blog">Blog</Link>
      
      {/* 動的ルートへのリンク */}
      <Link href="/blog/my-first-post">First Post</Link>
      
      {/* プログラマティックなリンク */}
      <Link href={`/user/${userId}`}>Profile</Link>
    </nav>
  )
}
```

### useRouterフック

```typescript
'use client'

import { useRouter } from 'next/navigation'

export default function MyComponent() {
  const router = useRouter()
  
  const handleClick = () => {
    router.push('/dashboard')
    // router.replace('/dashboard') // 履歴を置き換え
    // router.back() // 戻る
    // router.forward() // 進む
  }
  
  return (
    <button onClick={handleClick}>
      Go to Dashboard
    </button>
  )
}
```

### usePathnameとuseSearchParams

```typescript
'use client'

import { usePathname, useSearchParams } from 'next/navigation'

export default function CurrentPath() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  return (
    <div>
      <p>Current path: {pathname}</p>
      <p>Search params: {searchParams.toString()}</p>
    </div>
  )
}
```

## 🚀 高度なルーティング機能

### 並列ルート

同じレイアウト内で複数のページを同時に表示：

```
app/
├── layout.tsx
├── page.tsx
├── @analytics/
│   └── page.tsx
└── @team/
    └── page.tsx
```

```typescript
// app/layout.tsx
export default function Layout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <div>
      {children}
      <div className="parallel-routes">
        {analytics}
        {team}
      </div>
    </div>
  )
}
```

### インターセプティングルート

モーダルなどで他のルートをインターセプト：

```
app/
├── page.tsx
├── photo/
│   └── [id]/
│       └── page.tsx
└── @modal/
    └── (.)photo/
        └── [id]/
            └── page.tsx
```

### ルートグループ

URLに影響しないフォルダでルートをグループ化：

```
app/
├── (marketing)/
│   ├── about/
│   │   └── page.tsx    # /about
│   └── contact/
│       └── page.tsx    # /contact
└── (shop)/
    ├── products/
    │   └── page.tsx    # /products
    └── cart/
        └── page.tsx    # /cart
```

## 🛠️ 実践的なパターン

### 認証が必要なルート

```typescript
// app/dashboard/layout.tsx
import { redirect } from 'next/navigation'
import { getUser } from '@/lib/auth'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  return (
    <div className="dashboard">
      <header>Welcome, {user.name}</header>
      {children}
    </div>
  )
}
```

### 条件付きレイアウト

```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  )
}

function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith('/auth')
  
  if (isAuthPage) {
    return <div className="auth-layout">{children}</div>
  }
  
  return (
    <div className="main-layout">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
```

## 📊 パフォーマンス最適化

### 静的生成（SSG）

```typescript
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
```

### 増分静的再生成（ISR）

```typescript
// app/blog/[slug]/page.tsx
export const revalidate = 3600 // 1時間ごとに再生成

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
```

## 🐛 よくある問題と解決方法

### 1. 動的ルートが認識されない

**問題**: `[slug]` ディレクトリが認識されない

**解決方法**:
- ディレクトリ名が正しく角括弧で囲まれているか確認
- `page.tsx` ファイルが存在するか確認

### 2. レイアウトが適用されない

**問題**: ネストしたレイアウトが期待通りに動作しない

**解決方法**:
- `layout.tsx` ファイル名が正しいか確認
- `children` プロパティを正しく渡しているか確認

### 3. メタデータが更新されない

**問題**: 動的メタデータが反映されない

**解決方法**:
- `generateMetadata` 関数が正しく export されているか確認
- パラメータを正しく await しているか確認

### 4. ナビゲーションが動作しない

**問題**: `Link` コンポーネントでページ遷移しない

**解決方法**:
- `next/link` から正しく import しているか確認
- `href` プロパティが正しく設定されているか確認

## 💡 ベストプラクティス

### 1. ファイル構造の整理

```
app/
├── (auth)/          # 認証関連のルートグループ
│   ├── login/
│   └── register/
├── (dashboard)/     # ダッシュボード関連
│   ├── analytics/
│   └── settings/
└── (public)/        # 公開ページ
    ├── about/
    └── contact/
```

### 2. レイアウトの効率的な使用

- 共通要素は上位のレイアウトに配置
- セクション固有の要素は該当レイアウトに配置
- 過度なネストは避ける

### 3. メタデータの一貫性

- テンプレートを使用してタイトルの一貫性を保つ
- 動的メタデータでSEO対応を強化
- Open Graphタグを適切に設定

### 4. エラーハンドリングの充実

- 各レベルでエラー境界を設定
- ユーザーフレンドリーなエラーメッセージ
- 適切な復旧オプションを提供

## 🎯 次のステップ

ルーティングシステムを理解したら、次は以下を学習しましょう：

1. **コンポーネント設計** - 再利用可能なコンポーネントの作成
2. **Server/Client Components** - サーバーとクライアントの使い分け
3. **データフェッチング** - 効率的なデータ取得方法
4. **スタイリング** - 様々なスタイリング手法の活用

## 📚 参考資料

- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js Routing](https://nextjs.org/docs/app/building-your-application/routing)
- [Next.js Layouts](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates)
- [Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

## 💡 まとめ

この章では、Next.jsのApp Routerについて包括的に学習しました。重要なポイント：

- **ファイルベースルーティング**: ディレクトリ構造がそのままURLになる
- **動的ルート**: 角括弧を使用してパラメータを定義
- **レイアウトシステム**: 階層的で柔軟なレイアウト管理
- **メタデータ管理**: 静的・動的なメタデータの設定
- **エラーハンドリング**: 適切なエラー処理とローディング状態

次の章では、これらのルーティング機能を活用したコンポーネント設計について学習していきます。