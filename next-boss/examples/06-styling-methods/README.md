# Next.js スタイリング手法例

このプロジェクトは、Next.jsで使用できる主要なスタイリング手法（CSS Modules、Tailwind CSS、styled-components）の実装例を提供します。

## 🎯 学習目標

- CSS Modules、Tailwind CSS、styled-componentsの基本的な使用方法を理解する
- 各手法の特徴と適用場面を把握する
- 実際のプロジェクトでの実装方法を学ぶ
- パフォーマンスと開発効率の観点から最適な手法を選択できるようになる

## 📁 プロジェクト構造

```
06-styling-methods/
├── app/
│   ├── css-modules/           # CSS Modules例
│   │   ├── page.tsx
│   │   └── page.module.css
│   ├── tailwind/              # Tailwind CSS例
│   │   └── page.tsx
│   ├── styled-components/     # styled-components例
│   │   └── page.tsx
│   ├── layout.tsx             # 共通レイアウト
│   ├── page.tsx               # ホームページ
│   └── globals.css            # グローバルスタイル
├── components/
│   └── css-modules/           # CSS Modulesコンポーネント
│       ├── Button.tsx
│       ├── Button.module.css
│       ├── Card.tsx
│       ├── Card.module.css
│       ├── Navigation.tsx
│       └── Navigation.module.css
├── package.json
├── next.config.ts
├── tailwind.config.js
├── postcss.config.mjs
└── README.md
```

## 🚀 セットアップと実行

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3006` を開いてアプリケーションを確認できます。

## 📚 各スタイリング手法の詳細

### CSS Modules

**特徴:**
- クラス名の自動ハッシュ化によるスコープ化
- 従来のCSS記法をそのまま使用可能
- TypeScript対応
- ビルド時の最適化

**適用場面:**
- 既存のCSSコードベースがある場合
- チームメンバーがCSS Modulesに慣れている場合
- 細かいスタイル制御が必要な場合

**実装例:**
```tsx
// Button.tsx
import styles from './Button.module.css';

export default function Button({ variant, children }) {
  return (
    <button className={`${styles.button} ${styles[variant]}`}>
      {children}
    </button>
  );
}
```

```css
/* Button.module.css */
.button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.primary {
  background-color: #3b82f6;
  color: white;
}
```

### Tailwind CSS

**特徴:**
- ユーティリティファーストのアプローチ
- 高速な開発速度
- 未使用CSSの自動削除（PurgeCSS）
- レスポンシブデザインの簡単な実装

**適用場面:**
- 高速なプロトタイピングが必要な場合
- 一貫したデザインシステムを構築したい場合
- レスポンシブデザインを効率的に実装したい場合

**実装例:**
```tsx
export default function Button({ variant, children }) {
  const baseClasses = "px-4 py-2 rounded font-medium transition-colors";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600"
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </button>
  );
}
```

### styled-components

**特徴:**
- CSS-in-JSによる動的スタイリング
- テーマシステムの内蔵サポート
- プロップスベースのスタイル変更
- SSR対応

**適用場面:**
- 動的なスタイリングが頻繁に必要な場合
- テーマ機能を活用したい場合
- コンポーネントとスタイルを密結合させたい場合

**実装例:**
```tsx
import styled from 'styled-components';

const StyledButton = styled.button<{ variant: string }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  background-color: ${props => 
    props.variant === 'primary' ? '#3b82f6' : '#6b7280'
  };
  color: white;
  
  &:hover {
    background-color: ${props => 
      props.variant === 'primary' ? '#2563eb' : '#4b5563'
    };
  }
`;

export default function Button({ variant, children }) {
  return (
    <StyledButton variant={variant}>
      {children}
    </StyledButton>
  );
}
```

## 📊 手法別比較

| 項目 | CSS Modules | Tailwind CSS | styled-components |
|------|-------------|--------------|-------------------|
| 学習コスト | 低 | 中 | 高 |
| 開発速度 | 中 | 高 | 中 |
| バンドルサイズ | 小 | 小 | 中 |
| 動的スタイリング | 困難 | 可能 | 簡単 |
| TypeScript対応 | 良好 | 良好 | 良好 |
| SSR対応 | 良好 | 良好 | 要設定 |

## 🎨 実装されている機能

### CSS Modules例
- ボタンコンポーネント（サイズ・バリアント対応）
- カードコンポーネント（テーマ対応）
- ナビゲーションコンポーネント（アクティブ状態管理）
- レスポンシブデザイン
- ホバーエフェクトとアニメーション

### Tailwind CSS例
- ユーティリティクラスの基本的な使用方法
- レスポンシブデザインの実装
- カスタムコンポーネントの作成
- アニメーションとトランジション
- 動的なクラス適用

### styled-components例
- テーマシステムの活用
- プロップスベースの動的スタイリング
- キーフレームアニメーション
- グローバルスタイルの管理
- TypeScript対応

## 🔧 カスタマイズ

### Tailwind CSSのカスタマイズ

`tailwind.config.js`でカスタムカラーやブレークポイントを定義できます：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
        }
      }
    }
  }
}
```

### styled-componentsのテーマ

テーマオブジェクトを拡張して独自のデザインシステムを構築できます：

```typescript
const theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#10b981',
  },
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
  }
};
```

## 📝 学習の進め方

1. **CSS Modulesから始める**: 従来のCSSに近い書き方で、スコープの概念を学習
2. **Tailwind CSSで効率化を体験**: ユーティリティクラスによる高速開発を体験
3. **styled-componentsで動的スタイリング**: CSS-in-JSによる柔軟なスタイリングを学習

## 🤔 よくある質問

**Q: どの手法を選ぶべきですか？**
A: プロジェクトの要件とチームの経験によります：
- 既存のCSSがある場合: CSS Modules
- 高速開発が必要な場合: Tailwind CSS
- 動的スタイリングが多い場合: styled-components

**Q: 複数の手法を組み合わせることはできますか？**
A: 可能ですが、一貫性を保つため、プロジェクト内では1つの主要な手法を選ぶことを推奨します。

**Q: パフォーマンスの違いはありますか？**
A: CSS ModulesとTailwind CSSは静的なCSSを生成するため高速です。styled-componentsはランタイムでスタイルを生成するため、わずかにオーバーヘッドがあります。

## 🔗 参考リンク

- [Next.js CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules)
- [Tailwind CSS](https://tailwindcss.com/)
- [styled-components](https://styled-components.com/)
- [Next.js Styling](https://nextjs.org/docs/app/building-your-application/styling)