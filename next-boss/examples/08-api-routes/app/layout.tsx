/**
 * Root Layout Component
 * 
 * アプリケーション全体のレイアウトを定義します。
 * API Routes学習用のサンプルアプリケーションです。
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js API Routes 学習例',
  description: 'Next.js API Routesの基本的な使い方を学ぶためのサンプルアプリケーション',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body style={{ 
        fontFamily: 'system-ui, -apple-system, sans-serif',
        margin: 0,
        padding: 0,
        backgroundColor: '#f5f5f5'
      }}>
        <header style={{
          backgroundColor: '#0070f3',
          color: 'white',
          padding: '1rem 2rem',
          marginBottom: '2rem'
        }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
            Next.js API Routes 学習例
          </h1>
          <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
            RESTful APIの基本的なCRUD操作を学習
          </p>
        </header>
        
        <main style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 2rem' 
        }}>
          {children}
        </main>
        
        <footer style={{
          marginTop: '4rem',
          padding: '2rem',
          textAlign: 'center',
          color: '#666',
          borderTop: '1px solid #eee'
        }}>
          <p>Next.js 15.4.5 + TypeScript で構築</p>
        </footer>
      </body>
    </html>
  );
}