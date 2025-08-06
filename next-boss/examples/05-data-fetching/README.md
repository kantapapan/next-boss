# 05. データフェッチング

Next.js 15のApp Routerにおける**Server Components**と**Client Components**でのデータフェッチング手法を学習するための実践例です。

## 🎯 学習目標

- Server ComponentとClient Componentでのデータフェッチング手法の違いを理解する
- fetch APIとuseEffectの適切な使い分けを身につける
- エラーハンドリングとローディング状態の実装方法を学ぶ
- リアルタイムデータ更新とインタラクティブな機能の実装を体験する
- パフォーマンス最適化手法を理解する

## 📁 プロジェクト構造

```
05-data-fetching/
├── app/
│   ├── layout.tsx          # アプリケーションレイアウト
│   └── page.tsx            # メインページ（デモ統合）
├── components/
│   ├── ServerDataComponents.tsx  # Server Componentの例
│   └── ClientDataComponents.tsx  # Client Componentの例
├── lib/
│   └── api.ts              # データフェッチング関数
├── types/
│   └── index.ts            # TypeScript型定義
└── README.md               # このファイル
```

## 🔵 Server Component でのデータフェッチング

### 特徴
- **サーバーサイドで実行**: ビルド時またはリクエスト時にデータを取得
- **SEO対応**: 初期HTMLにデータが含まれる
- **自動キャッシュ**: Next.jsの強力なキャッシュ機能を活用
- **高速な初期表示**: サーバーで事前レンダリング済み

### 実装例

```tsx
// Server Component
export async function UserListServer() {
  // サーバーサイドでデータを取得
  const users = await getUsers()
  
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}

// APIライブラリ
export async function getUsers(): Promise<User[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    next: { 
      revalidate: 3600, // 1時間キャッシュ
      tags: ['users'] // キャッシュタグ
    }
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  
  return response.json()
}
```

### 最適化手法
- **並列データ取得**: `Promise.all`で複数のAPIを同時に呼び出し
- **適切なキャッシュ設定**: `revalidate`でキャッシュ期間を制御
- **エラーハンドリング**: try-catchでエラーを適切に処理

## 🟡 Client Component でのデータフェッチング

### 特徴
- **ブラウザで実行**: ユーザーのインタラクションに応じてデータを取得
- **React Hooks使用**: useState、useEffectによる状態管理
- **リアルタイム更新**: 定期的なデータ更新が可能
- **インタラクティブ**: ユーザー操作に即座に応答

### 実装例

```tsx
'use client'

import { useState, useEffect } from 'react'

export function PhotoGalleryClient() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadPhotos = async (albumId?: number) => {
    setLoading(true)
    setError(null)
    
    try {
      const photoData = await fetchPhotos(albumId, 12)
      setPhotos(photoData)
    } catch (err) {
      setError('写真の読み込みに失敗しました')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPhotos()
  }, [])

  if (loading) return <div>読み込み中...</div>
  if (error) return <div>エラー: {error}</div>

  return (
    <div>
      {photos.map(photo => (
        <img key={photo.id} src={photo.thumbnailUrl} alt={photo.title} />
      ))}
    </div>
  )
}
```

### 最適化手法
- **デバウンス処理**: 検索機能で不要なAPIリクエストを削減
- **メモ化**: useCallback、useMemoで再レンダリングを最適化
- **適切な依存配列**: useEffectの依存配列を正しく設定

## 🚀 実行方法

1. 依存関係のインストール：
```bash
npm install
```

2. 開発サーバーの起動：
```bash
npm run dev
```

3. ブラウザで http://localhost:3005 にアクセス

## 📚 学習ポイント

### 1. Server Componentの動作確認
- ページのソースを表示して、HTMLに直接データが含まれていることを確認
- ネットワークタブでサーバーサイドでのデータフェッチを確認
- Next.jsのキャッシュ機能による最適化を観察

### 2. Client Componentの動作確認
- 開発者ツールのコンソールでクライアントサイドの処理を確認
- ネットワークタブでAPIリクエストのタイミングを観察
- ローディング状態とエラー処理の動作を体験

### 3. パフォーマンス比較
- 初期表示速度の違いを体感
- SEO対応の違いを理解
- バンドルサイズへの影響を確認

## 🎯 選択の指針

### Server Componentを選ぶべき場合
- **初期データの表示**: ページロード時に必要なデータ
- **SEOが重要**: 検索エンジンに認識させたいコンテンツ
- **静的なコンテンツ**: ユーザー操作で変更されないデータ
- **データベース直接アクセス**: サーバーサイドでのみ可能な処理
- **パフォーマンス重視**: 高速な初期表示が必要

### Client Componentを選ぶべき場合
- **ユーザーインタラクション**: クリック、入力に応じた処理
- **リアルタイム更新**: 定期的なデータ更新が必要
- **動的な状態管理**: ユーザーの操作で変化するデータ
- **ブラウザAPI使用**: localStorage、geolocation等
- **検索・フィルタリング**: ユーザー入力による動的処理

## 💡 ベストプラクティス

### Server Component
1. **適切なキャッシュ設定**: revalidateでキャッシュ期間を制御
2. **並列データ取得**: Promise.allで複数のAPIを同時に呼び出し
3. **エラーハンドリング**: try-catchでエラーを適切に処理
4. **型安全性**: TypeScriptで型定義を活用

### Client Component
1. **ローディング状態**: ユーザーに適切なフィードバックを提供
2. **エラー処理**: エラー状態を適切に表示し、再試行機能を提供
3. **デバウンス処理**: 検索機能で不要なリクエストを削減
4. **メモ化**: 不要な再レンダリングを防止

### 共通
1. **適切な使い分け**: 要件に応じて最適な手法を選択
2. **パフォーマンス監視**: 実際の動作を開発者ツールで確認
3. **ユーザー体験**: 常にユーザーの視点で機能を評価

## 🔧 技術スタック

- **Next.js 15.4.5**: App Router、Server Components
- **TypeScript**: 型安全性とコード品質の向上
- **React 18**: Hooks、Suspense
- **JSONPlaceholder API**: 外部データソース
- **CSS-in-JS**: インラインスタイルによるスタイリング

## 🔗 関連リソース

- [Next.js公式ドキュメント - Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [React公式ドキュメント - useEffect](https://react.dev/reference/react/useEffect)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)

## 📝 演習課題

1. **新しいServer Component**を作成して、異なるAPIエンドポイントからデータを取得してみる
2. **Client Component**でローカルストレージを使用した永続化機能を実装してみる
3. **リアルタイム機能**を拡張して、WebSocketやServer-Sent Eventsを使用してみる
4. **エラー処理**を改善して、より詳細なエラー情報とリトライ機能を実装してみる

---

**次のステップ**: [06. スタイリング手法](../06-styling-methods/) で、Next.jsでの様々なスタイリング手法を学習しましょう。