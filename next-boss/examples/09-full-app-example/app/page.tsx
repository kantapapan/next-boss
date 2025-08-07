/**
 * Home Page Component
 * 
 * ブログアプリケーションのホームページです。
 * 最新記事、人気記事、カテゴリなどを表示します。
 */

import React from 'react';
import Link from 'next/link';
import { postStore, categoryStore, getStats } from '@/lib/data';
import PostCard from '@/components/blog/PostCard';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default async function HomePage() {
  // データを並行して取得
  const [recentPosts, popularPosts, categories, stats] = await Promise.all([
    Promise.resolve(postStore.getRecent(6)),
    Promise.resolve(postStore.getPopular(3)),
    Promise.resolve(categoryStore.getAll()),
    Promise.resolve(getStats()),
  ]);

  const featuredPost = recentPosts[0];
  const otherRecentPosts = recentPosts.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ヒーローセクション */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Next.js Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Next.js 15とTypeScriptで構築されたモダンなブログアプリケーション。
            最新のWeb技術について学習し、共有するためのプラットフォームです。
          </p>
        </div>

        {/* 統計情報 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.totalPosts}
            </div>
            <div className="text-sm text-gray-600">記事</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.totalCategories}
            </div>
            <div className="text-sm text-gray-600">カテゴリ</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.totalUsers}
            </div>
            <div className="text-sm text-gray-600">著者</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {stats.totalViews.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">総閲覧数</div>
          </Card>
        </div>
      </section>

      {/* 注目記事 */}
      {featuredPost && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">注目記事</h2>
          <PostCard post={featuredPost} variant="featured" />
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* メインコンテンツ */}
        <div className="lg:col-span-2">
          {/* 最新記事 */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">最新記事</h2>
              <Link href="/blog">
                <Button variant="outline" size="sm">
                  すべて見る
                </Button>
              </Link>
            </div>
            <div className="space-y-6">
              {otherRecentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        </div>

        {/* サイドバー */}
        <div className="lg:col-span-1">
          {/* 人気記事 */}
          <section className="mb-8">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                人気記事
              </h3>
              <div className="space-y-4">
                {popularPosts.map((post, index) => (
                  <div key={post.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="block group"
                      >
                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <span>{post.viewCount.toLocaleString()} views</span>
                          {post.author && (
                            <>
                              <span className="mx-1">•</span>
                              <span>{post.author.name}</span>
                            </>
                          )}
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* カテゴリ */}
          <section className="mb-8">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                カテゴリ
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/blog/category/${category.slug}`}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="text-sm font-medium text-gray-900">
                        {category.name}
                      </span>
                    </div>
                    <Badge variant="secondary" size="sm">
                      {postStore.getByCategory(category.id).length}
                    </Badge>
                  </Link>
                ))}
              </div>
            </Card>
          </section>

          {/* ニュースレター */}
          <section>
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                ニュースレター
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                最新記事をメールでお届けします。
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="メールアドレス"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Button type="submit" className="w-full" size="sm">
                  購読する
                </Button>
              </form>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}