import type { NextConfig } from "next";

/**
 * Next.js設定ファイル
 * 
 * データフェッチングの例では、外部APIへのアクセスを行うため、
 * 適切な設定を行います。
 */

const nextConfig: NextConfig = {
    // 実験的機能の有効化
    experimental: {
        // Server Actionsを有効化（フォーム処理で使用）
        serverActions: {
            allowedOrigins: ['localhost:3005']
        }
    },

    // 外部画像の最適化設定
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'jsonplaceholder.typicode.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/**',
            }
        ],
    },

    // 開発時の設定
    ...(process.env.NODE_ENV === 'development' && {
        // 開発時のログレベル
        logging: {
            fetches: {
                fullUrl: true,
            },
        },
    }),
};

export default nextConfig;