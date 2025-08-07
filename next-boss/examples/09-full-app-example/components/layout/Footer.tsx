/**
 * Footer Component
 * 
 * サイト全体のフッターコンポーネント
 */

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    blog: [
      { label: '最新記事', href: '/blog' },
      { label: '人気記事', href: '/blog/popular' },
      { label: 'カテゴリ', href: '/categories' },
      { label: 'タグ', href: '/tags' },
    ],
    company: [
      { label: 'About', href: '/about' },
      { label: 'お問い合わせ', href: '/contact' },
      { label: 'プライバシーポリシー', href: '/privacy' },
      { label: '利用規約', href: '/terms' },
    ],
    social: [
      { label: 'Twitter', href: 'https://twitter.com' },
      { label: 'GitHub', href: 'https://github.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com' },
      { label: 'RSS', href: '/rss.xml' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ブランド情報 */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="ml-2 text-xl font-bold">
                Next.js Blog
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Next.jsを使用したモダンなブログアプリケーション。
              最新のWeb技術について学習し、共有するためのプラットフォームです。
            </p>
          </div>

          {/* ブログリンク */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ブログ</h3>
            <ul className="space-y-2">
              {footerLinks.blog.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 会社情報 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">会社情報</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ソーシャルリンク */}
          <div>
            <h3 className="text-lg font-semibold mb-4">フォローする</h3>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 区切り線 */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Next.js Blog. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Built with Next.js 15 & TypeScript
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;