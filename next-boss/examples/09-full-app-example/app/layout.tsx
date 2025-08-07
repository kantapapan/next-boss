/**
 * Root Layout Component
 * 
 * アプリケーション全体のレイアウトを定義します。
 * 完全なブログアプリケーションのメインレイアウトです。
 */

import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Next.js Blog - モダンなブログアプリケーション',
    template: '%s | Next.js Blog',
  },
  description: 'Next.js 15とTypeScriptで構築されたモダンなブログアプリケーション。最新のWeb技術について学習し、共有するためのプラットフォームです。',
  keywords: ['Next.js', 'React', 'TypeScript', 'ブログ', 'Web開発', 'フロントエンド'],
  authors: [{ name: 'Next.js Blog Team' }],
  creator: 'Next.js Blog',
  publisher: 'Next.js Blog',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3009'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'http://localhost:3009',
    title: 'Next.js Blog - モダンなブログアプリケーション',
    description: 'Next.js 15とTypeScriptで構築されたモダンなブログアプリケーション',
    siteName: 'Next.js Blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js Blog - モダンなブログアプリケーション',
    description: 'Next.js 15とTypeScriptで構築されたモダンなブログアプリケーション',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-50">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}