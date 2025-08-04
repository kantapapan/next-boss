import type { Metadata } from 'next'
import Link from 'next/link'

/**
 * メタデータの設定
 */
export const metadata: Metadata = {
  title: '02. ページとルーティング | Next Boss',
  description: 'Next.jsのApp Routerを使用したページとルーティングの学習',
  keywords: ['Next.js', 'App Router', 'ルーティング', '動的ルート'],
}

/**
 * ルートレイアウトコンポーネント
 * 
 * このレイアウトは全てのページで共通して使用されます。
 * ナビゲーションメニューを含み、各ページへのリンクを提供します。
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
        {/* ヘッダーとナビゲーション */}
        <header style={{ 
          padding: '1rem', 
          backgroundColor: '#2563eb', 
          color: 'white' 
        }}>
          <h1 style={{ margin: '0 0 1rem 0' }}>
            📄 ページとルーティング
          </h1>
          
          {/* ナビゲーションメニュー */}
          <nav>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0, 
              display: 'flex', 
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <li>
                <Link 
                  href="/" 
                  style={{ 
                    color: 'white', 
                    textDecoration: 'none',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    display: 'block'
                  }}
                >
                  🏠 ホーム
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  style={{ 
                    color: 'white', 
                    textDecoration: 'none',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    display: 'block'
                  }}
                >
                  📋 About
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  style={{ 
                    color: 'white', 
                    textDecoration: 'none',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    display: 'block'
                  }}
                >
                  📞 Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  style={{ 
                    color: 'white', 
                    textDecoration: 'none',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    display: 'block'
                  }}
                >
                  📝 Blog
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* メインコンテンツエリア */}
        <main style={{ 
          padding: '2rem', 
          minHeight: '80vh',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {children}
        </main>

        {/* フッター */}
        <footer style={{ 
          padding: '1rem', 
          backgroundColor: '#f3f4f6', 
          borderTop: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, color: '#6b7280' }}>
            &copy; 2024 Next Boss - ルーティング学習例
          </p>
        </footer>
      </body>
    </html>
  )
}