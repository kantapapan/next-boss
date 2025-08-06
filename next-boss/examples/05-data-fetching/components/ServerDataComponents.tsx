/**
 * Server Componentでのデータフェッチング例
 * 
 * これらのコンポーネントはサーバーサイドで実行され、
 * ビルド時またはリクエスト時にデータを取得します。
 * 
 * 🔵 Server Componentの特徴：
 * - サーバーサイドで実行される
 * - データベースやAPIに直接アクセス可能
 * - SEO対応（初期HTMLにデータが含まれる）
 * - Next.jsの自動キャッシュ機能を活用
 * - バンドルサイズに含まれない
 */

import { getUsers, getPosts, getPost, getPostComments } from '@/lib/api'
import { User, Post, Comment } from '@/types'

/**
 * ユーザー一覧を表示するServer Component
 * 
 * サーバーサイドでユーザーデータを取得し、
 * 初期HTMLに含めて高速な表示を実現します。
 */
export async function UserListServer() {
  // サーバーサイドでデータを取得
  // この処理はビルド時またはリクエスト時に実行される
  const users = await getUsers()

  return (
    <div style={{
      backgroundColor: '#e3f2fd',
      border: '2px solid #1976d2',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '2rem'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '1rem' 
      }}>
        <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>🔵</span>
        <h3 style={{ margin: 0, color: '#1976d2' }}>
          Server Component - ユーザー一覧
        </h3>
      </div>
      
      <div style={{ 
        marginBottom: '1rem',
        padding: '0.75rem',
        backgroundColor: '#bbdefb',
        borderRadius: '4px',
        fontSize: '0.875rem',
        color: '#0d47a1'
      }}>
        <strong>💡 Server Componentの利点：</strong>
        <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
          <li>サーバーサイドでデータを取得するため、初期表示が高速</li>
          <li>SEO対応（検索エンジンがコンテンツを認識）</li>
          <li>Next.jsの自動キャッシュ機能でパフォーマンス向上</li>
          <li>クライアントサイドのJavaScriptバンドルサイズを削減</li>
        </ul>
      </div>

      <div style={{ 
        display: 'grid', 
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
      }}>
        {users.slice(0, 6).map((user: User) => (
          <div
            key={user.id}
            style={{
              backgroundColor: 'white',
              padding: '1rem',
              borderRadius: '6px',
              border: '1px solid #bbdefb',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#1976d2' }}>
              {user.name}
            </h4>
            <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', color: '#666' }}>
              📧 {user.email}
            </p>
            <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', color: '#666' }}>
              🌐 {user.website}
            </p>
            <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', color: '#666' }}>
              🏢 {user.company.name}
            </p>
            <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', color: '#666' }}>
              📍 {user.address.city}
            </p>
            <p style={{ 
              margin: '0.5rem 0 0 0', 
              fontSize: '0.75rem', 
              color: '#999',
              fontStyle: 'italic'
            }}>
              &ldquo;{user.company.catchPhrase}&rdquo;
            </p>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '1rem',
        padding: '0.5rem',
        backgroundColor: '#e3f2fd',
        borderRadius: '4px',
        fontSize: '0.75rem',
        color: '#0d47a1',
        textAlign: 'center'
      }}>
        💡 このデータはサーバーサイドで取得され、Next.jsによってキャッシュされています
      </div>
    </div>
  )
}

/**
 * 投稿一覧を表示するServer Component
 * 
 * 限定された数の投稿を取得し、パフォーマンスを最適化します。
 */
export async function PostListServer() {
  // 最初の8件の投稿のみを取得
  const posts = await getPosts(8)

  return (
    <div style={{
      backgroundColor: '#e8f5e8',
      border: '2px solid #388e3c',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '2rem'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '1rem' 
      }}>
        <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>🔵</span>
        <h3 style={{ margin: 0, color: '#388e3c' }}>
          Server Component - 投稿一覧
        </h3>
      </div>

      <div style={{ 
        marginBottom: '1rem',
        padding: '0.75rem',
        backgroundColor: '#c8e6c9',
        borderRadius: '4px',
        fontSize: '0.875rem',
        color: '#1b5e20'
      }}>
        <strong>🚀 パフォーマンス最適化：</strong>
        <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
          <li>必要な分だけのデータを取得（limit=8）</li>
          <li>Next.jsの自動キャッシュでリクエスト数を削減</li>
          <li>サーバーサイドレンダリングで初期表示を高速化</li>
        </ul>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {posts.map((post: Post) => (
          <article
            key={post.id}
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '6px',
              border: '1px solid #c8e6c9',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '0.75rem'
            }}>
              <h4 style={{ 
                margin: 0, 
                color: '#388e3c',
                fontSize: '1.1rem',
                flex: 1
              }}>
                {post.title}
              </h4>
              <span style={{
                backgroundColor: '#4caf50',
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                marginLeft: '1rem'
              }}>
                #{post.id}
              </span>
            </div>
            <p style={{ 
              margin: '0 0 0.75rem 0', 
              color: '#666',
              lineHeight: '1.5'
            }}>
              {post.body}
            </p>
            <div style={{ 
              fontSize: '0.75rem', 
              color: '#999',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>ユーザーID: {post.userId}</span>
              <span>📝 投稿</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

/**
 * 特定の投稿とそのコメントを表示するServer Component
 * 
 * 複数のAPIエンドポイントからデータを取得し、
 * 関連するデータを組み合わせて表示します。
 */
export async function PostWithCommentsServer({ postId }: { postId: number }) {
  // 並列でデータを取得してパフォーマンスを向上
  const [post, comments] = await Promise.all([
    getPost(postId),
    getPostComments(postId)
  ])

  return (
    <div style={{
      backgroundColor: '#fff3e0',
      border: '2px solid #f57c00',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '2rem'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '1rem' 
      }}>
        <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>🔵</span>
        <h3 style={{ margin: 0, color: '#f57c00' }}>
          Server Component - 投稿詳細とコメント
        </h3>
      </div>

      <div style={{ 
        marginBottom: '1.5rem',
        padding: '0.75rem',
        backgroundColor: '#ffcc02',
        borderRadius: '4px',
        fontSize: '0.875rem',
        color: '#e65100'
      }}>
        <strong>⚡ 並列データ取得：</strong>
        Promise.allを使用して投稿とコメントを同時に取得し、
        待機時間を最小化しています。
      </div>

      {/* 投稿詳細 */}
      <article style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '6px',
        border: '1px solid #ffcc02',
        marginBottom: '1.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h4 style={{ 
          margin: '0 0 1rem 0', 
          color: '#f57c00',
          fontSize: '1.3rem'
        }}>
          {post.title}
        </h4>
        <p style={{ 
          margin: '0 0 1rem 0', 
          color: '#333',
          lineHeight: '1.6',
          fontSize: '1rem'
        }}>
          {post.body}
        </p>
        <div style={{ 
          fontSize: '0.875rem', 
          color: '#666',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '0.75rem',
          borderTop: '1px solid #ffcc02'
        }}>
          <span>投稿ID: {post.id}</span>
          <span>ユーザーID: {post.userId}</span>
          <span>💬 {comments.length} コメント</span>
        </div>
      </article>

      {/* コメント一覧 */}
      <div>
        <h5 style={{ 
          margin: '0 0 1rem 0', 
          color: '#f57c00',
          fontSize: '1.1rem'
        }}>
          💬 コメント ({comments.length}件)
        </h5>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {comments.slice(0, 5).map((comment: Comment) => (
            <div
              key={comment.id}
              style={{
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '6px',
                border: '1px solid #ffcc02',
                borderLeft: '4px solid #f57c00'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '0.5rem'
              }}>
                <h6 style={{ 
                  margin: 0, 
                  color: '#f57c00',
                  fontSize: '0.95rem',
                  fontWeight: 'bold'
                }}>
                  {comment.name}
                </h6>
                <span style={{
                  fontSize: '0.75rem',
                  color: '#999'
                }}>
                  #{comment.id}
                </span>
              </div>
              <p style={{ 
                margin: '0 0 0.5rem 0', 
                fontSize: '0.875rem',
                color: '#666'
              }}>
                📧 {comment.email}
              </p>
              <p style={{ 
                margin: 0, 
                color: '#333',
                lineHeight: '1.4',
                fontSize: '0.9rem'
              }}>
                {comment.body}
              </p>
            </div>
          ))}
          
          {comments.length > 5 && (
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              color: '#666',
              fontSize: '0.875rem',
              fontStyle: 'italic'
            }}>
              ... さらに {comments.length - 5} 件のコメントがあります
            </div>
          )}
        </div>
      </div>
    </div>
  )
}