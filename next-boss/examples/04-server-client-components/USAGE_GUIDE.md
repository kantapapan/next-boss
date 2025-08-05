# Server/Client Components 使い分けガイド

このガイドでは、Next.js App RouterにおけるServer ComponentsとClient Componentsの詳細な使い分け方法と実践的な指針を説明します。

## 📋 基本的な判断フローチャート

```
コンポーネントを作成する際の判断フロー：

1. ユーザーインタラクション（クリック、入力等）が必要？
   ├─ YES → Client Component
   └─ NO → 2へ

2. React Hooks（useState、useEffect等）が必要？
   ├─ YES → Client Component  
   └─ NO → 3へ

3. ブラウザAPI（localStorage、window等）が必要？
   ├─ YES → Client Component
   └─ NO → 4へ

4. リアルタイム更新が必要？
   ├─ YES → Client Component
   └─ NO → Server Component（推奨）
```

## 🔵 Server Component 詳細ガイド

### 適用場面

#### ✅ 最適な使用場面
1. **静的コンテンツの表示**
   ```tsx
   // ヘッダー、フッター、ナビゲーション
   export function Header() {
     return (
       <header>
         <h1>サイトタイトル</h1>
         <nav>...</nav>
       </header>
     )
   }
   ```

2. **初期データの表示**
   ```tsx
   // ブログ記事一覧、商品一覧等
   export async function BlogList() {
     const posts = await fetchPosts()
     return (
       <div>
         {posts.map(post => (
           <article key={post.id}>
             <h2>{post.title}</h2>
             <p>{post.excerpt}</p>
           </article>
         ))}
       </div>
     )
   }
   ```

3. **SEOが重要なページ**
   ```tsx
   // ランディングページ、商品詳細ページ
   export async function ProductDetail({ id }: { id: string }) {
     const product = await fetchProduct(id)
     return (
       <div>
         <h1>{product.name}</h1>
         <p>{product.description}</p>
         <img src={product.image} alt={product.name} />
       </div>
     )
   }
   ```

#### ⚠️ 注意が必要な場面
1. **大量のデータ処理**
   - サーバーサイドでの処理時間が長くなる可能性
   - 適切なキャッシュ戦略が必要

2. **外部API依存**
   - APIの応答時間がページ表示に直接影響
   - エラーハンドリングとフォールバック戦略が重要

### パフォーマンス最適化

```tsx
// ✅ 良い例：適切なキャッシュ設定
export async function OptimizedDataComponent() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // 1時間キャッシュ
  })
  
  return <div>{/* データ表示 */}</div>
}

// ❌ 悪い例：キャッシュなし
export async function UnoptimizedDataComponent() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store' // 毎回フェッチ
  })
  
  return <div>{/* データ表示 */}</div>
}
```

## 🟡 Client Component 詳細ガイド

### 適用場面

#### ✅ 最適な使用場面
1. **フォーム処理**
   ```tsx
   'use client'
   
   import { useState } from 'react'
   
   export function ContactForm() {
     const [formData, setFormData] = useState({
       name: '',
       email: '',
       message: ''
     })
     
     const handleSubmit = (e: React.FormEvent) => {
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

2. **動的UI状態管理**
   ```tsx
   'use client'
   
   import { useState } from 'react'
   
   export function ToggleMenu() {
     const [isOpen, setIsOpen] = useState(false)
     
     return (
       <div>
         <button onClick={() => setIsOpen(!isOpen)}>
           メニュー
         </button>
         {isOpen && (
           <nav>
             {/* メニュー項目 */}
           </nav>
         )}
       </div>
     )
   }
   ```

3. **リアルタイム機能**
   ```tsx
   'use client'
   
   import { useState, useEffect } from 'react'
   
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

#### ⚠️ 注意が必要な場面
1. **大きなライブラリの使用**
   - バンドルサイズの増加
   - 初期ロード時間への影響

2. **複雑な状態管理**
   - パフォーマンスの低下
   - メモリリークの可能性

### パフォーマンス最適化

```tsx
// ✅ 良い例：適切なメモ化
'use client'

import { useState, useCallback, useMemo } from 'react'

export function OptimizedComponent({ items }: { items: Item[] }) {
  const [filter, setFilter] = useState('')
  
  const filteredItems = useMemo(() => 
    items.filter(item => item.name.includes(filter)),
    [items, filter]
  )
  
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

## 🔄 ハイブリッド構成パターン

### パターン1: Server Component + Client Component

```tsx
// Server Component（親）
export async function BlogPost({ id }: { id: string }) {
  const post = await fetchPost(id)
  
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
  
  const handleLike = async () => {
    // いいね処理
    setLikes(prev => prev + 1)
  }
  
  return (
    <button onClick={handleLike}>
      👍 {likes}
    </button>
  )
}
```

### パターン2: データ受け渡し最適化

```tsx
// Server Component
export async function ProductPage({ id }: { id: string }) {
  const [product, reviews] = await Promise.all([
    fetchProduct(id),
    fetchReviews(id)
  ])
  
  return (
    <div>
      <ProductInfo product={product} />
      
      {/* データをpropsで渡す */}
      <ReviewSection 
        reviews={reviews} 
        productId={id}
      />
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
  
  // 新しいレビューの追加処理
  const addReview = (newReview: Review) => {
    setLocalReviews(prev => [newReview, ...prev])
  }
  
  return (
    <div>
      <ReviewForm onSubmit={addReview} productId={productId} />
      <ReviewList reviews={localReviews} />
    </div>
  )
}
```

## 🚨 よくある間違いと対策

### 間違い1: 不必要なClient Component化

```tsx
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

```tsx
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

```tsx
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

## 📊 パフォーマンス比較

| 項目 | Server Component | Client Component |
|------|------------------|------------------|
| 初期表示速度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| SEO対応 | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| バンドルサイズ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| インタラクティブ性 | ⭐ | ⭐⭐⭐⭐⭐ |
| リアルタイム更新 | ⭐ | ⭐⭐⭐⭐⭐ |
| 開発の柔軟性 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

## 🎯 実践的な選択基準

### チェックリスト

コンポーネントを作成する前に、以下をチェックしてください：

- [ ] ユーザーのクリックやタイプなどの操作が必要か？
- [ ] 状態（state）の管理が必要か？
- [ ] ブラウザのAPIを使用するか？
- [ ] リアルタイムでデータを更新するか？
- [ ] SEOが重要か？
- [ ] 初期表示速度が重要か？
- [ ] バンドルサイズを小さく保ちたいか？

### 決定マトリックス

| 要件 | Server Component | Client Component |
|------|:----------------:|:----------------:|
| 静的コンテンツ | ✅ | ❌ |
| 初期データ表示 | ✅ | ❌ |
| SEO重要 | ✅ | ❌ |
| ユーザー操作 | ❌ | ✅ |
| 状態管理 | ❌ | ✅ |
| リアルタイム | ❌ | ✅ |
| ブラウザAPI | ❌ | ✅ |

## 🔧 デバッグとトラブルシューティング

### よくあるエラーと解決方法

1. **"You're importing a component that needs useState"**
   ```
   解決方法: コンポーネントの先頭に 'use client' を追加
   ```

2. **"process is not defined"**
   ```
   解決方法: サーバー専用の処理をClient Componentで使用している
   Server ComponentまたはAPI Routeに移動
   ```

3. **"localStorage is not defined"**
   ```
   解決方法: useEffectでブラウザ環境をチェック
   
   useEffect(() => {
     if (typeof window !== 'undefined') {
       // localStorage使用
     }
   }, [])
   ```

## 📚 追加学習リソース

- [Next.js App Router公式ドキュメント](https://nextjs.org/docs/app)
- [React Server Components RFC](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md)
- [Server Components パフォーマンスガイド](https://nextjs.org/docs/app/building-your-application/optimizing)

---

このガイドを参考に、適切なコンポーネントタイプを選択して、パフォーマンスとユーザー体験の両方を最適化しましょう。