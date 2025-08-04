import type { Metadata } from 'next'
import Link from 'next/link'

/**
 * Aboutページのメタデータ
 * 
 * 各ページで個別にメタデータを設定できます。
 * これはSEO対応において重要な機能です。
 */
export const metadata: Metadata = {
  title: 'About | ページとルーティング',
  description: 'Next.jsのルーティング学習例のAboutページです',
  keywords: ['Next.js', 'About', 'ルーティング', '静的ページ'],
}

/**
 * Aboutページコンポーネント
 * 
 * これは静的ルートの例です。
 * app/about/page.tsx ファイルが /about URLにマッピングされます。
 */
export default function AboutPage() {
  return (
    <div>
      {/* ページタイトル */}
      <h1 style={{ color: '#059669', marginBottom: '2rem' }}>
        📋 About - 静的ルートの例
      </h1>

      {/* 静的ルートの説明 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>🎯 静的ルートとは</h2>
        <p style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
          静的ルートは、固定のURLパスを持つページです。このAboutページは
          <code style={{ 
            backgroundColor: '#f3f4f6', 
            padding: '0.25rem 0.5rem', 
            borderRadius: '4px',
            margin: '0 0.25rem'
          }}>
            app/about/page.tsx
          </code>
          ファイルによって作成され、
          <code style={{ 
            backgroundColor: '#f3f4f6', 
            padding: '0.25rem 0.5rem', 
            borderRadius: '4px',
            margin: '0 0.25rem'
          }}>
            /about
          </code>
          URLでアクセスできます。
        </p>
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
{`app/
├── layout.tsx     # ルートレイアウト
├── page.tsx       # ホームページ (/)
└── about/
    └── page.tsx   # このファイル (/about)`}
          </pre>
        </div>
      </section>

      {/* メタデータの説明 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>🏷️ メタデータの設定</h2>
        <p>このページでは、個別のメタデータを設定しています：</p>
        <div style={{ 
          backgroundColor: '#dbeafe', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #93c5fd'
        }}>
          <pre style={{ margin: 0, fontSize: '0.875rem' }}>
{`export const metadata: Metadata = {
  title: 'About | ページとルーティング',
  description: 'Next.jsのルーティング学習例のAboutページです',
  keywords: ['Next.js', 'About', 'ルーティング', '静的ページ'],
}`}
          </pre>
        </div>
        <p style={{ marginTop: '1rem' }}>
          ブラウザのタブタイトルを確認してみてください。ホームページとは異なるタイトルが表示されているはずです。
        </p>
      </section>

      {/* 静的ルートの特徴 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>✨ 静的ルートの特徴</h2>
        <div style={{ 
          display: 'grid', 
          gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
        }}>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#f0fdf4', 
            borderRadius: '6px',
            border: '1px solid #86efac'
          }}>
            <h3 style={{ color: '#059669', marginTop: 0 }}>🚀 高速</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              ビルド時に事前レンダリングされ、CDNでキャッシュ可能
            </p>
          </div>
          
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#fef3c7', 
            borderRadius: '6px',
            border: '1px solid #fbbf24'
          }}>
            <h3 style={{ color: '#d97706', marginTop: 0 }}>🔍 SEO対応</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              検索エンジンが内容を正しくインデックス
            </p>
          </div>
          
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#dbeafe', 
            borderRadius: '6px',
            border: '1px solid #60a5fa'
          }}>
            <h3 style={{ color: '#2563eb', marginTop: 0 }}>📱 レスポンシブ</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              全てのデバイスで最適な表示
            </p>
          </div>
        </div>
      </section>

      {/* 実際のプロジェクトでの使用例 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>🏢 実際のプロジェクトでの使用例</h2>
        <p>静的ルートは以下のようなページでよく使用されます：</p>
        <ul style={{ lineHeight: '1.8' }}>
          <li><strong>About</strong> - 会社概要、サービス紹介</li>
          <li><strong>Contact</strong> - お問い合わせフォーム</li>
          <li><strong>Privacy Policy</strong> - プライバシーポリシー</li>
          <li><strong>Terms of Service</strong> - 利用規約</li>
          <li><strong>FAQ</strong> - よくある質問</li>
        </ul>
      </section>

      {/* ナビゲーション */}
      <section>
        <h2>🧭 他のページも見てみよう</h2>
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
            📝 Blog ページ
          </Link>
        </div>
      </section>
    </div>
  )
}