'use client'

import React from 'react'
import Link from 'next/link'
import { BaseComponentProps, NavigationItem } from '@/types'

/**
 * Footerコンポーネントのプロパティ型定義
 */
interface FooterProps extends BaseComponentProps {
  /** サイト名 */
  siteName?: string
  /** 著作権年 */
  copyrightYear?: number
  /** フッターリンクのセクション */
  linkSections?: FooterLinkSection[]
  /** ソーシャルメディアリンク */
  socialLinks?: SocialLink[]
  /** ニュースレター購読機能を表示するかどうか */
  showNewsletter?: boolean
  /** ニュースレター購読ハンドラー */
  onNewsletterSubscribe?: (email: string) => void
  /** 会社情報 */
  companyInfo?: {
    address?: string
    phone?: string
    email?: string
  }
}

/**
 * フッターリンクセクションの型定義
 */
interface FooterLinkSection {
  title: string
  links: NavigationItem[]
}

/**
 * ソーシャルメディアリンクの型定義
 */
interface SocialLink {
  name: string
  href: string
  icon: React.ReactNode
}

/**
 * 再利用可能なFooterコンポーネント
 * 
 * このコンポーネントは、サイト全体で使用される共通のフッターを提供します。
 * リンクセクション、ソーシャルメディアリンク、ニュースレター購読、
 * 会社情報などを含むことができます。
 * 
 * @example
 * ```tsx
 * <Footer
 *   siteName="My Site"
 *   linkSections={footerSections}
 *   socialLinks={socialLinks}
 *   showNewsletter={true}
 * />
 * ```
 */
export default function Footer({
  siteName = 'Next Boss',
  copyrightYear = new Date().getFullYear(),
  linkSections = [],
  socialLinks = [],
  showNewsletter = false,
  onNewsletterSubscribe,
  companyInfo,
  className = '',
  children,
  ...props
}: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = React.useState('')
  const [isSubscribing, setIsSubscribing] = React.useState(false)

  // ニュースレター購読処理
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return

    setIsSubscribing(true)
    try {
      await onNewsletterSubscribe?.(newsletterEmail)
      setNewsletterEmail('')
      // 成功メッセージを表示（実装は省略）
    } catch (error) {
      // エラーメッセージを表示（実装は省略）
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
    <footer
      className={`bg-gray-900 text-white ${className}`}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* メインフッターコンテンツ */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* サイト情報セクション */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-blue-600 rounded mr-3 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {siteName.charAt(0)}
                  </span>
                </div>
                <span className="text-xl font-semibold">
                  {siteName}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Next.jsを学習するための包括的なリソースとサンプルコードを提供しています。
                初心者から上級者まで、段階的に学習を進められます。
              </p>

              {/* ソーシャルメディアリンク */}
              {socialLinks.length > 0 && (
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* リンクセクション */}
            {linkSections.map((section, index) => (
              <div key={index} className="lg:col-span-1">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* ニュースレター購読セクション */}
            {showNewsletter && (
              <div className="lg:col-span-1">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  ニュースレター
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  最新の学習コンテンツやアップデート情報をお届けします。
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <input
                    type="email"
                    placeholder="メールアドレス"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubscribing ? '登録中...' : '購読する'}
                  </button>
                </form>
              </div>
            )}

            {/* 会社情報セクション */}
            {companyInfo && (
              <div className="lg:col-span-1">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  お問い合わせ
                </h3>
                <div className="space-y-3 text-sm text-gray-400">
                  {companyInfo.address && (
                    <div className="flex items-start">
                      <svg
                        className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>{companyInfo.address}</span>
                    </div>
                  )}
                  {companyInfo.phone && (
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <a
                        href={`tel:${companyInfo.phone}`}
                        className="hover:text-white transition-colors"
                      >
                        {companyInfo.phone}
                      </a>
                    </div>
                  )}
                  {companyInfo.email && (
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <a
                        href={`mailto:${companyInfo.email}`}
                        className="hover:text-white transition-colors"
                      >
                        {companyInfo.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* カスタムコンテンツ */}
          {children && (
            <div className="mt-8 pt-8 border-t border-gray-800">
              {children}
            </div>
          )}
        </div>

        {/* フッター下部（著作権情報） */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {copyrightYear} {siteName}. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                プライバシーポリシー
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                利用規約
              </Link>
              <Link
                href="/sitemap"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                サイトマップ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

/**
 * シンプルなFooterコンポーネント
 * 
 * 最小限の情報のみを表示するシンプルなフッターです。
 */
interface SimpleFooterProps extends BaseComponentProps {
  siteName?: string
  copyrightYear?: number
}

export function SimpleFooter({
  siteName = 'Next Boss',
  copyrightYear = new Date().getFullYear(),
  className = '',
  ...props
}: SimpleFooterProps) {
  return (
    <footer
      className={`bg-gray-100 border-t border-gray-200 py-8 ${className}`}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            &copy; {copyrightYear} {siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}