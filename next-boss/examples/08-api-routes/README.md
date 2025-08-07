# 08. API Routes 学習例

Next.js API Routesの基本的な使い方を学習するためのサンプルアプリケーションです。RESTful APIの設計原則に従って、ユーザーとブログ投稿の管理機能を実装しています。

## 📚 学習内容

### 基本概念
- **API Routes**: Next.js 13+ App RouterでのサーバーサイドAPI構築
- **RESTful API**: HTTPメソッド（GET, POST, PUT, DELETE）の適切な使い分け
- **エラーハンドリング**: 適切なHTTPステータスコードとエラーメッセージの返却
- **バリデーション**: リクエストデータの検証と安全性の確保
- **型安全性**: TypeScriptを活用した型定義とランタイム安全性

### 実装機能
- ✅ ユーザー管理（CRUD操作）
- ✅ ブログ投稿管理（CRUD操作）
- ✅ ヘルスチェック機能
- ✅ エラーハンドリング
- ✅ リクエストバリデーション
- ✅ レスポンス統一化

## 🚀 使用方法

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 開発サーバーの起動
```bash
npm run dev
```

### 3. ブラウザでアクセス
http://localhost:3008 にアクセスしてください。

## 📁 プロジェクト構造

```
08-api-routes/
├── app/
│   ├── api/                    # API Routes
│   │   ├── health/
│   │   │   └── route.ts       # ヘルスチェックAPI
│   │   ├── users/
│   │   │   ├── route.ts       # ユーザー一覧・作成API
│   │   │   └── [id]/
│   │   │       └── route.ts   # 個別ユーザーAPI
│   │   └── posts/
│   │       ├── route.ts       # 投稿一覧・作成API
│   │       └── [id]/
│   │           └── route.ts   # 個別投稿API
│   ├── users/
│   │   └── page.tsx          # ユーザー管理ページ
│   ├── posts/
│   │   └── page.tsx          # 投稿管理ページ
│   ├── api-test/
│   │   └── page.tsx          # APIテストページ
│   ├── layout.tsx            # ルートレイアウト
│   └── page.tsx              # ホームページ
├── lib/
│   ├── data.ts               # インメモリデータストア
│   └── api-utils.ts          # API共通ユーティリティ
├── types/
│   └── index.ts              # 型定義
└── README.md
```

## 🔗 API エンドポイント

### Health Check
- `GET /api/health` - サーバーの稼働状況確認

### Users API
- `GET /api/users` - 全ユーザー取得
- `POST /api/users` - ユーザー作成
- `GET /api/users/[id]` - 特定ユーザー取得
- `PUT /api/users/[id]` - ユーザー更新
- `DELETE /api/users/[id]` - ユーザー削除

### Posts API
- `GET /api/posts` - 全投稿取得（クエリパラメータ対応）
- `POST /api/posts` - 投稿作成
- `GET /api/posts/[id]` - 特定投稿取得
- `PUT /api/posts/[id]` - 投稿更新
- `DELETE /api/posts/[id]` - 投稿削除

## 💡 学習のポイント

### 1. API Routes の基本構造
```typescript
// app/api/users/route.ts
export async function GET() {
  // GET リクエストの処理
}

export async function POST(request: NextRequest) {
  // POST リクエストの処理
}
```

### 2. 動的ルートパラメータ
```typescript
// app/api/users/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  // 特定のユーザーを取得
}
```

### 3. エラーハンドリング
```typescript
if (!user) {
  return NextResponse.json(
    { success: false, error: 'User not found' },
    { status: 404 }
  );
}
```

### 4. バリデーション
```typescript
const validation = validateData(body, [
  { field: 'name', required: true, type: 'string', minLength: 1 },
  { field: 'email', required: true, type: 'email' }
]);
```

### 5. レスポンス統一化
```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

## 🧪 テスト機能

### APIテストページ
`/api-test` ページでは、各APIエンドポイントを実際にテストできます：

- ✅ 正常なリクエストのテスト
- ✅ エラーケースのテスト
- ✅ バリデーションエラーのテスト
- ✅ 存在しないリソースへのアクセステスト

### 実践ページ
- `/users` - ユーザー管理の実践
- `/posts` - 投稿管理の実践

## 🔧 カスタマイズ

### データストアの変更
現在はインメモリストアを使用していますが、実際のプロジェクトでは：

```typescript
// データベース接続例
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json({ success: true, data: users });
}
```

### 認証の追加
```typescript
// 認証ミドルウェア例
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.headers.get('authorization');
  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }
}
```

## 📖 関連ドキュメント

- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [RESTful API設計](https://restfulapi.net/)
- [HTTP ステータスコード](https://developer.mozilla.org/ja/docs/Web/HTTP/Status)
- [TypeScript](https://www.typescriptlang.org/)

## 🎯 次のステップ

1. **データベース統合**: Prisma、MongoDB、PostgreSQLなどとの連携
2. **認証・認可**: JWT、OAuth、NextAuth.jsの実装
3. **ミドルウェア**: リクエスト/レスポンスの前処理・後処理
4. **テスト**: Jest、Supertest を使用したAPIテスト
5. **デプロイ**: Vercel、AWS、Dockerでのデプロイ

このサンプルを通じて、Next.js API Routesの基本をマスターし、実際のプロジェクトで活用できるスキルを身につけましょう！