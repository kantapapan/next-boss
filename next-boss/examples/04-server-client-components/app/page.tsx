import { UserList, PostList, ServerTime } from '@/components/ServerComponent'
import { InteractiveCounter, DynamicComments, RealTimeDisplay } from '@/components/ClientComponent'
import { ComparisonDemo } from '@/components/ComparisonDemo'

/**
 * メインページ - Server ComponentsとClient Componentsのデモ
 * 
 * このページ自体はServer Componentとして実装されており、
 * Server ComponentsとClient Componentsを組み合わせた
 * ハイブリッド構成のデモンストレーションです。
 * 
 * 🏗️ アーキテクチャの特徴：
 * - このページ（HomePage）: Server Component
 * - UserList, PostList, ServerTime: Server Components
 * - InteractiveCounter, DynamicComments, RealTimeDisplay: Client Components
 * - ComparisonDemo: Client Component（インタラクティブな比較表）
 * 
 * 📊 パフォーマンスの利点：
 * 1. Server Componentsは初期HTMLに含まれるため、SEO対応
 * 2. Client Componentsは必要な部分のみJavaScriptを送信
 * 3. ハイブリッド構成により、最適なユーザー体験を実現
 * 
 * 🔄 データフローの説明：
 * 1. サーバーサイドでServer Componentsが実行され、データを取得
 * 2. 初期HTMLが生成され、ブラウザに送信
 * 3. ブラウザでClient ComponentsのJavaScriptが実行
 * 4. ユーザーインタラクションに応じてClient Componentsが更新
 * 
 * このページは以下の構成になっています：
 * 1. 概要説明（静的コンテンツ - Server Component）
 * 2. Server Componentsの例（データフェッチング含む）
 * 3. Client Componentsの例（インタラクティブ機能）
 * 4. 比較デモ（動的な比較表 - Client Component）
 * 5. 学習のまとめ（静的コンテンツ - Server Component）
 */

export default function HomePage() {
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
            📚 Server ComponentsとClient Componentsの学習
          </h2>
          
          <p style={{ 
            margin: '0 0 1rem 0', 
            fontSize: '1.1rem',
            color: '#555',
            lineHeight: '1.6'
          }}>
            Next.js 13以降のApp Routerでは、コンポーネントを<strong>Server Components</strong>と
            <strong>Client Components</strong>に分けて考えます。
            それぞれに異なる特徴と用途があり、適切に使い分けることで高性能なWebアプリケーションを構築できます。
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
                color: '#0277bd',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>🔵</span>
                Server Components
              </h3>
              <ul style={{ 
                margin: 0, 
                paddingLeft: '1.2rem',
                color: '#01579b'
              }}>
                <li>サーバーサイドで実行</li>
                <li>データベース直接アクセス可能</li>
                <li>SEO対応（初期HTML生成）</li>
                <li>バンドルサイズ削減</li>
                <li>高速な初期表示</li>
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
                Client Components
              </h3>
              <ul style={{ 
                margin: 0, 
                paddingLeft: '1.2rem',
                color: '#e65100'
              }}>
                <li>ブラウザで実行</li>
                <li>React Hooks使用可能</li>
                <li>ユーザーインタラクション対応</li>
                <li>リアルタイム更新</li>
                <li>ブラウザAPI利用可能</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Server Componentsセクション */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ 
          margin: '0 0 1.5rem 0', 
          color: '#0277bd',
          fontSize: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ fontSize: '2rem' }}>🔵</span>
          Server Components の実例
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
            💡 以下のコンポーネントはサーバーサイドで実行され、ページの初期表示時にデータが取得されます。
            ページのソースを表示すると、HTMLに直接データが含まれていることが確認できます。
          </p>
        </div>

        {/* Server Componentの例を表示 */}
        <UserList />
        <PostList />
        <ServerTime />
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
          Client Components の実例
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
            💡 以下のコンポーネントはブラウザで実行され、ユーザーのインタラクションやリアルタイム更新に対応します。
            開発者ツールのコンソールで、クライアントサイドでの処理を確認できます。
          </p>
        </div>

        {/* Client Componentの例を表示 */}
        <InteractiveCounter />
        <DynamicComments />
        <RealTimeDisplay />
      </section>

      {/* 比較デモセクション */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ 
          margin: '0 0 1.5rem 0', 
          color: '#333',
          fontSize: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ fontSize: '2rem' }}>⚖️</span>
          詳細比較
        </h2>
        
        <ComparisonDemo />
      </section>

      {/* 学習のまとめセクション */}
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
            学習のまとめ
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
                🎯 適切な選択の指針
              </h3>
              <ul style={{ 
                margin: 0, 
                paddingLeft: '1.2rem',
                color: '#1b5e20',
                lineHeight: '1.6'
              }}>
                <li><strong>Server Component</strong>を選ぶべき場合：
                  <ul style={{ marginTop: '0.5rem' }}>
                    <li>静的なコンテンツの表示</li>
                    <li>初期データの取得と表示</li>
                    <li>SEOが重要なページ</li>
                    <li>データベースへの直接アクセスが必要</li>
                  </ul>
                </li>
                <li style={{ marginTop: '1rem' }}><strong>Client Component</strong>を選ぶべき場合：
                  <ul style={{ marginTop: '0.5rem' }}>
                    <li>ユーザーインタラクションが必要</li>
                    <li>動的な状態管理が必要</li>
                    <li>リアルタイム更新が必要</li>
                    <li>ブラウザAPIの使用が必要</li>
                  </ul>
                </li>
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
                💡 ベストプラクティス
              </h3>
              <ul style={{ 
                margin: 0, 
                paddingLeft: '1.2rem',
                color: '#1b5e20',
                lineHeight: '1.6'
              }}>
                <li>デフォルトはServer Componentを使用</li>
                <li>必要な場合のみClient Componentを使用</li>
                <li>Client Componentは可能な限り下位層に配置</li>
                <li>Server ComponentからClient Componentにpropsでデータを渡す</li>
                <li>パフォーマンスとユーザー体験のバランスを考慮</li>
              </ul>
            </div>
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
              🚀 次のステップ: この知識を活用して、実際のプロジェクトでServer ComponentsとClient Componentsを適切に使い分けてみましょう！
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}