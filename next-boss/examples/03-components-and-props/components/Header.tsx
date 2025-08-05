'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { BaseComponentProps, NavigationItem, User } from '@/types'
import Button from './Button'

/**
 * Headerコンポーネントのプロパティ型定義
 */
interface HeaderProps extends BaseComponentProps {
  /** サイトのロゴURL */
  logoUrl?: string
  /** サイト名 */
  siteName?: string
  /** ナビゲーションアイテム */
  navigationItems?: NavigationItem[]
  /** ログイン中のユーザー情報 */
  user?: User | null
  /** ログインボタンのクリックハンドラー */
  onLogin?: () => void
  /** ログアウトボタンのクリックハンドラー */
  onLogout?: () => void
  /** 検索機能を表示するかどうか */
  showSearch?: boolean
  /** 検索クエリの変更ハンドラー */
  onSearchChange?: (query: string) => void
  /** モバイルメニューの表示状態 */
  mobileMenuOpen?: boolean
  /** モバイルメニューの表示状態変更ハンドラー */
  onMobileMenuToggle?: () => void
}

/**
 * 再利用可能なHeaderコンポーネント
 * 
 * このコンポーネントは、サイト全体で使用される共通のヘッダーを提供します。
 * ロゴ、ナビゲーション、ユーザーメニュー、検索機能などを含みます。
 * 
 * @example
 * ```tsx
 * <Header
 *   siteName="My Site"
 *   navigationItems={navItems}
 *   user={currentUser}
 *   onLogin={handleLogin}
 *   onLogout={handleLogout}
 * />
 * ```
 */
export default function Header({
  logoUrl,
  siteName = 'Next Boss',
  navigationItems = [],
  user,
  onLogin,
  onLogout,
  showSearch = false,
  onSearchChange,
  className = '',
  ...props
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  // 検索クエリの変更処理
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearchChange?.(query)
  }

  // モバイルメニューの切り替え
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // ユーザーメニューの切り替え
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen)
  }

  return (
    <header
      className={`bg-white shadow-sm border-b border-gray-200 ${className}`}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴとサイト名 */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={siteName}
                  className="h-8 w-auto mr-3"
                />
              ) : (
                <div className="h-8 w-8 bg-blue-600 rounded mr-3 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {siteName.charAt(0)}
                  </span>
                </div>
              )}
              <span className="text-xl font-semibold text-gray-900">
                {siteName}
              </span>
            </Link>
          </div>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 検索バー */}
          {showSearch && (
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="検索..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* ユーザーメニュー */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 focus:outline-none"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="hidden md:block text-sm font-medium">
                    {user.name}
                  </span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* ユーザードロップダウンメニュー */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      プロフィール
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      設定
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        onLogout?.()
                        setUserMenuOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      ログアウト
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={onLogin}
              >
                ログイン
              </Button>
            )}

            {/* モバイルメニューボタン */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {/* モバイル検索 */}
            {showSearch && (
              <div className="px-4 pb-4">
                <input
                  type="text"
                  placeholder="検索..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* モバイルナビゲーション */}
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* オーバーレイ（ユーザーメニューを閉じるため） */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </header>
  )
}