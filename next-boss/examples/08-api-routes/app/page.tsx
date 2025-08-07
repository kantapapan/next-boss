/**
 * Home Page Component
 * 
 * API Routes学習用のメインページです。
 * 各APIエンドポイントの説明と使用例を表示します。
 */

import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#333', borderBottom: '2px solid #0070f3', paddingBottom: '0.5rem' }}>
          API Routes学習ガイド
        </h2>
        <p style={{ lineHeight: 1.6, color: '#666' }}>
          このアプリケーションでは、Next.js API Routesの基本的な使い方を学習できます。
          RESTful APIの設計原則に従って、ユーザーとブログ投稿の管理機能を実装しています。
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h3 style={{ color: '#333' }}>利用可能なAPIエンドポイント</h3>
        
        <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1rem' }}>
          {/* Health Check API */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#0070f3' }}>
              🏥 Health Check API
            </h4>
            <p style={{ margin: '0 0 1rem 0', color: '#666' }}>
              サーバーの稼働状況を確認するためのエンドポイント
            </p>
            <div style={{ backgroundColor: '#f8f9fa', padding: '0.5rem', borderRadius: '4px', fontFamily: 'monospace' }}>
              GET /api/health
            </div>
          </div>

          {/* Users API */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#0070f3' }}>
              👥 Users API
            </h4>
            <p style={{ margin: '0 0 1rem 0', color: '#666' }}>
              ユーザー情報の管理（作成・取得・更新・削除）
            </p>
            <div style={{ backgroundColor: '#f8f9fa', padding: '0.5rem', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9rem' }}>
              GET /api/users - 全ユーザー取得<br/>
              POST /api/users - ユーザー作成<br/>
              GET /api/users/[id] - 特定ユーザー取得<br/>
              PUT /api/users/[id] - ユーザー更新<br/>
              DELETE /api/users/[id] - ユーザー削除
            </div>
          </div>

          {/* Posts API */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#0070f3' }}>
              📝 Posts API
            </h4>
            <p style={{ margin: '0 0 1rem 0', color: '#666' }}>
              ブログ投稿の管理（作成・取得・更新・削除）
            </p>
            <div style={{ backgroundColor: '#f8f9fa', padding: '0.5rem', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9rem' }}>
              GET /api/posts - 全投稿取得（クエリパラメータ対応）<br/>
              POST /api/posts - 投稿作成<br/>
              GET /api/posts/[id] - 特定投稿取得<br/>
              PUT /api/posts/[id] - 投稿更新<br/>
              DELETE /api/posts/[id] - 投稿削除
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h3 style={{ color: '#333' }}>実践ページ</h3>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          実際にAPIを呼び出してデータを操作できるページです。
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link 
            href="/users" 
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#0070f3',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: '500'
            }}
          >
            ユーザー管理
          </Link>
          <Link 
            href="/posts" 
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#0070f3',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: '500'
            }}
          >
            投稿管理
          </Link>
          <Link 
            href="/api-test" 
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#28a745',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: '500'
            }}
          >
            API テスト
          </Link>
        </div>
      </section>

      <section>
        <h3 style={{ color: '#333' }}>学習のポイント</h3>
        <ul style={{ lineHeight: 1.8, color: '#666' }}>
          <li><strong>RESTful API設計:</strong> HTTPメソッド（GET, POST, PUT, DELETE）の適切な使い分け</li>
          <li><strong>エラーハンドリング:</strong> 適切なHTTPステータスコードとエラーメッセージの返却</li>
          <li><strong>バリデーション:</strong> リクエストデータの検証と安全性の確保</li>
          <li><strong>型安全性:</strong> TypeScriptを活用した型定義とランタイム安全性</li>
          <li><strong>レスポンス統一:</strong> 一貫したAPIレスポンス形式の実装</li>
        </ul>
      </section>
    </div>
  );
}