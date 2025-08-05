/**
 * データフェッチング用のライブラリ
 * 
 * Server ComponentsとClient Componentsでのデータフェッチングの
 * 違いを示すためのサンプルデータとAPI関数を提供します。
 */

// サンプルユーザーデータの型定義
export interface User {
  id: number
  name: string
  email: string
  website: string
  company: {
    name: string
    catchPhrase: string
  }
}

// サンプル投稿データの型定義
export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

// サンプルコメントデータの型定義
export interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

/**
 * Server Component用のデータフェッチング関数
 * 
 * これらの関数はサーバーサイドで実行され、
 * ビルド時またはリクエスト時にデータを取得します。
 */

// ユーザー一覧を取得（Server Component用）
export async function getUsers(): Promise<User[]> {
  console.log('🔵 Server: Fetching users...')
  
  // 実際のAPIを模擬するため、遅延を追加
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      // Next.js 15の新しいキャッシュ設定
      next: { revalidate: 3600 } // 1時間キャッシュ
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }
    
    const users = await response.json()
    console.log('🔵 Server: Users fetched successfully')
    return users
  } catch (error) {
    console.error('🔴 Server: Error fetching users:', error)
    // フォールバックデータを返す
    return [
      {
        id: 1,
        name: 'サンプルユーザー',
        email: 'sample@example.com',
        website: 'example.com',
        company: {
          name: 'サンプル会社',
          catchPhrase: 'サンプルのキャッチフレーズ'
        }
      }
    ]
  }
}

// 投稿一覧を取得（Server Component用）
export async function getPosts(): Promise<Post[]> {
  console.log('🔵 Server: Fetching posts...')
  
  await new Promise(resolve => setTimeout(resolve, 800))
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
      next: { revalidate: 1800 } // 30分キャッシュ
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }
    
    const posts = await response.json()
    console.log('🔵 Server: Posts fetched successfully')
    return posts
  } catch (error) {
    console.error('🔴 Server: Error fetching posts:', error)
    return [
      {
        id: 1,
        userId: 1,
        title: 'サンプル投稿',
        body: 'これはサンプルの投稿内容です。'
      }
    ]
  }
}

// 特定の投稿を取得（Server Component用）
export async function getPost(id: number): Promise<Post | null> {
  console.log(`🔵 Server: Fetching post ${id}...`)
  
  await new Promise(resolve => setTimeout(resolve, 600))
  
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      next: { revalidate: 3600 }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch post ${id}`)
    }
    
    const post = await response.json()
    console.log(`🔵 Server: Post ${id} fetched successfully`)
    return post
  } catch (error) {
    console.error(`🔴 Server: Error fetching post ${id}:`, error)
    return null
  }
}

/**
 * Client Component用のデータフェッチング関数
 * 
 * これらの関数はクライアントサイドで実行され、
 * ユーザーのインタラクションに応じてデータを取得します。
 */

// コメント一覧を取得（Client Component用）
export async function getComments(postId: number): Promise<Comment[]> {
  console.log(`🟡 Client: Fetching comments for post ${postId}...`)
  
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch comments for post ${postId}`)
    }
    
    const comments = await response.json()
    console.log(`🟡 Client: Comments for post ${postId} fetched successfully`)
    return comments
  } catch (error) {
    console.error(`🔴 Client: Error fetching comments for post ${postId}:`, error)
    return []
  }
}

// リアルタイムデータを取得（Client Component用）
export async function getRealTimeData(): Promise<{ timestamp: string; randomValue: number }> {
  console.log('🟡 Client: Fetching real-time data...')
  
  // リアルタイムデータを模擬
  return {
    timestamp: new Date().toISOString(),
    randomValue: Math.floor(Math.random() * 1000)
  }
}

/**
 * ローカルストレージ操作（Client Component専用）
 */
export const localStorage = {
  get: (key: string): string | null => {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem(key)
  },
  
  set: (key: string, value: string): void => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(key, value)
  },
  
  remove: (key: string): void => {
    if (typeof window === 'undefined') return
    window.localStorage.removeItem(key)
  }
}