'use client';

import { useState } from 'react';

/**
 * Tailwind CSS例のページコンポーネント
 * 
 * Tailwind CSSの特徴を示します：
 * - ユーティリティクラスによる高速開発
 * - レスポンシブデザインの簡単な実装
 * - 状態管理との組み合わせ
 * - カスタムコンポーネントの作成
 */
export default function TailwindPage() {
  const [activeTab, setActiveTab] = useState('utilities');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'ユーザーが新規登録しました', type: 'success', time: '2分前' },
    { id: 2, message: 'システムメンテナンスのお知らせ', type: 'warning', time: '1時間前' },
    { id: 3, message: 'エラーが発生しました', type: 'error', time: '3時間前' },
  ]);

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* ヘッダー */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tailwind CSS例</h1>
              <p className="text-gray-600 mt-1">ユーティリティファーストのCSSフレームワーク</p>
            </div>
            
            {/* モバイルメニューボタン */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* タブナビゲーション */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'utilities', label: 'ユーティリティクラス' },
                { id: 'components', label: 'コンポーネント例' },
                { id: 'responsive', label: 'レスポンシブ' },
                { id: 'animations', label: 'アニメーション' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* ユーティリティクラス例 */}
        {activeTab === 'utilities' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">ユーティリティクラスの例</h2>
              
              {/* スペーシング例 */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">スペーシング</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-100 rounded-lg">
                    <code className="text-sm font-mono">p-4</code>
                    <p className="text-sm text-gray-600 mt-1">padding: 1rem</p>
                  </div>
                  <div className="m-4 p-2 bg-green-100 rounded-lg">
                    <code className="text-sm font-mono">m-4 p-2</code>
                    <p className="text-sm text-gray-600 mt-1">margin: 1rem, padding: 0.5rem</p>
                  </div>
                  <div className="mx-auto p-3 bg-purple-100 rounded-lg w-32">
                    <code className="text-sm font-mono">mx-auto</code>
                    <p className="text-sm text-gray-600 mt-1">margin: 0 auto</p>
                  </div>
                </div>
              </div>

              {/* カラー例 */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">カラーパレット</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {['blue', 'green', 'purple', 'red', 'yellow', 'gray'].map((color) => (
                    <div key={color} className="text-center">
                      <div className={`w-16 h-16 rounded-lg bg-${color}-500 mx-auto mb-2 shadow-md`}></div>
                      <code className="text-xs font-mono">{color}-500</code>
                    </div>
                  ))}
                </div>
              </div>

              {/* タイポグラフィ例 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">タイポグラフィ</h3>
                <div className="space-y-3">
                  <p className="text-xs text-gray-600">text-xs: とても小さなテキスト</p>
                  <p className="text-sm text-gray-700">text-sm: 小さなテキスト</p>
                  <p className="text-base text-gray-800">text-base: 基本サイズのテキスト</p>
                  <p className="text-lg text-gray-900">text-lg: 大きなテキスト</p>
                  <p className="text-xl font-semibold text-gray-900">text-xl font-semibold: より大きく太いテキスト</p>
                  <p className="text-2xl font-bold text-blue-600">text-2xl font-bold: 見出しサイズ</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* コンポーネント例 */}
        {activeTab === 'components' && (
          <div className="space-y-8">
            {/* カード例 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">カードコンポーネント</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 基本カード */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">基本カード</h3>
                    <p className="text-gray-600 text-sm">Tailwind CSSで作成したシンプルなカードです。</p>
                  </div>
                </div>

                {/* 画像付きカード */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-32 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">画像付きカード</h3>
                    <p className="text-gray-600 text-sm">アイコンやイメージを含むカードの例です。</p>
                  </div>
                </div>

                {/* アクション付きカード */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-32 bg-gradient-to-r from-purple-400 to-purple-600"></div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">アクション付きカード</h3>
                    <p className="text-gray-600 text-sm mb-4">ボタンやリンクを含むカードです。</p>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors">
                      詳細を見る
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 通知例 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">通知コンポーネント</h2>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      notification.type === 'success'
                        ? 'bg-green-50 border-green-400'
                        : notification.type === 'warning'
                        ? 'bg-yellow-50 border-yellow-400'
                        : 'bg-red-50 border-red-400'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          {notification.type === 'success' && (
                            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                          {notification.type === 'warning' && (
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          )}
                          {notification.type === 'error' && (
                            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="ml-3">
                          <p className={`text-sm font-medium ${
                            notification.type === 'success'
                              ? 'text-green-800'
                              : notification.type === 'warning'
                              ? 'text-yellow-800'
                              : 'text-red-800'
                          }`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* レスポンシブ例 */}
        {activeTab === 'responsive' && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">レスポンシブデザイン</h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">ブレークポイント別レイアウト</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-100 p-4 rounded-lg text-center">
                  <p className="font-medium">モバイル</p>
                  <p className="text-sm text-gray-600">grid-cols-1</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg text-center">
                  <p className="font-medium">タブレット</p>
                  <p className="text-sm text-gray-600">md:grid-cols-2</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg text-center">
                  <p className="font-medium">デスクトップ</p>
                  <p className="text-sm text-gray-600">lg:grid-cols-4</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg text-center">
                  <p className="font-medium">大画面</p>
                  <p className="text-sm text-gray-600">xl:grid-cols-4</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">レスポンシブテキスト</h3>
              <div className="space-y-4">
                <p className="text-sm md:text-base lg:text-lg xl:text-xl">
                  このテキストは画面サイズに応じてサイズが変わります
                </p>
                <p className="text-xs text-gray-600">
                  text-sm md:text-base lg:text-lg xl:text-xl
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">レスポンシブスペーシング</h3>
              <div className="p-2 md:p-4 lg:p-6 xl:p-8 bg-gray-100 rounded-lg">
                <p className="text-center">パディングが画面サイズに応じて変わります</p>
                <p className="text-xs text-gray-600 text-center mt-2">
                  p-2 md:p-4 lg:p-6 xl:p-8
                </p>
              </div>
            </div>
          </div>
        )}

        {/* アニメーション例 */}
        {activeTab === 'animations' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">アニメーション例</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* ホバーエフェクト */}
                <div className="text-center">
                  <h3 className="font-semibold text-gray-800 mb-4">ホバーエフェクト</h3>
                  <div className="bg-blue-500 text-white p-4 rounded-lg cursor-pointer transform hover:scale-105 hover:bg-blue-600 transition-all duration-300">
                    ホバーしてください
                  </div>
                </div>

                {/* フェードイン */}
                <div className="text-center">
                  <h3 className="font-semibold text-gray-800 mb-4">フェードイン</h3>
                  <div className="bg-green-500 text-white p-4 rounded-lg animate-pulse">
                    パルスアニメーション
                  </div>
                </div>

                {/* スピン */}
                <div className="text-center">
                  <h3 className="font-semibold text-gray-800 mb-4">スピン</h3>
                  <div className="flex justify-center">
                    <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>

                {/* バウンス */}
                <div className="text-center">
                  <h3 className="font-semibold text-gray-800 mb-4">バウンス</h3>
                  <div className="bg-red-500 text-white p-4 rounded-lg animate-bounce">
                    バウンス
                  </div>
                </div>

                {/* スライド */}
                <div className="text-center">
                  <h3 className="font-semibold text-gray-800 mb-4">トランジション</h3>
                  <div className="bg-yellow-500 text-white p-4 rounded-lg cursor-pointer hover:translate-x-2 transition-transform duration-300">
                    スライド
                  </div>
                </div>

                {/* 回転 */}
                <div className="text-center">
                  <h3 className="font-semibold text-gray-800 mb-4">回転</h3>
                  <div className="bg-indigo-500 text-white p-4 rounded-lg cursor-pointer hover:rotate-12 transition-transform duration-300">
                    回転
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}