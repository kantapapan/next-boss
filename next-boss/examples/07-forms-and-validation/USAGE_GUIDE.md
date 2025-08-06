# フォームとバリデーション 使用ガイド

このガイドでは、Next.jsでのフォーム処理とバリデーションの実装方法について詳しく説明します。

## 📋 目次

1. [基本的なフォーム処理](#基本的なフォーム処理)
2. [バリデーションの実装](#バリデーションの実装)
3. [Server Actionsの活用](#server-actionsの活用)
4. [複雑なフォームの設計](#複雑なフォームの設計)
5. [ベストプラクティス](#ベストプラクティス)
6. [トラブルシューティング](#トラブルシューティング)

## 基本的なフォーム処理

### 制御コンポーネントの実装

Next.jsでは、フォームの状態をReactの`useState`で管理する制御コンポーネントが推奨されます。

```tsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};
```

**重要なポイント:**
- `name`属性を使用して、どのフィールドが変更されたかを識別
- スプレッド演算子を使用して、既存の状態を保持しながら更新
- TypeScriptの型定義で型安全性を確保

### フォーム送信の処理

```tsx
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // デフォルトの送信動作を防ぐ
  
  // バリデーション
  if (!formData.name.trim()) {
    setError('名前を入力してください');
    return;
  }
  
  try {
    // API呼び出し
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      setSuccess('送信が完了しました');
      setFormData({ name: '', email: '', message: '' }); // リセット
    }
  } catch (error) {
    setError('送信中にエラーが発生しました');
  }
};
```

## バリデーションの実装

### Zodを使用したスキーマベースバリデーション

Zodは型安全なスキーマバリデーションライブラリです。

```tsx
import { z } from 'zod';

// スキーマの定義
const userSchema = z.object({
  name: z
    .string()
    .min(1, '名前を入力してください')
    .min(2, '名前は2文字以上で入力してください')
    .max(50, '名前は50文字以内で入力してください'),
  
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('有効なメールアドレスを入力してください'),
  
  age: z
    .number()
    .min(0, '年齢は0以上で入力してください')
    .max(150, '年齢は150以下で入力してください')
    .optional()
});

// 型の推論
type UserFormData = z.infer<typeof userSchema>;
```

### リアルタイムバリデーション

ユーザーが入力中にリアルタイムでバリデーションを実行する方法：

```tsx
const validateField = (fieldName: string, data: Partial<UserFormData>) => {
  try {
    // 部分的なスキーマでバリデーション
    const fieldSchema = userSchema.pick({ [fieldName]: true } as any);
    fieldSchema.parse({ [fieldName]: data[fieldName as keyof UserFormData] });
    
    // エラーがない場合、該当フィールドのエラーを削除
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  } catch (error: any) {
    // バリデーションエラーがある場合、エラーメッセージを設定
    if (error.errors && error.errors.length > 0) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: error.errors[0].message
      }));
    }
  }
};
```

### カスタムバリデーション関数

特定の要件に応じたカスタムバリデーション：

```tsx
export const customValidators = {
  // パスワードの強度チェック
  strongPassword: (password: string): boolean => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;
    
    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar && isLongEnough;
  },
  
  // 日本の郵便番号チェック
  japanesePostalCode: (postalCode: string): boolean => {
    return /^\d{3}-\d{4}$/.test(postalCode);
  }
};

// Zodスキーマでカスタムバリデーションを使用
const passwordSchema = z
  .string()
  .refine(customValidators.strongPassword, {
    message: 'パスワードは大文字、小文字、数字、特殊文字を含む8文字以上で入力してください'
  });
```

## Server Actionsの活用

### 基本的なServer Action

```tsx
// Server Action関数（サーバーサイドで実行）
async function submitContactForm(formData: FormData) {
  'use server'; // Server Actionであることを示すディレクティブ
  
  // FormDataからオブジェクトに変換
  const rawData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    message: formData.get('message') as string
  };

  // サーバーサイドでのバリデーション
  const validationResult = safeParseData(contactFormSchema, rawData);
  
  if (!validationResult.success) {
    throw new Error('バリデーションエラーが発生しました');
  }

  try {
    // データベースへの保存やメール送信など
    await saveToDatabase(validationResult.data);
    
    // 成功後のリダイレクト
    redirect('/contact?success=true');
  } catch (error) {
    throw new Error('フォームの処理中にエラーが発生しました');
  }
}

// フォームコンポーネント
export default function ContactForm() {
  return (
    <form action={submitContactForm}>
      <input type="text" name="name" required />
      <input type="email" name="email" required />
      <textarea name="message" required />
      <button type="submit">送信する</button>
    </form>
  );
}
```

### Server Actionsの利点

1. **プログレッシブエンハンスメント**: JavaScriptが無効でも動作
2. **セキュリティ**: 自動的なCSRF保護
3. **SEO**: サーバーサイドレンダリングに対応
4. **型安全性**: TypeScriptとの完全な統合

## 複雑なフォームの設計

### マルチステップフォーム

```tsx
const [currentStep, setCurrentStep] = useState(1);
const totalSteps = 3;

// ステップごとのバリデーション
const validateCurrentStep = (): boolean => {
  let stepSchema;
  
  switch (currentStep) {
    case 1:
      stepSchema = complexFormSchema.pick({ personalInfo: true });
      break;
    case 2:
      stepSchema = complexFormSchema.pick({ address: true });
      break;
    case 3:
      stepSchema = complexFormSchema.pick({ preferences: true });
      break;
    default:
      return true;
  }

  const result = safeParseData(stepSchema, formData);
  
  if (!result.success) {
    setErrors(result.errors);
    return false;
  }
  
  setErrors({});
  return true;
};
```

### ネストしたデータ構造の管理

```tsx
// ネストしたオブジェクトの値を更新するヘルパー関数
const updateNestedValue = (path: string, value: any) => {
  const keys = path.split('.');
  setFormData(prev => {
    const newData = { ...prev };
    let current: any = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    return newData;
  });
};

// 使用例
<input
  name="personalInfo.firstName"
  onChange={(e) => updateNestedValue('personalInfo.firstName', e.target.value)}
/>
```

### 動的フィールドの管理

```tsx
// 配列フィールドの管理（例：通知設定）
const handleNotificationChange = (notification: string, checked: boolean) => {
  const currentNotifications = formData.preferences?.notifications || [];
  const newNotifications = checked
    ? [...currentNotifications, notification]
    : currentNotifications.filter(n => n !== notification);
  
  updateNestedValue('preferences.notifications', newNotifications);
};
```

## ベストプラクティス

### 1. アクセシビリティの考慮

```tsx
// 適切なラベル付け
<label htmlFor="email">
  メールアドレス <span aria-label="必須">*</span>
</label>
<input
  id="email"
  type="email"
  name="email"
  required
  aria-describedby="email-error"
/>
{errors.email && (
  <div id="email-error" role="alert">
    {errors.email}
  </div>
)}
```

### 2. ユーザビリティの向上

```tsx
// 送信中の状態表示
<button
  type="submit"
  disabled={isSubmitting || Object.keys(errors).length > 0}
  aria-busy={isSubmitting}
>
  {isSubmitting ? '送信中...' : '送信する'}
</button>

// 視覚的なフィードバック
const getInputStyle = (fieldName: string) => ({
  border: `1px solid ${errors[fieldName] ? '#e74c3c' : '#ddd'}`,
  backgroundColor: errors[fieldName] ? '#fdf2f2' : 'white'
});
```

### 3. パフォーマンスの最適化

```tsx
// useCallbackでイベントハンドラーをメモ化
const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
}, []);

// useMemoで計算結果をメモ化
const isFormValid = useMemo(() => {
  return Object.keys(errors).length === 0 && 
         formData.name && 
         formData.email;
}, [errors, formData.name, formData.email]);
```

### 4. エラーハンドリング

```tsx
// 包括的なエラーハンドリング
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitMessage('');

  try {
    // バリデーション
    if (!validateForm()) {
      throw new Error('入力内容に誤りがあります');
    }

    // API呼び出し
    const response = await submitForm(formData);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    setSubmitMessage('送信が完了しました');
    resetForm();
  } catch (error) {
    console.error('Form submission error:', error);
    setSubmitMessage(
      error instanceof Error 
        ? error.message 
        : '予期しないエラーが発生しました'
    );
  } finally {
    setIsSubmitting(false);
  }
};
```

## トラブルシューティング

### よくある問題と解決方法

#### 1. Hydration Mismatch エラー

**問題**: サーバーとクライアントでレンダリング結果が異なる

**解決方法**:
```tsx
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

if (!isMounted) {
  return <div>Loading...</div>;
}
```

#### 2. バリデーションエラーが表示されない

**問題**: エラー状態の更新タイミングの問題

**解決方法**:
```tsx
// 非同期でエラーを設定
useEffect(() => {
  if (shouldValidate) {
    validateForm();
  }
}, [formData, shouldValidate]);
```

#### 3. Server Action が動作しない

**問題**: `'use server'`ディレクティブの配置ミス

**解決方法**:
```tsx
async function myServerAction(formData: FormData) {
  'use server'; // 必ず関数の最初の行に配置
  
  // 処理内容
}
```

#### 4. TypeScript型エラー

**問題**: Zodスキーマと型定義の不整合

**解決方法**:
```tsx
// Zodスキーマから型を推論
type FormData = z.infer<typeof formSchema>;

// 部分的な型を使用
const [formData, setFormData] = useState<Partial<FormData>>({});
```

### デバッグのヒント

1. **フォーム状態の可視化**: 開発中は現在のフォーム状態を表示
2. **バリデーションログ**: コンソールでバリデーション結果を確認
3. **ネットワークタブ**: API呼び出しの詳細を確認
4. **React Developer Tools**: コンポーネントの状態を監視

## まとめ

Next.jsでのフォーム処理とバリデーションは、以下の要素を組み合わせることで効果的に実装できます：

- **制御コンポーネント**による状態管理
- **Zod**を使用した型安全なバリデーション
- **Server Actions**によるサーバーサイド処理
- **アクセシビリティ**と**ユーザビリティ**の考慮
- **適切なエラーハンドリング**

これらの技術を組み合わせることで、ユーザーフレンドリーで堅牢なフォームを構築できます。