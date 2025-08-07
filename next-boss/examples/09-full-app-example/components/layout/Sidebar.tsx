/**
 * Sidebar Component
 * 
 * ブログページ用のサイドバーコンポーネント
 */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Category, Post, ApiResponse } from '@/types';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const Sidebar: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        // カテゴリを取得
        const categoriesResponse = await fetch('/api/categories');
        const categoriesData: ApiResponse<Category[]> = await categoriesResponse.json();
        if (categoriesData.success && categoriesData.data) {
          setCategories(categoriesData.data);
        }

        // 統計情報を取得（人気記事とタグ）
        const statsResponse = await fetch('/api/stats');
        const statsData: ApiResponse<any> = await statsResponse.json();
        if (statsData.success && statsData.data) {
          setPopularPosts(statsData.data.popularPosts || []);
        }

        // 投稿からタグを取得
        const postsResponse = await fetch('/api/posts?limit=100');
        const postsData: ApiResponse<Post[]> = await postsResponse.json();
        if (postsData.success && postsData.data) {
          const allTags = postsData.data
            .flatMap(post => post.tags)
            .filter((tag, index, array) => array.indexOf(tag) === index)
            .slice(0, 20); // 上位20個のタグ
          setTags(allTags);
        }
      } catch (error) {
        console.error('サイドバーデータの取得エラー:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSidebarData();
  }, []);

  if (loading) {
    return (
      <aside className="space-y-6">
        <Card>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              <div className="h-3 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </Card>
      </aside>
    );
  }

  return (
    <aside className="space-y-6">
      {/* カテゴリ */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          カテゴリ
        </h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/blog/category/${category.slug}`}
                className="flex items-center justify-between text-gray-600 hover:text-gray-900 transition-colors"
              >
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-sm">{category.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Card>

      {/* 人気記事 */}
      {popularPosts.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            人気記事
          </h3>
          <ul className="space-y-3">
            {popularPosts.map((post) => (
              <li key={post.id}>
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
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* タグクラウド */}
      {tags.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            タグ
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${encodeURIComponent(tag)}`}
              >
                <Badge
                  variant="secondary"
                  size="sm"
                  className="hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </Card>
      )}

      {/* ニュースレター */}
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            購読する
          </button>
        </form>
      </Card>
    </aside>
  );
};

export default Sidebar;