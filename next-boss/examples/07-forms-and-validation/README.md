# Forms and Validation Example

Next.jsでのフォーム処理とバリデーションの包括的な学習例です。

## 📚 学習内容

このプロジェクトでは、以下のフォーム処理とバリデーション技術を学習できます：

### 1. 基本的なフォーム (`/basic-form`)
- 制御コンポーネント（Controlled Components）の実装
- `useState`を使用したフォーム状態管理
- 基本的なバリデーション
- フォーム送信処理

### 2. バリデーション付きフォーム (`/validated-form`)
- Zodを使用したスキーマベースのバリデーション
- リアルタイムバリデーション
- 型安全なフォーム処理
- エラーメッセージの表示

### 3. Server Actionsフォーム (`/server-action-form`)
- Next.js Server Actionsの使用
- サーバーサイドフォーム処理
- プログレッシブエンハンスメント
- CSRF保護

### 4. 複雑なフォーム (`/complex-form`)
- マルチステップフォーム
- ネストしたデータ構造
- 動的フィールド管理
- 条件付きバリデーション

## 🚀 セットアップ

### 前提条件
- Node.js 18.17以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで [http://localhost:3007](http://localhost:3007) を開いてください。

## 📁 プロジェクト構造

```
07-forms-and-validation/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # ルートレイアウト
│   ├── page.tsx                 # メインページ
│   ├── basic-form/              # 基本フォーム例
│   ├── validated-form/          # バリデーション付きフォーム例
│   ├── server-action-form/      # Server Actions例
│   └── complex-form/            # 複雑なフォーム例
├── lib/
│   └── validation.ts            # バリデーションスキーマとユーティリティ
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

## 🔧 使用技術

- **Next.js 15.4.5** - React フレームワーク
- **TypeScript** - 型安全性
- **Zod** - スキーマバリデーション
- **React Hooks** - 状態管理

## 📖 学習ガイド

### 推奨学習順序

1. **基本フォーム** - フォームの基礎を理解
2. **バリデーション付きフォーム** - Zodを使った高度なバリデーション
3. **Server Actionsフォーム** - サーバーサイド処理
4. **複雑なフォーム** - 実践的な応用例

### 重要な概念

#### 制御コンポーネント vs 非制御コンポーネント

```tsx
// 制御コンポーネント（推奨）
const [value, setValue] = useState('');
<input value={value} onChange={(e) => setValue(e.target.value)} />

// 非制御コンポーネント
const inputRef = useRef<HTMLInputElement>(null);
<input ref={inputRef} />
```

#### バリデーションのタイミング

- **onChange**: リアルタイムバリデーション
- **onBlur**: フィールドを離れた時
- **onSubmit**: 送信時の最終チェック

#### Server Actions の利点

- JavaScriptが無効でも動作
- 自動的なCSRF保護
- SEOに優しい
- サーバーサイドでの安全な処理

## 🎯 実践課題

### 初級課題
1. 基本フォームにフィールドを追加してみる
2. カスタムバリデーション関数を作成する
3. エラーメッセージのスタイルを変更する

### 中級課題
1. ファイルアップロード機能を追加する
2. 動的にフィールドを追加/削除する機能を実装する
3. フォームの状態をローカルストレージに保存する

### 上級課題
1. 複数のフォームを組み合わせたウィザード形式を作成する
2. 条件付きフィールド表示を実装する
3. カスタムフックでフォームロジックを再利用可能にする

## 🔍 コードのポイント

### Zodスキーマの定義

```typescript
const userSchema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  age: z.number().min(0).max(150).optional()
});
```

### Server Action の実装

```typescript
async function submitForm(formData: FormData) {
  'use server';
  
  const result = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email')
  });
  
  if (!result.success) {
    // エラーハンドリング
  }
  
  // データ処理
}
```

### リアルタイムバリデーション

```typescript
const validateField = (fieldName: string, value: any) => {
  try {
    schema.pick({ [fieldName]: true }).parse({ [fieldName]: value });
    // エラーをクリア
  } catch (error) {
    // エラーを設定
  }
};
```

## 🚨 よくあるエラーと解決方法

### 1. Hydration エラー
**原因**: サーバーとクライアントでレンダリング結果が異なる
**解決**: `useEffect`でクライアントサイドのみの処理を分離

### 2. バリデーションエラーが表示されない
**原因**: エラー状態の更新タイミングの問題
**解決**: `useState`の更新を適切なタイミングで実行

### 3. Server Action が動作しない
**原因**: `'use server'`ディレクティブの配置ミス
**解決**: 関数の最初の行に`'use server'`を配置

## 📚 参考資料

- [Next.js Forms Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations)
- [Zod Documentation](https://zod.dev/)
- [React Hook Form](https://react-hook-form.com/) - より高度なフォームライブラリ
- [Formik](https://formik.org/) - 代替フォームライブラリ

## 🤝 貢献

このプロジェクトの改善提案や追加例の提供は歓迎します。

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。