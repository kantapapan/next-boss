'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * 基本的なフォームコンポーネント
 * 
 * このコンポーネントでは以下を学習します：
 * - 制御コンポーネント（Controlled Components）の基本
 * - useState を使用したフォーム状態の管理
 * - フォーム送信の処理
 * - 基本的なバリデーション
 */
export default function BasicFormPage() {
  // フォームの状態を管理するstate
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    category: 'general',
    newsletter: false
  });

  // 送信状態を管理するstate
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  /**
   * 入力値の変更を処理する関数
   * 
   * この関数は全ての入力要素で共通して使用できます。
   * event.target.name を使用して、どのフィールドが変更されたかを判定します。
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  /**
   * フォーム送信を処理する関数
   * 
   * preventDefault() でデフォルトの送信動作を防ぎ、
   * カスタムの処理を実行します。
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // 基本的なバリデーション
    if (!formData.name.trim()) {
      setSubmitMessage('名前を入力してください');
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.trim()) {
      setSubmitMessage('メールアドレスを入力してください');
      setIsSubmitting(false);
      return;
    }

    // 簡単なメールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitMessage('有効なメールアドレスを入力してください');
      setIsSubmitting(false);
      return;
    }

    try {
      // 実際のアプリケーションでは、ここでAPIを呼び出します
      // この例では、送信をシミュレートするために2秒待機します
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitMessage('送信が完了しました！');
      
      // フォームをリセット
      setFormData({
        name: '',
        email: '',
        message: '',
        category: 'general',
        newsletter: false
      });
    } catch (error) {
      setSubmitMessage('送信中にエラーが発生しました');
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <h2 style={{ marginTop: 0, color: '#333' }}>基本的なフォーム</h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          制御コンポーネントを使用した基本的なフォームの実装例です。
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
              value={formData.name}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="山田太郎"
            />
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
              value={formData.email}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="example@email.com"
            />
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
              カテゴリ
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            >
              <option value="general">一般</option>
              <option value="support">サポート</option>
              <option value="feedback">フィードバック</option>
              <option value="business">ビジネス</option>
            </select>
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
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
              placeholder="ご質問やご意見をお聞かせください"
            />
          </div>

          {/* チェックボックス */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleInputChange}
                style={{ marginRight: '8px' }}
              />
              <span style={{ color: '#333' }}>
                ニュースレターを受け取る
              </span>
            </label>
          </div>

          {/* 送信ボタン */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: isSubmitting ? '#95a5a6' : '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
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
              backgroundColor: submitMessage.includes('エラー') || submitMessage.includes('入力') ? '#f8d7da' : '#d4edda',
              color: submitMessage.includes('エラー') || submitMessage.includes('入力') ? '#721c24' : '#155724',
              border: `1px solid ${submitMessage.includes('エラー') || submitMessage.includes('入力') ? '#f5c6cb' : '#c3e6cb'}`
            }}>
              {submitMessage}
            </div>
          )}
        </form>

        {/* 現在のフォーム状態を表示（デバッグ用） */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          border: '1px solid #e9ecef'
        }}>
          <h4 style={{ marginTop: 0, color: '#333' }}>現在のフォーム状態:</h4>
          <pre style={{ 
            fontSize: '12px', 
            color: '#666',
            overflow: 'auto',
            margin: 0
          }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}