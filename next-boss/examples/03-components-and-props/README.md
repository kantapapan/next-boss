# 03. コンポーネントとProps

Next.jsでの再利用可能なコンポーネントの作成とPropsの活用方法を学ぶための例です。TypeScriptを使用した型安全なコンポーネント設計から、実際のUIコンポーネントの実装まで、実践的な内容を網羅しています。

## 🎯 学習目標

- 再利用可能なコンポーネントの設計原則を理解する
- TypeScriptを使用した型安全なProps定義を習得する
- バリアント対応とカスタマイズ可能なコンポーネントの作成方法を学ぶ
- コンポーネント合成パターンの実装を理解する
- イベントハンドリングとデータの受け渡し方法を習得する

## 📁 ファイル構造

```
03-components-and-props/
├── app/
│   ├── layout.tsx          # ルートレイアウト（Header/Footer使用例）
│   └── page.tsx            # ホームページ（コンポーネント使用例）
├── components/
│   ├── Button.tsx          # 再利用可能なButtonコンポーネント
│   ├── Card.tsx            # Cardコンポーネント（ProductCard拡張版含む）
│   ├── Header.tsx          # ヘッダーコンポーネント
│   └── Footer.tsx          # フッターコンポーネント
├── types/
│   └── index.ts            # 共通型定義
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

3. ブラウザで http://localhost:3003 を開く

## 🧩 実装されているコンポーネント

### 1. Buttonコンポーネント

再利用可能で拡張性の高いボタンコンポーネントです。

**主な機能:**
- 5つのバリアント（primary, secondary, outline, ghost, danger）
- 3つのサイズ（sm, md, lg）
- 状態管理（disabled, loading）
- アイコン対応（左右）
- フルワイド対応

**使用例:**
```tsx
<Button 
  variant="primary" 
  size="md" 
  loading={isLoading}
  leftIcon="🚀"
  onClick={handleClick}
>
  送信
</Button>
```

### 2. Cardコンポーネント

コンテンツを整理して表示するためのカードレイアウトコンポーネントです。

**主な機能:**
- タイトル、説明、画像の表示
- フッター部分のカスタマイズ
- ホバー効果の制御
- 境界線と影の制御
- クリックイベント対応

**使用例:**
```tsx
<Card
  title="記事タイトル"
  description="記事の説明文"
  imageUrl="/image.jpg"
  hoverable
  footer={<Button>詳細を見る</Button>}
/>
```

### 3. ProductCard（Card拡張版）

商品表示に特化したCardコンポーネントの拡張版です。

**主な機能:**
- 商品情報の表示（名前、価格、説明）
- 評価とレビュー数の表示
- 在庫状況の管理
- カートに追加機能
- 詳細表示機能

### 4. Headerコンポーネント

サイト全体で使用される共通のヘッダーコンポーネントです。

**主な機能:**
- ロゴとサイト名の表示
- ナビゲーションメニュー
- ユーザーメニュー（ログイン/ログアウト）
- 検索機能
- モバイル対応（ハンバーガーメニュー）

### 5. Footerコンポーネント

サイト全体で使用される共通のフッターコンポーネントです。

**主な機能:**
- リンクセクションの表示
- ソーシャルメディアリンク
- ニュースレター購読機能
- 会社情報の表示
- 著作権情報

## 🔍 重要な概念

### Props設計の原則

#### 1. 型安全性
```tsx
interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
```

#### 2. デフォルト値
```tsx
export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  // ...
}: ButtonProps) {
```

#### 3. 拡張性
```tsx
interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
  id?: string
}
```

### コンポーネント合成

#### children propの活用
```tsx
<Card title="タイトル">
  <p>カスタムコンテンツ</p>
  <Button>アクション</Button>
</Card>
```

#### render propパターン
```tsx
<Card
  footer={
    <div>
      <Button>編集</Button>
      <Button variant="danger">削除</Button>
    </div>
  }
/>
```

### 状態管理とイベント処理

#### イベントハンドラーの受け渡し
```tsx
// 親コンポーネント
const handleAddToCart = (productId: string) => {
  // カート追加処理
}

// 子コンポーネントでの使用
<ProductCard
  onAddToCart={() => handleAddToCart(product.id)}
/>
```

## 💡 学習のポイント

### 1. 単一責任の原則

各コンポーネントは一つの明確な責任を持つべきです：

- **Button**: クリック可能な要素としての責任
- **Card**: コンテンツの整理表示の責任
- **Header**: サイトナビゲーションの責任

### 2. Props設計のベストプラクティス

- **必須vs任意**: 必要最小限のPropsを必須にし、カスタマイズ用は任意に
- **命名規則**: 一貫した命名規則を使用（onXxx, isXxx, hasXxx等）
- **型定義**: TypeScriptで明確な型定義を提供

### 3. バリアント対応

```tsx
const variantStyles = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
  outline: 'bg-transparent hover:bg-gray-50 text-gray-700',
}
```

### 4. 条件付きレンダリング

```tsx
{loading && <LoadingSpinner />}
{leftIcon && <span className="mr-2">{leftIcon}</span>}
{children}
{rightIcon && <span className="ml-2">{rightIcon}</span>}
```

## 🎯 試してみよう

### 基本操作

1. **Buttonバリアント**: 異なるvariantとsizeの組み合わせを試す
2. **Card表示**: 画像あり/なし、フッターあり/なしの違いを確認
3. **イベント処理**: ボタンクリックやカードクリックの動作を確認
4. **レスポンシブ**: ブラウザサイズを変更してモバイル表示を確認

### カスタマイズ実験

1. **新しいButtonバリアント**: `info`や`warning`バリアントを追加
2. **Cardの拡張**: 新しいPropsを追加してカスタマイズ
3. **テーマ変更**: 色やスタイルを変更してオリジナルテーマを作成
4. **新しいコンポーネント**: 学習した原則で新しいコンポーネントを作成

## 🐛 よくある問題

### 1. Props型エラー

**問題**: TypeScriptでProps型エラーが発生

**解決方法**:
- インターフェースの定義を確認
- 必須Propsが渡されているか確認
- 型の互換性を確認

### 2. イベントハンドラーが動作しない

**問題**: onClickなどのイベントが発火しない

**解決方法**:
- 関数が正しく渡されているか確認
- アロー関数の使用を検討
- イベントオブジェクトの型を確認

### 3. スタイルが適用されない

**問題**: CSSクラスが期待通りに適用されない

**解決方法**:
- クラス名の結合ロジックを確認
- 条件付きスタイルの論理を確認
- CSS優先度の問題を確認

## 🔗 実際のプロジェクトでの応用

### デザインシステムの構築

```tsx
// デザインシステムの基本コンポーネント
export { Button } from './Button'
export { Card } from './Card'
export { Header } from './Header'
export { Footer } from './Footer'

// テーマ設定
export const theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    // ...
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    // ...
  }
}
```

### コンポーネントライブラリ

```tsx
// パッケージとして公開
export * from './components'
export * from './types'
export { theme } from './theme'
```

## 📊 パフォーマンス考慮事項

### 1. メモ化

```tsx
import { memo } from 'react'

export default memo(function Button({ ... }) {
  // コンポーネント実装
})
```

### 2. 動的インポート

```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
})
```

## 🎯 次のステップ

この例を理解したら、次は以下を学習しましょう：

1. **04-server-client-components** - Server/Client Componentsの使い分け
2. **05-data-fetching** - データフェッチングとコンポーネントの連携
3. **06-styling-methods** - 様々なスタイリング手法の比較

## 📖 参考資料

- [React Components](https://react.dev/learn/your-first-component)
- [TypeScript with React](https://react.dev/learn/typescript)
- [Next.js Components](https://nextjs.org/docs/app/building-your-application/ui)
- [Component Design Patterns](https://www.patterns.dev/posts/react-component-patterns)