import type { Metadata } from 'next'
import Link from 'next/link'

/**
 * Contactページのメタデータ
 */
export const metadata: Metadata = {
  title: 'Contact | ページとルーティング',
  description: 'お問い合わせページ - Next.jsルーティング学習例',
  keywords: ['Next.js', 'Contact', 'お問い合わせ', '静的ページ'],
}

/**
 * Contactページコンポーネント
 * 
 * もう一つの静的ルートの例です。
 * app/contact/page.tsx ファイルが /contact URLにマッピングされます。
 */
export default function ContactPage() {
  return (
    <div>
      {/* ページタイトル */}
      <h1 style={{ color: '#dc2626', marginBottom: '2rem' }}>
        📞 Contact - お問い合わせ
      </h1>

      {/* 説明セクション */}
      <section style={{ marginBottom: '3rem' }}>
        <p style={{ 
          fontSize: '1.1rem', 
          lineHeight: '1.8',
          backgroundColor: '#fef2f2',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #fecaca'
        }}>
          これも静的ルートの例です。
          <code style={{ 
            backgroundColor: '#f3f4f6', 
            padding: '0.25rem 0.5rem', 
            borderRadius: '4px',
            margin: '0 0.25rem'
          }}>
            app/contact/page.tsx
          </code>
          ファイルが
          <code style={{ 
            backgroundColor: '#f3f4f6', 
            padding: '0.25rem 0.5rem', 
            borderRadius: '4px',
            margin: '0 0.25rem'
          }}>
            /contact
          </code>
          URLにマッピングされています。
        </p>
      </section>

      {/* お問い合わせフォーム（デモ用） */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>📝 お問い合わせフォーム（デモ）</h2>
        <div style={{ 
          backgroundColor: '#f9fafb', 
          padding: '2rem', 
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: 'bold',
                color: '#374151'
              }}>
                お名前
              </label>
              <input 
                type="text" 
                style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
                placeholder="山田太郎"
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: 'bold',
                color: '#374151'
              }}>
                メールアドレス
              </label>
              <input 
                type="email" 
                style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
                placeholder="example@email.com"
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: 'bold',
                color: '#374151'
              }}>
                お問い合わせ内容
              </label>
              <textarea 
                rows={5}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
                placeholder="お問い合わせ内容をご記入ください..."
              />
            </div>
            
            <button 
              type="button"
              style={{ 
                padding: '0.75rem 2rem',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                cursor: 'pointer',
                alignSelf: 'flex-start'
              }}
            >
              送信する（デモ）
            </button>
          </form>
        </div>
      </section>

      {/* 静的ルートの利点 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>💡 静的ページの利点</h2>
        <div style={{ 
          display: 'grid', 
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
        }}>
          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: '#ecfdf5', 
            borderRadius: '8px',
            border: '1px solid #86efac'
          }}>
            <h3 style={{ color: '#059669', marginTop: 0 }}>⚡ パフォーマンス</h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
              <li>事前レンダリングによる高速表示</li>
              <li>CDNでのキャッシュが可能</li>
              <li>初回ロード時間の短縮</li>
            </ul>
          </div>
          
          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: '#fef3c7', 
            borderRadius: '8px',
            border: '1px solid #fbbf24'
          }}>
            <h3 style={{ color: '#d97706', marginTop: 0 }}>🔍 SEO</h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
              <li>検索エンジンによる完全なインデックス</li>
              <li>メタデータの適切な設定</li>
              <li>ソーシャルメディアでの共有対応</li>
            </ul>
          </div>
          
          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: '#dbeafe', 
            borderRadius: '8px',
            border: '1px solid #60a5fa'
          }}>
            <h3 style={{ color: '#2563eb', marginTop: 0 }}>🛠️ 開発効率</h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
              <li>シンプルなファイル構造</li>
              <li>自動的なルーティング</li>
              <li>TypeScriptによる型安全性</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 実装のポイント */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>🎯 実装のポイント</h2>
        <div style={{ 
          backgroundColor: '#f0f9ff', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #7dd3fc'
        }}>
          <h3 style={{ marginTop: 0 }}>1. ファイル配置</h3>
          <p>
            <code>app/contact/page.tsx</code> ファイルを作成するだけで、
            自動的に <code>/contact</code> ルートが作成されます。
          </p>
          
          <h3>2. メタデータ設定</h3>
          <p>
            各ページで個別の <code>metadata</code> を export することで、
            SEO対応とソーシャルメディア対応が可能です。
          </p>
          
          <h3>3. レイアウト継承</h3>
          <p>
            ルートレイアウト（<code>app/layout.tsx</code>）が自動的に適用され、
            ナビゲーションやフッターが共通で表示されます。
          </p>
        </div>
      </section>

      {/* ナビゲーション */}
      <section>
        <h2>🧭 他のページも確認してみよう</h2>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          flexWrap: 'wrap',
          marginTop: '1rem'
        }}>
          <Link 
            href="/" 
            style={{ 
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              display: 'inline-block'
            }}
          >
            🏠 ホームに戻る
          </Link>
          
          <Link 
            href="/about" 
            style={{ 
              padding: '0.75rem 1.5rem',
              backgroundColor: '#059669',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              display: 'inline-block'
            }}
          >
            📋 About ページ
          </Link>
          
          <Link 
            href="/blog" 
            style={{ 
              padding: '0.75rem 1.5rem',
              backgroundColor: '#dc2626',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              display: 'inline-block'
            }}
          >
            📝 Blog ページ（動的ルート）
          </Link>
        </div>
      </section>
    </div>
  )
}