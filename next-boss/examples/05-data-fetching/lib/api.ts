/**
 * データフェッチング用のAPIライブラリ
 * 
 * Server ComponentとClient Componentの両方で使用できる
 * データフェッチング関数を提供します。
 */

import { User, Post, Comment, Photo, Album, Todo, RealTimeData } from '@/types'

// APIのベースURL
const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

/**
 * Server Component用のデータフェッチング関数
 * 
 * これらの関数はサーバーサイドで実行され、
 * Next.jsのキャッシュ機能を活用します。
 */

/**
 * 全ユーザーを取得（Server Component用）
 */
export async function getUsers(): Promise<User[]> {
  console.log('🔵 Server: Fetching users...')
  
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      // Next.js 15のキャッシュ設定
      next: { 
        revalidate: 3600, // 1時間キャッシュ
        tags: ['users'] // キャッシュタグ
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const users: User[] = await response.json()
    console.log(`🔵 Server: Successfully fetched ${users.length} users`)
    return users
  } catch (error) {
    console.error('🔴 Server: Error fetching users:', error)
    throw new Error('Failed to fetch users')
  }
}

/**
 * 特定のユーザーを取得（Server Component用）
 */
export async function getUser(id: number): Promise<User> {
  console.log(`🔵 Server: Fetching user ${id}...`)
  
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      next: { 
        revalidate: 1800, // 30分キャッシュ
        tags: [`user-${id}`]
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const user: User = await response.json()
    console.log(`🔵 Server: Successfully fetched user ${user.name}`)
    return user
  } catch (error) {
    console.error(`🔴 Server: Error fetching user ${id}:`, error)
    throw new Error(`Failed to fetch user ${id}`)
  }
}

/**
 * 全投稿を取得（Server Component用）
 */
export async function getPosts(limit?: number): Promise<Post[]> {
  console.log('🔵 Server: Fetching posts...')
  
  try {
    const url = limit 
      ? `${API_BASE_URL}/posts?_limit=${limit}`
      : `${API_BASE_URL}/posts`
    
    const response = await fetch(url, {
      next: { 
        revalidate: 1800, // 30分キャッシュ
        tags: ['posts']
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const posts: Post[] = await response.json()
    console.log(`🔵 Server: Successfully fetched ${posts.length} posts`)
    return posts
  } catch (error) {
    console.error('🔴 Server: Error fetching posts:', error)
    throw new Error('Failed to fetch posts')
  }
}

/**
 * 特定の投稿を取得（Server Component用）
 */
export async function getPost(id: number): Promise<Post> {
  console.log(`🔵 Server: Fetching post ${id}...`)
  
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      next: { 
        revalidate: 3600, // 1時間キャッシュ
        tags: [`post-${id}`]
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const post: Post = await response.json()
    console.log(`🔵 Server: Successfully fetched post "${post.title}"`)
    return post
  } catch (error) {
    console.error(`🔴 Server: Error fetching post ${id}:`, error)
    throw new Error(`Failed to fetch post ${id}`)
  }
}

/**
 * 投稿のコメントを取得（Server Component用）
 */
export async function getPostComments(postId: number): Promise<Comment[]> {
  console.log(`🔵 Server: Fetching comments for post ${postId}...`)
  
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
      next: { 
        revalidate: 1800, // 30分キャッシュ
        tags: [`post-${postId}-comments`]
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const comments: Comment[] = await response.json()
    console.log(`🔵 Server: Successfully fetched ${comments.length} comments`)
    return comments
  } catch (error) {
    console.error(`🔴 Server: Error fetching comments for post ${postId}:`, error)
    throw new Error(`Failed to fetch comments for post ${postId}`)
  }
}

/**
 * Client Component用のデータフェッチング関数
 * 
 * これらの関数はクライアントサイドで実行され、
 * ユーザーのインタラクションに応じてデータを取得します。
 */

/**
 * 写真一覧を取得（Client Component用）
 */
export async function fetchPhotos(albumId?: number, limit: number = 10): Promise<Photo[]> {
  console.log('🟡 Client: Fetching photos...')
  
  try {
    const url = albumId 
      ? `${API_BASE_URL}/albums/${albumId}/photos?_limit=${limit}`
      : `${API_BASE_URL}/photos?_limit=${limit}`
    
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const photos: Photo[] = await response.json()
    console.log(`🟡 Client: Successfully fetched ${photos.length} photos`)
    return photos
  } catch (error) {
    console.error('🔴 Client: Error fetching photos:', error)
    throw new Error('Failed to fetch photos')
  }
}

/**
 * アルバム一覧を取得（Client Component用）
 */
export async function fetchAlbums(userId?: number): Promise<Album[]> {
  console.log('🟡 Client: Fetching albums...')
  
  try {
    const url = userId 
      ? `${API_BASE_URL}/users/${userId}/albums`
      : `${API_BASE_URL}/albums`
    
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const albums: Album[] = await response.json()
    console.log(`🟡 Client: Successfully fetched ${albums.length} albums`)
    return albums
  } catch (error) {
    console.error('🔴 Client: Error fetching albums:', error)
    throw new Error('Failed to fetch albums')
  }
}

/**
 * Todo一覧を取得（Client Component用）
 */
export async function fetchTodos(userId?: number, completed?: boolean): Promise<Todo[]> {
  console.log('🟡 Client: Fetching todos...')
  
  try {
    let url = `${API_BASE_URL}/todos`
    const params = new URLSearchParams()
    
    if (userId) params.append('userId', userId.toString())
    if (completed !== undefined) params.append('completed', completed.toString())
    
    if (params.toString()) {
      url += `?${params.toString()}`
    }
    
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const todos: Todo[] = await response.json()
    console.log(`🟡 Client: Successfully fetched ${todos.length} todos`)
    return todos
  } catch (error) {
    console.error('🔴 Client: Error fetching todos:', error)
    throw new Error('Failed to fetch todos')
  }
}

/**
 * リアルタイムデータを生成（Client Component用）
 * 実際のプロジェクトではWebSocketやServer-Sent Eventsを使用
 */
export async function fetchRealTimeData(): Promise<RealTimeData> {
  console.log('🟡 Client: Generating real-time data...')
  
  // 実際のAPIコールを模擬
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const data: RealTimeData = {
    timestamp: new Date().toISOString(),
    value: Math.floor(Math.random() * 1000),
    status: Math.random() > 0.1 ? 'online' : 'offline',
    metrics: {
      cpu: Math.floor(Math.random() * 100),
      memory: Math.floor(Math.random() * 100),
      requests: Math.floor(Math.random() * 1000)
    }
  }
  
  console.log('🟡 Client: Real-time data generated')
  return data
}

/**
 * 検索機能（Client Component用）
 */
export async function searchPosts(query: string): Promise<Post[]> {
  console.log(`🟡 Client: Searching posts with query: "${query}"`)
  
  try {
    const response = await fetch(`${API_BASE_URL}/posts`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const allPosts: Post[] = await response.json()
    
    // クライアントサイドでフィルタリング
    const filteredPosts = allPosts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.body.toLowerCase().includes(query.toLowerCase())
    )
    
    console.log(`🟡 Client: Found ${filteredPosts.length} posts matching "${query}"`)
    return filteredPosts
  } catch (error) {
    console.error('🔴 Client: Error searching posts:', error)
    throw new Error('Failed to search posts')
  }
}

/**
 * エラーハンドリング用のヘルパー関数
 */
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return 'An unknown error occurred'
}