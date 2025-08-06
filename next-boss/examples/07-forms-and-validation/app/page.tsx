'use client';

import Link from 'next/link';

/**
 * メインページコンポーネント
 * 
 * フォームとバリデーションの各種例へのナビゲーションを提供します。
 * 学習者が段階的に理解できるよう、基本から応用まで順序立てて配置しています。
 */
export default function HomePage() {
  const examples = [
    {
      title: "基本的なフォーム",
      description: "HTMLフォーム要素とReactの制御コンポーネントの基本",
      href: "/basic-form",
      difficulty: "初級"
    },
    {
      title: "バリデーション付きフォーム",
      description: "Zodを使用したスキーマベースのバリデーション",
      href: "/validated-form",
      difficulty: "中級"
    },
    {
      title: "Server Actionsフォーム",
      description: "Next.js Server Actionsを使用したサーバーサイド処理",
      href: "/server-action-form",
      difficulty: "中級"
    },
    {
      title: "複雑なフォーム",
      description: "動的フィールドと複雑なバリデーションルール",
      href: "/complex-form",
      difficulty: "上級"
    }
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginTop: 0, color: '#333' }}>学習内容</h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          このセクションでは、Next.jsでのフォーム処理とバリデーションについて学習します。
          基本的なフォーム要素の扱いから、高度なバリデーション機能まで段階的に学んでいきましょう。
        </p>

        <div style={{ display: 'grid', gap: '20px' }}>
          {examples.map((example, index) => (
            <Link
              key={index}
              href={example.href}
              style={{
                display: 'block',
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '6px',
                textDecoration: 'none',
                color: 'inherit',
                border: '1px solid #e9ecef',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#e9ecef';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '10px'
              }}>
                <h3 style={{ margin: 0, color: '#0066cc' }}>
                  {example.title}
                </h3>
                <span style={{
                  fontSize: '12px',
                  padding: '4px 8px',
                  backgroundColor: example.difficulty === '初級' ? '#d4edda' :
                                   example.difficulty === '中級' ? '#fff3cd' : '#f8d7da',
                  color: example.difficulty === '初級' ? '#155724' :
                         example.difficulty === '中級' ? '#856404' : '#721c24',
                  borderRadius: '4px'
                }}>
                  {example.difficulty}
                </span>
              </div>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                {example.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div style={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginTop: 0, color: '#333' }}>学習のポイント</h3>
        <ul style={{ color: '#666', paddingLeft: '20px' }}>
          <li>制御コンポーネント（Controlled Components）の理解</li>
          <li>フォームの状態管理とイベントハンドリング</li>
          <li>クライアントサイドバリデーションの実装</li>
          <li>サーバーサイドバリデーションとエラーハンドリング</li>
          <li>ユーザビリティを考慮したフォーム設計</li>
          <li>アクセシビリティ対応</li>
        </ul>
      </div>
    </div>
  );
}