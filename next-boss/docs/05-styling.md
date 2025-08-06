# Next.jsスタイリング手法ガイド

Next.jsアプリケーションでは、複数のスタイリング手法を選択できます。このガイドでは、主要な3つの手法（CSS Modules、Tailwind CSS、styled-components）について詳しく説明し、それぞれの特徴、使い分け、実装方法を解説します。

## 📋 目次

1. [スタイリング手法の概要](#スタイリング手法の概要)
2. [CSS Modules](#css-modules)
3. [Tailwind CSS](#tailwind-css)
4. [styled-components](#styled-components)
5. [手法別比較](#手法別比較)
6. [選択指針](#選択指針)
7. [実践的な使い分け](#実践的な使い分け)
8. [パフォーマンス考慮事項](#パフォーマンス考慮事項)

## スタイリング手法の概要

Next.jsでは以下のスタイリング手法が主に使用されます：

### 1. CSS Modules
- **概念**: CSSファイルをモジュールとして扱い、クラス名を自動的にスコープ化
- **特徴**: 従来のCSS記法を保ちながら、名前空間の衝突を防ぐ
- **適用場面**: 既存のCSSコードベースがある場合、CSS知識を活かしたい場合

### 2. Tailwind CSS
- **概念**: ユーティリティファーストのCSSフレームワーク
- **特徴**: 事前定義されたクラスを組み合わせて高速開発
- **適用場面**: 高速プロトタイピング、一貫したデザインシステム構築

### 3. styled-components
- **概念**: CSS-in-JSライブラリ
- **特徴**: JavaScriptの中でCSSを書き、動的スタイリングが可能
- **適用場面**: 動的なスタイリングが必要、テーマ機能を活用したい場合

## CSS Modules

### 基本概念

CSS Modulesは、CSSファイルをモジュールとして扱い、クラス名を自動的にハッシュ化してスコープを限定する手法です。

### セットアップ

Next.jsでは、`.module.css`拡張子のファイルが自動的にCSS Modulesとして処理されます。

```typescript
// Button.tsx
import styles from './Button.module.css';

export default function Button({ children, variant = 'primary' }) {
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
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.primary {
  background-color: #3b82f6;
  color: #ffffff;
}

.primary:hover {
  background-color: #2563eb;
}

.secondary {
  background-color: #6b7280;
  color: #ffffff;
}

.secondary:hover {
  background-color: #4b5563;
}
```

### 高度な使用方法

#### 1. 複数クラスの組み合わせ

```typescript
const buttonClasses = [
  styles.button,
  styles[variant],
  disabled ? styles.disabled : '',
  size ? styles[size] : '',
].filter(Boolean).join(' ');
```

#### 2. 条件付きスタイリング

```typescript
const cardClasses = [
  styles.card,
  isActive ? styles.active : '',
  hasError ? styles.error : '',
].filter(Boolean).join(' ');
```

#### 3. CSS変数の活用

```css
/* Component.module.css */
.container {
  --primary-color: #3b82f6;
  --secondary-color: #10b981;
}

.button {
  background-color: var(--primary-color);
}
```

### TypeScript対応

CSS Modulesの型定義を自動生成するには、`typescript-plugin-css-modules`を使用します：

```bash
npm install -D typescript-plugin-css-modules
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "plugins": [
      { "name": "typescript-plugin-css-modules" }
    ]
  }
}
```

### メリット・デメリット

**メリット:**
- 従来のCSS知識をそのまま活用可能
- クラス名の衝突を自動的に防ぐ
- ビルド時の最適化
- TypeScript対応

**デメリット:**
- 動的スタイリングが困難
- ファイル数が増加する傾向
- グローバルスタイルとの使い分けが必要

## Tailwind CSS

### 基本概念

Tailwind CSSは、ユーティリティファーストのアプローチを採用したCSSフレームワークです。事前定義されたクラスを組み合わせてスタイリングを行います。

### セットアップ

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
        }
      }
    },
  },
  plugins: [],
}
```

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 基本的な使用方法

#### 1. ユーティリティクラスの組み合わせ

```tsx
export default function Button({ children, variant, size }) {
  const baseClasses = "font-medium rounded transition-colors focus:outline-none focus:ring-2";
  
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500"
  };
  
  const sizeClasses = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {children}
    </button>
  );
}
```

#### 2. レスポンシブデザイン

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="p-4 bg-white rounded-lg shadow">
    <h3 className="text-lg md:text-xl font-semibold">タイトル</h3>
    <p className="text-sm md:text-base text-gray-600">説明文</p>
  </div>
</div>
```

#### 3. 状態管理との組み合わせ

```tsx
export default function InteractiveCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  
  return (
    <div 
      className={`
        p-6 rounded-lg border-2 cursor-pointer transition-all duration-300
        ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}
        ${isHovered ? 'shadow-lg transform -translate-y-1' : 'shadow'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsSelected(!isSelected)}
    >
      コンテンツ
    </div>
  );
}
```

### カスタマイズ

#### 1. カスタムカラーの定義

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          900: '#0c4a6e',
        }
      }
    }
  }
}
```

#### 2. カスタムコンポーネントクラス

```css
/* globals.css */
@layer components {
  .btn-primary {
    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6 border border-gray-200;
  }
}
```

#### 3. カスタムユーティリティ

```css
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

### メリット・デメリット

**メリット:**
- 高速な開発速度
- 一貫したデザインシステム
- 未使用CSSの自動削除
- 優れたレスポンシブ対応

**デメリット:**
- 初期学習コスト
- HTMLが冗長になる可能性
- カスタムデザインの実装が困難な場合がある

## styled-components

### 基本概念

styled-componentsは、CSS-in-JSライブラリの一つで、JavaScriptの中でCSSを書き、動的なスタイリングを簡単に実現できます。

### セットアップ

```bash
npm install styled-components
npm install -D @types/styled-components
```

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    styledComponents: true,
  },
};

export default nextConfig;
```

### 基本的な使用方法

#### 1. 基本的なスタイル付きコンポーネント

```tsx
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #3b82f6;
  color: white;
  
  &:hover {
    background-color: #2563eb;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export default function Button({ children }) {
  return <StyledButton>{children}</StyledButton>;
}
```

#### 2. プロップスベースの動的スタイリング

```tsx
const DynamicButton = styled.button<{ 
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
}>`
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: ${props => props.isLoading ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  
  /* サイズ */
  ${props => {
    switch (props.size) {
      case 'small':
        return `padding: 0.375rem 0.75rem; font-size: 0.875rem;`;
      case 'large':
        return `padding: 0.75rem 1.5rem; font-size: 1.125rem;`;
      default:
        return `padding: 0.5rem 1rem; font-size: 1rem;`;
    }
  }}
  
  /* カラー */
  ${props => {
    switch (props.variant) {
      case 'secondary':
        return `
          background-color: #6b7280;
          color: white;
          &:hover:not(:disabled) {
            background-color: #4b5563;
          }
        `;
      case 'danger':
        return `
          background-color: #ef4444;
          color: white;
          &:hover:not(:disabled) {
            background-color: #dc2626;
          }
        `;
      default:
        return `
          background-color: #3b82f6;
          color: white;
          &:hover:not(:disabled) {
            background-color: #2563eb;
          }
        `;
    }
  }}
  
  &:disabled {
    background-color: #d1d5db;
    color: #9ca3af;
    cursor: not-allowed;
  }
`;
```

#### 3. テーマシステム

```tsx
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#10b981',
    danger: '#ef4444',
    gray: {
      100: '#f3f4f6',
      500: '#6b7280',
      900: '#111827',
    }
  },
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
  }
};

const ThemedButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.sm};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.xs};
  }
`;

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ThemedButton>テーマ対応ボタン</ThemedButton>
    </ThemeProvider>
  );
}
```

#### 4. アニメーションとキーフレーム

```tsx
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AnimatedCard = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
```

### メリット・デメリット

**メリット:**
- 動的スタイリングが簡単
- テーマシステムの内蔵サポート
- コンポーネントとスタイルの密結合
- TypeScript対応

**デメリット:**
- ランタイムオーバーヘッド
- バンドルサイズの増加
- SSRの設定が必要
- 学習コスト

## 手法別比較

### 詳細比較表

| 項目 | CSS Modules | Tailwind CSS | styled-components |
|------|-------------|--------------|-------------------|
| **学習コスト** | 低（既存CSS知識活用） | 中（新しいクラス体系） | 高（CSS-in-JS概念） |
| **開発速度** | 中（CSS記述が必要） | 高（クラス組み合わせ） | 中（コンポーネント作成） |
| **バンドルサイズ** | 小（静的CSS） | 小（PurgeCSS） | 中（ランタイム） |
| **動的スタイリング** | 困難（JS併用必要） | 可能（条件付きクラス） | 簡単（プロップス連携） |
| **TypeScript対応** | 良好（型生成可能） | 良好（IntelliSense） | 良好（型安全） |
| **SSR対応** | 良好（標準対応） | 良好（標準対応） | 要設定（hydration） |
| **デバッグ** | 容易（DevTools） | 容易（クラス名明確） | 困難（生成クラス名） |
| **チーム開発** | 良好（CSS知識共有） | 良好（統一記法） | 中（JS知識必要） |
| **カスタマイズ性** | 高（自由なCSS） | 中（設定ベース） | 高（JS活用） |
| **メンテナンス性** | 中（ファイル分散） | 高（一貫性） | 中（コンポーネント依存） |

### パフォーマンス比較

#### ビルド時間
1. **CSS Modules**: 高速（静的処理）
2. **Tailwind CSS**: 中程度（PurgeCSS処理）
3. **styled-components**: 低速（JS処理）

#### ランタイムパフォーマンス
1. **CSS Modules**: 最高（静的CSS）
2. **Tailwind CSS**: 最高（静的CSS）
3. **styled-components**: 良好（キャッシュ機能）

#### バンドルサイズ（典型的なプロジェクト）
- **CSS Modules**: 10-30KB
- **Tailwind CSS**: 5-15KB（PurgeCSS後）
- **styled-components**: 15-40KB（ライブラリ含む）

## 選択指針

### プロジェクト特性による選択

#### 小規模プロジェクト・プロトタイプ
**推奨**: Tailwind CSS
- 理由: 高速開発、設定不要、一貫性

#### 中規模プロジェクト・企業アプリ
**推奨**: CSS Modules
- 理由: 保守性、チーム開発、既存資産活用

#### 大規模プロジェクト・複雑なUI
**推奨**: styled-components
- 理由: 動的スタイリング、テーマシステム、コンポーネント化

### チーム特性による選択

#### CSS経験豊富なチーム
**推奨**: CSS Modules
- 既存知識を最大限活用
- 段階的な移行が可能

#### フロントエンド専門チーム
**推奨**: Tailwind CSS
- 効率的な開発フロー
- デザインシステム構築

#### フルスタック開発チーム
**推奨**: styled-components
- JavaScript中心の開発
- 動的な要件への対応

## 実践的な使い分け

### ハイブリッドアプローチ

実際のプロジェクトでは、複数の手法を組み合わせることも可能です：

```tsx
// グローバルスタイル: Tailwind CSS
import './globals.css'; // @tailwind base; components; utilities;

// コンポーネント固有スタイル: CSS Modules
import styles from './Component.module.css';

// 動的スタイル: styled-components
import styled from 'styled-components';

const DynamicWrapper = styled.div<{ isActive: boolean }>`
  background-color: ${props => props.isActive ? '#3b82f6' : 'transparent'};
`;

export default function HybridComponent({ isActive }) {
  return (
    <DynamicWrapper isActive={isActive}>
      <div className="p-4 rounded-lg"> {/* Tailwind */}
        <div className={styles.customElement}> {/* CSS Modules */}
          ハイブリッドアプローチ
        </div>
      </div>
    </DynamicWrapper>
  );
}
```

### 段階的移行戦略

#### 既存プロジェクトの移行

1. **Phase 1**: グローバルスタイルをTailwindに移行
2. **Phase 2**: 新規コンポーネントでCSS Modules導入
3. **Phase 3**: 動的要件でstyled-components追加

#### 新規プロジェクトの選択

1. **要件分析**: 動的スタイリングの必要性を評価
2. **チーム評価**: 技術スタックと経験を考慮
3. **プロトタイプ**: 小規模で各手法を試行
4. **決定**: 総合的な評価で選択

## パフォーマンス考慮事項

### CSS Modules最適化

```typescript
// 動的インポートでコード分割
const LazyComponent = dynamic(() => import('./LazyComponent'), {
  loading: () => <div>Loading...</div>,
});

// 条件付きスタイル読み込み
const styles = useMemo(() => {
  return condition ? 
    require('./ComponentA.module.css') : 
    require('./ComponentB.module.css');
}, [condition]);
```

### Tailwind CSS最適化

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  // 未使用クラスの削除を最適化
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    options: {
      safelist: ['bg-red-500', 'text-3xl'], // 動的クラスの保護
    }
  }
}
```

### styled-components最適化

```tsx
// バベルプラグインでビルド時最適化
// .babelrc
{
  "plugins": [
    [
      "styled-components",
      {
        "ssr": true,
        "displayName": true,
        "preprocess": false
      }
    ]
  ]
}

// メモ化でレンダリング最適化
const MemoizedStyledComponent = React.memo(styled.div`
  /* styles */
`);
```

## まとめ

Next.jsでのスタイリング手法選択は、プロジェクトの要件、チームの特性、パフォーマンス要求を総合的に考慮して決定する必要があります。

### 推奨アプローチ

1. **学習段階**: CSS Modules → Tailwind CSS → styled-components の順で学習
2. **プロジェクト開始**: 要件分析に基づいた手法選択
3. **運用段階**: パフォーマンス監視と必要に応じた最適化

各手法には明確な特徴と適用場面があるため、プロジェクトの成功のためには適切な選択が重要です。実際の開発では、この知識を基に実装例を参考にしながら、最適なスタイリング戦略を構築してください。