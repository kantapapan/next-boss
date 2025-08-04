# 01. 基本セットアップ

Next.jsの最も基本的な構成を学ぶための例です。この例では、Next.js 15.4.5とTypeScriptを使用した最小限のアプリケーションを作成します。

## 🎯 学習目標

- Next.jsプロジェクトの基本構造を理解する
- App Routerの基本概念を学ぶ
- layout.tsx と page.tsx の役割を理解する
- TypeScriptの基本設定を確認する
- メタデータの設定方法を学ぶ

## 📁 ファイル構造

```
01-basic-setup/
├── app/
│   ├── layout.tsx      # ルートレイアウト
│   └── page.tsx        # ホームページ
├── next.config.ts      # Next.js設定
├── tsconfig.json       # TypeScript設定
├── package.json        # プロジェクト設定
└── README.md          # このファイル
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

3. ブラウザで http://localhost:3001 を開く

## 📚 重要な概念

### App Router

Next.js 13以降で導入された新しいルーティングシステムです：

- `app/` ディレクトリがルートになる
- `layout.tsx` は共通レイアウトを定義
- `page.tsx` は各ルートのページコンテンツを定義

### Server Components

デフォルトでは、全てのコンポーネントがServer Componentとして動作します：

- サーバーサイドでレンダリングされる
- 初期ページロードが高速
- SEOに有利

### TypeScript設定

`tsconfig.json` の重要な設定：

- `strict: true` - 厳密な型チェック
- `jsx: "preserve"` - JSXをそのまま保持
- `baseUrl` と `paths` - パスエイリアスの設定

## 🔍 コードの詳細解説

### layout.tsx

```typescript
export const metadata: Metadata = {
  title: '01. 基本セットアップ | Next Boss',
  description: 'Next.jsの基本的なセットアップと構造を学ぶ',
}
```

- メタデータはSEOとソーシャルメディア対応に重要
- 各レイアウトやページで個別に設定可能

### page.tsx

```typescript
export default function HomePage() {
  return <div>...</div>
}
```

- デフォルトエクスポートされた関数がページコンポーネント
- Server Componentとして動作（'use client'がない場合）

## 💡 試してみよう

1. **スタイルの変更**
   - `layout.tsx` のヘッダーの背景色を変更してみる
   - `page.tsx` のテキストスタイルを変更してみる

2. **コンテンツの追加**
   - 新しいセクションを `page.tsx` に追加
   - 画像やリンクを追加してみる

3. **メタデータの変更**
   - `layout.tsx` のタイトルや説明を変更
   - ブラウザのタブタイトルが変わることを確認

## 🐛 よくある問題

### ポートが使用中の場合

```bash
Error: listen EADDRINUSE: address already in use :::3001
```

**解決方法**: 別のポートを使用する
```bash
npm run dev -- -p 3002
```

### TypeScriptエラー

型エラーが発生した場合は、以下を確認：
- `@types/react` と `@types/react-dom` がインストールされているか
- `tsconfig.json` の設定が正しいか

## 🎯 次のステップ

この基本構造を理解したら、次は以下を学習しましょう：

1. **02-pages-and-routing** - ページの追加とルーティング
2. **03-components-and-props** - コンポーネントの作成と再利用

## 📖 参考資料

- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js TypeScript](https://nextjs.org/docs/app/building-your-application/configuring/typescript)
- [Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)