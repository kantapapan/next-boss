/**
 * ブログアプリケーション用データストア
 * 
 * 実際のプロジェクトではデータベースを使用しますが、
 * 学習目的のため、メモリ内にデータを保存します。
 */

import { User, Post, Category, Comment } from '@/types';

// ユーザーデータ
let users: User[] = [
  {
    id: '1',
    name: '田中太郎',
    email: 'tanaka@example.com',
    avatar: undefined,
    bio: 'フロントエンド開発者。React、Next.jsを中心に開発しています。',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: '佐藤花子',
    email: 'sato@example.com',
    avatar: undefined,
    bio: 'UI/UXデザイナー兼フロントエンド開発者。デザインシステムに興味があります。',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    name: '山田次郎',
    email: 'yamada@example.com',
    avatar: undefined,
    bio: 'バックエンド開発者。Node.js、TypeScriptでAPI開発をしています。',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
  },
];

// カテゴリデータ
let categories: Category[] = [
  {
    id: '1',
    name: 'Next.js',
    slug: 'nextjs',
    description: 'Next.jsに関する記事',
    color: '#000000',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'React',
    slug: 'react',
    description: 'Reactに関する記事',
    color: '#61DAFB',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'TypeScript',
    slug: 'typescript',
    description: 'TypeScriptに関する記事',
    color: '#3178C6',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'CSS',
    slug: 'css',
    description: 'CSS・スタイリングに関する記事',
    color: '#1572B6',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'チュートリアル',
    slug: 'tutorial',
    description: 'ステップバイステップのチュートリアル',
    color: '#FF6B6B',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// ブログ投稿データ
let posts: Post[] = [
  {
    id: '1',
    title: 'Next.js 15の新機能を徹底解説',
    slug: 'nextjs-15-new-features',
    content: `# Next.js 15の新機能を徹底解説

Next.js 15がリリースされ、多くの新機能と改善が追加されました。この記事では、主要な新機能について詳しく解説します。

## App Routerの改善

App Routerがさらに安定し、パフォーマンスが向上しました。特に以下の点が改善されています：

- ルーティングの高速化
- メタデータAPIの拡張
- エラーハンドリングの改善

## Server Componentsの最適化

Server Componentsの実行効率が大幅に改善され、より複雑なアプリケーションでも高いパフォーマンスを維持できるようになりました。

## まとめ

Next.js 15は、開発者体験とパフォーマンスの両面で大きな進歩を遂げています。ぜひアップグレードを検討してみてください。`,
    excerpt: 'Next.js 15の主要な新機能と改善点について詳しく解説します。App Routerの改善、Server Componentsの最適化など、開発者が知っておくべきポイントをまとめました。',
    coverImage: undefined,
    authorId: '1',
    categoryId: '1',
    tags: ['Next.js', 'React', 'Web開発', 'フロントエンド'],
    published: true,
    publishedAt: '2024-01-15T10:00:00Z',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    viewCount: 1250,
  },
  {
    id: '2',
    title: 'React Server Componentsの基本と実践',
    slug: 'react-server-components-guide',
    content: `# React Server Componentsの基本と実践

React Server Componentsは、Reactアプリケーションのパフォーマンスを大幅に改善する革新的な機能です。

## Server Componentsとは

Server Componentsは、サーバー上で実行されるReactコンポーネントです。従来のClient Componentsとは異なり、JavaScriptバンドルに含まれません。

## 主な利点

1. **バンドルサイズの削減**: サーバーで実行されるため、クライアントのJavaScriptバンドルサイズが小さくなります
2. **初期読み込み速度の向上**: サーバーでレンダリングされるため、初期表示が高速です
3. **SEOの改善**: サーバーサイドレンダリングにより、検索エンジンの最適化が向上します

## 実装例

\`\`\`tsx
// Server Component
async function BlogPost({ id }: { id: string }) {
  const post = await fetchPost(id);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
\`\`\`

## まとめ

Server Componentsを適切に活用することで、パフォーマンスとユーザー体験を大幅に改善できます。`,
    excerpt: 'React Server Componentsの基本概念から実践的な使い方まで、詳しく解説します。パフォーマンス改善の鍵となる技術を理解しましょう。',
    coverImage: undefined,
    authorId: '2',
    categoryId: '2',
    tags: ['React', 'Server Components', 'パフォーマンス', 'Next.js'],
    published: true,
    publishedAt: '2024-01-10T14:30:00Z',
    createdAt: '2024-01-10T13:00:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    viewCount: 890,
  },
  {
    id: '3',
    title: 'TypeScriptでより安全なReact開発',
    slug: 'typescript-react-development',
    content: `# TypeScriptでより安全なReact開発

TypeScriptを使用することで、Reactアプリケーションの品質と保守性を大幅に向上させることができます。

## TypeScriptの利点

### 型安全性
コンパイル時にエラーを検出できるため、ランタイムエラーを大幅に削減できます。

### 開発体験の向上
IDEの補完機能やリファクタリング支援により、開発効率が向上します。

## Reactコンポーネントの型定義

\`\`\`tsx
interface Props {
  title: string;
  count: number;
  onIncrement: () => void;
}

const Counter: React.FC<Props> = ({ title, count, onIncrement }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>Count: {count}</p>
      <button onClick={onIncrement}>Increment</button>
    </div>
  );
};
\`\`\`

## カスタムフックの型定義

\`\`\`tsx
function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState<number>(initialValue);
  
  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  
  return { count, increment };
}
\`\`\`

## まとめ

TypeScriptを活用することで、より堅牢で保守性の高いReactアプリケーションを構築できます。`,
    excerpt: 'TypeScriptを使ったReact開発のベストプラクティスを紹介します。型安全性を活かした開発手法を学びましょう。',
    coverImage: undefined,
    authorId: '3',
    categoryId: '3',
    tags: ['TypeScript', 'React', '型安全性', '開発効率'],
    published: true,
    publishedAt: '2024-01-08T16:00:00Z',
    createdAt: '2024-01-08T15:00:00Z',
    updatedAt: '2024-01-08T16:00:00Z',
    viewCount: 675,
  },
  {
    id: '4',
    title: 'CSS-in-JSからCSS Modulesへの移行ガイド',
    slug: 'css-in-js-to-css-modules-migration',
    content: `# CSS-in-JSからCSS Modulesへの移行ガイド

CSS-in-JSからCSS Modulesへの移行は、パフォーマンスとメンテナンス性の向上をもたらします。

## 移行の理由

### パフォーマンスの改善
CSS Modulesは実行時のオーバーヘッドがなく、より高速です。

### ビルド時間の短縮
CSS-in-JSライブラリの処理が不要になり、ビルド時間が短縮されます。

## 移行手順

### 1. CSS Modulesファイルの作成

\`\`\`css
/* Button.module.css */
.button {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.primary {
  background-color: #0070f3;
  color: white;
}

.secondary {
  background-color: #f4f4f4;
  color: #333;
}
\`\`\`

### 2. コンポーネントの更新

\`\`\`tsx
import styles from './Button.module.css';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ variant, children, onClick }) => {
  return (
    <button 
      className={\`\${styles.button} \${styles[variant]}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
\`\`\`

## まとめ

CSS Modulesへの移行により、パフォーマンスと保守性の両方を改善できます。`,
    excerpt: 'CSS-in-JSからCSS Modulesへの移行方法を詳しく解説します。パフォーマンス改善とメンテナンス性向上のための実践的なガイドです。',
    coverImage: undefined,
    authorId: '2',
    categoryId: '4',
    tags: ['CSS', 'CSS Modules', 'パフォーマンス', 'スタイリング'],
    published: true,
    publishedAt: '2024-01-05T11:15:00Z',
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-05T11:15:00Z',
    viewCount: 432,
  },
  {
    id: '5',
    title: 'Next.js初心者のための完全ガイド',
    slug: 'nextjs-beginner-complete-guide',
    content: `# Next.js初心者のための完全ガイド

Next.jsを始めたい方のための包括的なガイドです。基本から応用まで、ステップバイステップで学習できます。

## Next.jsとは

Next.jsは、Reactベースのフルスタックフレームワークです。以下の特徴があります：

- サーバーサイドレンダリング（SSR）
- 静的サイト生成（SSG）
- API Routes
- 自動コード分割
- 画像最適化

## セットアップ

### 1. プロジェクトの作成

\`\`\`bash
npx create-next-app@latest my-blog --typescript --tailwind --eslint
cd my-blog
npm run dev
\`\`\`

### 2. ディレクトリ構造

\`\`\`
my-blog/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── public/
├── package.json
└── next.config.js
\`\`\`

## 基本的なページの作成

### ホームページ

\`\`\`tsx
// app/page.tsx
export default function Home() {
  return (
    <main>
      <h1>Welcome to My Blog</h1>
      <p>Next.jsで作成したブログです。</p>
    </main>
  );
}
\`\`\`

### 動的ルート

\`\`\`tsx
// app/blog/[slug]/page.tsx
interface Props {
  params: { slug: string };
}

export default function BlogPost({ params }: Props) {
  return (
    <article>
      <h1>Blog Post: {params.slug}</h1>
    </article>
  );
}
\`\`\`

## データフェッチング

### Server Components

\`\`\`tsx
async function Posts() {
  const posts = await fetch('https://api.example.com/posts');
  const data = await posts.json();
  
  return (
    <div>
      {data.map((post: any) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
\`\`\`

## まとめ

Next.jsは強力で柔軟なフレームワークです。このガイドを参考に、素晴らしいWebアプリケーションを構築してください。`,
    excerpt: 'Next.js初心者向けの完全ガイド。セットアップから基本的な機能まで、ステップバイステップで学習できます。',
    coverImage: undefined,
    authorId: '1',
    categoryId: '5',
    tags: ['Next.js', '初心者', 'チュートリアル', 'React'],
    published: true,
    publishedAt: '2024-01-03T09:00:00Z',
    createdAt: '2024-01-03T08:00:00Z',
    updatedAt: '2024-01-03T09:00:00Z',
    viewCount: 2100,
  },
  {
    id: '6',
    title: 'モダンCSS技術の活用法',
    slug: 'modern-css-techniques',
    content: `# モダンCSS技術の活用法

最新のCSS技術を活用して、より効率的で保守性の高いスタイリングを実現する方法を紹介します。

## CSS Grid Layout

CSS Gridは、2次元レイアウトを簡単に作成できる強力な機能です。

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.grid-item {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
\`\`\`

## CSS Custom Properties (CSS変数)

CSS変数を使用することで、テーマの管理や動的なスタイリングが可能になります。

\`\`\`css
:root {
  --primary-color: #0070f3;
  --secondary-color: #f4f4f4;
  --text-color: #333;
  --border-radius: 8px;
  --spacing-unit: 1rem;
}

.button {
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--border-radius);
  padding: calc(var(--spacing-unit) * 0.75) calc(var(--spacing-unit) * 1.5);
}
\`\`\`

## Container Queries

Container Queriesを使用することで、親要素のサイズに基づいてスタイルを適用できます。

\`\`\`css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
    align-items: center;
  }
  
  .card-image {
    width: 150px;
    height: 150px;
  }
}
\`\`\`

## まとめ

モダンCSS技術を活用することで、より柔軟で保守性の高いスタイリングが可能になります。`,
    excerpt: '最新のCSS技術（CSS Grid、CSS変数、Container Queriesなど）の活用法を詳しく解説します。',
    coverImage: undefined,
    authorId: '2',
    categoryId: '4',
    tags: ['CSS', 'CSS Grid', 'CSS変数', 'モダンCSS'],
    published: false,
    createdAt: '2024-01-20T14:00:00Z',
    updatedAt: '2024-01-20T14:00:00Z',
    viewCount: 0,
  },
];

// コメントデータ
let comments: Comment[] = [
  {
    id: '1',
    content: 'とても参考になる記事でした！Next.js 15の新機能について詳しく知ることができました。',
    authorName: '鈴木一郎',
    authorEmail: 'suzuki@example.com',
    postId: '1',
    createdAt: '2024-01-16T10:30:00Z',
    updatedAt: '2024-01-16T10:30:00Z',
  },
  {
    id: '2',
    content: 'Server Componentsの説明が分かりやすかったです。実際のプロジェクトで試してみたいと思います。',
    authorName: '高橋美咲',
    authorEmail: 'takahashi@example.com',
    postId: '2',
    createdAt: '2024-01-11T16:45:00Z',
    updatedAt: '2024-01-11T16:45:00Z',
  },
  {
    id: '3',
    content: 'TypeScriptの型定義例が具体的で理解しやすかったです。',
    authorName: '伊藤健太',
    authorEmail: 'ito@example.com',
    postId: '3',
    createdAt: '2024-01-09T09:15:00Z',
    updatedAt: '2024-01-09T09:15:00Z',
  },
  {
    id: '4',
    content: 'CSS Modulesへの移行を検討していたので、とても参考になりました。',
    authorName: '渡辺さくら',
    authorEmail: 'watanabe@example.com',
    postId: '4',
    createdAt: '2024-01-06T13:20:00Z',
    updatedAt: '2024-01-06T13:20:00Z',
  },
];

// データ操作関数
export const userStore = {
  getAll: (): User[] => users,
  getById: (id: string): User | undefined => users.find(user => user.id === id),
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
  delete: (id: string): boolean => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;
    
    users.splice(userIndex, 1);
    return true;
  },
};

export const categoryStore = {
  getAll: (): Category[] => categories,
  getById: (id: string): Category | undefined => categories.find(cat => cat.id === id),
  getBySlug: (slug: string): Category | undefined => categories.find(cat => cat.slug === slug),
};

export const postStore = {
  getAll: (): Post[] => {
    return posts.map(post => ({
      ...post,
      author: userStore.getById(post.authorId),
      category: categoryStore.getById(post.categoryId),
    }));
  },
  
  getPublished: (): Post[] => {
    return posts
      .filter(post => post.published)
      .map(post => ({
        ...post,
        author: userStore.getById(post.authorId),
        category: categoryStore.getById(post.categoryId),
      }))
      .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
  },
  
  getById: (id: string): Post | undefined => {
    const post = posts.find(post => post.id === id);
    if (!post) return undefined;
    
    return {
      ...post,
      author: userStore.getById(post.authorId),
      category: categoryStore.getById(post.categoryId),
    };
  },
  
  getBySlug: (slug: string): Post | undefined => {
    const post = posts.find(post => post.slug === slug);
    if (!post) return undefined;
    
    // ビュー数を増加
    post.viewCount += 1;
    
    return {
      ...post,
      author: userStore.getById(post.authorId),
      category: categoryStore.getById(post.categoryId),
    };
  },
  
  getByCategory: (categoryId: string): Post[] => {
    return posts
      .filter(post => post.categoryId === categoryId && post.published)
      .map(post => ({
        ...post,
        author: userStore.getById(post.authorId),
        category: categoryStore.getById(post.categoryId),
      }));
  },
  
  getByTag: (tag: string): Post[] => {
    return posts
      .filter(post => post.tags.includes(tag) && post.published)
      .map(post => ({
        ...post,
        author: userStore.getById(post.authorId),
        category: categoryStore.getById(post.categoryId),
      }));
  },
  
  getByAuthor: (authorId: string): Post[] => {
    return posts
      .filter(post => post.authorId === authorId && post.published)
      .map(post => ({
        ...post,
        author: userStore.getById(post.authorId),
        category: categoryStore.getById(post.categoryId),
      }));
  },
  
  search: (query: string): Post[] => {
    const lowercaseQuery = query.toLowerCase();
    return posts
      .filter(post => 
        post.published && (
          post.title.toLowerCase().includes(lowercaseQuery) ||
          post.content.toLowerCase().includes(lowercaseQuery) ||
          post.excerpt.toLowerCase().includes(lowercaseQuery) ||
          post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
        )
      )
      .map(post => ({
        ...post,
        author: userStore.getById(post.authorId),
        category: categoryStore.getById(post.categoryId),
      }));
  },
  
  getPopular: (limit: number = 5): Post[] => {
    return posts
      .filter(post => post.published)
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, limit)
      .map(post => ({
        ...post,
        author: userStore.getById(post.authorId),
        category: categoryStore.getById(post.categoryId),
      }));
  },
  
  getRecent: (limit: number = 5): Post[] => {
    return posts
      .filter(post => post.published)
      .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime())
      .slice(0, limit)
      .map(post => ({
        ...post,
        author: userStore.getById(post.authorId),
        category: categoryStore.getById(post.categoryId),
      }));
  },
};

export const commentStore = {
  getAll: (): Comment[] => comments,
  getByPostId: (postId: string): Comment[] => {
    return comments
      .filter(comment => comment.postId === postId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  },
  create: (commentData: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>): Comment => {
    const newComment: Comment = {
      ...commentData,
      id: (comments.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    comments.push(newComment);
    return newComment;
  },
};

// 統計情報を取得する関数
export const getStats = () => {
  return {
    totalPosts: posts.filter(post => post.published).length,
    totalUsers: users.length,
    totalCategories: categories.length,
    totalViews: posts.reduce((sum, post) => sum + post.viewCount, 0),
    popularPosts: postStore.getPopular(3),
    recentPosts: postStore.getRecent(3),
  };
};

// 全てのタグを取得する関数
export const getAllTags = (): string[] => {
  const allTags = posts
    .filter(post => post.published)
    .flatMap(post => post.tags);
  
  return Array.from(new Set(allTags)).sort();
};