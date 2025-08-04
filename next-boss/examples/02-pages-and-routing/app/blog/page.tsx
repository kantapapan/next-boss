import type { Metadata } from 'next'
import Link from 'next/link'

/**
 * Blogページのメタデータ
 */
export const metadata: Metadata = {
  title: 'Blog | ページとルーティング',
  description: 'ブログ一覧ページ - 動的ルートへのエントリーポイント',
  keywords: ['Next.js', 'Blog', 'ブログ', '動的ルート'],
}

/**
 * サンプルブログ記事データ
 * 
 * 実際のプロジェクトでは、これらのデータはAPIやデータベースから取得します。
 */
const blogPosts = [
  {
    slug: 'first-post',
    title: '最初のブログ投稿',
    excerpt: 'Next.jsで作成した最初のブログ記事です。動的ルートの基本的な使い方を学びましょう。',
    date: '2024-01-15',
    author: '山田太郎',
    tags: ['Next.js', '入門', 'ブログ']
  },
  {
    slug: 'nextjs-tutorial',
    title: 'Next.js完全ガイド',
    excerpt: 'Next.jsの基本から応用まで、包括的に学習できるチュートリアルです。',
    date: '2024-01-20',
    author: '佐藤花子',
    tags: ['Next.js', 'チュートリアル', 'React']
  },
  {
    slug: 'dynamic-routing-explained',
    title: '動的ルーティングの詳細解説',
    excerpt: 'Next.jsの動的ルーティング機能について、実例を交えて詳しく説明します。',
    date: '2024-01-25',
    author: '田中一郎',
    tags: ['ルーティング', '動的ルート', '解説']
  },
  {
    slug: 'app-router-migration',
    title: 'App Routerへの移行ガイド',
    excerpt: 'Pages RouterからApp Routerへの移行方法と注意点について解説します。',
    date: '2024-01-30',
    author: '鈴木美咲',
    tags: ['App Router', '移行', 'ガイド']
  }
]

/**
 * Blogページコンポーネント
 * 
 * このページは /blog URLにマッピングされ、
 * 動的ルート /blog/[slug] へのエントリーポイントとして機能します。
 */
export default function BlogPage() {
  return (
    <div>
      {/* ページタイトル */}
      <h1 style={{ color: '#dc2626', marginBottom: '2rem' }}>
        📝 Blog - 動的ルートの入り口
      </h1>

      {/* 動的ルートの説明 */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ 
          backgroundColor: '#fef2f2', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #fecaca'
        }}>
          <h2 style={{ marginTop: 0, color: '#dc2626' }}>🔄 動的ルートとは</h2>
          <p style={{ lineHeight: '1.8' }}>
            動的ルートは、URLパラメータを含む動的なページです。
            このブログ一覧から個別の記事ページ（<code>/blog/[slug]</code>）に移動することで、
            動的ルーティングの仕組みを体験できます。
          </p>
        </div>
      </section>

      {/* ファイル構造の説明 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>📁 ファイル構造</h2>
        <div style={{ 
          backgroundColor: '#f9fafb', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <pre style={{ margin: 0, fontSize: '0.875rem' }}>
{`app/blog/
├── page.tsx        # このファイル (/blog)
└── [slug]/
    └── page.tsx    # 動的ページ (/blog/[slug])`}
          </pre>
        </div>
        <p style={{ marginTop: '1rem', color: '#6b7280' }}>
          <code>[slug]</code> ディレクトリの角括弧は、これが動的ルートであることを示します。
        </p>
      </section>

      {/* ブログ記事一覧 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>📚 ブログ記事一覧</h2>
        <p style={{ marginBottom: '2rem', color: '#6b7280' }}>
          以下の記事をクリックすると、動的ルート <code>/blog/[slug]</code> に移動します。
        </p>
        
        <div style={{ 
          display: 'grid', 
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))'
        }}>
          {blogPosts.map((post) => (
            <article 
              key={post.slug}
              style={{ 
                padding: '1.5rem', 
                backgroundColor: 'white', 
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              <h3 style={{ 
                marginTop: 0, 
                marginBottom: '1rem',
                color: '#1f2937'
              }}>
                <Link 
                  href={`/blog/${post.slug}`}
                  style={{ 
                    color: '#dc2626', 
                    textDecoration: 'none'
                  }}
                >
                  {post.title}
                </Link>
              </h3>
              
              <p style={{ 
                color: '#6b7280', 
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                {post.excerpt}
              </p>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1rem',
                fontSize: '0.875rem',
                color: '#9ca3af'
              }}>
                <span>📅 {post.date}</span>
                <span>✍️ {post.author}</span>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    style={{ 
                      display: 'inline-block',
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      marginRight: '0.5rem',
                      marginBottom: '0.25rem'
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              <Link 
                href={`/blog/${post.slug}`}
                style={{ 
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontSize: '0.875rem'
                }}
              >
                記事を読む →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* 動的ルートの仕組み */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>⚙️ 動的ルートの仕組み</h2>
        <div style={{ 
          backgroundColor: '#f0f9ff', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #7dd3fc'
        }}>
          <h3 style={{ marginTop: 0 }}>1. URLパラメータの取得</h3>
          <p>
            <code>/blog/first-post</code> にアクセスすると、
            <code>first-post</code> が <code>slug</code> パラメータとして渡されます。
          </p>
          
          <h3>2. パラメータの活用</h3>
          <p>
            個別記事ページでは、この <code>slug</code> を使用して
            対応する記事データを取得し、表示します。
          </p>
          
          <h3>3. SEO対応</h3>
          <p>
            各記事ページで個別のメタデータを設定することで、
            検索エンジン最適化が可能です。
          </p>
        </div>
      </section>

      {/* 試してみよう */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>🎯 試してみよう</h2>
        <div style={{ 
          backgroundColor: '#f0fdf4', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #86efac'
        }}>
          <h3 style={{ marginTop: 0 }}>実践してみること：</h3>
          <ol style={{ lineHeight: '1.8' }}>
            <li>上記の記事リンクをクリックして個別記事ページに移動</li>
            <li>URLが <code>/blog/[記事のslug]</code> に変わることを確認</li>
            <li>ブラウザの戻るボタンでこのページに戻る</li>
            <li>直接URLを入力して記事ページにアクセスしてみる</li>
          </ol>
          
          <h3>注目ポイント：</h3>
          <ul style={{ lineHeight: '1.8' }}>
            <li>各記事ページで異なるタイトルとメタデータが設定される</li>
            <li>URLパラメータに基づいて動的にコンテンツが生成される</li>
            <li>存在しないslugにアクセスした場合の動作</li>
          </ul>
        </div>
      </section>

      {/* ナビゲーション */}
      <section>
        <h2>🧭 他のページも確認してみよう</h2>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          flexWrap: 'wrap',
          marginTop: '1rem'
        }}>
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
          
          <Link 
            href="/about" 
            style={{ 
              padding: '0.75rem 1.5rem',
              backgroundColor: '#059669',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              display: 'inline-block'
            }}
          >
            📋 About ページ
          </Link>
          
          <Link 
            href="/contact" 
            style={{ 
              padding: '0.75rem 1.5rem',
              backgroundColor: '#059669',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              display: 'inline-block'
            }}
          >
            📞 Contact ページ
          </Link>
        </div>
      </section>
    </div>
  )
}