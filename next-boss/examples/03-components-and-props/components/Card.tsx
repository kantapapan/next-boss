import React from 'react'
import { BaseComponentProps } from '@/types'
import Button from './Button'

/**
 * Cardコンポーネントのプロパティ型定義
 */
interface CardProps extends BaseComponentProps {
  /** カードのタイトル */
  title?: string
  /** カードの説明文 */
  description?: string
  /** カードの画像URL */
  imageUrl?: string
  /** カードの画像の代替テキスト */
  imageAlt?: string
  /** フッター部分のコンテンツ */
  footer?: React.ReactNode
  /** カードがホバー可能かどうか */
  hoverable?: boolean
  /** カードの境界線を表示するかどうか */
  bordered?: boolean
  /** カードの影を表示するかどうか */
  shadow?: boolean
  /** クリックイベントハンドラー */
  onClick?: () => void
}

/**
 * 再利用可能なCardコンポーネント
 * 
 * このコンポーネントは、コンテンツを整理して表示するための
 * カードレイアウトを提供します。画像、タイトル、説明、フッターを
 * 含むことができます。
 * 
 * @example
 * ```tsx
 * <Card
 *   title="記事タイトル"
 *   description="記事の説明文"
 *   imageUrl="/image.jpg"
 *   footer={<Button>詳細を見る</Button>}
 * />
 * ```
 */
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
  children,
  className = '',
  ...props
}: CardProps) {
  // 基本スタイルクラス
  const baseStyles = [
    'bg-white rounded-lg overflow-hidden',
    bordered ? 'border border-gray-200' : '',
    shadow ? 'shadow-md' : '',
    hoverable ? 'hover:shadow-lg transition-shadow duration-200 cursor-pointer' : '',
    onClick ? 'cursor-pointer' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div
      className={baseStyles}
      onClick={onClick}
      {...props}
    >
      {/* カード画像 */}
      {imageUrl && (
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={imageUrl}
            alt={imageAlt || title || ''}
            className="w-full h-48 object-cover"
          />
        </div>
      )}

      {/* カードコンテンツ */}
      <div className="p-6">
        {/* タイトル */}
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </h3>
        )}

        {/* 説明文 */}
        {description && (
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {description}
          </p>
        )}

        {/* 子要素（カスタムコンテンツ） */}
        {children}
      </div>

      {/* フッター */}
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  )
}

/**
 * ProductCardコンポーネント
 * 
 * 商品表示に特化したCardコンポーネントの拡張版です。
 * 価格、評価、在庫状況などの商品固有の情報を表示できます。
 */
interface ProductCardProps extends BaseComponentProps {
  /** 商品名 */
  name: string
  /** 商品説明 */
  description: string
  /** 商品価格 */
  price: number
  /** 商品画像URL */
  imageUrl: string
  /** 評価（1-5） */
  rating?: number
  /** レビュー数 */
  reviewCount?: number
  /** 在庫があるかどうか */
  inStock?: boolean
  /** カートに追加ボタンのクリックハンドラー */
  onAddToCart?: () => void
  /** 詳細表示ボタンのクリックハンドラー */
  onViewDetails?: () => void
}

export function ProductCard({
  name,
  description,
  price,
  imageUrl,
  rating = 0,
  reviewCount = 0,
  inStock = true,
  onAddToCart,
  onViewDetails,
  className = '',
  ...props
}: ProductCardProps) {
  // 星評価の表示
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-sm ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ))
  }

  // 価格のフォーマット
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(price)
  }

  return (
    <Card
      className={className}
      hoverable
      {...props}
    >
      {/* 商品画像 */}
      <div className="relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-48 object-cover"
        />
        {!inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">在庫切れ</span>
          </div>
        )}
      </div>

      {/* 商品情報 */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">
          {name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {description}
        </p>

        {/* 評価とレビュー */}
        {rating > 0 && (
          <div className="flex items-center mb-3">
            <div className="flex items-center mr-2">
              {renderStars(rating)}
            </div>
            <span className="text-sm text-gray-500">
              ({reviewCount} レビュー)
            </span>
          </div>
        )}

        {/* 価格 */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(price)}
          </span>
          {!inStock && (
            <span className="text-red-500 text-sm font-medium">
              在庫切れ
            </span>
          )}
        </div>

        {/* アクションボタン */}
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="sm"
            fullWidth
            disabled={!inStock}
            onClick={onAddToCart}
          >
            カートに追加
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onViewDetails}
          >
            詳細
          </Button>
        </div>
      </div>
    </Card>
  )
}