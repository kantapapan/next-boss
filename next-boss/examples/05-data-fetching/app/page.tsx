/**
 * データフェッチング例のメインページ
 * 
 * このページはServer Componentとして実装されており、
 * Server ComponentとClient Componentの両方を組み合わせて
 * データフェッチングの違いを実践的に学習できます。
 * 
 * 🏗️ アーキテクチャの特徴：
 * - このページ（HomePage）: Server Component
 * - UserListServer, PostListServer, PostWithCommentsServer: Server Components
 * - PhotoGalleryClient, RealTimeDashboard, PostSearchClient: Client Components
 * 
 * 📊 学習目標：
 * 1. Server Componentでのデータフェッチング手法の理解
 * 2. Client Componentでのデータフェッチング手法の理解
 * 3. 適切な使い分けの判断基準の習得
 * 4. エラーハンドリングとローディング状態の実装
 * 5. パフォーマンス最適化手法の理解
 */

import { UserListServer, PostListServer, PostWithCommentsServer } from '@/components/ServerDataComponents'
import { PhotoGalleryClient, RealTimeDashboard, PostSearchClient } from '@/components/ClientDataComponents'

export default function DataFetchingPage() {
  return (
    <div>
      {/* 概要セクション */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            margin: '0 0 1rem 0', 
            color: '#333',
            fontSize: '1.75rem'
          }}>
            📊 データフェッチング手法の学習
          </h2>
          
          <p style={{ 
            margin: '0 0 1rem 0', 
            fontSize: '1.1rem',
            color: '#555',
            lineHeight: '1.6'
          }}>
            Next.jsでは、<strong>Server Component</strong>と<strong>Client Component</strong>で
            異なるデータフェッチング手法を使用します。
            それぞれの特徴を理解し、適切に使い分けることが重要です。
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1.5rem',
            marginTop: '1.5rem'
          }}>
            <div style={{
              backgroundColor: '#e3f2fd',
              padding: '1.5rem',
              borderRadius: '6px',
              border: '1px solid #90caf9'
            }}>
              <h3 style={{ 
                margin: '0 0 1rem 0', 
                color: '#1976d2',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>🔵</span>
                Server Component
              </h3>
              <ul style={{ 
                margin: 0, 
                paddingLeft: '1.2rem',
                color: '#0d47a1'
              }}>
                <li><strong>fetch API</strong> でサーバーサイドデータ取得</li>
                <li><strong>async/await</strong> による非同期処理</li>
                <li><strong>Next.jsキャッシュ</strong> による最適化</li>
                <li><strong>並列データ取得</strong> (Promise.all)</li>
                <li><strong>SEO対応</strong> の初期HTMLレンダリング</li>
              </ul>
            </div>

            <div style={{
              backgroundColor: '#fff8e1',
              padding: '1.5rem',
              borderRadius: '6px',
              border: '1px solid #ffcc02'
            }}>
              <h3 style={{ 
                margin: '0 0 1rem 0', 
                color: '#f57c00',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>🟡</span>
                Client Component
              </h3>
              <ul style={{ 
                margin: 0, 
                paddingLeft: '1.2rem',
                color: '#e65100'
              }}>
                <li><strong>useEffect</strong> によるライフサイクル管理</li>
                <li><strong>useState</strong> による状態管理</li>
                <li><strong>ローディング・エラー状態</strong> の処理</li>
                <li><strong>リアルタイム更新</strong> とインタラクション</li>
                <li><strong>デバウンス処理</strong> による最適化</li>
              </ul>
            </div>
          </div>

          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '6px',
            fontSize: '0.875rem',
            color: '#666'
          }}>
            <strong>💡 学習のポイント:</strong>
            各コンポーネントの動作をブラウザの開発者ツールで確認してください。
            ネットワークタブでAPIリクエストのタイミング、コンソールでログメッセージを観察することで、
            Server ComponentとClient Componentの違いがより明確に理解できます。
          </div>
        </div>
      </section>

      {/* Server Componentsセクション */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ 
          margin: '0 0 1.5rem 0', 
          color: '#1976d2',
          fontSize: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ fontSize: '2rem' }}>🔵</span>
          Server Component でのデータフェッチング
        </h2>
        
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '1rem',
          borderRadius: '6px',
          marginBottom: '1.5rem',
          border: '1px solid #dee2e6'
        }}>
          <p style={{ 
            margin: 0, 
            fontSize: '0.875rem',
            color: '#6c757d'
          }}>
            💡 以下のコンポーネントはサーバーサイドで実行され、ビルド時またはリクエスト時にデータを取得します。
            ページのソースを表示すると、HTMLに直接データが含まれていることが確認できます。
            Next.jsの自動キャッシュ機能により、同じデータへの重複リクエストは最適化されます。
          </p>
        </div>

        {/* Server Componentの例を表示 */}
        <UserListServer />
        <PostListServer />
        <PostWithCommentsServer postId={1} />
      </section>

      {/* Client Componentsセクション */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ 
          margin: '0 0 1.5rem 0', 
          color: '#f57c00',
          fontSize: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ fontSize: '2rem' }}>🟡</span>
          Client Component でのデータフェッチング
        </h2>
        
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '1rem',
          borderRadius: '6px',
          marginBottom: '1.5rem',
          border: '1px solid #dee2e6'
        }}>
          <p style={{ 
            margin: 0, 
            fontSize: '0.875rem',
            color: '#6c757d'
          }}>
            💡 以下のコンポーネントはブラウザで実行され、ユーザーのインタラクションやライフサイクルに応じてデータを取得します。
            開発者ツールのネットワークタブで、クライアントサイドでのAPIリクエストを確認できます。
            ローディング状態、エラー処理、リアルタイム更新などの機能を実装しています。
          </p>
        </div>

        {/* Client Componentの例を表示 */}
        <PhotoGalleryClient />
        <PostSearchClient />
        <RealTimeDashboard />
      </section>

      {/* 比較と学習のまとめセクション */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{
          backgroundColor: '#e8f5e8',
          padding: '2rem',
          borderRadius: '8px',
          border: '2px solid #4caf50'
        }}>
          <h2 style={{ 
            margin: '0 0 1.5rem 0', 
            color: '#2e7d32',
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '2rem' }}>🎯</span>
            データフェッチング手法の比較と選択指針
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '6px',
              border: '1px solid #c8e6c9'
            }}>
              <h3 style={{ 
                margin: '0 0 1rem 0', 
                color: '#2e7d32',
                fontSize: '1.2rem'
              }}>
                🔵 Server Component を選ぶべき場合
              </h3>
              <ul style={{ 
                margin: 0, 
                paddingLeft: '1.2rem',
                color: '#1b5e20',
                lineHeight: '1.6'
              }}>
                <li><strong>初期データの表示</strong> - ページロード時に必要なデータ</li>
                <li><strong>SEOが重要</strong> - 検索エンジンに認識させたいコンテンツ</li>
                <li><strong>静的なコンテンツ</strong> - ユーザー操作で変更されないデータ</li>
                <li><strong>データベース直接アクセス</strong> - サーバーサイドでのみ可能な処理</li>
                <li><strong>パフォーマンス重視</strong> - 高速な初期表示が必要</li>
              </ul>
            </div>

            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '6px',
              border: '1px solid #c8e6c9'
            }}>
              <h3 style={{ 
                margin: '0 0 1rem 0', 
                color: '#2e7d32',
                fontSize: '1.2rem'
              }}>
                🟡 Client Component を選ぶべき場合
              </h3>
              <ul style={{ 
                margin: 0, 
                paddingLeft: '1.2rem',
                color: '#1b5e20',
                lineHeight: '1.6'
              }}>
                <li><strong>ユーザーインタラクション</strong> - クリック、入力に応じた処理</li>
                <li><strong>リアルタイム更新</strong> - 定期的なデータ更新が必要</li>
                <li><strong>動的な状態管理</strong> - ユーザーの操作で変化するデータ</li>
                <li><strong>ブラウザAPI使用</strong> - localStorage、geolocation等</li>
                <li><strong>検索・フィルタリング</strong> - ユーザー入力による動的処理</li>
              </ul>
            </div>
          </div>

          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#c8e6c9',
            borderRadius: '6px'
          }}>
            <h4 style={{ 
              margin: '0 0 0.5rem 0', 
              color: '#1b5e20',
              fontSize: '1rem'
            }}>
              ⚡ パフォーマンス最適化のポイント
            </h4>
            <ul style={{ 
              margin: 0, 
              paddingLeft: '1.2rem',
              color: '#1b5e20',
              fontSize: '0.875rem'
            }}>
              <li><strong>Server Component:</strong> Next.jsキャッシュ、並列データ取得、適切なrevalidate設定</li>
              <li><strong>Client Component:</strong> デバウンス処理、メモ化、適切な依存配列設定</li>
              <li><strong>ハイブリッド:</strong> Server ComponentからClient Componentへのprops渡し</li>
            </ul>
          </div>

          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#c8e6c9',
            borderRadius: '6px',
            textAlign: 'center'
          }}>
            <p style={{ 
              margin: 0, 
              color: '#1b5e20',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}>
              🚀 次のステップ: この知識を活用して、実際のプロジェクトで適切なデータフェッチング手法を選択し、
              パフォーマンスとユーザー体験の両方を最適化してみましょう！
            </p>
          </div>
        </div>
      </section>

      {/* 技術的な詳細セクション */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            margin: '0 0 1.5rem 0', 
            color: '#333',
            fontSize: '1.5rem'
          }}>
            🔧 技術的な実装詳細
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              border: '1px solid #dee2e6'
            }}>
              <h3 style={{ 
                margin: '0 0 0.75rem 0', 
                color: '#495057',
                fontSize: '1rem'
              }}>
                📦 使用技術
              </h3>
              <ul style={{ 
                margin: 0, 
                paddingLeft: '1.2rem',
                fontSize: '0.875rem',
                color: '#6c757d'
              }}>
                <li>Next.js 15.4.5 (App Router)</li>
                <li>TypeScript (型安全性)</li>
                <li>JSONPlaceholder API (外部データ)</li>
                <li>React Hooks (useState, useEffect, useCallback)</li>
                <li>Next.js キャッシュ機能</li>
              </ul>
            </div>

            <div style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              border: '1px solid #dee2e6'
            }}>
              <h3 style={{ 
                margin: '0 0 0.75rem 0', 
                color: '#495057',
                fontSize: '1rem'
              }}>
                🛠️ 実装パターン
              </h3>
              <ul style={{ 
                margin: 0, 
                paddingLeft: '1.2rem',
                fontSize: '0.875rem',
                color: '#6c757d'
              }}>
                <li>エラーハンドリング (try-catch)</li>
                <li>ローディング状態管理</li>
                <li>デバウンス処理 (検索機能)</li>
                <li>並列データ取得 (Promise.all)</li>
                <li>リアルタイム更新 (setInterval)</li>
              </ul>
            </div>

            <div style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              border: '1px solid #dee2e6'
            }}>
              <h3 style={{ 
                margin: '0 0 0.75rem 0', 
                color: '#495057',
                fontSize: '1rem'
              }}>
                📊 学習効果
              </h3>
              <ul style={{ 
                margin: 0, 
                paddingLeft: '1.2rem',
                fontSize: '0.875rem',
                color: '#6c757d'
              }}>
                <li>適切な手法選択の判断力</li>
                <li>パフォーマンス最適化の理解</li>
                <li>エラー処理の実装スキル</li>
                <li>TypeScript活用能力</li>
                <li>実践的な開発経験</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}