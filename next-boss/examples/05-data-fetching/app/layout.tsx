import type { Metadata } from "next";

/**
 * データフェッチング例のレイアウトコンポーネント
 * 
 * このレイアウトは05-data-fetchingディレクトリ全体に適用され、
 * データフェッチングの学習に最適化されたスタイルとメタデータを提供します。
 */

export const metadata: Metadata = {
  title: "05. データフェッチング | Next.js学習",
  description: "Next.jsにおけるServer ComponentとClient Componentでのデータフェッチング手法を学習します。fetch API、useEffect、リアルタイム更新などの実践例を提供。",
  keywords: ["Next.js", "データフェッチング", "Server Component", "Client Component", "fetch API", "useEffect", "TypeScript"],
  authors: [{ name: "Next.js学習プロジェクト" }],
  openGraph: {
    title: "Next.js データフェッチング学習",
    description: "Server ComponentとClient Componentでのデータフェッチング手法を実践的に学習",
    type: "website",
  },
};

export default function DataFetchingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        {/* データフェッチング例用のカスタムスタイル */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* ローディングアニメーション */
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            /* ホバーエフェクト */
            .hover-scale {
              transition: transform 0.2s ease;
            }
            
            .hover-scale:hover {
              transform: scale(1.02);
            }
            
            /* プログレスバーアニメーション */
            @keyframes progress {
              0% { width: 0%; }
              100% { width: 100%; }
            }
            
            /* フェードインアニメーション */
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            
            .fade-in {
              animation: fadeIn 0.3s ease-out;
            }
            
            /* スクロールバーのスタイリング */
            ::-webkit-scrollbar {
              width: 8px;
            }
            
            ::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 4px;
            }
            
            ::-webkit-scrollbar-thumb {
              background: #c1c1c1;
              border-radius: 4px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
              background: #a8a8a8;
            }
          `
        }} />
      </head>
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        backgroundColor: '#f8f9fa',
        color: '#333',
        lineHeight: 1.6
      }}>
        {/* ヘッダー */}
        <header style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e0e0e0',
          padding: '1rem 0',
          marginBottom: '2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <h1 style={{
                margin: 0,
                fontSize: '1.5rem',
                color: '#333',
                fontWeight: 'bold'
              }}>
                📊 データフェッチング学習
              </h1>
              <p style={{
                margin: '0.25rem 0 0 0',
                fontSize: '0.875rem',
                color: '#666'
              }}>
                Server ComponentとClient Componentでのデータ取得手法
              </p>
            </div>
            
            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center'
            }}>
              <div style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#e3f2fd',
                borderRadius: '20px',
                fontSize: '0.75rem',
                color: '#1976d2',
                fontWeight: 'bold'
              }}>
                🔵 Server Component
              </div>
              <div style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#fff3e0',
                borderRadius: '20px',
                fontSize: '0.75rem',
                color: '#f57c00',
                fontWeight: 'bold'
              }}>
                🟡 Client Component
              </div>
            </div>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem 2rem 1rem'
        }}>
          {children}
        </main>

        {/* フッター */}
        <footer style={{
          backgroundColor: 'white',
          borderTop: '1px solid #e0e0e0',
          padding: '2rem 0',
          marginTop: '3rem'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              <div>
                <h3 style={{
                  margin: '0 0 1rem 0',
                  fontSize: '1rem',
                  color: '#333'
                }}>
                  🔵 Server Component
                </h3>
                <ul style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  fontSize: '0.875rem',
                  color: '#666'
                }}>
                  <li>✅ サーバーサイドで実行</li>
                  <li>✅ SEO対応</li>
                  <li>✅ 高速な初期表示</li>
                  <li>✅ 自動キャッシュ</li>
                </ul>
              </div>
              
              <div>
                <h3 style={{
                  margin: '0 0 1rem 0',
                  fontSize: '1rem',
                  color: '#333'
                }}>
                  🟡 Client Component
                </h3>
                <ul style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  fontSize: '0.875rem',
                  color: '#666'
                }}>
                  <li>✅ インタラクティブ</li>
                  <li>✅ リアルタイム更新</li>
                  <li>✅ React Hooks使用可能</li>
                  <li>✅ ブラウザAPI利用可能</li>
                </ul>
              </div>
              
              <div>
                <h3 style={{
                  margin: '0 0 1rem 0',
                  fontSize: '1rem',
                  color: '#333'
                }}>
                  📚 学習ポイント
                </h3>
                <ul style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  fontSize: '0.875rem',
                  color: '#666'
                }}>
                  <li>🎯 適切な使い分け</li>
                  <li>🎯 エラーハンドリング</li>
                  <li>🎯 ローディング状態</li>
                  <li>🎯 パフォーマンス最適化</li>
                </ul>
              </div>
            </div>
            
            <div style={{
              paddingTop: '1rem',
              borderTop: '1px solid #e0e0e0',
              fontSize: '0.875rem',
              color: '#666'
            }}>
              <p style={{ margin: 0 }}>
                💡 <strong>学習のコツ:</strong> 
                各コンポーネントの動作をブラウザの開発者ツールで確認し、
                ネットワークタブやコンソールでデータフェッチングの流れを観察してみましょう。
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}