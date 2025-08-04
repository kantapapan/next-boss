import Link from 'next/link'

/**
 * ホームページコンポーネント
 * 
 * このページでは、Next.jsのルーティングシステムについて学習します。
 * App Routerの基本的な仕組みと、様々なルートタイプを理解できます。
 */
export default function HomePage() {
  return (
    <div>
      {/* ページタイトル */}
      <h1 style={{ color: '#1f2937', marginBottom: '2rem' }}>
        🚀 Next.jsルーティングシステムへようこそ！
      </h1>

      {/* 学習内容の説明 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>📚 この例で学べること</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li><strong>静的ルート</strong> - 固定URLのページ作成</li>
          <li><strong>動的ルート</strong> - パラメータを含むURL</li>
          <li><strong>ネストしたルート</strong> - 階層構造のページ</li>
          <li><strong>Linkコンポーネント</strong> - クライアントサイドナビゲーション</li>
          <li><strong>レイアウトの継承</strong> - 共通レイアウトの活用</li>
        </ul>
      </section>

      {/* ルーティングの種類 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>🗂️ ルーティングの種類</h2>
        
        <div style={{ 
          display: 'grid', 
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
        }}>
          {/* 静的ルート */}
          <div style={{ 
            padding: '1.5rem', 
            border: '1px solid #e5e7eb', 
            borderRadius: '8px',
            backgroundColor: '#f9fafb'
          }}>
            <h3 style={{ color: '#059669', marginTop: 0 }}>📄 静的ルート</h3>
            <p>固定のURLパスを持つページです。</p>
            <ul>
              <li><Link href="/about" style={{ color: '#2563eb' }}>About ページ</Link></li>
              <li><Link href="/contact" style={{ color: '#2563eb' }}>Contact ページ</Link></li>
            </ul>
            <code style={{ 
              backgroundColor: '#f3f4f6', 
              padding: '0.25rem 0.5rem', 
              borderRadius: '4px',
              fontSize: '0.875rem'
            }}>
              app/about/page.tsx → /about
            </code>
          </div>

          {/* 動的ルート */}
          <div style={{ 
            padding: '1.5rem', 
            border: '1px solid #e5e7eb', 
            borderRadius: '8px',
            backgroundColor: '#f9fafb'
          }}>
            <h3 style={{ color: '#dc2626', marginTop: 0 }}>🔄 動的ルート</h3>
            <p>URLパラメータを含む動的なページです。</p>
            <ul>
              <li><Link href="/blog" style={{ color: '#2563eb' }}>Blog 一覧</Link></li>
              <li><Link href="/blog/first-post" style={{ color: '#2563eb' }}>最初の投稿</Link></li>
              <li><Link href="/blog/nextjs-tutorial" style={{ color: '#2563eb' }}>Next.js チュートリアル</Link></li>
            </ul>
            <code style={{ 
              backgroundColor: '#f3f4f6', 
              padding: '0.25rem 0.5rem', 
              borderRadius: '4px',
              fontSize: '0.875rem'
            }}>
              app/blog/[slug]/page.tsx → /blog/[slug]
            </code>
          </div>
        </div>
      </section>

      {/* ファイル構造の説明 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>🏗️ ファイル構造</h2>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '1.5rem', 
          borderRadius: '8px',
          overflow: 'auto',
          fontSize: '0.875rem'
        }}>
{`app/
├── layout.tsx          # ルートレイアウト（全ページ共通）
├── page.tsx           # ホームページ（このページ）
├── about/
│   └── page.tsx       # /about ページ
├── contact/
│   └── page.tsx       # /contact ページ
└── blog/
    ├── page.tsx       # /blog ページ（一覧）
    └── [slug]/
        └── page.tsx   # /blog/[slug] ページ（個別記事）`}
        </pre>
      </section>

      {/* 重要なポイント */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>💡 重要なポイント</h2>
        <div style={{ 
          backgroundColor: '#dbeafe', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #93c5fd'
        }}>
          <h3 style={{ marginTop: 0 }}>1. App Routerの仕組み</h3>
          <p>ディレクトリ構造がそのままURLになります。<code>page.tsx</code>ファイルがそのルートのページコンテンツを定義します。</p>
          
          <h3>2. Linkコンポーネント</h3>
          <p>Next.jsの<code>Link</code>コンポーネントを使用することで、クライアントサイドナビゲーションが実現され、ページ遷移が高速になります。</p>
          
          <h3>3. 動的ルート</h3>
          <p><code>[slug]</code>のような角括弧を使用することで、URLパラメータを受け取る動的なページを作成できます。</p>
        </div>
      </section>

      {/* 実践的な例 */}
      <section>
        <h2>🎯 実践してみよう</h2>
        <div style={{ 
          backgroundColor: '#f0fdf4', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #86efac'
        }}>
          <h3 style={{ marginTop: 0 }}>試してみること：</h3>
          <ol style={{ lineHeight: '1.8' }}>
            <li>上部のナビゲーションメニューから各ページに移動してみる</li>
            <li>ブラウザの戻るボタンで前のページに戻る</li>
            <li>URLを直接変更してページにアクセスしてみる</li>
            <li>ブログの個別記事ページで異なるslugを試してみる</li>
          </ol>
          
          <p><strong>注目ポイント：</strong></p>
          <ul>
            <li>ページ遷移時にページ全体がリロードされない（SPA的な動作）</li>
            <li>URLが正しく変更される</li>
            <li>ブラウザの履歴が正常に動作する</li>
          </ul>
        </div>
      </section>
    </div>
  )
}