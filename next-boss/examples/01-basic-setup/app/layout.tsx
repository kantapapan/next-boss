import type { Metadata } from 'next'

/**
 * メタデータの設定
 * 
 * Next.jsでは、各ページやレイアウトでメタデータを設定できます。
 * これはSEOやソーシャルメディアでの表示に重要です。
 */
export const metadata: Metadata = {
  title: '01. 基本セットアップ | Next Boss',
  description: 'Next.jsの基本的なセットアップと構造を学ぶ',
  keywords: ['Next.js', 'React', 'TypeScript', '学習', '基本'],
}

/**
 * ルートレイアウトコンポーネント
 * 
 * このコンポーネントは全てのページで共通して使用されるレイアウトです。
 * HTMLの基本構造（html, body）を定義し、全ページで共通のスタイルや
 * メタデータを設定します。
 * 
 * @param children - 子コンポーネント（各ページのコンテンツ）
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        {/* ヘッダー部分 - 全ページ共通 */}
        <header style={{ 
          padding: '1rem', 
          backgroundColor: '#f0f0f0', 
          borderBottom: '1px solid #ddd' 
        }}>
          <h1>Next.js 基本セットアップ</h1>
          <nav>
            <p>学習例 01: 最小限のNext.jsアプリケーション</p>
          </nav>
        </header>

        {/* メインコンテンツエリア */}
        <main style={{ padding: '2rem', minHeight: '80vh' }}>
          {children}
        </main>

        {/* フッター部分 - 全ページ共通 */}
        <footer style={{ 
          padding: '1rem', 
          backgroundColor: '#f0f0f0', 
          borderTop: '1px solid #ddd',
          textAlign: 'center'
        }}>
          <p>&copy; 2024 Next Boss - Next.js学習リポジトリ</p>
        </footer>
      </body>
    </html>
  )
}