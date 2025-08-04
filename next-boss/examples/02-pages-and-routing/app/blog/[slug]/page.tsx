import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

/**
 * サンプルブログ記事データ
 * 
 * 実際のプロジェクトでは、これらのデータはAPIやデータベースから取得します。
 */
const blogPosts = {
  'first-post': {
    title: '最初のブログ投稿',
    content: `
# Next.jsで作成した最初のブログ記事

これは動的ルートの基本的な使い方を学ぶためのサンプル記事です。

## 動的ルートとは

動的ルートは、URLパラメータを含む動的なページを作成する機能です。この記事のURLは \`/blog/first-post\` ですが、\`first-post\` の部分が動的パラメータ（slug）として扱われます。

## 実装のポイント

1. **ファイル配置**: \`app/blog/[slug]/page.tsx\` ファイルを作成
2. **パラメータ取得**: \`params.slug\` でURLパラメータを取得
3. **データ取得**: slugに基づいて対応するデータを取得
4. **エラーハンドリング**: 存在しないslugの場合は404ページを表示

## まとめ

動的ルートを使用することで、柔軟で拡張性の高いWebアプリケーションを構築できます。
    `,
    date: '2024-01-15',
    author: '山田太郎',
    tags: ['Next.js', '入門', 'ブログ'],
    readTime: '5分'
  },
  'nextjs-tutorial': {
    title: 'Next.js完全ガイド',
    content: `
# Next.js完全ガイド

Next.jsの基本から応用まで、包括的に学習できるチュートリアルです。

## Next.jsとは

Next.jsは、Reactベースのフルスタックフレームワークです。以下の特徴があります：

- **Server-Side Rendering (SSR)**: サーバーサイドでのHTMLレンダリング
- **Static Site Generation (SSG)**: ビルド時の静的ファイル生成
- **App Router**: 新しいルーティングシステム
- **API Routes**: サーバーレス関数としてのAPI作成

## 基本的な使い方

### 1. プロジェクトの作成

\`\`\`bash
npx create-next-app@latest my-app --typescript
cd my-app
npm run dev
\`\`\`

### 2. ページの作成

\`app/page.tsx\` ファイルを作成することで、ルートページが作成されます。

### 3. 動的ルートの作成

\`[slug]\` のような角括弧を使用することで、動的ルートを作成できます。

## まとめ

Next.jsは、モダンなWebアプリケーション開発に必要な機能を包括的に提供するフレームワークです。
    `,
    date: '2024-01-20',
    author: '佐藤花子',
    tags: ['Next.js', 'チュートリアル', 'React'],
    readTime: '10分'
  },
  'dynamic-routing-explained': {
    title: '動的ルーティングの詳細解説',
    content: `
# 動的ルーティングの詳細解説

Next.jsの動的ルーティング機能について、実例を交えて詳しく説明します。

## 動的ルートの種類

### 1. 基本的な動的ルート

\`[slug].tsx\` - 単一のパラメータを受け取る

### 2. キャッチオールルート

\`[...slug].tsx\` - 複数のパラメータを配列として受け取る

### 3. オプショナルキャッチオールルート

\`[[...slug]].tsx\` - パラメータがない場合も含む

## パラメータの取得方法

\`\`\`typescript
export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  // slugを使用してデータを取得
}
\`\`\`

## メタデータの動的生成

\`\`\`typescript
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)
  return {
    title: post.title,
    description: post.excerpt,
  }
}
\`\`\`

## まとめ

動的ルーティングは、スケーラブルなWebアプリケーションの構築に不可欠な機能です。
    `,
    date: '2024-01-25',
    author: '田中一郎',
    tags: ['ルーティング', '動的ルート', '解説'],
    readTime: '8分'
  },
  'app-router-migration': {
    title: 'App Routerへの移行ガイド',
    content: `
# App Routerへの移行ガイド

Pages RouterからApp Routerへの移行方法と注意点について解説します。

## App Routerの利点

- **レイアウトの階層化**: より柔軟なレイアウト管理
- **Server Components**: サーバーサイドでのコンポーネントレンダリング
- **ストリーミング**: 段階的なページロード
- **並列ルート**: 複数のページを同時に表示

## 移行手順

### 1. ディレクトリ構造の変更

Pages Router:
\`\`\`
pages/
├── index.tsx
├── about.tsx
└── blog/
    └── [slug].tsx
\`\`\`

App Router:
\`\`\`
app/
├── page.tsx
├── about/
│   └── page.tsx
└── blog/
    └── [slug]/
        └── page.tsx
\`\`\`

### 2. レイアウトの移行

\`pages/_app.tsx\` の内容を \`app/layout.tsx\` に移行します。

### 3. API Routesの移行

\`pages/api/\` から \`app/api/\` に移行し、新しいAPI形式に対応します。

## 注意点

- 段階的な移行が可能
- 既存のPages Routerと併用可能
- パフォーマンスの向上が期待できる

## まとめ

App Routerは、Next.jsの未来を担う重要な機能です。計画的に移行を進めましょう。
    `,
    date: '2024-01-30',
    author: '鈴木美咲',
    tags: ['App Router', '移行', 'ガイド'],
    readTime: '12分'
  }
}

/**
 * 動的メタデータの生成
 * 
 * この関数は、URLパラメータに基づいて動的にメタデータを生成します。
 * SEO対応において重要な機能です。
 */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts[slug as keyof typeof blogPosts]
  
  if (!post) {
    return {
      title: '記事が見つかりません | Blog',
      description: '指定された記事は存在しません。',
    }
  }

  return {
    title: `${post.title} | Blog`,
    description: post.content.substring(0, 160) + '...',
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160) + '...',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

/**
 * 動的ルートページコンポーネント
 * 
 * このコンポーネントは /blog/[slug] URLにマッピングされます。
 * URLパラメータ（slug）を受け取り、対応する記事を表示します。
 * 
 * @param params - URLパラメータオブジェクト
 */
export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // URLパラメータからslugを取得
  const { slug } = await params
  
  // slugに対応する記事データを取得
  const post = blogPosts[slug as keyof typeof blogPosts]
  
  // 記事が存在しない場合は404ページを表示
  if (!post) {
    notFound()
  }

  return (
    <div>
      {/* パンくずナビゲーション */}
      <nav style={{ 
        marginBottom: '2rem', 
        fontSize: '0.875rem',
        color: '#6b7280'
      }}>
        <Link href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>
          ホーム
        </Link>
        {' > '}
        <Link href="/blog" style={{ color: '#2563eb', textDecoration: 'none' }}>
          Blog
        </Link>
        {' > '}
        <span>{post.title}</span>
      </nav>

      {/* 記事ヘッダー */}
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ 
          color: '#1f2937', 
          marginBottom: '1rem',
          fontSize: '2.5rem',
          lineHeight: '1.2'
        }}>
          {post.title}
        </h1>
        
        {/* 記事メタ情報 */}
        <div style={{ 
          display: 'flex', 
          gap: '2rem', 
          flexWrap: 'wrap',
          marginBottom: '1.5rem',
          fontSize: '0.875rem',
          color: '#6b7280'
        }}>
          <span>📅 {post.date}</span>
          <span>✍️ {post.author}</span>
          <span>⏱️ 読了時間: {post.readTime}</span>
        </div>
        
        {/* タグ */}
        <div style={{ marginBottom: '2rem' }}>
          {post.tags.map((tag) => (
            <span 
              key={tag}
              style={{ 
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                marginRight: '0.5rem',
                marginBottom: '0.25rem'
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* 動的ルートの説明 */}
      <section style={{ 
        backgroundColor: '#fef3c7', 
        padding: '1.5rem', 
        borderRadius: '8px',
        border: '1px solid #fbbf24',
        marginBottom: '3rem'
      }}>
        <h2 style={{ marginTop: 0, color: '#d97706' }}>
          🔄 動的ルートの仕組み
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          現在のURL: <code>/blog/{slug}</code>
        </p>
        <p style={{ marginBottom: '1rem' }}>
          この記事ページは <code>app/blog/[slug]/page.tsx</code> ファイルによって生成されています。
          URLの <code>{slug}</code> 部分が動的パラメータとして渡され、対応する記事データを表示しています。
        </p>
        <details style={{ marginTop: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            実装の詳細を見る
          </summary>
          <pre style={{ 
            backgroundColor: '#f3f4f6', 
            padding: '1rem', 
            borderRadius: '4px',
            marginTop: '1rem',
            fontSize: '0.875rem',
            overflow: 'auto'
          }}>
{`// パラメータの取得
export default function BlogPostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const { slug } = params // "${slug}"
  const post = blogPosts[slug]
  
  if (!post) {
    notFound() // 404ページを表示
  }
  
  return <div>{/* 記事コンテンツ */}</div>
}`}
          </pre>
        </details>
      </section>

      {/* 記事本文 */}
      <article style={{ 
        lineHeight: '1.8',
        fontSize: '1.1rem'
      }}>
        <div style={{ 
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          {/* 簡単なMarkdown風レンダリング */}
          {post.content.split('\n').map((line, index) => {
            if (line.startsWith('# ')) {
              return (
                <h1 key={index} style={{ 
                  color: '#1f2937', 
                  marginTop: index === 0 ? 0 : '2rem',
                  marginBottom: '1rem'
                }}>
                  {line.substring(2)}
                </h1>
              )
            }
            if (line.startsWith('## ')) {
              return (
                <h2 key={index} style={{ 
                  color: '#374151', 
                  marginTop: '2rem',
                  marginBottom: '1rem'
                }}>
                  {line.substring(3)}
                </h2>
              )
            }
            if (line.startsWith('### ')) {
              return (
                <h3 key={index} style={{ 
                  color: '#4b5563', 
                  marginTop: '1.5rem',
                  marginBottom: '0.5rem'
                }}>
                  {line.substring(4)}
                </h3>
              )
            }
            if (line.startsWith('```')) {
              return null // コードブロックは簡略化
            }
            if (line.trim() === '') {
              return <br key={index} />
            }
            return (
              <p key={index} style={{ marginBottom: '1rem' }}>
                {line}
              </p>
            )
          })}
        </div>
      </article>

      {/* 関連記事 */}
      <section style={{ marginTop: '4rem' }}>
        <h2>📚 他の記事も読んでみよう</h2>
        <div style={{ 
          display: 'grid', 
          gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          marginTop: '1.5rem'
        }}>
          {Object.entries(blogPosts)
            .filter(([key]) => key !== slug)
            .slice(0, 3)
            .map(([key, relatedPost]) => (
              <Link 
                key={key}
                href={`/blog/${key}`}
                style={{ 
                  display: 'block',
                  padding: '1rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '6px',
                  border: '1px solid #e5e7eb',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <h3 style={{ 
                  marginTop: 0, 
                  marginBottom: '0.5rem',
                  color: '#dc2626',
                  fontSize: '1rem'
                }}>
                  {relatedPost.title}
                </h3>
                <p style={{ 
                  margin: 0, 
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  {relatedPost.author} • {relatedPost.date}
                </p>
              </Link>
            ))}
        </div>
      </section>

      {/* ナビゲーション */}
      <section style={{ marginTop: '4rem' }}>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          flexWrap: 'wrap'
        }}>
          <Link 
            href="/blog" 
            style={{ 
              padding: '0.75rem 1.5rem',
              backgroundColor: '#dc2626',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              display: 'inline-block'
            }}
          >
            ← Blog一覧に戻る
          </Link>
          
          <Link 
            href="/" 
            style={{ 
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              display: 'inline-block'
            }}
          >
            🏠 ホームに戻る
          </Link>
        </div>
      </section>
    </div>
  )
}