/**
 * インメモリデータストア
 * 
 * 実際のプロジェクトではデータベースを使用しますが、
 * 学習目的のため、メモリ内にデータを保存します。
 * 
 * 注意: サーバーを再起動するとデータは失われます。
 */

import { User, Post } from '@/types';

// ユーザーデータの初期値
let users: User[] = [
  {
    id: '1',
    name: '田中太郎',
    email: 'tanaka@example.com',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: '佐藤花子',
    email: 'sato@example.com',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

// ブログ投稿データの初期値
let posts: Post[] = [
  {
    id: '1',
    title: 'Next.js API Routesの基本',
    content: 'API Routesを使用してサーバーサイドAPIを構築する方法について説明します。',
    authorId: '1',
    published: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'RESTful APIの設計原則',
    content: 'RESTful APIを設計する際の重要な原則について解説します。',
    authorId: '2',
    published: false,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

// ユーザー関連のデータ操作関数
export const userStore = {
  // 全ユーザーを取得
  getAll: (): User[] => users,
  
  // IDでユーザーを取得
  getById: (id: string): User | undefined => 
    users.find(user => user.id === id),
  
  // 新しいユーザーを作成
  create: (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User => {
    const newUser: User = {
      ...userData,
      id: (users.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    users.push(newUser);
    return newUser;
  },
  
  // ユーザー情報を更新
  update: (id: string, userData: Partial<Omit<User, 'id' | 'createdAt'>>): User | null => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;
    
    users[userIndex] = {
      ...users[userIndex],
      ...userData,
      updatedAt: new Date().toISOString(),
    };
    return users[userIndex];
  },
  
  // ユーザーを削除
  delete: (id: string): boolean => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;
    
    users.splice(userIndex, 1);
    return true;
  },
};

// ブログ投稿関連のデータ操作関数
export const postStore = {
  // 全投稿を取得
  getAll: (): Post[] => posts,
  
  // 公開済み投稿のみを取得
  getPublished: (): Post[] => posts.filter(post => post.published),
  
  // IDで投稿を取得
  getById: (id: string): Post | undefined => 
    posts.find(post => post.id === id),
  
  // 著者IDで投稿を取得
  getByAuthorId: (authorId: string): Post[] => 
    posts.filter(post => post.authorId === authorId),
  
  // 新しい投稿を作成
  create: (postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Post => {
    const newPost: Post = {
      ...postData,
      id: (posts.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    posts.push(newPost);
    return newPost;
  },
  
  // 投稿を更新
  update: (id: string, postData: Partial<Omit<Post, 'id' | 'createdAt'>>): Post | null => {
    const postIndex = posts.findIndex(post => post.id === id);
    if (postIndex === -1) return null;
    
    posts[postIndex] = {
      ...posts[postIndex],
      ...postData,
      updatedAt: new Date().toISOString(),
    };
    return posts[postIndex];
  },
  
  // 投稿を削除
  delete: (id: string): boolean => {
    const postIndex = posts.findIndex(post => post.id === id);
    if (postIndex === -1) return false;
    
    posts.splice(postIndex, 1);
    return true;
  },
};