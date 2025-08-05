'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { NavigationItem } from '@/types'

/**
 * ナビゲーションアイテムの定義
 */
const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'ホーム',
    href: '/',
    icon: '🏠',
  },
  {
    id: 'components',
    label: 'コンポーネント',
    href: '/components',
    icon: '🧩',
  },
  {
    id: 'props',
    label: 'Props',
    href: '/props',
    icon: '⚙️',
  },
  {
    id: 'examples',
    label: '実例',
    href: '/examples',
    icon: '📝',
  },
]

/**
 * フッターリンクセクションの定義
 */
const footerSections = [
  {
    title: '学習コンテンツ',
    links: [
      { id: 'basic-setup', label: '基本セットアップ', href: '/basic-setup' },
      { id: 'routing', label: 'ルーティング', href: '/routing' },
      { id: 'components', label: 'コンポーネント', href: '/components' },
      { id: 'data-fetching', label: 'データフェッチング', href: '/data-fetching' },
    ],
  },
  {
    title: 'リソース',
    links: [
      { id: 'docs', label: 'ドキュメント', href: '/docs' },
      { id: 'examples', label: '実例', href: '/examples' },
      { id: 'exercises', label: '課題', href: '/exercises' },
      { id: 'faq', label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'コミュニティ',
    links: [
      { id: 'github', label: 'GitHub', href: 'https://github.com' },
      { id: 'discord', label: 'Discord', href: '#' },
      { id: 'twitter', label: 'Twitter', href: '#' },
      { id: 'blog', label: 'ブログ', href: '/blog' },
    ],
  },
]

/**
 * ソーシャルメディアリンクの定義
 */
const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    ),
  },
]

/**
 * ルートレイアウトコンポーネント
 * 
 * このレイアウトは全てのページで共通して使用されます。
 * Header、Footer、そして各ページのコンテンツを含みます。
 * 
 * コンポーネントとPropsの学習例として、実際に作成した
 * HeaderとFooterコンポーネントを使用しています。
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // サンプルユーザー（実際のアプリでは認証システムから取得）
  const sampleUser = {
    id: '1',
    name: '田中太郎',
    email: 'tanaka@example.com',
    avatar: 'https://via.placeholder.com/32x32/4F46E5/FFFFFF?text=T',
    role: 'user' as const,
    createdAt: '2024-01-01',
  }

  // ログイン処理（デモ用）
  const handleLogin = () => {
    alert('ログイン機能はデモです。実際のアプリでは認証システムを実装します。')
  }

  // ログアウト処理（デモ用）
  const handleLogout = () => {
    alert('ログアウト機能はデモです。')
  }

  // 検索処理（デモ用）
  const handleSearch = (query: string) => {
    console.log('検索クエリ:', query)
  }

  // ニュースレター購読処理（デモ用）
  const handleNewsletterSubscribe = async (email: string) => {
    console.log('ニュースレター購読:', email)
    // 実際のアプリでは API を呼び出す
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return (
    <html lang="ja">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        {/* 
          Headerコンポーネントの使用例
          - navigationItems: ナビゲーションメニューの項目
          - user: ログイン中のユーザー情報
          - onLogin/onLogout: ログイン・ログアウトのハンドラー
          - showSearch: 検索機能の表示
          - onSearchChange: 検索クエリ変更のハンドラー
        */}
        <Header
          siteName="Next Boss"
          navigationItems={navigationItems}
          user={sampleUser}
          onLogin={handleLogin}
          onLogout={handleLogout}
          showSearch={true}
          onSearchChange={handleSearch}
        />

        {/* メインコンテンツエリア */}
        <main style={{ minHeight: '80vh' }}>
          {children}
        </main>

        {/* 
          Footerコンポーネントの使用例
          - siteName: サイト名
          - linkSections: フッターリンクのセクション
          - socialLinks: ソーシャルメディアリンク
          - showNewsletter: ニュースレター購読機能の表示
          - onNewsletterSubscribe: ニュースレター購読のハンドラー
          - companyInfo: 会社情報
        */}
        <Footer
          siteName="Next Boss"
          linkSections={footerSections}
          socialLinks={socialLinks}
          showNewsletter={true}
          onNewsletterSubscribe={handleNewsletterSubscribe}
          companyInfo={{
            address: '東京都渋谷区1-1-1',
            phone: '03-1234-5678',
            email: 'info@nextboss.com',
          }}
        />
      </body>
    </html>
  )
}