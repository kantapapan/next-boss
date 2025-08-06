# 04. データフェッチング

このドキュメントでは、Next.js 15のApp Routerにおける**データフェッチング**の手法について詳しく説明します。**Server Components**と**Client Components**でのデータ取得方法の違い、適切な使い分け、パフォーマンス最適化手法を学習します。

## 📚 学習目標

このセクションを完了すると、以下のことができるようになります：

- Server ComponentとClient Componentでのデータフェッチング手法の違いを理解する
- fetch APIとNext.jsキャッシュ機能を効果的に活用する
- useEffectとuseStateを使ったクライアントサイドデータフェッチングを実装する
- エラーハンドリングとローディング状態の適切な管理方法を身につける
- リアルタイムデータ更新とインタラクティブな機能を実装する
- パフォーマンス最適化手法（キャッシュ、並列取得、デバウンス）を適用する

## 🔄 データフェッチングの概要

Next.js 15のApp Routerでは、データフェッチングの方法がコンポーネントの種類によって大きく異なります：

- **Server Components**: サーバーサイドで実行され、ビルド時またはリクエスト時にデータを取得
- **Client Components**: ブラウザで実行され、ユーザーのインタラクションに応じてデータを取得

### データフェッチングの選択フローチャート

```
データフェッチングが必要な場面で：

1. 初期表示時に必要なデータか？
   ├─ YES → 2へ
   └─ NO → Client Component

2. SEO対応が重要か？
   ├─ YES → Server Component
   └─ NO → 3へ

3. ユーザーの操作に応じて変化するか？
   ├─ YES → Client Component
   └─ NO → Server Component

4. リアルタイム更新が必要か？
   ├─ YES → Client Component
   └─ NO → Server Component
```

## 🔵 Server Componentでのデータフェッチング

Server Componentは、サーバーサイドで実行されるため、データベースや外部APIに直接アクセスできます。Next.jsの強力なキャッシュ機能と組み合わせることで、高性能なアプリケーションを構築できます。

### 基本的な実装パターン

```typescript
// Server Component（デフォルト）
export async function UserList() {
  // サーバーサイドでデータを取得
  const users = await fetch('https://api.example.com/users', {
    next: { revalidate: 3600 } // 1時間キャッシュ
  }).then(res => res.json())

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

### Next.jsキャッシュ機能の活用

Next.js 15では、`fetch`関数に対して強力なキャッシュオプションが提供されています：

```typescript
// 1. 静的キャッシュ（ビルド時に取得、永続的にキャッシュ）
const staticData = await fetch('https://api.example.com/static-data')

// 2. 時間ベースの再検証（指定時間後に再取得）
const timeBasedData = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 } // 1時間ごとに再検証
})

// 3. タグベースの再検証（特定のタグで無効化）
const taggedData = await fetch('https://api.example.com/data', {
  next: { tags: ['users'] }
})

// 4. キャッシュを無効化（常に最新データを取得）
const freshData = await fetch('https://api.example.com/data', {
  cache: 'no-store'
})
```

### 並列データ取得

複数のAPIエンドポイントからデータを取得する場合は、`Promise.all`を使用して並列処理を行い、パフォーマンスを向上させます：

```typescript
export async function PostWithComments({ postId }: { postId: number }) {
  // 並列でデータを取得
  const [post, comments] = await Promise.all([
    fetch(`https://api.example.com/posts/${postId}`).then(res => res.json()),
    fetch(`https://api.example.com/posts/${postId}/comments`).then(res => res.json())
  ])

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      
      <h2>コメント ({comments.length}件)</h2>
      {comments.map(comment => (
        <div key={comment.id}>
          <h3>{comment.name}</h3>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  )
}
```

### エラーハンドリング

Server Componentでのエラーハンドリングは、try-catch文を使用します：

```typescript
export async function DataComponent() {
  try {
    const data = await fetch('https://api.example.com/data', {
      next: { revalidate: 3600 }
    })

    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`)
    }

    const result = await data.json()
    
    return (
      <div>
        {result.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    )
  } catch (error) {
    console.error('データの取得に失敗しました:', error)
    
    // フォールバックUIを表示
    return (
      <div>
        <p>データの読み込みに失敗しました。</p>
        <p>しばらく時間をおいて再度お試しください。</p>
      </div>
    )
  }
}
```

### Server Componentの利点

1. **高速な初期表示**: サーバーで事前レンダリングされるため、ユーザーは即座にコンテンツを見ることができます
2. **SEO対応**: 検索エンジンが初期HTMLのコンテンツを認識できます
3. **セキュリティ**: APIキーやデータベース接続情報をクライアントに露出しません
4. **バンドルサイズ削減**: サーバーサイドのコードはクライアントに送信されません
5. **自動キャッシュ**: Next.jsが自動的にリクエストをキャッシュし、パフォーマンスを最適化します

### Server Componentの制限事項

1. **React Hooks使用不可**: useState、useEffectなどのHooksは使用できません
2. **ブラウザAPI使用不可**: localStorage、sessionStorageなどにアクセスできません
3. **イベントハンドラー使用不可**: onClick、onChangeなどのイベント処理はできません
4. **リアルタイム更新不可**: ユーザーの操作に応じた動的な更新はできません

## 🟡 Client Componentでのデータフェッチング

Client Componentは、ブラウザで実行されるため、React Hooksを使用してユーザーのインタラクションに応じた動的なデータフェッチングが可能です。

### 基本的な実装パターン

```typescript
'use client'

import { useState, useEffect } from 'react'

interface User {
  id: number
  name: string
  email: string
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('https://api.example.com/users')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const userData = await response.json()
        setUsers(userData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'データの取得に失敗しました')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <div>読み込み中...</div>
  if (error) return <div>エラー: {error}</div>

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  )
}
```

### インタラクティブなデータフェッチング

ユーザーの操作に応じてデータを取得する例：

```typescript
'use client'

import { useState, useCallback } from 'react'

export function SearchComponent() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`https://api.example.com/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('検索エラー:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(query)
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="検索キーワードを入力..."
        />
        <button type="submit" disabled={loading}>
          {loading ? '検索中...' : '検索'}
        </button>
      </form>

      <div>
        {results.map((result: any) => (
          <div key={result.id}>
            <h3>{result.title}</h3>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### リアルタイムデータ更新

定期的にデータを更新する例：

```typescript
'use client'

import { useState, useEffect } from 'react'

export function RealTimeData() {
  const [data, setData] = useState(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (!isActive) return

    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/realtime-data')
        const newData = await response.json()
        setData(newData)
      } catch (error) {
        console.error('データ更新エラー:', error)
      }
    }

    // 初回実行
    fetchData()

    // 5秒ごとに更新
    const interval = setInterval(fetchData, 5000)

    return () => clearInterval(interval)
  }, [isActive])

  return (
    <div>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? '停止' : '開始'}
      </button>
      
      {data && (
        <div>
          <h3>リアルタイムデータ</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <p>最終更新: {new Date().toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  )
}
```

### デバウンス処理

ユーザーの入力に応じてリアルタイムで検索を行う場合、デバウンス処理を実装してAPIリクエスト数を削減します：

```typescript
'use client'

import { useState, useEffect, useCallback } from 'react'

export function DebouncedSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`https://api.example.com/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('検索エラー:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  // デバウンス処理：500ms後に検索実行
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [query, performSearch])

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="リアルタイム検索..."
      />
      
      {loading && <p>検索中...</p>}
      
      <div>
        {results.map((result: any) => (
          <div key={result.id}>
            <h3>{result.title}</h3>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Client Componentの利点

1. **インタラクティブ性**: ユーザーの操作に即座に応答できます
2. **動的な状態管理**: React Hooksを使用して複雑な状態を管理できます
3. **リアルタイム更新**: 定期的なデータ更新やWebSocket通信が可能です
4. **ブラウザAPI活用**: localStorage、geolocation等のブラウザ機能を利用できます
5. **柔軟なUX**: ローディング状態、エラー処理、プログレス表示などを自由に実装できます

### Client Componentの注意点

1. **初期表示の遅延**: JavaScriptの読み込みと実行が必要なため、初期表示が遅くなる可能性があります
2. **SEO制限**: 初期HTMLにコンテンツが含まれないため、SEOに不利な場合があります
3. **バンドルサイズ**: クライアントサイドのJavaScriptバンドルサイズが増加します
4. **セキュリティ**: APIキーなどの機密情報をクライアントに露出してはいけません

## ⚖️ 使い分けの指針

適切なデータフェッチング手法を選択するための詳細な指針：

### Server Componentを選ぶべき場合

#### ✅ 最適な使用場面

1. **初期データの表示**
   ```typescript
   // ブログ記事一覧、商品カタログなど
   export async function ProductList() {
     const products = await fetch('https://api.example.com/products', {
       next: { revalidate: 3600 }
     }).then(res => res.json())
     
     return (
       <div>
         {products.map(product => (
           <ProductCard key={product.id} product={product} />
         ))}
       </div>
     )
   }
   ```

2. **SEOが重要なページ**
   ```typescript
   // ランディングページ、商品詳細ページ
   export async function ProductDetail({ id }: { id: string }) {
     const product = await fetch(`https://api.example.com/products/${id}`, {
       next: { revalidate: 1800 }
     }).then(res => res.json())
     
     return (
       <div>
         <h1>{product.name}</h1>
         <p>{product.description}</p>
         <img src={product.image} alt={product.name} />
       </div>
     )
   }
   ```

3. **静的なコンテンツ**
   ```typescript
   // ヘッダー、フッター、ナビゲーション
   export async function Navigation() {
     const menuItems = await fetch('https://api.example.com/menu', {
       next: { revalidate: 86400 } // 24時間キャッシュ
     }).then(res => res.json())
     
     return (
       <nav>
         {menuItems.map(item => (
           <a key={item.id} href={item.url}>{item.title}</a>
         ))}
       </nav>
     )
   }
   ```

#### 📊 パフォーマンス指標
- **初期表示速度**: ⭐⭐⭐⭐⭐
- **SEO対応**: ⭐⭐⭐⭐⭐
- **バンドルサイズ**: ⭐⭐⭐⭐⭐（影響なし）

### Client Componentを選ぶべき場合

#### ✅ 最適な使用場面

1. **ユーザーインタラクション**
   ```typescript
   'use client'
   
   export function InteractiveForm() {
     const [formData, setFormData] = useState({})
     const [errors, setErrors] = useState({})
     
     const handleSubmit = async (e) => {
       e.preventDefault()
       // フォーム送信処理
     }
     
     return (
       <form onSubmit={handleSubmit}>
         {/* フォーム要素 */}
       </form>
     )
   }
   ```

2. **リアルタイム機能**
   ```typescript
   'use client'
   
   export function LiveChat() {
     const [messages, setMessages] = useState([])
     
     useEffect(() => {
       const ws = new WebSocket('ws://localhost:8080')
       ws.onmessage = (event) => {
         setMessages(prev => [...prev, JSON.parse(event.data)])
       }
       return () => ws.close()
     }, [])
     
     return (
       <div>
         {/* チャット表示 */}
       </div>
     )
   }
   ```

3. **動的な状態管理**
   ```typescript
   'use client'
   
   export function ShoppingCart() {
     const [items, setItems] = useState([])
     const [total, setTotal] = useState(0)
     
     const addItem = (product) => {
       setItems(prev => [...prev, product])
       setTotal(prev => prev + product.price)
     }
     
     return (
       <div>
         {/* カート表示 */}
       </div>
     )
   }
   ```

#### 📊 パフォーマンス指標
- **インタラクティブ性**: ⭐⭐⭐⭐⭐
- **リアルタイム更新**: ⭐⭐⭐⭐⭐
- **ユーザー体験**: ⭐⭐⭐⭐⭐

## 🔄 ハイブリッド構成パターン

実際のアプリケーションでは、Server ComponentとClient Componentを組み合わせて使用することが一般的です。

### パターン1: Server Component + Client Component

```typescript
// Server Component（親）
export async function BlogPost({ id }: { id: string }) {
  const post = await fetch(`https://api.example.com/posts/${id}`, {
    next: { revalidate: 3600 }
  }).then(res => res.json())
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      
      {/* Client Componentを組み込み */}
      <LikeButton postId={id} initialLikes={post.likes} />
      <CommentSection postId={id} />
    </article>
  )
}

// Client Component（子）
'use client'

export function LikeButton({ postId, initialLikes }: {
  postId: string
  initialLikes: number
}) {
  const [likes, setLikes] = useState(initialLikes)
  const [loading, setLoading] = useState(false)
  
  const handleLike = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST'
      })
      const data = await response.json()
      setLikes(data.likes)
    } catch (error) {
      console.error('いいねの処理に失敗しました:', error)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <button onClick={handleLike} disabled={loading}>
      👍 {likes} {loading && '...'}
    </button>
  )
}
```

### パターン2: データ受け渡し最適化

```typescript
// Server Component
export async function ProductPage({ id }: { id: string }) {
  const [product, reviews, relatedProducts] = await Promise.all([
    fetch(`https://api.example.com/products/${id}`).then(res => res.json()),
    fetch(`https://api.example.com/products/${id}/reviews`).then(res => res.json()),
    fetch(`https://api.example.com/products/${id}/related`).then(res => res.json())
  ])
  
  return (
    <div>
      <ProductInfo product={product} />
      
      {/* データをpropsで渡す */}
      <ReviewSection 
        reviews={reviews} 
        productId={id}
      />
      
      <RelatedProducts products={relatedProducts} />
    </div>
  )
}

// Client Component
'use client'

export function ReviewSection({ reviews, productId }: {
  reviews: Review[]
  productId: string
}) {
  const [localReviews, setLocalReviews] = useState(reviews)
  const [newReview, setNewReview] = useState('')
  
  const addReview = async (reviewText: string) => {
    try {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: reviewText })
      })
      const review = await response.json()
      setLocalReviews(prev => [review, ...prev])
      setNewReview('')
    } catch (error) {
      console.error('レビューの投稿に失敗しました:', error)
    }
  }
  
  return (
    <div>
      <ReviewForm onSubmit={addReview} />
      <ReviewList reviews={localReviews} />
    </div>
  )
}
```

## 🚨 よくある間違いと対策

### 間違い1: 不必要なClient Component化

```typescript
// ❌ 悪い例：静的コンテンツなのにClient Component
'use client'

export function StaticHeader() {
  return (
    <header>
      <h1>サイトタイトル</h1>
      <nav>...</nav>
    </header>
  )
}

// ✅ 良い例：Server Componentで十分
export function StaticHeader() {
  return (
    <header>
      <h1>サイトタイトル</h1>
      <nav>...</nav>
    </header>
  )
}
```

### 間違い2: Server ComponentでのHooks使用

```typescript
// ❌ 悪い例：Server ComponentでuseState
import { useState } from 'react' // エラー！

export function ServerCounter() {
  const [count, setCount] = useState(0) // エラー！
  
  return <div>{count}</div>
}

// ✅ 良い例：Client Componentで状態管理
'use client'

import { useState } from 'react'

export function ClientCounter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        増加
      </button>
    </div>
  )
}
```

### 間違い3: Client ComponentでのServer専用API使用

```typescript
// ❌ 悪い例：Client Componentでサーバー環境変数
'use client'

export function BadComponent() {
  const apiKey = process.env.SECRET_API_KEY // 危険！
  
  return <div>...</div>
}

// ✅ 良い例：Server ComponentまたはAPI Route経由
export async function GoodComponent() {
  const apiKey = process.env.SECRET_API_KEY // 安全
  const data = await fetchWithApiKey(apiKey)
  
  return <div>{data}</div>
}
```

### 間違い4: 過度なAPIリクエスト

```typescript
// ❌ 悪い例：デバウンス処理なし
'use client'

export function BadSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  
  useEffect(() => {
    if (query) {
      fetch(`/api/search?q=${query}`) // 文字入力のたびにリクエスト
        .then(res => res.json())
        .then(setResults)
    }
  }, [query]) // 危険！
  
  return (
    <input 
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}

// ✅ 良い例：デバウンス処理あり
'use client'

export function GoodSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        fetch(`/api/search?q=${query}`)
          .then(res => res.json())
          .then(setResults)
      }
    }, 500) // 500ms後に実行
    
    return () => clearTimeout(timeoutId)
  }, [query])
  
  return (
    <input 
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}
```

## 🔧 パフォーマンス最適化手法

### Server Component最適化

1. **適切なキャッシュ設定**
   ```typescript
   // 静的データ（変更頻度が低い）
   const staticData = await fetch('https://api.example.com/static', {
     next: { revalidate: 86400 } // 24時間
   })
   
   // 動的データ（変更頻度が高い）
   const dynamicData = await fetch('https://api.example.com/dynamic', {
     next: { revalidate: 300 } // 5分
   })
   
   // リアルタイムデータ（常に最新）
   const realtimeData = await fetch('https://api.example.com/realtime', {
     cache: 'no-store'
   })
   ```

2. **並列データ取得**
   ```typescript
   // ❌ 悪い例：順次実行
   const user = await fetch('/api/user').then(res => res.json())
   const posts = await fetch('/api/posts').then(res => res.json())
   const comments = await fetch('/api/comments').then(res => res.json())
   
   // ✅ 良い例：並列実行
   const [user, posts, comments] = await Promise.all([
     fetch('/api/user').then(res => res.json()),
     fetch('/api/posts').then(res => res.json()),
     fetch('/api/comments').then(res => res.json())
   ])
   ```

3. **条件付きデータ取得**
   ```typescript
   export async function ConditionalData({ userId }: { userId?: string }) {
     // 必要な場合のみデータを取得
     const userData = userId 
       ? await fetch(`/api/users/${userId}`).then(res => res.json())
       : null
     
     return (
       <div>
         {userData ? (
           <UserProfile user={userData} />
         ) : (
           <GuestMessage />
         )}
       </div>
     )
   }
   ```

### Client Component最適化

1. **メモ化の活用**
   ```typescript
   'use client'
   
   import { useState, useCallback, useMemo } from 'react'
   
   export function OptimizedComponent({ items }: { items: Item[] }) {
     const [filter, setFilter] = useState('')
     
     // 計算結果をメモ化
     const filteredItems = useMemo(() => 
       items.filter(item => item.name.includes(filter)),
       [items, filter]
     )
     
     // 関数をメモ化
     const handleFilterChange = useCallback((value: string) => {
       setFilter(value)
     }, [])
     
     return (
       <div>
         <input 
           value={filter}
           onChange={(e) => handleFilterChange(e.target.value)}
         />
         {filteredItems.map(item => (
           <div key={item.id}>{item.name}</div>
         ))}
       </div>
     )
   }
   ```

2. **適切な依存配列**
   ```typescript
   'use client'
   
   export function DataComponent({ userId }: { userId: string }) {
     const [data, setData] = useState(null)
     
     useEffect(() => {
       const fetchData = async () => {
         const response = await fetch(`/api/users/${userId}/data`)
         const result = await response.json()
         setData(result)
       }
       
       fetchData()
     }, [userId]) // userIdが変更された時のみ実行
     
     return <div>{/* データ表示 */}</div>
   }
   ```

3. **リクエストのキャンセル**
   ```typescript
   'use client'
   
   export function CancellableRequest() {
     const [data, setData] = useState(null)
     const [loading, setLoading] = useState(false)
     
     useEffect(() => {
       const abortController = new AbortController()
       
       const fetchData = async () => {
         setLoading(true)
         try {
           const response = await fetch('/api/data', {
             signal: abortController.signal
           })
           const result = await response.json()
           setData(result)
         } catch (error) {
           if (error.name !== 'AbortError') {
             console.error('データ取得エラー:', error)
           }
         } finally {
           setLoading(false)
         }
       }
       
       fetchData()
       
       return () => {
         abortController.abort() // コンポーネントアンマウント時にキャンセル
       }
     }, [])
     
     return <div>{/* データ表示 */}</div>
   }
   ```

## 🛠️ 実践的なデバッグ手法

### 開発者ツールの活用

1. **ネットワークタブ**
   - APIリクエストのタイミングと内容を確認
   - レスポンス時間とデータサイズを監視
   - キャッシュの動作を確認

2. **コンソールログ**
   ```typescript
   // Server Component
   export async function DebugServerComponent() {
     console.log('🔵 Server: コンポーネント実行開始')
     
     const data = await fetch('/api/data')
     console.log('🔵 Server: データ取得完了', data.status)
     
     return <div>...</div>
   }
   
   // Client Component
   'use client'
   
   export function DebugClientComponent() {
     useEffect(() => {
       console.log('🟡 Client: コンポーネントマウント')
       
       return () => {
         console.log('🟡 Client: コンポーネントアンマウント')
       }
     }, [])
     
     return <div>...</div>
   }
   ```

3. **React Developer Tools**
   - コンポーネントの状態とpropsを確認
   - 再レンダリングの原因を特定
   - パフォーマンスプロファイリング

### エラー処理のベストプラクティス

```typescript
// Server Component
export async function RobustServerComponent() {
  try {
    const data = await fetch('/api/data', {
      next: { revalidate: 3600 }
    })
    
    if (!data.ok) {
      throw new Error(`HTTP ${data.status}: ${data.statusText}`)
    }
    
    const result = await data.json()
    return <DataDisplay data={result} />
    
  } catch (error) {
    console.error('Server Component エラー:', error)
    
    // 環境に応じたエラー表示
    if (process.env.NODE_ENV === 'development') {
      return <div>開発エラー: {error.message}</div>
    }
    
    return <div>データの読み込みに失敗しました。</div>
  }
}

// Client Component
'use client'

export function RobustClientComponent() {
  const [data, setData] = useState(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/data')
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const result = await response.json()
      setData(result)
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '不明なエラー'
      setError(errorMessage)
      console.error('Client Component エラー:', err)
      
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} onRetry={fetchData} />
  if (!data) return <EmptyState />
  
  return <DataDisplay data={data} />
}
```

## 📊 パフォーマンス比較表

| 項目 | Server Component | Client Component |
|------|------------------|------------------|
| **初期表示速度** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **SEO対応** | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| **バンドルサイズ** | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| **インタラクティブ性** | ⭐ | ⭐⭐⭐⭐⭐ |
| **リアルタイム更新** | ⭐ | ⭐⭐⭐⭐⭐ |
| **開発の柔軟性** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **セキュリティ** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **キャッシュ効率** | ⭐⭐⭐⭐⭐ | ⭐⭐ |

## 🎯 実践的な選択基準

### チェックリスト

コンポーネントを作成する前に、以下をチェックしてください：

#### Server Component向け
- [ ] 初期表示時に必要なデータか？
- [ ] SEO対応が重要か？
- [ ] データが比較的静的か？
- [ ] セキュリティが重要か（APIキー等）？
- [ ] 高速な初期表示が必要か？

#### Client Component向け
- [ ] ユーザーのクリックやタイプなどの操作が必要か？
- [ ] 状態（state）の管理が必要か？
- [ ] ブラウザのAPIを使用するか？
- [ ] リアルタイムでデータを更新するか？
- [ ] 動的なUIの変更が必要か？

### 決定マトリックス

| 要件 | Server Component | Client Component | 備考 |
|------|:----------------:|:----------------:|------|
| 静的コンテンツ | ✅ | ❌ | ヘッダー、フッター等 |
| 初期データ表示 | ✅ | ❌ | 商品一覧、記事一覧等 |
| SEO重要 | ✅ | ❌ | ランディングページ等 |
| ユーザー操作 | ❌ | ✅ | フォーム、ボタン等 |
| 状態管理 | ❌ | ✅ | カート、フィルター等 |
| リアルタイム | ❌ | ✅ | チャット、通知等 |
| ブラウザAPI | ❌ | ✅ | localStorage等 |

## 🔗 関連リソース

### 公式ドキュメント
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [React useEffect](https://react.dev/reference/react/useEffect)
- [React useState](https://react.dev/reference/react/useState)

### 実践例
- [05-data-fetching](../examples/05-data-fetching/) - 本プロジェクトの実装例
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) - テスト用API

### パフォーマンス最適化
- [Next.js Caching](https://nextjs.org/docs/app/building-your-application/caching)
- [React Performance](https://react.dev/learn/render-and-commit)

## 📝 演習課題

### 基礎課題

1. **Server Componentでのデータフェッチング**
   - 外部APIからユーザー一覧を取得するServer Componentを作成
   - 適切なキャッシュ設定を実装
   - エラーハンドリングを追加

2. **Client Componentでのインタラクティブ機能**
   - 検索機能付きの商品一覧Client Componentを作成
   - ローディング状態とエラー処理を実装
   - デバウンス処理を追加

### 応用課題

3. **ハイブリッド構成**
   - Server Componentで初期データを取得
   - Client Componentで動的な機能を追加
   - データの受け渡しを最適化

4. **パフォーマンス最適化**
   - 並列データ取得を実装
   - メモ化を活用した最適化
   - リクエストキャンセル機能を追加

### 実践課題

5. **リアルタイム機能**
   - WebSocketまたはServer-Sent Eventsを使用
   - リアルタイムチャット機能を実装
   - 接続状態の管理を追加

6. **総合アプリケーション**
   - ブログアプリケーションを作成
   - Server/Client Componentを適切に使い分け
   - 全ての学習内容を統合

---

**次のステップ**: [05. スタイリング手法](./05-styling.md) で、Next.jsでの様々なスタイリング手法を学習しましょう。