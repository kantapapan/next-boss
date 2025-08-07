# API Routes

Next.js API Routesは、サーバーサイドAPIを構築するための強力な機能です。App Routerでは、`app/api`ディレクトリ内に`route.ts`ファイルを作成することで、RESTful APIエンドポイントを簡単に実装できます。

## 📚 基本概念

### API Routesとは

API Routesは、Next.jsアプリケーション内でサーバーサイドAPIを構築するための仕組みです。フロントエンドとバックエンドを同じプロジェクト内で管理でき、フルスタックアプリケーションの開発を効率化します。

### App RouterでのAPI Routes

Next.js 13以降のApp Routerでは、以下の構造でAPI Routesを定義します：

```
app/
├── api/
│   ├── users/
│   │   ├── route.ts          # /api/users
│   │   └── [id]/
│   │       └── route.ts      # /api/users/[id]
│   └── posts/
│       └── route.ts          # /api/posts
```

## 🔧 基本的な実装

### 1. シンプルなGET API

```typescript
// app/api/hello/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Hello, World!',
    timestamp: new Date().toISOString()
  });
}
```

### 2. POST APIでデータを受け取る

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // リクエストボディを取得
    const body = await request.json();
    
    // データの処理（例：データベースに保存）
    const newUser = {
      id: Date.now().toString(),
      name: body.name,
      email: body.email,
      createdAt: new Date().toISOString()
    };
    
    return NextResponse.json(
      { success: true, data: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
```

### 3. 動的ルートパラメータ

```typescript
// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  const { id } = params;
  
  // IDを使用してユーザーを検索
  const user = await findUserById(id);
  
  if (!user) {
    return NextResponse.json(
      { success: false, error: 'User not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({
    success: true,
    data: user
  });
}
```

## 🌐 HTTPメソッドの実装

### 対応可能なHTTPメソッド

```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server';

// GET: データの取得
export async function GET(request: NextRequest) {
  return NextResponse.json({ method: 'GET' });
}

// POST: データの作成
export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ method: 'POST', data: body });
}

// PUT: データの更新（完全置換）
export async function PUT(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ method: 'PUT', data: body });
}

// PATCH: データの部分更新
export async function PATCH(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ method: 'PATCH', data: body });
}

// DELETE: データの削除
export async function DELETE(request: NextRequest) {
  return NextResponse.json({ method: 'DELETE' });
}
```

### メソッドが許可されていない場合の処理

```typescript
export async function POST() {
  return NextResponse.json(
    { error: 'Method Not Allowed' },
    { 
      status: 405,
      headers: {
        'Allow': 'GET, PUT, DELETE'
      }
    }
  );
}
```

## 🔍 リクエストの処理

### クエリパラメータの取得

```typescript
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';
  const published = searchParams.get('published');
  
  // クエリパラメータを使用してデータをフィルタリング
  let posts = await getAllPosts();
  
  if (published !== null) {
    const isPublished = published === 'true';
    posts = posts.filter(post => post.published === isPublished);
  }
  
  return NextResponse.json({
    data: posts,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit)
    }
  });
}
```

### ヘッダーの取得

```typescript
export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type');
  const authorization = request.headers.get('authorization');
  const userAgent = request.headers.get('user-agent');
  
  // 認証チェック
  if (!authorization) {
    return NextResponse.json(
      { error: 'Authorization header required' },
      { status: 401 }
    );
  }
  
  return NextResponse.json({ success: true });
}
```

### Cookieの処理

```typescript
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get('sessionId');
  
  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session not found' },
      { status: 401 }
    );
  }
  
  return NextResponse.json({ sessionId: sessionId.value });
}

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Cookieを設定
  response.cookies.set('sessionId', 'abc123', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7 // 1週間
  });
  
  return response;
}
```

## ✅ バリデーションとエラーハンドリング

### 入力データのバリデーション

```typescript
interface CreateUserRequest {
  name: string;
  email: string;
  age?: number;
}

function validateUserData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // 必須フィールドのチェック
  if (!data.name || typeof data.name !== 'string') {
    errors.push('名前は必須です');
  }
  
  if (!data.email || typeof data.email !== 'string') {
    errors.push('メールアドレスは必須です');
  } else {
    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('有効なメールアドレスを入力してください');
    }
  }
  
  // 年齢のチェック（オプション）
  if (data.age !== undefined) {
    if (typeof data.age !== 'number' || data.age < 0 || data.age > 150) {
      errors.push('年齢は0-150の数値で入力してください');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // バリデーション
    const validation = validateUserData(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation Error',
          details: validation.errors 
        },
        { status: 400 }
      );
    }
    
    // データの処理
    const newUser = await createUser(body);
    
    return NextResponse.json(
      { success: true, data: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

### 統一されたエラーレスポンス

```typescript
interface ApiError {
  success: false;
  error: string;
  message: string;
  statusCode: number;
  details?: any;
}

function createErrorResponse(
  error: string,
  message: string,
  statusCode: number,
  details?: any
): NextResponse<ApiError> {
  return NextResponse.json(
    {
      success: false,
      error,
      message,
      statusCode,
      details
    },
    { status: statusCode }
  );
}

// 使用例
export async function GET(request: NextRequest, { params }: RouteParams) {
  const user = await findUserById(params.id);
  
  if (!user) {
    return createErrorResponse(
      'Not Found',
      'ユーザーが見つかりません',
      404
    );
  }
  
  return NextResponse.json({ success: true, data: user });
}
```

## 🔐 セキュリティ対策

### CORS設定

```typescript
export async function GET(request: NextRequest) {
  const data = { message: 'Hello from API' };
  
  return NextResponse.json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
```

### レート制限

```typescript
const rateLimitMap = new Map();

function rateLimit(ip: string, limit: number = 100, windowMs: number = 60000) {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }
  
  const requests = rateLimitMap.get(ip);
  const recentRequests = requests.filter((time: number) => time > windowStart);
  
  if (recentRequests.length >= limit) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return true;
}

export async function POST(request: NextRequest) {
  const ip = request.ip || 'unknown';
  
  if (!rateLimit(ip, 10, 60000)) { // 1分間に10回まで
    return NextResponse.json(
      { error: 'Too Many Requests' },
      { status: 429 }
    );
  }
  
  // 通常の処理
  return NextResponse.json({ success: true });
}
```

## 🧪 テストとデバッグ

### APIのテスト

```typescript
// __tests__/api/users.test.ts
import { GET, POST } from '@/app/api/users/route';
import { NextRequest } from 'next/server';

describe('/api/users', () => {
  test('GET should return users list', async () => {
    const response = await GET();
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
  });
  
  test('POST should create new user', async () => {
    const requestBody = {
      name: 'Test User',
      email: 'test@example.com'
    };
    
    const request = new NextRequest('http://localhost:3000/api/users', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const response = await POST(request);
    const data = await response.json();
    
    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.data.name).toBe('Test User');
  });
});
```

### ログとデバッグ

```typescript
export async function POST(request: NextRequest) {
  console.log('API Request:', {
    method: request.method,
    url: request.url,
    headers: Object.fromEntries(request.headers.entries()),
    timestamp: new Date().toISOString()
  });
  
  try {
    const body = await request.json();
    console.log('Request Body:', body);
    
    const result = await processData(body);
    console.log('Processing Result:', result);
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('API Error:', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

## 🚀 パフォーマンス最適化

### キャッシュの実装

```typescript
import { NextRequest, NextResponse } from 'next/server';

const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5分

export async function GET(request: NextRequest) {
  const cacheKey = request.url;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.data, {
      headers: {
        'X-Cache': 'HIT'
      }
    });
  }
  
  const data = await fetchExpensiveData();
  
  cache.set(cacheKey, {
    data,
    timestamp: Date.now()
  });
  
  return NextResponse.json(data, {
    headers: {
      'X-Cache': 'MISS',
      'Cache-Control': 'public, max-age=300' // 5分間キャッシュ
    }
  });
}
```

### ストリーミングレスポンス

```typescript
export async function GET() {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    start(controller) {
      // 大量のデータを少しずつ送信
      const sendChunk = (chunk: any) => {
        const data = encoder.encode(JSON.stringify(chunk) + '\n');
        controller.enqueue(data);
      };
      
      // データを段階的に送信
      setTimeout(() => sendChunk({ id: 1, name: 'User 1' }), 100);
      setTimeout(() => sendChunk({ id: 2, name: 'User 2' }), 200);
      setTimeout(() => {
        sendChunk({ id: 3, name: 'User 3' });
        controller.close();
      }, 300);
    }
  });
  
  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'application/json',
      'Transfer-Encoding': 'chunked'
    }
  });
}
```

## 🔗 外部サービスとの連携

### データベース接続

```typescript
// lib/database.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsers() {
  return await prisma.user.findMany();
}

export async function createUser(data: { name: string; email: string }) {
  return await prisma.user.create({ data });
}

// app/api/users/route.ts
import { getUsers, createUser } from '@/lib/database';

export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Database error' },
      { status: 500 }
    );
  }
}
```

### 外部API呼び出し

```typescript
export async function GET() {
  try {
    // 外部APIからデータを取得
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      headers: {
        'User-Agent': 'MyApp/1.0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const users = await response.json();
    
    return NextResponse.json({
      success: true,
      data: users,
      source: 'external-api'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch external data' },
      { status: 502 }
    );
  }
}
```

## 📋 RESTful API設計原則

### 1. リソース指向の設計

```
GET    /api/users          # ユーザー一覧取得
POST   /api/users          # ユーザー作成
GET    /api/users/123      # 特定ユーザー取得
PUT    /api/users/123      # ユーザー更新（完全置換）
PATCH  /api/users/123      # ユーザー部分更新
DELETE /api/users/123      # ユーザー削除

GET    /api/users/123/posts # ユーザーの投稿一覧
POST   /api/users/123/posts # ユーザーの新規投稿
```

### 2. 適切なHTTPステータスコード

```typescript
// 成功レスポンス
return NextResponse.json(data, { status: 200 }); // OK
return NextResponse.json(data, { status: 201 }); // Created
return NextResponse.json(data, { status: 204 }); // No Content

// クライアントエラー
return NextResponse.json(error, { status: 400 }); // Bad Request
return NextResponse.json(error, { status: 401 }); // Unauthorized
return NextResponse.json(error, { status: 403 }); // Forbidden
return NextResponse.json(error, { status: 404 }); // Not Found
return NextResponse.json(error, { status: 409 }); // Conflict

// サーバーエラー
return NextResponse.json(error, { status: 500 }); // Internal Server Error
return NextResponse.json(error, { status: 502 }); // Bad Gateway
return NextResponse.json(error, { status: 503 }); // Service Unavailable
```

### 3. 一貫したレスポンス形式

```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

// 成功レスポンス
const successResponse: ApiResponse<User[]> = {
  success: true,
  data: users,
  message: 'Users retrieved successfully'
};

// エラーレスポンス
const errorResponse: ApiResponse = {
  success: false,
  error: 'Validation Error',
  message: 'Required fields are missing'
};
```

## 🎯 実践的な使用例

### ブログAPI の完全実装

```typescript
// app/api/blog/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// 投稿一覧取得（フィルタリング・ページネーション対応）
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const published = searchParams.get('published');
    const authorId = searchParams.get('authorId');
    
    let posts = await getAllPosts();
    
    // フィルタリング
    if (published !== null) {
      posts = posts.filter(post => post.published === (published === 'true'));
    }
    
    if (authorId) {
      posts = posts.filter(post => post.authorId === authorId);
    }
    
    // ページネーション
    const total = posts.length;
    const startIndex = (page - 1) * limit;
    const paginatedPosts = posts.slice(startIndex, startIndex + limit);
    
    return NextResponse.json({
      success: true,
      data: paginatedPosts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// 新規投稿作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // バリデーション
    const validation = validatePostData(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: 'Validation Error', details: validation.errors },
        { status: 400 }
      );
    }
    
    // 投稿作成
    const newPost = await createPost(body);
    
    return NextResponse.json(
      { success: true, data: newPost, message: 'Post created successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
```

この包括的なガイドを通じて、Next.js API Routesの基本から応用まで、実際のプロジェクトで活用できる知識を身につけることができます。RESTful APIの設計原則を理解し、セキュリティやパフォーマンスを考慮した堅牢なAPIを構築しましょう。