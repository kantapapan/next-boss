import type { NextConfig } from 'next'

/**
 * Next.js設定ファイル - Server/Client Components例用
 * 
 * この例では、Server ComponentsとClient Componentsの違いを
 * 学習するための設定を行います。
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
  
  // ログ設定（Server/Client Componentsの動作を確認するため）
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig