/**
 * Header Component
 * 
 * サイト全体のヘッダーコンポーネント
 */

import React from 'react';
import Link from 'next/link';
import { NavItem } from '@/types';

const Header: React.FC = () => {
  const navItems: NavItem[] = [
    { label: 'ホーム', href: '/' },
    { label: 'ブログ', href: '/blog' },
    { label: 'カテゴリ', href: '/categories' },
    { label: 'About', href: '/about' },
    { label: 'お問い合わせ', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">
                Next.js Blog
              </span>
            </Link>
          </div>

          {/* ナビゲーション */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 検索ボタン（モバイル用） */}
          <div className="flex items-center space-x-4">
            <Link
              href="/search"
              className="text-gray-600 hover:text-gray-900 p-2 rounded-md transition-colors"
              aria-label="検索"
            >
              <svg
                className="w-5 h-5"
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
            </Link>

            {/* モバイルメニューボタン */}
            <button
              className="md:hidden text-gray-600 hover:text-gray-900 p-2 rounded-md transition-colors"
              aria-label="メニューを開く"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* モバイルメニュー（実装は省略） */}
    </header>
  );
};

export default Header;