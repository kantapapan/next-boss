import React from 'react'
import { BaseComponentProps, ButtonVariant, ButtonSize } from '@/types'

/**
 * Buttonコンポーネントのプロパティ型定義
 * 
 * このインターフェースは、Buttonコンポーネントが受け取る
 * すべてのプロパティを定義します。
 */
interface ButtonProps extends BaseComponentProps {
  /** ボタンのバリアント（見た目のスタイル） */
  variant?: ButtonVariant
  /** ボタンのサイズ */
  size?: ButtonSize
  /** ボタンが無効かどうか */
  disabled?: boolean
  /** ボタンがローディング状態かどうか */
  loading?: boolean
  /** ボタンのタイプ */
  type?: 'button' | 'submit' | 'reset'
  /** クリックイベントハンドラー */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** ボタンの幅を100%にするかどうか */
  fullWidth?: boolean
  /** アイコン（左側） */
  leftIcon?: React.ReactNode
  /** アイコン（右側） */
  rightIcon?: React.ReactNode
}

/**
 * 再利用可能なButtonコンポーネント
 * 
 * このコンポーネントは、アプリケーション全体で一貫したボタンスタイルを
 * 提供します。様々なバリアント、サイズ、状態をサポートしています。
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   クリック
 * </Button>
 * ```
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  ...props
}: ButtonProps) {
  // バリアントに基づくスタイルクラス
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white border-transparent',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white border-transparent',
    outline: 'bg-transparent hover:bg-gray-50 text-gray-700 border-gray-300',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border-transparent',
    danger: 'bg-red-600 hover:bg-red-700 text-white border-transparent',
  }

  // サイズに基づくスタイルクラス
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  // 基本スタイルクラス
  const baseStyles = [
    'inline-flex items-center justify-center',
    'font-medium rounded-md border',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    fullWidth ? 'w-full' : '',
    variantStyles[variant],
    sizeStyles[size],
    className,
  ].filter(Boolean).join(' ')

  return (
    <button
      type={type}
      className={baseStyles}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {/* ローディングスピナー */}
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

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