# 01. Next.jsを始めよう

Next.jsは、Reactベースのフルスタックフレームワークで、モダンなWebアプリケーション開発を効率化します。このドキュメントでは、Next.jsの基本概念から実際のプロジェクト作成まで、段階的に学習していきます。

## 🎯 この章の学習目標

- Next.jsとは何かを理解する
- Next.jsの主要な特徴を把握する
- プロジェクトの基本構造を理解する
- 開発環境のセットアップ方法を学ぶ
- 最初のNext.jsアプリケーションを作成する

## 📖 Next.jsとは

Next.jsは、Reactアプリケーションを構築するためのフレームワークです。Reactの柔軟性を保ちながら、本番環境で必要な機能を提供します。

### 主要な特徴

#### 1. **App Router（推奨）**
- ファイルベースのルーティングシステム
- レイアウトの階層化とネスト
- Server ComponentsとClient Componentsの統合

#### 2. **Server-Side Rendering (SSR)**
- サーバーサイドでのHTMLレンダリング
- 初期ページロードの高速化
- SEO対応の向上

#### 3. **Static Site Generation (SSG)**
- ビルド時の静的ファイル生成
- CDNでの高速配信
- 優れたパフォーマンス

#### 4. **TypeScript サポート**
- 標準でTypeScriptをサポート
- 型安全性による開発効率の向上
- 自動的な型推論

#### 5. **API Routes**
- サーバーレス関数としてのAPI作成
- フルスタック開発の実現
- データベース連携の簡素化

## 🏗️ プロジェクト構造の理解

Next.js 13以降では、App Routerが推奨されています。基本的なプロジェクト構造を見てみましょう。

### 基本構造

```
my-next-app/
├── app/                    # App Router（メインディレクトリ）
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # ホームページ
│   ├── globals.css        # グローバルスタイル
│   └── favicon.ico        # ファビコン
├── public/                # 静的ファイル
│   ├── images/
│   └── icons/
├── components/            # 再利用可能なコンポーネント
├── lib/                   # ユーティリティ関数
├── types/                 # TypeScript型定義
├── next.config.js         # Next.js設定ファイル
├── tsconfig.json          # TypeScript設定
├── package.json           # プロジェクト設定
└── README.md             # プロジェクト説明
```

### 重要なファイルとディレクトリ

#### `app/` ディレクトリ
App Routerの中心となるディレクトリです。

- **`layout.tsx`**: 共通レイアウトを定義
- **`page.tsx`**: 各ルートのページコンテンツ
- **`loading.tsx`**: ローディング状態のUI
- **`error.tsx`**: エラー状態のUI
- **`not-found.tsx`**: 404ページ

#### 設定ファイル
- **`next.config.js`**: Next.jsの動作設定
- **`tsconfig.json`**: TypeScriptコンパイラ設定
- **`package.json`**: 依存関係とスクリプト定義

## 🚀 開発環境のセットアップ

### 前提条件

Next.js開発に必要な環境：

- **Node.js**: 18.0以上（推奨: 最新LTS版）
- **npm**: Node.jsに付属（または yarn、pnpm）
- **エディタ**: VS Code推奨（Next.js拡張機能あり）

### Node.jsのバージョン確認

```bash
node --version  # v18.0.0以上であることを確認
npm --version   # npmのバージョンも確認
```

### プロジェクトの作成

#### 1. create-next-appを使用（推奨）

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint --app
```

オプションの説明：
- `--typescript`: TypeScriptを使用
- `--tailwind`: Tailwind CSSを含める
- `--eslint`: ESLintを設定
- `--app`: App Routerを使用

#### 2. 手動セットアップ

```bash
mkdir my-app
cd my-app
npm init -y
npm install next@latest react@latest react-dom@latest
npm install -D typescript @types/react @types/node
```

### 開発サーバーの起動

```bash
cd my-app
npm run dev
```

ブラウザで `http://localhost:3000` を開くとアプリケーションが表示されます。

## 📝 最初のアプリケーション作成

実際に最小限のNext.jsアプリケーションを作成してみましょう。

### 1. ルートレイアウトの作成

`app/layout.tsx`:

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My First Next.js App',
  description: 'Next.jsで作成した最初のアプリケーション',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <header>
          <h1>My Next.js App</h1>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; 2024 My App</p>
        </footer>
      </body>
    </html>
  )
}
```

### 2. ホームページの作成

`app/page.tsx`:

```typescript
export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>これは私の最初のNext.jsアプリケーションです。</p>
    </div>
  )
}
```

### 3. Next.js設定ファイル

`next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
}

module.exports = nextConfig
```

## 🔧 重要な概念の詳細

### Server Components vs Client Components

#### Server Components（デフォルト）
- サーバーサイドでレンダリング
- データベースアクセスが可能
- バンドルサイズが小さい
- SEOに有利

```typescript
// Server Component（デフォルト）
export default function ServerComponent() {
  // サーバーサイドで実行される
  const data = await fetch('https://api.example.com/data')
  
  return <div>{/* レンダリング */}</div>
}
```

#### Client Components
- ブラウザでレンダリング
- インタラクティブな機能が可能
- React Hooksが使用可能

```typescript
'use client' // この指定が必要

import { useState } from 'react'

export default function ClientComponent() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

### ルーティングシステム

App Routerでは、ディレクトリ構造がそのままURLになります：

```
app/
├── page.tsx           # / (ホーム)
├── about/
│   └── page.tsx       # /about
├── blog/
│   ├── page.tsx       # /blog
│   └── [slug]/
│       └── page.tsx   # /blog/[slug] (動的ルート)
└── dashboard/
    ├── layout.tsx     # /dashboard/* 共通レイアウト
    └── page.tsx       # /dashboard
```

### メタデータの設定

SEO対応のためのメタデータ設定：

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ページタイトル',
  description: 'ページの説明',
  keywords: ['Next.js', 'React', 'TypeScript'],
  openGraph: {
    title: 'ページタイトル',
    description: 'ページの説明',
    images: ['/og-image.jpg'],
  },
}
```

## 🛠️ 開発ツールとベストプラクティス

### 推奨VS Code拡張機能

- **ES7+ React/Redux/React-Native snippets**: Reactスニペット
- **TypeScript Importer**: 自動インポート
- **Tailwind CSS IntelliSense**: Tailwind CSS補完
- **Next.js snippets**: Next.js専用スニペット

### ESLintとPrettierの設定

`.eslintrc.json`:

```json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "prefer-const": "error",
    "no-unused-vars": "warn"
  }
}
```

### TypeScript設定のベストプラクティス

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

## 🚨 よくある問題と解決方法

### 1. ポートが使用中

```bash
Error: listen EADDRINUSE: address already in use :::3000
```

**解決方法**:
```bash
npm run dev -- -p 3001  # 別のポートを使用
```

### 2. TypeScriptエラー

```
Cannot find module 'next' or its corresponding type declarations
```

**解決方法**:
```bash
npm install @types/node @types/react @types/react-dom
```

### 3. 'use client'の使い分け

- **Server Component**: データフェッチ、SEO重視
- **Client Component**: インタラクション、状態管理

## 🎯 次のステップ

基本セットアップを理解したら、次は以下を学習しましょう：

1. **ページとルーティング** - 複数ページの作成と動的ルート
2. **コンポーネント設計** - 再利用可能なコンポーネントの作成
3. **データフェッチング** - APIからのデータ取得
4. **スタイリング** - CSS ModulesやTailwind CSSの活用

## 📚 参考資料

- [Next.js公式ドキュメント](https://nextjs.org/docs)
- [React公式ドキュメント](https://react.dev/)
- [TypeScript公式ドキュメント](https://www.typescriptlang.org/docs/)
- [Next.js Learn](https://nextjs.org/learn) - 公式チュートリアル

## 💡 まとめ

この章では、Next.jsの基本概念とプロジェクトセットアップについて学習しました。重要なポイント：

- Next.jsはReactベースのフルスタックフレームワーク
- App Routerが現在の推奨アプローチ
- Server ComponentsとClient Componentsの使い分けが重要
- TypeScriptとの組み合わせで型安全な開発が可能

次の章では、実際にページを追加してルーティングシステムを詳しく学習していきます。