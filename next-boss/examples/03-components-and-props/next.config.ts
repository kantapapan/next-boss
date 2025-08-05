import type { NextConfig } from 'next'

/**
 * Next.js設定ファイル - コンポーネントとProps例用
 * 
 * この例では、コンポーネントの再利用性とPropsの活用を学習するための
 * 設定を行います。開発効率を向上させる設定も含まれています。
 */
const nextConfig: NextConfig = {
  // 実験的機能の設定
  experimental: {
    // 型安全なルーティングを有効にする
    typedRoutes: true,
  },
  
  // 開発時の設定
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // TypeScriptの設定
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // 画像最適化の設定
  images: {
    // 外部画像ドメインの許可（サンプル用）
    domains: ['via.placeholder.com', 'picsum.photos'],
  },
}

export default nextConfig