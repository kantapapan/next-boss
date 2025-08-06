'use client';

import { useState } from 'react';
import Link from 'next/link';
import { userSchema, type UserFormData, safeParseData } from '../../lib/validation';

/**
 * バリデーション付きフォームコンポーネント
 * 
 * このコンポーネントでは以下を学習します：
 * - Zodを使用したスキーマベースのバリデーション
 * - リアルタイムバリデーション
 * - エラーメッセージの表示
 * - 型安全なフォーム処理
 */
export default function ValidatedFormPage() {
  // フォームデータの状態
  const [formData, setFormData] = useState<Partial<UserFormData>>({
    name: '',
    email: '',
    age: undefined,
    message: '',
    category: 'general',
    newsletter: false,
    terms: false
  });

  // バリデーションエラーの状態
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // 送信状態
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  /**
   * 入力値の変更を処理し、リアルタイムバリデーションを実行
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked :
                     type === 'number' ? (value === '' ? undefined : Number(value)) :
                     value;
    
    // フォームデータを更新
    const updatedData = {
      ...formData,
      [name]: newValue
    };
    setFormData(updatedData);

    // 該当フィールドのバリデーションを実行
    validateField(name, updatedData);
  };

  /**
   * 個別フィールドのバリデーション
   */
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

  /**
   * フォーム全体のバリデーション
   */
  const validateForm = (): boolean => {
    const result = safeParseData(userSchema, formData);
    
    if (!result.success) {
      setErrors(result.errors);
      return false;
    }
    
    setErrors({});
    return true;
  };

  /**
   * フォーム送信処理
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // フォーム全体のバリデーション
    if (!validateForm()) {
      setIsSubmitting(false);
      setSubmitMessage('入力内容に誤りがあります。確認してください。');
      return;
    }

    try {
      // 実際のアプリケーションでは、ここでAPIを呼び出します
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitMessage('送信が完了しました！');
      
      // フォームをリセット
      setFormData({
        name: '',
        email: '',
        age: undefined,
        message: '',
        category: 'general',
        newsletter: false,
        terms: false
      });
      setErrors({});
    } catch (error) {
      setSubmitMessage('送信中にエラーが発生しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * エラーメッセージを表示するコンポーネント
   */
  const ErrorMessage = ({ fieldName }: { fieldName: string }) => {
    if (!errors[fieldName]) return null;
    
    return (
      <div style={{
        color: '#e74c3c',
        fontSize: '14px',
        marginTop: '5px'
      }}>
        {errors[fieldName]}
      </div>
    );
  };

  /**
   * 入力フィールドのスタイルを動的に決定
   */
  const getInputStyle = (fieldName: string) => ({
    width: '100%',
    padding: '10px',
    border: `1px solid ${errors[fieldName] ? '#e74c3c' : '#ddd'}`,
    borderRadius: '4px',
    fontSize: '16px',
    boxSizing: 'border-box' as const,
    backgroundColor: errors[fieldName] ? '#fdf2f2' : 'white'
  });

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <Link href="/" style={{ color: '#0066cc', textDecoration: 'none' }}>
            ← 戻る
          </Link>
        </div>

        <h2 style={{ marginTop: 0, color: '#333' }}>バリデーション付きフォーム</h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          Zodを使用したスキーマベースのバリデーションとリアルタイムエラー表示の例です。
        </p>

        <form onSubmit={handleSubmit}>
          {/* 名前入力フィールド */}
          <div style={{ marginBottom: '20px' }}>
            <label 
              htmlFor="name"
              style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: 'bold',
                color: '#333'
              }}
            >
              名前 <span style={{ color: '#e74c3c' }}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              style={getInputStyle('name')}
              placeholder="山田太郎"
            />
            <ErrorMessage fieldName="name" />
          </div>

          {/* メールアドレス入力フィールド */}
          <div style={{ marginBottom: '20px' }}>
            <label 
              htmlFor="email"
              style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: 'bold',
                color: '#333'
              }}
            >
              メールアドレス <span style={{ color: '#e74c3c' }}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ''}
              onChange={handleInputChange}
              style={getInputStyle('email')}
              placeholder="example@email.com"
            />
            <ErrorMessage fieldName="email" />
          </div>

          {/* 年齢入力フィールド */}
          <div style={{ marginBottom: '20px' }}>
            <label 
              htmlFor="age"
              style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: 'bold',
                color: '#333'
              }}
            >
              年齢
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age || ''}
              onChange={handleInputChange}
              style={getInputStyle('age')}
              placeholder="25"
              min="0"
              max="150"
            />
            <ErrorMessage fieldName="age" />
          </div>

          {/* カテゴリ選択フィールド */}
          <div style={{ marginBottom: '20px' }}>
            <label 
              htmlFor="category"
              style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: 'bold',
                color: '#333'
              }}
            >
              カテゴリ <span style={{ color: '#e74c3c' }}>*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category || 'general'}
              onChange={handleInputChange}
              style={getInputStyle('category')}
            >
              <option value="general">一般</option>
              <option value="support">サポート</option>
              <option value="feedback">フィードバック</option>
              <option value="business">ビジネス</option>
            </select>
            <ErrorMessage fieldName="category" />
          </div>

          {/* メッセージ入力フィールド */}
          <div style={{ marginBottom: '20px' }}>
            <label 
              htmlFor="message"
              style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: 'bold',
                color: '#333'
              }}
            >
              メッセージ
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message || ''}
              onChange={handleInputChange}
              rows={4}
              style={getInputStyle('message')}
              placeholder="ご質問やご意見をお聞かせください（1000文字以内）"
            />
            <ErrorMessage fieldName="message" />
          </div>

          {/* ニュースレターチェックボックス */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter || false}
                onChange={handleInputChange}
                style={{ marginRight: '8px' }}
              />
              <span style={{ color: '#333' }}>
                ニュースレターを受け取る
              </span>
            </label>
          </div>

          {/* 利用規約同意チェックボックス */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms || false}
                onChange={handleInputChange}
                style={{ marginRight: '8px', marginTop: '2px' }}
              />
              <span style={{ color: '#333' }}>
                利用規約に同意します <span style={{ color: '#e74c3c' }}>*</span>
              </span>
            </label>
            <ErrorMessage fieldName="terms" />
          </div>

          {/* 送信ボタン */}
          <button
            type="submit"
            disabled={isSubmitting || Object.keys(errors).length > 0}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: isSubmitting || Object.keys(errors).length > 0 ? '#95a5a6' : '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: isSubmitting || Object.keys(errors).length > 0 ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s ease'
            }}
          >
            {isSubmitting ? '送信中...' : '送信する'}
          </button>

          {/* 送信結果メッセージ */}
          {submitMessage && (
            <div style={{
              marginTop: '20px',
              padding: '10px',
              borderRadius: '4px',
              backgroundColor: submitMessage.includes('エラー') || submitMessage.includes('誤り') ? '#f8d7da' : '#d4edda',
              color: submitMessage.includes('エラー') || submitMessage.includes('誤り') ? '#721c24' : '#155724',
              border: `1px solid ${submitMessage.includes('エラー') || submitMessage.includes('誤り') ? '#f5c6cb' : '#c3e6cb'}`
            }}>
              {submitMessage}
            </div>
          )}
        </form>

        {/* バリデーション状態の表示 */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          border: '1px solid #e9ecef'
        }}>
          <h4 style={{ marginTop: 0, color: '#333' }}>バリデーション状態:</h4>
          <div style={{ fontSize: '14px', color: '#666' }}>
            <p><strong>エラー数:</strong> {Object.keys(errors).length}</p>
            {Object.keys(errors).length > 0 && (
              <div>
                <strong>エラー詳細:</strong>
                <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                  {Object.entries(errors).map(([field, message]) => (
                    <li key={field} style={{ color: '#e74c3c' }}>
                      {field}: {message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}