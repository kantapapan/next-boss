# 03. コンポーネントとProps

このドキュメントでは、Next.jsでの**再利用可能なコンポーネント**の作成方法と、**Props**を使ったデータの受け渡しについて詳しく説明します。

## 📚 学習目標

このセクションを完了すると、以下のことができるようになります：

- Reactコンポーネントの基本構造を理解する
- Propsを使ってコンポーネント間でデータを受け渡しする
- TypeScriptを使った型安全なProps定義を作成する
- 再利用可能なコンポーネントを設計・実装する
- 複数のコンポーネントを組み合わせて複合コンポーネントを作成する

## 🧩 コンポーネントとは

Reactコンポーネントは、UIの一部を表現する独立した、再利用可能なコードの単位です。コンポーネントを使うことで、複雑なUIを小さな部品に分割し、管理しやすくできます。

### コンポーネントの基本構造

```typescript
// 基本的なコンポーネントの例
export default function MyComponent() {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  )
}
```

### Propsを受け取るコンポーネント

```typescript
interface MyComponentProps {
  title: string;
  description?: string; // オプショナルなプロパティ
}

export default function MyComponent({ title, description }: MyComponentProps) {
  return (
    <div>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  )
}
```

## 🎯 Propsの基本概念

Propsは「properties」の略で、親コンポーネントから子コンポーネントにデータを渡すためのメカニズムです。

### Propsの特徴

1. **読み取り専用**: 子コンポーネント内でPropsを変更することはできません
2. **一方向データフロー**: 親から子への一方向にのみデータが流れます
3. **型安全性**: TypeScriptを使用することで、Propsの型を定義できます

### Propsの使用例

```typescript
// 親コンポーネント
export default function ParentComponent() {
  return (
    <div>
      <ChildComponent 
        name="田中太郎" 
        age={25} 
        isActive={true}
      />
    </div>
  )
}

// 子コンポーネント
interface ChildComponentProps {
  name: string;
  age: number;
  isActive: boolean;
}

function ChildComponent({ name, age, isActive }: ChildComponentProps) {
  return (
    <div>
      <h2>{name}</h2>
      <p>年齢: {age}歳</p>
      <p>ステータス: {isActive ? 'アクティブ' : '非アクティブ'}</p>
    </div>
  )
}
```

## 🔧 実践的なコンポーネント例

### 1. Buttonコンポーネント

再利用可能なボタンコンポーネントの実装例：

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  // バリアント（見た目の種類）に応じたスタイルクラス
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent',
  }

  // サイズに応じたスタイルクラス
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  }

  // 全てのクラスを結合
  const buttonClasses = [
    'font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    variantClasses[variant],
    sizeClasses[size],
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    className,
  ].join(' ')

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
```

**使用例：**
```typescript
<Button variant="primary" size="large" onClick={handleClick}>
  クリックしてください
</Button>
```

### 2. Cardコンポーネント

情報を整理して表示するカードコンポーネント：

```typescript
interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  children?: React.ReactNode;
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
}

export default function Card({
  title,
  description,
  imageUrl,
  imageAlt,
  children,
  className = '',
  clickable = false,
  onClick,
}: CardProps) {
  const baseClasses = 'bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-200'
  const clickableClasses = clickable
    ? 'hover:shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-200'
    : ''

  const cardClasses = [baseClasses, clickableClasses, className].join(' ')

  const CardContent = () => (
    <>
      {imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={imageAlt || title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        
        {description && (
          <p className="text-gray-600 mb-4 leading-relaxed">
            {description}
          </p>
        )}
        
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </div>
    </>
  )

  if (clickable && onClick) {
    return (
      <button className={cardClasses} onClick={onClick}>
        <CardContent />
      </button>
    )
  }

  return (
    <div className={cardClasses}>
      <CardContent />
    </div>
  )
}
```

**使用例：**
```typescript
<Card 
  title="記事のタイトル" 
  description="記事の説明文"
  imageUrl="/image.jpg"
  clickable
  onClick={handleCardClick}
>
  <p>追加のコンテンツ</p>
</Card>
```

## 🏗️ 複合コンポーネントの作成

複数のコンポーネントを組み合わせて、より複雑な機能を持つコンポーネントを作成できます。

### BlogPostCardコンポーネントの例

```typescript
interface BlogPostCardProps {
  post: BlogPost;
  onReadMore?: (postId: string) => void;
  className?: string;
}

export default function BlogPostCard({
  post,
  onReadMore,
  className = '',
}: BlogPostCardProps) {
  const handleReadMore = () => {
    if (onReadMore) {
      onReadMore(post.id)
    }
  }

  return (
    <Card
      title={post.title}
      description={post.excerpt}
      imageUrl={post.imageUrl}
      className={className}
    >
      <div className="space-y-4">
        {/* UserProfileコンポーネントを使用 */}
        <UserProfile
          user={post.author}
          avatarSize="small"
          showDetails={false}
        />

        {/* 公開日 */}
        <div className="text-sm text-gray-500">
          {formatDate(post.publishedAt)}
        </div>

        {/* タグ */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Buttonコンポーネントを使用 */}
        <Button
          variant="primary"
          size="small"
          onClick={handleReadMore}
        >
          続きを読む
        </Button>
      </div>
    </Card>
  )
}
```

## 📝 TypeScriptによる型安全性

TypeScriptを使用することで、Propsの型安全性を確保できます。

### 型定義のベストプラクティス

1. **インターフェースの使用**
```typescript
interface ComponentProps {
  // 必須のプロパティ
  title: string;
  // オプショナルなプロパティ
  description?: string;
  // ユニオン型を使った制限
  variant?: 'primary' | 'secondary' | 'danger';
  // 関数型のプロパティ
  onClick?: (id: string) => void;
  // React要素のプロパティ
  children?: React.ReactNode;
}
```

2. **デフォルト値の設定**
```typescript
export default function Component({
  title,
  description = '',
  variant = 'primary',
  onClick,
  children,
}: ComponentProps) {
  // コンポーネントの実装
}
```

3. **型の再利用**
```typescript
// 共通の型を定義
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large';

// 複数のコンポーネントで使用
interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

interface IconButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon: string;
}
```

## 🎨 スタイリングのベストプラクティス

### 1. 条件付きスタイリング

```typescript
const getButtonClasses = (variant: ButtonVariant, size: ButtonSize, disabled: boolean) => {
  const baseClasses = 'font-medium rounded-lg transition-colors duration-200'
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
  }
  
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  }
  
  return [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  ].join(' ')
}
```

### 2. カスタムクラスの受け入れ

```typescript
interface ComponentProps {
  className?: string;
}

export default function Component({ className = '' }: ComponentProps) {
  return (
    <div className={`base-classes ${className}`}>
      {/* コンテンツ */}
    </div>
  )
}
```

## 🧪 コンポーネントのテスト

コンポーネントをテストする際の基本的なアプローチ：

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  test('正しくレンダリングされる', () => {
    render(<Button>クリック</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('クリック')).toBeInTheDocument()
  })

  test('クリックイベントが正しく動作する', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>クリック</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('無効状態が正しく適用される', () => {
    render(<Button disabled>クリック</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

## 🚀 実践課題

### 課題1: 基本的なコンポーネントの作成

`Badge`コンポーネントを作成してください：

```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
}

// 実装してください
export default function Badge({ children, variant = 'default', size = 'medium' }: BadgeProps) {
  // ここに実装
}
```

### 課題2: 複合コンポーネントの作成

`ProductCard`コンポーネントを作成してください：

- 商品画像
- 商品名
- 価格
- 評価（星）
- 「カートに追加」ボタン

### 課題3: フォームコンポーネントの作成

`Input`コンポーネントを作成してください：

- ラベル
- プレースホルダー
- エラーメッセージ
- バリデーション状態の表示

## 📖 参考資料

- [React Components and Props](https://react.dev/learn/passing-props-to-a-component)
- [TypeScript with React](https://react.dev/learn/typescript)
- [Next.js Components](https://nextjs.org/docs/app/building-your-application/ui/components)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 🔗 関連する学習例

- **前の例**: [02-pages-and-routing](../examples/02-pages-and-routing/) - ページとルーティング
- **次の例**: [04-server-client-components](../examples/04-server-client-components/) - Server/Client Components
- **実践例**: [03-components-and-props](../examples/03-components-and-props/) - このドキュメントの実装例

---

このドキュメントを通じて、再利用可能なコンポーネントの作成方法と、Propsを使った効果的なデータの受け渡しについて理解を深めてください。コンポーネント指向の開発は、保守性と再利用性の高いアプリケーションを構築するための重要な概念です。