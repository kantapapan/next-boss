import { z } from 'zod';

/**
 * Zodを使用したバリデーションスキーマの定義
 * 
 * Zodは型安全なスキーマバリデーションライブラリです。
 * スキーマを定義することで、実行時の型チェックとバリデーションを行えます。
 */

// 基本的なユーザー情報のスキーマ
export const userSchema = z.object({
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
    .optional(),
  
  message: z
    .string()
    .max(1000, 'メッセージは1000文字以内で入力してください')
    .optional(),
  
  category: z.enum(['general', 'support', 'feedback', 'business'], {
    errorMap: () => ({ message: '有効なカテゴリを選択してください' })
  }),
  
  newsletter: z.boolean().optional(),
  
  terms: z
    .boolean()
    .refine(val => val === true, {
      message: '利用規約に同意してください'
    })
});

// 複雑なフォーム用のスキーマ
export const complexFormSchema = z.object({
  personalInfo: z.object({
    firstName: z
      .string()
      .min(1, '名前を入力してください')
      .regex(/^[a-zA-Zあ-んア-ン一-龯\s]+$/, '名前には有効な文字のみ使用してください'),
    
    lastName: z
      .string()
      .min(1, '姓を入力してください')
      .regex(/^[a-zA-Zあ-んア-ン一-龯\s]+$/, '姓には有効な文字のみ使用してください'),
    
    birthDate: z
      .string()
      .min(1, '生年月日を入力してください')
      .refine(date => {
        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 0 && age <= 150;
      }, '有効な生年月日を入力してください'),
    
    phone: z
      .string()
      .regex(/^[\d-+().\s]+$/, '有効な電話番号を入力してください')
      .optional()
  }),
  
  address: z.object({
    street: z.string().min(1, '住所を入力してください'),
    city: z.string().min(1, '市区町村を入力してください'),
    postalCode: z
      .string()
      .regex(/^\d{3}-?\d{4}$/, '有効な郵便番号を入力してください（例: 123-4567）'),
    country: z.string().min(1, '国を選択してください')
  }),
  
  preferences: z.object({
    notifications: z.array(z.string()).optional(),
    language: z.enum(['ja', 'en'], {
      errorMap: () => ({ message: '言語を選択してください' })
    }),
    theme: z.enum(['light', 'dark', 'auto']).optional()
  })
});

// Server Action用のスキーマ
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, '名前を入力してください')
    .max(100, '名前は100文字以内で入力してください'),
  
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('有効なメールアドレスを入力してください'),
  
  subject: z
    .string()
    .min(1, '件名を入力してください')
    .max(200, '件名は200文字以内で入力してください'),
  
  message: z
    .string()
    .min(10, 'メッセージは10文字以上で入力してください')
    .max(2000, 'メッセージは2000文字以内で入力してください'),
  
  priority: z.enum(['low', 'medium', 'high'], {
    errorMap: () => ({ message: '優先度を選択してください' })
  }),
  
  attachments: z
    .array(z.string())
    .max(5, '添付ファイルは5個まで選択できます')
    .optional()
});

// 型の推論
export type UserFormData = z.infer<typeof userSchema>;
export type ComplexFormData = z.infer<typeof complexFormSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * バリデーションエラーをフォーマットする関数
 * 
 * Zodのエラーオブジェクトを、フォームで使いやすい形式に変換します。
 */
export function formatValidationErrors(error: z.ZodError): Record<string, string> {
  const formattedErrors: Record<string, string> = {};
  
  error.errors.forEach((err) => {
    const path = err.path.join('.');
    formattedErrors[path] = err.message;
  });
  
  return formattedErrors;
}

/**
 * 安全にデータをパースする関数
 * 
 * バリデーションエラーを適切にハンドリングしながら、
 * データをパースします。
 */
export function safeParseData<T>(
  schema: z.ZodSchema<T>, 
  data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string> } {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { 
      success: false, 
      errors: formatValidationErrors(result.error) 
    };
  }
}

/**
 * カスタムバリデーション関数の例
 */
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
  },
  
  // 日本の電話番号チェック
  japanesePhoneNumber: (phone: string): boolean => {
    // 固定電話、携帯電話の基本的なパターン
    const patterns = [
      /^0\d{1,4}-\d{1,4}-\d{4}$/, // 固定電話
      /^0[789]0-\d{4}-\d{4}$/, // 携帯電話
      /^\d{10,11}$/ // ハイフンなし
    ];
    
    return patterns.some(pattern => pattern.test(phone));
  }
};