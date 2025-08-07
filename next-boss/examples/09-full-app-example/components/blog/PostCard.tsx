/**
 * PostCard Component
 * 
 * ブログ投稿のカードコンポーネント
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types';
import { formatDate, formatRelativeDate, calculateReadingTime } from '@/lib/utils';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'featured' | 'compact';
}

const PostCard: React.FC<PostCardProps> = ({ post, variant = 'default' }) => {
  const readingTime = calculateReadingTime(post.content);

  if (variant === 'compact') {
    return (
      <Card padding="sm" className="hover:shadow-lg transition-shadow">
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="flex space-x-3">
            {post.coverImage && (
              <div className="flex-shrink-0">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={80}
                  height={60}
                  className="rounded-md object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              <div className="flex items-center mt-1 text-xs text-gray-500">
                <span>{formatRelativeDate(post.publishedAt || post.createdAt)}</span>
                <span className="mx-1">•</span>
                <span>{readingTime}分</span>
                {post.viewCount > 0 && (
                  <>
                    <span className="mx-1">•</span>
                    <span>{post.viewCount.toLocaleString()} views</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  if (variant === 'featured') {
    return (
      <Card className="hover:shadow-xl transition-shadow">
        <Link href={`/blog/${post.slug}`} className="block">
          {post.coverImage && (
            <div className="relative h-48 mb-4">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="rounded-t-lg object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-3">
              {post.category && (
                <Badge
                  variant="default"
                  size="sm"
                  className="text-xs"
                  style={{
                    backgroundColor: `${post.category.color}20`,
                    color: post.category.color,
                  }}
                >
                  {post.category.name}
                </Badge>
              )}
              <span className="text-sm text-gray-500">
                {formatDate(post.publishedAt || post.createdAt)}
              </span>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
              {post.title}
            </h2>
            
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {post.author && (
                  <div className="flex items-center space-x-2">
                    {post.author.avatar && (
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    )}
                    <span className="text-sm text-gray-700">
                      {post.author.name}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{readingTime}分</span>
                {post.viewCount > 0 && (
                  <>
                    <span>•</span>
                    <span>{post.viewCount.toLocaleString()} views</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex space-x-4">
          {post.coverImage && (
            <div className="flex-shrink-0">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={120}
                height={90}
                className="rounded-md object-cover"
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              {post.category && (
                <Badge
                  variant="secondary"
                  size="sm"
                  style={{
                    backgroundColor: `${post.category.color}20`,
                    color: post.category.color,
                  }}
                >
                  {post.category.name}
                </Badge>
              )}
              <span className="text-sm text-gray-500">
                {formatRelativeDate(post.publishedAt || post.createdAt)}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
              {post.title}
            </h3>
            
            <p className="text-gray-600 mb-3 line-clamp-2">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {post.author && (
                  <>
                    {post.author.avatar && (
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    )}
                    <span className="text-sm text-gray-700">
                      {post.author.name}
                    </span>
                  </>
                )}
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{readingTime}分</span>
                {post.viewCount > 0 && (
                  <>
                    <span>•</span>
                    <span>{post.viewCount.toLocaleString()} views</span>
                  </>
                )}
              </div>
            </div>
            
            {/* タグ */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" size="sm">
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <Badge variant="secondary" size="sm">
                    +{post.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default PostCard;