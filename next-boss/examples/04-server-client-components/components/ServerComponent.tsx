import { getUsers, getPosts, User, Post } from '@/lib/data'

/**
 * Server Componentの例
 * 
 * このコンポーネントはサーバーサイドで実行されます。
 * 以下の特徴があります：
 * 
 * ✅ できること：
 * - サーバーサイドでのデータフェッチング
 * - データベースへの直接アクセス
 * - 環境変数やシークレットへのアクセス
 * - SEO対応（検索エンジンがコンテンツを認識）
 * - 初期ページロードの高速化
 * - バンドルサイズの削減
 * 
 * ❌ できないこと：
 * - useState、useEffect等のReact Hooks
 * - ブラウザ専用API（localStorage、sessionStorage等）
 * - イベントハンドラー（onClick、onChange等）
 * - ユーザーインタラクション
 */

/**
 * ユーザー一覧を表示するServer Component
 */
export async function UserList() {
  // サーバーサイドでデータを取得
  // この処理はビルド時またはリクエスト時に実行される
  const users = await getUsers()

  return (
    <div style={{
      backgroundColor: '#e0f2fe',
      border: '2px solid #0277bd',
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
        <h3 style={{ margin: 0, color: '#0277bd' }}>
          Server Component - ユーザー一覧
        </h3>
      </div>
      
      <p style={{ 
        color: '#01579b', 
        fontSize: '0.875rem',
        marginBottom: '1rem',
        backgroundColor: '#b3e5fc',
        padding: '0.5rem',
        borderRadius: '4px'
      }}>
        💡 このコンポーネントはサーバーサイドで実行され、データはビルド時またはリクエスト時に取得されます。
      </p>

      <div style={{ 
        display: 'grid', 
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
      }}>
        {users.map((user: User) => (
          <div
            key={user.id}
            style={{
              backgroundColor: 'white',
              padding: '1rem',
              borderRadius: '6px',
              border: '1px solid #b3e5fc'
            }}
          >
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#0277bd' }}>
              {user.name}
            </h4>
            <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', color: '#666' }}>
              📧 {user.email}
            </p>
            <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', color: '#666' }}>
              🌐 {user.website}
            </p>
            <p style={{ margin: '0', fontSize: '0.875rem', color: '#666' }}>
              🏢 {user.company.name}
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
        padding: '0.75rem',
        backgroundColor: '#b3e5fc',
        borderRadius: '4px',
        fontSize: '0.875rem',
        color: '#01579b'
      }}>
        <strong>Server Componentの特徴：</strong>
        <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
          <li>サーバーサイドで実行されるため、初期ページロードが高速</li>
          <li>データベースやAPIに直接アクセス可能</li>
          <li>SEO対応（検索エンジンがコンテンツを認識）</li>
          <li>バンドルサイズに含まれないため、クライアントサイドのJSが軽量</li>
        </ul>
      </div>
    </div>
  )
}

/**
 * 投稿一覧を表示するServer Component
 */
export async function PostList() {
  // サーバーサイドでデータを取得
  const posts = await getPosts()

  return (
    <div style={{
      backgroundColor: '#e8f5e8',
      border: '2px solid #2e7d32',
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
        <h3 style={{ margin: 0, color: '#2e7d32' }}>
          Server Component - 投稿一覧
        </h3>
      </div>

      <p style={{ 
        color: '#1b5e20', 
        fontSize: '0.875rem',
        marginBottom: '1rem',
        backgroundColor: '#c8e6c9',
        padding: '0.5rem',
        borderRadius: '4px'
      }}>
        💡 この投稿データもサーバーサイドで取得され、キャッシュされています。
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {posts.map((post: Post) => (
          <article
            key={post.id}
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '6px',
              border: '1px solid #c8e6c9'
            }}
          >
            <h4 style={{ 
              margin: '0 0 0.75rem 0', 
              color: '#2e7d32',
              fontSize: '1.1rem'
            }}>
              {post.title}
            </h4>
            <p style={{ 
              margin: '0 0 0.5rem 0', 
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
              <span>投稿ID: {post.id}</span>
              <span>ユーザーID: {post.userId}</span>
            </div>
          </article>
        ))}
      </div>

      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: '#c8e6c9',
        borderRadius: '4px',
        fontSize: '0.875rem',
        color: '#1b5e20'
      }}>
        <strong>データフェッチングの利点：</strong>
        <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
          <li>サーバーサイドでデータを取得するため、ローディング状態が不要</li>
          <li>Next.jsの自動キャッシュ機能により、パフォーマンスが向上</li>
          <li>データベースやAPIキーに直接アクセス可能</li>
          <li>初期HTMLにデータが含まれるため、SEOに有利</li>
        </ul>
      </div>
    </div>
  )
}

/**
 * 現在時刻を表示するServer Component
 * 
 * サーバーサイドで実行されるため、この時刻は
 * ページがレンダリングされた時点の時刻になります。
 */
export function ServerTime() {
  // サーバーサイドで現在時刻を取得
  const serverTime = new Date().toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

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
          Server Component - サーバー時刻
        </h3>
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '6px',
        border: '1px solid #ffcc02',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#e65100' }}>
          サーバーでレンダリングされた時刻：
        </p>
        <p style={{ 
          margin: 0, 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          color: '#f57c00',
          fontFamily: 'monospace'
        }}>
          {serverTime}
        </p>
      </div>

      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: '#ffcc02',
        borderRadius: '4px',
        fontSize: '0.875rem',
        color: '#e65100'
      }}>
        <strong>注意：</strong> この時刻はページがサーバーでレンダリングされた時点のものです。
        ページをリロードすると更新されますが、クライアントサイドでは更新されません。
      </div>
    </div>
  )
}