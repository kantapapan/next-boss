import type { NextConfig } from 'next'

/**
 * Next.js設定ファイル - ルーティング例用
 * 
 * この例では、ルーティング機能を学習するための設定を行います。
 * 動的ルートやネストしたレイアウトの動作を理解できます。
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
  
  // リダイレクト設定の例
  async redirects() {
    return [
      {
        source: '/old-about',
        destination: '/about',
        permanent: true,
      },
    ]
  },
}

export default nextConfig