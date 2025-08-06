import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js スタイリング手法例",
  description: "CSS Modules、Tailwind CSS、styled-componentsの比較と実装例",
};

/**
 * ルートレイアウトコンポーネント
 * 
 * このレイアウトは全てのページで共有されます。
 * グローバルスタイル（globals.css）をここで読み込んでいます。
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {/* ヘッダー */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Next.js スタイリング手法
              </h1>
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                      ホーム
                    </a>
                  </li>
                  <li>
                    <a href="/css-modules" className="text-gray-600 hover:text-gray-900 transition-colors">
                      CSS Modules
                    </a>
                  </li>
                  <li>
                    <a href="/tailwind" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Tailwind CSS
                    </a>
                  </li>
                  <li>
                    <a href="/styled-components" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Styled Components
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>

        {/* フッター */}
        <footer className="bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-gray-300">
              © 2024 Next.js スタイリング学習例 - 学習目的で作成
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}