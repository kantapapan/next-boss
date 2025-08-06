import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forms and Validation Example",
  description: "Next.js forms and validation learning example",
};

/**
 * ルートレイアウトコンポーネント
 * 
 * このコンポーネントは全てのページで共有されるレイアウトを定義します。
 * フォームアプリケーションに適したスタイリングを含んでいます。
 */
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
        padding: '20px',
        backgroundColor: '#f5f5f5',
        lineHeight: 1.6
      }}>
        <header style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ margin: 0, color: '#333' }}>
            📝 Forms and Validation Example
          </h1>
          <p style={{ margin: '10px 0 0 0', color: '#666' }}>
            Next.jsでのフォーム処理とバリデーションの学習例
          </p>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}