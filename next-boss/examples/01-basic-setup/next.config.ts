import type { NextConfig } from 'next'

/**
 * Next.js設定ファイル
 * 
 * このファイルはNext.jsアプリケーションの動作を制御します。
 * 基本的な設定から始めて、必要に応じて機能を追加していきます。
 */
const nextConfig: NextConfig = {
  // 実験的機能の設定
  experimental: {
    // TypeScriptの厳密な設定を有効にする
    typedRoutes: true,
  },
  
  // 開発時の設定
  eslint: {
    // ビルド時にESLintを実行する
    ignoreDuringBuilds: false,
  },
  
  // TypeScriptの設定
  typescript: {
    // ビルド時にTypeScriptエラーを無視しない
    ignoreBuildErrors: false,
  },
}

export default nextConfig