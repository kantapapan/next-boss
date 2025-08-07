/**
 * Posts API Route
 * 
 * ブログ投稿の一覧取得とフィルタリング機能を提供します。
 */

import { NextRequest, NextResponse } from 'next/server';
import { postStore, categoryStore, getAllTags } from '@/lib/data';
import { paginate } from '@/lib/utils';
import { SearchParams } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // クエリパラメータの取得
    const query = searchParams.get('query') || '';
    const category = searchParams.get('category') || '';
    const tag = searchParams.get('tag') || '';
    const author = searchParams.get('author') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sortBy = (searchParams.get('sortBy') as 'createdAt' | 'publishedAt' | 'viewCount' | 'title') || 'publishedAt';
    const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc';
    
    let posts = postStore.getPublished();
    
    // 検索フィルタリング
    if (query) {
      posts = postStore.search(query);
    }
    
    // カテゴリフィルタリング
    if (category) {
      const categoryData = categoryStore.getBySlug(category);
      if (categoryData) {
        posts = posts.filter(post => post.categoryId === categoryData.id);
      }
    }
    
    // タグフィルタリング
    if (tag) {
      posts = posts.filter(post => post.tags.includes(tag));
    }
    
    // 著者フィルタリング
    if (author) {
      posts = posts.filter(post => post.authorId === author);
    }
    
    // ソート
    posts.sort((a, b) => {
      let aValue: any;
      let bValue: any;
      
      switch (sortBy) {
        case 'title':
          aValue = a.title;
          bValue = b.title;
          break;
        case 'viewCount':
          aValue = a.viewCount;
          bValue = b.viewCount;
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case 'publishedAt':
        default:
          aValue = new Date(a.publishedAt || a.createdAt).getTime();
          bValue = new Date(b.publishedAt || b.createdAt).getTime();
          break;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    // ページネーション
    const paginatedResult = paginate(posts, page, limit);
    
    // フィルター情報
    const filters = {
      categories: categoryStore.getAll(),
      tags: getAllTags(),
      authors: Array.from(new Set(postStore.getPublished().map(post => post.author))).filter(Boolean),
    };
    
    return NextResponse.json({
      success: true,
      data: paginatedResult.data,
      pagination: paginatedResult.pagination,
      filters,
      message: `${paginatedResult.pagination.total}件の投稿を取得しました`,
    });
  } catch (error) {
    console.error('GET /api/posts error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
        message: '投稿の取得中にエラーが発生しました',
      },
      { status: 500 }
    );
  }
}