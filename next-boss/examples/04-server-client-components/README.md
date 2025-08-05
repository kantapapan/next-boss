# 04. Server Components vs Client Components

Next.js 13以降のApp Routerにおける**Server Components**と**Client Components**の違いと使い分けを学習するための実践例です。

## 🎯 学習目標

- Server ComponentsとClient Componentsの基本概念を理解する
- それぞれの特徴と制限を把握する
- 適切な使い分けの判断基準を身につける
- 実際のコードで両者の違いを体験する

## 📁 プロジェクト構造

```
04-server-client-components/
├── app/
│   ├── layout.tsx          # アプリケーションレイアウト
│   └── page.tsx            # メインページ（デモ統合）
├── components/
│   ├── ServerComponent.tsx # Server Componentの例
│   ├── ClientComponent.tsx # Client Componentの例
│   └── ComparisonDemo.tsx  # 比較デモ
├── lib/
│   └── data.ts            # データフェッチング関数
└── README.md              # このファイル
```

## 🔵 Server Components の特徴

### ✅ できること
- サーバーサイドでのデータフェッチング
- データベースへの直接アクセス
- 環境変数やシークレットへのアクセス
- SEO対応（検索エンジンがコンテンツを認識）
- 初期ページロードの高速化
- バンドルサイズの削減

### ❌ できないこと
- React Hooks（useState、useEffect等）の使用
- ブラウザ専用API（localStorage、sessionStorage等）へのアクセス
- イベントハンドラー（onClick、onChange等）の使用
- ユーザーインタラクション

### 📝 実装例

```tsx
// Server Component（デフォルト）
export async function UserList() {
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
```

## 🟡 Client Components の特徴

### ✅ できること
- React Hooks（useState、useEffect等）の使用
- ブラウザ専用API（localStorage、sessionStorage等）へのアクセス
- イベントハンドラー（onClick、onChange等）の使用
- ユーザーインタラクション
- リアルタイムデータの更新
- 動的なUI状態管理

### ❌ できないこと
- サーバーサイドでの事前レンダリング
- データベースへの直接アクセス
- サーバー環境変数やシークレットへのアクセス
- 初期HTMLにコンテンツが含まれない（SEOに不利）

### 📝 実装例

```tsx
'use client' // Client Componentの宣言

import { useState } from 'react'

export function InteractiveCounter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        増加
      </button>
    </div>
  )
}
```

## 🚀 実行方法

1. 依存関係のインストール：
```bash
npm install
```

2. 開発サーバーの起動：
```bash
npm run dev
```

3. ブラウザで http://localhost:3004 にアクセス

## 📚 学習ポイント

### 1. Server Componentsの動作確認
- ページのソースを表示して、HTMLに直接データが含まれていることを確認
- ネットワークタブでサーバーサイドでのデータフェッチを確認
- 初期表示の高速性を体感

### 2. Client Componentsの動作確認
- 開発者ツールのコンソールでクライアントサイドの処理を確認
- インタラクティブな操作（ボタンクリック、フォーム入力）を体験
- リアルタイム更新の動作を観察

### 3. 比較デモの活用
- 各機能の対応状況を比較表で確認
- 具体的な使用例を通じて理解を深める
- 選択の指針を参考に適切な判断基準を身につける

## 🎯 選択の指針

### Server Componentを選ぶべき場合
- 静的なコンテンツの表示
- 初期データの取得と表示
- SEOが重要なページ
- データベースへの直接アクセスが必要
- パフォーマンスを重視する場合

### Client Componentを選ぶべき場合
- ユーザーインタラクションが必要
- 動的な状態管理が必要
- リアルタイム更新が必要
- ブラウザAPIの使用が必要
- フォーム処理が必要

## 💡 ベストプラクティス

1. **デフォルトはServer Component**: 特別な理由がない限りServer Componentを使用
2. **Client Componentは最小限に**: 必要な部分のみをClient Componentにする
3. **適切な配置**: Client Componentは可能な限り下位層（leaf）に配置
4. **データの受け渡し**: Server ComponentからClient Componentにpropsでデータを渡す
5. **パフォーマンス考慮**: バンドルサイズとユーザー体験のバランスを考慮

## 📖 詳細ガイド

より詳細な使い分けの指針と実践的なパターンについては、以下のガイドを参照してください：

- **[USAGE_GUIDE.md](./USAGE_GUIDE.md)** - 詳細な使い分けガイドと実践パターン
  - 判断フローチャート
  - パフォーマンス最適化手法
  - ハイブリッド構成パターン
  - よくある間違いと対策
  - デバッグとトラブルシューティング

## 🔗 関連リソース

- [Next.js公式ドキュメント - Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [React公式ドキュメント - Server Components](https://react.dev/reference/react/use-client)
- [Server Components パフォーマンスガイド](https://nextjs.org/docs/app/building-your-application/optimizing)

## 📝 演習課題

1. 新しいServer Componentを作成して、外部APIからデータを取得してみる
2. Client Componentでローカルストレージを使用した永続化機能を実装してみる
3. Server ComponentとClient Componentを組み合わせたハイブリッドなコンポーネントを作成してみる

---

**次のステップ**: [05. データフェッチング](../05-data-fetching/) で、より高度なデータフェッチング手法を学習しましょう。