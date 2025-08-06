import Link from "next/link";

/**
 * ホームページコンポーネント
 * 
 * 各スタイリング手法の概要と特徴を説明し、
 * 実際の例へのリンクを提供します。
 */
export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ページタイトル */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Next.jsスタイリング手法の比較
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          CSS Modules、Tailwind CSS、styled-componentsの3つの主要なスタイリング手法を
          実際のコード例とともに学習できます。
        </p>
      </div>

      {/* スタイリング手法の比較カード */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {/* CSS Modules */}
        <div className="card hover:shadow-lg transition-shadow">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">CSS Modules</h2>
            <div className="w-12 h-1 bg-blue-500 rounded"></div>
          </div>
          <p className="text-gray-600 mb-6">
            CSSファイルをモジュールとして扱い、クラス名の衝突を防ぐ手法。
            従来のCSSの書き方を保ちながら、スコープを限定できます。
          </p>
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">特徴:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• クラス名の自動ハッシュ化</li>
              <li>• 従来のCSS記法が使用可能</li>
              <li>• ビルド時の最適化</li>
              <li>• TypeScript対応</li>
            </ul>
          </div>
          <Link 
            href="/css-modules" 
            className="btn-primary inline-block text-center w-full"
          >
            CSS Modules例を見る
          </Link>
        </div>

        {/* Tailwind CSS */}
        <div className="card hover:shadow-lg transition-shadow">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tailwind CSS</h2>
            <div className="w-12 h-1 bg-green-500 rounded"></div>
          </div>
          <p className="text-gray-600 mb-6">
            ユーティリティファーストのCSSフレームワーク。
            事前定義されたクラスを組み合わせて素早くスタイリングできます。
          </p>
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">特徴:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• ユーティリティクラス</li>
              <li>• 高度なカスタマイズ性</li>
              <li>• 未使用CSSの自動削除</li>
              <li>• レスポンシブデザイン対応</li>
            </ul>
          </div>
          <Link 
            href="/tailwind" 
            className="btn-primary inline-block text-center w-full"
          >
            Tailwind CSS例を見る
          </Link>
        </div>

        {/* styled-components */}
        <div className="card hover:shadow-lg transition-shadow">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">styled-components</h2>
            <div className="w-12 h-1 bg-purple-500 rounded"></div>
          </div>
          <p className="text-gray-600 mb-6">
            CSS-in-JSライブラリの一つ。JavaScriptの中でCSSを書き、
            動的なスタイリングが簡単に実現できます。
          </p>
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">特徴:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• CSS-in-JS</li>
              <li>• 動的スタイリング</li>
              <li>• テーマ機能</li>
              <li>• SSR対応</li>
            </ul>
          </div>
          <Link 
            href="/styled-components" 
            className="btn-primary inline-block text-center w-full"
          >
            styled-components例を見る
          </Link>
        </div>
      </div>

      {/* 比較表 */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">手法別比較表</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 font-semibold text-gray-900">項目</th>
                <th className="py-3 px-4 font-semibold text-gray-900">CSS Modules</th>
                <th className="py-3 px-4 font-semibold text-gray-900">Tailwind CSS</th>
                <th className="py-3 px-4 font-semibold text-gray-900">styled-components</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium">学習コスト</td>
                <td className="py-3 px-4 text-green-600">低</td>
                <td className="py-3 px-4 text-yellow-600">中</td>
                <td className="py-3 px-4 text-red-600">高</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium">開発速度</td>
                <td className="py-3 px-4 text-yellow-600">中</td>
                <td className="py-3 px-4 text-green-600">高</td>
                <td className="py-3 px-4 text-yellow-600">中</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium">バンドルサイズ</td>
                <td className="py-3 px-4 text-green-600">小</td>
                <td className="py-3 px-4 text-green-600">小</td>
                <td className="py-3 px-4 text-yellow-600">中</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium">動的スタイリング</td>
                <td className="py-3 px-4 text-red-600">困難</td>
                <td className="py-3 px-4 text-yellow-600">可能</td>
                <td className="py-3 px-4 text-green-600">簡単</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">TypeScript対応</td>
                <td className="py-3 px-4 text-green-600">良好</td>
                <td className="py-3 px-4 text-green-600">良好</td>
                <td className="py-3 px-4 text-green-600">良好</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 学習の進め方 */}
      <div className="mt-12 card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">学習の進め方</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">CSS Modulesから始める</h3>
              <p className="text-gray-600">従来のCSSに近い書き方で、スコープの概念を学習</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Tailwind CSSで効率化を体験</h3>
              <p className="text-gray-600">ユーティリティクラスによる高速開発を体験</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">styled-componentsで動的スタイリング</h3>
              <p className="text-gray-600">CSS-in-JSによる柔軟なスタイリングを学習</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}