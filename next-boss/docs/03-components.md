# 03. Next.jsコンポーネント設計

Next.jsでの再利用可能なコンポーネント設計は、効率的で保守性の高いアプリケーション開発の基盤となります。このドキュメントでは、TypeScriptを活用した型安全なコンポーネント設計から、実践的な実装パターンまで、包括的に解説します。

## 🎯 この章の学習目標

- 再利用可能なコンポーネントの設計原則を理解する
- TypeScriptを使用した型安全なProps定義を習得する
- バリアント対応とカスタマイズ可能なコンポーネントの作成方法を学ぶ
- コンポーネント合成パターンの実装を理解する
- イベントハンドリングとデータの受け渡し方法を習得する
- Server ComponentsとClient Componentsの使い分けを学ぶ

## 📖 コンポーネント設計の基本原則

### 1. 単一責任の原則（Single Responsibility Principle）

各コンポーネントは一つの明確な責任を持つべきです。

```typescript
// ❌ 悪い例：複数の責任を持つコンポーネント
function UserProfileWithNavigation({ user, navigationItems }) {
  return (
    <div>
      <nav>{/* ナビゲーション */}</nav>
      <div>{/* ユーザープロフィール */}</div>
      <div>{/* 設定フォーム */}</div>
    </div>
  )
}

// ✅ 良い例：責任を分離したコンポーネント
function Navigation({ items }) { /* ナビゲーションの責任のみ */ }
function UserProfile({ user }) { /* プロフィール表示の責任のみ */ }
function SettingsForm({ onSave }) { /* 設定フォームの責任のみ */ }
```

### 2. 開放閉鎖の原則（Open-Closed Principle）

コンポーネントは拡張に対して開放的で、修正に対して閉鎖的であるべきです。

```typescript
// バリアントパターンで拡張性を確保
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  // 新しいバリアントを追加しやすい設計
}
```### 
3. 依存関係逆転の原則（Dependency Inversion Principle）

具体的な実装ではなく、抽象化に依存するべきです。

```typescript
// ❌ 悪い例：具体的な実装に依存
function UserList() {
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    // 具体的なAPI実装に依存
    fetch('/api/users').then(res => res.json()).then(setUsers)
  }, [])
  
  return <div>{/* ユーザーリスト */}</div>
}

// ✅ 良い例：抽象化されたインターフェースに依存
interface UserListProps {
  users: User[]
  onUserSelect?: (user: User) => void
}

function UserList({ users, onUserSelect }: UserListProps) {
  // データの取得方法に依存しない
  return <div>{/* ユーザーリスト */}</div>
}
```

## 🔧 TypeScriptによる型安全なProps設計

### 基本的なProps定義

```typescript
// 基本的なProps型定義
interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
  id?: string
  'data-testid'?: string
}

// 具体的なコンポーネントのProps
interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
```

### Union Types とリテラル型の活用

```typescript
// バリアント型の定義
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

// 条件付き型の活用
type ButtonProps<T extends 'button' | 'link' = 'button'> = {
  variant?: ButtonVariant
  size?: ButtonSize
} & (T extends 'button' 
  ? { onClick?: () => void } 
  : { href: string; target?: string }
)
```

### デフォルト値の設定

```typescript
export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  // コンポーネント実装
}
```#
# 🎨 バリアント対応コンポーネントの実装

### スタイルバリアントの管理

```typescript
// スタイルマッピングオブジェクト
const buttonVariants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
  outline: 'bg-transparent hover:bg-gray-50 text-gray-700 border-gray-300',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
} as const

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
} as const

// 動的クラス生成
function Button({ variant = 'primary', size = 'md', className, ...props }) {
  const classes = [
    'inline-flex items-center justify-center font-medium rounded-md',
    'transition-colors duration-200 focus:outline-none focus:ring-2',
    buttonVariants[variant],
    buttonSizes[size],
    className,
  ].filter(Boolean).join(' ')
  
  return <button className={classes} {...props} />
}
```

### 条件付きレンダリング

```typescript
function Button({
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  ...props
}) {
  return (
    <button disabled={disabled || loading} {...props}>
      {/* ローディングスピナー */}
      {loading && <LoadingSpinner />}
      
      {/* 左側アイコン */}
      {leftIcon && !loading && (
        <span className="mr-2">{leftIcon}</span>
      )}
      
      {/* ボタンテキスト */}
      {children}
      
      {/* 右側アイコン */}
      {rightIcon && (
        <span className="ml-2">{rightIcon}</span>
      )}
    </button>
  )
}
```

## 🧩 コンポーネント合成パターン

### Children Propパターン

```typescript
// 基本的なchildren prop
interface CardProps {
  title?: string
  children: React.ReactNode
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      {title && <h3>{title}</h3>}
      <div className="card-content">
        {children}
      </div>
    </div>
  )
}

// 使用例
<Card title="ユーザー情報">
  <p>名前: 田中太郎</p>
  <p>メール: tanaka@example.com</p>
  <Button>編集</Button>
</Card>
```### Render 
Propパターン

```typescript
// Render propを使用した柔軟なコンポーネント
interface DataFetcherProps<T> {
  url: string
  children: (data: T | null, loading: boolean, error: Error | null) => React.ReactNode
}

function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [url])
  
  return <>{children(data, loading, error)}</>
}

// 使用例
<DataFetcher<User[]> url="/api/users">
  {(users, loading, error) => {
    if (loading) return <LoadingSpinner />
    if (error) return <ErrorMessage error={error} />
    return <UserList users={users} />
  }}
</DataFetcher>
```

### Compound Componentパターン

```typescript
// 複合コンポーネントの実装
interface ModalContextType {
  isOpen: boolean
  onClose: () => void
}

const ModalContext = createContext<ModalContextType | null>(null)

function Modal({ children, isOpen, onClose }: ModalProps) {
  return (
    <ModalContext.Provider value={{ isOpen, onClose }}>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {children}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  )
}

function ModalHeader({ children }: { children: React.ReactNode }) {
  const context = useContext(ModalContext)
  return (
    <div className="modal-header">
      {children}
      <button onClick={context?.onClose}>×</button>
    </div>
  )
}

function ModalBody({ children }: { children: React.ReactNode }) {
  return <div className="modal-body">{children}</div>
}

function ModalFooter({ children }: { children: React.ReactNode }) {
  return <div className="modal-footer">{children}</div>
}

// 複合コンポーネントとして export
Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter

// 使用例
<Modal isOpen={isOpen} onClose={handleClose}>
  <Modal.Header>
    <h2>確認</h2>
  </Modal.Header>
  <Modal.Body>
    <p>本当に削除しますか？</p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="outline" onClick={handleClose}>
      キャンセル
    </Button>
    <Button variant="danger" onClick={handleDelete}>
      削除
    </Button>
  </Modal.Footer>
</Modal>
```## 🔄 イ
ベントハンドリングとデータの受け渡し

### イベントハンドラーの型定義

```typescript
// 基本的なイベントハンドラー
interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void
}

// カスタムイベントハンドラー
interface SearchInputProps {
  onSearch?: (query: string) => void
  onClear?: () => void
  onChange?: (value: string) => void
}

function SearchInput({ onSearch, onClear, onChange }: SearchInputProps) {
  const [value, setValue] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(value)
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    onChange?.(newValue)
  }
  
  const handleClear = () => {
    setValue('')
    onClear?.()
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input value={value} onChange={handleChange} />
      <button type="submit">検索</button>
      <button type="button" onClick={handleClear}>クリア</button>
    </form>
  )
}
```

### 状態の持ち上げ（Lifting State Up）

```typescript
// 親コンポーネントで状態を管理
function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  
  const handleUserSelect = (user: User) => {
    setSelectedUser(user)
  }
  
  const handleUserUpdate = (updatedUser: User) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u))
    setSelectedUser(updatedUser)
  }
  
  return (
    <div>
      <UserList 
        users={users} 
        selectedUser={selectedUser}
        onUserSelect={handleUserSelect} 
      />
      {selectedUser && (
        <UserDetail 
          user={selectedUser} 
          onUserUpdate={handleUserUpdate} 
        />
      )}
    </div>
  )
}

// 子コンポーネントはイベントを通知するだけ
function UserList({ users, selectedUser, onUserSelect }: UserListProps) {
  return (
    <ul>
      {users.map(user => (
        <li 
          key={user.id}
          className={selectedUser?.id === user.id ? 'selected' : ''}
          onClick={() => onUserSelect(user)}
        >
          {user.name}
        </li>
      ))}
    </ul>
  )
}
```##
 ⚡ Server ComponentsとClient Componentsの使い分け

### Server Components（デフォルト）

```typescript
// Server Component - サーバーサイドで実行
export default async function BlogPost({ params }: { params: { slug: string } }) {
  // サーバーサイドでデータフェッチ
  const post = await fetch(`https://api.example.com/posts/${params.slug}`)
    .then(res => res.json())
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {/* Client Componentを含むことができる */}
      <LikeButton postId={post.id} />
    </article>
  )
}
```

### Client Components

```typescript
'use client'

import { useState } from 'react'

// Client Component - ブラウザで実行
export default function LikeButton({ postId }: { postId: string }) {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(0)
  
  const handleLike = async () => {
    setLiked(!liked)
    // API呼び出し
    const response = await fetch(`/api/posts/${postId}/like`, {
      method: 'POST',
    })
    const data = await response.json()
    setCount(data.likeCount)
  }
  
  return (
    <button onClick={handleLike} className={liked ? 'liked' : ''}>
      ❤️ {count}
    </button>
  )
}
```

### 使い分けの指針

| 機能 | Server Component | Client Component |
|------|------------------|------------------|
| データフェッチング | ✅ 推奨 | ❌ 避ける |
| インタラクション | ❌ 不可 | ✅ 必須 |
| React Hooks | ❌ 使用不可 | ✅ 使用可能 |
| ブラウザAPI | ❌ 使用不可 | ✅ 使用可能 |
| SEO | ✅ 有利 | ❌ 不利 |
| 初期ロード | ✅ 高速 | ❌ 遅い |
| バンドルサイズ | ✅ 小さい | ❌ 大きい |

## 🎯 実践的なコンポーネント設計例

### 1. Buttonコンポーネント

```typescript
import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2'
  
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    outline: 'bg-transparent hover:bg-gray-50 text-gray-700 border border-gray-300',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  }
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }
  
  const classes = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    (disabled || loading) && 'opacity-50 cursor-not-allowed',
    className,
  ].filter(Boolean).join(' ')
  
  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner className="mr-2" />}
      {leftIcon && !loading && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  )
}
```###
 2. Cardコンポーネント

```typescript
import React from 'react'

interface CardProps {
  title?: string
  description?: string
  imageUrl?: string
  imageAlt?: string
  footer?: React.ReactNode
  hoverable?: boolean
  bordered?: boolean
  shadow?: boolean
  onClick?: () => void
  className?: string
  children?: React.ReactNode
}

export default function Card({
  title,
  description,
  imageUrl,
  imageAlt,
  footer,
  hoverable = false,
  bordered = true,
  shadow = true,
  onClick,
  className = '',
  children,
}: CardProps) {
  const baseStyles = 'bg-white rounded-lg overflow-hidden'
  
  const classes = [
    baseStyles,
    bordered && 'border border-gray-200',
    shadow && 'shadow-md',
    hoverable && 'hover:shadow-lg transition-shadow duration-200 cursor-pointer',
    onClick && 'cursor-pointer',
    className,
  ].filter(Boolean).join(' ')
  
  return (
    <div className={classes} onClick={onClick}>
      {imageUrl && (
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={imageUrl}
            alt={imageAlt || title || ''}
            className="w-full h-48 object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </h3>
        )}
        
        {description && (
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {description}
          </p>
        )}
        
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  )
}
```

## 🧪 テスト可能なコンポーネント設計

### テストフレンドリーなProps設計

```typescript
interface ButtonProps {
  // テスト用のdata属性
  'data-testid'?: string
  // アクセシビリティ属性
  'aria-label'?: string
  'aria-describedby'?: string
  // テスト可能なイベントハンドラー
  onClick?: (event: React.MouseEvent) => void
}

export default function Button({
  'data-testid': testId,
  'aria-label': ariaLabel,
  onClick,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      data-testid={testId}
      aria-label={ariaLabel}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
```

### テスト例

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
  
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(
      <Button onClick={handleClick} data-testid="test-button">
        Click me
      </Button>
    )
    
    fireEvent.click(screen.getByTestId('test-button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
  
  it('applies correct variant styles', () => {
    render(<Button variant="danger">Delete</Button>)
    const button = screen.getByText('Delete')
    expect(button).toHaveClass('bg-red-600')
  })
})
```