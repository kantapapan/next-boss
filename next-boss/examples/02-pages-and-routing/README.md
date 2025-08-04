# 02. ページとルーティング

Next.jsのApp Routerを使用したページとルーティングシステムを学ぶための例です。静的ルートと動的ルートの両方を実装し、実際のWebアプリケーションでの使用方法を理解できます。

## 🎯 学習目標

- App Routerの基本的な仕組みを理解する
- 静的ルートの作成方法を学ぶ
- 動的ルートの実装方法を習得する
- Linkコンポーネントによるクライアントサイドナビゲーションを理解する
- メタデータの動的生成方法を学ぶ
- 404エラーハンドリングの実装を理解する

## 📁 ファイル構造

```
02-pages-and-routing/
├── app/
│   ├── layout.tsx          # ルートレイアウト（ナビゲーション付き）
│   ├── page.tsx            # ホームページ（/）
│   ├── about/
│   │   └── page.tsx        # Aboutページ（/about）
│   ├── contact/
│   │   └── page.tsx        # Contactページ（/contact）
│   └── blog/
│       ├── page.tsx        # Blog一覧（/blog）
│       └── [slug]/
│           └── page.tsx    # 個別記事（/blog/[slug]）
├── next.config.ts          # Next.js設定
├── tsconfig.json           # TypeScript設定
├── package.json            # プロジェクト設定
└── README.md              # このファイル
```

## 🚀 実行方法

1. 依存関係をインストール:
```bash
npm install
```

2. 開発サーバーを起動:
```bash
npm run dev
```

3. ブラウザで http://localhost:3002 を開く

## 📚 実装されている機能

### 1. 静的ルート

固定のURLパスを持つページです：

- **ホームページ** (`/`) - ルーティングシステムの概要
- **About** (`/about`) - 静的ルートの詳細説明
- **Contact** (`/contact`) - お問い合わせフォーム例

### 2. 動的ルート

URLパラメータを含む動的なページです：

- **Blog一覧** (`/blog`) - 記事一覧とエントリーポイント
- **個別記事** (`/blog/[slug]`) - 動的パラメータによる記事表示

### 3. ナビゲーション機能

- **共通ヘッダー** - 全ページで共通のナビゲーションメニュー
- **Linkコンポーネント** - クライアントサイドナビゲーション
- **パンくずナビ** - 現在位置の表示

## 🔍 重要な概念

### App Routerの仕組み

```
app/
├── layout.tsx     # 全ページ共通レイアウト
├── page.tsx       # / ルート
├── about/
│   └── page.tsx   # /about ルート
└── blog/
    ├── page.tsx   # /blog ルート
    └── [slug]/
        └── page.tsx # /blog/[slug] 動的ルート
```

### 動的ルートのパラメータ取得

```typescript
export default function BlogPostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const { slug } = params // URLパラメータを取得
  // slugを使用してデータを取得・表示
}
```

### 動的メタデータ生成

```typescript
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = await getPost(params.slug)
  return {
    title: post.title,
    description: post.excerpt,
  }
}
```

## 💡 学習のポイント

### 1. ファイルベースルーティング

- ディレクトリ構造がそのままURLになる
- `page.tsx` ファイルがそのルートのページコンテンツを定義
- `layout.tsx` ファイルで共通レイアウトを定義

### 2. 動的ルートの活用

- `[slug]` のような角括弧でパラメータを定義
- パラメータは `params` オブジェクトで取得
- 存在しないパラメータは `notFound()` で404処理

### 3. クライアントサイドナビゲーション

- `Link` コンポーネントでSPA的な画面遷移
- ページ全体のリロードなしで高速な遷移
- ブラウザ履歴の適切な管理

## 🎯 試してみよう

### 基本操作

1. **ナビゲーション**: ヘッダーのメニューから各ページに移動
2. **動的ルート**: Blog一覧から個別記事ページに移動
3. **直接アクセス**: URLを直接入力してページにアクセス
4. **ブラウザ履歴**: 戻る・進むボタンの動作確認

### 実験してみること

1. **存在しないslug**: `/blog/non-existent-post` にアクセス
2. **メタデータ確認**: 各ページでブラウザタブのタイトルを確認
3. **ネットワークタブ**: 開発者ツールでページ遷移時の通信を確認

## 🐛 よくある問題

### 1. 404エラーが表示されない

```typescript
import { notFound } from 'next/navigation'

if (!post) {
  notFound() // この関数を呼び出す
}
```

### 2. 動的ルートが認識されない

- ディレクトリ名が `[slug]` のように角括弧で囲まれているか確認
- `page.tsx` ファイルが正しく配置されているか確認

### 3. Linkコンポーネントが動作しない

```typescript
import Link from 'next/link' // 正しいインポート

// 使用例
<Link href="/about">About</Link>
```

## 🔗 実際のプロジェクトでの応用

### ブログサイト

```
app/
├── page.tsx              # ホーム
├── blog/
│   ├── page.tsx         # 記事一覧
│   ├── [slug]/
│   │   └── page.tsx     # 個別記事
│   └── category/
│       └── [category]/
│           └── page.tsx # カテゴリ別一覧
```

### ECサイト

```
app/
├── products/
│   ├── page.tsx         # 商品一覧
│   ├── [id]/
│   │   └── page.tsx     # 商品詳細
│   └── category/
│       └── [slug]/
│           └── page.tsx # カテゴリ別商品
```

## 🎯 次のステップ

この例を理解したら、次は以下を学習しましょう：

1. **03-components-and-props** - コンポーネントの作成と再利用
2. **04-server-client-components** - Server/Client Componentsの使い分け
3. **05-data-fetching** - APIからのデータ取得

## 📖 参考資料

- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js Routing](https://nextjs.org/docs/app/building-your-application/routing)
- [Next.js Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)